/* ===== KeffStation App Module ===== */
/* Loaded as ES module with proper error handling */

// ============ DATA ============
const APPS = [
  {
    num: "Kifftech",
    title: "Smart devices & gadgets",
    desc: "Boutique PWA : Samsung, Xiaomi, prix sous officiels, livraison mondiale. Backend Node unique, zéro dépendance, données JSON.",
    tags: ["PWA", "Node", "E-commerce", "Smart tech"],
    appUrl: "https://samuelhaihornberg.github.io/Kiff-Tech/",
    subArticles: [
      { title: "Catalogue Samsung", desc: "Galaxy Buds, SmartTag, chargeurs rapides — fiches complètes.", tags: ["Samsung", "Audio", "Accessoires"] },
      { title: "Catalogue Xiaomi", desc: "Redmi Buds, Smart Band, caméras Wi-Fi — specs et prix.", tags: ["Xiaomi", "Fitness", "Maison"] },
      { title: "Guide d'achat", desc: "Comment choisir vos écouteurs, bracelets, gadgets selon votre usage.", tags: ["Guide", "Conseil", "Achat"] },
      { title: "Offres VIP", desc: "Accès anticipé, remises exclusives, abonnements mensuels.", tags: ["VIP", "Promo", "Abonnement"] },
      { title: "Galaxy Buds 3 Pro : ANC adaptatif", desc: "Nouveaux écouteurs Samsung avec réduction de bruit IA, 30h autonomie, boîtier sans fil. Prix compétitif vs AirPods Pro 2.", tags: ["Samsung", "Audio", "ANC", "Nouveauté"] },
      { title: "Xiaomi Smart Band 9 Pro : AMOLED 1.74\"", desc: "Écran AMOLED 1.74\", GPS intégré, 21 jours autonomie, 150+ modes sport. Meilleur rapport qualité/prix fitness 2024.", tags: ["Xiaomi", "Fitness", "AMOLED", "GPS"] },
      { title: "Samsung Galaxy SmartTag 3 : UWB + Thread", desc: "Tracker nouvelle génération avec Ultra Wideband précis, compatibilité Matter/Thread, 1 an autonomie. Trouvez tout instantanément.", tags: ["Samsung", "Tracker", "UWB", "Matter"] },
      { title: "Chargeur 65W GaN 3 ports : ultra-compact", desc: "Charge rapide 65W (2x USB-C + 1x USB-A), nitrure de gallium, taille carte crédit. Idéal voyage multi-appareils.", tags: ["Chargeur", "GaN", "Voyage", "Multi-port"] },
      { title: "Xiaomi Redmi Buds 6 Pro : LDAC + ANC 55dB", desc: "Écouteurs Hi-Res LDAC, ANC hybride 55dB, 38h autonomie, 3 micros IA. Qualité audiophile sous 100€.", tags: ["Xiaomi", "Audio", "LDAC", "ANC"] },
      { title: "Samsung Galaxy Watch 7 : BioActive + IA", desc: "Capteur BioActive 2.0, analyse sommeil IA, ECG/TA, 40h autonomie, Wear OS 5. Santé complète au poignet.", tags: ["Samsung", "Montre", "Santé", "IA"] },
      { title: "Robot aspirateur Xiaomi X20 Pro : LDS + IA", desc: "Navigation LDS 360°, reconnaissance objets IA, serpillière auto-lift, station vidage 60 jours. Maison propre sans effort.", tags: ["Xiaomi", "Robot", "IA", "Maison"] },
      { title: "Chargeur sans fil 50W MagSafe compatible", desc: "Charge magnétique 50W (iPhone 15+), ventilation active, indicateur LED, 30 min pour 50%. Bureau ou voiture.", tags: ["Chargeur", "MagSafe", "Sans-fil", "Rapide"] },
      { title: "Xiaomi 14 Ultra : photo Leica 1\"", desc: "Capteur 1 pouce, optique Leica Summilux, ouverture variable, 8K vidéo. Photographie mobile niveau pro.", tags: ["Xiaomi", "Photo", "Leica", "Pro"] },
      { title: "Samsung Galaxy Z Fold 6 : pliable pro", desc: "Écran 7.6\" QXGA+, Snapdragon 8 Gen 3, S-Pen, IP48, 7 ans mises à jour. Productivité pliable ultime.", tags: ["Samsung", "Foldable", "Productivité", "Flagship"] }
    ]
  },
  {
    num: "Tricktrocjob",
    title: "Plateforme Trix / Trox / Services",
    desc: "Échange d'astuces pas à pas, troc d'objets, services entre particuliers. Frais dégressifs 17%→5%, double porte-monnaie (solde + crédits).",
    tags: ["Marketplace", "Troc", "Crédits", "Communauté"],
    appUrl: "https://samuelhaihornberg.github.io/keffjobtrictrocc/",
    subArticles: [
      { title: "Comment créer un Trix", desc: "Tutoriel pas à pas pour publier votre astuce ou tutoriel.", tags: ["Tutoriel", "Publication", "Trix"] },
      { title: "Échanger un Trox", desc: "Mettre en ligne un objet, gérer les propositions, finaliser l'échange.", tags: ["Trox", "Échange", "Objet"] },
      { title: "Proposer un Service", desc: "Créer une offre de service, fixer le prix, gérer les clients.", tags: ["Service", "Freelance", "Compétence"] },
      { title: "Gagner des crédits", desc: "Système de récompenses, parrainage, bonus de validation.", tags: ["Crédits", "Récompense", "Économie"] },
      { title: "Créer un Trix viral : structure gagnante", desc: "Titre accrocheur, étapes numérotées, photos qualité, prix en crédits. Exemples de Trix à 10k+ vues.", tags: ["Trix", "Viral", "Rédaction", "Visibilité"] },
      { title: "Négocier un Trox : techniques gagnantes", desc: "Évaluer la valeur, proposer contre-offre, photos sous angles, description honnête. Évitez les arnaques.", tags: ["Trox", "Négociation", "Sécurité", "Évaluation"] },
      { title: "Service récurrent : revenus passifs", desc: "Abonnement mensuel, facturation auto, fidélisation clients. Ex: maintenance PC, cours hebdo, livraison courses.", tags: ["Service", "Récurrent", "Revenus", "Automatisation"] },
      { title: "Parrainage : 500 crédits par filleul", desc: "Partagez votre lien, filleul valide son 1er échange = 500 crédits chacun. Illimité, cumulable avec promos.", tags: ["Parrainage", "Crédits", "Récompense", "Viral"] },
      { title: "Trix vidéo : format court engageant", desc: "60-90 sec, hook 3 sec, démo claire, CTA crédits. Format vertical, sous-titres, musique libre. +300% engagement.", tags: ["Trix", "Vidéo", "Format", "Engagement"] },
      { title: "Objets rares : authentification pro", desc: "Service expertise gratuite pour objets >500€. Certificat authenticité, estimation marché, assurance transport incluse.", tags: ["Expertise", "Authentique", "Luxe", "Sécurité"] },
      { title: "Communauté locale : rencontres mensuelles", desc: "Événements ville par ville, échanges en main propre, ateliers réparation. Zéro frais port, confiance directe.", tags: ["Communauté", "Local", "Rencontre", "Échange"] },
      { title: "Dashboard vendeur : stats temps réel", desc: "Vues, favoris, conversions, revenus crédits/€. Alertes prix, relance paniers, export CSV. Pilotage pro.", tags: ["Dashboard", "Stats", "Vente", "Pro"] },
      { title: "API publique : intégration tierce", desc: "REST + Webhooks, taux limités, scopes granulaires. Intégrez Tricktroc dans votre app.", tags: ["API", "Intégration", "Dev", "Webhook"] },
      { title: "Mode hors-ligne : PWA offline-first", desc: "Cache intelligent, sync différée, conflits résolus. Travaillez sans connexion.", tags: ["PWA", "Offline", "Sync", "Cache"] }
    ]
  },
  {
    num: "ViArtificial labs",
    title: "cos, SuperBots, BLM, BLSM",
    desc: "Syntaxe cos (connexions), famille SuperBots (ViA, BTB+Golem, Geeko, Guideoplan), blocs logiques BLM/BLSM, motor.s injection.",
    tags: ["cos", "SuperBots", "BLM", "motor.s"],
    appUrl: "https://samuelhaihornberg.github.io/ViArtificial/",
    subArticles: [
      { title: "Syntaxe cos", desc: "Référence complète : connexions, sandwich, adresses, CSM.", tags: ["cos", "Syntax", "Référence"] },
      { title: "SuperBots", desc: "ViA, BTB+Golem, Geeko, Guideoplan — personnalités et rôles.", tags: ["SuperBots", "IA", "Personnalité"] },
      { title: "BLM & BLSM", desc: "Blocs de logique matricielle et bloc de création médias.", tags: ["BLM", "BLSM", "Logique", "Création"] },
      { title: "motor.s", desc: "Bibliothèque emojis, COS, EMOJI, MS, FENETRE, RECYCLOR, BOOST, SUPERSTREAM.", tags: ["motor.s", "Moteurs", "Injection"] },
      { title: "Guide cos : connexions & adresses", desc: "Syntaxe A1 ➡️ B2, adresses alphanum, sandwich miroir. Exemples prêts à l'emploi pour devs.", tags: ["cos", "Tutoriel", "Connexions", "Dev"] },
      { title: "ViA : configurer votre miroir IA", desc: "Personnalité, ton, limites, mémoire. Exemples prompts système pour assistant personnel, coach, analyste.", tags: ["ViA", "Config", "Prompt", "IA"] },
      { title: "BTB + Golem : sécurité & moteur", desc: "BTB valide, Golem exécute. Pipeline CI/CD, tests auto, rollback auto. Architecture zero-trust.", tags: ["BTB", "Golem", "Sécurité", "CI/CD"] },
      { title: "Geeko Geekette : dev companion", desc: "Revues code, debug, doc auto, tests unitaires. Intégration VS Code, GitHub, GitLab. Pair programming IA.", tags: ["Geeko", "Dev", "Code", "IDE"] },
      { title: "Guideoplan : plan perso → pro", desc: "Matrice 15/28, budget, timeline, risques. Export PDF/Notion. Sync bidirectionnel vie pro/perso.", tags: ["Guideoplan", "Planification", "Budget", "Sync"] },
      { title: "BLM : blocs logiques réutilisables", desc: "Créer, versionner, composer blocs. Marketplace communautaire, tests auto, rollback 1-clic. Gouvernance code.", tags: ["BLM", "Blocs", "Réutilisable", "Gouvernance"] },
      { title: "BLSM : générer images/sons/3D", desc: "Prompts structurés, seeds reproductibles, variations contrôlées. Export assets jeu/web/app. Pipeline créatif.", tags: ["BLSM", "Génératif", "Assets", "Pipeline"] },
      { title: "motor.s injection : noyau partiel", desc: "MOTOR.noyau(['COS','FENETRE']) — 50KB gzippé. CDN global, cache éternel, versioning sémantique. Zéro config.", tags: ["motor.s", "Injection", "CDN", "Performance"] },
      { title: "ERN : mémoire distribuée", desc: "Entités-Relations-Nœuds, graphe persistant, requêtes locales. Mémoire IA souveraine.", tags: ["ERN", "Mémoire", "Graphe", "Souveraineté"] }
    ]
  }
];

