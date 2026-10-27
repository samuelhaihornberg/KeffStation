/* ===== KiffTech Agent IA - Veille Tech 2020-2026 + Prix KiffTech ===== */

// ============ CONFIG ============
const CLICKWISE_API_KEY = 'cwa_9wUuDrUfYJoCaJJRhdja194cdBuRhIQyh2nxLAeexzY';
const CLICKWISE_API_BASE = 'https://api.clickwise.ai/v1';

// ============ PRIX KIFFTECH SYSTEM ============
const KIFFTECH_SUB_PRICE_DAILY = 1;
const KIFFTECH_SUB_MONTHLY = 30;
const SUB_DISCOUNT_MIN = 10;
const SUB_DISCOUNT_MAX = 21;
const SUB_FREE_DELIVERY = true;
const PROMO_NO_SUB_THRESHOLD = 10;
const PROMO_NO_SUB_DISCOUNT = 20;

function calcKiffTechPrice(officialPrice, context = {}) {
  const { isSubscriber = false, cartItems = [], isPromoEligible = false } = context;
  let discount = 0, freeDelivery = false, reason = '';
  if (isSubscriber) {
    const tenureDays = context.tenureDays || 0;
    discount = Math.min(SUB_DISCOUNT_MIN + Math.floor(tenureDays / 30), SUB_DISCOUNT_MAX);
    freeDelivery = SUB_FREE_DELIVERY;
    reason = `Abonne KiffTech (${discount}% + livraison offerte)`;
  } else if (isPromoEligible || cartItems.length >= PROMO_NO_SUB_THRESHOLD) {
    discount = PROMO_NO_SUB_DISCOUNT;
    reason = `Promo ${PROMO_NO_SUB_DISCOUNT}% (${PROMO_NO_SUB_THRESHOLD}+ articles differents)`;
  }
  const finalPrice = discount > 0 ? Math.round(officialPrice * (100 - discount) / 100) : officialPrice;
  return { official: officialPrice, kifftech: finalPrice, discount, savings: officialPrice - finalPrice, freeDelivery, reason, currency: 'EUR' };
}

