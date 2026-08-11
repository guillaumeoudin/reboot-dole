# Reboot Dole — reprise du site + correctif header

## Point de départ

Le projet qui publie `reboot-dole-v3.lovable.app` n'est pas accessible depuis cet espace de travail (ni par l'ID `a79ff133-…`, ni par le nom « Reboot Studio Refresh » ; seul « Reboot Wellness Hub » l'est, mais c'est une version plus ancienne et différente). Je reconstruis donc le site à partir du site publié : HTML rendu, CSS compilé et images de chaque page, ce qui permet une reprise fidèle au pixel des structures, tokens et contenus.

Ce qui a été relevé sur le site publié :
- Header : `<header class="sticky top-0 …">` avec un breakpoint personnalisé `cta`, défini dans le CSS à `@media (width>=702px)`. C'est bien la cause du problème : dès 702px le header desktop (nav + bouton « Réserver ») s'affiche et entre en conflit avec le logo.
- Sous le breakpoint `cta` : burger, barre collante en bas d'écran avec deux boutons « Réserver » et « WhatsApp » (`flex-1 basis-0`, donc de largeur égale et indépendante du texte).
- Au-dessus : bouton flottant en bas à droite « Discuter sur WhatsApp ».
- Pages : `/`, `/soins`, `/soins/epilation-laser`, `/soins/cryolipolyse`, `/soins/peeling`, `/soins/microneedling`, `/bien-etre`, `/concept`, `/contact`. Bascule thème clair/sombre dans le header.

## Étapes

### 1. Reconstruction du site
- Récupérer le HTML rendu, le CSS compilé et les images de chacune des 9 pages.
- Recréer le design system dans `src/styles.css` : tokens (navy, gold, gold-cta, cream…), typographies chargées via `<link>` dans `src/routes/__root.tsx`, utilitaires (`label-caps`, `hairline`), variante `dark`, et le breakpoint personnalisé `cta`.
- Recréer les routes TanStack correspondantes, plus la route dynamique `/soins/$slug` alimentée par un fichier de données `src/data/soins.ts` (titres, prix, contenus repris du site).
- Recréer les composants partagés : `SiteHeader` (logo, nav, bascule de thème, bouton Réserver, burger + panneau mobile), `SiteFooter`, barre collante mobile, bouton WhatsApp flottant.
- Réintégrer les images (logo, visuels de soins, photos du centre) dans `src/assets`.
- Métadonnées `head()` propres et uniques par page (titre, description, og/twitter), reprises du site.

### 2. Correctif header (la modification demandée)
- Passer le breakpoint `cta` de **702px à 900px**. Le menu burger et la barre collante mobile restent donc actifs jusqu'à 899px, et le header desktop n'apparaît qu'à partir de 900px, sans conflit avec le logo.
- Vérification aux largeurs 700 / 750 / 850 / 899 / 900 / 1024px par captures d'écran.

### 3. Libellé du bouton WhatsApp
Le bouton de la barre mobile est en `flex-1 basis-0` : il occupe la moitié de la barre quel que soit le texte, donc la largeur ne bougera pas.

Libellé retenu : **« Une question ? »**, icône WhatsApp conservée à gauche (l'icône porte le canal, le texte porte l'intention). `aria-label` et `title` maintenus à « Discuter sur WhatsApp » pour l'accessibilité.

### 4. Fidélité de la reconstruction
Le code source d'origine n'est pas accessible, mais le site publié expose tout ce qui est nécessaire : HTML rendu (SSR complet, donc textes et structure intégraux), CSS compilé (tous les tokens, breakpoints et utilitaires), et images. La reprise visuelle est donc fidèle, structure et style à l'identique.

Les seuls points à re-vérifier manuellement, car non lisibles directement dans le HTML : les états interactifs (panneau du burger ouvert, hover, bascule de thème, animations au scroll) et les pages annexes rendues dans un état particulier. Je les recompose depuis les classes présentes dans le CSS puis je compare par captures d'écran page par page avec le site d'origine, et je signale tout écart résiduel plutôt que de l'ignorer.


## Détails techniques

- Stack conservée : TanStack Start + Tailwind v4, tokens dans `src/styles.css` (pas de `tailwind.config.js`).
- Breakpoint personnalisé déclaré via `@theme { --breakpoint-cta: 900px; }` pour générer les variantes `cta:*`.
- Aucun backend requis : le site est statique (liens Planity, WhatsApp, tel, mail).
- Contenus et images repris du site publié ; si un asset s'avère non téléchargeable, je le signale plutôt que de le remplacer silencieusement.
