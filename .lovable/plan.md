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

Les horaires figurent déjà en dur sur la page Contact (Lun–Ven 9h–19h, Sam 9h–17h, Dim fermé) : ils seront repris dans le LocalBusiness (`openingHoursSpecification`) et la page Contact lira la même source, plus de double saisie.

Points à confirmer si tu les as : coordonnées GPS, URL finale du site, réseaux sociaux, fourchette de prix. Sans réponse, j'écris uniquement les champs vérifiés.

## 4. Images en dur, pas de CDN

Vérification faite : le projet source ne contient **aucun pointeur `.asset.json`** — toutes les images sont déjà des fichiers réels dans `src/assets` importés par le bundler. Les deux nouveaux logos seront ajoutés de la même façon (fichiers réels dans `src/assets`, import ES), et le favicon reste un fichier réel dans `public/`. Rien ne dépendra du CDN Lovable, le déploiement Vercel restera autonome.

## Détails techniques

- `src/styles.css` : `--breakpoint-cta: 900px` → `1080px`.
- `src/components/SiteHeader.tsx` : import des deux logos, rendu conditionnel `block dark:hidden` / `hidden dark:block`, avec `alt` sur une seule instance.
- Copie des deux PNG uploadés dans `src/assets/` (fichiers binaires réels, pas de `lovable-assets`).
- `src/data/localBusiness.ts` : objet de données structurées ; injection via `head().scripts` (JSON-LD) dans `src/routes/__root.tsx`.
- Chaque route conserve son `head()` (title/description/og) du projet source.

## 5. Suppression des mentions Planity

`site.booking` pointe sur `https://www.planity.com/` et les libellés parlent de réservation. Le lien externe est remplacé par un champ neutre (`site.booking`) pointant vers la page Contact tant que tu ne me donnes pas l'URL finale de réservation ; aucun texte, logo ou nom « Planity » ne subsiste. Les boutons gardent leur libellé « Réserver » / « Réserver un soin » et leur style. Donne-moi l'URL de réservation définitive si tu en as une, je la branche.

## 6. Audit du site (sans toucher au design)

Constats issus de la lecture du code, avec les correctifs prévus — tous invisibles ou quasi invisibles visuellement.

**SEO**
- Aucune balise `canonical` et aucun `sitemap.xml` : ajout d'un canonical auto-référent par page et d'un `sitemap.xml`.
- Aucun `og:image` : ajout d'une image de partage par défaut à partir d'un visuel existant du centre.
- Aucune donnée structurée (voir point 3) ; ajout aussi d'un `BreadcrumbList` sur les fiches soin.
- `robots.txt` correct, complété avec la ligne Sitemap une fois le domaine connu.
- Vérification qu'il n'y a qu'un seul `h1` par page et une hiérarchie de titres continue.

**Accessibilité**
- Vérification des `alt` (le logo rond décoratif garde `alt=""`, le wordmark porte le nom).
- Libellés explicites sur les boutons icône (thème, burger, WhatsApp) et sur les liens « en savoir plus ».
- Lien d'évitement « Aller au contenu » et cible `<main>` focusable.
- Contraste vérifié en clair et en sombre sur le doré (texte sur `gold-cta`), ajustement du token seulement si un ratio est sous AA.
- Zones tactiles ≥ 44 px sur la barre CTA mobile et les icônes du header.
- `prefers-reduced-motion` respecté pour les animations d'apparition.

**Responsive**
- Passage en revue 320 / 375 / 768 / 900 / 1080 / 1440 px après le changement de breakpoint, avec captures.
- Recherche des débordements horizontaux et des titres non tronqués dans les en-têtes multi-éléments.
- `min-h-dvh` plutôt que `min-h-screen` sur les sections plein écran (barres de navigateur mobile).

**Sécurité**
- Tous les liens externes en `target="_blank"` doivent porter `rel="noopener noreferrer"` : vérification systématique.
- Aucune clé ni secret côté client ; pas de backend, donc pas de surface RLS.
- Audit des dépendances npm ; mise à jour uniquement des vulnérabilités hautes/critiques, sans montée de version majeure.

**Bonnes pratiques**
- Images : `width`/`height` renseignés, `loading="lazy"` et `decoding="async"` hors visuel héros (qui reste en `eager`) pour éviter le décalage de mise en page.
- Centralisation des infos NAP (nom, adresse, téléphone, horaires) dans `src/data/site.ts` pour éviter les divergences.
- Page 404 traduite en français et raccordée au design du site (actuellement en anglais et hors charte).

Rien de ce qui précède ne modifie la mise en page, la typographie ou la palette existantes.

## 7. Préparation du blog / Decap CMS

Tu géreras Decap depuis GitHub ; le site sera prêt à l'accueillir :
- entrée « Blog » ajoutée à la navigation (d'où le breakpoint 1080 px) ;
- routes `/blog` (liste) et `/blog/$slug` (article) au design existant, alimentées par des fichiers Markdown dans `content/blog/`, chargés au build — donc statiques et compatibles Vercel ;
- deux articles d'exemple pour valider le rendu ;
- `head()` par article : title, description, `og:*`, canonical et JSON-LD `Article` ;
- images d'article dans `public/uploads/` (dossier attendu par Decap), en fichiers réels ;
- côté Decap tu n'auras qu'à déposer `public/admin/index.html` et `config.yml` pointant sur `content/blog` et `public/uploads` — je peux aussi les générer si tu veux.

Dis-moi si tu veux que le blog fasse partie de cette livraison ou d'une seconde étape.