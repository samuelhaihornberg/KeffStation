/* Fournisseurs de modèles — ViArtificial Labs (PWA statique, GitHub Pages).
   Séparation : profils (bots.json) / interface (conversation.html) / moteurs (ce fichier).
   - Par défaut : AUCUN moteur configuré. L'UI doit afficher son absence, jamais simuler.
   - Local/économique d'abord : Ollama local (gratuit, sans clé, sans abonnement).
   - Endpoint compatible OpenAI en option, saisi par l'utilisateur. OpenAI non imposé.
   - Clé éventuelle : mémoire de session uniquement, jamais persistée, loggée ni commitée.
   - Pages statiques : secret serveur requis => passer par un proxy adapté, jamais en direct. */
(function (global) {
  'use strict';
  var KEY = 'via-engine'; // localStorage : provider/baseUrl/model uniquement, JAMAIS de clé.
  var DEFAULTS = { provider: 'none', baseUrl: 'http://localhost:11434', model: 'llama3.2' };
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || '{}');
      return { provider: s.provider || 'none', baseUrl: s.baseUrl || DEFAULTS.baseUrl, model: s.model || DEFAULTS.model };
    } catch (e) { return { provider: 'none', baseUrl: DEFAULTS.baseUrl, model: DEFAULTS.model }; }
  }
  function save(cfg) {
    try { localStorage.setItem(KEY, JSON.stringify({ provider: cfg.provider, baseUrl: cfg.baseUrl, model: cfg.model })); } catch (e) {}
  }
  function status(cfg) {
    if (!cfg || cfg.provider === 'none') return { ok: false, label: 'Aucun moteur IA configuré' };
    if (cfg.provider === 'webllm') return { ok: false, label: 'WebLLM non intégré (voir Moteurs linguistiques)' };
    if (cfg.provider === 'ollama') return { ok: true, label: 'Ollama local — ' + cfg.model };
    return { ok: true, label: 'Endpoint personnalisé — ' + cfg.model };
  }
  async function ping(cfg, signal) {
    if (!cfg || cfg.provider === 'none') throw err('NO_ENGINE', 'Aucun moteur IA configuré.');
    if (cfg.provider === 'webllm') throw err('NOT_AVAILABLE', 'WebLLM non intégré.');
    if (cfg.provider === 'ollama') {
      var base = (cfg.baseUrl || '').replace(/\/$/, '');
      var res;
      try { res = await fetch(base + '/api/tags', { signal: signal }); }
      catch (e) { if (e && e.name === 'AbortError') throw err('ABORTED', 'Vérification annulée.'); throw err('UNREACHABLE', 'Moteur injoignable (' + base + ').'); }
      if (!res.ok) throw err('HTTP_' + res.status, 'Moteur injoignable (HTTP ' + res.status + ').');
      return true;
    }
    throw err('UNVERIFIED', 'Endpoint personnalisé : lance « Tester » dans Réglages.');
  }
  function err(code, message) { var e = new Error(message); e.code = code; return e; }
  function sysPrompt(bot) {
    return 'Tu incarnes ' + bot.name + ', personnage simulé sans conscience réelle. ' + bot.specialty + ' ' + bot.personality;
  }
  async function chat(cfg, bot, history, signal, sessionKey) {
    if (cfg.provider === 'none') throw err('NO_ENGINE', 'Aucun moteur IA configuré. Choisis Ollama local ou un endpoint ci-dessous.');
    if (cfg.provider === 'webllm') throw err('NOT_AVAILABLE', 'WebLLM non intégré à cette PWA. Voir la page Moteurs linguistiques.');
    var base = (cfg.baseUrl || '').replace(/\/$/, '');
    var messages = [{ role: 'system', content: sysPrompt(bot) }].concat(history);
    var headers = { 'Content-Type': 'application/json' };
    var url, body;
    if (cfg.provider === 'ollama') {
      url = base + '/api/chat';
      body = { model: cfg.model, messages: messages, stream: false };
    } else {
      url = base + '/chat/completions';
      body = { model: cfg.model, messages: messages };
      if (sessionKey) headers.Authorization = 'Bearer ' + sessionKey; // mémoire session, jamais persistée.
    }
    var res;
    try {
      res = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body), signal: signal });
    } catch (e) {
      if (e && e.name === 'AbortError') throw err('ABORTED', 'Requête annulée.');
      throw err('UNREACHABLE', 'Moteur injoignable (' + base + '). Vérifie qu’il est démarré.');
    }
    if (!res.ok) throw err('HTTP_' + res.status, 'Le moteur répond en erreur (HTTP ' + res.status + ').');
    var data = await res.json();
    var text = (data.message && data.message.content) || (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
    if (!text) throw err('EMPTY', 'Réponse vide du moteur.');
    return text;
  }
  global.ViaProviders = { load: load, save: save, status: status, ping: ping, chat: chat, DEFAULTS: DEFAULTS };
})(window);
