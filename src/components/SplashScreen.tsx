import { useState, useLayoutEffect, useEffect } from "react";
import logoMark from "@/assets/logo-reboot.jpg";
import logoDark from "@/assets/reboot-logo-dark.png";

const SESSION_KEY = "reboot_splash_shown";

type Phase = "visible" | "exiting" | "done";

/**
 * useLayoutEffect côté client (fire synchrone avant le premier paint),
 * useEffect côté serveur (no-op, SSR ne les exécute pas de toute façon).
 * Nécessaire pour éviter le blink : sur retour de visite, on supprime
 * l'overlay AVANT que le navigateur peigne la première frame.
 */
const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Splashscreen d'entrée — logo animé centré sur fond encre.
 * - Première visite : overlay visible dès le premier paint, animé, disparaît à 2s.
 * - Visites suivantes (même session) : overlay retiré avant le premier paint, zéro flash.
 */
export function SplashScreen() {
  // Démarre "visible" : le serveur génère l'overlay opaque dans le HTML,
  // ce qui bloque le contenu dès le premier paint sur première visite.
  const [phase, setPhase] = useState<Phase>("visible");

  useSafeLayoutEffect(() => {
    // Visiteur de retour : on corrige l'état avant que le navigateur peigne.
    // setState dans useLayoutEffect est flushé de façon synchrone → zéro flash.
    const alreadySeen = (() => {
      try { return !!sessionStorage.getItem(SESSION_KEY); } catch { return false; }
    })();

    if (alreadySeen) {
      setPhase("done");
      return;
    }

    // Première visite : laisser jouer l'animation puis partir.
    const exitTimer = setTimeout(() => setPhase("exiting"), 2000);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* rien */ }
    }, 2750);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "fixed inset-0 z-[200] flex items-center justify-center bg-ink",
        phase === "exiting"
          ? "pointer-events-none opacity-0 transition-opacity duration-700 ease-in-out"
          : "opacity-100",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-7">
        {/* Logo + ring ripple */}
        <div className="relative flex items-center justify-center">
          <span className="splash-ripple absolute inset-0 rounded-full border border-gold/50" />
          <img
            src={logoMark}
            alt="Reboot"
            width={144}
            height={144}
            className="splash-logo relative size-36 rounded-full border-2 border-gold/30 object-cover"
          />
        </div>

        {/* Wordmark */}
        <img
          src={logoDark}
          alt="Reboot Dole Jura"
          width={1242}
          height={209}
          className="splash-wordmark w-44 object-contain"
        />
      </div>
    </div>
  );
}
