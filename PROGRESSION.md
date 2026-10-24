# PROGRESSION KeffStation

**Dernière MAJ** : 2026-10-24
**Objectif** : PWA prête à l'emploi (installable, offline, accessible)

## État global : 55%

| Public | Progression | Prochaine cible |
|--------|-------------|-----------------|
| Client / User | 70% | +manifest +SW = 90% |
| Joueur | 30% | Non prioritaire |
| Lecteur | 65% | +mode lecture = 85% |

## Checklist PWA

- [ ] `manifest.json` (icônes, thème, `display: standalone`, `launch_handler`)
- [ ] Service Worker (`sw.js`) : cache `stale-while-revalidate`, fallback offline
- [ ] Registration SW dans `index.html` + `app.js`
- [ ] Gestion `beforeinstallprompt` → bouton « Installer »
- [ ] Meta `theme-color`, `apple-mobile-web-app-*` déjà présents ✅
- [ ] HTTPS requis pour prod (GitHub Pages ✅)

## Blocages actuels

1. **Manifest manquant** — bloquant installation
2. **SW manquant** — bloquant offline
3. **Liens externes** — ouvrent en `_blank` au lieu de lancer PWAs cibles

## Prochaines actions (ordre)

1. Créer `manifest.json` + linker dans `index.html`
2. Écrire `sw.js` minimal (Workbox CDN ou natif)
3. Ajouter registration SW + UI install
4. Tester installation desktop + mobile
5. (Optionnel) `launch_handler` pour apps liées

## Métriques cibles

- Lighthouse PWA ≥ 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Offline : page d'accueil + assets critiques servis

## Notes

- Architecture single-file (HTML+CSS+JS) favorable au cache
- `app.js` déjà module ES → compatible SW moderne
- 3 apps cibles sont des PWAs GitHub Pages → `launch_handler` pertinent