/**
 * Layout partagé pour les landing pages SEO zone-spécifiques.
 * Ces pages ne figurent pas dans la navigation principale du site —
 * elles sont découvertes via Google et le sitemap.xml.
 *
 * Props optionnelles pour enrichir le contenu page par page :
 * - image      → active la mise en page 2 colonnes dans le héro
 * - highlights → section « points forts » (3 piliers recommandés)
 * - seoContent → paragraphe SEO étendu affiché avant la FAQ
 */
import { BookButton } from "@/components/ui-kit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type SeoLandingPageProps = {
  title: string;
  tagline: string;
  description: string;
  specs: { duration: string; sessions: string; price: string };
  faq: { q: string; a: string }[];
  /** Lien de retour vers la page parente */
  parentHref: string;
  parentLabel: string;
  /** Image héro optionnelle — active la mise en page 2 colonnes */
  image?: { src: string; alt: string; width?: number; height?: number };
  /** Points forts / piliers (3 recommandés) */
  highlights?: { index: string; title: string; text: string }[];
  /** Paragraphe SEO étendu — affiché avant la FAQ */
  seoContent?: string;
};

export function SeoLandingPage({
  title,
  tagline,
  description,
  specs,
  faq,
  parentHref,
  parentLabel,
  image,
  highlights,
  seoContent,
}: SeoLandingPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="glow-warm border-b border-border">
        <div
          className={`mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20${
            image ? " grid items-center gap-10 lg:grid-cols-2" : ""
          }`}
        >
          <div>
            <a
              href={parentHref}
              className="label-caps text-muted-foreground transition-colors hover:text-gold"
            >
              ← {parentLabel}
            </a>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 font-display text-2xl text-gold">{tagline}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="mt-10">
              <BookButton />
            </div>
          </div>
          {image && (
            <img
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 1104}
              className="aspect-4/3 w-full object-cover"
            />
          )}
        </div>
      </section>

      {/* Specs */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Durée</dt>
              <dd className="mt-2 text-sm text-foreground">{specs.duration}</dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Séances</dt>
              <dd className="mt-2 text-sm text-foreground">{specs.sessions}</dd>
            </div>
            <div className="bg-background p-6">
              <dt className="label-caps text-gold-soft">Tarif</dt>
              <dd className="mt-2 text-sm text-foreground">{specs.price}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Points forts */}
      {highlights && highlights.length > 0 && (
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <div className="grid gap-px bg-border md:grid-cols-3">
              {highlights.map((item) => (
                <article key={item.index} className="bg-background p-8">
                  <span className="label-caps text-gold-soft">{item.index}</span>
                  <h3 className="mt-5 text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO étendu */}
      {seoContent && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <p className="label-caps text-gold">Le soin en détail</p>
            <h2 className="mt-5 text-3xl text-foreground">{title} — centre Reboot</h2>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {seoContent}
            </p>
          </div>
        </section>
      )}

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
            Réservez en ligne ou contactez-nous directement. Un bilan est réalisé avant la première
            séance pour adapter le protocole à votre situation.
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
              href={parentHref}
              className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {parentLabel} — en savoir plus <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
