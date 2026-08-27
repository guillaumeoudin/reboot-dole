/**
 * Landing page hub — cryolipolyse à Dole.
 * Cible : « cryolipolyse dole », « mincir dole », « solution minceur dole »
 * Architecture :
 *   /soins/cryolipolyse          (page UX / nav)
 *          ↕
 *   /cryolipolyse-dole           ← cette page (hub SEO)
 *        ↓             ↓
 *   /cryolipolyse-ventre-dole   /solution-minceur-dole
 */
import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";
import soinCryolipolyse from "@/assets/soin-cryolipolyse.jpg";

const PAGE_URL = `${site.url}/cryolipolyse-dole`;

const metaTitle = "Cryolipolyse à Dole — Solution minceur sans chirurgie | Reboot";
const metaDescription =
  "Cryolipolyse à Dole (Jura) : ventre, flancs, cuisses, bras — réduction des amas graisseux localisés sans chirurgie. Centre Reboot. À partir de 250 €. Bilan offert.";

const faq = [
  {
    q: "Qu'est-ce que la cryolipolyse et comment ça fonctionne ?",
    a: "La cryolipolyse est une technique non invasive qui détruit les cellules graisseuses (adipocytes) en les exposant à un froid contrôlé. Le froid provoque l'apoptose des adipocytes — ils meurent progressivement et sont éliminés naturellement par l'organisme sur 6 à 12 semaines. Les tissus environnants (peau, nerfs, muscles) ne sont pas affectés.",
  },
  {
    q: "Quelles zones sont traitées par cryolipolyse à Dole ?",
    a: "Au centre Reboot à Dole, la cryolipolyse traite toutes les zones présentant des amas graisseux localisés : ventre (bas-ventre, abdomen), flancs (poignées d'amour), cuisses intérieures et extérieures, bras, dos (bourrelets), et double menton. Un bilan préalable permet de définir les zones à traiter et le protocole adapté.",
  },
  {
    q: "Combien de séances de cryolipolyse faut-il à Dole ?",
    a: "En général, 1 à 2 séances par zone suffisent. Un bilan de suivi à 8 semaines après la première séance permet d'évaluer le résultat et de décider si un deuxième passage est nécessaire. Dans la majorité des cas, une seule séance par zone donne satisfaction.",
  },
  {
    q: "La cryolipolyse est-elle une solution minceur efficace ?",
    a: "La cryolipolyse est une solution très efficace pour éliminer des amas graisseux localisés résistants au sport et à l'alimentation. Elle ne traite pas un surpoids global et ne remplace pas un programme minceur ou une alimentation équilibrée. Elle complète une démarche de longévité en ciblant précisément les zones rebelles.",
  },
  {
    q: "Quels sont les résultats attendus et en combien de temps ?",
    a: "Une réduction visible et mesurable de l'épaisseur de la couche graisseuse, qui s'installe progressivement sur 6 à 12 semaines. Les premiers changements sont perceptibles dès 4 à 6 semaines. Les adipocytes détruits ne reviennent pas — le résultat est durable tant que le poids reste stable.",
  },
  {
    q: "La cryolipolyse est-elle douloureuse ?",
    a: "La séance est généralement bien tolérée. Les premières minutes, une sensation intense de froid et de tiraillement est ressentie. La zone s'engourdit ensuite et la plupart des clients lisent ou se détendent pendant la séance. Après, des rougeurs et une légère sensibilité peuvent persister quelques heures à quelques jours.",
  },
  {
    q: "Quel est le tarif de la cryolipolyse à Reboot Dole ?",
    a: "Les séances démarrent à partir de 250 € par zone et par passage. Un devis personnalisé est établi lors du bilan gratuit en fonction du nombre de zones à traiter et du protocole défini.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Soins", item: `${site.url}/soins` },
        { "@type": "ListItem", position: 3, name: "Cryolipolyse", item: `${site.url}/soins/cryolipolyse` },
        { "@type": "ListItem", position: 4, name: "Cryolipolyse à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Cryolipolyse à Dole",
      description: metaDescription,
      url: PAGE_URL,
      provider: { "@id": `${site.url}/#localbusiness` },
      areaServed: [
        { "@type": "City", name: "Dole" },
        { "@type": "AdministrativeArea", name: "Jura" },
      ],
      offers: {
        "@type": "Offer",
        price: "250",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const zones = [
  {
    index: "01",
    title: "Ventre",
    body: "Bas-ventre, abdomen, tour de taille — la zone la plus traitée et souvent la plus rebelle aux régimes.",
    href: null,
    cta: null,
  },
  {
    index: "02",
    title: "Flancs",
    body: "Poignées d'amour, rolls latéraux — les flancs répondent très bien à la cryolipolyse en 1 à 2 passages.",
    href: null,
    cta: null,
  },
  {
    index: "03",
    title: "Cuisses",
    body: "Intérieur et extérieur des cuisses (culotte de cheval) — traitement précis sur les amas les plus résistants.",
    href: null,
    cta: null,
  },
  {
    index: "04",
    title: "Bras",
    body: "Face interne des bras et bourrelets axillaires — résultat visible sur les zones de graisse localisée.",
    href: null,
    cta: null,
  },
  {
    index: "05",
    title: "Dos",
    body: "Bourrelets dorsaux, rouleaux de dos — une zone souvent négligée mais très efficacement traitée.",
    href: null,
    cta: null,
  },
  {
    index: "06",
    title: "Double menton",
    body: "Amas sous-mentonnier : la cryolipolyse peut affiner l'ovale du visage sans injection ni chirurgie.",
    href: null,
    cta: null,
  },
];

export const Route = createFileRoute("/cryolipolyse-dole")({
  head: () => ({
    meta: [
      { title: metaTitle },
      { name: "description", content: metaDescription },
      { property: "og:title", content: metaTitle },
      { property: "og:description", content: metaDescription },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: CryolipolyseDolePage,
});

function CryolipolyseDolePage() {
  return (
    <SeoLandingPage
      title="Cryolipolyse à Dole"
      tagline="Éliminer les amas localisés. Sans bistouri."
      description="Le centre Reboot à Dole (Jura) propose la cryolipolyse sur toutes les zones du corps : ventre, flancs, cuisses, bras, dos, double menton. Technologie certifiée, sans anesthésie, sans éviction. Bilan gratuit avant la première séance."
      image={{
        src: soinCryolipolyse,
        alt: "Cryolipolyse à Dole — réduction des amas graisseux localisés au centre Reboot, Jura",
      }}
      highlights={zones.map((z) => ({ index: z.index, title: z.title, text: z.body }))}
      highlightsHeading={{
        label: "Zones traitées",
        title: "Tout le corps — amas par amas.",
        description:
          "La cryolipolyse est indiquée sur tous les amas graisseux localisés résistants au sport et à l'alimentation. Chaque zone bénéficie d'un protocole adapté à sa surface et à son épaisseur.",
      }}
      seoContent="La cryolipolyse au centre Reboot à Dole (Jura) cible les amas graisseux localisés résistants aux régimes et à l'activité physique : ventre (bas-ventre, abdomen), flancs (poignées d'amour), cuisses intérieures et extérieures, bras, dos (bourrelets dorsaux) et double menton. Le froid contrôlé détruit sélectivement les adipocytes sans toucher les tissus environnants — ils sont éliminés naturellement par l'organisme sur 6 à 12 semaines. Contrairement à la liposuccion, il n'y a ni anesthésie, ni intervention, ni temps d'éviction. Un seul passage par zone suffit dans la majorité des cas. Le bilan préalable — gratuit et sans engagement — permet de définir les zones à traiter, d'évaluer l'éligibilité et d'établir un devis personnalisé. Centre Reboot — 7 rue Jacques de Molay, 39100 Dole (Jura), accessible depuis Besançon, Dijon et Lons-le-Saunier."
      specs={{
        duration: "45 à 70 min par zone",
        sessions: "1 à 2 séances par zone",
        price: "à partir de 250 € — devis au bilan",
      }}
      faq={faq}
      parentHref="/soins/cryolipolyse"
      parentLabel="Cryolipolyse"
    />
  );
}
