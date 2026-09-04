import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { laserCategories, laserForfaits, type ZoneRow } from "@/data/laser-pricing";

type Tab = "Femme" | "Homme";

function ZoneTable({ rows }: { rows: ZoneRow[] }) {
  return (
    <div className="mt-1">
      {/* En-tête colonne */}
      <div className="mb-1 grid grid-cols-[1fr_auto_auto_auto] gap-x-4 px-1 text-[10px] uppercase tracking-widest text-muted-foreground/60">
        <span>Zone</span>
        <span className="text-right">Durée</span>
        <span className="text-right">Séance</span>
        <span className="text-right">Cure 6</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.zone}
          className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-t border-border px-1 py-3 text-sm"
        >
          <span className="text-foreground">{row.zone}</span>
          <span className="text-right tabular-nums text-muted-foreground">{row.duree}</span>
          <span className="text-right tabular-nums text-foreground">{row.seance}</span>
          <span className="text-right tabular-nums text-gold">{row.cure6}</span>
        </div>
      ))}
    </div>
  );
}

export function LaserPricingTable() {
  const [tab, setTab] = useState<Tab>("Femme");

  const forfaitsFiltres = laserForfaits.filter((f) => f.profil === tab);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="label-caps text-gold">Tarifs</p>
        <h2 className="mt-5 text-3xl text-foreground">
          Nos tarifs d'épilation laser par zone
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tous les tarifs sont TTC. La cure de 6 séances bénéficie d'une remise de 15 %
          par rapport à l'achat à l'unité. Un bilan est réalisé avant la première
          séance pour établir un devis adapté à votre situation.
        </p>

        {/* Onglets Femme / Homme */}
        <div className="mt-8 flex gap-0 border border-border" role="tablist">
          {(["Femme", "Homme"] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-gold/10 text-gold"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Accordéons par catégorie */}
        <Accordion type="multiple" className="mt-0 border-x border-border">
          {laserCategories.map((cat) => {
            const rows = tab === "Femme" ? cat.femme : cat.homme;
            if (rows.length === 0) return null;
            return (
              <AccordionItem
                key={cat.label}
                value={cat.label}
                className="border-b border-border px-5 sm:px-6"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:text-gold hover:no-underline">
                  {cat.label}
                  <span className="ml-auto mr-3 text-xs text-muted-foreground">
                    {rows.length} zone{rows.length > 1 ? "s" : ""}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ZoneTable rows={rows} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Forfaits multi-zones */}
        {forfaitsFiltres.length > 0 && (
          <div className="mt-8">
            <p className="label-caps text-gold-soft">Forfaits multi-zones</p>
            <div className="mt-4 border border-border">
              {/* En-tête */}
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border bg-surface px-5 py-3 text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:px-6">
                <span>Forfait</span>
                <span className="text-right">Durée</span>
                <span className="text-right">Séance</span>
                <span className="text-right">Cure 6</span>
              </div>
              {forfaitsFiltres.map((f) => (
                <div
                  key={f.name}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border px-5 py-4 last:border-b-0 sm:px-6"
                >
                  <span className="text-sm text-foreground">{f.name}</span>
                  <span className="text-right text-sm tabular-nums text-muted-foreground">
                    {f.duree}
                  </span>
                  <span className="text-right text-sm tabular-nums text-foreground">
                    {f.seance}
                  </span>
                  <span className="text-right text-sm tabular-nums text-gold">{f.cure6}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground/60">
          Version applicable au 1er octobre 2026. Prix TTC. Les durées sont indicatives,
          selon la densité pilaire et la surface réelle de cabine.
        </p>
      </div>
    </section>
  );
}
