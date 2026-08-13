import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";

const PAGE_URL = `${site.url}/epilation-laser-jambes-dole`;

const metaTitle = "Épilation laser des jambes à Dole — Reboot";
const metaDescription =
  "Épilation laser des jambes à Dole (Jura) : demi-jambes, jambes complètes, genoux et cuisses. Résultat durable dès 8 séances. À partir de 60 €.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Épilation laser", item: `${site.url}/soins/epilation-laser` },
        { "@type": "ListItem", position: 3, name: "Épilation laser des jambes à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Épilation laser des jambes à Dole",
      description: metaDescription,
      url: PAGE_URL,
      provider: { "@id": `${site.url}/#localbusiness` },
      areaServed: [
        { "@type": "City", name: "Dole" },
        { "@type": "AdministrativeArea", name: "Jura" },
      ],
      offers: {
        "@type": "Offer",
        price: "60",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Combien coûte l'épilation laser des jambes à Dole ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "À Reboot Dole, l'épilation laser des jambes complètes débute à partir de 60 €. Le tarif exact dépend de la zone traitée (demi-jambes, jambes complètes avec ou sans genoux). Un devis est établi lors de votre bilan.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de séances pour une épilation laser des jambes ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Entre 8 et 10 séances en moyenne, espacées de 4 à 8 semaines selon la repousse. Les jambes sont une grande zone — les premières séances sont souvent les plus efficaces car elles traitent les poils en phase active.",
          },
        },
        {
          "@type": "Question",
          name: "L'épilation laser des jambes est-elle efficace sur tous les types de poils ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La technologie laser est optimale sur les poils foncés à châtains. Elle est moins efficace sur les poils blonds, roux ou blancs. Un bilan au centre Reboot à Dole permet de vérifier l'éligibilité avant de commencer.",
          },
        },
        {
          "@type": "Question",
          name: "Faut-il se raser avant une séance d'épilation laser des jambes ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, la zone doit être rasée la veille de la séance. Il ne faut pas épiler à la cire ni utiliser de crème dépilatoire dans les 4 semaines précédant la séance, car la racine du poil doit être intacte pour que le laser soit efficace.",
          },
        },
        {
          "@type": "Question",
          name: "Y a-t-il un risque de brûlure avec l'épilation laser sur les jambes ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non, avec une technologie certifiée et un bilan préalable bien conduit. La peau environnante n'est pas touchée : le laser cible uniquement le pigment du poil. Le système de refroidissement intégré protège la peau pendant toute la séance.",
          },
        },
      ],
    },
  ],
};

const faq = [
  {
    q: "Combien coûte l'épilation laser des jambes à Dole ?",
    a: "À Reboot Dole, l'épilation laser des jambes complètes débute à partir de 60 €. Le tarif exact dépend de la zone traitée (demi-jambes, jambes complètes avec ou sans genoux). Un devis est établi lors de votre bilan.",
  },
  {
    q: "Combien de séances pour une épilation laser des jambes ?",
    a: "Entre 8 et 10 séances en moyenne, espacées de 4 à 8 semaines selon la repousse. Les jambes sont une grande zone — les premières séances sont souvent les plus efficaces car elles traitent les poils en phase active.",
  },
  {
    q: "L'épilation laser des jambes est-elle efficace sur tous les types de poils ?",
    a: "La technologie laser est optimale sur les poils foncés à châtains. Elle est moins efficace sur les poils blonds, roux ou blancs. Un bilan au centre Reboot à Dole permet de vérifier l'éligibilité avant de commencer.",
  },
  {
    q: "Faut-il se raser avant une séance d'épilation laser des jambes ?",
    a: "Oui, la zone doit être rasée la veille de la séance. Il ne faut pas épiler à la cire ni utiliser de crème dépilatoire dans les 4 semaines précédant la séance, car la racine du poil doit être intacte pour que le laser soit efficace.",
  },
  {
    q: "Y a-t-il un risque de brûlure avec l'épilation laser sur les jambes ?",
    a: "Non, avec une technologie certifiée et un bilan préalable bien conduit. La peau environnante n'est pas touchée : le laser cible uniquement le pigment du poil. Le système de refroidissement intégré protège la peau pendant toute la séance.",
  },
];

export const Route = createFileRoute("/epilation-laser-jambes-dole")({
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
  component: EpilationLaserJambesDole,
});

function EpilationLaserJambesDole() {
  return (
    <SeoLandingPage
      title="Épilation laser des jambes à Dole"
      tagline="Finies les rasages, les irritations, les poils incarnés."
      description="Demi-jambes, jambes complètes, genoux, cuisses : le centre Reboot à Dole traite toutes les zones au laser de dernière génération. Résultat progressif et durable, dès 8 séances espacées selon votre cycle pilaire. Bilan cutané gratuit avant la première séance."
      specs={{
        duration: "45 à 60 min (jambes complètes)",
        sessions: "8 à 10 séances espacées de 4 à 8 sem.",
        price: "à partir de 60 €",
      }}
      faq={faq}
      parentHref="/soins/epilation-laser"
      parentLabel="Épilation laser"
    />
  );
}
