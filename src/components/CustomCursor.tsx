import { useEffect, useRef } from "react";

/** Facteur de lerp : plus petit = traîne plus longue. */
const LERP = 0.11;

/**
 * Curseur personnalisé — anneau doré qui suit la souris avec un léger retard élastique.
 * - Masqué sur les appareils tactiles (pointer: coarse).
 * - Animation via RAF + translate3d (GPU only, zéro reflow).
 * - Se comporte différemment sur les éléments interactifs (scale up + fill).
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    // Sur les éléments interactifs : l'anneau grossit légèrement
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [role='button'], label");
      ringRef.current?.classList.toggle("cursor-ring--active", !!el);
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("cursor-custom");
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-[300] will-change-transform"
    />
  );
}