function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

class KeffStation {
  constructor() {
    this.apps = APPS;
    this.current = 0;
    this.subCurrent = 0;
    this.startX = 0;
    this.currentAngle = 0;
    this.isDragging = false;
    this.initialized = false;
    this.loadingProgress = 0;

    // DOM elements
    this.prisme = document.getElementById('prisme');
    this.nav = document.getElementById('nav');
    this.gesture = document.getElementById('gesture');
    this.arrows = document.getElementById('arrows');
    this.loading = document.getElementById('loading');
    this.loadingBar = document.getElementById('loading-bar-inner');

    // Debug: check if elements are found
    const elementsFound = {
      prisme: !!this.prisme,
      nav: !!this.nav,
      gesture: !!this.gesture,
      arrows: !!this.arrows,
      loading: !!this.loading,
      particules: !!document.getElementById('particules')
    };
    console.log('KeffStation constructor - Elements found:', elementsFound);
    
    // Check for missing elements
    const missing = Object.entries(elementsFound).filter(([_, found]) => !found).map(([name]) => name);
    if (missing.length > 0) {
      const msg = 'Missing DOM elements: ' + missing.join(', ');
      console.error('KeffStation constructor - Missing elements:', missing);
      const loading = document.getElementById('loading');
      if (loading) {
        loading.textContent = '❌ Erreur: ' + msg;
        loading.style.color = '#ff3d9a';
      }
      throw new Error(msg);
    }
    console.log('All elements found, continuing...');

    this.faces = null;
    this.dots = null;
    this.current = 0;
    this.subCurrent = 0;
    this.startX = 0;
    this.currentAngle = 0;
    this.isDragging = false;
    this.initialized = false;
  }

