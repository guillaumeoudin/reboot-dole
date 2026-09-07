import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { site } from "@/data/site";
import { ChatIcon } from "@/components/ChatIcon";
import { useHeroCta } from "@/contexts/hero-cta-context";

/**
 * La barre n'est affichée qu'après un scroll minimal (SCROLL_THRESHOLD px).
 * Fix gap Firefox bas d'écran : VisualViewport API ajuste `bottom` en temps
 * réel quand la toolbar du navigateur apparaît/disparaît.
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

/**
 * Synchronise `el.style.bottom` avec le décalage réel de la toolbar du
 * navigateur via l'API VisualViewport. Sans ça, Firefox mobile positionne
 * `bottom: 0` par rapport au layout viewport (derrière la toolbar).
 */
function useVisualViewportBottom(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv || !ref.current) return;

    const update = () => {
      if (!ref.current) return;
      // offset = hauteur entre bas du visual viewport et bas du layout viewport
      const offset = Math.max(0, window.innerHeight - vv.offsetTop - vv.height);
      ref.current.style.bottom = `${offset}px`;
    };

    vv.addEventListener("resize", update);
    update();
    return () => vv.removeEventListener("resize", update);
  }, [ref]);
}

/** Sticky mobile action bar: shown below the `cta` breakpoint (1080px). */
export function MobileCtaBar() {
  const scrolledPast = useScrolledPast(SCROLL_THRESHOLD);
  const { heroCtaVisible } = useHeroCta();
  const visible = scrolledPast && !heroCtaVisible;
  const barRef = useRef<HTMLDivElement>(null);
  useVisualViewportBottom(barRef);

  return (
    <div
      ref={barRef}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-[opacity,transform] duration-300 ease-out cta:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="mobile-cta pointer-events-none mx-auto flex max-w-md items-center justify-center gap-3 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)]">
        <a
          href={site.booking}
          target="_blank"
          rel="noreferrer noopener"
          className="book-btn pointer-events-auto flex h-12 flex-1 basis-0 items-center justify-center gap-2 border border-gold/70 bg-transparent text-sm font-medium text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="book-shimmer" aria-hidden="true" />
          Réserver
          <span aria-hidden="true">→</span>
        </a>
        <Link
          to="/contact"
          aria-label="Nous contacter"
          className="pointer-events-auto flex h-12 flex-1 basis-0 items-center justify-center gap-2 border border-gold/40 bg-surface text-sm font-medium tracking-wide text-surface-foreground shadow-lg shadow-black/20 transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ChatIcon className="size-4 shrink-0 text-gold" />
          Une question ?
        </Link>
      </div>
    </div>
  );
}

/** Floating contact pill: shown from the `cta` breakpoint (1080px) upwards. */
export function ContactFloat() {
  return (
    <Link
      to="/contact"
      aria-label="Nous contacter"
      title="Nous contacter"
      className="group fixed right-6 bottom-6 z-50 hidden max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-gold/25 bg-surface/95 p-2 pr-5 text-surface-foreground shadow-lg shadow-black/20 backdrop-blur transition-colors hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cta:inline-flex"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-cta text-gold-cta-foreground transition-transform group-hover:scale-105">
        <ChatIcon className="size-5" />
      </span>
      <span className="truncate text-sm tracking-wide">Une question ?</span>
    </Link>
  );
}
