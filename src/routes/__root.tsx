import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileCtaBar, WhatsAppFloat } from "@/components/MobileCtaBar";
import { HeroCtaProvider } from "@/contexts/hero-cta-context";
import { SplashScreen } from "@/components/SplashScreen";
import { localBusinessJsonLd } from "@/data/localBusiness";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="label-caps text-gold">404</p>
        <h1 className="mt-5 font-display text-4xl text-foreground">Cette page ne fait pas partie du protocole.</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Mais vous, si. Revenez à l'accueil.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold-cta px-6 py-3 text-sm font-medium text-gold-cta-foreground transition-colors hover:bg-gold-cta-soft"
          >
            Retour à l'accueil <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Manrope:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isMounted = useRef(false);

  // Restart l'animation clip-reveal sur tous les titres après chaque navigation SPA.
  // On saute le premier render (l'animation CSS démarre seule à l'insertion DOM).
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const els = document.querySelectorAll<HTMLElement>("h1, .heading-reveal");
    els.forEach((el) => {
      el.style.animation = "none";
      void el.offsetWidth; // force reflow — l'animation redémarre depuis from
      el.style.animation = "";
    });
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
    <HeroCtaProvider>
      {/* Texture de grain — élément DOM dédié pour pouvoir le figer via view-transition-name */}
      <div aria-hidden="true" className="grain-overlay" />
      {/* Splashscreen — une seule fois par session */}
      <SplashScreen />
      <div className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold-cta focus:px-4 focus:py-2 focus:text-sm focus:text-gold-cta-foreground"
        >
          Aller au contenu principal
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <MobileCtaBar />
      <WhatsAppFloat />
    </HeroCtaProvider>
    </QueryClientProvider>
  );
}

