import {
  BookOpen,
  BookOpenCheck,
  Building2,
  CalendarDays,
  CircleCheck,
  ClipboardCheck,
  Compass,
  Eye,
  FileCheck2,
  FlaskConical,
  FolderOpen,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  Laptop,
  LibraryBig,
  MicVocal,
  Music2,
  NotebookTabs,
  School,
  ShieldCheck,
  Target,
  Trees,
  Trophy,
  UserRound,
  UsersRound,
  Video,
} from "lucide-react";

export const navItems = [
  { label: "Accueil", href: "/", key: "accueil" },
  { label: "À propos", href: "/a-propos", key: "a-propos" },
  { label: "Programmes", href: "/programmes", key: "programmes" },
  { label: "Admissions", href: "/admissions", key: "admissions" },
  { label: "Vie scolaire", href: "/vie-scolaire", key: "vie-scolaire" },
  { label: "Actualités", href: "/actualites", key: "actualites" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const contactInfo = {
  location: "Essassa, Gabon",
  postal: "Route Nationale 1, PK 23 Essassa, Ntoum",
  emails: ["contact@bertheetjean.ga"],
  phones: ["+241 00 00 00 00"],
  hours: ["Lun - Ven : 7h30 - 17h00", "Sam : 9h00 - 12h00"],
};

export const pillars = [
  {
    icon: GraduationCap,
    title: "Excellence académique",
    text: "Baccalauréat à 100% et BEPC à 98,31% affichés pour 2024-2025.",
  },
  {
    icon: UsersRound,
    title: "Suivi personnalisé",
    text: "Études encadrées et accompagnement des élèves en difficulté.",
  },
  {
    icon: Trees,
    title: "Nouveau départ",
    text: "Des installations modernes annoncées pour la rentrée 2026-2027.",
  },
  {
    icon: BookOpenCheck,
    title: "Programmes nationaux",
    text: "Un enseignement conforme au Ministère de l'Éducation nationale et à l'IPN.",
  },
];

export const stats = [
  ["2009", "Reconnaissance d'utilité publique"],
  ["6e-Tle", "Secondaire général complet"],
  ["A1/B/C/D", "Séries du Baccalauréat"],
  ["PK 23", "Route Nationale 1, Essassa"],
  ["25", "Élèves maximum par classe historiquement"],
  ["2026-2027", "Nouvelles installations modernes"],
];

export const programs = [
  {
    title: "Collège",
    text: "De la sixième à la troisième, un socle exigeant pour consolider les méthodes, la discipline et l'autonomie.",
    image: "/assets/real/class-session.jpg",
    alt: "Élèves en séance de classe au Lycée Berthe et Jean",
  },
  {
    title: "Lycée",
    text: "Un cycle de la seconde à la terminale avec les séries générales A1, B, C et D.",
    image: "/assets/real/science-workshop.jpg",
    alt: "Élèves réalisant une activité scientifique",
  },
  {
    title: "Préparation aux examens",
    text: "Un suivi régulier, des évaluations et des études encadrées pour préparer le BEPC et le Baccalauréat.",
    image: "/assets/real/student-group.jpg",
    alt: "Groupe d'élèves du Lycée Berthe et Jean",
  },
];

export const infrastructures = [
  {
    icon: FlaskConical,
    title: "Laboratoires de sciences",
    text: "Deux laboratoires équipés pour les manipulations scientifiques et l'expérimentation.",
  },
  {
    icon: BookOpenCheck,
    title: "Langues vivantes",
    text: "Un laboratoire de langues pour renforcer l'anglais et l'espagnol.",
  },
  {
    icon: Laptop,
    title: "Salle informatique",
    text: "Une vingtaine de postes connectés à Internet pour les usages numériques.",
  },
  {
    icon: LibraryBig,
    title: "CDI & bibliothèque",
    text: "Un CDI moderne pour la lecture, la recherche et le travail autonome.",
  },
  {
    icon: Trophy,
    title: "Complexe sportif",
    text: "Des terrains de football, basketball, volleyball et tennis.",
  },
  {
    icon: ShieldCheck,
    title: "Vie résidentielle",
    text: "Internat non mixte, études surveillées et encadrement quotidien.",
  },
];

export const lifeItems = [
  {
    title: "Discipline & leadership",
    text: "L'Esprit Berthe & Jean valorise le dépassement de soi, le respect mutuel et le vivre-ensemble.",
    image: "/assets/real/student-cohort.jpg",
    alt: "Élèves du lycée réunis en groupe",
  },
  {
    title: "Recherche & culture",
    text: "Le CDI et les clubs socio-culturels développent la curiosité, l'expression et l'ouverture.",
    image: "/assets/real/cdi-library.jpg",
    alt: "Centre de documentation et d'information du lycée",
  },
];

export const newsItems = [
  {
    dateTime: "2026-06-16",
    day: "16",
    month: "JUIN",
    year: "2026",
    title: "Prospectus 2026-2027 disponible",
    text: "Les familles peuvent consulter les conditions d'inscription, les horaires et les frais publiés.",
  },
  {
    dateTime: "2025-10-01",
    day: "01",
    month: "OCT.",
    year: "2025",
    title: "Nouvelle configuration institutionnelle",
    text: "Le pôle privé poursuit son activité comme entité autonome, distincte du Lycée public d'Excellence d'Essassa.",
  },
  {
    dateTime: "2009-02-05",
    day: "05",
    month: "FÉV.",
    year: "2009",
    title: "Reconnaissance officielle",
    text: "La reconnaissance d'utilité publique inscrit l'établissement dans la carte scolaire nationale.",
  },
];

export const galleryImages = [
  {
    src: "/assets/real/campus-aerial.jpg",
    alt: "Vue aérienne du campus Berthe et Jean",
    label: "Campus d'Essassa",
  },
  {
    src: "/assets/real/campus-gardens.jpeg",
    alt: "Espaces verts du campus",
    label: "Cadre naturel",
  },
  {
    src: "/assets/real/campus-building.jpg",
    alt: "Bâtiment du lycée",
    label: "Bâtiments scolaires",
  },
  {
    src: "/assets/real/cdi-library.jpg",
    alt: "CDI du lycée",
    label: "CDI",
  },
  {
    src: "/assets/real/science-workshop.jpg",
    alt: "Atelier scientifique avec des élèves",
    label: "Sciences",
  },
  {
    src: "/assets/real/student-group.jpg",
    alt: "Groupe d'élèves",
    label: "Communauté éducative",
  },
];

export const admissionDocs = [
  "Demande d'inscription à titre privé adressée au proviseur",
  "Bulletins de notes des trois trimestres de l'année précédente",
  "Acte de naissance légalisé",
  "Certificat médical datant de moins de trois mois",
  "Copie du carnet de santé pour les élèves de 6e",
  "Quatre photos d'identité récentes",
];

export const admissionSteps = [
  "Retrait et renseignement de la fiche de préinscription",
  "Dépôt du dossier scolaire complet",
  "Examen et validation par une commission de recrutement",
  "Inscription administrative après avis favorable",
  "Entretien possible avec le psychologue pour un meilleur encadrement",
];

export const prospectusFacts = [
  ["Niveaux", "De la 6e à la Terminale"],
  ["Examens", "BEPC et Baccalauréat"],
  ["Séries", "A1, B, C et D"],
  ["Horaires", "8h00-13h30 ou 15h40 selon les classes"],
];

export const financialItems = [
  ["Frais de dossier", "25 000 FCFA"],
  ["Frais d'inscription", "19 000 FCFA"],
  ["Scolarité 1er cycle", "100 000 FCFA / mois"],
  ["Scolarité 2nd cycle", "110 000 FCFA / mois"],
  ["Uniforme", "55 000 à 70 000 FCFA"],
  ["Transport scolaire", "45 000 FCFA / mois"],
];

export const downloadItems = [
  {
    title: "Prospectus Berthe & Jean 2026-2027",
    text: "Présentation, admission, pièces à fournir, performances et conditions financières.",
    href: "/downloads/prospectus-berthe-jean-2026-2027.pdf",
  },
];

export const aboutCards = [
  {
    icon: Target,
    title: "Notre mission",
    text: "Offrir une éducation d'excellence fondée sur la rigueur académique, la discipline et un accompagnement personnalisé de chaque élève.",
  },
  {
    icon: Eye,
    title: "Notre vision",
    text: "Former des citoyens responsables, confiants et ouverts sur le monde, capables de relever les défis d'un monde en constante évolution.",
  },
  {
    icon: ShieldCheck,
    title: "Nos valeurs",
    list: ["Discipline", "Rigueur", "Innovation", "Accompagnement"],
  },
];

export const approachItems = [
  {
    icon: UserRound,
    title: "Suivi personnalisé",
    text: "Un accompagnement adapté aux besoins et au rythme de chaque élève pour favoriser sa réussite.",
  },
  {
    icon: UsersRound,
    title: "Encadrement de qualité",
    text: "Des enseignants qualifiés et investis qui assurent un suivi rigoureux et bienveillant.",
  },
  {
    icon: ShieldCheck,
    title: "Cadre sécurisé",
    text: "Un environnement sain, sûr et stimulant pour apprendre en toute sérénité.",
  },
  {
    icon: Globe,
    title: "Ouverture internationale",
    text: "Langues, valeurs et ambition pour développer une vision ouverte sur le monde.",
  },
  {
    icon: GraduationCap,
    title: "Collège au Lycée",
    text: "Un collège à la terminale, nous accompagnons chaque élève à chaque étape.",
  },
  {
    icon: UsersRound,
    title: "Encadrement attentif",
    text: "Des classes à effectifs raisonnables pour un suivi personnalisé.",
  },
  {
    icon: Trophy,
    title: "Activités scolaires",
    text: "Activités sportives, culturelles et scientifiques pour développer talents et passions.",
  },
  {
    icon: CalendarDays,
    title: "Préinscriptions ouvertes",
    text: "Les préinscriptions pour l'année 2026-2027 sont ouvertes.",
  },
];

export const lifeSchoolCards = [
  {
    title: "Vie scolaire",
    text: "Un environnement bienveillant qui favorise l'apprentissage, le respect et l'épanouissement de chacun.",
    image: "/assets/real/class-session.jpg",
    alt: "Élèves au travail en salle de classe",
  },
  {
    title: "Clubs & culture",
    text: "Des clubs variés pour développer la créativité, l'expression et le sens des responsabilités.",
    image: "/assets/real/cdi-library.jpg",
    alt: "Activité culturelle et documentaire au lycée",
  },
  {
    title: "Activités sportives",
    text: "Des disciplines sportives pour cultiver l'esprit d'équipe, la discipline et le dépassement de soi.",
    image: "/assets/real/student-cohort.jpg",
    alt: "Groupe d'élèves du lycée",
  },
];

export const programHighlights = [
  {
    icon: GraduationCap,
    title: "Collège",
    text: "De la 6e à la 3e, un apprentissage structuré et progressif.",
  },
  {
    icon: UsersRound,
    title: "Lycée",
    text: "De la 2nde à la Terminale, une préparation exigeante au Bac.",
  },
  {
    icon: UserRound,
    title: "Encadrement",
    text: "Des enseignants qualifiés et un suivi personnalisé.",
  },
  {
    icon: ShieldCheck,
    title: "Examens",
    text: "Préparation au BEPC, au Baccalauréat et à l'orientation.",
  },
];

export const collegeLevels = [
  ["6e", "Découverte et adaptation"],
  ["5e", "Consolidation des apprentissages"],
  ["4e", "Approfondissement et autonomie"],
  ["3e", "Préparation au BEPC"],
];

export const lyceeLevels = [
  ["2nde", "Choix et construction de l'orientation"],
  ["1re", "Approfondissement des spécialités"],
  ["Terminale", "Préparation au Bac et projets d'avenir"],
];

export const learningDomains = [
  {
    icon: Globe,
    title: "Langues",
    text: "Maîtrise du français, de l'anglais et des compétences de communication.",
  },
  {
    icon: FlaskConical,
    title: "Sciences",
    text: "SVT, physique-chimie et expérimentation pour comprendre le monde.",
  },
  {
    icon: NotebookTabs,
    title: "Mathématiques",
    text: "Raisonnement, logique et résolution de problèmes.",
  },
  {
    icon: BookOpen,
    title: "Humanités",
    text: "Histoire-géographie, culture générale et éducation à la citoyenneté.",
  },
  {
    icon: Laptop,
    title: "Numérique",
    text: "Maîtrise des outils digitaux et des compétences du 21e siècle.",
  },
  {
    icon: Compass,
    title: "Orientation & méthode",
    text: "Méthodes de travail, accompagnement à l'orientation et projets d'avenir.",
  },
];

export const examPrepItems = [
  {
    title: "BEPC",
    text: "Un accompagnement rigoureux pour réussir le Brevet des Collèges : cours renforcés, révisions guidées et simulations régulières.",
    image: "/assets/real/class-session.jpg",
    alt: "Élèves en préparation au BEPC",
  },
  {
    title: "Baccalauréat",
    text: "Préparation intensive au Bac général : approfondissement des spécialités, devoirs surveillés et entraînements ciblés.",
    image: "/assets/real/student-group.jpg",
    alt: "Élèves préparant le Baccalauréat",
  },
  {
    title: "Accompagnement vers l'enseignement supérieur",
    text: "Conseil en orientation, suivi individuel et aide à la constitution des dossiers.",
    image: "/assets/real/science-workshop.jpg",
    alt: "Élèves accompagnés dans un projet scientifique",
  },
];

export const complementaryActivities = [
  {
    title: "Clubs & culture",
    text: "Clubs artistiques, musique, théâtre, lecture et débats pour développer la créativité.",
    image: "/assets/real/cdi-library.jpg",
    alt: "Club culturel au lycée",
  },
  {
    title: "Activités sportives",
    text: "Football, basket, athlétisme et bien-être pour cultiver l'esprit d'équipe.",
    image: "/assets/real/student-cohort.jpg",
    alt: "Activités sportives du lycée",
  },
  {
    title: "Projets scientifiques",
    text: "Expériences, concours et projets innovants pour stimuler la curiosité.",
    image: "/assets/real/science-workshop.jpg",
    alt: "Projet scientifique au lycée",
  },
];

export const admissionHighlights = [
  {
    icon: ClipboardCheck,
    title: "Préinscription simple",
    text: "Une démarche rapide en ligne ou sur place.",
  },
  {
    icon: FolderOpen,
    title: "Étude du dossier",
    text: "Analyse des pièces et entretien si nécessaire.",
  },
  {
    icon: Compass,
    title: "Orientation",
    text: "Conseils selon le niveau et le parcours visé.",
  },
  {
    icon: UsersRound,
    title: "Intégration",
    text: "Accueil et accompagnement avant la rentrée.",
  },
];

export const admissionProcess = [
  {
    icon: FileCheck2,
    title: "Préinscription",
    text: "Remplir la fiche de demande.",
  },
  {
    icon: FolderOpen,
    title: "Dossier",
    text: "Déposer les pièces administratives et scolaires.",
  },
  {
    icon: ShieldCheck,
    title: "Validation",
    text: "Étude du dossier et confirmation d'admission.",
  },
  {
    icon: UserRound,
    title: "Inscription finale",
    text: "Paiement, affectation et préparation de la rentrée.",
  },
];

export const admissionLevels = [
  {
    icon: GraduationCap,
    title: "Collège",
    text: "Admission de la 6e à la 3e.",
  },
  {
    icon: UsersRound,
    title: "Lycée",
    text: "Admission de la 2nde à la Terminale.",
  },
  {
    icon: Building2,
    title: "Transfert",
    text: "Accueil d'élèves venant d'autres établissements.",
  },
];

export const whyChooseItems = [
  {
    icon: GraduationCap,
    title: "Excellence académique",
    text: "Un enseignement exigeant et des résultats durables.",
  },
  {
    icon: UsersRound,
    title: "Encadrement de qualité",
    text: "Des enseignants qualifiés et un suivi attentif.",
  },
  {
    icon: ShieldCheck,
    title: "Cadre sécurisé",
    text: "Un environnement propice à l'apprentissage.",
  },
  {
    icon: Globe,
    title: "Ouverture internationale",
    text: "Langues, valeurs et ambition pour l'avenir.",
  },
];

export const faqItems = [
  {
    question: "Quand commencent les inscriptions ?",
    answer:
      "Les préinscriptions sont ouvertes avant chaque rentrée scolaire et peuvent se poursuivre selon les places disponibles.",
  },
  {
    question: "Peut-on visiter le campus ?",
    answer:
      "Oui, des rendez-vous et des journées de découverte peuvent être organisés.",
  },
  {
    question: "Comment contacter le service admissions ?",
    answer: "Par téléphone, e-mail ou directement à Essassa, Gabon.",
  },
];

export const hymnItems = [
  {
    icon: Music2,
    title: "Hymne Berthe & Jean",
    text: "Une vidéo officielle transmise pour valoriser l'esprit, la devise et l'identité du lycée.",
  },
  {
    icon: MicVocal,
    title: "Savoir-être - Savoir-faire",
    text: "L'hymne accompagne la vie scolaire et rappelle l'engagement collectif de la communauté éducative.",
  },
  {
    icon: Video,
    title: "À regarder sur le site",
    text: "Le lecteur vidéo est intégré avec contrôles natifs pour ordinateur et mobile.",
  },
];

export const ctaText = {
  discover:
    "Visitez nos locaux, rencontrez notre équipe et découvrez la qualité de notre enseignement.",
  programs:
    "Explorez nos programmes, rencontrez notre équipe pédagogique et offrez à votre enfant un environnement d'excellence.",
  admissions:
    "Contactez notre service admissions ou lancez votre préinscription dès aujourd'hui.",
};

export { CircleCheck, Handshake, Landmark, School };
