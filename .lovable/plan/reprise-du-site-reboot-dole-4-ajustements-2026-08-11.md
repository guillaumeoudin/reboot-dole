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

Données confirmées et intégrées :
- `geo` : latitude 47.090721, longitude 5.489599
- `url` : https://reboot-dole.fr (également utilisée pour les canonical, og:url et le sitemap)
- `sameAs` : LinkedIn `https://www.linkedin.com/company/reboot-dole/` et Instagram `https://www.instagram.com/reboot_dole`
- `priceRange` : « 40–250 € »

(Petite correction : l'URL Instagram fournie contenait « instragram », j'utilise `instagram.com/reboot_dole`. Dis-moi si le compte est différent.)

## 4. Images en dur, pas de CDN

Vérification faite : le projet source ne contient **aucun pointeur `.asset.json`** — toutes les images sont déjà des fichiers réels dans `src/assets` importés par le bundler. Les deux nouveaux logos seront ajoutés de la même façon (fichiers réels dans `src/assets`, import ES), et le favicon reste un fichier réel dans `public/`. Rien ne dépendra du CDN Lovable, le déploiement Vercel restera autonome.

## Détails techniques

- `src/styles.css` : `--breakpoint-cta: 900px` → `1080px`.
- `src/components/SiteHeader.tsx` : import des deux logos, rendu conditionnel `block dark:hidden` / `hidden dark:block`, avec `alt` sur une seule instance.
- Copie des deux PNG uploadés dans `src/assets/` (fichiers binaires réels, pas de `lovable-assets`).
- `src/data/localBusiness.ts` : objet de données structurées ; injection via `head().scripts` (JSON-LD) dans `src/routes/__root.tsx`.
- Chaque route conserve son `head()` (title/description/og) du projet source.

## 5. Suppression des mentions Planity

La réservation continue de passer par Planity : le lien `site.booking` reste actif et pointe vers Planity. Seule la mention explicite disparaît — aucun texte visible, libellé, `aria-label` ou infobulle ne nomme « Planity ». Les boutons gardent « Réserver » / « Réserver un soin », leur style et leur comportement (nouvel onglet, `rel="noopener noreferrer"`).

Note : l'URL actuelle est la racine `https://www.planity.com/`, pas la fiche du centre. Envoie-moi l'URL exacte de la page Planity de Reboot Dole et je la branche.

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

## 7. Blog + Decap CMS (inclus dans cette livraison)

Le blog est livré complet, prêt pour Decap via GitHub :

**Navigation et design**
- entrée « Blog » dans le menu principal et dans le footer (d'où le breakpoint 1080 px) ;
- page liste `/blog` : en-tête éditorial, grille de cartes (image, date, temps de lecture, titre, chapô), filtres par catégorie, dans la charte existante (typographies Cormorant/Manrope, doré, marine) ;
- page article `/blog/$slug` : bandeau image, titre, méta (date, auteur, temps de lecture), corps d'article typographié (titres, listes, citations, images, liens), bloc CTA de réservation en fin d'article, suggestions d'articles liés ;
- deux articles d'exemple pour valider tous les styles de contenu.

**Contenu et build**
- articles en Markdown + frontmatter dans `content/blog/*.md`, chargés au build (import glob Vite) : aucune requête au runtime, 100 % statique, compatible Vercel ;
- frontmatter : `title`, `slug`, `date`, `excerpt`, `author`, `category`, `coverImage`, `draft` (les brouillons ne sont ni listés ni indexés) ;
- images d'article dans `public/uploads/`, fichiers réels, jamais de CDN.

**Prêt pour Decap sur GitHub**
- `public/admin/index.html` et `public/admin/config.yml` fournis, backend `github` sur la branche `main`, collection `blog` mappée sur `content/blog` et `media_folder: public/uploads` ;
- champs Decap alignés un pour un sur le frontmatter, donc un article créé depuis Decap s'affiche sans retouche ;
- `/admin` exclu de l'indexation (`robots.txt` + `noindex`).

Il te restera uniquement, côté GitHub/Vercel, à brancher l'authentification Decap (OAuth GitHub ou GitHub Actions/proxy) — je documenterai les étapes dans le README.

**SEO du blog**
- `head()` par article : title, description, `og:*` avec l'image de couverture, canonical auto-référent, JSON-LD `Article` + `BreadcrumbList` ;
- articles ajoutés automatiquement au `sitemap.xml`.

## 8. README de maintenance complet

Le `README.md` est réécrit comme documentation de référence du site, pensée pour un travail direct sur GitHub :

- **Démarrage** : prérequis, installation, `dev` / `build` / `preview`, structure des dossiers commentée.
- **Stack** : TanStack Start + Vite + Tailwind v4, et ce qu'il ne faut pas casser (routing par fichiers, `routeTree.gen.ts` généré, pas de `tailwind.config.js`).
- **Design system** : où sont définis les tokens (`src/styles.css`), la palette doré/marine, les typographies, le breakpoint `cta` (1080 px), les classes utilitaires maison, la règle « pas de couleurs en dur ».
- **Contenu éditable sans code** : `src/data/site.ts` (NAP, horaires, réseaux, lien de réservation) et `src/data/soins.ts` (ajouter/modifier un soin, champs et slug), avec un exemple avant/après.
- **Images** : convention `src/assets` (importées) vs `public/uploads` (blog), formats, dimensions recommandées, pas de CDN.
- **Blog & Decap** : anatomie d'un fichier Markdown, tableau des champs de frontmatter, comment publier ou dépublier, et **les étapes restantes détaillées pour rendre Decap opérationnel** — création de l'OAuth App GitHub, variables à configurer, choix du proxy d'authentification, `config.yml` à ajuster (repo, branche), accès à `/admin`, et procédure de test de bout en bout.
- **SEO** : où vivent title/description/og par page, le LocalBusiness, le sitemap, le robots.txt, et la checklist à suivre en ajoutant une page.
- **Déploiement Vercel** : réglages du projet, commande de build, dossier de sortie, domaine `reboot-dole.fr`, et le fait que chaque push sur `main` redéploie.
- **Dépannage** : erreurs fréquentes (route non générée, image manquante, article invisible car `draft: true`) et leur correctif.