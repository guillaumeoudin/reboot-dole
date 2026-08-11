import { createFileRoute } from "@tanstack/react-router";

import { BookButton, EyebrowHeading } from "@/components/ui-kit";
import bienEtreYoga from "@/assets/bien-etre-yoga-BOtygO50.jpg";

const title = "Bien-être & longévité — Reboot Dole";
const description =
  "Yoga, coaching, soins énergétiques et ateliers santé à Dole : une approche holistique du vieillissement, en complément des soins technico-esthétiques.";

export const Route = createFileRoute("/bien-etre")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BienEtrePage,
});

const approach = [
  {
    index: "01",
    title: "Réveiller la cellule",
    text: "Oxygénation, circulation, sommeil, stress : la peau et les tissus ne se régénèrent que si le terrain suit. Nous le travaillons en parallèle des soins techniques.",
  },
  {
    index: "02",
    title: "Une lecture globale",
    text: "Corps, mental et mode de vie sont appréhendés ensemble. Le bilan initial dépasse la seule zone à traiter pour comprendre ce qui freine votre vitalité.",
  },
  {
    index: "03",
    title: "Un parcours continu",
    text: "Cabine, tapis de yoga, atelier : les prestations se répondent au sein d'un même parcours, avec la même équipe et la même qualité de suivi.",
  },
];

const services = [
  {
    index: "01",
    title: "Yoga & pratiques douces",
    text: "Des séances en petit groupe dans l'espace dédié du centre : yoga doux, respiration, mobilité. Une pratique régulière qui prolonge les effets des protocoles de longévité.",
  },
  {
    index: "02",
    title: "Coaching & consultation",
    text: "Accompagnements individuels ou en équipe : conscience de soi, définition d'objectifs, sortie des impasses, retour à la vitalité, gestion du stress.",
  },
  {
    index: "03",
    title: "Soins énergétiques",
    text: "Reiki, massage thaïlandais, hypnose : des soins qui relancent la circulation, apaisent le système nerveux et soutiennent la régénération cellulaire.",
  },
  {
    index: "04",
    title: "Ateliers santé & longévité",
    text: "Nutrition, sommeil, gestion du stress : des ateliers et conférences pour comprendre et entretenir votre terrain au quotidien.",
  },
];

function BienEtrePage() {
  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <EyebrowHeading
              eyebrow="Bien-être & longévité"
              title="La longévité commence de l'intérieur."
              intro="Les soins agissent sur la peau ; le mouvement, la respiration et l'accompagnement agissent sur tout le reste. Reboot réunit les deux."
            />
            <div className="mt-10">
              <BookButton />
            </div>
          </div>
          <img
            src={bienEtreYoga}
            alt="Studio de yoga du centre Reboot à Dole"
            width={1600}
            height={1104}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <EyebrowHeading
            eyebrow="Notre approche"
            title="Travailler le terrain, pas seulement la surface."
          />
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {approach.map((item) => (
              <article key={item.index} className="bg-background p-8">
                <span className="label-caps text-gold-soft">{item.index}</span>
                <h3 className="mt-5 text-2xl text-foreground">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <EyebrowHeading eyebrow="Prestations" title="Le bien-être au quotidien." />
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {services.map((item) => (
              <article key={item.index} className="bg-background p-8">
                <span className="label-caps text-gold-soft">{item.index}</span>
                <h3 className="mt-5 text-2xl text-foreground">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
