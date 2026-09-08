import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Reboot Dole" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PolitiqueConfidentialitePage,
});

function PolitiqueConfidentialitePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-foreground">Politique de confidentialité</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="label-caps mb-4 text-gold">Responsable du traitement</h2>
          <address className="space-y-1 not-italic">
            <p>Aline Gauthier, Reboot Dole</p>
            <p>7 rue Jacques de Molay, 39100 Dole</p>
            <p>contact@reboot-dole.fr</p>
          </address>
        </div>

        <div>
          <h2 className="label-caps mb-4 text-gold">Données collectées</h2>
          <h3 className="mb-2 text-foreground">Formulaire de contact</h3>
          <p>Lorsque vous utilisez le formulaire de contact, les données suivantes sont collectées :</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (facultatif)</li>
            <li>Objet de la demande (facultatif)</li>
            <li>Contenu du message</li>
          </ul>
          <p className="mt-3">
            <strong className="text-foreground">Finalité :</strong> répondre à votre demande de
            contact ou d'information.
          </p>
          <p className="mt-1">
            <strong className="text-foreground">Base légale :</strong> intérêt légitime (répondre à
            une demande entrante).
          </p>
          <p className="mt-3">
            Ces données sont transmises via Google Apps Script et enregistrées dans un Google Sheet
            accessible uniquement à Reboot Dole. Une notification email est envoyée à l'adresse
            interne du centre à chaque nouvelle soumission.
          </p>
          <p className="mt-3">
            <strong className="text-foreground">Sous-traitant :</strong> Google LLC (Google Apps
            Script, Google Sheets). Google peut traiter les données sur des serveurs situés hors de
            l'Union européenne. Google est soumis aux clauses contractuelles types approuvées par la
            Commission européenne.
          </p>
          <p className="mt-3">
            <strong className="text-foreground">Durée de conservation :</strong> les données du
            formulaire de contact sont conservées pour une durée maximale de 12 mois à compter de la
            dernière interaction, puis supprimées.
          </p>
        </div>

        <div>
          <h2 className="label-caps mb-4 text-gold">Droits des utilisateurs</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
            des droits suivants sur vos données personnelles :
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong className="text-foreground">Droit d'accès</strong> : obtenir une copie des données vous concernant</li>
            <li><strong className="text-foreground">Droit de rectification</strong> : corriger des données inexactes</li>
            <li><strong className="text-foreground">Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong className="text-foreground">Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits, contactez-nous à :{" "}
            <a href="mailto:contact@reboot-dole.fr" className="transition-colors hover:text-gold">
              contact@reboot-dole.fr
            </a>
          </p>
          <p className="mt-3">
            En cas de réclamation, vous pouvez contacter la CNIL :{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
              cnil.fr
            </a>
          </p>
        </div>

        <div>
          <h2 className="label-caps mb-4 text-gold">Cookies et traceurs</h2>
          <p>Ce site <strong className="text-foreground">n'utilise pas de cookies de tracking ou de mesure d'audience</strong>.</p>
          <p className="mt-3">
            Le seul élément stocké localement est votre préférence de thème (clair ou sombre),
            enregistrée dans le stockage local de votre navigateur (localStorage). Cette donnée ne
            quitte pas votre appareil et n'est pas transmise à un tiers.
          </p>
          <p className="mt-3">
            La carte intégrée sur la page Contact est fournie par{" "}
            <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
              OpenStreetMap
            </a>
            , qui n'utilise pas de cookies tiers.
          </p>
        </div>

        <div className="border-t border-border pt-6 text-xs text-muted-foreground/60">
          <p>Dernière mise à jour : 12 août 2026</p>
        </div>
      </div>
    </section>
  );
}