  async init() {
    try {
      console.log('KeffStation: Starting initialization...');
      this.setProgress(5, '🔄 Initialisation...');
      
      // Validate endpoints first
      console.log('KeffStation: Validating endpoints...');
      this.setProgress(15, '🔍 Vérification des endpoints...');
      await this.validateEndpoints();
      console.log('KeffStation: Endpoints validated');
      this.setProgress(25, '✅ Endpoints validés');

      // Build UI
      console.log('KeffStation: Building UI...');
      this.setProgress(35, '🏗️ Construction de l\'interface...');
      this.buildUI();
      console.log('KeffStation: UI built');
      this.setProgress(50, '✅ Interface construite');

      // Setup event listeners
      console.log('KeffStation: Setting up event listeners...');
      this.setProgress(60, '⌨️ Configuration des événements...');
      this.setupEventListeners();
      console.log('KeffStation: Event listeners set up');
      this.setProgress(70, '✅ Événements configurés');

      // Initialize particles
      console.log('KeffStation: Initializing particles...');
      this.setProgress(80, '✨ Initialisation des particules...');
      this.initParticles();
      console.log('KeffStation: Particles initialized');
      this.setProgress(90, '✅ Particules prêtes');

      // Hide loading
      console.log('KeffStation: Hiding loading...');
      this.setProgress(95, '🎯 Presque prêt...');
      this.hideLoading();
      console.log('KeffStation: Loading hidden');
      this.setProgress(100, '✅ KeffStation prêt');

      this.initialized = true;
      console.log('KeffStation initialized successfully');
    } catch (error) {
      console.error('Initialization failed:', error);
      this.showError(error?.message || error?.toString() || 'Erreur inconnue');
      throw error;
    }
  }

