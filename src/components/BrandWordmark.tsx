import logoLight from "@/assets/reboot-logo-light.png";
import logoDark from "@/assets/reboot-logo-dark.png";

/**
 * Wordmark "REBOOT". Deux fichiers : version marine pour le thème clair,
 * version blanche pour le thème sombre. Les deux sont rendus, seul le bon est
 * visible via le variant `dark` — pas de clignotement au changement de thème.
 */
export function BrandWordmark({
  className = "",
  loading = "eager",
}: {
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const shared = `object-contain ${className}`;

  return (
    <>
      <img
        src={logoLight}
        alt="Reboot Dole Jura"
        width={1242}
        height={209}
        loading={loading}
        decoding="async"
        className={`${shared} dark:hidden`}
      />
      <img
        src={logoDark}
        alt=""
        aria-hidden="true"
        width={1242}
        height={209}
        loading={loading}
        decoding="async"
        className={`hidden ${shared} dark:block`}
      />
    </>
  );
}