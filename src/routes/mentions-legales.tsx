import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Reboot Dole" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-foreground">Mentions légales</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="label-caps mb-4 text-gold">Éditeur du site</h2>
          <p>Le site reboot-dole.fr est édité par :</p>
          <address className="mt-3 space-y-1 not-italic">
            <p><strong className="text-foreground">Reboot</strong></p>
            <p>Forme juridique : SAS</p>
            <p>SIRET : 10811273100014</p>
            <p>Capital social : 1 000 €</p>
            <p>RCS Lons-le-Saunier 108 112 731</p>
            <p>Siège social : 7 rue Jacques de Molay, 39100 Dole</p>
            <p>Téléphone : 06 51 57 79 09</p>
            <p>Email : contact@reboot-dole.fr</p>
          </address>
          <p className="mt-3">Directeur de la publication : Aline Gauthier</p>
        </div>

        <div>
          <h2 className="label-caps mb-4 text-gold">Hébergement</h2>
          <address className="space-y-1 not-italic">
            <p><strong className="text-foreground">Vercel Inc.</strong></p>
            <p>340 Pine Street, Suite 701</p>
            <p>San Francisco, CA 94104 — États-Unis</p>
            <p>
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                vercel.com
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="label-caps mb-4 text-gold">Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, logotypes, visuels) est la propriété
            exclusive de Reboot Dole ou de ses ayants droit, et est protégé par les lois françaises
            et internationales relatives à la propriété intellectuelle.
          </p>
          <p className="mt-3">
            Toute reproduction, représentation, modification ou exploitation, totale ou partielle,
            est interdite sans autorisation préalable écrite de Reboot Dole.
          </p>
        </div>
      </div>
    </section>
  );
}
