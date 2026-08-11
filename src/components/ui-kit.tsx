import { site } from "@/data/site";

type Props = {
  label?: string;
  className?: string;
};

const base =
  "group items-center gap-3 bg-gold-cta text-sm font-medium tracking-wide text-gold-cta-foreground transition-colors hover:bg-gold-cta-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function BookButton({ label = "Réserver un soin", className }: Props) {
  return (
    <a
      href={site.booking}
      target="_blank"
      rel="noreferrer noopener"
      className={`${base} ${className ?? "inline-flex px-6 py-3.5"}`}
    >
      {label}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export function EyebrowHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-3xl">
      <p className="label-caps text-gold">
        <span
          aria-hidden="true"
          className="mr-3 inline-block h-px w-6 translate-y-[-3px] bg-gold align-middle"
        />
        {eyebrow}
      </p>
      <Tag className="mt-5 text-3xl leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {intro ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  );
}

export function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a
      href={to}
      className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function SpecList({
  items,
  padding = "p-5",
}: {
  items: { term: string; value: string }[];
  padding?: string;
}) {
  return (
    <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.term} className={`bg-background ${padding}`}>
          <dt className="label-caps text-gold-soft">{item.term}</dt>
          <dd className="mt-2 text-sm text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
