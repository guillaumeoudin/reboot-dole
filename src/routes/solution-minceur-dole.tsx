/**
 * Landing page — « solution minceur dole », « mincir dole »
 * Cible un intent plus large : les personnes qui veulent mincir à Dole
 * sans savoir ce qu'est la cryolipolyse. Page éducative → conversion.
 */
import { createFileRoute } from "@tanstack/react-router";

import { BookButton } from "@/components/ui-kit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <>
      {/* Hero */}
      <section className="glow-warm border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <a
              href="/cryolipolyse-dole"
              className="label-caps text-muted-foreground transition-colors hover:text-gold"
            >
              ← Cryolipolyse à Dole
            </a>
            <h1 className="mt-6 text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Solution minceur à Dole
            </h1>
            <p className="mt-4 font-display text-2xl text-gold">
              Les amas localisés que ni le sport ni les régimes n'éliminent.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Il existe des zones où la graisse résiste à tout. La cryolipolyse au centre Reboot à
              Dole (Jura) les cible par le froid, sans chirurgie, sans anesthésie, sans temps
              d'arrêt. Un résultat visible et durable en 6 à 12 semaines.
            </p>
            <div className="mt-10">
              <BookButton label="Prendre rendez-vous" />
            </div>
          </div>
          <img
            src={soinCryolipolyse}
            alt="Solution minceur à Dole — cryolipolyse sans chirurgie au centre Reboot, Jura"
            width={1600}
            height={1104}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </section>

      {/* Pourquoi la cryo */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Pourquoi la cryolipolyse</p>
          <h2 className="mt-5 text-3xl text-foreground sm:text-4xl">
            Une solution minceur non chirurgicale.
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

      {/* Explication */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Comment ça fonctionne</p>
          <h2 className="mt-5 text-3xl text-foreground">Le froid au service de la minceur.</h2>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            La cryolipolyse repose sur un principe simple : les cellules graisseuses (adipocytes) sont
            plus sensibles au froid que les autres tissus. En les exposant à une température précisément
            contrôlée, on déclenche leur apoptose — une mort cellulaire naturelle et progressive. Les
            adipocytes détruits sont ensuite éliminés par l'organisme via le système lymphatique sur
            6 à 12 semaines. Le résultat est une réduction mesurable et durable de la couche graisseuse
            dans la zone traitée. Le centre Reboot à Dole (Jura) est équipé d'une technologie certifiée,
            opérée par des praticiennes formées. Un bilan cutané préalable — gratuit — permet de
            confirmer l'indication et de définir le protocole adapté à votre morphologie.
          </p>
          <div className="mt-8">
            <a
              href="/cryolipolyse-dole"
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Voir toutes les zones traitées à Dole <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Durée de séance</dt>
              <dd className="mt-2 text-sm text-foreground">45 à 70 min par zone</dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Résultat visible</dt>
              <dd className="mt-2 text-sm text-foreground">6 à 12 semaines après la séance</dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Tarif</dt>
              <dd className="mt-2 text-sm text-foreground">à partir de 250 € — devis au bilan</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
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

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Passer à l'action</p>
          <h2 className="mt-5 text-3xl text-foreground">Votre bilan minceur à Dole — gratuit</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Le bilan initial est gratuit et sans engagement. Il permet d'évaluer les zones à traiter,
            de confirmer l'indication et d'établir un devis personnalisé.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <BookButton />
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Nous contacter <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="mt-8 border-t border-border pt-8 flex flex-wrap gap-6">
            <a
              href="/cryolipolyse-dole"
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Cryolipolyse à Dole — toutes les zones <span aria-hidden="true">→</span>
            </a>
            <a
              href="/cryolipolyse-ventre-dole"
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Cryolipolyse ventre à Dole <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
