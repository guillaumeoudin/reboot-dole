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
  url: "https://reboot-dole.fr",
  address: ["Reboot Dole", "7 rue Jacques de Molay", "39100 Dole, Jura"],
  streetAddress: "7 rue Jacques de Molay",
  postalCode: "39100",
  countryCode: "FR",
  geo: { latitude: 47.090721, longitude: 5.489599 },
  priceRange: "40–250 €",
  phone: "06 77 59 24 50",
  phoneHref: "tel:+33677592450",
  email: "contact@reboot-dole.fr",
  /** Réservation de créneaux en ligne (plateforme externe). */
  booking: "https://www.planity.com/",
  whatsappHref: "/contact",
  social: {
    linkedin: "https://www.linkedin.com/company/reboot-dole/",
    instagram: "https://www.instagram.com/reboot_dole",
  },
} as const;

/** Horaires d'ouverture : affichés sur la page Contact et repris en JSON-LD. */
export const openingHours = [
  { day: "Lundi — Vendredi", value: "9h — 19h", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
  { day: "Samedi", value: "9h — 17h", days: ["Saturday"], opens: "09:00", closes: "17:00" },
  { day: "Dimanche", value: "Fermé", days: ["Sunday"], opens: null, closes: null },
] as const;

export const navLinks = [
  { to: "/soins", label: "Soins" },
  { to: "/bien-etre", label: "Bien-être" },
  { to: "/concept", label: "Le concept" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;
