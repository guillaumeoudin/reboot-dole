import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";
import soinLaser from "@/assets/soin-laser.jpg";

const PAGE_URL = `${site.url}/epilation-laser-maillot-dole`;

const metaTitle = "Épilation laser maillot intégral à Dole — Reboot";
const metaDescription =
  "Épilation laser maillot intégral à Dole (Jura) : maillot simple, brésilien ou intégral. Résultat durable, technologie adaptée. À partir de 45 €.";

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
    a: "Il est préférable d'éviter de programmer la séance pendant les règles, en raison d'une sensibilité cutanée accrue. Si vous avez vos règles au moment de la séance, prévenez la praticienne : elle pourra adapter ou reporter la séance.",
  },
  {
    q: "Quel est le tarif de l'épilation laser du maillot à Reboot Dole ?",
    a: "Le maillot simple débute à partir de 45 € la séance. Le tarif du brésilien ou de l'intégral est établi lors du bilan selon la surface à traiter. Des forfaits séances sont proposés.",
  },
  {
    q: "L'épilation laser du maillot est-elle vraiment définitive ?",
    a: "Oui, les résultats sont durables dans la très grande majorité des cas. Après un protocole complet, la repousse résiduelle est très clairsemée et souvent imperceptible. Des facteurs hormonaux (grossesse, SOPK, traitement hormonal) peuvent stimuler de nouveaux poils. Des séances d'entretien ponctuelles permettent de maintenir le résultat.",
  },
  {
    q: "Peut-on combiner l'épilation laser du maillot avec d'autres zones lors d'une même séance ?",
    a: "Oui, il est tout à fait courant de traiter le maillot et les aisselles lors d'un même rendez-vous, par exemple. La durée de séance est ajustée en conséquence. Ce point est discuté lors du bilan initial pour optimiser le planning et le coût du protocole.",
  },
  {
    q: "L'épilation laser du maillot est-elle compatible avec une contraception hormonale ?",
    a: "Oui, la contraception hormonale (pilule, implant, stérilet hormonal) est compatible avec l'épilation laser. Certains traitements à base de progestérone peuvent toutefois stimuler la repousse pilaire, sans contre-indication au laser, mais avec une possible incidence sur le nombre de séances nécessaires. La praticienne en tient compte lors du bilan.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Épilation laser à Dole", item: `${site.url}/epilation-laser-dole` },
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
    title: "Maillot simple, brésilien ou intégral",
    text: "Trois niveaux de traitement selon vos préférences. La zone exacte est définie avec la praticienne lors du bilan initial. Aucune surface n'est traitée sans accord préalable.",
  },
  {
    index: "02",
    title: "Cadre professionnel et confidentiel",
    text: "La zone bikini est traitée dans le strict respect de votre intimité. La praticienne adapte son approche à votre sensibilité et vous accompagne tout au long du protocole.",
  },
  {
    index: "03",
    title: "Résultat durable dès 8 séances",
    text: "La zone maillot répond très bien au laser. Un suivi personnalisé tient compte de votre cycle pilaire et de vos particularités hormonales pour maximiser le résultat à chaque séance.",
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
      description="Maillot simple, brésilien ou intégral : le centre Reboot à Dole traite la zone bikini au laser de dernière génération, dans un cadre confidentiel et professionnel. Résultat durable dès 8 à 10 séances. Bilan personnalisé avant la première séance."
      specs={{
        duration: "20 à 30 min",
        sessions: "8 à 10 séances espacées de 4 à 8 sem.",
        price: "à partir de 45 €",
      }}
      image={{
        src: soinLaser,
        alt: "Technologie laser épilation au centre Reboot à Dole, zone maillot",
      }}
      highlights={highlights}
      seoContent="L'épilation laser du maillot au centre Reboot à Dole (Jura) propose trois niveaux de traitement : le maillot simple (parties visibles hors du maillot de bain), le brésilien (réduction plus importante avec une bande préservée) et l'intégral (épilation complète de la zone pubienne). La zone traitée est précisément définie avec la praticienne lors d'un bilan personnalisé, avant la première séance. La zone bikini étant plus sensible que les jambes, la technologie utilisée à Reboot intègre un système de refroidissement continu pour un confort optimal : une crème anesthésiante peut également être appliquée en amont si nécessaire. En cas de déséquilibre hormonal, quelques séances supplémentaires peuvent être requises : le suivi personnalisé du centre en tient compte. Centre Reboot, 7 rue Jacques de Molay, 39100 Dole (Jura)."
      faq={faq}
      parentHref="/soins/epilation-laser"
      parentLabel="Épilation laser"
    />
  );
}
