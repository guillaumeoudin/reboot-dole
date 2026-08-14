import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { useHeroCta } from "@/contexts/hero-cta-context";

type Props = {
  label?: string;
  className?: string;
};

const ghostBook =
  "book-btn group items-center gap-3 border border-gold/70 bg-transparent text-sm font-medium text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function BookButton({ label = "Réserver un soin", className }: Props) {
  return (
    <a
      href={site.booking}
      target="_blank"
      rel="noreferrer noopener"
      className={`${ghostBook} ${className ?? "inline-flex px-6 py-3.5"}`}
    >
      <span className="book-shimmer" aria-hidden="true" />
      {label}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/**
 * Variante hero du bouton de réservation.
 * Observe sa propre visibilité via IntersectionObserver et met à jour
 * HeroCtaContext — MobileCtaBar se masque automatiquement quand ce bouton
 * est visible, évitant toute redondance de CTAs à l'écran.
 */
export function HeroBookButton({ label = "Réserver un soin", className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { setHeroCtaVisible } = useHeroCta();

  useEffect(() => {
    const el = ref.current;
    // Reset à chaque navigation (montage du composant sur une nouvelle page)
    setHeroCtaVisible(false);
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      setHeroCtaVisible(false);
    };
  }, [setHeroCtaVisible]);

  return (
    <a
      ref={ref}
      href={site.booking}
      target="_blank"
      rel="noreferrer noopener"
      className={`hero-book-btn ${ghostBook} ${className ?? "inline-flex px-6 py-3.5"}`}
    >
      <span className="book-shimmer" aria-hidden="true" />
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
  stagger = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  /** Active le stagger d'entrée : eyebrow (0ms) → titre (clip-reveal) → intro (280ms). */
  stagger?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`${stagger ? "rise-in " : ""}label-caps text-gold`}
        style={stagger ? ({ "--rise-delay": "0ms" } as React.CSSProperties) : undefined}
      >
        <span
          aria-hidden="true"
          className="mr-3 inline-block h-px w-6 translate-y-[-3px] bg-gold align-middle"
        />
        {eyebrow}
      </p>
      <Tag className="heading-reveal mt-5 text-3xl leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {intro ? (
        <p
          className={`${stagger ? "rise-in " : ""}mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground`}
          style={stagger ? ({ "--rise-delay": "280ms" } as React.CSSProperties) : undefined}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      viewTransition
      className="inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm text-foreground transition-colors hover:border-gold hover:text-gold"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
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
