# Reprise du site Reboot Dole + 4 ajustements

Le code du dépôt `reboot-dole-v4` est repris à l'identique (routes Accueil, Soins, fiche soin, Bien-être, Concept, Contact, header/footer, barre CTA mobile, thème clair/sombre, design system doré/marine), puis les 4 points demandés sont traités.

## 1. Menu burger jusqu'à 1080 px

Le header bascule aujourd'hui en menu horizontal à partir de 900 px (variable de breakpoint `cta`). Ce seuil passe à **1080 px** : en dessous, burger + panneau déroulant ; au-dessus, menu horizontal + bouton Réserver. Le menu reste ainsi lisible quand des entrées seront ajoutées (Blog).

## 2. Logo adapté au thème clair et sombre

Actuellement un seul wordmark (version claire sur fond sombre) est utilisé, illisible en thème clair. Les deux images fournies sont intégrées :
- `reboot_logo_light.png` (texte marine) affiché en thème clair
- `reboot_logo_dark.png` (texte blanc) affiché en thème sombre

Les deux sont rendues et l'affichage se fait via le variant `dark`, donc le bon logo apparaît immédiatement au changement de thème, sans clignotement. Le petit logo rond reste inchangé.

## 3. Fichier LocalBusiness

Vérification faite : **aucune donnée LocalBusiness / JSON-LD n'existe dans le projet source.** Elle sera donc créée, à partir des infos déjà présentes (nom, adresse 7 rue Jacques de Molay 39100 Dole, téléphone, email, lien de réservation) :
- un bloc de données structurées `LocalBusiness` (type HealthAndBeautyBusiness) avec nom, adresse postale, téléphone, e-mail, URL, zone desservie et lien de réservation ;
- injecté en JSON-LD dans le `head` du site, donc présent sur toutes les pages.

Points à confirmer si tu les as : horaires d'ouverture, coordonnées GPS, URL finale du site, réseaux sociaux. Sans réponse, j'écris les champs disponibles et je laisse les horaires de côté.

## 4. Images en dur, pas de CDN

Vérification faite : le projet source ne contient **aucun pointeur `.asset.json`** — toutes les images sont déjà des fichiers réels dans `src/assets` importés par le bundler. Les deux nouveaux logos seront ajoutés de la même façon (fichiers réels dans `src/assets`, import ES), et le favicon reste un fichier réel dans `public/`. Rien ne dépendra du CDN Lovable, le déploiement Vercel restera autonome.

## Détails techniques

- `src/styles.css` : `--breakpoint-cta: 900px` → `1080px`.
- `src/components/SiteHeader.tsx` : import des deux logos, rendu conditionnel `block dark:hidden` / `hidden dark:block`, avec `alt` sur une seule instance.
- Copie des deux PNG uploadés dans `src/assets/` (fichiers binaires réels, pas de `lovable-assets`).
- `src/data/localBusiness.ts` : objet de données structurées ; injection via `head().scripts` (JSON-LD) dans `src/routes/__root.tsx`.
- Chaque route conserve son `head()` (title/description/og) du projet source.