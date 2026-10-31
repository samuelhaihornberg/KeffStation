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
  // Choix automatique : UN SEUL modèle partagé par tous les SuperBots (personnalités
  // distinctes via prompt système). SmolLM2 : Apache 2.0 (usage autorisé), léger.
  function pickModel(cap) {
    if (!cap || !cap.webgpu) return { error: 'NO_WEBGPU', message: 'WebGPU indisponible sur cet appareil : le modèle local ne peut pas tourner ici.' };
    if (!cap.shaderF16) return { error: 'NO_F16', message: 'Fonction GPU « shader-f16 » absente : le modèle local ne peut pas tourner ici.' };
    return { id: MODELS[0].id };
  }
  async function storageCheck(needMB) {
    try {
      if (!navigator.storage || !navigator.storage.estimate) return { ok: true, unknown: true, needMB: needMB };
      var e = await navigator.storage.estimate();
      var quotaMB = Math.round((e.quota || 0) / 1048576), usageMB = Math.round((e.usage || 0) / 1048576);
      return { ok: quotaMB === 0 || (quotaMB - usageMB) > needMB * 1.2, quotaMB: quotaMB, usageMB: usageMB, needMB: needMB };
    } catch (err) { return { ok: true, unknown: true, needMB: needMB }; }
  }
  // Parcours automatique : détection → stockage → téléchargement → chargement.
  // Une seule tentative (jamais de boucle) ; le cache navigateur évite tout
  // re-téléchargement inutile lors des visites suivantes.
  async function autoLoad(onTick) {
    var cap = await detect();
    var pick = pickModel(cap);
    if (pick.error) throw Object.assign(new Error(pick.message), { code: pick.error });
    var info = modelInfo(pick.id);
    var st = await storageCheck(info.downloadMB);
    if (!st.ok) throw Object.assign(new Error('Stockage insuffisant : il faut ≈' + info.downloadMB + ' Mo libres (utilisé ' + st.usageMB + ' / quota ' + st.quotaMB + ' Mo). Libère de l’espace puis Réessaie.'), { code: 'STORAGE_FULL' });
    return load(pick.id, onTick);
  }
  // Supprime les fichiers de modèles du cache navigateur (ciblé webllm/mlc uniquement).
  async function deleteModels() {
    var names = []; try { if ('caches' in window) names = await caches.keys(); } catch (e) {}
    var gone = 0;
    for (var i = 0; i < names.length; i++) {
      if (/webllm|mlc/i.test(names[i])) { try { if (await caches.delete(names[i])) gone++; } catch (e) {} }
    }
    await unload();
    return gone;
  }
  var S = { phase: 'idle', model: null, progress: 0, detail: '' };
  var engine = null, busy = false, WebLLM = null;
  function set(p, d, g) { S.phase = p; if (d !== undefined) S.detail = d; if (g !== undefined) S.progress = g; }
  async function detect() {
    var gpu = null, f16 = false;
    try { if (navigator.gpu) { var ad = await navigator.gpu.requestAdapter(); if (ad) { gpu = true; try { f16 = ad.features.has('shader-f16'); } catch (e) {} } } } catch (e) {}
    var dm = navigator.deviceMemory || 0;
    var mobile = /Android|iPhone|iPad/i.test(navigator.userAgent || '');
    return { webgpu: !!gpu, shaderF16: f16, deviceMemoryGB: dm, mobile: mobile, ok: !!gpu && f16 };
  }
  function modelInfo(id) { for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i]; return MODELS[0]; }
  async function load(modelId, onTick) {
    if (busy) throw Object.assign(new Error('Moteur occupé : une opération est déjà en cours (pas de boucle).'), { code: 'BUSY' });
    var cap = await detect();
    if (!cap.webgpu) throw Object.assign(new Error('WebGPU indisponible ici : modèle local impossible. Choisis Ollama/endpoint ou reste en texte seul.'), { code: 'NO_WEBGPU' });
    if (!cap.shaderF16) throw Object.assign(new Error('shader-f16 requis par le modèle, absent de ce GPU.'), { code: 'NO_F16' });
    busy = true; set('downloading', 'téléchargement…', 0);
    try {
      if (!WebLLM) WebLLM = await import(CDN);
      S.model = modelId;
      var eng = new WebLLM.MLCEngine({ initProgressCallback: function (r) { S.progress = Math.round((r.progress || 0) * 100); S.detail = r.text || ''; if (onTick) onTick(S); } });
      set('loading', 'chargement en mémoire…');
      await eng.reload(modelId, undefined, undefined);
      engine = eng; set('ready', 'prêt');
      return true;
    } catch (e) { set('error', (e && e.message) || 'échec'); throw e; }
    finally { busy = false; }
  }
  async function chat(bot, history, opt) {
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
  async function unload() { try { if (engine) await engine.unload(); } catch (e) {} engine = null; S.model = null; set('idle', 'déchargé (mémoire libérée, chauffe réduite)'); }
  function summary() { return { phase: S.phase, model: S.model, progress: S.progress, detail: S.detail, mode: S.phase === 'ready' || S.phase === 'generating' ? 'WebGPU local' : '—' }; }
  global.ViaLocalEngine = { MODELS: MODELS, detect: detect, modelInfo: modelInfo, setModel: setModel, load: load, autoLoad: autoLoad, pickModel: pickModel, storageCheck: storageCheck, getConsent: getConsent, setConsent: setConsent, deleteModels: deleteModels, chat: chat, unload: unload, summary: summary, CDN: CDN, CONSENT_KEY: CONSENT_KEY };
})(window);