  async validateEndpoints() {
    const endpoints = this.apps.map(app => app.appUrl).filter(Boolean);
    const results = await Promise.allSettled(
      endpoints.map(url => fetch(url, { method: 'HEAD', mode: 'no-cors' }).catch(() => true))
    );

    const failed = endpoints.filter((_, i) => results[i].status === 'rejected');
    if (failed.length > 0) {
      console.warn('Some endpoints unreachable (may be CORS):', failed);
    }
    // Continue anyway - we have fallback data
  }

  buildUI() {
    // Build prisme faces
    this.apps.forEach((app, i) => {
      const face = document.createElement('div');
      face.className = 'face' + (i === 0 ? ' active' : '');
      face.dataset.index = i;
      const sub = app.subArticles[0];
      face.innerHTML = `
        <div class="num">${sanitizeHTML(app.num)}</div>
        <h2><a href="${sanitizeHTML(app.appUrl)}" target="_blank" rel="noopener noreferrer" class="app-link">${sanitizeHTML(app.title)}</a></h2>
        <p>${sanitizeHTML(app.desc)}</p>
        <div class="sub-article">
          <h3>${sanitizeHTML(sub.title)}</h3>
          <p>${sanitizeHTML(sub.desc)}</p>
          <div class="tags">${sub.tags.map(t => `<span class="tag">${sanitizeHTML(t)}</span>`).join('')}</div>
        </div>
        <div class="sub-nav">
          <span class="sub-indicator">1/${app.subArticles.length}</span>
        </div>
        <div class="tags">${app.tags.map(t => `<span class="tag">${sanitizeHTML(t)}</span>`).join('')}</div>
      `;
      document.getElementById('prisme').appendChild(face);

      // Roadmap button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = app.num;
      btn.setAttribute('aria-label', app.num);
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => this.goTo(i));
      this.nav.appendChild(btn);
    });

