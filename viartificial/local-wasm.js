/* Moteur IA local CPU/WebAssembly (repli sans WebGPU) — Transformers.js v3, docs :
   huggingface.co/docs/transformers.js (pipeline text-generation, messages + TextStreamer,
   cache navigateur natif). AUCUN serveur, AUCUN abonnement : 100 % local.
   Modèles ONNX quantifiés, licence Apache 2.0 (famille SmolLM2). Candidats essayés
   dans l'ordre ; seul le manifeste est testé avant chaque tentative (quelques Ko) :
   aucun poids n'est téléchargé deux fois. Une seule tentative de poids par accord. */
(function (global) {
  'use strict';
  var CDN = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/+esm';
  var CANDIDATES = [
    { id: 'onnx-community/SmolLM2-360M-Instruct', downloadMB: 200, license: 'Apache 2.0' },
    { id: 'onnx-community/SmolLM2-135M-ONNX', downloadMB: 80, license: 'Apache 2.0' }
  ];
  var S = { phase: 'idle', model: null, progress: 0, detail: '' };
  var pipe = null, busy = false, T = null, picked = null;
  function set(p, d, g) { S.phase = p; if (d !== undefined) S.detail = d; if (g !== undefined) S.progress = g; }
  function err(code, message) { var e = new Error(message); e.code = code; return e; }
  function aggregate(seen) { var L = 0, Tt = 0; for (var k in seen) { L += seen[k].loaded; Tt += seen[k].total; } return { loaded: L, total: Tt }; }
  async function load(modelId, onTick) {
    if (busy) throw err('BUSY', 'Moteur occupé : une opération est déjà en cours (pas de boucle).');
    function tick(group, phase, progress, text) { if (onTick) { try { onTick({ group: group, phase: phase, progress: progress, text: text, detail: text }); } catch (e) {} } }
    busy = true; set('downloading', 'runtime…', 0);
    try {
      // Groupe RUNTIME : bibliothèque Transformers.js (mise en cache navigateur).
      tick('runtime', 'downloading', 5, 'runtime Transformers.js (CPU/WASM)…');
      if (!T) { try { T = await import(CDN); } catch (e) { throw err('NO_RUNTIME', 'Bibliothèque IA non téléchargée (' + (e && e.message ? e.message : 'réseau indisponible') + '). Vérifie la connexion, puis Réessaie.'); } }
      T.env.allowLocalModels = false;
      tick('runtime', 'downloading', 100, 'runtime OK (mise en cache navigateur)');
      // Groupe POIDS : fichiers ONNX du premier candidat dont le manifeste répond.
      var ids = modelId ? [modelId] : CANDIDATES.map(function (c) { return c.id; });
      var lastErr = null, downloadedAny = false;
      for (var i = 0; i < ids.length; i++) {
        var seen = {};
        try {
          tick('poids', 'downloading', 0, 'modèle ' + ids[i] + '…');
          var p = await T.pipeline('text-generation', ids[i], {
            device: 'wasm', dtype: 'q4',
            progress_callback: function (r) {
              if (!r) return;
              if (r.status === 'progress') {
                var key = r.file || 'fichier'; seen[key] = { loaded: r.loaded || 0, total: r.total || 0 };
                if ((r.loaded || 0) > 0) downloadedAny = true;
                var a = aggregate(seen);
                var pct = a.total > 0 ? Math.round(a.loaded / a.total * 100) : (typeof r.progress === 'number' ? Math.round(r.progress * 100) : S.progress);
                S.progress = pct; S.detail = key + ' ' + pct + ' %';
                tick('poids', 'downloading', pct, 'poids du modèle…', key + ' ' + pct + ' %');
              } else if (r.status === 'done') { tick('poids', 'downloading', S.progress, (r.file || 'fichier') + ' OK'); }
            }
          });
          pipe = p; picked = ids[i]; S.model = picked; lastErr = null; break;
        } catch (e) {
          lastErr = e; pipe = null;
          // Poids déjà reçus = vrai problème réseau : on n'essaie PAS un autre
          // modèle (aucun double téléchargement). Seul un manifeste introuvable
          // (dépôt renommé) justifie le candidat suivant.
          if (downloadedAny) break;
        }
      }
      if (!pipe) throw err('LOAD_FAIL', 'Modèle CPU indisponible (' + CANDIDATES.map(function (c) { return c.id; }).join(', ') + ') : ' + ((lastErr && lastErr.message) || 'échec') + '. Vérifie la connexion, puis Réessaie (une seule tentative à la fois).');
      set('loading', 'chargement en mémoire…');
      tick('poids', 'loading', 100, 'chargement en mémoire…');
      set('ready', 'prêt (CPU)');
      tick('poids', 'ready', 100, 'moteur prêt');
      return true;
    } catch (e) { set('error', (e && e.message) || 'échec'); throw e; }
    finally { busy = false; }
  }
  function sysPrompt(bot) {
    return 'Tu es ' + bot.name + ', personnage simulé sans conscience réelle. ' + bot.specialty + ' ' + bot.personality + ' Réponds en français, court.';
  }
  async function chat(bot, history, opt) {
    if (!pipe || S.phase !== 'ready') throw err('NOT_LOADED', 'Modèle CPU non chargé : autorise le téléchargement puis réessaie.');
    if (busy) throw err('BUSY', 'Génération déjà en cours : attends ou annule.');
    busy = true; set('generating', 'génération…');
    var o = opt || {}, aborted = false, onAbort = function () { aborted = true; };
    try {
      if (o.signal) {
        if (o.signal.aborted) throw err('ABORTED', 'Requête annulée.');
        o.signal.addEventListener('abort', onAbort, { once: true });
      }
      var msgs = [{ role: 'system', content: sysPrompt(bot) }].concat(history);
      var out = await pipe(msgs, { max_new_tokens: 256, temperature: 0.7, do_sample: true, top_p: 0.9 });
      if (aborted) throw err('ABORTED', 'Réponse annulée.');
      var g = out && out[0] && out[0].generated_text, t = '';
      if (Array.isArray(g)) { var last = g[g.length - 1]; t = (last && (last.content || last.text)) || ''; }
      else if (typeof g === 'string') { t = g; }
      t = String(t).trim();
      if (!t) throw err('EMPTY', 'Réponse vide du moteur.');
      return t;
    } finally { busy = false; if (o.signal) { try { o.signal.removeEventListener('abort', onAbort); } catch (e) {} } if (S.phase === 'generating') set('ready', 'prêt (CPU)'); }
  }
  async function unload() { try { if (pipe && pipe.dispose) await pipe.dispose(); } catch (e) {} pipe = null; set('idle', 'déchargé (mémoire libérée)'); }
  function summary() { return { phase: S.phase, model: S.model || picked, progress: S.progress, detail: S.detail, mode: S.phase === 'ready' || S.phase === 'generating' ? 'CPU/WASM local' : '—', backend: 'wasm' }; }
  global.ViaWasmEngine = { CANDIDATES: CANDIDATES, load: load, chat: chat, unload: unload, summary: summary, CDN: CDN };
})(window);
