# Reboot Dole — site vitrine

Site officiel du centre Reboot à Dole (Jura). Ce document explique comment maintenir et faire évoluer le site sans avoir à faire appel à un développeur pour les opérations courantes.

---

## Sommaire

1. [Comment fonctionne le site](#1-comment-fonctionne-le-site)
2. [Mettre à jour les informations du centre](#2-mettre-à-jour-les-informations-du-centre)
3. [Modifier le contenu des pages](#3-modifier-le-contenu-des-pages)
4. [Modifier les soins](#4-modifier-les-soins)
5. [Blog — Decap CMS](#5-blog--decap-cms)
6. [Landing pages SEO](#6-landing-pages-seo)
7. [Ajouter ou remplacer une image](#7-ajouter-ou-remplacer-une-image)
8. [Comment les modifications arrivent en ligne](#8-comment-les-modifications-arrivent-en-ligne)
9. [Ce qu'il ne faut pas toucher](#9-ce-quil-ne-faut-pas-toucher)
10. [Quand faire appel à Guillaume](#10-quand-faire-appel-à-guillaume)
11. [Stack technique](#11-stack-technique)

---

## 1. Comment fonctionne le site

Le site est composé de deux parties distinctes selon le type de contenu :

| Contenu | Où c'est géré | Qui peut le faire |
|---|---|---|
| Articles de blog | Decap CMS (interface web) | Aline, en autonomie |
| Tout le reste (textes, soins, pages, tarifs…) | Fichiers du code source (GitHub) | Guillaume |

**Decap CMS** est accessible à l'adresse **[reboot-dole.fr/admin](https://reboot-dole.fr/admin)**. C'est une interface d'édition visuelle qui ne nécessite aucune connaissance technique — elle fonctionne comme un éditeur de texte en ligne.

**Le reste du site** est géré dans des fichiers de code hébergés sur GitHub. Ces fichiers sont modifiables, mais nécessitent de savoir où regarder et de ne pas toucher à la structure du code. Ce document explique exactement quels fichiers modifier selon le besoin.

### Ce qui se passe quand on modifie un fichier

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
Copier le lien depuis votre espace Planity et remplacer la valeur de `booking`.

**Changer les horaires :**
Modifier les valeurs dans `openingHours`. Ne pas changer les noms des jours en anglais (`Monday`, `Tuesday`…) — ils servent aux données structurées Google.

---

## 3. Modifier le contenu des pages

Chaque page du site correspond à un fichier dans le dossier `src/routes/` :

| Page | Fichier |
|---|---|
| Accueil | `src/routes/index.tsx` |
| Soins (liste) | `src/routes/soins.index.tsx` |
| Bien-être | `src/routes/bien-etre.tsx` |
| Le concept | `src/routes/concept.tsx` |
| Blog | `src/routes/blog.index.tsx` |
| Contact | `src/routes/contact.tsx` |
| Mentions légales | `src/routes/mentions-legales.tsx` |
| Politique de confidentialité | `src/routes/politique-de-confidentialite.tsx` |

### Comment modifier un texte dans une page

Dans chaque fichier de page, les textes se trouvent soit dans des constantes en haut du fichier, soit directement dans le code HTML-like (JSX) entre les balises `>` et `<`.

**Exemple — changer le titre de la page Bien-être :**

```tsx
// Dans src/routes/bien-etre.tsx
// Chercher la ligne qui ressemble à :
title="La longévité commence de l'intérieur."
// Et modifier le texte entre guillemets
```

**Règle de base :** ne modifier que le texte entre guillemets (`"..."`) ou entre balises (`>texte ici<`). Ne jamais modifier les noms de propriétés, les accolades `{}`, les balises ou la structure.

### Modifier le titre et la description SEO d'une page

En haut de chaque fichier de page, il y a deux lignes à modifier pour le référencement :

```tsx
const title = "Titre affiché dans Google et dans l'onglet du navigateur";
const description = "Phrase de 150 caractères max affichée sous le titre dans Google.";
```

---

## 4. Modifier les soins

**Fichier :** `src/data/soins.ts`

Toutes les informations sur les 4 soins (épilation laser, cryolipolyse, peeling, microneedling) sont centralisées dans ce fichier. Modifier ici met à jour automatiquement la page liste des soins ET la page détail de chaque soin.

```
src/
└── data/
    └── soins.ts   ← modifier ici
```

### Structure d'un soin

Chaque soin contient les champs suivants :

```ts
{
  title: "Épilation laser",           ← nom du soin
  tagline: "Une peau nette, durablement.", ← accroche courte
  short: "...",                        ← description courte (carte "Autres soins")
  long: "...",                         ← description principale affichée sur la page
  seoContent: "...",                   ← paragraphe long SEO (affiché en bas de page)
  duration: "15 à 60 min selon la zone",
  sessions: "8 à 10 séances espacées de 4 à 8 semaines",
  price: "à partir de 40 €",
  metaTitle: "Épilation laser à Dole — Reboot",   ← titre Google
  metaDescription: "...",              ← description Google (160 car. max)
  indications: [                       ← liste "Pour qui ?"
    "Toutes zones, corps et visage",
    ...
  ],
  aftercare: [                         ← liste "Les bons réflexes"
    "Pas d'exposition solaire 15 jours avant et après",
    ...
  ],
  faq: [                               ← questions/réponses affichées en bas de page
    { q: "Question ?", a: "Réponse." },
    ...
  ],
}
```

### Modifier un tarif

Repérer le soin concerné (ils sont dans l'ordre : épilation laser, cryolipolyse, peeling, microneedling) et modifier la valeur de `price` et `priceFrom`.

### Ajouter une question FAQ à un soin

Dans le tableau `faq` du soin concerné, ajouter une ligne en respectant exactement le format :
```ts
{ q: "Votre nouvelle question ?", a: "La réponse complète." },
```
Ne pas oublier la virgule à la fin.

---

## 5. Blog — Decap CMS

### Accéder à l'interface d'administration

URL : **[https://reboot-dole.fr/admin](https://reboot-dole.fr/admin)**

La connexion se fait via **GitHub**. Vous avez besoin d'un compte GitHub ayant accès au dépôt `guillaumeoudin/reboot-dole`. Si ce n'est pas encore le cas, demander à Guillaume de vous ajouter comme collaboratrice.

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
| **Slug (URL)** | Adresse de la page, ex : `epilation-laser-conseils` | Utiliser uniquement des lettres minuscules, des chiffres et des tirets. **Ne jamais modifier un slug après publication** — ça casse le lien existant. |
| **Date** | Date de publication affichée | — |
| **Auteur** | Nom affiché en bas de l'article | — |
| **Catégorie** | Soins / Bien-être / Actualités | — |
| **Accroche (SEO)** | Phrase courte affichée dans Google sous le titre. **160 caractères maximum.** | Crucial pour le référencement |
| **Image de couverture** | Photo en haut de l'article | Formats acceptés : JPG, PNG, WebP |
| **Texte alternatif de l'image** | Description de la photo pour les malvoyants et Google | Toujours remplir |
| **Brouillon** | Si activé, l'article n'est pas visible sur le site | Désactiver pour publier |
| **Contenu** | Corps de l'article en markdown | Voir ci-dessous |

### Rédiger le contenu (Markdown)

L'éditeur de contenu utilise le **Markdown**, un format de texte simple. Voici l'essentiel :

```markdown
## Titre de section (H2)

### Sous-titre (H3)

Paragraphe normal. Le texte s'écrit normalement.

**Texte en gras**   *Texte en italique*

- Élément de liste
- Autre élément

[Texte du lien](https://url-du-lien.fr)
```

L'éditeur dispose d'une barre d'outils avec des boutons pour mettre en forme sans connaître le Markdown.

### Modifier un article existant

1. Aller sur [reboot-dole.fr/admin](https://reboot-dole.fr/admin)
2. Cliquer sur **"Articles de blog"**
3. Cliquer sur l'article à modifier
4. Faire les modifications
5. Cliquer sur **"Publier"** (ou **"Enregistrer"** pour garder la modification sans publier)

### Points d'attention

- **Ne jamais modifier le slug d'un article déjà publié.** Cela crée une nouvelle URL et l'ancienne devient une page 404. Si un article a été partagé ou indexé par Google, le lien est cassé définitivement.
- **L'accroche SEO est limitée à 160 caractères.** Au-delà, Google la coupe dans les résultats.
- **Les images uploadées** sont stockées dans le dossier `public/uploads/` du dépôt. Elles sont immédiatement disponibles dans tous les articles.
- **La publication est quasi instantanée** (30 secondes à 2 minutes) : Decap CMS enregistre l'article sur GitHub, ce qui déclenche automatiquement un nouveau build sur Vercel.

---

## 6. Landing pages SEO

### Ce que c'est

En plus des pages principales du site, il existe des **pages SEO** ciblant des requêtes spécifiques sur Google. Ces pages ne sont pas accessibles depuis le menu de navigation — elles sont découvertes uniquement via Google et le sitemap.

Pages SEO actuelles :

| URL | Requête ciblée |
|---|---|
| `/soins/epilation-laser` | épilation laser Dole |
| `/soins/cryolipolyse` | cryolipolyse Dole |
| `/soins/peeling` | peeling Dole |
| `/soins/microneedling` | microneedling Dole |
| `/yoga-dole` | yoga Dole |
| `/epilation-laser-jambes-dole` | épilation laser jambes Dole |
| `/epilation-laser-maillot-dole` | épilation laser maillot Dole |
| `/cryolipolyse-ventre-dole` | cryolipolyse ventre Dole |

### Modifier le contenu d'une landing page existante

Les pages SEO zone-spécifiques (jambes, maillot, ventre) sont dans `src/routes/` :
- `src/routes/epilation-laser-jambes-dole.tsx`
- `src/routes/epilation-laser-maillot-dole.tsx`
- `src/routes/cryolipolyse-ventre-dole.tsx`

Dans chaque fichier, les textes modifiables sont :
- La description principale (champ `description` dans le composant `SeoLandingPage`)
- Les specs (durée, séances, tarif)
- Les questions/réponses du tableau `faq`
- Le titre SEO (`metaTitle`) et la description SEO (`metaDescription`) en haut du fichier

### Ajouter une nouvelle landing page SEO

Cette opération nécessite de faire appel à Guillaume. Elle implique :
1. Créer un nouveau fichier de route
2. L'ajouter au `routeTree.gen.ts`
3. L'ajouter au sitemap

---

## 7. Ajouter ou remplacer une image

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

## 8. Comment les modifications arrivent en ligne

Toute modification enregistrée sur la branche `main` du dépôt GitHub déclenche automatiquement un déploiement sur Vercel.

**Via Decap CMS** (blog) : la publication est instantanée côté Decap — le build Vercel démarre dans la foulée et le site est mis à jour en 30 secondes à 2 minutes.

**Via GitHub directement** (code source) : même processus, dès que le fichier est enregistré (`commit`) sur `main`.

**Pour vérifier qu'un déploiement est terminé** : aller sur [vercel.com](https://vercel.com) → tableau de bord du projet `reboot-dole` → voir le statut du dernier déploiement.

---

## 9. Ce qu'il ne faut pas toucher

Les fichiers suivants sont critiques pour le fonctionnement du site. Ne pas les modifier sans en parler à Guillaume :

| Fichier / Dossier | Rôle |
|---|---|
| `src/routeTree.gen.ts` | Registre de toutes les pages du site |
| `src/routes/__root.tsx` | Structure globale (header, footer, données structurées Google) |
| `src/lib/` | Logique de chargement du blog |
| `src/components/ui/` | Composants d'interface de base (boutons, accordéons…) |
| `vite.config.ts` | Configuration du build |
| `src/routes/api/` | Routes d'authentification Decap CMS |
| `src/routes/admin/` | Interface d'administration Decap CMS |
| `public/admin/` | Interface Decap CMS (HTML) |
| `package.json` | Dépendances du projet |

---

## 10. Quand faire appel à Guillaume

Les opérations suivantes sortent du périmètre de maintenance courante et nécessitent une intervention de développeur :

- **Ajouter une nouvelle page** au site (y compris une nouvelle landing page SEO)
- **Modifier la navigation** (menu principal)
- **Changer le design** : couleurs, mise en page, typographie
- **Ajouter une fonctionnalité** : formulaire, intégration, widget
- **Modifier les données structurées** (JSON-LD) pour le SEO technique
- **Intégrer l'assistant WhatsApp** (à venir)
- **Tout problème de build** : si le site ne se met pas à jour après une modification

Pour les urgences, contacter Guillaume par email ou WhatsApp.

---

## 11. Stack technique

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
| Domaine | `reboot-dole.fr` |
| Repo | [github.com/guillaumeoudin/reboot-dole](https://github.com/guillaumeoudin/reboot-dole) |

### Commandes de développement (Guillaume)

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