    this.faces = document.getElementById('prisme').children;
    this.dots = this.nav.children;

    // Initial render
    this.renderSubArticle();
  }

  setupEventListeners() {
    // Roadmap clicks
    this.nav.querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => this.goTo(i));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.goTo(this.current - 1);
      else if (e.key === 'ArrowRight') this.goTo(this.current + 1);
      else if (e.key === 'ArrowUp') this.goSub(-1);
      else if (e.key === 'ArrowDown') this.goSub(1);
    });

    // Arrow buttons
    if (this.arrows) {
      this.arrows.querySelector('.arrow-left')?.addEventListener('click', () => this.goTo(this.current - 1));
      this.arrows.querySelector('.arrow-right')?.addEventListener('click', () => this.goTo(this.current + 1));
      this.arrows.querySelector('.arrow-up')?.addEventListener('click', () => this.goSub(-1));
      this.arrows.querySelector('.arrow-down')?.addEventListener('click', () => this.goSub(1));
    }

    // Touch drag
    const gesture = document.getElementById('gesture');
    if (gesture) {
      gesture.addEventListener('pointerdown', (e) => this.onDragStart(e));
      gesture.addEventListener('pointermove', (e) => this.onDragMove(e));
      gesture.addEventListener('pointerup', (e) => this.onDragEnd(e));
      gesture.addEventListener('pointercancel', () => this.onDragEnd(null));
      gesture.addEventListener('touchstart', (e) => this.onDragStart(e), { passive: true });
      gesture.addEventListener('touchmove', (e) => this.onDragMove(e), { passive: true });
      gesture.addEventListener('touchend', (e) => this.onDragEnd(e));
      gesture.addEventListener('touchcancel', () => this.onDragEnd(null));
    }
  }

  goTo(i, animate = true) {
    if (!this.faces || !this.faces.length) return;
    if (i < 0) i = this.faces.length - 1;
    if (i >= this.faces.length) i = 0;
    if (i === this.current) return;

    this.current = i;
    this.subCurrent = 0;

    const angle = -this.current * 120;
    this.prisme.style.transition = animate ? 'transform .7s cubic-bezier(.2,.8,.2,1)' : 'none';
    this.prisme.style.transform = `rotateY(${angle}deg)`;

    Array.from(this.faces).forEach((f, idx) => {
      f.classList.toggle('active', idx === this.current);
    });
    Array.from(this.nav.children).forEach((d, idx) => d.classList.toggle('active', idx === this.current));

    // Update data-face attributes for theming
    document.getElementById('arrows')?.setAttribute('data-face', this.current);
    document.getElementById('nav')?.setAttribute('data-face', this.current);

    this.subCurrent = 0;
    this.renderSubArticle();
  }

  renderSubArticle() {
    const app = APPS[this.current];
    if (!app) return;
    const sub = app.subArticles[this.subCurrent];
    const face = this.faces[this.current];
    if (!face) return;

    const subEl = face.querySelector('.sub-article');
    const indicator = face.querySelector('.sub-indicator');
    if (subEl && sub) {
      subEl.innerHTML = `
        <h3>${sanitizeHTML(sub.title)}</h3>
        <p>${sanitizeHTML(sub.desc)}</p>
        <div class="tags">${sub.tags.map(t => `<span class="tag">${sanitizeHTML(t)}</span>`).join('')}</div>
      `;
    }
    if (indicator) {
      indicator.textContent = `${this.subCurrent + 1}/${app.subArticles.length}`;
    }
    // Update roadmap active state
    Array.from(this.nav.children).forEach((d, idx) => d.classList.toggle('active', idx === this.current));
  }

  goSub(delta) {
    const app = APPS[this.current];
    if (!app) return;
    const max = app.subArticles.length - 1;
    this.subCurrent = Math.max(0, Math.min(max, this.subCurrent + delta));
    this.renderSubArticle();
  }

  onDragStart(e) {
    this.isDragging = true;
    this.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    this.currentAngle = -this.current * 120;
    this.prisme.style.transition = 'none';
    if (e.target?.setPointerCapture) e.target.setPointerCapture(e.pointerId);
  }

  onDragMove(e) {
    if (!this.isDragging) return;
    const dx = (e.clientX ?? e.touches?.[0]?.clientX ?? 0) - this.startX;
    const angle = this.currentAngle + dx * 0.5;
    this.prisme.style.transform = `rotateY(${angle}deg)`;
  }

  onDragEnd(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    const dx = (e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0) - this.startX;
    const threshold = 60;
    if (Math.abs(dx) > threshold) {
      this.goTo(this.current + (dx > 0 ? -1 : 1));
    } else {
      this.goTo(this.current);
    }
    if (e.target?.releasePointerCapture) e.target.releasePointerCapture(e.pointerId);
  }
  initParticles() {
    try {
      const container = document.getElementById('particules');
      if (!container) {
        console.warn('initParticles: particules container not found');
        return;
      }
      const colors = ['#1e6bff','#ff3d9a','#ffd23f','#27d17f','#8a4dff'];
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particule';
        const sx = (Math.random() - .5) * window.innerWidth * .8;
        const sy = (Math.random() - .5) * window.innerHeight * .8;
        const ex = (Math.random() - .5) * window.innerWidth * .8;
        const ey = (Math.random() - .5) * window.innerHeight * .8;
        const delay = Math.random() * 12;
        const dur = 10 + Math.random() * 8;
        const op = .15 + Math.random() * .25;
        const clr = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `left:50%;top:50%;--sx:${sx}px;--sy:${sy}px;--ex:${ex}px;--ey:${ey}px;--op:${op};background:${clr};animation-duration:${dur}s;animation-delay:${delay}s`;
        container.appendChild(p);
      }
    } catch (e) {
      console.error('initParticles error:', e);
    }
  }

  hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  }

  showError(msg) {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.textContent = '❌ ' + msg;
      loading.style.color = '#ff3d9a';
    }
  }

  setProgress(percent, text) {
    if (this.loadingBar) {
      this.loadingBar.style.width = percent + '%';
    }
    const loadingText = this.loading?.querySelector('.loading-text');
    if (loadingText && text) {
      loadingText.textContent = text;
    }
  }
}

