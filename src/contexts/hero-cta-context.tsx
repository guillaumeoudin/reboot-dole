import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Indique si un <HeroBookButton> est actuellement visible dans le viewport.
 * Utilisé par MobileCtaBar pour masquer la barre sticky quand le bouton hero
 * est déjà visible — les deux CTAs ne coexistent jamais à l'écran.
 */
interface HeroCtaContextValue {
  heroCtaVisible: boolean;
  setHeroCtaVisible: (v: boolean) => void;
}

const HeroCtaContext = createContext<HeroCtaContextValue>({
  heroCtaVisible: false,
  setHeroCtaVisible: () => {},
});

export function HeroCtaProvider({ children }: { children: ReactNode }) {
  const [heroCtaVisible, setHeroCtaVisible] = useState(false);
  return (
    <HeroCtaContext.Provider value={{ heroCtaVisible, setHeroCtaVisible }}>
      {children}
    </HeroCtaContext.Provider>
  );
}

export function useHeroCta() {
  return useContext(HeroCtaContext);
}
