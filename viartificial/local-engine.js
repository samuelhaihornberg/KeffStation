/* Moteur IA local COMMUN — WebLLM 0.2.86 (navigateur, WebGPU). Docs vérifiées :
   webllm.mlc.ai (CreateMLCEngine, initProgressCallback, cache navigateur, unload).
   UN SEUL moteur partagé pour tous les SuperBots : la personnalité = prompt système.
   Stratégie réaliste (pas de « CPU virtuel » : les navigateurs ne commutent pas
   CPU/GPU en natif, WebLLM exige WebGPU) : WebGPU OK → local ; sinon choix explicite
   moteur distant (Ollama/endpoint) ou texte seul. Une tentative, jamais de boucle.
   États : idle→checking→needs-consent→downloading→loading→ready→generating→error. */
(function (global) {
  'use strict';
  var CDN = 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.86/+esm';
  var MODELS = [
    { id: 'SmolLM2-360M-Instruct-q4f16_1-MLC', vramMB: 376, downloadMB: 220, license: 'Apache 2.0', auto: true, label: 'SmolLM2 360M — léger (≈220 Mo à télécharger, licence Apache 2.0)' },
    { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', vramMB: 879, downloadMB: 750, license: 'Licence communautaire Meta', auto: false, label: 'Llama 3.2 1B — (≈750 Mo, licence Meta, réglage avancé)' }
  ];
  // Accord modèle local UNIQUEMENT (téléchargement + stockage sur l'appareil).
  // Ce n'est PAS un bandeau cookies : aucun traceur, aucun cookie facultatif ici.
  var CONSENT_KEY = 'via-consent'; // {state:'granted'|'later'|'withdrawn', ts}
  function getConsent() { try { var o = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); return (o && o.state) || null; } catch (e) { return null; } }
  function setConsent(state) { try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ state: state, ts: Date.now() })); } catch (e) {} return state; }
  // UN SEUL modèle partagé par tous les SuperBots (personnalités distinctes
  // via prompt système). SmolLM2 : Apache 2.0 (usage autorisé), léger.
  // Choix automatique : WebGPU+f16 → moteur WebLLM (rapide) ; sinon repli CPU/WASM
  // (Transformers.js, modèle ONNX quantifié, licence Apache 2.0). Aucun serveur,
  // aucun service payant, aucun PC imposé.
  function pickModel(cap) {
    if (cap && cap.ok) return { backend: 'webllm', id: MODELS[0].id, downloadMB: MODELS[0].downloadMB };
    if (cap && cap.wasm) return { backend: 'wasm', id: null, downloadMB: 200 };
    var why = (cap && cap.reasons && cap.reasons.length) ? cap.reasons.join(' ; ') : 'appareil non analysable';
    return { error: 'NO_LOCAL', message: 'Aucun moteur local ne peut fonctionner ici : ' + why + '.' };
  }
  function modelInfo(id) { for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i]; return { id: id, vramMB: 0, downloadMB: 200, license: 'Apache 2.0', label: id }; }
  var activeBackend = null; // 'webllm' | 'wasm' | null
  async function storageCheck(needMB) {
    try {
      if (!navigator.storage || !navigator.storage.estimate) return { ok: true, unknown: true, needMB: needMB };
      var e = await navigator.storage.estimate();
      var quotaMB = Math.round((e.quota || 0) / 1048576), usageMB = Math.round((e.usage || 0) / 1048576);
      return { ok: quotaMB === 0 || (quotaMB - usageMB) > needMB * 1.2, quotaMB: quotaMB, usageMB: usageMB, needMB: needMB };
    } catch (err) { return { ok: true, unknown: true, needMB: needMB }; }
  }
  // Parcours automatique : détection → sélection du moteur compatible → stockage →
  // téléchargement → chargement. Une seule tentative de poids (jamais de boucle) ;
  // le cache navigateur évite tout re-téléchargement inutile lors des visites suivantes.
  async function autoLoad(onTick) {
    var cap = await detect();
    var pick = pickModel(cap);
    if (pick.error) throw Object.assign(new Error(pick.message), { code: pick.error });
    var needMB = pick.downloadMB || 220;
    var st = await storageCheck(needMB);
    if (!st.ok) throw Object.assign(new Error('Stockage insuffisant : il faut ≈' + needMB + ' Mo libres (utilisé ' + st.usageMB + ' / quota ' + st.quotaMB + ' Mo). Libère de l’espace puis Réessaie.'), { code: 'STORAGE_FULL' });
    activeBackend = pick.backend;
    if (pick.backend === 'wasm') {
      if (!global.ViaWasmEngine) throw Object.assign(new Error('Moteur CPU non chargé : recharge la page.'), { code: 'NOT_LOADED' });
      return global.ViaWasmEngine.load(pick.id, onTick);
    }
    return load(pick.id, onTick);
  }
  // Supprime les fichiers de modèles du cache navigateur (ciblé webllm/mlc/transformers/onnx).
  async function deleteModels() {
    var names = []; try { if ('caches' in window) names = await caches.keys(); } catch (e) {}
    var gone = 0;
    for (var i = 0; i < names.length; i++) {
      if (/webllm|mlc|transformers|onnx/i.test(names[i])) { try { if (await caches.delete(names[i])) gone++; } catch (e) {} }
    }
    await unload();
    return gone;
  }
  var S = { phase: 'idle', model: null, progress: 0, detail: '' };
  var engine = null, busy = false, WebLLM = null;
  function set(p, d, g) { S.phase = p; if (d !== undefined) S.detail = d; if (g !== undefined) S.progress = g; }
  // Diagnostic complet : contexte sécurisé, API, adaptateur, périphérique,
  // limites et fonctions requises. Chaque cause est enregistrée (reasons),
  // jamais de conclusion hâtive sur « tout l'appareil ».
  var lastDetect = null;
  async function detect() {
    var reasons = [];
    var secure = false; try { secure = !!window.isSecureContext; } catch (e) {}
    if (!secure) reasons.push('contexte non sécurisé (WebGPU exige HTTPS ou localhost)');
    var hasAPI = !!(navigator.gpu);
    if (!hasAPI) reasons.push('API navigator.gpu absente de ce navigateur');
    var adapterName = 'absent', f16 = false, deviceState = 'non testé', maxStorage = 0;
    if (hasAPI) {
      try {
        var ad = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
        if (!ad) { reasons.push('adaptateur WebGPU introuvable (pilote désactivé ou navigateur sans WebGPU)'); }
        else {
          try { adapterName = (ad.info && (ad.info.device || ad.info.architecture)) || 'présent'; } catch (e) { adapterName = 'présent'; }
          try { f16 = ad.features.has('shader-f16'); } catch (e) {}
          if (!f16) reasons.push('fonction « shader-f16 » absente de ce GPU');
          try { maxStorage = (ad.limits && ad.limits.maxStorageBufferBindingSize) || 0; } catch (e) {}
          try {
            var dev = await ad.requestDevice({ requiredFeatures: f16 ? ['shader-f16'] : [] });
            deviceState = 'ok'; try { dev.destroy(); } catch (e) {}
          } catch (e) { deviceState = 'refusé'; reasons.push('périphérique WebGPU refusé : ' + (e && e.message ? e.message : 'pilote/limites')); }
        }
      } catch (e) { reasons.push('requestAdapter a échoué : ' + (e && e.message ? e.message : e)); }
    }
    var wasm = false; try { wasm = typeof WebAssembly !== 'undefined'; } catch (e) {}
    if (!wasm) reasons.push('WebAssembly absent : repli CPU impossible');
    var dm = navigator.deviceMemory || 0;
    var mobile = /Android|iPhone|iPad/i.test(navigator.userAgent || '');
    var cap = { secure: secure, webgpu: hasAPI && deviceState === 'ok', shaderF16: f16, deviceMemoryGB: dm, mobile: mobile,
      adapter: adapterName, device: deviceState, maxStorageBuffer: maxStorage, wasm: wasm,
      reasons: reasons, ok: hasAPI && deviceState === 'ok' && f16 };
    lastDetect = cap;
    return cap;
  }
  async function load(modelId, onTick) {
    if (busy) throw Object.assign(new Error('Moteur occupé : une opération est déjà en cours (pas de boucle).'), { code: 'BUSY' });
    var cap = await detect();
    if (!cap.webgpu) throw Object.assign(new Error('WebGPU indisponible ici : modèle local impossible. Choisis Ollama/endpoint ou reste en texte seul.'), { code: 'NO_WEBGPU' });
    if (!cap.shaderF16) throw Object.assign(new Error('shader-f16 requis par le modèle, absent de ce GPU.'), { code: 'NO_F16' });
    function tick(group, phase, progress, text, detail) { if (onTick) { try { onTick({ group: group, phase: phase, progress: progress, text: text, detail: detail || text }); } catch (e) {} } }
    busy = true; set('downloading', 'runtime…', 0);
    try {
      // Groupe RUNTIME : bibliothèque d'exécution WebLLM (mise en cache navigateur).
      tick('runtime', 'downloading', 5, 'runtime WebLLM…');
      if (!WebLLM) WebLLM = await import(CDN);
      S.model = modelId;
      tick('runtime', 'downloading', 100, 'runtime OK (mise en cache navigateur)');
      // Groupe POIDS : fichiers du modèle (progression réelle du moteur).
      var eng = new WebLLM.MLCEngine({ initProgressCallback: function (r) { S.progress = Math.round((r.progress || 0) * 100); S.detail = r.text || ''; tick('poids', 'downloading', S.progress, 'poids du modèle…', S.detail); } });
      set('loading', 'chargement en mémoire…');
      tick('poids', 'loading', 100, 'chargement en mémoire…');
      await eng.reload(modelId, undefined, undefined);
      engine = eng; set('ready', 'prêt');
      tick('poids', 'ready', 100, 'moteur prêt');
      return true;
    } catch (e) { set('error', (e && e.message) || 'échec'); throw e; }
    finally { busy = false; }
  }
  async function chat(bot, history, opt) {
    // Bascule vers le moteur réellement actif (WebGPU ou repli CPU).
    if (activeBackend === 'wasm') {
      if (!global.ViaWasmEngine) throw Object.assign(new Error('Moteur CPU non chargé : recharge la page.'), { code: 'NOT_LOADED' });
      var r = await global.ViaWasmEngine.chat(bot, history, opt);
      S.model = (global.ViaWasmEngine.summary() || {}).model || S.model;
      return r;
    }
    if (!engine || S.phase !== 'ready') throw Object.assign(new Error('Modèle non chargé : donne ton accord puis télécharge dans Réglages.'), { code: 'NOT_LOADED' });
    if (busy) throw Object.assign(new Error('Génération déjà en cours : attends ou annule.'), { code: 'BUSY' });
    busy = true; set('generating', 'génération…');
    var o = opt || {};
    try {
      var msgs = [{ role: 'system', content: 'Tu es ' + bot.name + ', personnage simulé sans conscience réelle. ' + bot.specialty + ' ' + bot.personality + ' Réponds en français, court.' }];
      history.forEach(function (m) { msgs.push(m); });
      var p = engine.chat.completions.create({ messages: msgs.slice(-11), temperature: 0.7, max_tokens: 256 });
      if (o.signal) o.signal.addEventListener('abort', function () { try { engine.interruptGenerate(); } catch (e) {} });
      var r = await p;
      var t = (r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content) || '';
      if (!t) throw Object.assign(new Error('Réponse vide.'), { code: 'EMPTY' });
      return t;
    } finally { busy = false; if (S.phase === 'generating') set('ready', 'prêt'); }
  }
  function setModel(id) {
    if (!id) return S.model || MODELS[0].id;
    if (engine && id !== S.model) throw Object.assign(new Error('Autre modèle demandé : décharge d’abord, puis recharge avec ' + id + '.'), { code: 'NEED_RELOAD' });
    S.model = id; return S.model;
  }
  async function unload() {
    if (activeBackend === 'wasm' && global.ViaWasmEngine) { try { await global.ViaWasmEngine.unload(); } catch (e) {} }
    else { try { if (engine) await engine.unload(); } catch (e) {} }
    engine = null; S.model = null; activeBackend = null; set('idle', 'déchargé (mémoire libérée, chauffe réduite)');
  }
  function summary() {
    if (activeBackend === 'wasm' && global.ViaWasmEngine) { var w = global.ViaWasmEngine.summary(); return { phase: w.phase, model: w.model, progress: w.progress, detail: w.detail, mode: w.mode, backend: 'wasm' }; }
    return { phase: S.phase, model: S.model, progress: S.progress, detail: S.detail, mode: S.phase === 'ready' || S.phase === 'generating' ? 'WebGPU local' : '—', backend: activeBackend || 'webllm' };
  }
  function lastDetect() { return lastDetect; }
  global.ViaLocalEngine = { MODELS: MODELS, detect: detect, lastDetect: lastDetect, modelInfo: modelInfo, setModel: setModel, load: load, autoLoad: autoLoad, pickModel: pickModel, storageCheck: storageCheck, getConsent: getConsent, setConsent: setConsent, deleteModels: deleteModels, chat: chat, unload: unload, summary: summary, CDN: CDN, CONSENT_KEY: CONSENT_KEY };
})(window);
