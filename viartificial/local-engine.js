/* Moteur IA local COMMUN — CPU/WebAssembly via Web Worker (AUCUN WebGPU).
   Docs vérifiées (huggingface.co/docs/transformers.js) : pipeline text-generation,
   messages [{role,content}], TextStreamer(skip_prompt), progress_callback, env.fetch.
   UN SEUL moteur partagé pour tous les SuperBots : la personnalité = prompt système.
   - Pas de dépendance WebGPU : le chatbot fonctionne sans (WebGPU n'est même plus
     consulté pour le choix du moteur ; sa présence reste notée au diagnostic).
   - Inférence dans local-wasm-worker.js (thread séparé) : interface réactive.
   - Sans COOP/COEP (GitHub Pages), ONNX Runtime bascule seul en WASM monothread.
   - Une seule tentative de poids par accord (jamais de boucle) ; le cache
     navigateur évite tout re-téléchargement inutile.
   - WASM réduit le risque mémoire mais ne le supprime pas : un navigateur peut
     fermer l'onglet sans prévenir (noté dans l'interface, jamais garanti).
   États : idle→checking→needs-consent→downloading→loading→ready→generating→error. */
(function (global) {
  'use strict';
  var MODELS = [
    { id: 'onnx-community/Qwen2.5-0.5B-Instruct', downloadMB: 800, license: 'Apache 2.0', auto: true, label: 'Qwen2.5 0.5B Instruct — (≈800 Mo mesurés, licence Apache 2.0)' },
    { id: 'onnx-community/SmolLM2-360M-Instruct', downloadMB: 200, license: 'Apache 2.0', auto: false, label: 'SmolLM2 360M — (≈200 Mo, licence Apache 2.0)' },
    { id: 'onnx-community/SmolLM2-135M-ONNX', downloadMB: 80, license: 'Apache 2.0', auto: false, label: 'SmolLM2 135M — (≈80 Mo, base non conversationnelle, dernier recours)' }
  ];
  // Accord modèle local UNIQUEMENT (téléchargement + stockage sur l'appareil).
  // Ce n'est PAS un bandeau cookies : aucun traceur, aucun cookie facultatif ici.
  var CONSENT_KEY = 'via-consent'; // {state:'granted'|'later'|'withdrawn', ts}
  function getConsent() { try { var o = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); return (o && o.state) || null; } catch (e) { return null; } }
  function setConsent(state) { try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ state: state, ts: Date.now() })); } catch (e) {} return state; }
  // Choix automatique : moteur CPU/WASM si WebAssembly disponible, sinon erreur
  // précise. WebGPU n'est PLUS requis (ni consulté pour le choix).
  function pickModel(cap) {
    if (cap && cap.wasm) return { backend: 'wasm', id: null, downloadMB: 800 };
    var why = (cap && cap.reasons && cap.reasons.length) ? cap.reasons.join(' ; ') : 'appareil non analysable';
    return { error: 'NO_LOCAL', message: 'Aucun moteur local ne peut fonctionner ici : ' + why + '.' };
  }
  function modelInfo(id) { for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i]; return { id: id, vramMB: 0, downloadMB: 800, license: 'Apache 2.0', label: id }; }
  async function storageCheck(needMB) {
    try {
      if (!navigator.storage || !navigator.storage.estimate) return { ok: true, unknown: true, needMB: needMB };
      var e = await navigator.storage.estimate();
      var quotaMB = Math.round((e.quota || 0) / 1048576), usageMB = Math.round((e.usage || 0) / 1048576);
      return { ok: quotaMB === 0 || (quotaMB - usageMB) > needMB * 1.2, quotaMB: quotaMB, usageMB: usageMB, needMB: needMB };
    } catch (err) { return { ok: true, unknown: true, needMB: needMB }; }
  }
  // Diagnostic complet : contexte sécurisé, WebGPU (info seule), WebAssembly,
  // stockage, mémoire. Chaque cause est enregistrée (reasons),
  // jamais de conclusion hâtive sur « tout l'appareil ».
  var lastDetect = null;
  async function detect() {
    var reasons = [];
    var secure = false; try { secure = !!window.isSecureContext; } catch (e) {}
    if (!secure) reasons.push('contexte non sécurisé (service worker et cache exigent HTTPS ou localhost)');
    var hasAPI = !!(navigator.gpu), adapterName = 'absent', f16 = false, deviceState = 'non testé';
    if (hasAPI) {
      try {
        var ad = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
        if (!ad) { adapterName = 'absent'; }
        else {
          try { adapterName = (ad.info && (ad.info.device || ad.info.architecture)) || 'présent'; } catch (e) { adapterName = 'présent'; }
          try { f16 = ad.features.has('shader-f16'); } catch (e) {}
          try { var dev = await ad.requestDevice({ requiredFeatures: [] }); deviceState = 'ok'; try { dev.destroy(); } catch (e) {} }
          catch (e) { deviceState = 'refusé'; }
        }
      } catch (e) { adapterName = 'erreur : ' + (e && e.message ? e.message : e); }
    }
    var wasm = false; try { wasm = typeof WebAssembly !== 'undefined'; } catch (e) {}
    if (!wasm) reasons.push('WebAssembly absent : moteur CPU impossible');
    var threads = 'monothread (GitHub Pages ne définit pas COOP/COEP)';
    try { if (typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated && typeof SharedArrayBuffer !== 'undefined') threads = 'multithread possible'; } catch (e) {}
    var dm = navigator.deviceMemory || 0;
    if (dm && dm < 4) reasons.push('mémoire appareil faible (' + dm + ' Go déclarés) : préfère un contexte court');
    var mobile = /Android|iPhone|iPad/i.test(navigator.userAgent || '');
    var cap = { secure: secure, webgpu: hasAPI && deviceState === 'ok', shaderF16: f16, deviceMemoryGB: dm, mobile: mobile,
      adapter: adapterName, device: deviceState, wasm: wasm, threads: threads,
      reasons: reasons, ok: !!wasm };
    lastDetect = cap;
    return cap;
  }
  // Parcours : détection → sélection CPU/WASM → stockage → téléchargement →
  // chargement. Une seule tentative de poids (jamais de boucle) ; le cache
  // navigateur évite tout re-téléchargement inutile.
  async function autoLoad(onTick) {
    var cap = await detect();
    var pick = pickModel(cap);
    if (pick.error) throw Object.assign(new Error(pick.message), { code: 'NO_LOCAL' });
    var needMB = pick.downloadMB || 800;
    var st = await storageCheck(needMB);
    if (!st.ok) throw Object.assign(new Error('Stockage insuffisant : il faut ≈' + needMB + ' Mo libres (utilisé ' + st.usageMB + ' / quota ' + st.quotaMB + ' Mo). Libère de l’espace puis Réessaie.'), { code: 'STORAGE_FULL' });
    if (!global.ViaWasmEngine) throw Object.assign(new Error('Moteur CPU non chargé : recharge la page.'), { code: 'NOT_LOADED' });
    return global.ViaWasmEngine.load(pick.id, onTick);
  }
  // Supprime les fichiers de modèles du cache navigateur (ciblé, sur demande explicite).
  async function deleteModels() {
    var names = []; try { if ('caches' in window) names = await caches.keys(); } catch (e) {}
    var gone = 0;
    for (var i = 0; i < names.length; i++) {
      if (/transformers|onnx|webllm|mlc/i.test(names[i])) { try { if (await caches.delete(names[i])) gone++; } catch (e) {} }
    }
    await unload();
    return gone;
  }
  function setModel(id) { return id || null; } // compat : un seul modèle partagé, rien à commuter.
  async function chat(bot, history, opt) {
    if (!global.ViaWasmEngine) throw Object.assign(new Error('Moteur CPU non chargé : recharge la page.'), { code: 'NOT_LOADED' });
    return global.ViaWasmEngine.chat(bot, history, opt);
  }
  async function unload() {
    try { if (global.ViaWasmEngine) await global.ViaWasmEngine.unload(); } catch (e) {}
  }
  function summary() {
    if (global.ViaWasmEngine) { var w = global.ViaWasmEngine.summary(); return { phase: w.phase, model: w.model, progress: w.progress, detail: w.detail, mode: w.mode, backend: 'wasm', tokenizer: w.tokenizer, threads: w.threads }; }
    return { phase: 'idle', model: null, progress: 0, detail: '', mode: '—', backend: 'wasm' };
  }
  function lastDetectFn() { return lastDetect; }
  global.ViaLocalEngine = { MODELS: MODELS, detect: detect, lastDetect: lastDetectFn, modelInfo: modelInfo, setModel: setModel, autoLoad: autoLoad, pickModel: pickModel, storageCheck: storageCheck, getConsent: getConsent, setConsent: setConsent, deleteModels: deleteModels, chat: chat, unload: unload, summary: summary, CONSENT_KEY: CONSENT_KEY };
})(window);
