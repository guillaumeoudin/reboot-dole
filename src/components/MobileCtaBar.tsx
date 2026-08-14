import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useHeroCta } from "@/contexts/hero-cta-context";

/**
 * La barre n'est affichée qu'après un scroll minimal (SCROLL_THRESHOLD px).
 *
 * Pourquoi : sur Firefox mobile, `position: fixed; bottom: 0` est calculé par
 * rapport au layout viewport, qui inclut la barre d'adresse du navigateur.
 * Au sommet de la page (barre visible), l'élément apparaît avec une grande
 * marge. En scrollant (barre cachée), il "tombe" vers le bas → effet disgracieux.
 *
 * En attendant un scroll minimal, la toolbar Firefox a déjà disparu quand la
 * barre apparaît → position stable et cohérente. C'est aussi un meilleur
 * pattern UX : le CTA Réserver du hero est visible en haut, la barre sticky
 * n'est utile qu'une fois que l'utilisateur a commencé à explorer.
 */
const SCROLL_THRESHOLD = 50;

function useScrolledPast(threshold: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const update = () => setPast(window.scrollY > threshold);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return past;
}

/** Sticky mobile action bar: shown below the `cta` breakpoint (1080px). */
export function MobileCtaBar() {
  const scrolledPast = useScrolledPast(SCROLL_THRESHOLD);
  const { heroCtaVisible } = useHeroCta();
  // Visible uniquement si scrollé + aucun bouton hero en vue (jamais les deux à l'écran)
  const visible = scrolledPast && !heroCtaVisible;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-[opacity,transform] duration-300 ease-out cta:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-none mx-auto flex max-w-md items-center justify-center gap-3 px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <a
          href={site.booking}
          target="_blank"
          rel="noreferrer noopener"
          className="pointer-events-auto flex h-12 flex-1 basis-0 items-center justify-center gap-2 bg-gold-cta text-sm font-medium tracking-wide text-gold-cta-foreground shadow-lg shadow-black/20 transition-colors hover:bg-gold-cta-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Réserver
          <span aria-hidden="true">→</span>
        </a>
        <Link
          to="/contact"
          aria-label="Discuter sur WhatsApp"
          className="pointer-events-auto flex h-12 flex-1 basis-0 items-center justify-center gap-2 border border-gold/40 bg-surface text-sm font-medium tracking-wide text-surface-foreground shadow-lg shadow-black/20 transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <WhatsAppIcon className="size-4 shrink-0 text-gold" />
          Une question ?
        </Link>
      </div>
    </div>
  );
}

/** Floating WhatsApp pill: shown from the `cta` breakpoint (1080px) upwards. */
export function WhatsAppFloat() {
  return (
    <Link
      to="/contact"
      aria-label="Discuter sur WhatsApp"
      title="Discuter sur WhatsApp"
      className="group fixed right-6 bottom-6 z-50 hidden max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-gold/25 bg-surface/95 p-2 pr-5 text-surface-foreground shadow-lg shadow-black/20 backdrop-blur transition-colors hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cta:inline-flex"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-cta text-gold-cta-foreground transition-transform group-hover:scale-105">
        <WhatsAppIcon className="size-5" />
      </span>
      <span className="truncate text-sm tracking-wide">Une question ?</span>
    </Link>
  );
}
