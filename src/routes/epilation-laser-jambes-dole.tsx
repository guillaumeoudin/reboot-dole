import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";
import soinLaser from "@/assets/soin-laser.jpg";

const PAGE_URL = `${site.url}/epilation-laser-jambes-dole`;

const metaTitle = "Épilation laser des jambes à Dole — Reboot";
const metaDescription =
  "Épilation laser des jambes à Dole (Jura) : demi-jambes, jambes complètes, genoux et cuisses. Résultat durable dès 8 séances. À partir de 60 €.";

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
  {
    q: "Peut-on faire l'épilation laser des jambes en été ou en période d'exposition solaire ?",
    a: "Il est déconseillé de traiter une zone bronzée ou récemment exposée au soleil. La mélanine cutanée concentrée dans le bronzage peut capter le faisceau laser et provoquer une hyperpigmentation. Il faut éviter l'exposition solaire 15 jours avant et après chaque séance. L'hiver et le printemps sont idéaux pour commencer un protocole jambes.",
  },
  {
    q: "À partir de quel âge peut-on faire l'épilation laser des jambes ?",
    a: "En général, à partir de 18 ans. Avant cet âge, le système pilaire n'est pas encore stabilisé et les résultats sont moins prévisibles. Dans certains cas, un traitement peut être envisagé dès 16 ans avec l'accord parental et après bilan. Le centre Reboot évalue chaque situation individuellement.",
  },
  {
    q: "L'épilation laser des jambes est-elle vraiment définitive ?",
    a: "On parle d'épilation durable plutôt que strictement définitive. Après un protocole complet (8 à 10 séances), la très grande majorité des poils sont éliminés de façon permanente. Il peut subsister quelques poils fins que des séances d'entretien annuelles permettent de maintenir sous contrôle. Les résultats à long terme sont très satisfaisants dans l'immense majorité des cas.",
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
    title: "Toutes les zones des jambes",
    text: "Demi-jambes inférieures, jambes complètes, genoux, cuisses intérieures et extérieures — chaque zone est traitée selon sa densité pilaire et la puissance adaptée à votre phototype.",
  },
  {
    index: "02",
    title: "Compatible tous phototypes",
    text: "La technologie laser utilisée à Reboot est certifiée pour tous les types de peau, y compris les peaux mates et foncées. Un bilan préalable confirme l'éligibilité et définit les paramètres de traitement.",
  },
  {
    index: "03",
    title: "Sans éviction",
    text: "Aucun temps d'arrêt après la séance. Une légère rougeur peut apparaître quelques heures, puis disparaît. Vous reprenez vos activités immédiatement — travail, sport, sorties.",
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
      image={{
        src: soinLaser,
        alt: "Séance d'épilation laser des jambes au centre Reboot à Dole, Jura",
      }}
      highlights={highlights}
      seoContent="L'épilation laser des jambes au centre Reboot à Dole (Jura) couvre l'ensemble du membre inférieur : demi-jambes inférieures, jambes complètes, genoux et cuisses intérieures ou extérieures. Chaque zone fait l'objet d'un protocole individualisé, défini lors d'un bilan cutané gratuit réalisé avant la première séance. La technologie laser utilisée est adaptée à tous les phototypes, y compris les peaux mates — ce qui n'est pas le cas de tous les appareils. Une séance jambes complètes dure 45 à 60 minutes. Les résultats s'installent progressivement : dès la troisième séance, la repousse est nettement réduite et la densité pilaire diminue séance après séance. Le centre est situé au 7 rue Jacques de Molay à Dole (39100, Jura), accessible depuis Besançon (45 min), Dijon (50 min) et Lons-le-Saunier (40 min)."
      faq={faq}
      parentHref="/soins/epilation-laser"
      parentLabel="Épilation laser"
    />
  );
}
