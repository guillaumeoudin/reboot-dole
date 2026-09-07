/**
 * Source unique des informations du centre (NAP, horaires, réseaux, réservation).
 * Modifier ici met à jour le header, le footer, la page Contact, les données
 * structurées LocalBusiness et le sitemap. Voir README.md > "Contenu éditable".
 */
export const site = {
  name: "Reboot Dole",
  legalName: "Reboot Dole",
  city: "Dole",
  region: "Jura",
  url: "https://www.reboot-dole.fr",
  address: ["Reboot Dole", "7 rue Jacques de Molay", "39100 Dole, Jura"],
  streetAddress: "7 rue Jacques de Molay",
  postalCode: "39100",
  countryCode: "FR",
  geo: { latitude: 47.090721, longitude: 5.489599 },
  priceRange: "29–220 €",
  phone: "06 51 57 79 09",
  phoneHref: "tel:+33651577909",
  email: "contact@reboot-dole.fr",
  /** Réservation de créneaux en ligne (plateforme externe). */
  booking: "https://www.planity.com/",
  social: {
    linkedin: "https://www.linkedin.com/company/reboot-dole/",
    instagram: "https://www.instagram.com/reboot_dole",
  },
} as const;

/** Horaires d'ouverture : affichés sur la page Contact et repris en JSON-LD. */
export const openingHours = [
  { day: "Lundi — Vendredi", value: "9h30 — 12h", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "12:00" },
  { day: "", value: "13h30 — 18h", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:30", closes: "18:00" },
  { day: "Samedi — Dimanche", value: "Fermé", days: ["Saturday", "Sunday"], opens: null, closes: null },
] as const;

export const navLinks = [
  { to: "/soins", label: "Soins" },
  { to: "/bien-etre", label: "Bien-être" },
  { to: "/concept", label: "Le concept" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;
