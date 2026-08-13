import { useInView } from "@/hooks/use-in-view";

interface RevealProps {
  children: React.ReactNode;
  /** Classes supplémentaires sur le wrapper div */
  className?: string;
  /** Délai avant l'animation (ms) — pour cascader les enfants d'une grille */
  delay?: number;
}

/**
 * Wrapper qui déclenche une animation rise-in quand l'élément entre dans le viewport.
 * État initial : invisible (opacity: 0, translateY: 14px) — défini en CSS.
 * prefers-reduced-motion : override CSS, aucune animation.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal-root${inView ? " reveal-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
