/* ===== KiffTech Agent IA - Veille Tech 2020-2026 + Prix KiffTech ===== */

// ============ PRIX KIFFTECH SYSTEM ============
const KIFFTECH_SUB_PRICE_DAILY = 1; // 1eur/jour
const KIFFTECH_SUB_MONTHLY = 30; // ~30eur/mois
const SUB_DISCOUNT_MIN = 10; // -10% min
const SUB_DISCOUNT_MAX = 21; // -21% max (avec abonnement)
const SUB_FREE_DELIVERY = true;
const PROMO_NO_SUB_THRESHOLD = 10; // 10 articles differents
const PROMO_NO_SUB_DISCOUNT = 20; // -20% sans abonnement a partir de 10 articles

// Calcule le prix KiffTech selon le contexte
function calcKiffTechPrice(officialPrice, context = {}) {
  const { isSubscriber = false, cartItems = [], isPromoEligible = false } = context;

  let discount = 0;
  let freeDelivery = false;
  let reason = '';

  if (isSubscriber) {
    // Abonne : -10% a -21% selon anciennete/engagement + livraison gratuite
    const tenureDays = context.tenureDays || 0;
    discount = Math.min(SUB_DISCOUNT_MIN + Math.floor(tenureDays / 30), SUB_DISCOUNT_MAX); // +1% par mois, max 21%
    freeDelivery = SUB_FREE_DELIVERY;
    reason = `Abonne KiffTech (${discount}% + livraison offerte)`;
  } else if (isPromoEligible || cartItems.length >= PROMO_NO_SUB_THRESHOLD) {
    // Promo sans abonnement : -20% a partir de 10 articles differents
    discount = PROMO_NO_SUB_DISCOUNT;
    reason = `Promo ${PROMO_NO_SUB_DISCOUNT}% (${PROMO_NO_SUB_THRESHOLD}+ articles differents)`;
  }

  const finalPrice = discount > 0 ? Math.round(officialPrice * (100 - discount) / 100) : officialPrice;
  const savings = officialPrice - finalPrice;

  return {
    official: officialPrice,
    kifftech: finalPrice,
    discount,
    savings,
    freeDelivery,
    reason,
    currency: 'EUR'
  };
}

