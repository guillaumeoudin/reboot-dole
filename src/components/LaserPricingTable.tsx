import { useState, useRef, useEffect } from "react";
import { laserCategories, laserForfaits } from "@/data/laser-pricing";

type Tab = "Femme" | "Homme";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function LaserPricingTable() {
  const [tab, setTab] = useState<Tab>("Femme");
  const [selectedCat, setSelectedCat] = useState(laserCategories[0]!.label);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPing, setShowPing] = useState(true);
  const pingTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => { if (pingTimer.current) clearTimeout(pingTimer.current); }, []);

  function toggleDropdown() {
    if (!dropdownOpen) {
      // Ouverture : ping masqué immédiatement
      setShowPing(false);
      clearTimeout(pingTimer.current);
    } else {
      // Fermeture : ping reprend après 1.5s
      pingTimer.current = setTimeout(() => setShowPing(true), 1500);
    }
    setDropdownOpen((v) => !v);
  }

  const currentCat = (laserCategories.find((c) => c.label === selectedCat) ?? laserCategories[0])!;
  const rows = tab === "Femme" ? currentCat.femme : currentCat.homme;
  const forfaits = laserForfaits.filter((f) => f.profil === tab);

  /* Classe commune pour les boutons inactifs des deux sélecteurs */
  const inactiveBtn = "bg-gold/[0.07] text-muted-foreground hover:text-foreground hover:bg-gold/[0.12]";
  const activeBtn = "bg-gold/20 text-gold";

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="label-caps text-gold">Tarifs</p>
        <h2 className="mt-5 text-3xl text-foreground">
          Nos tarifs d'épilation laser par zone
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Sélectionnez votre profil et la zone souhaitée pour afficher les tarifs
          correspondants. Tous les tarifs sont TTC. La cure de 6 séances bénéficie d'une
          remise de 15 % par rapport à l'achat à l'unité. Un bilan est réalisé avant la
          première séance pour établir un devis adapté à votre situation.
        </p>

        {/* Sélecteur Femme / Homme */}
        <div className="mt-8 flex border border-border" role="tablist">
          {(["Femme", "Homme"] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`flex-1 cursor-pointer py-3 text-sm transition-colors ${
                tab === t ? activeBtn : inactiveBtn
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Mobile : accordion inline — évite tout problème de z-index / transparence */}
        <div className="sm:hidden">
          {/* Trigger */}
          <button
            onClick={toggleDropdown}
            className={`flex w-full cursor-pointer items-center justify-between border border-t-0 border-border px-4 py-3 text-sm transition-colors ${dropdownOpen ? activeBtn : inactiveBtn}`}
          >
            <span>{selectedCat}</span>
            {/* Ping sonar — visible uniquement quand la dropdown est fermée */}
            <span className="relative flex items-center justify-center">
              {showPing && !dropdownOpen && (
                <span className="absolute h-7 w-7 rounded-full bg-gold [animation:ping-fast_3s_ease-out_infinite]" />
              )}
              <span className={!dropdownOpen ? "motion-safe:animate-[cta-nudge_2.5s_ease-in-out_infinite]" : ""}>
                <ChevronDown open={dropdownOpen} />
              </span>
            </span>
          </button>

          {/* Liste inline — s'étend et pousse le contenu vers le bas */}
          <div
            className={`grid transition-all duration-200 ease-in-out ${
              dropdownOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              {laserCategories.filter((cat) => cat.label !== selectedCat).map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    setSelectedCat(cat.label);
                    setDropdownOpen(false);
                  }}
                  className={`w-full cursor-pointer border-x border-b border-border px-4 py-3 text-left text-sm transition-colors ${inactiveBtn}`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop : pills pleine largeur */}
        <div className="hidden border border-t-0 border-border sm:flex" role="tablist">
          {laserCategories.map((cat) => (
            <button
              key={cat.label}
              role="tab"
              aria-selected={selectedCat === cat.label}
              onClick={() => setSelectedCat(cat.label)}
              className={`flex-1 cursor-pointer border-r border-border px-2 py-3 text-xs last:border-r-0 transition-colors ${
                selectedCat === cat.label ? activeBtn : inactiveBtn
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
              className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border px-5 py-3 text-sm sm:px-6"
            >
              <span className="text-foreground">{row.zone}</span>
              <span className="text-right tabular-nums text-muted-foreground">{row.duree}</span>
              <span className="text-right tabular-nums text-foreground">{row.seance}</span>
              <span className="text-right tabular-nums text-gold">{row.cure6}</span>
            </div>
          ))}

          {/* Séparateur forfaits */}
          {forfaits.length > 0 && (
            <>
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border bg-surface px-5 py-3 text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:px-6">
                <span>Forfait</span>
                <span className="text-right">Durée</span>
                <span className="text-right">Séance</span>
                <span className="text-right">Cure 6</span>
              </div>
              {forfaits.map((f) => (
                <div
                  key={f.name}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b border-border px-5 py-3 text-sm last:border-b-0 sm:px-6"
                >
                  <span className="text-foreground">{f.name}</span>
                  <span className="text-right tabular-nums text-muted-foreground">{f.duree}</span>
                  <span className="text-right tabular-nums text-foreground">{f.seance}</span>
                  <span className="text-right tabular-nums text-gold">{f.cure6}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <p className="mt-6 text-xs text-muted-foreground/60">
          Version applicable au 1er octobre 2026. Prix TTC. Les durées sont indicatives
          selon la densité pilaire et la surface réelle de cabine.
        </p>
      </div>
    </section>
  );
}
