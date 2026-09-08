import { createFileRoute, Link } from "@tanstack/react-router";

import { BookButton } from "@/components/ui-kit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/data/site";
import bienEtreYoga from "@/assets/bien-etre-yoga.jpg";

const PAGE_URL = `${site.url}/yoga-dole`;

const title = "Yoga à Dole — Reboot";
const description =
  "Cours de yoga à Dole (Jura) en petit groupe : yoga doux, respiration, mobilité. Au centre Reboot, 7 rue Jacques de Molay. Réservation en ligne.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
        { "@type": "ListItem", position: 2, name: "Bien-être", item: `${site.url}/bien-etre` },
        { "@type": "ListItem", position: 3, name: "Yoga à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Cours de yoga à Dole",
      description,
      url: PAGE_URL,
      provider: { "@id": `${site.url}/#localbusiness` },
      areaServed: [
        { "@type": "City", name: "Dole" },
        { "@type": "AdministrativeArea", name: "Jura" },
      ],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Y a-t-il des cours de yoga à Dole ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, le centre Reboot propose des séances de yoga en petit groupe dans son espace dédié, situé au 7 rue Jacques de Molay à Dole (Jura). Les séances combinent yoga doux, respiration consciente et mobilité.",
          },
        },
        {
          "@type": "Question",
          name: "Quel type de yoga est pratiqué à Reboot ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Des séances de yoga doux, accessibles à tous les niveaux, y compris aux débutants. Le travail porte sur la respiration, la mobilité articulaire et le relâchement des tensions, en lien avec l'approche bien-être globale du centre.",
          },
        },
        {
          "@type": "Question",
          name: "Faut-il apporter son tapis de yoga ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non, le matériel est mis à disposition au centre. Venez simplement avec des vêtements confortables permettant une liberté de mouvement.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on combiner yoga et soins esthétiques à Reboot ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, c'est même l'approche recommandée par le centre. Les séances de yoga s'inscrivent dans une démarche de longévité qui complète les protocoles technico-esthétiques (laser, cryolipolyse, microneedling…) en travaillant le terrain : gestion du stress, circulation, récupération.",
          },
        },
        {
          "@type": "Question",
          name: "Comment réserver une séance de yoga à Reboot Dole ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `En ligne via Planity (lien disponible sur le site) ou en contactant le centre directement par téléphone au ${site.phone} ou par email à ${site.email}.`,
          },
        },
      ],
    },
  ],
};

const faq = [
  {
    q: "Y a-t-il des cours de yoga à Dole ?",
    a: "Oui, le centre Reboot propose des séances de yoga en petit groupe dans son espace dédié, situé au 7 rue Jacques de Molay à Dole (Jura). Les séances combinent yoga doux, respiration consciente et mobilité.",
  },
  {
    q: "Quel type de yoga est pratiqué à Reboot ?",
    a: "Des séances de yoga doux, accessibles à tous les niveaux, y compris aux débutants. Le travail porte sur la respiration, la mobilité articulaire et le relâchement des tensions, en lien avec l'approche bien-être globale du centre.",
  },
  {
    q: "Faut-il apporter son tapis de yoga ?",
    a: "Non, le matériel est mis à disposition au centre. Venez simplement avec des vêtements confortables permettant une liberté de mouvement.",
  },
  {
    q: "Peut-on combiner yoga et soins esthétiques à Reboot ?",
    a: "Oui, c'est même l'approche recommandée par le centre. Les séances de yoga s'inscrivent dans une démarche de longévité qui complète les protocoles technico-esthétiques (laser, cryolipolyse, microneedling…) en travaillant le terrain : gestion du stress, circulation, récupération.",
  },
  {
    q: "Comment réserver une séance de yoga à Reboot Dole ?",
    a: `En ligne via Planity (lien disponible sur le site) ou en contactant le centre directement par téléphone au ${site.phone} ou par email à ${site.email}.`,
  },
];

const pillars = [
  {
    index: "01",
    title: "Accessible à tous",
    text: "Débutants, seniors, personnes peu sportives : les séances sont conçues pour être pratiquées sans expérience préalable, à son propre rythme.",
  },
  {
    index: "02",
    title: "Petit groupe",
    text: "Le format en petit comité permet un accompagnement individualisé : les postures sont adaptées à chaque participant selon ses besoins et ses limites du jour.",
  },
  {
    index: "03",
    title: "Ancré dans une approche globale",
    text: "Le yoga chez Reboot ne s'arrête pas au tapis. Il s'inscrit dans un parcours de longévité qui peut intégrer soins esthétiques, coaching et ateliers santé.",
  },
];

export const Route = createFileRoute("/yoga-dole")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: YogaDolePage,
});

function YogaDolePage() {
  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <Link
              to="/bien-etre"
              className="label-caps text-muted-foreground transition-colors hover:text-gold"
            >
              ← Bien-être & longévité
            </Link>
            <h1 className="mt-6 text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Yoga à Dole
            </h1>
            <p className="mt-4 font-display text-2xl text-gold">
              Le mouvement qui complète les soins.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Au centre Reboot, les séances de yoga en petit groupe s'adressent à tous les niveaux.
              Respiration, mobilité, relâchement : une pratique régulière qui prépare le terrain et
              prolonge les effets des protocoles de longévité.
            </p>
            <div className="mt-10">
              <BookButton label="Réserver une séance" />
            </div>
          </div>
          <img
            src={bienEtreYoga}
            alt="Studio de yoga du centre Reboot à Dole, Jura"
            width={1600}
            height={1104}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <p className="label-caps text-gold">Notre approche</p>
          <h2 className="mt-5 text-3xl text-foreground sm:text-4xl">
            Un yoga ancré dans le corps.
          </h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {pillars.map((item) => (
              <article key={item.index} className="bg-background p-8">
                <span className="label-caps text-gold-soft">{item.index}</span>
                <h3 className="mt-5 text-2xl text-foreground">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Ce qu'on pratique</p>
          <h2 className="mt-5 text-3xl text-foreground">Sport, yoga & pratiques douces.</h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Des séances en petit groupe dans l'espace dédié du centre : yoga doux, respiration,
            mobilité, stretching, cross training… Une pratique régulière qui prolonge les effets
            des protocoles de longévité.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Infos pratiques</p>
          <h2 className="mt-5 text-3xl text-foreground">Où, quand, comment ?</h2>
          <dl className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Lieu</dt>
              <dd className="mt-2 text-sm text-foreground">
                Centre Reboot, 7 rue Jacques de Molay, 39100 Dole
              </dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Format</dt>
              <dd className="mt-2 text-sm text-foreground">Petit groupe, tous niveaux</dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Réservation</dt>
              <dd className="mt-2 text-sm text-foreground">En ligne via Planity ou par téléphone</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Questions fréquentes</p>
          <h2 className="mt-5 text-3xl text-foreground">Ce qu'on nous demande souvent</h2>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-sm text-foreground hover:text-gold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Aller plus loin</p>
          <h2 className="mt-5 text-3xl text-foreground">Le yoga, une porte d'entrée.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Reboot réunit dans un même lieu soins technico-esthétiques et accompagnement bien-être.
            Vous pouvez combiner vos séances de yoga avec d'autres prestations du centre : coaching,
            soins énergétiques, ou protocoles esthétiques comme le microneedling ou le peeling.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/bien-etre"
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Toutes les prestations bien-être <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/soins"
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Découvrir les soins esthétiques <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
