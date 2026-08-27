/**
 * Landing page — « solution minceur dole », « mincir dole »
 * Cible un intent plus large : les personnes qui veulent mincir à Dole
 * sans savoir ce qu'est la cryolipolyse. Page éducative → conversion.
 */
import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";
import soinCryolipolyse from "@/assets/soin-cryolipolyse.jpg";

const PAGE_URL = `${site.url}/solution-minceur-dole`;

const metaTitle = "Solution minceur à Dole (Jura) — Sans régime, sans chirurgie | Reboot";
const metaDescription =
  "Vous cherchez une solution pour mincir à Dole ? La cryolipolyse au centre Reboot élimine les amas graisseux localisés sans chirurgie. Résultat visible en 6 à 12 semaines. Bilan offert.";

const faq = [
  {
    q: "Quelle est la meilleure solution pour mincir localement à Dole ?",
    a: "Pour les amas graisseux localisés résistants au sport et à l'alimentation (ventre, flancs, cuisses, bras), la cryolipolyse est l'une des solutions non chirurgicales les plus efficaces disponibles à Dole. Elle cible précisément les zones rebelles sans temps d'éviction ni anesthésie.",
  },
  {
    q: "La cryolipolyse fait-elle vraiment maigrir ?",
    a: "La cryolipolyse ne fait pas « maigrir » au sens global du terme — elle n'agit pas sur le poids total du corps. Elle élimine des adipocytes localisés dans une zone précise, ce qui réduit l'épaisseur de la couche graisseuse de cette zone. Le résultat est un affinement visible et mesurable sur la zone traitée.",
  },
  {
    q: "Combien de temps faut-il pour voir les résultats ?",
    a: "Les premiers changements sont perceptibles dès 4 à 6 semaines après la séance. Le résultat complet s'installe sur 6 à 12 semaines, le temps que les adipocytes détruits soient éliminés naturellement par l'organisme. Il est durable — les cellules détruites ne reviennent pas.",
  },
  {
    q: "La cryolipolyse est-elle adaptée à tout le monde ?",
    a: "La cryolipolyse est indiquée sur les personnes ayant des amas graisseux localisés, avec un IMC stable. Elle n'est pas adaptée à un surpoids global ou à une perte de poids importante. Quelques contre-indications existent (froid, coagulation, grossesse). Le bilan initial permet de vérifier l'éligibilité.",
  },
  {
    q: "Faut-il faire un régime en parallèle ?",
    a: "Non, ce n'est pas une condition. La cryolipolyse fonctionne indépendamment de l'alimentation. Cela dit, une alimentation équilibrée et une activité physique régulière aident l'organisme à éliminer les adipocytes détruits plus vite et à maintenir le résultat dans le temps.",
  },
  {
    q: "Peut-on traiter plusieurs zones lors de la même séance à Dole ?",
    a: "Oui. Il est possible de traiter plusieurs zones lors d'un même rendez-vous selon les zones et leur surface (ventre + flancs, ou cuisses + intérieur des bras, par exemple). Le protocole multi-zones est discuté lors du bilan initial au centre Reboot à Dole.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Cryolipolyse à Dole", item: `${site.url}/cryolipolyse-dole` },
        { "@type": "ListItem", position: 3, name: "Solution minceur à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Solution minceur à Dole — Cryolipolyse",
      description: metaDescription,
      url: PAGE_URL,
      provider: { "@id": `${site.url}/#localbusiness` },
      areaServed: [
        { "@type": "City", name: "Dole" },
        { "@type": "AdministrativeArea", name: "Jura" },
      ],
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

const pillars = [
  {
    index: "01",
    title: "Sans chirurgie",
    text: "Aucune anesthésie, aucune incision, aucun temps d'éviction. La séance se déroule au centre, vous reprenez vos activités immédiatement après.",
  },
  {
    index: "02",
    title: "Ciblé sur les zones rebelles",
    text: "Ventre, flancs, cuisses, bras, dos, double menton : la cryolipolyse traite précisément les amas résistants au sport et aux régimes, sans affecter les zones voisines.",
  },
  {
    index: "03",
    title: "Résultat durable",
    text: "Les adipocytes détruits par le froid ne reviennent pas. Le résultat s'installe progressivement sur 6 à 12 semaines et reste stable tant que le poids est maintenu.",
  },
];

export const Route = createFileRoute("/solution-minceur-dole")({
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
  component: SolutionMinceurDolePage,
});

function SolutionMinceurDolePage() {
  return (
    <SeoLandingPage
      title="Solution minceur à Dole"
      tagline="Les amas localisés que ni le sport ni les régimes n'éliminent."
      description="Il existe des zones où la graisse résiste à tout. La cryolipolyse au centre Reboot à Dole (Jura) les cible par le froid, sans chirurgie, sans anesthésie, sans temps d'arrêt. Un résultat visible et durable en 6 à 12 semaines."
      image={{
        src: soinCryolipolyse,
        alt: "Solution minceur à Dole — cryolipolyse sans chirurgie au centre Reboot, Jura",
      }}
      highlights={pillars}
      highlightsHeading={{
        label: "Pourquoi la cryolipolyse",
        title: "Une solution minceur non chirurgicale.",
      }}
      seoContent="La cryolipolyse repose sur un principe simple : les cellules graisseuses (adipocytes) sont plus sensibles au froid que les autres tissus. En les exposant à une température précisément contrôlée, on déclenche leur apoptose — une mort cellulaire naturelle et progressive. Les adipocytes détruits sont ensuite éliminés par l'organisme via le système lymphatique sur 6 à 12 semaines. Le résultat est une réduction mesurable et durable de la couche graisseuse dans la zone traitée. Le centre Reboot à Dole (Jura) est équipé d'une technologie certifiée, opérée par des praticiennes formées. Un bilan cutané préalable — gratuit — permet de confirmer l'indication et de définir le protocole adapté à votre morphologie."
      specs={{
        duration: "45 à 70 min par zone",
        sessions: "6 à 12 semaines après la séance",
        price: "à partir de 250 € — devis au bilan",
      }}
      specLabels={{ sessions: "Résultat visible" }}
      faq={faq}
      parentHref="/soins/cryolipolyse"
      parentLabel="Cryolipolyse"
    />
  );
}
