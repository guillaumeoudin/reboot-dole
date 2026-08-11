import { Link } from "@tanstack/react-router";

import { navLinks, site } from "@/data/site";
import { BrandWordmark } from "@/components/BrandWordmark";
import logoMark from "@/assets/logo-reboot.jpg";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface text-surface-foreground">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-32 sm:px-8 cta:pb-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={logoMark}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="size-11 shrink-0 rounded-full border border-gold/30 object-cover"
              />
              <BrandWordmark
                loading="lazy"
                className="h-7 w-auto max-w-[9.5rem] sm:h-8 sm:max-w-none"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Centre de soins technico-esthétiques et de longévité à {site.city}, au cœur du{" "}
              {site.region}.
            </p>
          </div>

          <div>
            <p className="label-caps text-gold">Navigation</p>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps text-gold">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {site.address.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-gold">
                  Discuter sur WhatsApp
                </Link>
              </li>
            </ul>
            <p className="label-caps mt-8 text-gold">Suivez-nous</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-gold"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-12" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Reboot {site.city}. Tous droits réservés.</p>
          <a
            href={site.booking}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-gold"
          >
            Réservation en ligne
          </a>
        </div>
      </div>
    </footer>
  );
}
