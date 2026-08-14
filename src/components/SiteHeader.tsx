import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandWordmark } from "@/components/BrandWordmark";
import logoMark from "@/assets/logo-reboot.jpg";

/** Linger après dé-hover normal. */
const HOVER_LINGER_MS = 500;
/** Linger après clic — doit couvrir la durée totale de la trace (~1.22s). */
const CLICK_LINGER_MS = 1400;

/** Lien de navigation avec animation de cadre prolongée au dé-hover et au clic.
 *  - dé-hover : classe --hovered maintenue 650ms pour laisser l'animation avancer.
 *  - clic : classe --hovered maintenue 1400ms pour laisser la trace se terminer
 *    avant que l'état actif (--active) ne prenne le relais. */
function NavLink({ link }: { link: { to: string; label: string } }) {
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <Link
      to={link.to}
      viewTransition
      className={`nav-link label-caps text-muted-foreground${hovered ? " nav-link--hovered" : ""}`}
      activeProps={{ className: "nav-link--active" }}
      activeOptions={link.to === "/" ? { exact: true } : undefined}
      onMouseEnter={() => {
        clearTimeout(timerRef.current);
        setHovered(true);
      }}
      onMouseLeave={() => {
        timerRef.current = setTimeout(() => setHovered(false), HOVER_LINGER_MS);
      }}
      onClick={() => {
        // Au clic, prolonger le linger pour que la trace se termine
        // avant que --active ne prenne le relais.
        clearTimeout(timerRef.current);
        setHovered(true);
        timerRef.current = setTimeout(() => setHovered(false), CLICK_LINGER_MS);
      }}
    >
      {link.label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 cta:flex cta:justify-between">
        <Link to="/" viewTransition className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoMark}
            alt=""
            width={44}
            height={44}
            decoding="async"
            className="size-11 shrink-0 rounded-full border border-gold/30 object-cover"
          />
          <BrandWordmark className="h-7 w-auto max-w-[9.5rem] sm:h-8 sm:max-w-none" />
        </Link>

        <nav className="hidden items-center gap-8 cta:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} link={link} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href={site.booking}
            target="_blank"
            rel="noreferrer noopener"
            className="group hidden items-center gap-3 bg-gold-cta px-5 py-3 text-sm font-medium tracking-wide text-gold-cta-foreground transition-colors hover:bg-gold-cta-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cta:inline-flex"
          >
            Réserver
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cta:hidden"
          >
            {/* Animated burger → X */}
            <span aria-hidden="true" className="flex size-4 flex-col justify-between">
              <span
                className={`h-0.5 w-full origin-center bg-current transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full origin-center bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav panel — animated with grid-template-rows trick (height: 0 → auto) */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out cta:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 border-t border-border bg-background">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="label-caps border-b border-border py-4 text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.booking}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center gap-3 bg-gold-cta px-5 py-3 text-sm font-medium tracking-wide text-gold-cta-foreground transition-colors hover:bg-gold-cta-soft"
            >
              Réserver un soin
              <span aria-hidden="true">→</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
