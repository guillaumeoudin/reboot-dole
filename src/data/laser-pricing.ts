export type ZoneRow = {
  zone: string;
  duree: string;
  seance: string;
  cure6: string;
};

export type PricingCategory = {
  label: string;
  /** Label alternatif affiché dans l'onglet Femme */
  labelFemme?: string;
  femme: ZoneRow[];
  homme: ZoneRow[];
};

export type LaserForfait = {
  name: string;
  profil: "Femme" | "Homme";
  duree: string;
  seance: string;
  cure6: string;
};

export const laserCategories: PricingCategory[] = [
  {
    label: "Visage et cou",
    femme: [
      { zone: "Sourcils",               duree: "5 min",      seance: "29 €",  cure6: "150 €" },
      { zone: "Oreilles",               duree: "5 min",      seance: "29 €",  cure6: "150 €" },
      { zone: "Lèvre supérieure",       duree: "5 min",      seance: "39 €",  cure6: "200 €" },
      { zone: "Menton",                 duree: "5 min",      seance: "45 €",  cure6: "230 €" },
      { zone: "Nuque",                  duree: "10 min",     seance: "49 €",  cure6: "250 €" },
    ],
    homme: [
      { zone: "Sourcils",               duree: "5 min",      seance: "29 €",  cure6: "150 €" },
      { zone: "Oreilles",               duree: "5 min",      seance: "29 €",  cure6: "150 €" },
      { zone: "Moustache",              duree: "5 min",      seance: "29 €",  cure6: "150 €" },
      { zone: "Menton",                 duree: "5 min",      seance: "45 €",  cure6: "230 €" },
      { zone: "Nuque",                  duree: "10 min",     seance: "49 €",  cure6: "250 €" },
      { zone: "Barbe (joues et cou)",   duree: "20 min",     seance: "99 €",  cure6: "505 €" },
    ],
  },
  {
    label: "Aisselles et bras",
    femme: [
      { zone: "Mains",                  duree: "5 min",      seance: "39 €",  cure6: "200 €" },
      { zone: "Aisselles",              duree: "10–15 min",  seance: "49 €",  cure6: "250 €" },
      { zone: "Demi-bras",              duree: "15 min",     seance: "55 €",  cure6: "280 €" },
      { zone: "Épaules",                duree: "10–15 min",  seance: "59 €",  cure6: "300 €" },
      { zone: "Bras entiers",           duree: "20 min",     seance: "85 €",  cure6: "435 €" },
    ],
    homme: [
      { zone: "Mains",                  duree: "5 min",      seance: "39 €",  cure6: "200 €" },
      { zone: "Aisselles",              duree: "10–15 min",  seance: "49 €",  cure6: "250 €" },
      { zone: "Demi-bras",              duree: "15 min",     seance: "59 €",  cure6: "300 €" },
      { zone: "Épaules",                duree: "10–15 min",  seance: "69 €",  cure6: "350 €" },
      { zone: "Bras entiers",           duree: "20 min",     seance: "99 €",  cure6: "505 €" },
    ],
  },
  {
    label: "Jambes",
    femme: [
      { zone: "Genoux",                 duree: "10 min",     seance: "39 €",   cure6: "200 €"   },
      { zone: "Pieds",                  duree: "5 min",      seance: "39 €",   cure6: "200 €"   },
      { zone: "Demi-jambes",            duree: "30 min",     seance: "105 €",  cure6: "535 €"   },
      { zone: "Cuisses",                duree: "30 min",     seance: "119 €",  cure6: "605 €"   },
      { zone: "Jambes entières",        duree: "60 min",     seance: "180 €",  cure6: "920 €"   },
    ],
    homme: [
      { zone: "Genoux",                 duree: "10 min",     seance: "39 €",   cure6: "200 €"   },
      { zone: "Pieds",                  duree: "5 min",      seance: "39 €",   cure6: "200 €"   },
      { zone: "Demi-jambes",            duree: "30 min",     seance: "129 €",  cure6: "660 €"   },
      { zone: "Cuisses",                duree: "30 min",     seance: "149 €",  cure6: "760 €"   },
      { zone: "Jambes entières",        duree: "60 min",     seance: "219 €",  cure6: "1 115 €" },
    ],
  },
  {
    label: "Zone intime",
    femme: [
      { zone: "Sillon inter-fessier",        duree: "5 min",   seance: "29 €",  cure6: "150 €" },
      { zone: "Maillot classique",            duree: "20 min",  seance: "49 €",  cure6: "250 €" },
      { zone: "Maillot échancré",             duree: "30 min",  seance: "69 €",  cure6: "350 €" },
      { zone: "Maillot intégral / brésilien", duree: "30 min",  seance: "79 €",  cure6: "405 €" },
      { zone: "Fesses",                       duree: "20 min",  seance: "99 €",  cure6: "505 €" },
    ],
    homme: [
      { zone: "Sillon inter-fessier", duree: "5 min",   seance: "39 €",  cure6: "200 €" },
      { zone: "Pubis partiel",        duree: "20 min",  seance: "59 €",  cure6: "300 €" },
      { zone: "Pubis intégral",       duree: "30 min",  seance: "89 €",  cure6: "455 €" },
      { zone: "Fesses",               duree: "20 min",  seance: "99 €",  cure6: "505 €" },
    ],
  },
  {
    label: "Torse et dos",
    labelFemme: "Poitrine et dos",
    femme: [
      { zone: "V de chemise",             duree: "10 min",  seance: "29 €",   cure6: "150 €"  },
      { zone: "Aréoles",                  duree: "5 min",   seance: "39 €",   cure6: "200 €"  },
      { zone: "Flancs",                   duree: "10 min",  seance: "29 €",   cure6: "150 €"  },
      { zone: "Ligne ventre",             duree: "10 min",  seance: "59 €",   cure6: "300 €"  },
      { zone: "Abdomen",                  duree: "15 min",  seance: "99 €",   cure6: "505 €"  },
      { zone: "Bas du dos",               duree: "15 min",  seance: "69 €",   cure6: "350 €"  },
      { zone: "Milieu du dos",            duree: "15 min",  seance: "69 €",   cure6: "350 €"  },
      { zone: "Haut du dos",              duree: "15 min",  seance: "89 €",   cure6: "455 €"  },
      { zone: "Dos complet",              duree: "40 min",  seance: "195 €",  cure6: "995 €"  },
    ],
    homme: [
      { zone: "V de chemise",             duree: "10 min",  seance: "29 €",   cure6: "150 €"  },
      { zone: "Aréoles",                  duree: "5 min",   seance: "39 €",   cure6: "200 €"  },
      { zone: "Flancs",                   duree: "10 min",  seance: "29 €",   cure6: "150 €"  },
      { zone: "Ligne ventre",             duree: "10 min",  seance: "59 €",   cure6: "300 €"  },
      { zone: "Abdomen",                  duree: "15 min",  seance: "99 €",   cure6: "505 €"  },
      { zone: "Torse complet",            duree: "20 min",  seance: "119 €",  cure6: "605 €"  },
      { zone: "Bas du dos",               duree: "15 min",  seance: "69 €",   cure6: "350 €"  },
      { zone: "Milieu du dos",            duree: "15 min",  seance: "69 €",   cure6: "350 €"  },
      { zone: "Haut du dos",              duree: "15 min",  seance: "89 €",   cure6: "455 €"  },
      { zone: "Dos complet",              duree: "40 min",  seance: "195 €",  cure6: "995 €"  },
    ],
  },
];

export const laserForfaits: LaserForfait[] = [
  {
    name: "Duo Zen — Aisselles + maillot classique",
    profil: "Femme",
    duree: "30 min",
    seance: "75 €",
    cure6: "380 €",
  },
  {
    name: "Trio Référence — Aisselles + maillot échancré + demi-jambes",
    profil: "Femme",
    duree: "60 min",
    seance: "195 €",
    cure6: "995 €",
  },
  {
    name: "Duo Confort — Pubis intégral + sillon inter-fessier",
    profil: "Homme",
    duree: "35 min",
    seance: "115 €",
    cure6: "585 €",
  },
  {
    name: "Trio Silhouette — Torse complet + abdomen + dos complet",
    profil: "Homme",
    duree: "75 min",
    seance: "365 €",
    cure6: "1 860 €",
  },
];
