import { createFileRoute } from "@tanstack/react-router";

import { BookButton, HeroBookButton, EyebrowHeading } from "@/components/ui-kit";
import { Reveal } from "@/components/Reveal";
import centreReboot from "@/assets/centre-reboot.jpg";
import { site } from "@/data/site";

const title = "Le concept — Reboot Dole";
const description =
  "Reboot Dole : un centre pensé comme une clinique, où soins technico-esthétiques, coaching et réveil cellulaire se rejoignent.";

export const Route = createFileRoute("/concept")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${site.url}/concept` }],
  }),
  component: ConceptPage,
});

const principles = [
  {
    index: "01",
    title: "L'écoute avant la technique",
    text: "Un bilan approfondi précède chaque protocole. Nous prenons le temps de comprendre votre corps, vos attentes et vos contre-indications avant de proposer un plan de soin.",
  },
  {
    index: "02",
    title: "Des technologies certifiées",
    text: "Nous investissons dans du matériel de dernière génération : lasers, cryolipolyse, dermapen, formules de peeling professionnelles.",
  },
  {
    index: "03",
    title: "Une hygiène irréprochable",
    text: "Cabines dédiées, matériel à usage unique, protocoles de désinfection stricts. La rigueur d'une clinique.",
  },
  {
    index: "04",
    title: "Un accompagnement durable",
    text: "Le résultat compte, mais le suivi aussi. Nous vous accompagnons sur toute la durée de votre cure, avec des conseils précis en post-séance.",
  },
];

const team = [
  { initials: "AG", name: "Aline Gauthier", role: "Fondatrice" },
  { initials: "LF", name: "Léa Ferreira", role: "Praticienne" },
  {
    initials: "LA",
    name: "Lydie Aimé",
    role: "Coach santé et bien-être, réveil cellulaire, reiki & hypnose",
  },
  { initials: "AD", name: "Anaïs Durand", role: "Professeur de yoga" },
];

function ConceptPage() {
  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <EyebrowHeading
              eyebrow="Le concept"
              title="Un centre pensé comme une clinique."
              intro="À Dole, au cœur du Jura, Reboot rassemble les soins esthétiques non invasifs les plus efficaces dans un lieu intimiste."
              stagger
            />
            <div className="mt-10">
              <HeroBookButton className="inline-flex cta:hidden px-6 py-3.5" />
              <BookButton className="hidden cta:inline-flex px-6 py-3.5" />
            </div>
          </div>
          <img
            src={centreReboot}
            alt="Espace d'accueil du centre Reboot à Dole"
            width={1600}
            height={1104}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <EyebrowHeading eyebrow="Nos principes" title="Quatre engagements, à chaque séance." />
          </Reveal>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {principles.map((item, i) => (
              <article key={item.index} className="bg-background p-8">
                <Reveal delay={i * 80}>
                  <span className="label-caps text-gold-soft">{item.index}</span>
                  <h3 className="mt-5 text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <Reveal>
            <EyebrowHeading eyebrow="L'équipe" title="Des praticiennes, pas des techniciennes." />
          </Reveal>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <article key={member.initials} className="bg-background p-8">
                <Reveal delay={i * 70}>
                  <span
                    aria-hidden="true"
                    className="flex size-14 items-center justify-center rounded-full border border-gold/40 font-display text-lg text-gold"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-6 text-xl text-foreground">{member.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{member.role}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
