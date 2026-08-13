import { useEffect, useRef, useState } from "react";

interface Options {
  /** Déclenche une seule fois (default: true) */
  once?: boolean;
  /** Fraction de l'élément visible pour déclencher (default: 0.08) */
  threshold?: number;
  /** Retrait du bas du viewport — préfère animer avant le bord inférieur (default: "-60px") */
  rootMargin?: string;
}

/**
 * Retourne [ref, inView].
 * Attacher ref à un élément DOM ; inView passe true quand il entre dans le viewport.
 * Fallback SSR : inView = true immédiatement (IntersectionObserver absent côté serveur).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): [React.RefObject<T | null>, boolean] {
  const { once = true, threshold = 0.08, rootMargin = "0px 0px -60px 0px" } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}
