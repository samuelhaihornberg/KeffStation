/* Moteur LLM en Web Worker — Transformers.js v3 sur CPU/WASM (AUCUN WebGPU).
   Docs vérifiées (huggingface.co/docs/transformers.js) : pipeline text-generation,
   messages [{role,content}], TextStreamer(skip_prompt), progress_callback, env.fetch.
   - Importe le runtime depuis CDN (mise en cache HTTP navigateur).
   - Inférence HORS thread principal : l'interface reste réactive.
   - Sans COOP/COEP (GitHub Pages ne définit pas ces en-têtes), ONNX Runtime utilise
     WASM monothread automatiquement (pas de SharedArrayBuffer requis).
   - Annulation du téléchargement : env.fetch enveloppé avec AbortController
     (le runtime le permet) ; annulation en génération : worker terminé côté client. */
import { pipeline, TextStreamer, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/+esm';

env.allowLocalModels = false;

var OFFICIAL_SMOLLM2_TEMPLATE = "{% for message in messages %}{% if loop.first and messages[0]['role'] != 'system' %}{{ '<|im_start|>system\nYou are a helpful AI assistant named SmolLM, trained by Hugging Face<|im_end|>\n' }}{% endif %}{{'<|im_start|>' + message['role'] + '\n' + message['content'] + '<|im_end|>' + '\n'}}{% endfor %}{% if add_generation_prompt %}{{ '<|im_start|>assistant\n' }}{% endif %}";

var pipe = null, picked = null, ctl = null;
var tokInfo = { source: 'inconnu', hasTemplate: false };

env.fetch = function (url, init) {
  try { return fetch(url, Object.assign({}, init || {}, ctl ? { signal: ctl.signal } : {})); }
  catch (e) { return fetch(url, init); }
};

function send(id, msg) { postMessage(Object.assign({ id: id }, msg)); }

onmessage = async function (e) {
  var m = e.data || {}, id = m.id, cmd = m.cmd, p = m.payload || {};
  try {
    if (cmd === 'load') {
      ctl = new AbortController();
      var ids = p.modelId ? [p.modelId] : (p.candidates || []);
      var lastErr = null, downloadedAny = false;
      for (var i = 0; i < ids.length; i++) {
        var seen = {};
        try {
          send(id, { type: 'stage', group: 'runtime', phase: 'downloading', progress: 5, detail: 'runtime Transformers.js (CPU/WASM)…' });
          var prog = function (r) {
            if (!r) return;
            if (r.status === 'progress') {
              var key = r.file || 'fichier'; seen[key] = { loaded: r.loaded || 0, total: r.total || 0 };
              if ((r.loaded || 0) > 0) downloadedAny = true;
              var L = 0, Tt = 0; for (var k in seen) { L += seen[k].loaded; Tt += seen[k].total; }
              var pct = Tt > 0 ? Math.round(L / Tt * 100) : (typeof r.progress === 'number' ? Math.round(r.progress * 100) : 0);
              send(id, { type: 'progress', group: 'poids', progress: pct, detail: key + ' ' + pct + ' %' });
            } else if (r.status === 'done' || r.status === 'ready') { send(id, { type: 'progress', group: 'poids', progress: 100, detail: (r.file || 'fichier') + ' OK' }); }
          };
          var pl = await pipeline('text-generation', ids[i], { device: 'wasm', dtype: 'q4', progress_callback: prog });
          pipe = pl; picked = ids[i]; lastErr = null; break;
        } catch (err) { lastErr = err; pipe = null; if (downloadedAny) break; }
      }
      if (!pipe) throw { code: 'LOAD_FAIL', message: 'Modèle CPU indisponible : ' + ((lastErr && lastErr.message) || 'échec') + '. Vérifie la connexion, puis Réessaie (une seule tentative à la fois).' };
      try {
        if (pipe.tokenizer && pipe.tokenizer.chat_template) { tokInfo = { source: 'distribué avec le modèle', hasTemplate: true }; }
        else if (pipe.tokenizer && /SmolLM2/i.test(picked || '')) { pipe.tokenizer.chat_template = OFFICIAL_SMOLLM2_TEMPLATE; tokInfo = { source: 'officiel restauré (HuggingFaceTB/SmolLM2-360M-Instruct)', hasTemplate: !!pipe.tokenizer.chat_template }; }
        else if (pipe.tokenizer) { tokInfo = { source: 'absent de la distribution (' + picked + ')', hasTemplate: false }; }
        else { tokInfo = { source: 'tokenizer introuvable', hasTemplate: false }; }
      } catch (err2) { tokInfo = { source: 'restauration impossible : ' + (err2 && err2.message), hasTemplate: false }; }
      if (!tokInfo.hasTemplate) throw { code: 'NO_CHAT_TEMPLATE', message: 'Template de conversation absent pour ' + picked + ' : génération impossible sans inventer de format.' };
      send(id, { type: 'ready', model: picked, tokenizer: tokInfo.source });
    } else if (cmd === 'chat') {
      if (!pipe) throw { code: 'NOT_LOADED', message: 'Modèle non chargé.' };
      if (!pipe.tokenizer || !pipe.tokenizer.chat_template) throw { code: 'NO_CHAT_TEMPLATE', message: 'Template de conversation absent pour ' + (picked || 'ce modèle') + ' : recharge le modèle.' };
      var stream = null;
      try {
        stream = new TextStreamer(pipe.tokenizer, { skip_prompt: true, skip_special_tokens: true, callback_function: function (t) { send(id, { type: 'token', text: t }); } });
      } catch (err3) { stream = null; }
      var out = await pipe(p.messages, { max_new_tokens: 128, temperature: 0.7, do_sample: true, top_p: 0.9, streamer: stream });
      var g = out && out[0] && out[0].generated_text, t = '';
      if (Array.isArray(g)) { var last = g[g.length - 1]; t = (last && (last.content || last.text)) || ''; }
      else if (typeof g === 'string') { t = g; }
      t = String(t).trim();
      if (!t) throw { code: 'EMPTY', message: 'Réponse vide du moteur.' };
      send(id, { type: 'done', text: t });
    } else if (cmd === 'cancel') {
      if (ctl) { try { ctl.abort(); } catch (e) {} }
      send(id, { type: 'cancelled' });
    } else if (cmd === 'unload') {
      pipe = null; picked = null;
      send(id, { type: 'done' });
    } else {
      throw { code: 'UNKNOWN_CMD', message: 'Commande inconnue : ' + cmd };
    }
  } catch (err) {
    var code = (err && err.code) || 'ERROR';
    if (code === 'ERROR' && err && err.name === 'AbortError') code = 'ABORTED';
    send(id, { type: 'error', code: code, message: (err && err.message) || String(err) });
  }
};
