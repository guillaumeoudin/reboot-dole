import { createFileRoute, Link } from "@tanstack/react-router";

import { BookButton, EyebrowHeading, TextLink } from "@/components/ui-kit";
import { soins } from "@/data/soins";
import centreReboot from "@/assets/centre-reboot-BQNUz8Wu.jpg";
import bienEtreYoga from "@/assets/bien-etre-yoga-BOtygO50.jpg";

const title = "Reboot Dole — Soins esthétiques & longévité dans le Jura";
const description =
  "Épilation laser, cryolipolyse, peeling, microneedling et bien-être à Dole. Un centre intimiste, des technologies certifiées et un suivi personnalisé.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    index: "01",
    title: "Technologies certifiées",
    text: "Lasers, cryolipolyse, dermapen : du matériel de dernière génération, opéré par des praticiennes formées.",
  },
  {
    index: "02",
    title: "Protocoles personnalisés",
    text: "Un bilan précède chaque cure. Nous adaptons le nombre de séances, les paramètres et le rythme à votre peau.",
  },
  {
    index: "03",
    title: "Approche longévité",
    text: "La peau se régénère si le terrain suit : mouvement, respiration et accompagnement complètent les soins.",
  },
];

function Index() {
  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="rise-in max-w-3xl">
            <p className="label-caps text-gold">
              <span
                aria-hidden="true"
                className="mr-3 inline-block h-px w-6 translate-y-[-3px] bg-gold align-middle"
              />
              Dole — Jura
            </p>
            <h1 className="mt-6 text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              La beauté n'est pas une promesse.
              <span className="block text-gold">C'est un protocole.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Reboot réunit à Dole les soins technico-esthétiques non invasifs les plus efficaces et
              une approche complète de la longévité, dans un lieu intimiste et rigoureux.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <BookButton className="hidden px-6 py-3.5 cta:inline-flex" />
              <TextLink to="/soins">Découvrir les soins</TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-px bg-border md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.index} className="bg-background p-8">
                <span className="label-caps text-gold-soft">{pillar.index}</span>
                <h2 className="mt-5 text-2xl text-foreground">{pillar.title}</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <EyebrowHeading
            eyebrow="Nos soins"
            title="Quatre protocoles, une même exigence."
            intro="Chaque soin est mené avec la rigueur d'une clinique : bilan, paramètres adaptés, suivi post-séance."
          />
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {soins.map((soin) => (
              <Link
                key={soin.slug}
                to="/soins/$slug"
                params={{ slug: soin.slug }}
                className="group bg-background transition-colors hover:bg-surface"
              >
                <img
                  src={soin.image}
                  alt={soin.imageAlt}
                  width={1600}
                  height={1104}
                  loading="lazy"
                  className="aspect-16/10 w-full object-cover"
                />
                <div className="p-8">
                  <span className="label-caps text-gold-soft">{soin.index}</span>
                  <h3 className="mt-4 text-2xl text-foreground transition-colors group-hover:text-gold">
                    {soin.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{soin.short}</p>
                  <p className="mt-6 text-sm text-gold">
                    {soin.priceFrom}
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-block transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2">
          <img
            src={centreReboot}
            alt="Intérieur du centre Reboot à Dole"
            width={1600}
            height={1104}
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
          <div>
            <EyebrowHeading
              eyebrow="Le concept"
              title="Un centre pensé comme une clinique."
              intro="Cabines dédiées, hygiène irréprochable, écoute réelle : nous prenons le temps du bilan avant celui du soin."
            />
            <div className="mt-8">
              <TextLink to="/concept">Découvrir le concept</TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <EyebrowHeading
              eyebrow="Bien-être & longévité"
              title="La longévité commence de l'intérieur."
              intro="Yoga, coaching, soins énergétiques et ateliers santé : le terrain que nous travaillons en parallèle des soins techniques."
            />
            <div className="mt-8">
              <TextLink to="/bien-etre">Explorer le bien-être</TextLink>
            </div>
          </div>
          <img
            src={bienEtreYoga}
            alt="Espace de yoga du centre Reboot"
            width={1600}
            height={1104}
            loading="lazy"
            className="aspect-4/3 w-full object-cover lg:order-2"
          />
        </div>
      </section>

      <section className="hidden border-b border-border bg-surface cta:block">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <h2 className="text-3xl text-foreground sm:text-4xl">
            Prêt·e à commencer votre parcours ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Réservez votre premier bilan et repartez avec un plan de soin clair, adapté à votre peau
            et à vos objectifs.
          </p>
          <div className="mt-10 flex justify-center">
            <BookButton />
          </div>
        </div>
      </section>
    </>
  );
}
