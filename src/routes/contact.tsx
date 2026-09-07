import { createFileRoute, Link } from "@tanstack/react-router";

import { ContactForm } from "@/components/ContactForm";
import { EyebrowHeading } from "@/components/ui-kit";
import { site } from "@/data/site";

const title = "Contact & rendez-vous — Reboot Dole";
const description =
  "Contactez le centre Reboot à Dole : adresse, horaires, téléphone et formulaire de demande de rendez-vous.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${site.url}/contact` }],
  }),
  component: ContactPage,
});

const hours = [
  { day: "Lundi — Vendredi", value: "9h30 — 12h · 13h30 — 18h" },
  { day: "Samedi — Dimanche", value: "Fermé" },
];

function ContactPage() {
  return (
    <>
      <section className="glow-warm border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <EyebrowHeading
            eyebrow="Contact"
            title="Parlons de votre peau."
            intro="Par téléphone ou via le formulaire : nous répondons à chaque demande et proposons un premier bilan personnalisé."
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-10">
            <div>
              <p className="label-caps text-gold">Le centre</p>
              <address className="mt-5 space-y-1 text-sm not-italic text-muted-foreground">
                {site.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
            <div>
              <p className="label-caps text-gold">Nous joindre</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href={site.phoneHref} className="transition-colors hover:text-gold">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="label-caps text-gold">Horaires</p>
              <dl className="mt-5 space-y-3 text-sm">
                {hours.map((row) => (
                  <div key={row.day} className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">{row.day}</dt>
                    <dd className="text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div id="formulaire" className="scroll-mt-20">
            <p className="label-caps text-gold">Nous écrire</p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        {(() => {
          const { latitude: lat, longitude: lon } = site.geo;
          const δlon = 0.005;
          const δlat = 0.0025;
          const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - δlon}%2C${lat - δlat}%2C${lon + δlon}%2C${lat + δlat}&layer=mapnik&marker=${lat}%2C${lon}`;
          const gmapsHref = `https://maps.google.com?q=${encodeURIComponent(site.address.slice(1).join(", "))}`;
          return (
            <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 space-y-4">
              <div className="overflow-hidden border border-border">
                <iframe
                  title="Localisation du centre Reboot à Dole"
                  loading="lazy"
                  className="h-[380px] w-full border-0 grayscale-[35%]"
                  src={osmSrc}
                />
              </div>
              <div className="flex justify-end">
                <a
                  href={gmapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-gold"
                >
                  Ouvrir dans Google Maps →
                </a>
              </div>
            </div>
          );
        })()}
      </section>
    </>
  );
}
