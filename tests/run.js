// Suite de tests KeffStation : node tests/run.js (zéro dépendance).
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let failures = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (e) {
    failures++;
    console.error(`❌ ${name} : ${e.message}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const swJs = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));

check('syntaxe app.js / install.js / sw.js', () => {
  const files = ['app.js', 'install.js', 'sw.js', 'kifftech/sw.js', 'tricktrocjob/sw.js', 'viartificial/sw.js', 'cos-editor/sw.js', 'linguistic-motors/sw.js', 'videogames/sw.js'];
  for (const f of files) {
    execSync(`node --check ${f}`, { cwd: ROOT, stdio: 'pipe' });
  }
});

check('caches vidés (v2) et adaptatifs', () => {
  const sws = ['sw.js', 'kifftech/sw.js', 'tricktrocjob/sw.js', 'viartificial/sw.js', 'cos-editor/sw.js', 'linguistic-motors/sw.js', 'videogames/sw.js'];
  for (const f of sws) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    assert(/-v2'/.test(src), `${f}: version v2 absente (vieux cache conservé)`);
    assert(!/-v1'/.test(src), `${f}: référence v1 restante`);
    assert(src.includes("mode === 'navigate'") || src.includes('mode==='), `${f}: stratégie navigation absente`);
    assert(src.includes('woff2'), `${f}: stratégie statiques absente`);
    assert(!/"\/(index\.html|app\.js|manifest\.json)"/.test(src), `${f}: chemin absolu`);
  }
});

check('4 faces PWA avec URLs', () => {
  const urls = [...appJs.matchAll(/appUrl:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert(urls.length === 4, `attendu 4 appUrl, trouvé ${urls.length}`);
  assert(urls.every((u) => u.startsWith('https://samuelhaihornberg.github.io/keffstation/')), 'URLs hors scope keffstation');
  for (const gone of ['num: "Moteurs linguistiques"', 'num: "Éditeur cos"']) {
    assert(!appJs.includes(gone), `face restante : ${gone}`);
  }
  assert(appJs.includes('num: "Tricktrocjob"'), 'face Tricktrocjob absente');
  assert(appJs.includes('Moteurs linguistiques : NLP local'), 'articles NLP absents de ViArtificial');
  assert(appJs.includes('Éditeur cos : écrire la syntaxe'), 'articles cos absents de ViArtificial');
});

check('rotation cube correcte faces 0-5', () => {
  const m = appJs.match(/updateCubeRotation\(\) \{([\s\S]*?)\n  \}\n/);
  assert(m, 'méthode introuvable');
  const ctx = { current: 0, currentRotationY: 0, cube: { style: {} }, faces: [] };
  const fn = new Function(m[1]);
  const expected = ['rotateY(0deg)', 'rotateY(-90deg)', 'rotateY(-180deg)', 'rotateY(-270deg)'];
  expected.forEach((exp, i) => {
    ctx.current = i;
    fn.call(ctx);
    assert(ctx.cube.style.transform === exp, `face ${i}: ${ctx.cube.style.transform} != ${exp}`);
  });
});

check('boutons embed ouvrent overlay (pas de navigation forcée)', () => {
  assert(appJs.includes('this.openEmbed(app)'), 'openEmbed non branché');
  assert(/if \(app\.embedUrl\) \{\s*this\.openEmbed\(app\)/.test(appJs), 'overlay non prioritaire');
});

check('chemins relatifs GitHub Pages (SW + manifest)', () => {
  assert(!/"\/(index\.html|app\.js|manifest\.json)"/.test(swJs), 'SW: chemin absolu restant');
  assert(manifest.start_url === './', `start_url = ${manifest.start_url}`);
});

check('éléments DOM requis présents', () => {
  for (const id of ['cube', 'nav', 'arrows', 'loading', 'embed-overlay', 'embed-iframe']) {
    assert(indexHtml.includes(`id="${id}"`), `#${id} manquant`);
  }
});

check('faces actives droites (pas de miroir)', () => {
  // rotation cube + transform .active doivent s'annuler (net 0°)
  const cubeRot = { 0: 0, 1: -90, 2: -180, 3: -270 };
  const faceRotY = { 0: 0, 1: 90, 2: 180, 3: -90 };
  const get = (face) => {
    const re = new RegExp(`\\.cube-face\\.active\\[data-face="${face}"\\]\\{[^}]*transform:([^;}]+)`);
    const m = indexHtml.match(re);
    assert(m, `règle .active face ${face} introuvable`);
    return m[1];
  };
  for (const i of [0, 1, 2, 3]) {
    const t = get(i);
    const ry = new RegExp(`rotateY\\(${faceRotY[i]}deg\\)`).test(t);
    assert(ry, `face ${i} active non droite : ${t.trim()}`);
    assert(((cubeRot[i] + faceRotY[i]) % 360 + 360) % 360 === 0, `face ${i}: net non nul`);
  }
  assert(!/data-face="[45]"/.test(indexHtml), 'règles CSS pour faces inexistantes');
});

if (failures > 0) {
  console.error(`\n${failures} test(s) en échec`);
  process.exit(1);
}
console.log('\nTous les tests réussis.');
