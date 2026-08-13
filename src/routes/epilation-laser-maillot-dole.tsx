import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";

const PAGE_URL = `${site.url}/epilation-laser-maillot-dole`;

const metaTitle = "Épilation laser maillot intégral à Dole — Reboot";
const metaDescription =
  "Épilation laser maillot intégral à Dole (Jura) : maillot simple, brésilien ou intégral. Résultat durable, technologie adaptée. À partir de 45 €.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Épilation laser", item: `${site.url}/soins/epilation-laser` },
        { "@type": "ListItem", position: 3, name: "Épilation laser maillot intégral à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Épilation laser maillot intégral à Dole",
      description: metaDescription,
      url: PAGE_URL,
      provider: { "@id": `${site.url}/#localbusiness` },
      areaServed: [
        { "@type": "City", name: "Dole" },
        { "@type": "AdministrativeArea", name: "Jura" },
      ],
      offers: {
        "@type": "Offer",
        price: "45",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quelle est la différence entre maillot simple, brésilien et intégral ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le maillot simple traite les parties dépassant du bas de maillot de bain. Le brésilien réduit davantage la surface, en laissant une bande. L'intégral élimine tous les poils de la zone pubienne. À Reboot Dole, un bilan permet de définir la zone exacte selon vos souhaits.",
          },
        },
        {
          "@type": "Question",
          name: "L'épilation laser du maillot est-elle douloureuse ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La zone bikini est plus sensible que les jambes, mais la technologie utilisée à Reboot intègre un système de refroidissement continu qui rend la séance bien supportée. Certaines clientes appliquent une crème anesthésiante une heure avant la séance.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de séances faut-il pour un maillot intégral ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En général, 8 à 10 séances espacées de 4 à 8 semaines. La zone bikini peut nécessiter quelques séances supplémentaires sur les zones les plus denses ou en cas de déséquilibre hormonal.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on faire l'épilation laser du maillot pendant les règles ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il est préférable d'éviter de programmer la séance pendant les règles, en raison d'une sensibilité cutanée accrue. Si vous avez vos règles au moment de la séance, prévenez la praticienne — elle pourra adapter ou reporter la séance.",
          },
        },
        {
          "@type": "Question",
          name: "Quel est le tarif de l'épilation laser du maillot à Reboot Dole ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le maillot simple débute à partir de 45 € la séance. Le tarif du brésilien ou de l'intégral est établi lors du bilan selon la surface à traiter. Des forfaits séances sont proposés.",
          },
        },
      ],
    },
  ],
};

const faq = [
  {
    q: "Quelle est la différence entre maillot simple, brésilien et intégral ?",
    a: "Le maillot simple traite les parties dépassant du bas de maillot de bain. Le brésilien réduit davantage la surface, en laissant une bande. L'intégral élimine tous les poils de la zone pubienne. À Reboot Dole, un bilan permet de définir la zone exacte selon vos souhaits.",
  },
  {
    q: "L'épilation laser du maillot est-elle douloureuse ?",
    a: "La zone bikini est plus sensible que les jambes, mais la technologie utilisée à Reboot intègre un système de refroidissement continu qui rend la séance bien supportée. Certaines clientes appliquent une crème anesthésiante une heure avant la séance.",
  },
  {
    q: "Combien de séances faut-il pour un maillot intégral ?",
    a: "En général, 8 à 10 séances espacées de 4 à 8 semaines. La zone bikini peut nécessiter quelques séances supplémentaires sur les zones les plus denses ou en cas de déséquilibre hormonal.",
  },
  {
    q: "Peut-on faire l'épilation laser du maillot pendant les règles ?",
    a: "Il est préférable d'éviter de programmer la séance pendant les règles, en raison d'une sensibilité cutanée accrue. Si vous avez vos règles au moment de la séance, prévenez la praticienne — elle pourra adapter ou reporter la séance.",
  },
  {
    q: "Quel est le tarif de l'épilation laser du maillot à Reboot Dole ?",
    a: "Le maillot simple débute à partir de 45 € la séance. Le tarif du brésilien ou de l'intégral est établi lors du bilan selon la surface à traiter. Des forfaits séances sont proposés.",
  },
];

export const Route = createFileRoute("/epilation-laser-maillot-dole")({
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
  component: EpilationLaserMaillotDole,
});

function EpilationLaserMaillotDole() {
  return (
    <SeoLandingPage
      title="Épilation laser maillot intégral à Dole"
      tagline="Une liberté permanente, toute l'année."
      description="Maillot simple, brésilien ou intégral : le centre Reboot à Dole traite la zone bikini au laser de dernière génération, dans un cadre confidentiel et professionnel. Résultat durable dès 8 à 10 séances. Bilan gratuit avant la première séance pour définir la zone et le protocole adapté."
      specs={{
        duration: "20 à 30 min",
        sessions: "8 à 10 séances espacées de 4 à 8 sem.",
        price: "à partir de 45 €",
      }}
      faq={faq}
      parentHref="/soins/epilation-laser"
      parentLabel="Épilation laser"
    />
  );
}
