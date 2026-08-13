import { useState, useEffect } from "react";
import logoMark from "@/assets/logo-reboot.jpg";
import logoDark from "@/assets/reboot-logo-dark.png";

const SESSION_KEY = "reboot_splash_shown";

type Phase = "check" | "visible" | "exiting" | "done";

/**
 * Splashscreen d'entrée — logo animé centré sur fond encre.
 * Ne s'affiche qu'une seule fois par session (sessionStorage).
 * SSR-safe : phase initiale "check" → overlay invisible → useEffect décide.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("check");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("done");
      return;
    }

    // Première visite : afficher le splash
    setPhase("visible");

    const exitTimer = setTimeout(() => setPhase("exiting"), 2000);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 2750);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  const overlayClass = [
    "fixed inset-0 z-[200] flex items-center justify-center bg-ink",
    phase === "exiting"
      ? "opacity-0 pointer-events-none transition-opacity duration-700 ease-in-out"
      : phase === "check"
        ? "opacity-0 pointer-events-none"
        : "opacity-100",
  ].join(" ");

  return (
    <div aria-hidden="true" className={overlayClass}>
      <div className="flex flex-col items-center gap-7">
        {/* Logo + ring ripple */}
        <div className="relative flex items-center justify-center">
          {/* Ring qui part en ripple depuis le logo */}
          <span className="splash-ripple absolute inset-0 rounded-full border border-gold/50" />
          <img
            src={logoMark}
            alt="Reboot"
            width={96}
            height={96}
            className="splash-logo relative size-24 rounded-full border-2 border-gold/30 object-cover"
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
