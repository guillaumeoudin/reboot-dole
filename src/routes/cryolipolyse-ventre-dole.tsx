import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";

const PAGE_URL = `${site.url}/cryolipolyse-ventre-dole`;

const metaTitle = "Cryolipolyse ventre à Dole — Reboot";
const metaDescription =
  "Cryolipolyse du ventre à Dole (Jura) : réduction des amas graisseux abdominaux sans chirurgie. Résultat visible en 6 à 12 semaines. À partir de 250 €.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Cryolipolyse", item: `${site.url}/soins/cryolipolyse` },
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
      mainEntity: [
        {
          "@type": "Question",
          name: "La cryolipolyse du ventre est-elle efficace ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, sur les amas graisseux localisés résistants au sport et à l'alimentation. La cryolipolyse ne traite pas un surpoids global — elle cible des zones précises comme le bas-ventre ou l'abdomen. Le résultat est visible progressivement sur 6 à 12 semaines après la séance.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de séances de cryolipolyse faut-il pour le ventre ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En général, 1 à 2 séances par zone. Un bilan à 8 semaines après la première séance permet d'évaluer le résultat et de décider si une deuxième passe est nécessaire. Certains clients obtiennent le résultat souhaité dès la première séance.",
          },
        },
        {
          "@type": "Question",
          name: "Est-ce douloureux ? Y a-t-il des effets secondaires ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les premières minutes, une sensation de froid intense est ressentie, puis la zone s'engourdit. Après la séance, des rougeurs, des sensations de tiraillement ou une légère sensibilité peuvent apparaître quelques jours. Il n'y a pas d'éviction : vous reprenez vos activités immédiatement.",
          },
        },
        {
          "@type": "Question",
          name: "La cryolipolyse du ventre remplace-t-elle une liposuccion ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non, la cryolipolyse n'est pas une alternative chirurgicale. Elle agit sur des amas localisés, sans anesthésie ni intervention. Pour des volumes importants à traiter, la liposuccion reste plus adaptée. Le bilan au centre Reboot permet de vérifier si la cryolipolyse est bien indiquée dans votre cas.",
          },
        },
        {
          "@type": "Question",
          name: "Quel est le tarif de la cryolipolyse du ventre à Reboot Dole ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La cryolipolyse du ventre démarre à partir de 250 € par zone et par passage. Le tarif exact est établi lors du bilan, selon le nombre de zones et de passages à réaliser.",
          },
        },
      ],
    },
  ],
};

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
      faq={faq}
      parentHref="/soins/cryolipolyse"
      parentLabel="Cryolipolyse"
    />
  );
}
