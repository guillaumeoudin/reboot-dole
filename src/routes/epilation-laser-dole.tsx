/**
 * Landing page hub — requête head-term « épilation laser dole ».
 * Page hors navigation principale, référencée dans le sitemap.
 * Architecture :
 *   /soins/epilation-laser      (page UX / nav)
 *          ↕
 *   /epilation-laser-dole       ← cette page (hub SEO)
 *        ↓         ↓
 *   /epilation-laser-jambes-dole   /epilation-laser-maillot-dole
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
import soinLaser from "@/assets/soin-laser.jpg";

const PAGE_URL = `${site.url}/epilation-laser-dole`;

const metaTitle = "Épilation laser définitive à Dole — Centre Reboot (Jura)";
const metaDescription =
  "Épilation laser définitive à Dole (Jura) : toutes zones (jambes, maillot, aisselles, visage, bras), tous phototypes, technologie dernière génération. Centre Reboot — à partir de 40 €. Bilan offert.";

const faq = [
  {
    q: "L'épilation laser est-elle efficace sur tous les types de peau à Dole ?",
    a: "Oui. Le centre Reboot à Dole est équipé d'une technologie laser certifiée pour tous les phototypes, y compris les peaux mates et foncées. Un bilan préalable est toujours réalisé pour adapter les paramètres à votre profil cutané et confirmer l'éligibilité au traitement.",
  },
  {
    q: "Combien de séances faut-il pour une épilation laser définitive à Dole ?",
    a: "En moyenne 8 à 10 séances espacées de 4 à 8 semaines selon la zone et le cycle pilaire. Certaines zones répondent plus vite — les aisselles dès 6 à 8 séances — d'autres, comme les jambes ou le maillot, peuvent nécessiter quelques séances supplémentaires selon la densité et le profil hormonal.",
  },
  {
    q: "Quel est le tarif de l'épilation laser à Reboot Dole ?",
    a: "Les séances démarrent à partir de 40 € selon la zone traitée. Des forfaits multi-séances sont proposés pour les protocoles complets. Un devis personnalisé est établi lors du bilan gratuit avant la première séance.",
  },
  {
    q: "Peut-on traiter plusieurs zones lors d'une même séance ?",
    a: "Oui, il est possible de combiner plusieurs zones lors d'un même rendez-vous — aisselles et maillot, ou jambes et aisselles, par exemple. La durée est ajustée en conséquence. Ce point est discuté lors du bilan initial.",
  },
  {
    q: "L'épilation laser remplace-t-elle définitivement l'épilation à la cire ?",
    a: "Dans la très grande majorité des cas, oui. Après un protocole complet, la repousse résiduelle est extrêmement fine et clairsemée. La plupart des clients n'ont plus recours à d'autres méthodes d'épilation. Des séances d'entretien annuelles peuvent suffire à maintenir le résultat dans le temps.",
  },
  {
    q: "L'épilation laser est-elle vraiment définitive ?",
    a: "On parle officiellement d'épilation « durable » plutôt que « définitive », car le terme légal implique une destruction à 100 % irreproductible. Dans la pratique, après un protocole complet, la repousse résiduelle est quasi inexistante pour la très grande majorité des clients. Quelques poils fins et clairsemés peuvent persister ou réapparaître avec les années — des séances d'entretien annuelles suffisent à les maintenir sous contrôle.",
  },
  {
    q: "Comment prendre rendez-vous pour une épilation laser définitive à Dole ?",
    a: `En ligne via Planity (lien disponible sur le site), par téléphone au ${site.phone} ou par email à ${site.email}. Le premier rendez-vous comprend un bilan cutané gratuit avant toute impulsion laser.`,
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
        { "@type": "ListItem", position: 3, name: "Épilation laser", item: `${site.url}/soins/epilation-laser` },
        { "@type": "ListItem", position: 4, name: "Épilation laser à Dole", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      name: "Épilation laser à Dole",
      description: metaDescription,
      url: PAGE_URL,
      provider: { "@id": `${site.url}/#localbusiness` },
      areaServed: [
        { "@type": "City", name: "Dole" },
        { "@type": "AdministrativeArea", name: "Jura" },
      ],
      offers: {
        "@type": "Offer",
        price: "40",
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
    title: "Jambes",
    body: "Demi-jambes, jambes complètes, genoux, cuisses intérieures et extérieures — toutes les longueurs prises en charge.",
    href: null,
    cta: null,
  },
  {
    index: "02",
    title: "Maillot",
    body: "Maillot simple, brésilien ou intégral — protocole défini lors du bilan, dans un cadre confidentiel.",
    href: null,
    cta: null,
  },
  {
    index: "03",
    title: "Aisselles",
    body: "L'une des zones les plus traitées : résultat visible dès la 3e séance, durable dès la 8e.",
    href: null,
    cta: null,
  },
  {
    index: "04",
    title: "Visage",
    body: "Lèvre supérieure, menton, sourcils — protocoles adaptés à la finesse et à la sensibilité du visage.",
    href: null,
    cta: null,
  },
  {
    index: "05",
    title: "Bras & avant-bras",
    body: "Bras complets, avant-bras, mains : une liberté retrouvée en toute saison.",
    href: null,
    cta: null,
  },
  {
    index: "06",
    title: "Dos & torse",
    body: "Grandes zones traitées en passes successives selon la densité pilaire et la surface à couvrir.",
    href: null,
    cta: null,
  },
];

export const Route = createFileRoute("/epilation-laser-dole")({
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
  component: EpilationLaserDolePage,
});

function EpilationLaserDolePage() {
  return (
    <>
      {/* Hero */}
      <section className="glow-warm border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <a
              href="/soins/epilation-laser"
              className="label-caps text-muted-foreground transition-colors hover:text-gold"
            >
              ← Épilation laser
            </a>
            <h1 className="mt-6 text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Épilation laser à Dole
            </h1>
            <p className="mt-4 font-display text-2xl text-gold">
              Toutes les zones. Définitivement.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Le centre Reboot à Dole (Jura) propose l'épilation laser sur l'ensemble du corps et du
              visage — jambes, maillot, aisselles, bras, dos, visage. Technologie certifiée tous
              phototypes. Bilan cutané gratuit avant la première séance.
            </p>
            <div className="mt-10">
              <BookButton label="Prendre rendez-vous" />
            </div>
          </div>
          <img
            src={soinLaser}
            alt="Épilation laser au centre Reboot à Dole, Jura — technologie dernière génération"
            width={1600}
            height={1104}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </section>

      {/* Zones traitées */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Zones traitées</p>
          <h2 className="mt-5 text-3xl text-foreground sm:text-4xl">
            Corps et visage — tout est traitable.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Chaque zone fait l'objet d'un protocole adapté à sa densité pilaire, à sa sensibilité et
            au phototype. Le bilan initial permet de définir le plan de traitement complet.
          </p>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <article key={zone.index} className="group bg-background p-8">
                <span className="label-caps text-gold-soft">{zone.index}</span>
                <h3 className="mt-4 text-2xl text-foreground">{zone.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{zone.body}</p>
                {zone.href && zone.cta && (
                  <a
                    href={zone.href}
                    className="mt-5 inline-flex items-center gap-1 border-b border-gold/50 pb-0.5 text-xs text-gold transition-colors hover:border-gold"
                  >
                    {zone.cta}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Durée</dt>
              <dd className="mt-2 text-sm text-foreground">15 à 60 min selon la zone</dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Séances</dt>
              <dd className="mt-2 text-sm text-foreground">8 à 10 séances espacées de 4 à 8 sem.</dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Tarif</dt>
              <dd className="mt-2 text-sm text-foreground">à partir de 40 € — devis au bilan</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Contenu SEO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Le centre en détail</p>
          <h2 className="mt-5 text-3xl text-foreground">
            Épilation laser à Dole — centre Reboot
          </h2>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Le centre Reboot à Dole (Jura) propose l'épilation laser sur l'ensemble du corps et du
            visage : jambes (demi-jambes, jambes complètes, genoux, cuisses), maillot (simple,
            brésilien, intégral), aisselles, bras et avant-bras, dos, torse, et visage (lèvre
            supérieure, menton, sourcils). Chaque zone fait l'objet d'un protocole adapté à la
            densité pilaire et à la couleur du poil. La technologie laser utilisée est certifiée pour
            tous les phototypes, y compris les peaux mates et foncées. Un bilan cutané gratuit est
            systématiquement réalisé avant la première séance pour définir le protocole, estimer le
            nombre de séances et établir un devis personnalisé. Situé au 7 rue Jacques de Molay à
            Dole (39100), le centre Reboot est accessible depuis Besançon (45 min), Dijon (50 min)
            et Lons-le-Saunier (40 min). Rendez-vous en ligne via Planity ou par téléphone.
          </p>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA bas de page */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Passer à l'action</p>
          <h2 className="mt-5 text-3xl text-foreground">Prendre rendez-vous à Dole</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Réservez en ligne ou contactez-nous directement. Le bilan initial est gratuit et sans
            engagement — il permet de définir les zones à traiter, le protocole et le tarif.
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
          <div className="mt-8 border-t border-border pt-8">
            <a
              href="/soins/epilation-laser"
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Épilation laser — toutes les infos <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
