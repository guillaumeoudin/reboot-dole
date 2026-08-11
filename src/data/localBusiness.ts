import { openingHours, site } from "@/data/site";

/**
 * Données structurées schema.org du centre (JSON-LD injecté sur toutes les pages
 * depuis src/routes/__root.tsx). Les valeurs proviennent de src/data/site.ts :
 * ne rien saisir en double ici.
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${site.url}/#localbusiness`,
  name: site.name,
  legalName: site.legalName,
  description:
    "Centre de soins technico-esthétiques et de longévité à Dole, dans le Jura : épilation laser, cryolipolyse, peeling, microneedling et accompagnement bien-être.",
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: site.priceRange,
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.streetAddress,
    addressLocality: site.city,
    postalCode: site.postalCode,
    addressRegion: site.region,
    addressCountry: site.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  areaServed: [
    { "@type": "City", name: "Dole" },
    { "@type": "AdministrativeArea", name: "Jura" },
  ],
  openingHoursSpecification: openingHours
    .filter((row) => row.opens && row.closes)
    .map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
    })),
  sameAs: [site.social.instagram, site.social.linkedin],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: site.booking,
      inLanguage: "fr-FR",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Réservation d'un soin" },
  },
};