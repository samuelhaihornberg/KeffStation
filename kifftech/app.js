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

// ============ LOCAL FALLBACK DATABASE - 10 per category ============
const LOCAL_DB = [
  // ============ AUDIO (10) ============
  {id:"galaxy-buds-3-pro",brand:"Samsung",model:"Galaxy Buds 3 Pro",year:2024,category:"Audio",price:{official:249,currency:"EUR"},specs:{driver:"11mm + 6mm planar",anc:"Adaptatif IA",codecs:"SSC, LDAC, AAC, SBC",battery:"30h total",water:"IP57"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r530nzaaxef/galaxy-buds-3-pro-sm-r530-539001567?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-3-pro/"},tags:["ANC","IA","TWS"]},
  {id:"galaxy-buds-2-pro",brand:"Samsung",model:"Galaxy Buds 2 Pro",year:2023,category:"Audio",price:{official:229,currency:"EUR"},specs:{driver:"10mm + 5.3mm",anc:"Intelligent ANC",codecs:"LDAC"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r510nzaaxef/galaxy-buds-2-pro-539001111?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-2-pro/"},tags:["ANC","HiFi"]},
  {id:"galaxy-buds-2",brand:"Samsung",model:"Galaxy Buds 2",year:2022,category:"Audio",price:{official:149,currency:"EUR"},specs:{driver:"11mm + 6.5mm",anc:"Active ANC"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r177nzaaxef/galaxy-buds-2-539000888?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-2/"},tags:["ANC","Budget"]},
  {id:"galaxy-buds-pro",brand:"Samsung",model:"Galaxy Buds Pro",year:2021,category:"Audio",price:{official:229,currency:"EUR"},specs:{driver:"11mm + 6.5mm",anc:"Intelligent ANC"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r190nzaaxef/galaxy-buds-pro-539000555?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-pro/"},tags:["ANC","Premium"]},
  {id:"galaxy-buds-plus",brand:"Samsung",model:"Galaxy Buds+",year:2020,category:"Audio",price:{official:149,currency:"EUR"},specs:{driver:"11mm + 6.5mm",anc:"Non"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r175nzaaxef/galaxy-buds-plus-539000333?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-plus/"},tags:["Autonomie"]},
  {id:"galaxy-buds-live",brand:"Samsung",model:"Galaxy Buds Live",year:2021,category:"Audio",price:{official:169,currency:"EUR"},specs:{driver:"12mm",anc:"ANC Ouvert",codecs:"AAC, SSC",battery:"6h+21h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r180nzaaxef/galaxy-buds-live-539000666?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-live/"},tags:["OpenType","Design"]},
  {id:"galaxy-buds-fe",brand:"Samsung",model:"Galaxy Buds FE",year:2023,category:"Audio",price:{official:99,currency:"EUR"},specs:{driver:"12mm",anc:"Active ANC",battery:"6h+21h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r400nzaaxef/galaxy-buds-fe-539001222?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-buds-fe/"},tags:["Budget","ANC"]},
  {id:"xiaomi-buds-4-pro",brand:"Xiaomi",model:"Xiaomi Buds 4 Pro",year:2023,category:"Audio",price:{official:129,currency:"EUR"},specs:{driver:"10mm + 6mm",anc:"Adaptatif 48dB",codecs:"LDAC, LHDC",battery:"9h+30h"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-buds-4-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-buds-4-pro/"},tags:["LDAC","ANC"]},
  {id:"xiaomi-buds-3",brand:"Xiaomi",model:"Xiaomi Buds 3",year:2022,category:"Audio",price:{official:79,currency:"EUR"},specs:{driver:"12mm",anc:"Hybride 40dB",codecs:"AAC, SBC",battery:"7h+24h"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-buds-3/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-buds-3/"},tags:["Budget","ANC"]},
  {id:"redmi-buds-5-pro",brand:"Xiaomi",model:"Redmi Buds 5 Pro",year:2024,category:"Audio",price:{official:69,currency:"EUR"},specs:{driver:"10mm + 6mm",anc:"Adaptatif 52dB",codecs:"LDAC",battery:"10h+38h"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-buds-5-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/redmi-buds-5-pro/"},tags:["LDAC","Value"]},

  // ============ FITNESS (10) ============
  {id:"xiaomi-band-9-pro",brand:"Xiaomi",model:"Smart Band 9 Pro",year:2024,category:"Fitness",price:{official:69,currency:"EUR"},specs:{screen:"AMOLED 1.74\"",gps:"Integre",battery:"21 jours",health:"SpO2, ECG"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-9-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-9-pro/"},tags:["AMOLED","GPS"]},
  {id:"xiaomi-band-8-pro",brand:"Xiaomi",model:"Smart Band 8 Pro",year:2023,category:"Fitness",price:{official:59,currency:"EUR"},specs:{screen:"AMOLED 1.74\"",gps:"Integre",battery:"14 jours"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-8-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-8-pro/"},tags:["AMOLED","GPS"]},
  {id:"xiaomi-band-7-pro",brand:"Xiaomi",model:"Smart Band 7 Pro",year:2022,category:"Fitness",price:{official:99,currency:"EUR"},specs:{screen:"AMOLED 1.64\"",gps:"Integre"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-7-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-7-pro/"},tags:["AMOLED","GPS"]},
  {id:"xiaomi-mi-band-6",brand:"Xiaomi",model:"Mi Band 6",year:2021,category:"Fitness",price:{official:44,currency:"EUR"},specs:{screen:"AMOLED 1.56\""},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/mi-smart-band-6/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/mi-smart-band-6/"},tags:["AMOLED","Budget"]},
  {id:"xiaomi-mi-band-5",brand:"Xiaomi",model:"Mi Band 5",year:2020,category:"Fitness",price:{official:34,currency:"EUR"},specs:{screen:"AMOLED 1.1\""},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/mi-smart-band-5/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/mi-smart-band-5/"},tags:["AMOLED"]},
  {id:"xiaomi-band-8",brand:"Xiaomi",model:"Smart Band 8",year:2023,category:"Fitness",price:{official:39,currency:"EUR"},specs:{screen:"AMOLED 1.62\"",battery:"16 jours"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-smart-band-8/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-smart-band-8/"},tags:["AMOLED","Entry"]},
  {id:"redmi-band-3",brand:"Xiaomi",model:"Redmi Band 3",year:2024,category:"Fitness",price:{official:29,currency:"EUR"},specs:{screen:"AMOLED 1.47\"",battery:"18 jours"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-band-3/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/redmi-band-3/"},tags:["Budget","AMOLED"]},
  {id:"samsung-fit-3",brand:"Samsung",model:"Galaxy Fit 3",year:2024,category:"Fitness",price:{official:59,currency:"EUR"},specs:{screen:"AMOLED 1.6\"",battery:"13 jours",gps:"Non"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r390nzaaxef/galaxy-fit-3-539001888?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-fit-3/"},tags:["AMOLED","Budget"]},
  {id:"samsung-fit-2",brand:"Samsung",model:"Galaxy Fit 2",year:2021,category:"Fitness",price:{official:49,currency:"EUR"},specs:{screen:"AMOLED 1.1\"",battery:"15 jours"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r220nzaaxef/galaxy-fit-2-539001999?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-fit-2/"},tags:["AMOLED","Entry"]},
  {id:"huawei-band-8",brand:"Huawei",model:"Band 8",year:2023,category:"Fitness",price:{official:49,currency:"EUR"},specs:{screen:"AMOLED 1.47\"",battery:"14 jours"},images:["https://consumer.huawei.com/content/dam/huawei-cbg-site/fr/mkt/wearables/band-8/images/gallery/hero.png"],videos:[""],sources:{official:"https://consumer.huawei.com/fr/wearables/band-8/"},tags:["AMOLED","Budget"]},

  // ============ MONTRE (10) ============
  {id:"galaxy-watch-7",brand:"Samsung",model:"Galaxy Watch 7",year:2024,category:"Montre",price:{official:319,currency:"EUR"},specs:{screen:"Super AMOLED 1.3\"",cpu:"Exynos W1000",health:"BioActive 2.0, ECG",battery:"40h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-l305fzdaeft/galaxy-watch-7-40mm-green-539002345?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-7/"},tags:["BioActive","WearOS"]},
  {id:"galaxy-watch-6-classic",brand:"Samsung",model:"Galaxy Watch 6 Classic",year:2023,category:"Montre",price:{official:399,currency:"EUR"},specs:{screen:"Super AMOLED 1.47\"",cpu:"Exynos W930",health:"BioActive, ECG",battery:"40h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r950nzaaxef/galaxy-watch-6-classic-539003333?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-6-classic/"},tags:["Rotative","Premium"]},
  {id:"galaxy-watch-6",brand:"Samsung",model:"Galaxy Watch 6",year:2023,category:"Montre",price:{official:299,currency:"EUR"},specs:{screen:"Super AMOLED 1.47\"",cpu:"Exynos W930",health:"BioActive",battery:"40h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r940nzaaxef/galaxy-watch-6-539004444?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-6/"},tags:["BioActive","WearOS"]},
  {id:"galaxy-watch-5-pro",brand:"Samsung",model:"Galaxy Watch 5 Pro",year:2022,category:"Montre",price:{official:469,currency:"EUR"},specs:{screen:"Super AMOLED 1.4\"",cpu:"Exynos W920",health:"BioActive, ECG",battery:"80h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r920nzaaxef/galaxy-watch-5-pro-539000777?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-5-pro/"},tags:["Titane","Outdoor"]},
  {id:"galaxy-watch-5",brand:"Samsung",model:"Galaxy Watch 5",year:2022,category:"Montre",price:{official:279,currency:"EUR"},specs:{screen:"Super AMOLED 1.4\"",cpu:"Exynos W920",health:"BioActive",battery:"40h"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r910nzaaxef/galaxy-watch-5-539005555?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-5/"},tags:["BioActive","WearOS"]},
  {id:"galaxy-watch-4",brand:"Samsung",model:"Galaxy Watch 4",year:2021,category:"Montre",price:{official:269,currency:"EUR"},specs:{screen:"Super AMOLED 1.2\"",cpu:"Exynos W920",health:"BioActive"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r860nzaaxef/galaxy-watch-4-539000444?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-4/"},tags:["WearOS3","BioActive"]},
  {id:"galaxy-watch-3",brand:"Samsung",model:"Galaxy Watch 3",year:2020,category:"Montre",price:{official:429,currency:"EUR"},specs:{screen:"Super AMOLED 1.2\"",cpu:"Exynos 9110"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r840nzaaxef/galaxy-watch-3-539000222?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-3/"},tags:["Tizen","Rotative"]},
  {id:"galaxy-watch-active-2",brand:"Samsung",model:"Galaxy Watch Active 2",year:2019,category:"Montre",price:{official:229,currency:"EUR"},specs:{screen:"Super AMOLED 1.4\"",cpu:"Exynos 9110",health:"FC, ECG"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-r830nzaaxef/galaxy-watch-active-2-539002222?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-watch-active-2/"},tags:["Tizen","Sport"]},
  {id:"huawei-watch-gt-4",brand:"Huawei",model:"Watch GT 4",year:2023,category:"Montre",price:{official:229,currency:"EUR"},specs:{screen:"AMOLED 1.43\"",battery:"14 jours",health:"ECG, SpO2"},images:["https://consumer.huawei.com/content/dam/huawei-cbg-site/fr/mkt/wearables/watch-gt-4/images/hero.png"],videos:[""],sources:{official:"https://consumer.huawei.com/fr/wearables/watch-gt-4/"},tags:["Autonomie","HarmonyOS"]},
  {id:"xiaomi-watch-s3",brand:"Xiaomi",model:"Watch S3",year:2023,category:"Montre",price:{official:149,currency:"EUR"},specs:{screen:"AMOLED 1.43\"",battery:"15 jours",gps:"Integre"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-watch-s3/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-watch-s3/"},tags:["AMOLED","GPS"]},

  // ============ MAISON (10) ============
  {id:"xiaomi-robot-x20-pro",brand:"Xiaomi",model:"Robot X20 Pro",year:2024,category:"Maison",price:{official:899,currency:"EUR"},specs:{nav:"LDS 360",suction:"7000 Pa",mop:"Double rotatif"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-robot-x20-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-robot-vacuum-x20-pro/"},tags:["LDS","IA"]},
  {id:"xiaomi-robot-x10",brand:"Xiaomi",model:"Robot X10",year:2023,category:"Maison",price:{official:599,currency:"EUR"},specs:{nav:"LDS",suction:"4000 Pa",mop:"Vibrant"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-robot-x10/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-robot-vacuum-x10/"},tags:["LDS","Value"]},
  {id:"xiaomi-robot-e10",brand:"Xiaomi",model:"Robot E10",year:2023,category:"Maison",price:{official:299,currency:"EUR"},specs:{nav:"Gyro",suction:"2200 Pa",mop:"Non"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-robot-e10/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-robot-vacuum-e10/"},tags:["Budget","Entry"]},
  {id:"dreame-l20-ultra",brand:"Dreame",model:"L20 Ultra",year:2023,category:"Maison",price:{official:1099,currency:"EUR"},specs:{nav:"LDS + AI",suction:"7000 Pa",mop:"Double rotatif 180 tr/min",station:"Vidage + Lavage + Sechage"},images:["https://www.dreame.com/cdn/shop/files/L20_Ultra_Hero.png"],videos:[""],sources:{official:"https://www.dreame.com/fr/l20-ultra"},tags:["Premium","Station"]},
  {id:"dreame-l10s-ultra",brand:"Dreame",model:"L10s Ultra",year:2023,category:"Maison",price:{official:899,currency:"EUR"},specs:{nav:"LDS",suction:"5300 Pa",mop:"Double rotatif",station:"Vidage + Lavage"},images:["https://www.dreame.com/cdn/shop/files/L10s_Ultra_Hero.png"],videos:[""],sources:{official:"https://www.dreame.com/fr/l10s-ultra"},tags:["Value","Station"]},
  {id:"roborock-s8-pro-ultra",brand:"Roborock",model:"S8 Pro Ultra",year:2023,category:"Maison",price:{official:1299,currency:"EUR"},specs:{nav:"LDS + AI",suction:"6000 Pa",mop:"Vibrant 3000 tr/min",station:"Vidage + Lavage + Sechage 45 deg"},images:["https://www.roborock.com/cdn/shop/files/S8_Pro_Ultra_Hero.png"],videos:[""],sources:{official:"https://www.roborock.com/fr/s8-pro-ultra"},tags:["Premium","AI"]},
  {id:"roborock-q-revo",brand:"Roborock",model:"Q Revo",year:2023,category:"Maison",price:{official:799,currency:"EUR"},specs:{nav:"LDS",suction:"5500 Pa",mop:"Double rotatif",station:"Vidage + Lavage + Sechage"},images:["https://www.roborock.com/cdn/shop/files/Q_Revo_Hero.png"],videos:[""],sources:{official:"https://www.roborock.com/fr/q-revo"},tags:["Value","Station"]},
  {id:"ecovacs-deebot-x2-omni",brand:"Ecovacs",model:"Deebot X2 Omni",year:2023,category:"Maison",price:{official:1299,currency:"EUR"},specs:{nav:"LDS + AIVI 3D",suction:"8000 Pa",mop:"Double rotatif 180 tr/min",station:"Vidage + Lavage + Sechage 40 deg"},images:["https://www.ecovacs.com/cdn/shop/files/X2_Omni_Hero.png"],videos:[""],sources:{official:"https://www.ecovacs.com/fr/deebot-x2-omni"},tags:["AI","Premium"]},
  {id:"ecovacs-deebot-t20-omni",brand:"Ecovacs",model:"Deebot T20 Omni",year:2023,category:"Maison",price:{official:899,currency:"EUR"},specs:{nav:"LDS + AI",suction:"6000 Pa",mop:"Double rotatif",station:"Vidage + Lavage + Sechage"},images:["https://www.ecovacs.com/cdn/shop/files/T20_Omni_Hero.png"],videos:[""],sources:{official:"https://www.ecovacs.com/fr/deebot-t20-omni"},tags:["Value","Station"]},
  {id:"samsung-jet-bot-ai",brand:"Samsung",model:"Jet Bot AI+",year:2022,category:"Maison",price:{official:1199,currency:"EUR"},specs:{nav:"LDS + AI 3D",suction:"30W",mop:"Non",station:"Vidage auto"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/vr50t95735b/jet-bot-ai-539007777?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/jet-bot-ai/"},tags:["AI","Premium"]},

  // ============ SMARTPHONE (10) ============
  {id:"xiaomi-13-ultra",brand:"Xiaomi",model:"Xiaomi 13 Ultra",year:2023,category:"Smartphone",price:{official:1299,currency:"EUR"},specs:{screen:"AMOLED 6.73\"",cpu:"Snapdragon 8 Gen 2",camera:"1\" IMX989 + Leica"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-13-ultra/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-13-ultra/"},tags:["1inch","Leica"]},
  {id:"galaxy-z-fold-5",brand:"Samsung",model:"Galaxy Z Fold 5",year:2023,category:"Smartphone",price:{official:1899,currency:"EUR"},specs:{screen:"7.6\" + 6.2\"",cpu:"Snapdragon 8 Gen 2",fold:"Goutte d'eau"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-f946bzaeft/galaxy-z-fold-5-539001789?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-z-fold-5/"},tags:["Foldable","S-Pen"]},
  {id:"xiaomi-14-ultra",brand:"Xiaomi",model:"Xiaomi 14 Ultra",year:2024,category:"Smartphone",price:{official:1499,currency:"EUR"},specs:{screen:"AMOLED 6.73\" 120Hz",cpu:"Snapdragon 8 Gen 3",camera:"1\" IMX989 + Leica Summilux",video:"8K"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-14-ultra/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-14-ultra/"},tags:["1inch","Leica","Flagship"]},
  {id:"galaxy-s24-ultra",brand:"Samsung",model:"Galaxy S24 Ultra",year:2024,category:"Smartphone",price:{official:1469,currency:"EUR"},specs:{screen:"Dynamic AMOLED 6.8\"",cpu:"Snapdragon 8 Gen 3",camera:"200MP + 3x 50MP",video:"8K"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-s928bzaeft/galaxy-s24-ultra-539008888?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-s24-ultra/"},tags:["200MP","GalaxyAI"]},
  {id:"xiaomi-14",brand:"Xiaomi",model:"Xiaomi 14",year:2024,category:"Smartphone",price:{official:999,currency:"EUR"},specs:{screen:"AMOLED 6.36\"",cpu:"Snapdragon 8 Gen 3",camera:"50MP Leica"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-14/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-14/"},tags:["Compact","Leica"]},
  {id:"galaxy-s24",brand:"Samsung",model:"Galaxy S24",year:2024,category:"Smartphone",price:{official:909,currency:"EUR"},specs:{screen:"Dynamic AMOLED 6.2\"",cpu:"Exynos 2400",camera:"50MP"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-s921bzaeft/galaxy-s24-539009999?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-s24/"},tags:["Compact","GalaxyAI"]},
  {id:"xiaomi-13t-pro",brand:"Xiaomi",model:"Xiaomi 13T Pro",year:2023,category:"Smartphone",price:{official:799,currency:"EUR"},specs:{screen:"AMOLED 6.67\" 144Hz",cpu:"Dimensity 9200+",camera:"50MP Leica"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-13t-pro/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-13t-pro/"},tags:["Leica","Value"]},
  {id:"galaxy-z-flip-5",brand:"Samsung",model:"Galaxy Z Flip 5",year:2023,category:"Smartphone",price:{official:1199,currency:"EUR"},specs:{screen:"6.7\" + 3.4\"",cpu:"Snapdragon 8 Gen 2",fold:"Clamshell"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-f731bzaeft/galaxy-z-flip-5-539002222?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-z-flip-5/"},tags:["Flip","Compact"]},
  {id:"xiaomi-13",brand:"Xiaomi",model:"Xiaomi 13",year:2023,category:"Smartphone",price:{official:999,currency:"EUR"},specs:{screen:"AMOLED 6.36\"",cpu:"Snapdragon 8 Gen 2",camera:"50MP Leica"},images:["https://i01.appmifile.com/webfile/globalimg/products/pc/xiaomi-13/hero.png"],videos:[""],sources:{official:"https://www.mi.com/global/product/xiaomi-13/"},tags:["Compact","Leica"]},
  {id:"galaxy-s23-ultra",brand:"Samsung",model:"Galaxy S23 Ultra",year:2023,category:"Smartphone",price:{official:1399,currency:"EUR"},specs:{screen:"Dynamic AMOLED 6.8\"",cpu:"Snapdragon 8 Gen 2",camera:"200MP + 10MP 10x",video:"8K"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/sm-s918bzaeft/galaxy-s23-ultra-539006666?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-s23-ultra/"},tags:["200MP","S-Pen"]},

  // ============ TRACKER (10) ============
  {id:"galaxy-smarttag-3",brand:"Samsung",model:"Galaxy SmartTag 3",year:2024,category:"Tracker",price:{official:39,currency:"EUR"},specs:{tech:"UWB + BLE + Thread",matter:"Oui",range:"120m",battery:"1 an"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/eh-ew300kbegfr/galaxy-smarttag-3-539001111?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-smarttag-3/"},tags:["UWB","Thread","Matter"]},
  {id:"galaxy-smarttag-2",brand:"Samsung",model:"Galaxy SmartTag 2",year:2023,category:"Tracker",price:{official:29,currency:"EUR"},specs:{tech:"BLE + UWB",range:"120m",battery:"1 an"},images:["https://images.samsung.com/is/image/samsung/p6pim/fr/eh-ew200kbegfr/galaxy-smarttag-2-539002222?$684_547_PNG$"],videos:[""],sources:{official:"https://www.samsung.com/fr/galaxy-smarttag-2/"},tags:["UWB","Value"]},
  {id:"apple-airtag-2",brand:"Apple",model:"AirTag 2",year:2024,category:"Tracker",price:{official:35,currency:"EUR"},specs:{tech:"UWB + BLE",network:"Find My",battery:"1 an"},images:["https://www.apple.com/v/airtag/b/images/overview/hero.png"],videos:[""],sources:{official:"https://www.apple.com/fr/airtag/"},tags:["UWB","FindMy"]},
  {id:"apple-airtag",brand:"Apple",model:"AirTag",year:2021,category:"Tracker",price:{official:35,currency:"EUR"},specs:{tech:"UWB + BLE",network:"Find My",battery:"1 an"},images:["https://www.apple.com/v/airtag/b/images/overview/hero.png"],videos:[""],sources:{official:"https://www.apple.com/fr/airtag/"},tags:["UWB","FindMy"]},
  {id:"tile-pro-2024",brand:"Tile",model:"Tile Pro 2024",year:2024,category:"Tracker",price:{official:35,currency:"EUR"},specs:{tech:"BLE",network:"Tile Network",range:"120m",battery:"1 an remplacable"},images:["https://www.thetileapp.com/cdn/shop/files/Pro_Hero.png"],videos:[""],sources:{official:"https://www.thetileapp.com/fr/pro/"},tags:["BLE","Remplacable"]},
  {id:"tile-mate-2024",brand:"Tile",model:"Tile Mate 2024",year:2024,category:"Tracker",price:{official:25,currency:"EUR"},specs:{tech:"BLE",network:"Tile Network",range:"75m",battery:"3 ans non remplacable"},images:["https://www.thetileapp.com/cdn/shop/files/Mate_Hero.png"],videos:[""],sources:{official:"https://www.thetileapp.com/fr/mate/"},tags:["Budget","LongLife"]},
  {id:"chipolo-card-spot",brand:"Chipolo",model:"CARD Spot",year:2023,category:"Tracker",price:{official:35,currency:"EUR"},specs:{tech:"BLE",network:"Find My + Chipolo",format:"Carte credit",battery:"2 ans"},images:["https://chipolo.net/cdn/shop/files/CARD_Spot_Hero.png"],videos:[""],sources:{official:"https://chipolo.net/fr/card-spot/"},tags:["CardFormat","FindMy"]},
  {id:"chipolo-one-spot",brand:"Chipolo",model:"ONE Spot",year:2023,category:"Tracker",price:{official:28,currency:"EUR"},specs:{tech:"BLE",network:"Find My + Chipolo",battery:"2 ans"},images:["https://chipolo.net/cdn/shop/files/ONE_Spot_Hero.png"],videos:[""],sources:{official:"https://chipolo.net/fr/one-spot/"},tags:["FindMy","Budget"]},
  {id:"pivo-locator",brand:"Pivo",model:"Locator",year:2023,category:"Tracker",price:{official:29,currency:"EUR"},specs:{tech:"BLE",network:"Pivo Network",battery:"1 an"},images:["https://www.getpivo.com/cdn/shop/files/Locator_Hero.png"],videos:[""],sources:{official:"https://www.getpivo.com/fr/locator/"},tags:["Budget","Compact"]},
  {id:"nutale-tag",brand:"Nutale",model:"Nutale Tag",year:2023,category:"Tracker",price:{official:25,currency:"EUR"},specs:{tech:"BLE",network:"Nutale Network",battery:"1 an remplacable"},images:["https://www.nutale.com/cdn/shop/files/Tag_Hero.png"],videos:[""],sources:{official:"https://www.nutale.com/fr/tag/"},tags:["Budget","Remplacable"]}
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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${CLICKWISE_API_BASE}/products`, {
      headers: { 'Authorization': `Bearer ${CLICKWISE_API_KEY}`, 'Content-Type': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) throw new Error('Non-JSON response');
    const data = await res.json();
    if (!data || (!Array.isArray(data) && !data.products)) throw new Error('Invalid data format');
    return data.products || data;
  } catch (e) {
    console.warn('ClickWise API failed, using local DB:', e.message);
    toast('API indisponible, base locale utilisee','warning');
    return LOCAL_DB;
  }
}

// ============ RENDER ============
function generateMedia(p){const m={badges:[]};if(p.videos?.length)m.badges.push({class:'badge-video',label:'Video'});m.badges.push({class:'badge-official',label:'Officiel'});return m;}

function renderProducts(){
  const grid=$('#products-grid');
  if(!grid){console.warn('products-grid not found');return;}
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
    products = [...LOCAL_DB];
    products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price.official));
    filteredProducts=[...products];
    applyFilters();
    toast(`${products.length} produits charges (local)`,`success`);

    try {
      const apiProducts = await fetchFromClickwise();
      if (apiProducts && apiProducts.length) {
        const apiMapped = apiProducts.map((p,i)=>({...p,id:p.id||`cw-${i}`,kifftech:calcKiffTechPrice(p.price?.official||p.price||0)}));
        const existingIds = new Set(products.map(p=>p.id));
        const newProducts = apiMapped.filter(p=>!existingIds.has(p.id));
        if (newProducts.length) {
          products = [...newProducts, ...products];
          filteredProducts = [...products];
          applyFilters();
          toast(`${newProducts.length} nouveaux produits via ClickWise`,`success`);
        }
      }
    } catch(e) { console.log('ClickWise background fetch skipped'); }
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
function toggleSub(){userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateCartPanel();updateSubUI();toast(userContext.isSubscriber?'Abonnement active (1eur/jour)':'Desactive',userContext.isSubscriber?'success':'info');}
function updateSubUI(){const html=userContext.isSubscriber?`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Gerer`:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>S'abonner 1eur/jour`;[$('#btn-subscribe'),$('#btn-subscribe-header')].forEach(el=>{if(el){el.innerHTML=html;el.className='action-btn '+(userContext.isSubscriber?'primary':'');}});updatePromoUI();}
function updatePromoUI(){const el=$('#promo-indicator');if(!el)return;if(userContext.isSubscriber)el.innerHTML=`<span class="promo-active">Abonne ${calcKiffTechPrice(100,{isSubscriber:true}).discount}%</span>`;else if(userContext.cartItems.length>=10)el.innerHTML=`<span class="promo-active">Promo -20%</span>`;else el.innerHTML=`<span class="promo-pending">${10-userContext.cartItems.length} pour -20%</span>`;}

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
$('#modal-prices').innerHTML=`<div class="price-card"><div class="price-source">Officiel</div><div class="price-value">${has?fmtPriceCrossed(kt.official):fmtPrice(kt.official)}</div><a class="price-link" href="${p.sources?.official||'#'}" target="_blank">Voir</a></div>${has?`<div class="price-card primary"><div class="price-source">KiffTech <span class="discount-tag">-${kt.discount}%</span></div><div class="price-value">${fmtPrice(kt.kifftech)}</div><div style="color:#27d17f">Economisez ${fmtPrice(kt.savings)}</div><button class="price-link" style="margin-top:12px;background:linear-gradient(135deg,#27d17f,#1e6bff)" onclick="addToCart('${p.id}');closeModal()">Ajouter</button></div>`:''}`;
const m=$('#modal-media');m.innerHTML='';(p.images||[]).forEach((img,i)=>{const e=document.createElement('img');e.src=img;e.style.display=i===0?'block':'none';m.appendChild(e);});
const nav=$('#media-nav');nav.innerHTML='';(p.images||[]).forEach((_,i)=>{const d=document.createElement('button');d.className='media-dot'+(i===0?' active':'');d.onclick=()=>showMedia(i);nav.appendChild(d);});
$('#modal-title').dataset.currentId=id;$('#modal-overlay').classList.add('visible');document.body.style.overflow='hidden';}
function showMedia(idx){$$('#modal-media img').forEach((e,i)=>{e.style.display=i===idx?'block':'none'});$$('#media-nav button').forEach((d,i)=>{d.classList.toggle('active',i===idx)});}
function closeModal(){$('#modal-overlay').classList.remove('visible');document.body.style.overflow='';}
function showMedia(idx){$$('#modal-media img').forEach((e,i)=>{e.style.display=i===idx?'block':'none'});$$('#media-nav button').forEach((d,i)=>{d.classList.toggle('active',i===idx)});}

// ============ SUB ============
function toggleSub(){userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateCartPanel();updateSubUI();toast(userContext.isSubscriber?'Abonnement active (1eur/jour)':'Desactive',userContext.isSubscriber?'success':'info');}
function updateSubUI(){const html=userContext.isSubscriber?`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Gerer`:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>S'abonner 1eur/jour`;[$('#btn-subscribe'),$('#btn-subscribe-header')].forEach(el=>{if(el){el.innerHTML=html;el.className='action-btn '+(userContext.isSubscriber?'primary':'');}});updatePromoUI();}
function updatePromoUI(){const el=$('#promo-indicator');if(!el)return;if(userContext.isSubscriber)el.innerHTML=`<span class="promo-active">Abonne ${calcKiffTechPrice(100,{isSubscriber:true}).discount}%</span>`;else if(userContext.cartItems.length>=10)el.innerHTML=`<span class="promo-active">Promo -20%</span>`;else el.innerHTML=`<span class="promo-pending">${10-userContext.cartItems.length} pour -20%</span>`;}

// ============ EVENTS ============
function initEvents(){
  $('#search-input').addEventListener('input',e=>{searchQuery=e.target.value;applyFilters();});
  $$('.filter-btn[data-cat]').forEach(b=>b.addEventListener('click',()=>{activeCategory=b.dataset.cat;$$('.filter-btn[data-cat]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $$('.filter-btn[data-year]').forEach(b=>b.addEventListener('click',()=>{activeYear=b.dataset.year;$$('.filter-btn[data-year]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $$('.filter-btn[data-brand]').forEach(b=>b.addEventListener('click',()=>{activeBrand=b.dataset.brand;$$('.filter-btn[data-brand]').forEach(x=>x.classList.toggle('active',x===b));applyFilters();}));
  $('#btn-fetch').addEventListener('click',async()=>{toast('Rechargement...','info');await loadProducts();});
  $('#btn-clear').addEventListener('click',()=>{products=[...LOCAL_DB];products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price.official));filteredProducts=[...products];applyFilters();toast('Base locale restauree','success');});
  $('#btn-subscribe').addEventListener('click',()=>{userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateCartPanel();updateSubUI();toast(userContext.isSubscriber?'Abonnement active (1eur/jour)':'Desactive',userContext.isSubscriber?'success':'info');});
  $('#btn-subscribe-header').addEventListener('click',()=>{userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateCartPanel();updateSubUI();toast(userContext.isSubscriber?'Abonnement active (1eur/jour)':'Desactive',userContext.isSubscriber?'success':'info');});
  $('#btn-cart-header').addEventListener('click',()=>document.getElementById('cart-panel').scrollIntoView({behavior:'smooth'}));
  $('#modal-close').addEventListener('click',closeModal);
  $('#modal-overlay').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
}

// ============ INIT ============
function init(){
  console.log('KiffTech init, LOCAL_DB:', LOCAL_DB?.length);
  try {
    // Ensure products initialized
    if (!products?.length) products = [...LOCAL_DB];
    products.forEach(p => { if (!p.kifftech) p.kifftech = calcKiffTechPrice(p.price.official); });
    filteredProducts = [...products];
    
    renderFilters();
    refreshKiffTechPrices();
    applyFilters(); // Initial render
    loadProducts(); // Background API fetch
    initEvents();
    initParticles();
    updateSubUI();
    console.log('KiffTech initialized, products:', products.length);
  } catch(e) {
    console.error('KiffTech init error:', e);
    document.body.innerHTML += '<pre style="color:red;padding:20px;background:#1a1d3a;position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;overflow:auto">INIT ERROR: ' + e.message + '\n' + e.stack + '</pre>';
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

window.KiffTech={products:()=>products,fetch:loadProducts,subscribe:()=>{userContext.isSubscriber=!userContext.isSubscriber;userContext.tenureDays=userContext.isSubscriber?30:0;refreshKiffTechPrices();renderProducts();updateSubUI();}};