import soinLaser from "@/assets/soin-laser-KCT2h3Zi.jpg";
import soinCryolipolyse from "@/assets/soin-cryolipolyse-Bud8cgER.jpg";
import soinPeeling from "@/assets/soin-peeling-CSPstEV_.jpg";
import soinMicroneedling from "@/assets/soin-microneedling-DcKAeoVg.jpg";

export type Soin = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  short: string;
  long: string;
  duration: string;
  sessions: string;
  price: string;
  priceFrom: string;
  image: string;
  imageAlt: string;
  indications: string[];
  aftercare: string[];
  metaTitle: string;
  metaDescription: string;
};

export const soins: Soin[] = [
  {
    slug: "epilation-laser",
    index: "01",
    title: "Épilation laser",
    tagline: "Une peau nette, durablement.",
    short:
      "Élimination progressive et sûre du poil sur toutes les zones du corps et du visage.",
    long: "Nous utilisons une technologie laser de dernière génération, adaptée à tous les phototypes. Le faisceau cible le pigment du poil sans agresser la peau environnante, pour un résultat progressif, précis et durable.",
    duration: "15 à 60 min selon la zone",
    sessions: "8 à 10 séances espacées de 4 à 8 semaines",
    price: "à partir de 40 €",
    priceFrom: "à partir de 40 €",
    image: soinLaser,
    imageAlt: "Pièce à main de laser d'épilation dans un cadre clinique",
    indications: [
      "Toutes zones, corps et visage",
      "Tous phototypes après bilan",
      "Poils foncés à châtains",
    ],
    aftercare: [
      "Pas d'exposition solaire 15 jours avant et après",
      "Crème apaisante les 48 premières heures",
      "Rasage de la zone la veille de la séance",
    ],
    metaTitle: "Épilation laser à Dole — Reboot",
    metaDescription:
      "Une peau nette, durablement. Élimination progressive et sûre du poil sur toutes les zones du corps et du visage.",
  },
  {
    slug: "cryolipolyse",
    index: "02",
    title: "Cryolipolyse",
    tagline: "Cibler les amas graisseux localisés.",
    short:
      "Destruction ciblée des cellules graisseuses par le froid, sans chirurgie ni éviction.",
    long: "La cryolipolyse expose les adipocytes à un froid contrôlé qui les détruit sélectivement. Ils sont ensuite éliminés naturellement par l'organisme, sur 6 à 12 semaines, pour un remodelage progressif.",
    duration: "45 à 70 min par zone",
    sessions: "1 à 3 séances espacées de 6 à 8 semaines",
    price: "à partir de 250 €",
    priceFrom: "à partir de 250 €",
    image: soinCryolipolyse,
    imageAlt: "Cristaux de givre évoquant le froid contrôlé de la cryolipolyse",
    indications: [
      "Amas graisseux localisés et résistants",
      "Ventre, flancs, cuisses, bras",
      "Poids stable, pas de surpoids important",
    ],
    aftercare: [
      "Massage de la zone les jours suivants",
      "Hydratation renforcée",
      "Résultat visible sur 6 à 12 semaines",
    ],
    metaTitle: "Cryolipolyse à Dole — Reboot",
    metaDescription:
      "Cibler les amas graisseux localisés. Destruction ciblée des cellules graisseuses par le froid, sans chirurgie ni éviction.",
  },
  {
    slug: "peeling",
    index: "03",
    title: "Peeling",
    tagline: "Renouveler l'éclat de la peau.",
    short:
      "Exfoliation contrôlée pour raviver le teint, lisser le grain de peau et estomper les tâches.",
    long: "Nous formulons des peelings superficiels à moyens (acides de fruits, salicylique, TCA doux) adaptés à votre type de peau et à votre objectif : éclat, taches, pores dilatés, marques d'acné.",
    duration: "30 à 45 min",
    sessions: "Cure de 3 à 5 séances",
    price: "à partir de 95 €",
    priceFrom: "à partir de 95 €",
    image: soinPeeling,
    imageAlt: "Goutte de sérum de peeling professionnel sur fond bleu nuit",
    indications: [
      "Teint terne, grain de peau irrégulier",
      "Taches pigmentaires",
      "Marques et cicatrices d'acné",
    ],
    aftercare: [
      "Protection solaire quotidienne indispensable",
      "Pas de gommage pendant une semaine",
      "Desquamation légère possible 2 à 4 jours",
    ],
    metaTitle: "Peeling à Dole — Reboot",
    metaDescription:
      "Renouveler l'éclat de la peau. Exfoliation contrôlée pour raviver le teint, lisser le grain de peau et estomper les tâches.",
  },
  {
    slug: "microneedling",
    index: "04",
    title: "Microneedling",
    tagline: "Relancer le collagène.",
    short:
      "Micro-perforations contrôlées pour relancer la production de collagène et unifier la peau.",
    long: "De fines aiguilles créent des micro-canaux dans le derme et déclenchent une réponse de réparation naturelle : production de collagène et d'élastine, meilleure pénétration des actifs, peau visiblement plus dense.",
    duration: "45 à 60 min",
    sessions: "Cure de 3 à 4 séances espacées de 4 semaines",
    price: "à partir de 90 €",
    priceFrom: "à partir de 90 €",
    image: soinMicroneedling,
    imageAlt: "Stylo de microneedling posé sur un tissu bleu nuit",
    indications: [
      "Relâchement cutané débutant",
      "Cicatrices et pores dilatés",
      "Ridules et perte de densité",
    ],
    aftercare: [
      "Rougeurs 24 à 48 heures",
      "Soins doux et hydratation",
      "Protection solaire stricte",
    ],
    metaTitle: "Microneedling à Dole — Reboot",
    metaDescription:
      "Relancer le collagène. Micro-perforations contrôlées pour relancer la production de collagène et unifier la peau.",
  },
];

export function getSoin(slug: string) {
  return soins.find((s) => s.slug === slug);
}
