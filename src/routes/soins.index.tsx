import { createFileRoute } from "@tanstack/react-router";

import { BookButton, EyebrowHeading, SpecList, TextLink } from "@/components/ui-kit";
import { Reveal } from "@/components/Reveal";
import { soins } from "@/data/soins";

const title = "Soins technico-esthétiques — Reboot Dole";
const description =
  "Épilation laser, cryolipolyse, peeling et microneedling à Dole : protocoles précis, technologies certifiées et suivi personnalisé.";

export const Route = createFileRoute("/soins/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SoinsPage,
});

function SoinsPage() {
  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <EyebrowHeading
            eyebrow="Nos soins"
            title="Des protocoles précis, non invasifs."
            intro="Chaque soin commence par un bilan et se poursuit par un plan personnalisé. Aucune promesse démesurée : des résultats mesurables, séance après séance."
            stagger
          />
          <div className="mt-10 hidden cta:block">
            <BookButton />
          </div>
        </div>
      </section>

      {soins.map((soin, i) => (
        <section key={soin.slug} className="border-b border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <img
                src={soin.image}
                alt={soin.imageAlt}
                width={1600}
                height={1104}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
            </Reveal>
            <Reveal delay={100}>
              <span className="label-caps text-gold-soft">{soin.index}</span>
              <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">{soin.title}</h2>
              <p className="mt-3 font-display text-xl text-gold">{soin.tagline}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{soin.long}</p>
              <div className="mt-8">
                <SpecList
                  items={[
                    { term: "Durée", value: soin.duration },
                    { term: "Séances", value: soin.sessions },
                    { term: "Tarif", value: soin.price },
                  ]}
                />
              </div>
              <div className="mt-8">
                <TextLink to={`/soins/${soin.slug}`}>En savoir plus</TextLink>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
