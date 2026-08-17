import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { BookButton, SpecList } from "@/components/ui-kit";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSoin, soins } from "@/data/soins";
import { site } from "@/data/site";

export const Route = createFileRoute("/soins/$slug")({
  loader: ({ params }) => {
    const soin = getSoin(params.slug);
    if (!soin) throw notFound();
    return { soin };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Soin introuvable — Reboot Dole" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { soin } = loaderData;
    const url = `${site.url}/soins/${soin.slug}`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
            { "@type": "ListItem", position: 2, name: "Soins", item: `${site.url}/soins` },
            { "@type": "ListItem", position: 3, name: soin.title, item: url },
          ],
        },
        {
          "@type": "Service",
          name: soin.title,
          description: soin.metaDescription,
          url,
          provider: { "@id": `${site.url}/#localbusiness` },
          areaServed: [
            { "@type": "City", name: "Dole" },
            { "@type": "AdministrativeArea", name: "Jura" },
          ],
          offers: {
            "@type": "Offer",
            price: soin.priceFrom,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: soin.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    return {
      meta: [
        { title: soin.metaTitle },
        { name: "description", content: soin.metaDescription },
        { property: "og:title", content: soin.metaTitle },
        { property: "og:description", content: soin.metaDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: SoinDetail,
});

function SoinDetail() {
  const { soin } = Route.useLoaderData();
  const others = soins.filter((s) => s.slug !== soin.slug);

  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <Link
              to="/soins"
              viewTransition
              className="label-caps text-muted-foreground transition-colors hover:text-gold"
            >
              ← Tous les soins
            </Link>
            <h1 className="mt-6 text-4xl leading-[1.05] text-foreground sm:text-5xl">
              {soin.title}
            </h1>
            <p className="mt-4 font-display text-2xl text-gold">{soin.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{soin.long}</p>
            <div className="mt-10">
              <BookButton />
            </div>
          </div>
          <img
            src={soin.image}
            alt={soin.imageAlt}
            width={1600}
            height={1104}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <Reveal>
            <SpecList
              padding="p-6"
              items={[
                { term: "Durée", value: soin.duration },
                { term: "Séances", value: soin.sessions },
                { term: "Tarif", value: soin.price },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="label-caps text-gold">Indications</p>
            <h2 className="mt-5 text-3xl text-foreground">Pour qui ?</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              {soin.indications.map((item: string) => (
                <li key={item} className="flex gap-3 border-b border-border pb-4">
                  <span aria-hidden="true" className="text-gold-soft">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <p className="label-caps text-gold">Après la séance</p>
            <h2 className="mt-5 text-3xl text-foreground">Les bons réflexes</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              {soin.aftercare.map((item: string) => (
                <li key={item} className="flex gap-3 border-b border-border pb-4">
                  <span aria-hidden="true" className="text-gold-soft">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Questions fréquentes</p>
          <h2 className="mt-5 text-3xl text-foreground">Ce qu'on nous demande souvent</h2>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {soin.faq.map((item, i) => (
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

      {soin.hubLandingPage && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
            <a
              href={soin.hubLandingPage.href}
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {soin.hubLandingPage.label} <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      )}

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="label-caps text-gold">Autres soins</p>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                to="/soins/$slug"
                params={{ slug: other.slug }}
                viewTransition
                className="group bg-background p-8 transition-colors hover:bg-surface"
              >
                <span className="label-caps text-gold-soft">{other.index}</span>
                <h3 className="mt-4 text-2xl text-foreground transition-colors group-hover:text-gold">
                  {other.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{other.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