// ============ INIT ============
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  console.log('initApp called, readyState:', document.readyState);
  const loading = document.getElementById('loading');
  if (loading) {
    loading.textContent = '🔄 Initialisation...';
    console.log('Loading element found');
  } else {
    console.error('Loading element NOT found!');
  }

  const timeoutId = setTimeout(() => {
    if (loading) {
      loading.textContent = '⚠️ Initialisation lente...';
      loading.style.color = '#ffd23f';
    }
  }, 5000);

  try {
    window.keffStation = new KeffStation();
    console.log('KeffStation created, starting init...');
    window.keffStation.setProgress(2, '📦 Chargement du module...');
    window.keffStation.init().then(() => {
      clearTimeout(timeoutId);
      const loading = document.getElementById('loading');
      if (loading) {
        loading.textContent = '✅ KeffStation prêt';
        loading.style.color = '#27d17f';
        setTimeout(() => loading.classList.add('hidden'), 1000);
      }
    }).catch(e => {
      clearTimeout(timeoutId);
      console.error('App init failed:', e);
      const loading = document.getElementById('loading');
      if (loading) {
        loading.textContent = '❌ Erreur: ' + (e?.message || e?.toString() || 'Erreur inconnue');
        loading.style.color = '#ff3d9a';
      }
    });
  } catch (e) {
    clearTimeout(timeoutId);
    console.error('Constructor/InitApp sync error:', e);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.textContent = '❌ Erreur sync: ' + (e?.message || e?.toString() || 'Erreur inconnue');
      loading.style.color = '#ff3d9a';
    }
  }
}

// Expose for debugging
window.KeffStation = KeffStation;
console.log('KeffStation module loaded');