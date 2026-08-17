import soinLaser from "@/assets/soin-laser.jpg";
import soinCryolipolyse from "@/assets/soin-cryolipolyse.jpg";
import soinPeeling from "@/assets/soin-peeling.jpg";
import soinMicroneedling from "@/assets/soin-microneedling.jpg";
import soinDomeLed from "@/assets/soin-dome-led.jpg";

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
  faq: { q: string; a: string }[];
  /**
   * Hub SEO associé — lien discret affiché en bas de page après la FAQ.
   * Une seule ligne de texte : non intrusif pour l'utilisateur, utile pour Google.
   */
  hubLandingPage?: { href: string; label: string };
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
      "Épilation laser définitive à Dole (Jura) : toutes zones, tous phototypes, technologie dernière génération. À partir de 40 €. Bilan offert.",
    faq: [
      {
        q: "Combien de séances faut-il pour une épilation laser définitive à Dole ?",
        a: "En général, 8 à 10 séances sont nécessaires, espacées de 4 à 8 semaines selon la zone et le cycle pilaire. Chaque séance réduit progressivement la densité du poil jusqu'à un résultat durable.",
      },
      {
        q: "L'épilation laser est-elle douloureuse ?",
        a: "La sensation ressemble à un léger pincement ou un coup d'élastique. La technologie utilisée à Reboot intègre un système de refroidissement qui atténue l'inconfort, même sur les zones les plus sensibles.",
      },
      {
        q: "Quelles zones peut-on traiter avec l'épilation laser à Reboot ?",
        a: "Toutes les zones : jambes, aisselles, maillot intégral, bras, visage (lèvre supérieure, menton), dos et torse. Un bilan de peau est réalisé avant la première séance pour adapter le protocole à votre situation.",
      },
      {
        q: "L'épilation laser fonctionne-t-elle sur tous les types de peau ?",
        a: "La technologie utilisée à Reboot est adaptée à tous les phototypes, y compris les peaux mates et foncées. Un bilan préalable permet de confirmer l'adéquation du traitement à votre profil cutané.",
      },
      {
        q: "Quel est le tarif de l'épilation laser à Reboot Dole ?",
        a: "Les séances démarrent à partir de 40 €, selon la zone traitée. Un devis personnalisé est établi lors de votre premier rendez-vous au centre.",
      },
    ],
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
      "Cryolipolyse à Dole (Jura) : élimination des amas graisseux localisés sans chirurgie. Ventre, flancs, cuisses. À partir de 250 €. Bilan offert.",
    faq: [
      {
        q: "La cryolipolyse est-elle efficace pour éliminer les poignées d'amour ?",
        a: "Oui, c'est l'une des zones les plus couramment traitées. La cryolipolyse cible précisément les amas graisseux résistants au sport et à l'alimentation, comme les flancs, le ventre ou l'intérieur des cuisses.",
      },
      {
        q: "Combien de séances de cryolipolyse faut-il ?",
        a: "En général, 1 à 3 séances suffisent par zone. Le résultat se développe progressivement sur 6 à 12 semaines, le temps que les adipocytes détruits soient éliminés naturellement par l'organisme.",
      },
      {
        q: "Est-ce que la cryolipolyse est douloureuse ?",
        a: "Pendant la séance, une sensation de froid intense et de tiraillement est ressentie les premières minutes, puis la zone s'engourdit. La plupart des clients lisent ou se détendent pendant le traitement.",
      },
      {
        q: "La cryolipolyse remplace-t-elle le sport ou un régime ?",
        a: "Non. Elle complète un mode de vie sain en traitant des zones résistantes à l'effort physique. Elle n'est pas indiquée pour une perte de poids globale.",
      },
      {
        q: "Quel est le tarif de la cryolipolyse à Reboot Dole ?",
        a: "Les séances démarrent à partir de 250 €. Un devis précis est établi après bilan selon le nombre de zones et de passages à traiter.",
      },
    ],
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
      "Peeling professionnel à Dole (Jura) : éclat, taches, pores, cicatrices d'acné. Protocoles AHA, salicylique, TCA doux. À partir de 95 €.",
    faq: [
      {
        q: "Quel type de peeling est réalisé à Reboot Dole ?",
        a: "Des peelings superficiels à moyens, formulés selon votre type de peau et votre objectif : acides de fruits (AHA), acide salicylique, TCA doux. Le protocole est choisi lors d'un bilan cutané initial.",
      },
      {
        q: "Combien de séances de peeling sont nécessaires ?",
        a: "Une cure de 3 à 5 séances espacées de 3 à 4 semaines est généralement recommandée pour un résultat durable. Des séances d'entretien peuvent compléter le suivi.",
      },
      {
        q: "La peau desquame-t-elle après un peeling ?",
        a: "Une légère desquamation est possible 2 à 4 jours après la séance selon la profondeur du peeling. C'est un signe normal de renouvellement cutané, et elle reste discrète avec les peelings superficiels.",
      },
      {
        q: "Puis-je m'exposer au soleil après un peeling ?",
        a: "Non. La protection solaire est indispensable pendant toute la durée du traitement et les semaines suivantes. Le peeling rend la peau temporairement plus sensible aux UV.",
      },
      {
        q: "Quel est le tarif d'un peeling à Reboot Dole ?",
        a: "Les séances démarrent à partir de 95 €. Le tarif exact dépend du type de peeling et du protocole défini lors de votre bilan.",
      },
    ],
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
      "Microneedling à Dole (Jura) : relance du collagène, réduction des ridules, cicatrices et pores. Protocole personnalisé. À partir de 90 €.",
    faq: [
      {
        q: "À quoi sert le microneedling ?",
        a: "Le microneedling stimule la production naturelle de collagène et d'élastine via de micro-perforations contrôlées du derme. Il améliore la densité et la texture de la peau, réduit les ridules, les cicatrices d'acné et les pores dilatés.",
      },
      {
        q: "Le microneedling est-il douloureux ?",
        a: "Une crème anesthésiante est appliquée avant la séance pour minimiser l'inconfort. Des rougeurs et une légère sensibilité sont normales dans les 24 à 48 heures suivantes.",
      },
      {
        q: "Combien de séances de microneedling sont nécessaires ?",
        a: "Une cure de 3 à 4 séances espacées de 4 semaines est recommandée pour un résultat visible et durable. Des séances d'entretien annuelles peuvent prolonger l'effet dans le temps.",
      },
      {
        q: "Le microneedling convient-il à tous les types de peau ?",
        a: "Oui, il est adapté à la plupart des profils cutanés. Un bilan préalable permet d'écarter les contre-indications (inflammation active, troubles de la coagulation, grossesse).",
      },
      {
        q: "Quel est le tarif du microneedling à Reboot Dole ?",
        a: "Les séances démarrent à partir de 90 €. Un devis est établi lors de votre premier rendez-vous selon le protocole adapté à votre peau.",
      },
    ],
  },
  {
    slug: "dome-led",
    index: "05",
    title: "Dôme LED",
    tagline: "Régénérer par la lumière.",
    short:
      "Photobiomodulation corps entier : stimulation cellulaire, éclat et récupération par la lumière calibrée.",
    long: "Le dôme LED enveloppe le corps dans un rayonnement de lumière calibrée — rouge, infrarouge et bleu. Chaque longueur d'onde agit sur un processus distinct : stimulation du collagène, réduction de l'inflammation, récupération musculaire. Aucune chaleur, aucun contact. Une séance douce, visible dès les premières utilisations.",
    duration: "20 à 30 min",
    sessions: "Cure de 8 à 12 séances — ou en complément de soin",
    price: "à partir de 60 €",
    priceFrom: "à partir de 60 €",
    image: soinDomeLed,
    imageAlt: "Dôme LED de photobiomodulation au centre Reboot à Dole",
    indications: [
      "Teint terne, manque d'éclat",
      "Récupération musculaire et articulaire",
      "Accompagnement anti-âge et régénération cellulaire",
    ],
    aftercare: [
      "Aucune contrainte particulière après la séance",
      "Hydratation conseillée",
      "Peut être combiné avec d'autres soins le même jour",
    ],
    metaTitle: "Dôme LED à Dole — Photobiomodulation | Reboot",
    metaDescription:
      "Séances de dôme LED (photobiomodulation) à Dole (Jura) : stimulation cellulaire, éclat, récupération. Lumière rouge, infrarouge et bleue. À partir de 60 €.",
    faq: [
      {
        q: "Qu'est-ce que le dôme LED et comment ça fonctionne ?",
        a: "Le dôme LED utilise différentes longueurs d'onde lumineuses — rouge, infrarouge proche, bleu — pour stimuler les processus naturels de réparation et de régénération. La lumière rouge active la production de collagène, l'infrarouge favorise la circulation et la récupération musculaire, le bleu cible les bactéries responsables des imperfections. Aucune chaleur, aucun contact direct.",
      },
      {
        q: "Le dôme LED est-il douloureux ?",
        a: "Non, la séance est totalement indolore et très relaxante. Vous êtes allongé·e sous le dôme, les yeux protégés. La sensation est douce et légèrement enveloppante.",
      },
      {
        q: "Combien de séances de dôme LED faut-il ?",
        a: "Pour un effet visible et durable, une cure de 8 à 12 séances est recommandée, à raison d'une à deux par semaine. Le dôme LED peut aussi être utilisé en complément d'un autre soin — microneedling, peeling — pour optimiser la récupération et amplifier les résultats.",
      },
      {
        q: "Qui peut bénéficier du dôme LED chez Reboot ?",
        a: "Presque tout le monde. La photobiomodulation est contre-indiquée en cas de grossesse, d'épilepsie photosensible ou de traitement photosensibilisant. Un bilan préalable permet de confirmer votre éligibilité et d'adapter le protocole.",
      },
      {
        q: "Quel est le tarif d'une séance de dôme LED à Reboot Dole ?",
        a: "Les séances démarrent à partir de 60 €. Des formules en cure ou combinées avec d'autres soins sont disponibles — un devis est établi lors de votre bilan.",
      },
    ],
  },
];

export function getSoin(slug: string) {
  return soins.find((s) => s.slug === slug);
}