// ============ LOCAL FALLBACK DATABASE ============
const LOCAL_DB = [
  {id:"galaxy-buds-3-pro",brand:"Samsung",model:"Galaxy Buds 3 Pro",year:2024,category:"Audio",price:{official:249,currency:"EUR"},specs:{driver:"11mm + 6mm planar",anc:"Adaptatif IA",codecs:"SSC, LDAC, AAC, SBC",battery:"30h total",water:"IP57"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r530nzaaxef/galaxy-buds-3-pro-sm-r530-539001567?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-3-pro/"},tags:["ANC","IA","TWS"]},
  {id:"xiaomi-band-9-pro",brand:"Xiaomi",model:"Smart Band 9 Pro",year:2024,category:"Fitness",price:{official:69,currency:"EUR"},specs:{screen:"AMOLED 1.74\"",gps:"Integre",battery:"21 jours",health:"SpO2, ECG"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-9-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-9-pro/"},tags:["AMOLED","GPS"]},
  {id:"galaxy-watch-7",brand:"Samsung",model:"Galaxy Watch 7",year:2024,category:"Montre",price:{official:319,currency:"EUR"},specs:{screen:"Super AMOLED 1.3\"",cpu:"Exynos W1000",health:"BioActive 2.0, ECG",battery:"40h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-l305fzdaeft/galaxy-watch-7-40mm-green-539002345?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-7/"},tags:["BioActive","WearOS"]},
  {id:"xiaomi-robot-x20-pro",brand:"Xiaomi",model:"Robot X20 Pro",year:2024,category:"Maison",price:{official:899,currency:"EUR"},specs:{nav:"LDS 360",suction:"7000 Pa",mop:"Double rotatif"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-robot-x20-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-robot-vacuum-x20-pro/"},tags:["LDS","IA"]},
  {id:"galaxy-buds-2-pro",brand:"Samsung",model:"Galaxy Buds 2 Pro",year:2023,category:"Audio",price:{official:229,currency:"EUR"},specs:{driver:"10mm + 5.3mm",anc:"Intelligent ANC",codecs:"LDAC"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r510nzaaxef/galaxy-buds-2-pro-539001111?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-2-pro/"},tags:["ANC","HiFi"]},
  {id:"xiaomi-13-ultra",brand:"Xiaomi",model:"Xiaomi 13 Ultra",year:2023,category:"Smartphone",price:{official:1299,currency:"EUR"},specs:{screen:"AMOLED 6.73\"",cpu:"Snapdragon 8 Gen 2",camera:"1\" IMX989 + Leica"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-13-ultra/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-13-ultra/"},tags:["1inch","Leica"]},
  {id:"galaxy-z-fold-5",brand:"Samsung",model:"Galaxy Z Fold 5",year:2023,category:"Smartphone",price:{official:1899,currency:"EUR"},specs:{screen:"7.6\" + 6.2\"",cpu:"Snapdragon 8 Gen 2",fold:"Goutte d'eau"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-f946bzaeft/galaxy-z-fold-5-539001789?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-z-fold-5/"},tags:["Foldable","S-Pen"]},
  {id:"galaxy-buds-2",brand:"Samsung",model:"Galaxy Buds 2",year:2022,category:"Audio",price:{official:149,currency:"EUR"},specs:{driver:"11mm + 6.5mm",anc:"Active ANC"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r177nzaaxef/galaxy-buds-2-539000888?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-2/"},tags:["ANC","Budget"]},
  {id:"xiaomi-band-7-pro",brand:"Xiaomi",model:"Smart Band 7 Pro",year:2022,category:"Fitness",price:{official:99,currency:"EUR"},specs:{screen:"AMOLED 1.64\"",gps:"Integre"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-7-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-7-pro/"},tags:["AMOLED","GPS"]},
  {id:"galaxy-buds-pro",brand:"Samsung",model:"Galaxy Buds Pro",year:2021,category:"Audio",price:{official:229,currency:"EUR"},specs:{driver:"11mm + 6.5mm",anc:"Intelligent ANC"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r190nzaaxef/galaxy-buds-pro-539000555?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-pro/"},tags:["ANC","Premium"]},
  {id:"xiaomi-mi-band-6",brand:"Xiaomi",model:"Mi Band 6",year:2021,category:"Fitness",price:{official:44,currency:"EUR"},specs:{screen:"AMOLED 1.56\""},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/mi-smart-band-6/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/mi-smart-band-6/"},tags:["AMOLED","Budget"]},
  {id:"galaxy-watch-4",brand:"Samsung",model:"Galaxy Watch 4",year:2021,category:"Montre",price:{official:269,currency:"EUR"},specs:{screen:"Super AMOLED 1.2\"",cpu:"Exynos W920",health:"BioActive"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r860nzaaxef/galaxy-watch-4-539000444?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-4/"},tags:["WearOS3","BioActive"]},
  {id:"galaxy-buds-plus",brand:"Samsung",model:"Galaxy Buds+",year:2020,category:"Audio",price:{official:149,currency:"EUR"},specs:{driver:"11mm + 6.5mm",anc:"Non"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r175nzaaxef/galaxy-buds-plus-539000333?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-plus/"},tags:["Autonomie"]},
  {id:"xiaomi-mi-band-5",brand:"Xiaomi",model:"Mi Band 5",year:2020,category:"Fitness",price:{official:34,currency:"EUR"},specs:{screen:"AMOLED 1.1\""},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/mi-smart-band-5/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/mi-smart-band-5/"},tags:["AMOLED"]},
  {id:"galaxy-watch-3",brand:"Samsung",model:"Galaxy Watch 3",year:2020,category:"Montre",price:{official:429,currency:"EUR"},specs:{screen:"Super AMOLED 1.2\"",cpu:"Exynos 9110"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r840nzaaxef/galaxy-watch-3-539000222?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-3/"},tags:["Tizen","Rotative"]}
];

// ============ STATE ============
let products = [...LOCAL_DB];
let filteredProducts = [...LOCAL_DB];
let activeCategory = 'all', activeYear = 'all', activeBrand = 'all';
let activeSources = {official:true, social:true, reviews:true, community:true};
let searchQuery = '', isFetching = false;

let userContext = { isSubscriber: false, tenureDays: 0, cartItems: [], get isPromoEligible() { return this.cartItems.length >= 10; } };

// ============ UTILITIES ============
function $(sel, ctx=document){return ctx.querySelector(sel)}
function $$(sel, ctx=document){return Array.from(ctx.querySelectorAll(sel))}
function fmtPrice(price, currency='EUR'){return new Intl.NumberFormat('fr-FR',{style:'currency',currency,minimumFractionDigits:0}).format(price)}
function fmtPriceCrossed(price, currency='EUR'){return `<span class="price-crossed">${fmtPrice(price,currency)}</span>`}
function toast(msg,type='info'){const t=$('#toast');t.textContent=msg;t.className='toast '+type+' visible';setTimeout(()=>t.classList.remove('visible'),3000)}
function calcKiffTechPrice(officialPrice, context={}){const {isSubscriber=false,cartItems=[],isPromoEligible=false}=context;let discount=0,freeDelivery=false,reason='';if(isSubscriber){discount=Math.min(10+Math.floor(context.tenureDays/30),21);freeDelivery=true;reason=`Abonne KiffTech (${discount}% + livraison offerte)`;}else if(context.isPromoEligible||context.cartItems.length>=10){discount=20;reason=`Promo 20% (10+ articles)`;}const final=discount>0?Math.round(officialPrice*(100-discount)/100):officialPrice;return{official:officialPrice,kifftech:finalPrice,discount,savings:officialPrice-finalPrice,freeDelivery,reason,currency:'EUR'};}
function refreshKiffTechPrices(){products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price.official,{isSubscriber:userContext.isSubscriber,cartItems:userContext.cartItems,tenureDays:userContext.tenureDays}));filteredProducts.forEach(p=>{const o=products.find(x=>x.id===p.id);if(o)p.kifftech=o.kifftech;});}

// ============ CLICKWISE API ============
async function fetchFromClickwise() {
  try {
    toast('Connexion a ClickWise API...','info');
    const res = await fetch(`${CLICKWISE_API_BASE}/products`, {
      headers: { 'Authorization': `Bearer ${CLICKWISE_API_KEY}`, 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    return data.products || data;
  } catch (e) {
    console.warn('ClickWise API failed, using local DB:', e);
    toast('API indisponible, base locale utilisee','warning');
    return LOCAL_DB;
  }
}

// ============ RENDER ============
function generateMedia(p){const m={badges:[]};if(p.videos?.length)m.badges.push({class:'badge-video',label:'Video'});m.badges.push({class:'badge-official',label:'Officiel'});return m;}

function renderProducts(){
  const grid=$('#products-grid');
  if(!grid) return;
  if(filteredProducts.length===0){grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1;padding:40px;text-align:center"><span style="font-size:48px">🔍</span><p>Aucun produit</p></div>`;return;}
  grid.innerHTML=filteredProducts.map(p=>{
    const kt=p.kifftech;const has=kt.discount>0;const med=generateMedia(p);
    return `<article class="product-card" data-id="${p.id}"><div class="product-media"><img src="${p.images[0]}" alt="${p.brand} ${p.model}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%231a1d3a%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23444%22 text-anchor=%22middle%22%3E${p.brand} ${p.model}%3C/text%3E%3C/svg%3E'"><div class="media-badge">${med.badges.map(b=>`<span class="badge ${b.class}">${b.label}</span>`).join('')}${has?`<span class="badge badge-promo">-${kt.discount}%</span>`:''}</div></div><div class="product-info"><span class="product-brand">${p.brand}</span><h3 class="product-name">${p.model}</h3><div class="product-meta"><span class="meta-item meta-year">${p.year}</span><div class="meta-item meta-price-wrap">${has?fmtPriceCrossed(kt.official):''}<span class="price-kifftech ${has?'has-discount':''}">${fmtPrice(kt.kifftech)}</span></div></div>${has?`<div class="discount-badge">${kt.reason} • Economisez ${fmtPrice(kt.savings)}${kt.freeDelivery?' • Livraison offerte':''}</div>`:''}<div class="product-specs">${Object.entries(p.specs||{}).slice(0,3).map(([k,v])=>`<div class="spec-row"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>`).join('')}</div><div class="product-actions"><button class="btn-sm primary" onclick="openModal('${p.id}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Details</button><button class="btn-sm" onclick="event.stopPropagation();addToCart('${p.id}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/></svg>Ajouter</button></div></div></article>`;
  }).join('');
  $('#results-count').textContent=`${filteredProducts.length} produit${filteredProducts.length>1?'s':''}`;
  updateStats();updateCartBadge();
}

function updateStats(){$('#stat-products').textContent=products.length;$('#stat-sources').textContent='ClickWise+Local';const yrs=new Set(products.map(p=>p.year));$('#stat-coverage').textContent=`${yrs.size} ans`;$('#stat-updated').textContent=new Date().toLocaleDateString('fr-FR');}
function fmtPrice(price,c='EUR'){return new Intl.NumberFormat('fr-FR',{style:'currency',currency:c,minimumFractionDigits:0}).format(price)}
function fmtPriceCrossed(p,c='EUR'){return `<span class="price-crossed">${fmtPrice(p,c)}</span>`}
function toast(m,t='info'){const e=$('#toast');e.textContent=m;e.className='toast '+t+' visible';setTimeout(()=>e.classList.remove('visible'),3000)}

// ============ DATA LOADING ============
async function loadProducts(){
  try {
    toast('Chargement produits...','info');
    const apiProducts = await fetchFromClickwise();
    if (apiProducts && apiProducts.length) {
      // Transform ClickWise format to our format
      products = apiProducts.map((p,i)=>({...p,id:p.id||`cw-${i}`,kifftech:calcKiffTechPrice(p.price?.official||p.price||0)}));
    } else {
      products = [...LOCAL_DB];
    }
    products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price?.official||p.price||0));
    filteredProducts=[...products];
    applyFilters();
    toast(`${products.length} produits charges`,'success');
  } catch(e) {
    console.error(e);
    products=[...LOCAL_DB];products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price.official));
    filteredProducts=[...products];
    applyFilters();
    toast('Mode local active','warning');
  }
}

// ============ CART / SUB ============
function addToCart(id){const p=products.find(x=>x.id===id);if(!p||userContext.cartItems.some(i=>i.id===id))return;userContext.cartItems.push({...p,qty:1});refreshKiffTechPrices();renderProducts();updateCartPanel();toast(`${p.model} ajoute`,`success`);}
function removeFromCart(id){userContext.cartItems=userContext.cartItems.filter(i=>i.id!==id);refreshKiffTechPrices();renderProducts();updateCartPanel();}
function updateCartBadge(){const c=userContext.cartItems.length;$('#cart-count').textContent=c;$('#cart-count').style.display=c?'flex':'none';updatePromoUI();}
function updatePromoUI(){const el=$('#promo-indicator');if(!el)return;if(userContext.isSubscriber)el.innerHTML=`<span class="promo-active">Abonne • ${calcKiffTechPrice(100,{isSubscriber:true}).discount}% + Livraison</span>`;else if(userContext.cartItems.length>=10)el.innerHTML=`<span class="promo-active">Promo -20% activee</span>`;else el.innerHTML=`<span class="promo-pending">Ajoutez ${10-userContext.cartItems.length} articles pour -20%</span>`;}
function updateCartPanel(){const p=$('#cart-panel');if(!p)return;if(!userContext.cartItems.length){p.innerHTML=`<p style="color:#8a92b8;text-align:center;padding:20px">Selection vide</p>`;return;}let to=0,tk=0;p.innerHTML=userContext.cartItems.map(i=>{const kt=calcKiffTechPrice(i.price.official,{isSubscriber:userContext.isSubscriber,cartItems:userContext.cartItems});to+=kt.official;tk+=kt.kifftech;return `<div style="display:flex;gap:12px;padding:12px;background:rgba(255,255,255,.03);border-radius:10px;border:1px solid rgba(255,255,255,.06)"><img src="${i.images[0]}" style="width:50px;height:50px;object-fit:cover;border-radius:8px"><div style="flex:1"><div style="font-weight:600">${i.model}</div><div style="font-size:.8rem;color:#8a92b8">${i.brand}</div></div><div style="text-align:right"><div style="font-size:.75rem;color:#8a92b8;text-decoration:line-through">${fmtPrice(kt.official)}</div><div style="font-weight:700;color:#27d17f">${fmtPrice(kt.kifftech)}</div></div><button onclick="removeFromCart('${i.id}')" style="width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,61,154,.3);background:rgba(255,61,154,.1);color:#ff3d9a;cursor:pointer">x</button></div>`;}).join('')+`<div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between"><div><div style="font-size:.8rem;color:#8a92b8">Total officiel</div><div style="text-decoration:line-through;color:#b9c0e6">${fmtPrice(to)}</div></div><div style="text-align:right"><div style="font-size:.8rem;color:#8a92b8">Prix KiffTech</div><div style="font-weight:800;color:#27d17f;font-size:1.2rem">${fmtPrice(tk)}</div><div style="font-size:.7rem;color:#27d17f">Economie ${fmtPrice(to-tk)}</div></div></div><button class="action-btn primary" style="margin-top:12px;width:100%" onclick="checkout()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>Commander</button>`;}
function checkout(){toast('Redirection paiement...','info');}
function toggleSubscription(){userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateCartPanel();updateSubUI();toast(userContext.isSubscriber?'Abonnement active (1eur/jour)':'Abonnement desactive',userContext.isSubscriber?'success':'info');}
function updateSubUI(){const b=$('#btn-subscribe'),bh=$('#btn-subscribe-header');const html=userContext.isSubscriber?`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Gerer (${userContext.tenureDays}j)`:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>S'abonner 1eur/jour`;[b,bh].forEach(el=>{if(el){el.innerHTML=html;el.className='action-btn '+(userContext.isSubscriber?'primary':'');}});updatePromoUI();}

// ============ MODAL ============
function openModal(id){const p=products.find(x=>x.id===id);if(!p)return;const kt=p.kifftech;const has=kt.discount>0;
$('#modal-brand').textContent=p.brand;$('#modal-name').textContent=p.model;
$('#modal-meta').innerHTML=`<span class="meta-item meta-year">${p.year}</span><span class="meta-item">${p.category}</span>${has?`<span class="meta-promo">-${kt.discount}%</span>`:''}`;
$('#modal-desc').textContent=`${p.brand} ${p.model} (${p.year}) - ${Object.entries(p.specs||{}).slice(0,3).map(([k,v])=>`${k}: ${v}`).join(', ')}`;
$('#modal-specs').innerHTML=Object.entries(p.specs||{}).map(([k,v])=>`<div class="spec-item"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>`).join('');
$('#modal-prices').innerHTML=`<div class="price-card"><div class="price-source">Prix officiel</div><div class="price-value">${has?fmtPriceCrossed(kt.official):fmtPrice(kt.official)}</div><a class="price-link" href="${p.sources?.official||'#'}" target="_blank">Voir</a></div>${has?`<div class="price-card primary"><div class="price-source">KiffTech <span class="discount-tag">-${kt.discount}%</span></div><div class="price-value">${fmtPrice(kt.kifftech)}</div><div style="font-size:.8rem;color:#27d17f">Economisez ${fmtPrice(kt.savings)}</div><div style="font-size:.7rem;color:#8a92b8">${kt.reason}</div><button class="price-link" style="margin-top:12px;background:linear-gradient(135deg,#27d17f,#1e6bff)" onclick="addToCart('${p.id}');closeModal()">Ajouter</button></div>`:''}`;
const m=$('#modal-media');m.innerHTML='';(p.images||[]).forEach((img,i)=>{const e=document.createElement('img');e.src=img;e.style.display=i===0?'block':'none';m.appendChild(e);});
const nav=$('#media-nav');nav.innerHTML='';(p.images||[]).forEach((_,i)=>{const d=document.createElement('button');d.className='media-dot'+(i===0?' active':'');d.onclick=()=>showMedia(i);nav.appendChild(d);});
$('#modal-title').dataset.currentId=id;$('#modal-overlay').classList.add('visible');document.body.style.overflow='hidden';}
function showMedia(idx){const id=$('#modal-title').dataset.currentId;const p=products.find(x=>x.id===id);if(!p)return;$$('#modal-media img').forEach((e,i)=>{e.style.display=i===idx?'block':'none'});$$('#media-nav button').forEach((d,i)=>{d.classList.toggle('active',i===idx)});}
function closeModal(){$('#modal-overlay').classList.remove('visible');document.body.style.overflow='';}

// ============ EVENTS ============
function initEvents(){
  $('#search-input').addEventListener('input',e=>{searchQuery=e.target.value;applyFilters();});
  $$('.filter-btn[data-cat]').forEach(b=>b.addEventListener('click',()=>{activeCategory=b.dataset.cat;$$('.filter-btn[data-cat]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $$('.filter-btn[data-year]').forEach(b=>b.addEventListener('click',()=>{activeYear=b.dataset.year;$$('.filter-btn[data-year]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $$('.filter-btn[data-brand]').forEach(b=>b.addEventListener('click',()=>{activeBrand=b.dataset.brand;$$('.filter-btn[data-brand]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $('#btn-fetch').addEventListener('click',async()=>{toast('Rechargement...','info');await loadProducts();});
  $('#btn-clear').addEventListener('click',()=>{products=[...LOCAL_DB];products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price.official));filteredProducts=[...products];applyFilters();toast('Base locale restauree','success');});
  $('#btn-subscribe').addEventListener('click',toggleSub);
  $('#btn-subscribe-header').addEventListener('click',toggleSub);
  $('#btn-cart-header').addEventListener('click',()=>document.getElementById('cart-panel').scrollIntoView({behavior:'smooth'}));
  $('#modal-close').addEventListener('click',closeModal);
  $('#modal-overlay').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
}
function toggleSub(){userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateCartPanel();updateSubUI();toast(userContext.isSubscriber?'Abonnement active (1eur/jour)':'Desactive',userContext.isSubscriber?'success':'info');}
function updateSubUI(){const html=userContext.isSubscriber?`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Gerer`:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>S'abonner 1eur/jour`;[$('#btn-subscribe'),$('#btn-subscribe-header')].forEach(el=>{if(el){el.innerHTML=html;el.className='action-btn '+(userContext.isSubscriber?'primary':'');}});updatePromoUI();}

// ============ FILTERS ============
function applyFilters(){filteredProducts=products.filter(p=>{if(searchQuery&&!`${p.brand} ${p.model} ${p.category}`.toLowerCase().includes(searchQuery.toLowerCase()))return false;if(activeCategory!=='all'&&p.category!==activeCategory)return false;if(activeYear!=='all'&&p.year!==parseInt(activeYear))return false;if(activeBrand!=='all'&&p.brand!==activeBrand)return false;return true;});renderProducts();}
function renderFilters(){const cats=['all',...new Set(products.map(p=>p.category))];$('#filter-category').innerHTML=cats.map(c=>`<button class="filter-btn ${c===activeCategory?'active':''}" data-cat="${c}">${c==='all'?'Toutes':c}</button>`).join('');const years=['all',...new Set(products.map(p=>p.year)).sort((a,b)=>b-a)];$('#filter-year').innerHTML=years.map(y=>`<button class="filter-btn ${y===activeYear?'active':''}" data-year="${y}">${y==='all'?'Toutes':y}</button>`).join('');const brands=['all',...new Set(products.map(p=>p.brand)).sort()];$('#filter-brand').innerHTML=brands.map(b=>`<button class="filter-btn ${b===activeBrand?'active':''}" data-brand="${b}">${b==='all'?'Toutes':b}</button>`).join('');}

// ============ PARTICLES ============
function initParticles(){const c=$('#particules')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'particules',className:'particules'}));const cols=['#1e6bff','#ff3d9a','#ffd23f','#27d17f','#00d4ff','#ff6b00'];for(let i=0;i<15;i++){const p=document.createElement('div');p.className='particule';const sx=(Math.random()-.5)*innerWidth*.8,sy=(Math.random()-.5)*innerHeight*.8,ex=(Math.random()-.5)*innerWidth*.8,ey=(Math.random()-.5)*innerHeight*.8,del=Math.random()*12,dur=10+Math.random()*8,op=.1+Math.random()*.2,clr=cols[Math.floor(Math.random()*cols.length)];p.style.cssText=`left:50%;top:50%;--sx:${sx}px;--sy:${sy}px;--ex:${ex}px;--ey:${ey}px;--op:${op};background:${clr};animation-duration:${dur}s;animation-delay:${del}s`;c.appendChild(p);}}

// ============ MODAL ============
function openModal(id){const p=products.find(x=>x.id===id);if(!p)return;const kt=p.kifftech;const has=kt.discount>0;
$('#modal-brand').textContent=p.brand;$('#modal-name').textContent=p.model;
$('#modal-meta').innerHTML=`<span class="meta-year">${p.year}</span><span>${p.category}</span>${kt.discount>0?`<span class="meta-promo">-${kt.discount}%</span>`:''}`;
$('#modal-desc').textContent=`${p.brand} ${p.model} (${p.year}) - ${Object.entries(p.specs||{}).slice(0,3).map(([k,v])=>`${k}: ${v}`).join(', ')}`;
$('#modal-specs').innerHTML=Object.entries(p.specs||{}).map(([k,v])=>`<div class="spec-item"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>`).join('');
$('#modal-prices').innerHTML=`<div class="price-card"><div class="price-source">Officiel</div><div class="price-value">${has?fmtPriceCrossed(kt.official):fmtPrice(kt.official)}</div></div>${has?`<div class="price-card primary"><div class="price-source">KiffTech <span class="discount-tag">-${kt.discount}%</span></div><div class="price-value">${fmtPrice(kt.kifftech)}</div><div style="color:#27d17f">Economisez ${fmtPrice(kt.savings)}</div><button class="price-link" style="margin-top:12px;background:linear-gradient(135deg,#27d17f,#1e6bff)" onclick="addToCart('${p.id}');closeModal()">Ajouter</button></div>`:''}`;
const m=$('#modal-media');m.innerHTML='';(p.images||[]).forEach((img,i)=>{const e=document.createElement('img');e.src=img;e.style.display=i===0?'block':'none';m.appendChild(e);});
const nav=$('#media-nav');nav.innerHTML='';(p.images||[]).forEach((_,i)=>{const d=document.createElement('button');d.className='media-dot'+(i===0?' active':'');d.onclick=()=>showMedia(i);nav.appendChild(d);});
$('#modal-title').dataset.currentId=id;$('#modal-overlay').classList.add('visible');document.body.style.overflow='hidden';}
function showMedia(idx){$$('#modal-media img').forEach((e,i)=>{e.style.display=i===idx?'block':'none'});$$('#media-nav button').forEach((d,i)=>{d.classList.toggle('active',i===idx)});}
function closeModal(){$('#modal-overlay').classList.remove('visible');document.body.style.overflow='';}
function showMedia(idx){$$('#modal-media img').forEach((e,i)=>{e.style.display=i===idx?'block':'none'});$$('#media-nav button').forEach((d,i)=>{d.classList.toggle('active',i===idx)});}

// ============ SUB ============
function toggleSub(){userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price.official,{isSubscriber:userContext.isSubscriber,cartItems:userContext.cartItems}));renderProducts();updateCartPanel();updateSubUI();toast(userContext.isSubscriber?'Abonnement active (1eur/jour)':'Desactive',userContext.isSubscriber?'success':'info');}
function updateSubUI(){const html=userContext.isSubscriber?'Gerer':'S\'abonner 1eur/jour';[$('#btn-subscribe'),$('#btn-subscribe-header')].forEach(el=>{if(el){el.innerHTML=html;el.className='action-btn '+(userContext.isSubscriber?'primary':'');}});updatePromoUI();}
function updatePromoUI(){const el=$('#promo-indicator');if(!el)return;if(userContext.isSubscriber)el.innerHTML=`<span class="promo-active">Abonne ${calcKiffTechPrice(100,{isSubscriber:true}).discount}%</span>`;else if(userContext.cartItems.length>=10)el.innerHTML=`<span class="promo-active">Promo -20%</span>`;else el.innerHTML=`<span class="promo-pending">${10-userContext.cartItems.length} pour -20%</span>`;}

// ============ PARTICLES ============
function initParticles(){const c=$('#particules')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'particules',className:'particules'}));const cols=['#1e6bff','#ff3d9a','#ffd23f','#27d17f','#00d4ff','#ff6b00'];for(let i=0;i<15;i++){const p=document.createElement('div');p.className='particule';const sx=(Math.random()-.5)*innerWidth*.8,sy=(Math.random()-.5)*innerHeight*.8,ex=(Math.random()-.5)*innerWidth*.8,ey=(Math.random()-.5)*innerHeight*.8;p.style.cssText=`left:50%;top:50%;--sx:${(Math.random()-.5)*innerWidth*.8}px;--sy:${(Math.random()-.5)*innerHeight*.8}px;--ex:${(Math.random()-.5)*innerWidth*.8}px;--ey:${(Math.random()-.5)*innerHeight*.8}px;--op:${.1+Math.random()*.2};background:${['#1e6bff','#ff3d9a','#ffd23f','#27d17f','#00d4ff','#ff6b00'][Math.floor(Math.random()*6)]};animation-duration:${10+Math.random()*8}s;animation-delay:${Math.random()*12}s`;c.appendChild(p);}}

// ============ FILTERS ============
function applyFilters(){filteredProducts=products.filter(p=>{if(searchQuery&&!`${p.brand} ${p.model} ${p.category}`.toLowerCase().includes(searchQuery.toLowerCase()))return false;if(activeCategory!=='all'&&p.category!==activeCategory)return false;if(activeYear!=='all'&&p.year!==parseInt(activeYear))return false;if(activeBrand!=='all'&&p.brand!==activeBrand)return false;return true;});renderProducts();}
function renderFilters(){const cats=['all',...new Set(products.map(p=>p.category))];$('#filter-category').innerHTML=cats.map(c=>`<button class="filter-btn ${c===activeCategory?'active':''}" data-cat="${c}">${c==='all'?'Toutes':c}</button>`).join('');const years=['all',...new Set(products.map(p=>p.year)).sort((a,b)=>b-a)];$('#filter-year').innerHTML=years.map(y=>`<button class="filter-btn ${y===activeYear?'active':''}" data-year="${y}">${y==='all'?'Toutes':y}</button>`).join('');const brands=['all',...new Set(products.map(p=>p.brand)).sort()];$('#filter-brand').innerHTML=brands.map(b=>`<button class="filter-btn ${b===activeBrand?'active':''}" data-brand="${b}">${b==='all'?'Toutes':b}</button>`).join('');}

// ============ INIT ============
function init(){renderFilters();refreshKiffTechPrices();loadProducts();initEvents();initParticles();updateSubUI();}
function init(){renderFilters();refreshKiffTechPrices();loadProducts();initEvents();initParticles();updateSubUI();console.log('KiffTech + ClickWise initialized');}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

window.KiffTech={products:()=>products,fetch:loadProducts,subscribe:()=>{userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateSubUI();}};