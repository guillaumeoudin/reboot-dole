import type { SoinPricingTable } from "@/data/soins";

type Props = {
  title: string;
  data: SoinPricingTable;
};

export function SoinPricingTable({ title, data }: Props) {
  const hasCure = data.rows.some((r) => r.cure);
  const cureLabel = data.rows.find((r) => r.cureLabel)?.cureLabel ?? "Cure";

  return (
    <section id="tarifs" className="scroll-mt-28 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="label-caps text-gold">Tarifs</p>
        <h2 className="mt-5 text-3xl text-foreground">
          Nos tarifs : {title}
        </h2>
        {data.intro && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {data.intro}
          </p>
        )}

        <div className="mt-8 border border-border">
          {/* En-tête */}
          <div
            className={`grid gap-x-4 border-b border-border bg-surface px-5 py-3 text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:px-6 ${
              hasCure ? "grid-cols-[1fr_auto_auto_auto]" : "grid-cols-[1fr_auto_auto]"
            }`}
          >
            <span>Prestation</span>
            <span className="text-right">Durée</span>
            <span className="text-right">Séance</span>
            {hasCure && <span className="text-right">{cureLabel}</span>}
          </div>

          {/* Lignes */}
          {data.rows.map((row) => (
            <div
              key={row.label}
              className={`grid gap-x-4 border-b border-border px-5 py-4 last:border-b-0 text-sm sm:px-6 ${
                hasCure ? "grid-cols-[1fr_auto_auto_auto]" : "grid-cols-[1fr_auto_auto]"
              }`}
            >
              <span className="text-foreground">{row.label}</span>
              <span className="text-right tabular-nums text-muted-foreground">
                {row.duree ?? "—"}
              </span>
              <span className="text-right tabular-nums text-foreground">{row.price}</span>
              {hasCure && (
                <span className="text-right tabular-nums text-gold">
                  {row.cure ?? "—"}
                </span>
              )}
            </div>
          ))}
        </div>

        {data.note && (
          <p className="mt-4 text-xs text-muted-foreground/60">{data.note}</p>
        )}
      </div>
    </section>
  );
}
