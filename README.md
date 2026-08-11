# Reboot Dole — site vitrine

Site du centre de soins technico-esthétiques et de longévité **Reboot** à Dole (Jura).

## Stack

| Élément | Choix |
| --- | --- |
| Framework | TanStack Start (React 19, SSR) |
| Build | Vite 7 |
| Styles | Tailwind CSS v4 (`src/styles.css`, tokens `@theme`) |
| Icônes | lucide-react |
| Markdown | `marked` (blog, rendu au build) |

```bash
npm install
npm run dev     # http://localhost:8080
npm run build   # build de production
```

## Arborescence

```text
content/blog/         Articles Markdown (source du blog)
public/               Fichiers statiques : favicon, robots.txt, uploads, admin Decap
src/assets/           Images importées en ESM (bundlées, hashées) — pas de CDN
src/components/       Header, footer, kit UI, wordmark, thème
src/data/             site.ts (NAP, réseaux), localBusiness.ts (JSON-LD), soins, bien-être
src/lib/blog.ts       Chargement + parsing des articles
src/routes/           Une page = un fichier (routing par fichier)
src/styles.css        Design system : couleurs, typo, breakpoints, utilitaires
```

## Design system

- Palette marine + or sur sable, définie en tokens oklch dans `src/styles.css`.
  **Ne jamais coder une couleur en dur** dans un composant (`text-white`,
  `bg-[#...]`) : utiliser les classes sémantiques (`text-foreground`, `bg-surface`,
  `text-gold`…), sinon le thème sombre casse.
- Typographies : Manrope (texte) et Cormorant Garamond (titres), chargées via
  Google Fonts dans `src/routes/__root.tsx`.
- Breakpoint personnalisé `--breakpoint-cta` (**1080 px**) : en dessous, menu
  burger + barre CTA mobile ; au-dessus, navigation horizontale. Utilisé via les
  classes `cta:` (`cta:hidden`, `cta:flex`). Le relever suffit à retarder la
  bascule si de nouvelles entrées de menu sont ajoutées.
- Utilitaires maison : `label-caps`, `hairline`, `glow-warm`, `rise-in`,
  `prose-reboot` (mise en forme des articles).

### Logo

`src/components/BrandWordmark.tsx` affiche deux fichiers :

- `src/assets/reboot-logo-light.png` — wordmark marine, **thème clair**
- `src/assets/reboot-logo-dark.png` — wordmark blanc, **thème sombre**

Les deux `<img>` sont rendus, l'un masqué par le variant `dark:` — pas de
clignotement au changement de thème. La version décorative porte `alt=""` pour
éviter la double annonce par les lecteurs d'écran.

Le favicon (`public/favicon.png`) est dérivé du médaillon rond et déclaré dans
`src/routes/__root.tsx`.

## Contenu éditable

| Quoi | Où |
| --- | --- |
| Adresse, téléphone, e-mail, réseaux, fourchette de prix, URL de réservation | `src/data/site.ts` |
| Entrées du menu (header + footer) | `navLinks` dans `src/data/site.ts` |
| Horaires | `openingHours` dans `src/data/site.ts` |
| Fiches soins | `src/data/soins.ts` |
| Offre bien-être | `src/data/bienEtre.ts` |
| Données structurées du centre | `src/data/localBusiness.ts` |

La réservation de créneaux passe par la plateforme externe configurée dans
`site.booking`. Les libellés de boutons restent génériques (« Réserver un
soin ») et ne nomment pas la plateforme.

## SEO

- Chaque route définit son `head()` : `title`, `description`, `og:*`,
  `twitter:card`, et `canonical` sur les pages feuilles.
- **LocalBusiness** : `src/data/localBusiness.ts` génère un JSON-LD
  `HealthAndBeautyBusiness` (adresse, coordonnées GPS 47.090721 / 5.489599,
  horaires, `priceRange`, `sameAs`, `ReserveAction`) injecté sur toutes les
  pages depuis `src/routes/__root.tsx`. Il se met à jour automatiquement quand
  `src/data/site.ts` change.
- Les articles émettent en plus un JSON-LD `BlogPosting`.
- `sitemap.xml` est généré dynamiquement par `src/routes/sitemap[.]xml.ts`
  (pages statiques + un `<url>` par article publié). Ajouter une nouvelle page
  fixe = ajouter son chemin dans `staticPaths`.
- `public/robots.txt` autorise tout sauf `/admin/` et déclare le sitemap.

## Blog & Decap CMS

Un article = un fichier Markdown dans `content/blog/`. Ils sont lus **au build**
par `import.meta.glob`, donc le site reste entièrement statique (aucun appel
réseau au runtime, compatible Vercel).

Frontmatter attendu :

```yaml
---
title: "Titre de l'article"
slug: "titre-de-l-article"      # sert d'URL : /blog/<slug>
date: "2025-02-18"              # AAAA-MM-JJ, sert au tri
author: "L'équipe Reboot"
category: "Soins"               # Soins | Bien-être | Actualités
excerpt: "Résumé affiché en liste et en meta description."
coverImage: "/uploads/mon-image.jpg"
coverAlt: "Description de l'image"
draft: false                    # true = invisible sur le site
---
```

Images d'articles : les déposer dans `public/uploads/` et les référencer en
`/uploads/...` (les visuels du site, eux, restent dans `src/assets`).

### Étapes restantes pour rendre le CMS opérationnel

1. **Déployer le site sur Vercel** et brancher le domaine `reboot-dole.fr`.
2. **Créer une OAuth App GitHub**
   (Settings > Developer settings > OAuth Apps) avec pour callback l'URL du
   service d'authentification (étape 3).
3. **Déployer un service OAuth** pour Decap (par ex.
   `vencax/netlify-cms-github-oauth-provider` sur Vercel), en lui fournissant
   `OAUTH_CLIENT_ID` et `OAUTH_CLIENT_SECRET`.
4. **Renseigner `base_url`** dans `public/admin/config.yml` avec l'URL de ce
   service (`auth_endpoint: api/auth` est déjà configuré).
5. Vérifier `backend.repo` et `backend.branch` dans le même fichier.
6. Se connecter sur `https://reboot-dole.fr/admin/`. Chaque publication crée un
   commit dans `content/blog/`, ce qui déclenche un redéploiement Vercel.

Tant que l'étape 4 n'est pas faite, les articles s'éditent directement sur
GitHub dans `content/blog/` — le rendu est identique.

## Accessibilité

Points déjà en place, à préserver lors des évolutions : lien d'évitement vers le
contenu, `lang="fr"`, un seul `<h1>` par page, `aria-label` / `aria-expanded`
sur le menu burger, cibles tactiles ≥ 44 px, anneaux de focus visibles
(`focus-visible:ring`), images décoratives en `alt=""`, `iframe` de carte
titrée. Contrôler le contraste après toute modification des tokens de couleur.

## Sécurité

Site statique sans backend ni base de données : pas de secret dans le dépôt.
Tous les liens externes utilisent `rel="noreferrer noopener"`.

## Déploiement Vercel

- Build : `npm run build`
- Toutes les images sont locales (`src/assets` bundlé par Vite, ou `public/`) :
  aucune dépendance à un CDN externe.
- Un push sur `main` déclenche le déploiement.
