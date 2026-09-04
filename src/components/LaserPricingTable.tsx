import { useState } from "react";
import { laserCategories, laserForfaits } from "@/data/laser-pricing";

type Tab = "Femme" | "Homme";

export function LaserPricingTable() {
  const [tab, setTab] = useState<Tab>("Femme");
  const [selectedCat, setSelectedCat] = useState(laserCategories[0]!.label);

  const currentCat = (laserCategories.find((c) => c.label === selectedCat) ?? laserCategories[0])!;
  const rows = tab === "Femme" ? currentCat.femme : currentCat.homme;
  const forfaits = laserForfaits.filter((f) => f.profil === tab);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="label-caps text-gold">Tarifs</p>
        <h2 className="mt-5 text-3xl text-foreground">
          Nos tarifs d'épilation laser par zone
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tous les tarifs sont TTC. La cure de 6 séances bénéficie d'une remise de 15 %
          par rapport à l'achat à l'unité. Un bilan est réalisé avant la première séance
          pour établir un devis adapté à votre situation.
        </p>

        {/* Sélecteur Femme / Homme */}
        <div className="mt-8 flex border border-border" role="tablist">
          {(["Femme", "Homme"] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm transition-colors ${
                tab === t
                  ? "bg-gold/10 text-gold"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Sélecteur de catégorie — dropdown sur mobile, pills sur desktop */}

        {/* Mobile : <select> */}
        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="block w-full border border-t-0 border-border bg-surface px-4 py-3 text-sm text-foreground sm:hidden"
        >
          {laserCategories.map((cat) => (
            <option key={cat.label} value={cat.label}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Desktop : pills pleine largeur */}
        <div className="hidden border border-t-0 border-border sm:flex" role="tablist">
          {laserCategories.map((cat) => (
            <button
              key={cat.label}
              role="tab"
              aria-selected={selectedCat === cat.label}
              onClick={() => setSelectedCat(cat.label)}
              className={`flex-1 border-r border-border px-2 py-3 text-xs last:border-r-0 transition-colors ${
                selectedCat === cat.label
                  ? "bg-gold/10 text-gold"
                  : "bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tableau de tarifs */}
        <div className="border-x border-b border-border">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border bg-surface px-5 py-3 text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:px-6">
            <span>Zone</span>
            <span className="text-right">Durée</span>
            <span className="text-right">Séance</span>
            <span className="text-right">Cure 6</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.zone}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border px-5 py-3 text-sm last:border-b-0 sm:px-6"
            >
              <span className="text-foreground">{row.zone}</span>
              <span className="text-right tabular-nums text-muted-foreground">{row.duree}</span>
              <span className="text-right tabular-nums text-foreground">{row.seance}</span>
              <span className="text-right tabular-nums text-gold">{row.cure6}</span>
            </div>
          ))}
        </div>

        {/* Forfaits multi-zones */}
        {forfaits.length > 0 && (
          <div className="mt-8">
            <p className="label-caps text-gold-soft">Forfaits multi-zones</p>
            <div className="mt-4 border border-border">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border bg-surface px-5 py-3 text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:px-6">
                <span>Forfait</span>
                <span className="text-right">Durée</span>
                <span className="text-right">Séance</span>
                <span className="text-right">Cure 6</span>
              </div>
              {forfaits.map((f) => (
                <div
                  key={f.name}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border px-5 py-4 text-sm last:border-b-0 sm:px-6"
                >
                  <span className="text-foreground">{f.name}</span>
                  <span className="text-right tabular-nums text-muted-foreground">{f.duree}</span>
                  <span className="text-right tabular-nums text-foreground">{f.seance}</span>
                  <span className="text-right tabular-nums text-gold">{f.cure6}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground/60">
          Version applicable au 1er octobre 2026. Prix TTC. Les durées sont indicatives
          selon la densité pilaire et la surface réelle de cabine.
        </p>
      </div>
    </section>
  );
}
