import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";
import soinCryolipolyse from "@/assets/soin-cryolipolyse.jpg";

const PAGE_URL = `${site.url}/cryolipolyse-ventre-dole`;

const metaTitle = "Cryolipolyse ventre à Dole — Reboot";
const metaDescription =
  "Cryolipolyse du ventre à Dole (Jura) : réduction des amas graisseux abdominaux sans chirurgie. Résultat visible en 6 à 12 semaines. À partir de 250 €.";

const faq = [
  {
    q: "La cryolipolyse du ventre est-elle efficace ?",
    a: "Oui, sur les amas graisseux localisés résistants au sport et à l'alimentation. La cryolipolyse ne traite pas un surpoids global — elle cible des zones précises comme le bas-ventre ou l'abdomen. Le résultat est visible progressivement sur 6 à 12 semaines après la séance.",
  },
  {
    q: "Combien de séances de cryolipolyse faut-il pour le ventre ?",
    a: "En général, 1 à 2 séances par zone. Un bilan à 8 semaines après la première séance permet d'évaluer le résultat et de décider si une deuxième passe est nécessaire. Certains clients obtiennent le résultat souhaité dès la première séance.",
  },
  {
    q: "Est-ce douloureux ? Y a-t-il des effets secondaires ?",
    a: "Les premières minutes, une sensation de froid intense est ressentie, puis la zone s'engourdit. Après la séance, des rougeurs, des sensations de tiraillement ou une légère sensibilité peuvent apparaître quelques jours. Il n'y a pas d'éviction : vous reprenez vos activités immédiatement.",
  },
  {
    q: "La cryolipolyse du ventre remplace-t-elle une liposuccion ?",
    a: "Non, la cryolipolyse n'est pas une alternative chirurgicale. Elle agit sur des amas localisés, sans anesthésie ni intervention. Pour des volumes importants à traiter, la liposuccion reste plus adaptée. Le bilan au centre Reboot permet de vérifier si la cryolipolyse est bien indiquée dans votre cas.",
  },
  {
    q: "Quel est le tarif de la cryolipolyse du ventre à Reboot Dole ?",
    a: "La cryolipolyse du ventre démarre à partir de 250 € par zone et par passage. Le tarif exact est établi lors du bilan, selon le nombre de zones et de passages à réaliser.",
  },
  {
    q: "La cryolipolyse du ventre est-elle adaptée après une grossesse ?",
    a: "Oui, à condition d'attendre au moins 6 mois après l'accouchement (et la fin de l'allaitement). La cryolipolyse est indiquée sur les amas graisseux persistants post-grossesse — mais elle ne traite pas le relâchement musculaire (diastase) ni le relâchement cutané. Le bilan initial permet de s'assurer que la cryolipolyse est bien adaptée à votre situation.",
  },
  {
    q: "Y a-t-il des contre-indications à la cryolipolyse du ventre ?",
    a: "Oui. La cryolipolyse est contre-indiquée en cas de cryoglobulinémie, d'urticaire au froid, de maladie de Raynaud, de grossesse, de pacemaker ou de troubles sévères de la coagulation. Le bilan initial permet de s'assurer que vous êtes éligible au traitement avant toute séance.",
  },
  {
    q: "Peut-on combiner la cryolipolyse du ventre avec un programme sportif ou un régime ?",
    a: "Oui, et c'est même recommandé. La cryolipolyse élimine les adipocytes de façon définitive, mais une alimentation équilibrée et une activité physique régulière aident l'organisme à éliminer les cellules détruites plus vite et à maintenir le résultat dans le temps. Il n'y a aucune restriction sportive après la séance.",
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
        { "@type": "ListItem", position: 3, name: "Cryolipolyse ventre à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Cryolipolyse ventre à Dole",
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

const highlights = [
  {
    index: "01",
    title: "Ventre, flancs, bas-ventre",
    text: "La cryolipolyse cible les amas graisseux de l'abdomen, du bas-ventre et des flancs — les zones les plus résistantes au sport et à l'alimentation, avec une précision millimétrique.",
  },
  {
    index: "02",
    title: "Sans chirurgie, sans éviction",
    text: "Aucune anesthésie, aucune intervention, aucun temps d'arrêt. La séance se déroule au centre et vous reprenez vos activités immédiatement — travail, sport, sorties.",
  },
  {
    index: "03",
    title: "Résultat progressif et durable",
    text: "Les adipocytes détruits sont éliminés naturellement par l'organisme sur 6 à 12 semaines. Le résultat s'installe progressivement et les cellules détruites ne reviennent pas.",
  },
];

export const Route = createFileRoute("/cryolipolyse-ventre-dole")({
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
  component: CryolipolyseVentreDole,
});

function CryolipolyseVentreDole() {
  return (
    <SeoLandingPage
      title="Cryolipolyse ventre à Dole"
      tagline="Les amas du ventre, sans bistouri."
      description="Le bas-ventre, l'abdomen, les bourrelets : la cryolipolyse au centre Reboot à Dole détruit les cellules graisseuses localisées par le froid contrôlé, sans chirurgie et sans éviction. Résultat progressif visible sur 6 à 12 semaines. Bilan gratuit avant la première séance."
      specs={{
        duration: "45 à 60 min par zone",
        sessions: "1 à 2 séances espacées de 6 à 8 sem.",
        price: "à partir de 250 €",
      }}
      image={{
        src: soinCryolipolyse,
        alt: "Cryolipolyse ventre au centre Reboot à Dole — réduction des amas graisseux abdominaux sans chirurgie",
      }}
      highlights={highlights}
      seoContent="La cryolipolyse du ventre au centre Reboot à Dole (Jura) est indiquée sur les amas graisseux du bas-ventre, de l'abdomen et des flancs résistants au sport et à l'alimentation. Le froid contrôlé détruit sélectivement les adipocytes sans toucher les tissus environnants — ils sont ensuite éliminés naturellement par l'organisme sur 6 à 12 semaines. Contrairement à la liposuccion, il n'y a ni anesthésie, ni intervention chirurgicale, ni temps d'éviction : vous reprenez vos activités immédiatement après la séance. Un seul passage par zone suffit dans la majorité des cas ; un deuxième peut être envisagé lors du bilan à 8 semaines. Centre Reboot — 7 rue Jacques de Molay, 39100 Dole (Jura), à proximité de Besançon, Dijon et Lons-le-Saunier."
      faq={faq}
      parentHref="/cryolipolyse-dole"
      parentLabel="Cryolipolyse à Dole"
    />
  );
}
