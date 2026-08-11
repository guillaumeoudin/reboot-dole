export const site = {
  name: "Reboot Dole",
  city: "Dole",
  region: "Jura",
  address: ["Reboot Dole", "7 rue Jacques de Molay", "39100 Dole, Jura"],
  phone: "06 77 59 24 50",
  phoneHref: "tel:+33677592450",
  email: "contact@reboot-dole.fr",
  booking: "https://www.planity.com/",
  whatsappHref: "/contact",
} as const;

export const navLinks = [
  { to: "/soins", label: "Soins" },
  { to: "/bien-etre", label: "Bien-être" },
  { to: "/concept", label: "Le concept" },
  { to: "/contact", label: "Contact" },
] as const;
