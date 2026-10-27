// ============ LOCAL_DB (80 produits, 8 catégories × 10) ============
const LOCAL_DB = [
  // --- Smartphones (10) ---
  {id:'sp1',brand:'Samsung',model:'Galaxy S24 Ultra',year:2024,category:'Smartphones',price:{official:1469},specs:{Écran:'6.8" Dynamic AMOLED 2X 120Hz',Processeur:'Snapdragon 8 Gen 3',RAM:'12 Go',Stockage:'256 Go',Appareil:'200+50+12+10 MP',Batterie:'5000 mAh'}},  
  {id:'sp2',brand:'Apple',model:'iPhone 15 Pro Max',year:2023,category:'Smartphones',price:{official:1479},specs:{Écran:'6.7" Super Retina XDR 120Hz',Processeur:'A17 Pro',RAM:'8 Go',Stockage:'256 Go',Appareil:'48+12+12 MP',Batterie:'4441 mAh'}},  
  {id:'sp3',brand:'Xiaomi',model:'14 Ultra',year:2024,category:'Smartphones',price:{official:1499},specs:{Écran:'6.73" LTPO AMOLED 120Hz',Processeur:'Snapdragon 8 Gen 3',RAM:'16 Go',Stockage:'512 Go',Appareil:'50+50+50+50 MP Leica',Batterie:'5300 mAh'}},  
  {id:'sp4',brand:'Google',model:'Pixel 8 Pro',year:2023,category:'Smartphones',price:{official:1099},specs:{Écran:'6.7" LTPO OLED 120Hz',Processeur:'Tensor G3',RAM:'12 Go',Stockage:'128 Go',Appareil:'50+48+48 MP',Batterie:'5050 mAh'}},  
  {id:'sp5',brand:'OnePlus',model:'12',year:2024,category:'Smartphones',price:{official:969},specs:{Écran:'6.82" LTPO AMOLED 120Hz',Processeur:'Snapdragon 8 Gen 3',RAM:'16 Go',Stockage:'512 Go',Appareil:'50+64+48 MP',Batterie:'5400 mAh'}},  
  {id:'sp6',brand:'Nothing',model:'Phone 2a',year:2024,category:'Smartphones',price:{official:349},specs:{Écran:'6.7" AMOLED 120Hz',Processeur:'MediaTek Dimensity 7200 Pro',RAM:'12 Go',Stockage:'256 Go',Appareil:'50+50 MP',Batterie:'5000 mAh'}},  
  {id:'sp7',brand:'Motorola',model:'Edge 50 Ultra',year:2024,category:'Smartphones',price:{official:999},specs:{Écran:'6.7" pOLED 144Hz',Processeur:'Snapdragon 8s Gen 3',RAM:'12 Go',Stockage:'512 Go',Appareil:'50+64+50 MP',Batterie:'4500 mAh'}},  
  {id:'sp8',brand:'OPPO',model:'Find X7 Ultra',year:2024,category:'Smartphones',price:{official:1299},specs:{Écran:'6.82" LTPO AMOLED 120Hz',Processeur:'Snapdragon 8 Gen 3',RAM:'16 Go',Stockage:'512 Go',Appareil:'50+50+50+50 MP',Batterie:'5000 mAh'}},  
  {id:'sp9',brand:'Realme',model:'GT 6',year:2024,category:'Smartphones',price:{official:699},specs:{Écran:'6.78" LTPO AMOLED 120Hz',Processeur:'Snapdragon 8s Gen 3',RAM:'16 Go',Stockage:'256 Go',Appareil:'50+50+8 MP',Batterie:'5500 mAh'}},  
  {id:'sp10',brand:'POCO',model:'F6 Pro',year:2024,category:'Smartphones',price:{official:579},specs:{Écran:'6.67" Flow AMOLED 120Hz',Processeur:'Snapdragon 8 Gen 2',RAM:'12 Go',Stockage:'256 Go',Appareil:'50+8+2 MP',Batterie:'5000 mAh'}},  

  // --- Computers (10) ---
  {id:'cp1',brand:'Apple',model:'MacBook Pro 16 M3 Max',year:2023,category:'Computers',price:{official:3999},specs:{Écran:'16.2" Liquid Retina XDR',Processeur:'M3 Max 16 cœurs',RAM:'48 Go',Stockage:'1 To SSD',GPU:'40 cœurs',Autonomie:'22 h'}},  
  {id:'cp2',brand:'Dell',model:'XPS 15 9530',year:2023,category:'Computers',price:{official:2499},specs:{Écran:'15.6" 3.5K OLED Touch',Processeur:'i9-13900H',RAM:'32 Go',Stockage:'1 To SSD',GPU:'RTX 4070 8 Go',Autonomie:'10 h'}},  
  {id:'cp3',brand:'ASUS',model:'ROG Zephyrus G14',year:2024,category:'Computers',price:{official:1999},specs:{Écran:'14" 3K OLED 120Hz',Processeur:'Ryzen 9 8945HS',RAM:'32 Go',Stockage:'1 To SSD',GPU:'RTX 4070 8 Go',Autonomie:'10 h'}},  
  {id:'cp4',brand:'Lenovo',model:'ThinkPad X1 Carbon Gen 12',year:2024,category:'Computers',price:{official:2299},specs:{Écran:'14" 2.8K OLED 120Hz',Processeur:'Core Ultra 7 155H',RAM:'32 Go',Stockage:'1 To SSD',GPU:'Arc Graphics',Autonomie:'15 h'}},  
  {id:'cp5',brand:'HP',model:'Spectre x360 14',year:2024,category:'Computers',price:{official:1799},specs:{Écran:'13.5" 2.8K OLED 120Hz',Processeur:'Core Ultra 7 155H',RAM:'16 Go',Stockage:'1 To SSD',GPU:'Arc Graphics',Autonomie:'13 h'}},  
  {id:'cp6',brand:'Framework',model:'Laptop 13 AMD',year:2024,category:'Computers',price:{official:1049},specs:{Écran:'13.5" 2256x1504 3:2',Processeur:'Ryzen 5 7640U',RAM:'16 Go',Stockage:'512 Go SSD',GPU:'Radeon 760M',Autonomie:'10 h'}},  
  {id:'cp7',brand:'MSI',model:'Stealth 16 AI Studio',year:2024,category:'Computers',price:{official:2699},specs:{Écran:'16" 4K Mini LED 120Hz',Processeur:'Core Ultra 9 185H',RAM:'32 Go',Stockage:'2 To SSD',GPU:'RTX 4080 12 Go',Autonomie:'8 h'}},  
  {id:'cp8',brand:'Razer',model:'Blade 16',year:2024,category:'Computers',price:{official:3299},specs:{Écran:'16" Dual Mode Mini LED',Processeur:'i9-14900HX',RAM:'32 Go',Stockage:'2 To SSD',GPU:'RTX 4090 16 Go',Autonomie:'6 h'}},  
  {id:'cp9',brand:'LG',model:'Gram 17',year:2024,category:'Computers',price:{official:1699},specs:{Écran:'17" WQXGA IPS 144Hz',Processeur:'Core Ultra 7 155H',RAM:'16 Go',Stockage:'1 To SSD',GPU:'Arc Graphics',Autonomie:'18 h'}},  
  {id:'cp10',brand:'Samsung',model:'Galaxy Book4 Ultra',year:2024,category:'Computers',price:{official:2799},specs:{Écran:'16" 3K AMOLED 120Hz',Processeur:'Core Ultra 9 185H',RAM:'32 Go',Stockage:'1 To SSD',GPU:'RTX 4070 8 Go',Autonomie:'14 h'}},  

  // --- Tablets (10) ---
  {id:'tb1',brand:'Apple',model:'iPad Pro 13 M4',year:2024,category:'Tablets',price:{official:1599},specs:{Écran:'13" Ultra Retina XDR 120Hz',Processeur:'M4 10 cœurs',RAM:'16 Go',Stockage:'512 Go',Caméra:'12 MP + 10 MP',Autonomie:'10 h'}},  
  {id:'tb2',brand:'Samsung',model:'Galaxy Tab S9 Ultra',year:2023,category:'Tablets',price:{official:1399},specs:{Écran:'14.6" Dynamic AMOLED 2X 120Hz',Processeur:'Snapdragon 8 Gen 2',RAM:'12 Go',Stockage:'256 Go',Caméra:'13+8 MP',Autonomie:'12 h'}},  
  {id:'tb3',brand:'Xiaomi',model:'Pad 6S Pro 12.4',year:2024,category:'Tablets',price:{official:599},specs:{Écran:'12.4" 3K 144Hz',Processeur:'Snapdragon 8 Gen 2',RAM:'12 Go',Stockage:'256 Go',Caméra:'50 MP',Autonomie:'14 h'}},  
  {id:'tb4',brand:'Lenovo',model:'Tab Extreme',year:2023,category:'Tablets',price:{official:699},specs:{Écran:'14.5" 3K OLED 120Hz',Processeur:'Dimensity 9000',RAM:'12 Go',Stockage:'256 Go',Caméra:'13 MP',Autonomie:'10 h'}},  
  {id:'tb5',brand:'OnePlus',model:'Pad 2',year:2024,category:'Tablets',price:{official:549},specs:{Écran:'12.1" 3K 144Hz',Processeur:'Snapdragon 8 Gen 3',RAM:'12 Go',Stockage:'256 Go',Caméra:'13 MP',Autonomie:'13 h'}},  
  {id:'tb6',brand:'Google',model:'Pixel Tablet',year:2023,category:'Tablets',price:{official:599},specs:{Écran:'10.95" 2560x1600 60Hz',Processeur:'Tensor G2',RAM:'8 Go',Stockage:'128 Go',Caméra:'8 MP',Autonomie:'12 h'}},  
  {id:'tb7',brand:'Microsoft',model:'Surface Pro 10',year:2024,category:'Tablets',price:{official:1199},specs:{Écran:'13" 2880x1920 120Hz',Processeur:'Core Ultra 7 165H',RAM:'16 Go',Stockage:'256 Go',Caméra:'10 MP',Autonomie:'11 h'}},  
  {id:'tb8',brand:'Huawei',model:'MatePad Pro 13.2',year:2023,category:'Tablets',price:{official:799},specs:{Écran:'13.2" 2.8K OLED 144Hz',Processeur:'Kirin 9000S',RAM:'12 Go',Stockage:'256 Go',Caméra:'13 MP',Autonomie:'12 h'}},  
  {id:'tb9',brand:'OPPO',model:'Pad 3 Pro',year:2024,category:'Tablets',price:{official:499},specs:{Écran:'11.61" 2.8K 144Hz',Processeur:'Snapdragon 8 Gen 3',RAM:'12 Go',Stockage:'256 Go',Caméra:'13 MP',Autonomie:'13 h'}},  
  {id:'tb10',brand:'Nothing',model:'Tablet (rumored)',year:2024,category:'Tablets',price:{official:399},specs:{Écran:'11" 2K 120Hz',Processeur:'Dimensity 8200',RAM:'8 Go',Stockage:'128 Go',Caméra:'8 MP',Autonomie:'10 h'}},  

  // --- VR AR gadgets (10) ---
  {id:'vr1',brand:'Apple',model:'Vision Pro',year:2024,category:'VR AR gadgets',price:{official:3999},specs:{Écran:'Micro-OLED 23M pixels/œil',Processeur:'M2 + R1',RAM:'16 Go',Stockage:'256 Go',Tracking:'Yeux/mains/voix',Autonomie:'2-2.5 h'}},  
  {id:'vr2',brand:'Meta',model:'Quest 3',year:2023,category:'VR AR gadgets',price:{official:549},specs:{Écran:'LCD 2064x2208/œil 120Hz',Processeur:'Snapdragon XR2 Gen 2',RAM:'8 Go',Stockage:'128 Go',Tracking:'Inside-out + mains',Autonomie:'2-3 h'}},  
  {id:'vr3',brand:'Meta',model:'Quest Pro',year:2022,category:'VR AR gadgets',price:{official:1099},specs:{Écran:'Mini LED 1800x1920/œil 90Hz',Processeur:'Snapdragon XR2+',RAM:'12 Go',Stockage:'256 Go',Tracking:'Yeux/visage/mains',Autonomie:'1-2 h'}},  
  {id:'vr4',brand:'HTC',model:'Vive XR Elite',year:2023,category:'VR AR gadgets',price:{official:1099},specs:{Écran:'LCD 1920x1920/œil 90Hz',Processeur:'Snapdragon XR2',RAM:'12 Go',Stockage:'128 Go',Tracking:'Inside-out + mains',Autonomie:'2 h'}},  
  {id:'vr5',brand:'PICO',model:'PICO 4 Ultra',year:2024,category:'VR AR gadgets',price:{official:599},specs:{Écran:'LCD 2160x2160/œil 90Hz',Processeur:'Snapdragon XR2 Gen 2',RAM:'8 Go',Stockage:'256 Go',Tracking:'Inside-out + mains',Autonomie:'2-3 h'}},  
  {id:'vr6',brand:'XREAL',model:'Air 2 Ultra',year:2024,category:'VR AR gadgets',price:{official:699},specs:{Écran:'Micro-OLED 1080p/œil 120Hz',Processeur:'Snapdragon XR2',RAM:'6 Go',Stockage:'128 Go',Tracking:'6DoF + mains',Autonomie:'3 h (ext.)'}},  
  {id:'vr7',brand:'Rokid',model:'Max Pro',year:2024,category:'VR AR gadgets',price:{official:599},specs:{Écran:'Micro-OLED 1080p/œil 120Hz',Processeur:'Intégré',RAM:'4 Go',Stockage:'32 Go',Tracking:'3DoF',Autonomie:'2 h (ext.)'}},  
  {id:'vr8',brand:'Viture',model:'Pro XR',year:2024,category:'VR AR gadgets',price:{official:499},specs:{Écran:'Micro-OLED 1080p/œil 120Hz',Processeur:'Aucun (téléphone)',RAM:'-',Stockage:'-',Tracking:'3DoF',Autonomie:'N/A'}},  
  {id:'vr9',brand:'RayNeo',model:'X2',year:2024,category:'VR AR gadgets',price:{official':799},specs:{Écran:'Micro-LED 1080p/œil',Processeur:'Snapdragon XR2',RAM:'6 Go',Stockage:'32 Go',Tracking:'6DoF + SLAM',Autonomie:'2 h'}},  
  {id:'vr10',brand:'DPVR',model:'P2',year:2024,category:'VR AR gadgets',price:{official:399},specs:{Écran:'LCD 2160x2160/œil 90Hz',Processeur:'XR2 Gen 1',RAM:'8 Go',Stockage:'128 Go',Tracking:'Inside-out',Autonomie:'2.5 h'}},  

  // --- Composant electronic & informatic (10) ---
  {id:'ce1',brand:'ASUS',model:'ROG Maximus Z790 Hero',year:2023,category:'Composant electronic & informatic',price:{official:799},specs:{Socket:'LGA1700',Chipset:'Z790',RAM:'DDR5 192 Go max',PCIe:'5.0 x16',Réseau:'10GbE + WiFi 7',Audio:'ESS ES9218'}},  
  {id:'ce2',brand:'MSI',model:'MPG Z790 Carbon WiFi',year:2023,category:'Composant electronic & informatic',price:{official:499},specs:{Socket:'LGA1700',Chipset:'Z790',RAM:'DDR5 128 Go max',PCIe:'5.0 x16',Réseau:'2.5GbE + WiFi 6E',Audio:'ALC4080'}},  
  {id:'ce3',brand:'Gigabyte',model:'X670E AORUS Master',year:2022,category:'Composant electronic & informatic',price:{official:599},specs:{Socket:'AM5',Chipset:'X670E',RAM:'DDR5 128 Go max',PCIe:'5.0 x16 + 5.0 x4',Réseau:'10GbE + WiFi 6E',Audio:'ALC4080'}},  
  {id:'ce4',brand:'ASRock',model:'X670E Taichi',year:2022,category:'Composant electronic & informatic',price:{official:549},specs:{Socket:'AM5',Chipset:'X670E',RAM:'DDR5 128 Go max',PCIe:'5.0 x16 + 5.0 x4',Réseau:'10GbE + WiFi 6E',Audio:'ALC4082'}},  
  {id:'ce5',brand:'Corsair',model:'HX1500i',year:2023,category:'Composant electronic & informatic',price:{official:449},specs:{Puissance:'1500W',Certif:'80+ Platinum',Modulaire:'Full',Ventilateur:'140mm ML',Garantie:'10 ans',Connectique:'ATX 3.0'}},  
  {id:'ce6',brand:'Seasonic',model:'Prime TX-1000',year:2022,category:'Composant electronic & informatic',price:{official:399},specs:{Puissance:'1000W',Certif:'80+ Titanium',Modulaire:'Full',Ventilateur:'135mm FDB',Garantie:'12 ans',Connectique:'ATX 3.0'}},  
  {id:'ce7',brand:'Samsung',model:'990 Pro 2To',year:2023,category:'Composant electronic & informatic',price:{official:179},specs:{Interface:'PCIe 4.0 x4',Lecture:'7450 Mo/s',Écriture:'6900 Mo/s',Format:'M.2 2280',Contrôleur:'Pascal',Cache:'2 Go LPDDR4'}},  
  {id:'ce8',brand:'WD',model:'Black SN850X 2To',year:2023,category:'Composant electronic & informatic',price:{official:159},specs:{Interface:'PCIe 4.0 x4',Lecture:'7300 Mo/s',Écriture:'6600 Mo/s',Format:'M.2 2280',Contrôleur:'Proprio',Cache:'2 Go DDR4'}},  
  {id:'ce9',brand:'G.Skill',model:'Trident Z5 RGB 64Go (2x32) 6400',year:2023,category:'Composant electronic & informatic',price:{official:299},specs:{Type:'DDR5',Fréquence:'6400 MHz',Latence:'CL32',Capacité:'64 Go (2x32)',Voltage:'1.4V',RGB:'Oui'}},  
  {id:'ce10',brand:'Corsair',model:'Dominator Titanium 64Go (2x32) 7200',year:2024,category:'Composant electronic & informatic',price:{official:399},specs:{Type:'DDR5',Fréquence:'7200 MHz',Latence:'CL34',Capacité:'64 Go (2x32)',Voltage:'1.45V',RGB:'Oui (Capellix)'}},  

  // --- Company & studying Robots (10) ---
  {id:'rb1',brand:'Unitree',model:'Go2',year:2024,category:'Company & studying Robots',price:{official:2499},specs:{Type:'Quadrupède',Poids:'15 kg',Autonomie:'2-4 h',Vitesse:'5 m/s',Capteurs:'LiDAR 360° + caméras',API:'ROS 2 + SDK Python/C++'}},  
  {id:'rb2',brand:'Boston Dynamics',model:'Spot',year:2020,category:'Company & studying Robots',price:{official:74500},specs:{Type:'Quadrupède',Poids:'32 kg',Autonomie:'1.5 h',Vitesse:'1.6 m/s',Capteurs:'5 caméras stéréo + LiDAR',API:'SDK Python + ROS'}},  
  {id:'rb3',brand:'Agility Robotics',model:'Digit',year:2023,category:'Company & studying Robots',price:{official:150000},specs:{Type:'Bipède',Poids:'65 kg',Autonomie:'3 h',Charge:'16 kg',Capteurs:'LiDAR + caméras depth',API:'ROS 2'}},  
  {id:'rb4',brand:'Tesla',model:'Optimus Gen 2',year:2024,category:'Company & studying Robots',price:{official:25000},specs:{Type:'Humanoïde',Poids:'73 kg',Autonomie:'8 h',Charge:'20 kg',Capteurs:'Caméras + FSD',API:'Propriétaire'}},  
  {id:'rb5',brand:'Figure',model:'Figure 01',year:2024,category:'Company & studying Robots',price:{official:30000},specs:{Type:'Humanoïde',Poids:'60 kg',Autonomie:'5 h',Charge:'20 kg',Capteurs:'6 caméras RGB + depth',API:'ROS 2 + OpenAI'}},  
  {id:'rb6',brand:'1X Technologies',model:'EVE',year:2023,category:'Company & studying Robots',price:{official:35000},specs:{Type:'Humanoïde (roues)',Poids:'86 kg',Autonomie:'6 h',Charge:'15 kg',Capteurs:'Caméras 360°',API:'ROS 2'}},  
  {id:'rb7',brand:'Apptronik',model:'Apollo',year:2024,category:'Company & studying Robots',price:{official:50000},specs:{Type:'Humanoïde',Poids:'72 kg',Autonomie:'4 h',Charge:'25 kg',Capteurs:'Force/torque + vision',API:'ROS 2'}},  
  {id:'rb8',brand:'ANYbotics',model:'ANYmal D',year:2023,category:'Company & studying Robots',price:{official:120000},specs:{Type:'Quadrupède',Poids:'50 kg',Autonomie:'2.5 h',Vitesse:'2.5 m/s',Capteurs:'LiDAR + 5 caméras',API:'ROS 2 + SDK'}},  
  {id:'rb9',brand:'Ghost Robotics',model:'Vision 60',year:2022,category:'Company & studying Robots',price:{official:150000},specs:{Type:'Quadrupède militaire',Poids:'51 kg',Autonomie:'3 h',Vitesse:'3 m/s',Capteurs:'LiDAR 360 + thermiques',API:'ROS + SDK'}},  
  {id:'rb10',brand:'Deep Robotics',model:'Jueying X20',year:2023,category:'Company & studying Robots',price:{official:45000},specs:{Type:'Quadrupède',Poids:'38 kg',Autonomie:'2 h',Vitesse:'3 m/s',Capteurs:'LiDAR + caméras',API:'ROS 2 + Python'}},  

  // --- Garden & furnitures smart devices (10) ---
  {id:'gf1',brand:'Husqvarna',model:'Automower 450X',year:2023,category:'Garden & furnitures smart devices',price:{official:3499},specs:{Type:'Robot tondeuse',Surface:'5000 m²',Autonomie:'270 min',Navigation:'GPS + fil guide',App:'Automower Connect',Pente:'45%'}},  
  {id:'gf2',brand:'Segway',model:'Navimow i110N',year:2024,category:'Garden & furnitures smart devices',price:{official:1299},specs:{Type:'Robot tondeuse sans fil',Surface:'1000 m²',Autonomie:'60 min',Navigation:'RTK + vision',App:'Navimow',Pente:'30%'}},  
  {id:'gf3',brand:'Ecovacs',model:'Goat G1',year:2024,category:'Garden & furnitures smart devices',price:{official:1599},specs:{Type:'Robot tondeuse',Surface:'1600 m²',Autonomie:'120 min',Navigation:'RTK + AIVI 3D',App:'Ecovacs Home',Pente:'35%'}},  
  {id:'gf4',brand:'Dreame',model:'A1',year:2024,category:'Garden & furnitures smart devices',price:{official:1999},specs:{Type:'Robot tondeuse',Surface:'2000 m²',Autonomie:'150 min',Navigation:'LiDAR 3D + RTK',App:'Dreamehome',Pente:'40%'}},  
  {id:'gf5',brand:'Mammotion',model:'Luba 2 AWD 5000',year:2024,category:'Garden & furnitures smart devices',price:{official:2799},specs:{Type:'Robot tondeuse 4 roues motrices',Surface:'5000 m²',Autonomie:'240 min',Navigation:'RTK + vision',App:'Mammotion',Pente:'80%'}},  
  {id:'gf6',brand:'Philips Hue',model:'Outdoor Lily XL',year:2023,category:'Garden & furnitures smart devices',price:{official:199},specs:{Type:'Éclairage extérieur',Flux:'1600 lm',Couleur:'16M + blanc',Alimentation:'Secteur',Contrôle:'Hue Bridge + Matter',IP:'IP65'}},  
  {id:'gf7',brand:'Govee',model:'Permanent Outdoor Lights Pro',year:2024,category:'Garden & furnitures smart devices',price:{official:299},specs:{Type:'Guirlande permanente',Longueur:'15 m (60 LED)',Couleur:'RGBIC',Contrôle:'App + Matter + Alexa',IP:'IP67',Installation:'Clips'}},  
  {id:'gf8',brand:'Rachio',model:'Smart Sprinkler 3e gen 16 zones',year:2023,category:'Garden & furnitures smart devices',price:{official:249},specs:{Type:'Arrosage connecté',Zones:'16',Météo:'Weather Intelligence+',Contrôle:'App + Alexa/Google',Homologation:'WaterSense',Install:'DIY'}},  
  {id:'gf9',brand:'Moen',model:'Smart Faucet',year:2023,category:'Garden & furnitures smart devices',price:{official:499},specs:{Type:'Robinet cuisine intelligent',Contrôle:'Voix + app + capteur',Température:'Préréglages',Débit:'1.5 GPM',Alimentation:'Batterie 6V',Finition:'Chrome/Noir'}},  
  {id:'gf10',brand:'IKEA',model:'VALLHORN + DIRIGERA',year:2023,category:'Garden & furnitures smart devices',price:{official:89},specs:{Type:'Capteur mouvement + hub',Détection:'12m / 100°',Autonomie:'2 ans (pile)',Hub:'Dirigera (Matter/Thread)',App:'IKEA Home Smart',Usage:'Int/Ext (IP44)'}},  

  // --- Audio & Wearables (10) ---
  {id:'aw1',brand:'Sony',model:'WH-1000XM5',year:2022,category:'Audio & Wearables',price:{official:399},specs:{Type:'Casque ANC',Transducteur:'30 mm',ANC:'Processeur V1 + QN1',Codec:'LDAC + LC3',Autonomie:'30 h (ANC)',Poids:'250 g'}},  
  {id:'aw2',brand:'Bose',model:'QuietComfort Ultra',year:2023,category:'Audio & Wearables',price:{official:449},specs:{Type:'Casque ANC',Transducteur:'40 mm',ANC:'CustomTune',Codec:'aptX Adaptive',Autonomie:'24 h (ANC)',Poids:'254 g'}},  
  {id:'aw3',brand:'Apple',model:'AirPods Pro 2 (USB-C)',year:2023,category:'Audio & Wearables',price:{official:279},specs:{Type:'TWS ANC',Puce:'H2',ANC:'Adaptatif 2x',Codec:'AAC + LC3',Autonomie:'6 h (ANC) + 24 h étui',Audio:'Spatial + Suivi tête'}},  
  {id:'aw4',brand:'Sennheiser',model:'Momentum 4 Wireless',year:2022,category:'Audio & Wearables',price:{official:349},specs:{Type:'Casque ANC',Transducteur:'42 mm',ANC:'Adaptatif',Codec:'aptX Adaptive + LDAC',Autonomie:'60 h (ANC)',Poids:'293 g'}},  
  {id:'aw5',brand:'Technics',model:'EAH-AZ80',year:2023,category:'Audio & Wearables',price:{official:299},specs:{Type:'TWS ANC',Transducteur:'10 mm',ANC:'Hybride',Codec:'LDAC + LC3',Autonomie:'7 h (ANC) + 17.5 h étui',Multipoint:'3 appareils'}},  
  {id:'aw6',brand:'Samsung',model:'Galaxy Buds 3 Pro',year:2024,category:'Audio & Wearables',price:{official:249},specs:{Type:'TWS ANC',Transducteur:'11 mm + 6.5 mm',ANC:'Adaptatif IA',Codec:'SSC + LDAC',Autonomie:'6 h (ANC) + 18 h étui',Audio:'360° + Suivi tête'}},  
  {id:'aw7',brand:'Xiaomi',model:'Redmi Buds 6 Pro',year:2024,category:'Audio & Wearables',price:{official:99},specs:{Type:'TWS ANC',Transducteur:'11 mm',ANC:'55 dB hybride',Codec:'LDAC',Autonomie:'9 h (ANC) + 27 h étui',Audio:'Spatial'}},  
  {id:'aw8',brand:'Garmin',model:'Fenix 8 Solar',year:2024,category:'Audio & Wearables',price:{official:1099},specs:{Type:'Montre GPS multisport',Écran:'1.4" AMOLED Solar',Autonomie:'29 j (solaire)',GPS:'Multi-bande + SatIQ',Capteurs:'Cardio + SpO2 + ECG',Cartes:'TopoActive Mond'}},  
  {id:'aw9',brand:'Apple',model:'Apple Watch Ultra 2',year:2023,category:'Audio & Wearables',price:{official:899},specs:{Type:'Montre connectée',Écran:'1.92" Retina 3000 nits',Autonomie:'36 h (72 h éco)',GPS:'Double fréquence',Capteurs:'Température + ECG + SpO2',Action:'Bouton Action'}},  
  {id:'aw10',brand:'Samsung',model:'Galaxy Watch 7 44mm',year:2024,category:'Audio & Wearables',price:{official:329},specs:{Type:'Montre connectée',Écran:'1.47" Super AMOLED',Autonomie:'40 h',GPS:'Double fréquence',Capteurs:'BioActive 2.0 (ECG/TA)',OS:'Wear OS 5'}},  

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
function calcKiffTechPrice(officialPrice, context={}){const {isSubscriber=false,cartItems=[],isPromoEligible=false}=context;let discount=0,freeDelivery=false,reason='';if(isSubscriber){discount=Math.min(10+Math.floor(context.tenureDays/30),21);freeDelivery=true;reason=`Abonne KiffTech (${discount}% + livraison offerte)`;}else if(context.isPromoEligible||context.cartItems.length>=10){discount=20;reason=`Promo 20% (10+ articles)`;}const final=discount>0?Math.round(officialPrice*(100-discount)/100):officialPrice;return{official:officialPrice,kifftech:final,discount,savings:officialPrice-final,freeDelivery,reason,currency:'EUR'};}
function refreshKiffTechPrices(){products.forEach(p=>p.kifftech=calcKiffTechPrice(p.price.official,{isSubscriber:userContext.isSubscriber,cartItems:userContext.cartItems,tenureDays:userContext.tenureDays}));filteredProducts.forEach(p=>{const o=products.find(x=>x.id===p.id);if(o)p.kifftech=o.kifftech;});}

// ============ CLICKWISE API ============
async function fetchFromClickwise() {
  try {
    toast('Connexion a ClickWise API...','info');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
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
function updateSubUI(){const html=userContext.isSubscriber?'Gerer':'S\'abonner 1eur/jour';[$('#btn-subscribe'),$('#btn-subscribe-header')].forEach(el=>{if(el){el.innerHTML=html;el.className='action-btn '+(userContext.isSubscriber?'primary':'');}});updatePromoUI();}
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
function updateSubUI(){const html=userContext.isSubscriber?'Gerer':`S'abonner 1eur/jour`;[$('#btn-subscribe'),$('#btn-subscribe-header')].forEach(el=>{if(el){el.innerHTML=html;el.className='action-btn '+(userContext.isSubscriber?'primary':'');}});updatePromoUI();}
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
    if (!products?.length) products = [...LOCAL_DB];
    products.forEach(p => { if (!p.kifftech) p.kifftech = calcKiffTechPrice(p.price.official); });
    filteredProducts = [...products];
    
    renderFilters();
    refreshKiffTechPrices();
    applyFilters();
    loadProducts();
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