// ============ PRODUCT DATABASE 2020-2026 ============
const PRODUCT_DB = [
  // 2024
  {id:"galaxy-buds-3-pro",brand:"Samsung",model:"Galaxy Buds 3 Pro",year:2024,category:"Audio",price:{official:249,currency:"EUR"},specs:{driver:"11mm dynamique + 6mm planar",anc:"Adaptatif IA 3 modes",codecs:"SSC, LDAC, AAC, SBC",anc_db:"55dB",battery:"6h+24h (ANC), 30h total",charge:"USB-C, Qi, 5min=1h",water:"IP57",weight:"5.4g/ear",colors:["Blanc","Argent","Noir"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r530nzaaxef/galaxy-buds-3-pro-sm-r530-539001567?$684_547_PNG$"],videos:["https://www.youtube.com/embed/abc123"],sources:{official:"https://www.samsung.com/fr/galaxy-buds-3-pro/",social:["twitter","youtube","reddit"],reviews:["lesnumeriques","frandroid","01net"]},tags:["ANC","IA","TWS","Premium"]},
  {id:"xiaomi-band-9-pro",brand:"Xiaomi",model:"Smart Band 9 Pro",year:2024,category:"Fitness",price:{official:69,currency:"EUR"},specs:{screen:"AMOLED 1.74\" 336x480",gps:"Intégré dual-band",battery:"21 jours typique",sports:"150+ modes",health:"SpO2, FC, stress, sommeil, ECG",water:"5ATM",nfc:"Oui",voice:"Assistant vocal",colors:["Noir","Bleu","Rose","Or"]},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-9-pro/hero.png"],videos:["https://www.youtube.com/embed/def456"],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-9-pro/",social:["twitter","youtube","xiaomi-community"],reviews:["lesnumeriques","frandroid","phonandroid"]},tags:["AMOLED","GPS","Fitness","Budget"]},
  {id:"galaxy-smarttag-3",brand:"Samsung",model:"Galaxy SmartTag 3",year:2024,category:"Tracker",price:{official:39,currency:"EUR"},specs:{tech:"UWB + Bluetooth 5.3 + Thread",matter:"Compatible",range:"120m (UWB)",battery:"1 an (CR2032)",water:"IP67",precision:"AR Finding",network:"SmartThings Find",size:"42x42x11mm",weight:"13g"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/eh-ew300kbegfr/galaxy-smarttag-3-eh-ew300-539001234?$684_547_PNG$"],videos:["https://www.youtube.com/embed/ghi789"],sources:{official:"https://www.samsung.com/fr/galaxy-smarttag-3/",social:["twitter","youtube","smartthings-community"],reviews:["lesnumeriques","frandroid","cnet"]},tags:["UWB","Thread","Matter","Tracker"]},
  {id:"galaxy-watch-7",brand:"Samsung",model:"Galaxy Watch 7",year:2024,category:"Montre",price:{official:319,currency:"EUR"},specs:{screen:"Super AMOLED 1.3\" 432x432",cpu:"Exynos W1000 3nm",ram:"2GB",storage:"32GB",health:"BioActive 2.0, ECG, TA, SpO2, sommeil IA",battery:"40h (AOD), 300mAh",os:"Wear OS 5 / One UI Watch 6",water:"5ATM + IP68",gps:"Double frequence",nfc:"Samsung Pay",sizes:["40mm","44mm"],colors:["Vert","Argent","Creme"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-l305fzdaeft/galaxy-watch-7-40mm-green-539002345?$684_547_PNG$"],videos:["https://www.youtube.com/embed/jkl012"],sources:{official:"https://www.samsung.com/fr/galaxy-watch-7/",social:["twitter","youtube","samsung-members"],reviews:["lesnumeriques","frandroid","01net","phonandroid"]},tags:["BioActive","WearOS","Sante","IA"]},
  {id:"xiaomi-robot-x20-pro",brand:"Xiaomi",model:"Robot Aspirateur X20 Pro",year:2024,category:"Maison",price:{official:899,currency:"EUR"},specs:{nav:"LDS 360 deg + RGB AI",suction:"7000 Pa",mop:"Double rotatif 180 tr/min",lift:"10mm auto",station:"Vidage 60j, lavage, sechage 45 deg C",battery:"6400 mAh, 220min",area:"350m2",app:"Xiaomi Home, cartes 3D",obstacles:"Reconnaissance IA 100+ objets"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-robot-x20-pro/hero.png"],videos:["https://www.youtube.com/embed/mno345"],sources:{official:"https://www.mi.com/global/product/xiaomi-robot-vacuum-x20-pro/",social:["twitter","youtube","xiaomi-community"],reviews:["lesnumeriques","frandroid","maisonconnectee"]},tags:["LDS","IA","Station","Premium"]},

  // 2023
  {id:"galaxy-buds-2-pro",brand:"Samsung",model:"Galaxy Buds 2 Pro",year:2023,category:"Audio",price:{official:229,currency:"EUR"},specs:{driver:"10mm woofer + 5.3mm tweeter",anc:"Intelligent ANC",codecs:"SSC HiFi 24bit, LDAC",anc_db:"45dB",battery:"5h+18h (ANC), 29h total",charge:"USB-C, Qi",water:"IPX7",weight:"5.5g/ear",colors:["Bora Purple","White","Graphite"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r510nzaaxef/galaxy-buds-2-pro-539001111?$684_547_PNG$"],videos:["https://www.youtube.com/embed/stu345"],sources:{official:"https://www.samsung.com/fr/galaxy-buds-2-pro/",social:["twitter","youtube"],reviews:["lesnumeriques","frandroid","what-hifi"]},tags:["ANC","HiFi","24bit","TWS"]},
  {id:"xiaomi-13-ultra",brand:"Xiaomi",model:"Xiaomi 13 Ultra",year:2023,category:"Smartphone",price:{official:1299,currency:"EUR"},specs:{screen:"AMOLED 6.73\" 120Hz 1\"",cpu:"Snapdragon 8 Gen 2",camera:"1\" Sony IMX989 + 3x 50MP Leica",video:"8K 24fps, 4K 120fps",battery:"5000mAh, 90W filaire, 50W sans fil",os:"HyperOS (MIUI 14)",water:"IP68",storage:"12GB/512GB",colors:["Noir","Vert","Blanc"]},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-13-ultra/hero.png"],videos:["https://www.youtube.com/embed/vwx567"],sources:{official:"https://www.mi.com/global/product/xiaomi-13-ultra/",social:["twitter","youtube","xiaomi-community"],reviews:["lesnumeriques","frandroid","dxomark","phonandroid"]},tags:["1inch","Leica","Photo","Flagship"]},
  {id:"galaxy-z-fold-5",brand:"Samsung",model:"Galaxy Z Fold 5",year:2023,category:"Smartphone",price:{official:1899,currency:"EUR"},specs:{screen:"7.6\" QXGA+ 120Hz + 6.2\" cover",cpu:"Snapdragon 8 Gen 2 for Galaxy",camera:"50MP+12MP+10MP (3x)",battery:"4400mAh, 25W+15W",os:"One UI 5.1.1",weight:"253g",fold:"Goutte d'eau","s-pen":"Support (non inclus)",colors:["Icy Blue","Phantom Black","Cream"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-f946bzaeft/galaxy-z-fold-5-539001789?$684_547_PNG$"],videos:["https://www.youtube.com/embed/yz123"],sources:{official:"https://www.samsung.com/fr/galaxy-z-fold-5/",social:["twitter","youtube","samsung-members"],reviews:["lesnumeriques","frandroid","01net"]},tags:["Foldable","S-Pen","Productivite","Flagship"]},

  // 2022
  {id:"galaxy-buds-2",brand:"Samsung",model:"Galaxy Buds 2",year:2022,category:"Audio",price:{official:149,currency:"EUR"},specs:{driver:"11mm woofer + 6.5mm tweeter",anc:"Active ANC",codecs:"AAC, SBC, SSC",anc_db:"35dB",battery:"5h+20h (ANC)",charge:"USB-C, Qi",water:"IPX2",weight:"5g/ear",colors:["Graphite","White","Olive","Lavender"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r177nzaaxef/galaxy-buds-2-539000888?$684_547_PNG$"],videos:["https://www.youtube.com/embed/abc456"],sources:{official:"https://www.samsung.com/fr/galaxy-buds-2/",social:["twitter","youtube"],reviews:["lesnumeriques","frandroid","rtings"]},tags:["ANC","Budget","TWS","Compact"]},
  {id:"xiaomi-band-7-pro",brand:"Xiaomi",model:"Smart Band 7 Pro",year:2022,category:"Fitness",price:{official:99,currency:"EUR"},specs:{screen:"AMOLED 1.64\" 280x456",gps:"Integre",battery:"12 jours",sports:"110+ modes",health:"SpO2, FC, sommeil, stress",water:"5ATM",nfc:"Oui",size:"43.7x27.3x11.6mm"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-7-pro/hero.png"],videos:["https://www.youtube.com/embed/def789"],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-7-pro/",social:["twitter","youtube"],reviews:["lesnumeriques","frandroid","phonandroid"]},tags:["AMOLED","GPS","Fitness","Milieu"]},
  {id:"galaxy-watch-5-pro",brand:"Samsung",model:"Galaxy Watch 5 Pro",year:2022,category:"Montre",price:{official:469,currency:"EUR"},specs:{screen:"Super AMOLED 1.4\" 450x450",cpu:"Exynos W920",health:"BioActive, ECG, TA, SpO2",battery:"80h, 590mAh",os:"Wear OS 3.5",water:"5ATM + IP68",gps:"Double frequence",body:"Titane, saphir",colors:["Noir Titane","Gris Titane"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r920nzaaxef/galaxy-watch-5-pro-539000777?$684_547_PNG$"],videos:["https://www.youtube.com/embed/ghi012"],sources:{official:"https://www.samsung.com/fr/galaxy-watch-5-pro/",social:["twitter","youtube","samsung-members"],reviews:["lesnumeriques","frandroid","01net"]},tags:["Titane","Outdoor","Pro","Endurance"]},

  // 2021
  {id:"galaxy-buds-pro",brand:"Samsung",model:"Galaxy Buds Pro",year:2021,category:"Audio",price:{official:229,currency:"EUR"},specs:{driver:"11mm woofer + 6.5mm tweeter",anc:"Intelligent ANC",codecs:"AAC, SBC, SSC",anc_db:"35dB",battery:"5h+18h (ANC)",charge:"USB-C, Qi",water:"IPX7",weight:"6.3g/ear",colors:["Phantom Black","Phantom Silver","Phantom Violet"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r190nzaaxef/galaxy-buds-pro-539000555?$684_547_PNG$"],videos:["https://www.youtube.com/embed/jkl678"],sources:{official:"https://www.samsung.com/fr/galaxy-buds-pro/",social:["twitter","youtube"],reviews:["lesnumeriques","frandroid","rtings"]},tags:["ANC","Premium","2021","TWS"]},
  {id:"xiaomi-mi-band-6",brand:"Xiaomi",model:"Mi Smart Band 6",year:2021,category:"Fitness",price:{official:44,currency:"EUR"},specs:{screen:"AMOLED 1.56\" 152x486",gps:"Non (connected)",battery:"14 jours",sports:"30 modes",health:"SpO2, FC, sommeil, stress",water:"5ATM",nfc:"Version NFC seulement"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/mi-smart-band-6/hero.png"],videos:["https://www.youtube.com/embed/mno901"],sources:{official:"https://www.mi.com/global/product/mi-smart-band-6/",social:["twitter","youtube","xiaomi-community"],reviews:["lesnumeriques","frandroid","phonandroid"]},tags:["AMOLED","Budget","Entree","Bestseller"]},
  {id:"galaxy-watch-4",brand:"Samsung",model:"Galaxy Watch 4",year:2021,category:"Montre",price:{official:269,currency:"EUR"},specs:{screen:"Super AMOLED 1.2\" 396x396",cpu:"Exynos W920",health:"BioActive, ECG, TA, SpO2",battery:"40h",os:"Wear OS 3 (One UI Watch)",water:"5ATM + IP68",sizes:["40mm","44mm"],colors:["Noir","Argent","Vert","Rose Gold"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r860nzaaxef/galaxy-watch-4-539000444?$684_547_PNG$"],videos:["https://www.youtube.com/embed/stu234"],sources:{official:"https://www.samsung.com/fr/galaxy-watch-4/",social:["twitter","youtube","samsung-members"],reviews:["lesnumeriques","frandroid","01net"]},tags:["WearOS3","BioActive","Premier","Samsung"]},

  // 2020
  {id:"galaxy-buds-plus",brand:"Samsung",model:"Galaxy Buds+",year:2020,category:"Audio",price:{official:149,currency:"EUR"},specs:{driver:"11mm woofer + 6.5mm tweeter",anc:"Non",codecs:"AAC, SBC, SSC",battery:"11h+22h",charge:"USB-C, Qi",water:"IPX2",weight:"6.3g/ear",colors:["Noir","Bleu","Blanc","Rouge"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r175nzaaxef/galaxy-buds-plus-539000333?$684_547_PNG$"],videos:["https://www.youtube.com/embed/vwx345"],sources:{official:"https://www.samsung.com/fr/galaxy-buds-plus/",social:["twitter","youtube"],reviews:["lesnumeriques","frandroid","rtings"]},tags:["Autonomie","Budget","2020","TWS"]},
  {id:"xiaomi-mi-band-5",brand:"Xiaomi",model:"Mi Smart Band 5",year:2020,category:"Fitness",price:{official:34,currency:"EUR"},specs:{screen:"AMOLED 1.1\" 126x294",gps:"Non",battery:"14 jours",sports:"11 modes",health:"FC, sommeil, stress, SpO2",water:"5ATM",nfc:"Version NFC"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/mi-smart-band-5/hero.png"],videos:["https://www.youtube.com/embed/yz678"],sources:{official:"https://www.mi.com/global/product/mi-smart-band-5/",social:["twitter","youtube"],reviews:["lesnumeriques","frandroid"]},tags:["AMOLED","Entree","Bestseller","2020"]},
  {id:"galaxy-watch-3",brand:"Samsung",model:"Galaxy Watch 3",year:2020,category:"Montre",price:{official:429,currency:"EUR"},specs:{screen:"Super AMOLED 1.2\" 360x360",cpu:"Exynos 9110",health:"FC, ECG, TA, SpO2, chute",battery:"56h",os:"Tizen 5.5",water:"5ATM + IP68",body:"Acier/Inox",sizes:["41mm","45mm"],colors:["Mystic Bronze","Mystic Silver","Mystic Black"]},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r840nzaaxef/galaxy-watch-3-539000222?$684_547_PNG$"],videos:["https://www.youtube.com/embed/abc789"],sources:{official:"https://www.samsung.com/fr/galaxy-watch-3/",social:["twitter","youtube","samsung-members"],reviews:["lesnumeriques","frandroid","01net"]},tags:["Tizen","Rotative","Premium","2020"]}
];

// Enrichit chaque produit avec prix KiffTech
PRODUCT_DB.forEach(p => {
  p.kifftech = calcKiffTechPrice(p.price.official);
});

// ============ MEDIA GENERATOR ============
function generateProductMedia(product) {
  const media = {
    hero: product.images[0],
    gallery: product.images.slice(1),
    video: product.videos[0],
    badges: []
  };

  if (product.videos[0]) media.badges.push({type:'video',label:'Video',class:'badge-video'});
  if (product.images.length > 1) media.badges.push({type:'gallery',label:'Galerie',class:'badge-gallery'});
  media.badges.push({type:'official',label:'Officiel',class:'badge-official'});
  media.badges.push({type:'social',label:'Social',class:'badge-social'});

  return media;
}

// ============ AGENT STATE ============
let products = [...PRODUCT_DB];
let filteredProducts = [...PRODUCT_DB];
let activeCategory = 'all';
let activeYear = 'all';
let activeBrand = 'all';
let activeSources = {official:true, social:true, reviews:true, community:true};
let searchQuery = '';
let isFetching = false;

// User context (simule - en prod viendrait de l'auth)
let userContext = {
  isSubscriber: false,
  tenureDays: 0,
  cartItems: [],
  get isPromoEligible() { return this.cartItems.length >= PROMO_NO_SUB_THRESHOLD; }
};

// ============ UTILITIES ============
function $(sel, ctx=document){return ctx.querySelector(sel)}
function $$(sel, ctx=document){return Array.from(ctx.querySelectorAll(sel))}
function el(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild}
function fmtPrice(price, currency='EUR'){return new Intl.NumberFormat('fr-FR',{style:'currency',currency,minimumFractionDigits:0}).format(price)}
function fmtPriceCrossed(price, currency='EUR'){return `<span class="price-crossed">${fmtPrice(price,currency)}</span>`}
function toast(msg,type='info'){const t=$('#toast');t.textContent=msg;t.className='toast '+type+' visible';setTimeout(()=>t.classList.remove('visible'),3000)}

// Recalcule prix KiffTech selon contexte utilisateur
function refreshKiffTechPrices() {
  products.forEach(p => {
    p.kifftech = calcKiffTechPrice(p.price.official, {
      isSubscriber: userContext.isSubscriber,
      cartItems: userContext.cartItems,
      tenureDays: userContext.tenureDays
    });
  });
  filteredProducts.forEach(p => {
    const orig = products.find(x => x.id === p.id);
    if (orig) p.kifftech = orig.kifftech;
  });
}

// ============ RENDER ============
function renderProducts(){
  const grid=$('#products-grid');
  if(filteredProducts.length===0){
    grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><span class="empty-icon">Recherche</span><p>Aucun produit ne correspond</p></div>`;
    return;
  }
  grid.innerHTML=filteredProducts.map(p=>{
    const kt = p.kifftech;
    const hasDiscount = kt.discount > 0;
    const media = generateProductMedia(p);

    return `
    <article class="product-card" data-id="${p.id}" role="listitem">
      <div class="product-media">
        <img src="${p.images[0]}" alt="${p.brand} ${p.model}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%231a1d3a%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23444%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E${p.brand} ${p.model}%3C/text%3E%3C/svg%3E'">
        <video class="product-video" src="${p.videos[0]}" muted loop playsinline preload="none"></video>
        <div class="media-badge">
          ${media.badges.map(b=>`<span class="badge ${b.class}">${b.label}</span>`).join('')}
          ${hasDiscount?`<span class="badge badge-promo">-${kt.discount}%</span>`:''}
        </div>
      </div>
      <div class="product-info">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-name">${p.model}</h3>
        <div class="product-meta">
          <span class="meta-item meta-year">${p.year}</span>
          <div class="meta-item meta-price-wrap">
            ${hasDiscount ? fmtPriceCrossed(kt.official) : ''}
            <span class="price-kifftech ${hasDiscount?'has-discount':''}">${fmtPrice(kt.kifftech)}</span>
          </div>
        </div>
        ${hasDiscount?`<div class="discount-badge">${kt.reason} • Economisez ${fmtPrice(kt.savings)}${kt.freeDelivery?' • Livraison offerte':''}</div>`:''}
        <div class="product-specs">
          ${Object.entries(p.specs).slice(0,3).map(([k,v])=>`<div class="spec-row"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>`).join('')}
        </div>
        <div class="product-actions">
          <button class="btn-sm primary" onclick="openModal('${p.id}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>Details & Prix</button>
          <button class="btn-sm" onclick="event.stopPropagation();addToCart('${p.id}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>Ajouter</button>
        </div>
      </div>
    </article>
  `}).join('');

  $('#results-count').textContent=`${filteredProducts.length} produit${filteredProducts.length>1?'s':''}`;
  updateStats();
  updateCartBadge();
}

function updateStats(){
  $('#stat-products').textContent=products.length;
  const sources=new Set();products.forEach(p=>{Object.values(p.sources).flat().forEach(s=>sources.add(s))});
  $('#stat-sources').textContent=sources.size;
  const years=new Set(products.map(p=>p.year));$('#stat-coverage').textContent=`${years.size} ans`;
  $('#stat-updated').textContent=new Date().toLocaleDateString('fr-FR');
}

function renderFilters(){
  // Categories
  const cats=['all',...new Set(products.map(p=>p.category))];
  $('#filter-category').innerHTML=cats.map(c=>`<button class="filter-btn ${c===activeCategory?'active':''}" data-cat="${c}">${c==='all'?'Toutes':c}</button>`).join('');

  // Years
  const years=['all',...new Set(products.map(p=>p.year)).sort((a,b)=>b-a)];
  $('#filter-year').innerHTML=years.map(y=>`<button class="filter-btn ${y===activeYear?'active':''}" data-year="${y}">${y==='all'?'Toutes':y}</button>`).join('');

  // Brands
  const brands=['all',...new Set(products.map(p=>p.brand)).sort()];
  $('#filter-brand').innerHTML=brands.map(b=>`<button class="filter-btn ${b===activeBrand?'active':''}" data-brand="${b}">${b==='all'?'Toutes':b}</button>`).join('');

  // Sources
  const srcs=[
    {id:'official',label:'Sites officiels',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'},
    {id:'social',label:'Reseaux sociaux',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-3V7a1 1 0 011-1h3z"/></svg>'},
    {id:'reviews',label:'Tests & Avis',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'},
    {id:'community',label:'Communautes',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>'}
  ];
  $('#source-toggles').innerHTML=srcs.map(s=>`
    <label class="source-item">
      <input type="checkbox" id="src-${s.id}" ${activeSources[s.id]?'checked':''} onchange="toggleSource('${s.id}')">
      <span class="source-label">${s.icon}<span>${s.label}</span></span>
    </label>
  `).join('');
}

function applyFilters(){
  filteredProducts=products.filter(p=>{
    if(searchQuery&&!`${p.brand} ${p.model} ${p.category} ${p.tags.join(' ')}`.toLowerCase().includes(searchQuery.toLowerCase()))return false;
    if(activeCategory!=='all'&&p.category!==activeCategory)return false;
    if(activeYear!=='all'&&p.year!==parseInt(activeYear))return false;
    if(activeBrand!=='all'&&p.brand!==activeBrand)return false;
    return true;
  });
  renderProducts();
}

// ============ MODAL ============
function openModal(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const kt = p.kifftech;
  const hasDiscount = kt.discount > 0;
  const media = generateProductMedia(p);

  $('#modal-brand').textContent=p.brand;
  $('#modal-name').textContent=p.model;
  $('#modal-meta').innerHTML=`
    <span class="meta-item meta-year">${p.year}</span>
    <span class="meta-item meta-price">${fmtPrice(kt.official)} / ${fmtPrice(kt.kifftech)}</span>
    <span class="meta-item">${p.category}</span>
    ${hasDiscount?`<span class="meta-item meta-promo">KiffTech: -${kt.discount}%</span>`:''}
  `;
  $('#modal-desc').textContent=`${p.brand} ${p.model} (${p.year}) - ${Object.entries(p.specs).slice(0,3).map(([k,v])=>`${k}: ${v}`).join(', ')}...`;
  $('#modal-specs').innerHTML=Object.entries(p.specs).map(([k,v])=>`<div class="spec-item"><span class="spec-item-label">${k}</span><span class="spec-item-value">${v}</span></div>`).join('');
  
  // Prix dans modal
  $('#modal-prices').innerHTML=`
    <div class="price-card">
      <div class="price-source">Prix officiel</div>
      <div class="price-value">${hasDiscount?fmtPriceCrossed(kt.official):fmtPrice(kt.official)}</div>
      <a class="price-link" href="${p.sources.official}" target="_blank" rel="noopener">Voir officiel</a>
    </div>
    ${hasDiscount?`
    <div class="price-card primary">
      <div class="price-source">Prix KiffTech <span class="discount-tag">-${kt.discount}%</span></div>
      <div class="price-value">${fmtPrice(kt.kifftech)}</div>
      <div style="font-size:.8rem;color:#27d17f;margin-top:4px">Economisez ${fmtPrice(kt.savings)}${kt.freeDelivery?' • Livraison offerte':''}</div>
      <div style="font-size:.7rem;color:#8a92b8;margin-top:8px">${kt.reason}</div>
      <button class="price-link" style="margin-top:12px;background:linear-gradient(135deg,#27d17f,#1e6bff)" onclick="addToCart('${p.id}');closeModal()">Ajouter a ma selection</button>
    </div>`:''}
  `;
  
  // Media
  const m=$('#modal-media');m.innerHTML='';
  p.images.forEach((img,i)=>{const el=document.createElement('img');el.src=img;el.alt=`${p.brand} ${p.model} ${i+1}`;el.style.display=i===0?'block':'none';m.appendChild(el);});
  if(p.videos[0]){
    const v=document.createElement('video');v.src=p.videos[0];v.controls=true;v.style.display='none';v.alt=`Video ${p.model}`;m.appendChild(v);
  }
  // Nav dots
  const nav=$('#media-nav');nav.innerHTML='';
  [...p.images,...(p.videos||[])].forEach((_,i)=>{const d=document.createElement('button');d.className='media-dot'+(i===0?' active':'');d.onclick=()=>showMedia(i);nav.appendChild(d);});
  
  $('#modal-title').dataset.currentId=id;
  $('#modal-overlay').classList.add('visible');
  document.body.style.overflow='hidden';
}
function showMedia(idx){
  const id=$('#modal-title').dataset.currentId;const p=products.find(x=>x.id===id);if(!p)return;
  const items=[...p.images,...(p.videos||[])];
  $$('#modal-media img, #modal-media video').forEach((el,i)=>{el.style.display=i===idx?'block':'none'});
  $$('#media-nav .media-dot').forEach((d,i)=>{d.classList.toggle('active',i===idx)});
}
function closeModal(){$('#modal-overlay').classList.remove('visible');document.body.style.overflow='';}

// ============ AGENT FETCH (SIMULATED) ============
async function fetchAgent(){
  if(isFetching)return;
  isFetching=true;
  const btn=$('#btn-fetch');btn.classList.add('loading');btn.disabled=true;btn.querySelector('span').textContent='Veille en cours...';
  toast('Agent IA demarre - collecte multi-sources...','info');
  
  await new Promise(r=>setTimeout(r,1500));
  const newProducts=await simulateAgentFetch();
  if(newProducts.length){
    products=[...newProducts,...products.filter(p=>!newProducts.some(n=>n.id===p.id))];
    PRODUCT_DB.push(...newProducts);
    applyFilters();
    $('#btn-export').disabled=false;
    toast(`${newProducts.length} nouveaux produits ajoutes`,`success`);
  }else{
    toast('Aucun nouveau produit trouve','warning');
  }
  
  btn.classList.remove('loading');btn.disabled=false;btn.querySelector('span').textContent='Lancer la veille';
  isFetching=false;
}

async function simulateAgentFetch(){
  const sources=['official','social','reviews','community'];
  const results=[];
  
  for(const src of sources){
    if(!activeSources[src])continue;
    await new Promise(r=>setTimeout(r,300));
    const count=Math.floor(Math.random()*2)+1;
    for(let i=0;i<count;i++){
      const base=PRODUCT_DB[Math.floor(Math.random()*PRODUCT_DB.length)];
      const variant={...base,id:`${base.id}-${src}-${Date.now()}-${i}`,sources:{...base.sources,[src]:true}};
      variant.kifftech = calcKiffTechPrice(variant.price.official);
      results.push(variant);
    }
  }
  return results;
}

function exportData(){
  const data=JSON.stringify(products,null,2);
  const blob=new Blob([data],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=`kifftech-products-${new Date().toISOString().split('T')[0]}.json`;a.click();
  URL.revokeObjectURL(url);
  toast('Export JSON telecharge','success');
}
function clearCache(){
  products=[...PRODUCT_DB];applyFilters();
  toast('Cache vide, base initiale restauree','success');
}
function toggleSource(id){
  activeSources[id]=!activeSources[id];
  $(`#src-${id}`).checked=activeSources[id];
  toast(`Source ${id} ${activeSources[id]?'activee':'desactivee'}`,'info');
}

// ============ CART / SUBSCRIPTION ============
function addToCart(id){
  const p = products.find(x=>x.id===id); if(!p)return;
  if(userContext.cartItems.some(i=>i.id===id)){
    toast('Deja dans votre selection','info');return;
  }
  userContext.cartItems.push({...p, qty:1});
  refreshKiffTechPrices();
  renderProducts();
  updateCartPanel();
  toast(`${p.model} ajoute • ${userContext.cartItems.length}/${PROMO_NO_SUB_THRESHOLD} pour promo -20%`,'success');
}

function removeFromCart(id){
  userContext.cartItems = userContext.cartItems.filter(i=>i.id!==id);
  refreshKiffTechPrices();
  renderProducts();
  updateCartPanel();
}

function updateCartBadge(){
  const count = userContext.cartItems.length;
  $('#cart-count').textContent = count;
  $('#cart-count').style.display = count > 0 ? 'flex' : 'none';
  
  // Met a jour indicateur promo
  const promoEl = $('#promo-indicator');
  if(promoEl){
    if(userContext.isSubscriber){
      promoEl.innerHTML = `<span class="promo-active">Abonne • -${calcKiffTechPrice(100,{isSubscriber:true,userContext}).discount}% + Livraison offerte</span>`;
    }else if(count >= PROMO_NO_SUB_THRESHOLD){
      promoEl.innerHTML = `<span class="promo-active">Promo -${PROMO_NO_SUB_DISCOUNT}% activee (${count}/${PROMO_NO_SUB_THRESHOLD})</span>`;
    }else{
      promoEl.innerHTML = `<span class="promo-pending">Ajoutez ${PROMO_NO_SUB_THRESHOLD-count} article${PROMO_NO_SUB_THRESHOLD-count>1?'s':''} pour -${PROMO_NO_SUB_DISCOUNT}%</span>`;
    }
  }
}

function updateCartPanel(){
  const panel = $('#cart-panel');
  if(!panel) return;
  
  if(userContext.cartItems.length === 0){
    panel.innerHTML = `<p style="color:#8a92b8;text-align:center;padding:20px">Votre selection est vide</p>`;
    return;
  }
  
  let totalOfficial = 0, totalKifftech = 0;
  panel.innerHTML = userContext.cartItems.map(item=>{
    const kt = calcKiffTechPrice(item.price.official, {isSubscriber:userContext.isSubscriber, cartItems:userContext.cartItems, tenureDays:userContext.tenureDays});
    totalOfficial += kt.official;
    totalKifftech += kt.kifftech;
    return `
      <div class="cart-item" style="display:flex;gap:12px;padding:12px;background:rgba(255,255,255,.03);border-radius:10px;border:1px solid rgba(255,255,255,.06);align-items:center">
        <img src="${item.images[0]}" style="width:50px;height:50px;object-fit:cover;border-radius:8px">
        <div style="flex:1">
          <div style="font-weight:600">${item.model}</div>
          <div style="font-size:.8rem;color:#8a92b8">${item.brand} • ${item.year}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:.75rem;color:#8a92b8;text-decoration:line-through">${fmtPrice(kt.official)}</div>
          <div style="font-weight:700;color:#27d17f">${fmtPrice(kt.kifftech)}</div>
        </div>
        <button onclick="removeFromCart('${item.id}')" style="width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,61,154,.3);background:rgba(255,61,154,.1);color:#ff3d9a;cursor:pointer">x</button>
      </div>
    `;
  }).join('') + `
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between">
      <div>
        <div style="font-size:.8rem;color:#8a92b8">Total officiel</div>
        <div style="text-decoration:line-through;color:#b9c0e6">${fmtPrice(totalOfficial)}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:.8rem;color:#8a92b8">Prix KiffTech</div>
        <div style="font-weight:800;color:#27d17f;font-size:1.2rem">${fmtPrice(totalKifftech)}</div>
        <div style="font-size:.7rem;color:#27d17f">Economie ${fmtPrice(totalOfficial-totalKifftech)}</div>
      </div>
    </div>
    <button class="action-btn primary" style="margin-top:12px;width:100%" onclick="checkout()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
      Commander
    </button>
  `;
}

function checkout(){
  toast('Redirection vers le paiement...','info');
  // En prod: redirection Stripe/paiement
}

// Toggle abonnement
function toggleSubscription(){
  userContext.isSubscriber = !userContext.isSubscriber;
  if(userContext.isSubscriber){
    userContext.tenureDays = 30; // Simule 1 mois
    toast('Abonnement KiffTech active • 1eur/jour • -10% a -21% + livraison offerte','success');
  }else{
    userContext.tenureDays = 0;
    toast('Abonnement desactive','info');
  }
  refreshKiffTechPrices();
  renderProducts();
  updateCartPanel();
  updateSubscriptionUI();
}

function updateSubscriptionUI(){
  const btn = $('#btn-subscribe');
  const btnHeader = $('#btn-subscribe-header');
  if(btn){
    btn.innerHTML = userContext.isSubscriber 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Gerer l'abonnement (${userContext.tenureDays}j)`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>S'abonner 1eur/jour`;
    btn.className = 'action-btn ' + (userContext.isSubscriber ? 'primary' : '');
  }
  if(btnHeader){
    btnHeader.innerHTML = userContext.isSubscriber 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Gerer (${userContext.tenureDays}j)`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>S'abonner 1eur/jour`;
    btnHeader.className = 'sub-btn ' + (userContext.isSubscriber ? 'active' : '');
  }
  updateCartBadge();
}

// ============ EVENT LISTENERS ============
function initEvents(){
  $('#search-input').addEventListener('input',e=>{searchQuery=e.target.value;applyFilters();});
  $$('.filter-btn[data-cat]').forEach(b=>b.addEventListener('click',()=>{activeCategory=b.dataset.cat;$$('.filter-btn[data-cat]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $$('.filter-btn[data-year]').forEach(b=>b.addEventListener('click',()=>{activeYear=b.dataset.year;$$('.filter-btn[data-year]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $$('.filter-btn[data-brand]').forEach(b=>b.addEventListener('click',()=>{activeBrand=b.dataset.brand;$$('.filter-btn[data-brand]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  
  $('#btn-fetch').addEventListener('click',fetchAgent);
  $('#btn-export').addEventListener('click',exportData);
  $('#btn-clear').addEventListener('click',clearCache);
  $('#btn-subscribe').addEventListener('click',toggleSubscription);
  $('#btn-subscribe-header').addEventListener('click',toggleSubscription);
  $('#btn-cart-header').addEventListener('click',()=>{document.getElementById('cart-panel').scrollIntoView({behavior:'smooth'});});
  
  $('#modal-close').addEventListener('click',closeModal);
  $('#modal-overlay').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
}

// ============ PARTICLES ============
function initParticles(){
  const container=$('#particules')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'particules',className:'particules'}));
  const colors=['#1e6bff','#ff3d9a','#ffd23f','#27d17f','#00d4ff','#ff6b00'];
  for(let i=0;i<15;i++){
    const p=document.createElement('div');p.className='particule';
    const sx=(Math.random()-.5)*window.innerWidth*.8;const sy=(Math.random()-.5)*window.innerHeight*.8;
    const ex=(Math.random()-.5)*window.innerWidth*.8;const ey=(Math.random()-.5)*window.innerHeight*.8;
    const delay=Math.random()*12;const dur=10+Math.random()*8;const op=.1+Math.random()*.2;
    const clr=colors[Math.floor(Math.random()*colors.length)];
    p.style.cssText=`left:50%;top:50%;--sx:${sx}px;--sy:${sy}px;--ex:${ex}px;--ey:${ey}px;--op:${op};background:${clr};animation-duration:${dur}s;animation-delay:${delay}s`;
    container.appendChild(p);
  }
}

// ============ INIT ============
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}

function init(){
  renderFilters();
  refreshKiffTechPrices();
  renderProducts();
  initEvents();
  initParticles();
  updateSubscriptionUI();
  console.log('KiffTech Agent IA + Prix KiffTech initialized');
}

// Loading
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}

window.KiffTech={products:()=>products,fetch:fetchAgent,export:exportData,subscribe:toggleSubscription};