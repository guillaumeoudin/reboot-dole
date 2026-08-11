import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import logoMark from "@/assets/logo-reboot-BdQvYD6B.jpg";
import logoWordmark from "@/assets/reboot-logo-dark-73ZHWu5H.png";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 cta:flex cta:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoMark}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full border border-gold/30 object-cover"
          />
          <img
            src={logoWordmark}
            alt="Reboot Dole Jura"
            width={1242}
            height={209}
            className="h-7 w-auto max-w-[9.5rem] object-contain sm:h-8 sm:max-w-none"
          />
        </Link>

        <nav className="hidden items-center gap-8 cta:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="label-caps text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
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
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cta:hidden"
          >
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background cta:hidden">
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
      ) : null}
    </header>
  );
}
