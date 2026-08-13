# Reboot Dole — site vitrine

Site officiel du centre Reboot à Dole. Ce document explique comment maintenir et faire évoluer le site en toute autonomie.

---

## Avant de commencer — Workflow local

Si tu veux modifier les fichiers directement sur ton poste (plutôt que via l'interface GitHub en ligne), voici le workflow complet.

**Cloner le dépôt (une seule fois)**

```bash
git clone https://github.com/guillaumeoudin/reboot-dole.git
cd reboot-dole
```

**Publier les modifications**

```bash
git add .                                 # prépare tous les fichiers modifiés
# ou : git add src/data/soins.ts         # pour ne sélectionner qu'un fichier précis

git commit -m "description de la modification"  # enregistre localement avec un message
# exemple : "feat: mise à jour tarif épilation laser"
# exemple : "fix: correction FAQ cryolipolyse ventre"

git push origin main                      # envoie sur GitHub → Vercel déploie automatiquement
```

**Prévisualiser les modifications avant de publier (optionnel)**

Si tu veux voir le résultat dans le navigateur avant de pousser sur GitHub, tu peux lancer le site en local. Cela nécessite d'installer les dépendances une première fois :

```bash
npm install          # une seule fois après le clone
npm run dev          # démarre le serveur → http://localhost:8080
```

Les modifications sont alors visibles en temps réel dans le navigateur dès que tu sauvegardes un fichier. Pour la plupart des modifications textuelles, ce n'est pas indispensable — tu peux éditer, pousser, et vérifier directement sur le site en ligne 30 secondes plus tard.

> **Alternative :** tu peux aussi modifier les fichiers directement sur GitHub (interface web). La commande `git push` est remplacée par le bouton "Commit changes". Pas besoin de cloner quoi que ce soit.

---

## Sommaire

1. [Comment fonctionne le site](#1-comment-fonctionne-le-site)
2. [Mettre à jour les informations du centre](#2-mettre-à-jour-les-informations-du-centre)
3. [Inventaire complet des pages](#3-inventaire-complet-des-pages)
4. [Soins & landing pages SEO](#4-soins--landing-pages-seo)
5. [Blog — Decap CMS](#5-blog--decap-cms)
6. [Ajouter ou remplacer une image](#6-ajouter-ou-remplacer-une-image)
7. [Comment les modifications arrivent en ligne](#7-comment-les-modifications-arrivent-en-ligne)
8. [Ce qu'il ne faut pas toucher](#8-ce-quil-ne-faut-pas-toucher)
9. [Quand faire appel à Guillaume](#9-quand-faire-appel-à-guillaume)
10. [Stack technique](#10-stack-technique)
- [Annexe — Comprendre la stack technique](#annexe--comprendre-la-stack-technique)

---

## 1. Comment fonctionne le site

Le site est composé de deux parties distinctes selon le type de contenu :

| Contenu | Où c'est géré | Owner |
|---|---|---|
| Articles de blog | Decap CMS (interface web) | Aline |
| Tout le reste (textes, soins, pages, tarifs…) | Fichiers du code source (GitHub) | Guillaume |

**Decap CMS** est accessible à l'adresse **[reboot-dole.fr/admin](https://reboot-dole.fr/admin)**. C'est une interface d'édition visuelle — elle fonctionne comme un éditeur de texte en ligne.

**Le reste du site** est géré dans des fichiers de code hébergés sur GitHub. Ces fichiers sont modifiables, mais il faut savoir où regarder et ne pas toucher à la structure du code. Ce document explique exactement quels fichiers modifier selon le besoin.

### Ce qui se passe quand tu modifies un fichier

```
Modification du fichier → enregistrement sur GitHub → Vercel détecte le changement
→ build automatique (~30 secondes) → site mis à jour en ligne
```

Il n'y a rien à faire manuellement pour mettre le site en ligne : la publication est automatique dès qu'un fichier est modifié sur la branche `main` du dépôt GitHub.

---

## 2. Mettre à jour les informations du centre

**Fichier :** `src/data/site.ts`

C'est **la source unique** pour toutes les informations de contact et de présence du centre. Modifier ce fichier met à jour automatiquement le header, le footer, la page Contact, les données structurées Google et le sitemap.

```
src/
└── data/
    └── site.ts   ← modifier ici
```

### Ce que contient ce fichier

```ts
export const site = {
  name: "Reboot Dole",
  phone: "06 77 59 24 50",         ← numéro de téléphone affiché
  phoneHref: "tel:+33677592450",   ← même numéro au format lien (format international, sans 0 initial)
  email: "contact@reboot-dole.fr", ← adresse email
  booking: "https://www.planity.com/...", ← lien de réservation Planity
  address: [...],                  ← adresse postale
  social: {
    instagram: "https://...",      ← lien Instagram
    linkedin: "https://...",       ← lien LinkedIn
  },
}

export const openingHours = [
  { day: "Lundi — Vendredi", value: "9h — 19h", ... },
  { day: "Samedi", value: "9h — 17h", ... },
  { day: "Dimanche", value: "Fermé", ... },
]
```

### Exemples de modifications courantes

**Changer le numéro de téléphone :**
Modifier à la fois `phone` (affiché) et `phoneHref` (lien cliquable).
`phoneHref` doit être au format `tel:+33XXXXXXXXX` (remplacer le 0 initial par +33).

**Changer le lien de réservation Planity :**
Copier le lien depuis ton espace Planity et remplacer la valeur de `booking`.

**Changer les horaires :**
Modifier les valeurs dans `openingHours`. Ne pas changer les noms des jours en anglais (`Monday`, `Tuesday`…) — ils servent aux données structurées Google.

---

## 3. Inventaire complet des pages

Toutes les pages du site, où se trouvent leurs contenus, et comment les modifier :

| URL | Page | Fichier à modifier | Comment modifier |
|---|---|---|---|
| `/` | Accueil | `src/routes/index.tsx` | Dans le fichier |
| `/soins` | Liste des soins | `src/routes/soins.index.tsx` | Dans le fichier |
| `/soins/epilation-laser` | Épilation laser | `src/data/soins.ts` → entrée `epilation-laser` | Via `soins.ts` |
| `/soins/cryolipolyse` | Cryolipolyse | `src/data/soins.ts` → entrée `cryolipolyse` | Via `soins.ts` |
| `/soins/peeling` | Peeling | `src/data/soins.ts` → entrée `peeling` | Via `soins.ts` |
| `/soins/microneedling` | Microneedling | `src/data/soins.ts` → entrée `microneedling` | Via `soins.ts` |
| `/bien-etre` | Bien-être & Yoga | `src/routes/bien-etre.tsx` | Dans le fichier |
| `/concept` | Le concept | `src/routes/concept.tsx` | Dans le fichier |
| `/blog` | Blog (liste articles) | `src/routes/blog.index.tsx` | Dans le fichier |
| `/blog/[slug]` | Articles de blog | `content/blog/[nom-article].md` | Via Decap CMS |
| `/contact` | Contact | `src/routes/contact.tsx` | Dans le fichier |
| `/mentions-legales` | Mentions légales | `src/routes/mentions-legales.tsx` | Dans le fichier |
| `/politique-de-confidentialite` | Politique de conf. | `src/routes/politique-de-confidentialite.tsx` | Dans le fichier |
| `/yoga-dole` | Landing SEO — Yoga | `src/routes/yoga-dole.tsx` | Dans le fichier |
| `/epilation-laser-jambes-dole` | Landing SEO — Jambes | `src/routes/epilation-laser-jambes-dole.tsx` | Dans le fichier |
| `/epilation-laser-maillot-dole` | Landing SEO — Maillot | `src/routes/epilation-laser-maillot-dole.tsx` | Dans le fichier |
| `/cryolipolyse-ventre-dole` | Landing SEO — Ventre | `src/routes/cryolipolyse-ventre-dole.tsx` | Dans le fichier |

**Trois approches d'édition selon la page :**

- **Dans le fichier** — le texte est directement dans le fichier `.tsx`. Ouvrir le fichier, modifier le texte entre guillemets (`"..."`) ou entre balises (`>texte ici<`). Ne jamais modifier les noms de propriétés, les accolades `{}`, la structure du code.
- **Via `soins.ts`** — toutes les pages soins partagent un même gabarit de mise en page. Leur contenu (textes, tarifs, FAQ…) est stocké dans `src/data/soins.ts` et injecté automatiquement. Il n'y a qu'un fichier à modifier pour mettre à jour une page soin. → Voir section 4 pour le détail.
- **Via Decap CMS** — les articles de blog sont gérés via l'interface admin `/admin`. → Voir section 5 pour le détail.

### Modifier le titre et la description SEO d'une page

En haut de chaque fichier de page, il y a deux lignes à modifier pour le référencement :

```tsx
const title = "Titre affiché dans Google et dans l'onglet du navigateur";
const description = "Phrase de 150 caractères max affichée sous le titre dans Google.";
```

---

## 4. Soins & landing pages SEO

Cette section regroupe les pages soins et les landing pages dédiées au SEO, car leur logique est identique : ce sont des pages conçues pour être trouvées sur Google sur des requêtes précises.

### Ce que Google regarde sur ces pages

Chaque page soin et chaque landing page est optimisée avec plusieurs éléments techniques invisibles pour les visiteurs, mais déterminants pour le référencement :

#### Le titre et la description Google (`metaTitle` / `metaDescription`)

C'est ce qui s'affiche dans les résultats de recherche Google — le titre en bleu et la phrase en dessous. Ils sont définis dans chaque fichier de page :

```ts
metaTitle: "Épilation laser à Dole — Reboot"
metaDescription: "Épilation laser définitive à Dole (Jura) : toutes zones, tous phototypes..."
```

> **À retenir :** la `metaDescription` ne doit pas dépasser **160 caractères**. Si elle est trop longue, Google la coupe et choisit lui-même un extrait — souvent moins pertinent.

#### Les FAQ (questions / réponses)

Chaque page soin affiche une section "Questions fréquentes" avec 5 questions-réponses. Ce n'est pas du contenu décoratif : **Google peut afficher ces questions directement dans ses résultats** sous forme d'encadrés "People also ask" (PAA), ce qui donne une visibilité supplémentaire sans clic.

Pour que Google les prenne en compte, les FAQ sont également encodées dans les données structurées de la page (voir plus bas). Maintenir des FAQ pertinentes et bien formulées est l'un des leviers SEO les plus efficaces pour un centre comme Reboot.

#### Le paragraphe SEO (`seoContent`)

En bas de chaque page soin, un paragraphe long est affiché. Son rôle : **multiplier les occurrences de mots-clés** (nom du soin, zones traitées, "à Dole", "Jura", adresse…) pour que Google comprenne précisément ce que propose la page. Ce texte est lisible et utile, mais il est délibérément plus dense en mots-clés que les paragraphes principaux.

#### Les données structurées (JSON-LD)

Invisibles pour les visiteurs, ces données sont des informations supplémentaires encodées dans le code de la page et lues directement par Google. Elles lui indiquent : "cette page décrit un service (épilation laser), proposé par Reboot Dole (adresse, téléphone, horaires), avec ces questions-réponses associées." Cela améliore la compréhension de la page par Google et peut générer des **rich snippets** (résultats enrichis avec étoiles, FAQ, etc.).

---

### Les pages soins

**Fichier :** `src/data/soins.ts`

Toutes les informations sur les soins (épilation laser, cryolipolyse, peeling, microneedling) sont centralisées dans ce fichier. Modifier ici met à jour automatiquement la page liste des soins ET la page détail de chaque soin — les données structurées JSON-LD (FAQ, prix, description pour Google) sont **générées automatiquement** à partir de ce fichier. Tu n'as qu'un seul endroit à modifier.

### Modifier le contenu d'un soin

Repérer le soin concerné dans `src/data/soins.ts` et modifier les champs voulus :

```ts
{
  title: "Épilation laser",                ← nom du soin
  tagline: "Une peau nette, durablement.", ← accroche courte
  short: "...",                            ← description courte (carte "Autres soins")
  long: "...",                             ← description principale affichée sur la page
  seoContent: "...",                       ← paragraphe long SEO (voir explication ci-dessus)
  duration: "15 à 60 min selon la zone",
  sessions: "8 à 10 séances espacées de 4 à 8 semaines",
  price: "à partir de 40 €",
  priceFrom: "40",                         ← même prix au format numérique (pour Google)
  metaTitle: "Épilation laser à Dole — Reboot",
  metaDescription: "...",                  ← 160 caractères max
  indications: [                           ← liste "Pour qui ?"
    "Toutes zones, corps et visage",
    ...
  ],
  aftercare: [                             ← liste "Les bons réflexes"
    "Pas d'exposition solaire 15 jours avant et après",
    ...
  ],
  faq: [                                   ← questions/réponses SEO (voir explication ci-dessus)
    { q: "Question ?", a: "Réponse." },
    ...
  ],
}
```

**Modifier un tarif :** modifier `price` et `priceFrom` (même valeur dans les deux champs, `priceFrom` en chiffre uniquement sans le symbole €).

**Modifier ou ajouter une FAQ :** dans le tableau `faq`, ajouter ou modifier une entrée en respectant le format :
```ts
{ q: "Votre nouvelle question ?", a: "La réponse complète." },
```
Ne pas oublier la virgule à la fin de chaque ligne.

---

### Les landing pages SEO zone-spécifiques

#### Contexte — pourquoi ces pages existent

En plus des pages soins principales, des pages dédiées ciblent des requêtes plus précises sur Google. Ces pages ne sont **pas accessibles depuis le menu de navigation** — elles sont découvertes uniquement via Google et le sitemap. L'idée : une personne qui tape "épilation laser jambes Dole" dans Google tombe sur une page qui parle exactement de ça, pas sur la page générale "Épilation laser" qui couvre toutes les zones.

Pages SEO actuelles :

| URL | Requête ciblée | Fichier |
|---|---|---|
| `/yoga-dole` | yoga Dole | `src/routes/yoga-dole.tsx` |
| `/epilation-laser-jambes-dole` | épilation laser jambes Dole | `src/routes/epilation-laser-jambes-dole.tsx` |
| `/epilation-laser-maillot-dole` | épilation laser maillot Dole | `src/routes/epilation-laser-maillot-dole.tsx` |
| `/cryolipolyse-ventre-dole` | cryolipolyse ventre Dole | `src/routes/cryolipolyse-ventre-dole.tsx` |

---

#### Structure d'un fichier landing page

Chaque landing page est un fichier `.tsx` dans `src/routes/`. Voici l'anatomie complète, avec chaque partie expliquée :

```ts
// ─────────────────────────────────────────────────────────────
// PARTIE 1 — CE QUI S'AFFICHE DANS GOOGLE
// ─────────────────────────────────────────────────────────────
const metaTitle = "Épilation laser des jambes à Dole — Reboot"
const metaDescription =
  "Épilation laser des jambes à Dole (Jura) : demi-jambes, jambes complètes..."
  // ↑ 160 caractères max. Affiché dans les résultats Google.

// ─────────────────────────────────────────────────────────────
// PARTIE 2 — DONNÉES STRUCTURÉES GOOGLE (JSON-LD)
// Lues par Google pour enrichir les résultats (rich snippets, FAQ, localisation).
// ⚠ Attention : les FAQ et le tarif ici sont une COPIE de la Partie 3 et de la Partie 4.
// Si tu modifies un tarif ou une question visible, tu dois le mettre à jour ici aussi.
// ─────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",      // fil d'ariane affiché par Google
      itemListElement: [
        { position: 1, name: "Accueil", item: "https://reboot-dole.fr" },
        { position: 2, name: "Épilation laser", item: "https://reboot-dole.fr/soins/epilation-laser" },
        { position: 3, name: "Épilation laser des jambes à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Épilation laser des jambes à Dole",  ← nom du service pour Google
      description: metaDescription,               ← reprend la metaDescription
      offers: {
        price: "60",         ← prix de base en chiffre, sans €
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          name: "Combien coûte l'épilation laser des jambes à Dole ?",  ← copie de la FAQ visible
          acceptedAnswer: { text: "À Reboot Dole..." },
        },
        // ... une entrée par question
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// PARTIE 3 — LES QUESTIONS / RÉPONSES (FAQ visible sur la page)
// ─────────────────────────────────────────────────────────────
const faq = [
  {
    q: "Combien coûte l'épilation laser des jambes à Dole ?",
    a: "À Reboot Dole, l'épilation laser des jambes complètes débute à partir de 60 €...",
  },
  // ... jusqu'à 5 questions
]

// ─────────────────────────────────────────────────────────────
// PARTIE 4 — CONTENU VISIBLE DE LA PAGE
// ─────────────────────────────────────────────────────────────
<SeoLandingPage
  title="Épilation laser des jambes à Dole"
  // ↑ Titre H1 affiché en grand. Doit contenir les mots-clés ("jambes", "Dole").

  tagline="Finies les rasages, les irritations, les poils incarnés."
  // ↑ Accroche courte sous le titre.

  description="Demi-jambes, jambes complètes, genoux, cuisses : le centre Reboot à Dole..."
  // ↑ Paragraphe d'intro. Mentionner "Dole" et le soin naturellement.

  specs={{
    duration: "45 à 60 min (jambes complètes)",
    sessions: "8 à 10 séances espacées de 4 à 8 sem.",
    price: "à partir de 60 €",    ← texte affiché dans l'encadré Durée/Séances/Tarif
  }}

  faq={faq}           // ← relie la liste de FAQ de la Partie 3

  parentHref="/soins/epilation-laser"   // ← lien de retour vers la page soin principale
  parentLabel="Épilation laser"
/>
```

---

#### Modifier le contenu d'une landing page

| Ce que tu veux changer | Où le trouver dans le fichier |
|---|---|
| Titre dans Google | `const metaTitle = "..."` en haut |
| Description dans Google | `const metaDescription = "..."` (160 car. max) |
| Titre H1 de la page | `title="..."` dans `<SeoLandingPage` |
| Accroche sous le titre | `tagline="..."` |
| Paragraphe d'intro | `description="..."` |
| Durée / Séances / Tarif affiché | `specs={{ duration: ..., sessions: ..., price: ... }}` |
| Une question FAQ (visible) | Dans `const faq = [...]`, modifier `{ q: "...", a: "..." }` |

**⚠ Si tu modifies un tarif ou une FAQ visible, pense à mettre à jour également :**
- Le prix dans `jsonLd` → `offers: { price: "XX" }` (chiffre seul, sans le symbole €)
- La question correspondante dans `jsonLd` → tableau `mainEntity`

---

#### Ajouter une nouvelle landing page SEO

Tu peux créer une nouvelle landing page en autonomie en suivant ces étapes. Exemple : créer une page pour "épilation laser aisselles Dole".

**Étape 1 — Copier un fichier existant**

Dans `src/routes/`, copier `epilation-laser-jambes-dole.tsx` et renommer la copie :
```
epilation-laser-aisselles-dole.tsx
```
La convention de nommage : mots-clés-ciblés-en-minuscules-séparés-par-des-tirets.

**Étape 2 — Mettre à jour la déclaration de route**

Chercher la ligne qui commence par `createFileRoute(` et mettre à jour le chemin :
```ts
// Avant
export const Route = createFileRoute("/epilation-laser-jambes-dole")({ ... })

// Après
export const Route = createFileRoute("/epilation-laser-aisselles-dole")({ ... })
```

**Étape 3 — Mettre à jour `PAGE_URL`**

```ts
const PAGE_URL = `${site.url}/epilation-laser-aisselles-dole`;
```

**Étape 4 — Mettre à jour tout le contenu**

Modifier les quatre parties du fichier (voir structure ci-dessus) :
- `metaTitle`, `metaDescription`
- Le bloc `jsonLd` en entier (nom du service, fil d'ariane, prix, FAQ)
- Le tableau `faq`
- Les props du composant `<SeoLandingPage>` (title, tagline, description, specs, parentHref, parentLabel)

**Étape 5 — Ajouter l'URL au sitemap**

Dans `src/routes/sitemap[.]xml.ts`, ajouter la nouvelle URL dans le tableau `staticPaths` :
```ts
const staticPaths = [
  "/",
  "/soins",
  // ... pages existantes ...
  "/epilation-laser-aisselles-dole",   ← ajouter ici
];
```

**Étape 6 — Committer et pousser sur GitHub**

La page est en ligne en moins de 2 minutes. Le fichier `src/routeTree.gen.ts` (registre des pages) est **auto-régénéré par Vercel à chaque build** — tu n'as pas à le modifier.

> **Note :** localement, si tu fais tourner le site en développement avec `npm run dev`, `routeTree.gen.ts` est également régénéré automatiquement dès que tu crées un nouveau fichier dans `src/routes/`.

---

#### Modifier les données structurées (SEO technique)

Les données structurées — le bloc `jsonLd` dans chaque fichier de landing page — sont ce que Google lit pour comprendre et enrichir tes pages dans ses résultats. Cette section explique ce que chaque partie contrôle et comment la mettre à jour.

> **Rappel :** pour les pages soins (`src/data/soins.ts`), les données structurées sont **générées automatiquement**. Les instructions ci-dessous concernent uniquement les fichiers landing page dans `src/routes/`.

**Ce que contrôle chaque partie du `jsonLd` :**

| Partie | Ce que Google en fait |
|---|---|
| `BreadcrumbList` | Fil d'ariane affiché sous le titre dans les résultats (Accueil > Épilation laser > Jambes) |
| `Service` | Reconnaît la page comme une offre de service locale — utile pour Google Maps et les résultats enrichis |
| `Service.offers.price` | Prix de base affiché dans certains résultats enrichis |
| `FAQPage.mainEntity` | Questions affichées dans les blocs "People also ask" de Google |

**Mettre à jour le tarif dans le JSON-LD :**

Le prix dans `jsonLd` est un chiffre brut (sans le symbole €). Si tu modifies le tarif affiché sur la page (`specs.price`), répercute aussi ici :

```ts
offers: {
  "@type": "Offer",
  price: "65",          ← chiffre seul, sans € ni "à partir de"
  priceCurrency: "EUR",
  availability: "https://schema.org/InStock",
},
```

**Mettre à jour une question FAQ dans le JSON-LD :**

Dans le bloc `FAQPage`, chaque question a cette structure :

```ts
{
  "@type": "Question",
  name: "Combien coûte l'épilation laser des jambes à Dole ?",   ← la question
  acceptedAnswer: {
    "@type": "Answer",
    text: "À Reboot Dole, l'épilation laser des jambes complètes débute à partir de 60 €...",  ← la réponse
  },
},
```

Modifier `name` et `text` pour les aligner avec la question correspondante dans `const faq = [...]`.

**Ajouter ou supprimer une question dans le JSON-LD :**

Les questions dans `jsonLd.mainEntity` et dans `const faq` doivent rester synchronisées — même nombre, même ordre. Si tu ajoutes une question dans `faq`, ajoute le bloc `{ "@type": "Question", name: ..., acceptedAnswer: ... }` correspondant dans `mainEntity`, et vice-versa.

**Mettre à jour le fil d'ariane (`BreadcrumbList`) :**

Le fil d'ariane reflète la hiérarchie de la page dans le site. Il est en général correct et n'a pas besoin d'être modifié, sauf si la page parent change. Format :

```ts
{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://reboot-dole.fr" },
{ "@type": "ListItem", position: 2, name: "Épilation laser", item: "https://reboot-dole.fr/soins/epilation-laser" },
{ "@type": "ListItem", position: 3, name: "Épilation laser des jambes à Dole", item: PAGE_URL },
```

---

## 5. Blog — Decap CMS

### Accéder à l'interface d'administration

URL : **[https://reboot-dole.fr/admin](https://reboot-dole.fr/admin)**

La connexion se fait via **GitHub**. Tu as besoin d'un compte GitHub ayant accès au dépôt `guillaumeoudin/reboot-dole`. Si ce n'est pas encore le cas, demander à Guillaume de t'ajouter comme collaboratrice.

### Publier un nouvel article

1. Aller sur [reboot-dole.fr/admin](https://reboot-dole.fr/admin)
2. Cliquer sur **"Articles de blog"** dans le menu de gauche
3. Cliquer sur **"Nouvel article de blog"**
4. Remplir les champs (voir détail ci-dessous)
5. Cliquer sur **"Publier"** en haut à droite — ou **"Enregistrer"** pour garder en brouillon

### Description des champs

| Champ | Description | Important |
|---|---|---|
| **Titre** | Titre de l'article, affiché en grand sur la page | — |
| **Slug (URL)** | Adresse de la page, ex : `epilation-laser-conseils` | Lettres minuscules, chiffres et tirets uniquement. **Ne jamais modifier après publication.** |
| **Date** | Date de publication affichée | — |
| **Auteur** | Nom affiché en bas de l'article | — |
| **Catégorie** | Soins / Bien-être / Actualités | — |
| **Accroche (SEO)** | Phrase affichée dans Google sous le titre | **160 caractères maximum** — crucial pour le référencement |
| **Image de couverture** | Photo en haut de l'article | Formats acceptés : JPG, PNG, WebP |
| **Texte alternatif de l'image** | Description de la photo pour les malvoyants et Google | Toujours remplir |
| **Brouillon** | Si activé, l'article n'est pas visible sur le site | Désactiver pour publier |
| **Contenu** | Corps de l'article | Voir ci-dessous |

### Rédiger le contenu (Markdown)

L'éditeur utilise le **Markdown**, un format de texte simple. L'essentiel :

```markdown
## Titre de section

### Sous-titre

Paragraphe normal.

**Texte en gras**   *Texte en italique*

- Élément de liste
- Autre élément

[Texte du lien](https://url-du-lien.fr)
```

L'éditeur dispose d'une barre d'outils avec des boutons pour mettre en forme sans connaître le Markdown.

> **Conseil SEO pour les articles de blog :** les articles de blog contribuent au référencement du site. Privilégier des titres d'articles formulés comme des questions ou des requêtes réelles ("Comment préparer une séance d'épilation laser ?", "Cryolipolyse ou sport : quelle différence ?"). Remplir toujours l'accroche SEO avec les mots-clés importants.

### Modifier un article existant

1. Aller sur [reboot-dole.fr/admin](https://reboot-dole.fr/admin)
2. Cliquer sur **"Articles de blog"**
3. Cliquer sur l'article à modifier
4. Faire les modifications
5. Cliquer sur **"Publier"**

### Points d'attention

- **Ne jamais modifier le slug d'un article déjà publié.** Cela crée une nouvelle URL et l'ancienne devient une page 404. Si un article a été partagé ou indexé par Google, le lien est cassé définitivement.
- **L'accroche SEO est limitée à 160 caractères.** Au-delà, Google la coupe dans les résultats.
- **Les images uploadées** sont stockées dans `public/uploads/`. Elles sont immédiatement disponibles dans tous les articles.
- **La publication est quasi instantanée** (30 secondes à 2 minutes) : Decap CMS enregistre l'article sur GitHub, ce qui déclenche automatiquement un build sur Vercel.

---

## 6. Ajouter ou remplacer une image

### Images des soins et du site (header, pages)

Les images sont stockées dans `src/assets/`. Pour remplacer une image :

1. Préparer la nouvelle image au même format (JPG recommandé) et aux dimensions proches
2. La nommer **exactement comme l'image qu'elle remplace** (ex : `soin-laser.jpg`)
3. Déposer le fichier dans `src/assets/` en remplacement de l'ancien

Les noms de fichiers existants à ne pas changer :

| Fichier | Utilisé sur |
|---|---|
| `soin-laser.jpg` | Page épilation laser |
| `soin-cryolipolyse.jpg` | Page cryolipolyse |
| `soin-peeling.jpg` | Page peeling |
| `soin-microneedling.jpg` | Page microneedling |
| `centre-reboot.jpg` | Accueil, page Concept |
| `bien-etre-yoga.jpg` | Page Bien-être, page Yoga |
| `reboot-logo-light.png` | Logo (fond sombre) |
| `reboot-logo-dark.png` | Logo (fond clair) |

### Images des articles de blog

Les images des articles s'uploadent directement depuis l'interface Decap CMS via le champ **"Image de couverture"**. Elles sont automatiquement stockées dans `public/uploads/`.

---

## 7. Comment les modifications arrivent en ligne

Toute modification enregistrée sur la branche `main` du dépôt GitHub déclenche automatiquement un déploiement sur Vercel.

**Via Decap CMS** (blog) : la publication est instantanée côté Decap — le build Vercel démarre dans la foulée et le site est mis à jour en 30 secondes à 2 minutes.

**Via GitHub directement** (code source) : même processus, dès que le fichier est `commit` sur `main`.

**Pour vérifier qu'un déploiement est terminé** : aller sur [vercel.com](https://vercel.com) → tableau de bord du projet `reboot-dole` → voir le statut du dernier déploiement.

---

## 8. Ce qu'il ne faut pas toucher

Les fichiers suivants sont critiques pour le fonctionnement du site. Ne pas les modifier sans valider avec moi:

| Fichier / Dossier | Rôle |
|---|---|
| `src/routeTree.gen.ts` | Registre de toutes les pages — **auto-généré par Vercel à chaque build**, ne pas modifier manuellement |
| `src/routes/__root.tsx` | Structure globale (header, footer, données structurées Google) |
| `src/lib/` | Logique de chargement du blog |
| `src/components/ui/` | Composants d'interface de base (boutons, accordéons…) |
| `vite.config.ts` | Configuration du build |
| `src/routes/api/` | Routes d'authentification Decap CMS |
| `src/routes/admin/` | Interface d'administration Decap CMS |
| `public/admin/` | Interface Decap CMS (HTML) |
| `package.json` | Dépendances du projet |

---

## 9. Quand faire appel à Guillaume

Les opérations suivantes sortent du périmètre de maintenance courante et nécessitent une intervention de développeur :

- **Modifier la navigation** (menu principal)
- **Changer le design** : couleurs, mise en page, typographie
- **Ajouter une fonctionnalité** : formulaire, intégration, widget
- **Intégrer l'assistant WhatsApp** (à venir)
- **Tout problème de build** : si le site ne se met pas à jour après une modification

---

## 10. Stack technique

| Élément | Choix |
|---|---|
| Framework | TanStack Start (React 19, SSR) |
| Build & bundler | Vite 8 |
| Styles | Tailwind CSS v4 |
| Composants UI | shadcn/ui (Radix) |
| Icônes | lucide-react |
| Blog (CMS) | Decap CMS (backend GitHub) |
| Markdown | `marked` (rendu au build) |
| Hébergement | Vercel (offre Hobby) |
| Domaine | `reboot-dole.fr` via Hostinger |
| Repo | [github.com/guillaumeoudin/reboot-dole](https://github.com/guillaumeoudin/reboot-dole) |

### Commandes de développement

```bash
npm install        # installer les dépendances
npm run dev        # serveur local → http://localhost:8080
npm run build      # build de production
npm run lint       # vérification du code
```

### Architecture des dossiers

```
content/blog/         Articles Markdown (source du blog, éditée via Decap CMS)
public/               Fichiers statiques : favicon, robots.txt, uploads blog, admin Decap
src/assets/           Images du site (bundlées par Vite, ne pas mettre dans public/)
src/components/       Composants : Header, Footer, SeoLandingPage, ui-kit, ui/
src/data/             Données centralisées : site.ts, soins.ts, localBusiness.ts
src/lib/              Logique blog (chargement des markdown)
src/routes/           Une page = un fichier (routing fichier TanStack)
src/routeTree.gen.ts  Registre auto-généré des routes (ne pas modifier manuellement)
src/styles.css        Design system : tokens couleur, typographie, utilitaires
```

---

## Annexe — Comprendre la stack technique

Cette section explique ce que fait chaque brique technologique, en langage clair. Tu n'as pas besoin de la lire pour maintenir le site — elle sert à comprendre pourquoi les choses fonctionnent ainsi.

### GitHub

Le **dépôt Git** où est stocké tout le code source du site. Chaque modification est enregistrée sous forme d'un *commit* : une sauvegarde avec un message, une date et un auteur. Cela permet de voir l'historique de chaque fichier et de revenir en arrière si besoin. C'est aussi le déclencheur du déploiement : quand un commit arrive sur la branche `main`, Vercel le détecte automatiquement.

### Vercel

La **plateforme d'hébergement** qui sert le site aux visiteurs. À chaque push sur `main`, Vercel reconstruit le site (build) et le déploie en production. C'est Vercel qui gère aussi le certificat HTTPS (le cadenas dans l'URL), les performances et la disponibilité. L'offre Hobby est gratuite pour un usage comme celui du site Reboot.

### React

La **bibliothèque JavaScript** qui structure l'interface. React découpe l'interface en *composants* réutilisables — par exemple, le header est un composant utilisé sur toutes les pages, le bouton "Réserver" en est un autre. Chaque fichier `.tsx` dans `src/routes/` est un composant qui décrit une page.

### TanStack Start

Le **framework** qui encapsule React et ajoute le rendu côté serveur (SSR — *Server-Side Rendering*). Concrètement : quand Google visite une page, il reçoit le HTML complet et déjà rendu, pas une page vide que JavaScript doit remplir. C'est indispensable pour le SEO — les pages HTML statiques sont mieux indexées que les pages construites dynamiquement côté client. TanStack Start gère aussi le routage : un fichier dans `src/routes/` = une URL accessible sur le site.

### Vite

L'**outil de build** qui compile et optimise tout le code pour la production. Il transforme les fichiers TypeScript (`.tsx`) et les styles en fichiers HTML/JS/CSS que les navigateurs peuvent lire. Il gère aussi les images dans `src/assets/` (optimisation, hash de nommage pour le cache). En développement local, Vite sert le site sur `localhost:8080` avec rechargement automatique.

### TypeScript

Le **langage** utilisé pour écrire le code (les fichiers `.tsx` et `.ts`). C'est JavaScript avec un système de typage ajouté : chaque variable, propriété ou paramètre a un type défini (texte, nombre, tableau…), ce qui permet de détecter des erreurs avant même de lancer le site. L'extension `.tsx` indique que le fichier contient à la fois du TypeScript et du JSX (la syntaxe HTML-dans-le-code propre à React).

### Tailwind CSS

Le **système de styles** qui contrôle tout l'aspect visuel. Plutôt que d'écrire du CSS classique dans des fichiers séparés, Tailwind fournit des classes courtes à appliquer directement dans le code (`text-gold`, `py-16`, `border-border`…). Le fichier `src/styles.css` définit les tokens du design system de Reboot (couleurs, espacements, typographie) que Tailwind utilise ensuite.

### shadcn/ui

Une **bibliothèque de composants d'interface** prêts à l'emploi : boutons, accordéons, menus, modales… Ils sont construits sur Radix UI (qui garantit l'accessibilité) et stylisés avec Tailwind. Les accordéons FAQ visibles sur les pages soins et les landing pages viennent de là. Les composants sont dans `src/components/ui/`.

### Decap CMS

L'**interface d'administration** accessible à `/admin`. Decap CMS est un CMS *headless* (sans base de données) : il lit et écrit directement des fichiers Markdown dans `content/blog/` via l'API GitHub. Quand tu publies un article, Decap crée ou modifie un fichier `.md` sur le dépôt, ce qui déclenche un build Vercel automatique. Pas de serveur backend à gérer, pas de base de données — tout repose sur Git.
