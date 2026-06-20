import * as siteData from "./site-data";
import type { Locale } from "./i18n-config";

type SiteData = typeof siteData;

export const commonCopy = {
  fr: {
    brandAria: "Accueil Berthe et Jean",
    brandTitleLine1: "Lycée Privé International",
    brandTitleLine2: "Berthe & Jean",
    brandMotto: "Savoir-être - Savoir-faire",
    mainNavigation: "Navigation principale",
    contactButton: "Nous contacter",
    mobileMenuAria: "Ouvrir le menu",
    breadcrumbHome: "Accueil",
    footerAria: "Pied de page",
    footerIntro:
      "Un cadre structuré à Essassa pour apprendre, grandir et préparer l'avenir avec discipline et ambition.",
    footerContact: "Nous contacter",
    quickLinks: "Liens rapides",
    writeUs: "Nous écrire",
    followUs: "Suivez-nous",
    socialAria: "Réseaux sociaux",
    facebookAria: "Facebook du Lycée Berthe et Jean",
    admissionCta: "Demander une admission",
    copyright:
      "© 2026 Lycée Privé International Berthe & Jean. Tous droits réservés.",
    learnMore: "En savoir plus",
    readMore: "Lire la suite",
    readArticle: "Lire l'article",
    close: "Fermer",
    discoverCtaTitle: "Venez découvrir notre lycée",
  },
  en: {
    brandAria: "Berthe and Jean home",
    brandTitleLine1: "Private International School",
    brandTitleLine2: "Berthe & Jean",
    brandMotto: "Character - Skills",
    mainNavigation: "Main navigation",
    contactButton: "Contact us",
    mobileMenuAria: "Open menu",
    breadcrumbHome: "Home",
    footerAria: "Footer",
    footerIntro:
      "A structured environment in Essassa to learn, grow and prepare for the future with discipline and ambition.",
    footerContact: "Contact us",
    quickLinks: "Quick links",
    writeUs: "Write to us",
    followUs: "Follow us",
    socialAria: "Social media",
    facebookAria: "Berthe and Jean School Facebook page",
    admissionCta: "Request admission",
    copyright:
      "© 2026 Lycée Privé International Berthe & Jean. All rights reserved.",
    learnMore: "Learn more",
    readMore: "Read more",
    readArticle: "Read the article",
    close: "Close",
    discoverCtaTitle: "Come and discover our school",
  },
} as const;

export const pageCopy = {
  fr: {
    metadata: {
      homeTitle: "Lycée Privé International Berthe & Jean",
      homeDescription:
        "Une éducation d'excellence à Essassa, du collège au lycée, dans un cadre structuré et ambitieux.",
      aboutTitle: "À propos | Lycée Privé International Berthe & Jean",
      aboutDescription:
        "Mission, vision, valeurs et approche pédagogique du Lycée Privé International Berthe & Jean à Essassa.",
      programsTitle: "Programmes | Lycée Privé International Berthe & Jean",
      programsDescription:
        "Programmes du collège à la Terminale, préparation au BEPC et au Baccalauréat, domaines d'apprentissage et activités complémentaires.",
      admissionsTitle: "Admissions | Lycée Privé International Berthe & Jean",
      admissionsDescription:
        "Dossier d'admission, pièces à fournir, frais 2026-2027 et prospectus du Lycée Privé International Berthe & Jean.",
      lifeTitle: "Vie scolaire | Lycée Privé International Berthe & Jean",
      lifeDescription:
        "Vie scolaire, activités sportives, clubs, culture, encadrement et temps forts du Lycée Privé International Berthe & Jean.",
      newsTitle: "Actualités | Lycée Privé International Berthe & Jean",
      newsDescription:
        "Actualités, résultats, événements, agenda et annonces du Lycée Privé International Berthe & Jean.",
      contactTitle: "Contact | Lycée Privé International Berthe & Jean",
      contactDescription:
        "Adresse, téléphone, e-mail, horaires, formulaire de contact et informations pratiques du Lycée Privé International Berthe & Jean.",
      newsNotFound: "Actualité introuvable | Lycée Privé International Berthe & Jean",
    },
    home: {
      eyebrow: "Route Nationale 1 - PK 23 Essassa",
      title: "Une éducation d'excellence à Essassa",
      intro:
        "Le Lycée Privé International Berthe & Jean accompagne les élèves du collège au lycée dans un cadre structuré, ambitieux et ouvert sur le monde, à environ 23 kilomètres de Libreville.",
      discover: "Découvrir le lycée",
      admission: "Demander une admission",
      location: "Essassa, commune de Ntoum, Estuaire, Gabon",
      pillarsAria: "Points forts du lycée",
      aboutTitle: "À propos du lycée",
      aboutP1:
        "Le Lycée Privé International Berthe & Jean est un établissement privé laïc d'enseignement secondaire général, situé à Essassa sur la Route Nationale 1. Il a reçu sa reconnaissance d'utilité publique le 5 février 2009.",
      aboutP2:
        "Sa devise, « Savoir être et savoir faire », porte un projet éducatif centré sur la rigueur académique, l'éthique, le respect mutuel et le développement d'un leadership responsable.",
      values: "Nos valeurs : Discipline - Rigueur - Innovation - Accompagnement",
      aboutImageAlt: "Espaces verts du campus du Lycée Berthe et Jean",
      clarityAria: "Clarification institutionnelle",
      sinceTitle: "Depuis octobre 2025",
      sinceText:
        "Le Lycée Privé International Berthe & Jean poursuit ses activités comme entité privée autonome, mitoyenne et distincte du Lycée public d'Excellence d'Essassa. Pour la rentrée 2026-2027, le prospectus annonce de nouvelles installations modernes, spacieuses et adaptées aux exigences d'une éducation de qualité.",
      leadershipEyebrow: "Mot de la direction",
      leadershipTitle: "Une vision portée par des responsables engagés",
      leadershipText:
        "La parole de la direction éclaire le projet éducatif du lycée, son exigence quotidienne et le lien de confiance construit avec les familles. Elle réunit ici le censeur, le proviseur et la fondatrice autour d'une même ambition : former avec rigueur et humanité.",
      directionAlt:
        "MAVOUNGOU Denis Marin et OBOLO Clément, équipe de direction du Lycée Berthe et Jean",
      directionLabel: "Direction administrative",
      directionTitle: "M. OBOLO Clément & M. MAVOUNGOU Denis Marin",
      directionText:
        "Depuis 2015, l'encadrement du Lycée Privé International Berthe & Jean s'appuie sur une continuité administrative forte : exigence pédagogique, discipline quotidienne et dialogue avec les familles.",
      statsAria: "Chiffres clés",
      programsTitle: "Nos programmes",
      infrastructureAria: "Campus et infrastructures",
      infrastructureEyebrow: "Campus, équipements & internat",
      infrastructureTitle: "Une cité scolaire conçue pour apprendre et grandir",
      infrastructureText:
        "Le campus historique d'Essassa réunit espaces pédagogiques, équipements sportifs, CDI, laboratoires et internat dans un environnement naturel.",
      lifeNewsTitle: "Vie scolaire & actualités",
      newsAria: "Actualités",
      galleryAria: "Photos du lycée",
      galleryTitle: "Le lycée en images",
      enlargePhoto: "Agrandir",
      galleryPreviewAria: "Aperçu des photos",
      closeImage: "Fermer l'image",
      hymnAria: "Hymne Berthe et Jean",
      hymnEyebrow: "Hymne du lycée",
      hymnTitle: "L'hymne Berthe & Jean",
      hymnText:
        "L'hymne du lycée est proposé en écoute audio avec des contrôles simples pour valoriser l'identité, la devise et l'esprit de la communauté éducative.",
      officialHymn: "Hymne officiel",
      audioFallback: "Votre navigateur ne prend pas en charge la lecture audio.",
    },
    about: {
      heroTitle: "À propos du lycée",
      heroText:
        "Situé à Essassa, le Lycée Privé International Berthe & Jean accompagne les élèves du collège au lycée dans un cadre structuré, exigeant et bienveillant, pour leur permettre de devenir des citoyens responsables.",
      heroAlt: "Élèves du Lycée Berthe et Jean accompagnés dans leurs apprentissages",
      mission: "Notre mission",
      contact: "Nous contacter",
      whoTitle: "Qui sommes-nous ?",
      whoP1:
        "Le Lycée Privé International Berthe & Jean est un établissement privé laïc d'enseignement secondaire général, situé à Essassa, au Gabon.",
      whoP2:
        "Nous accueillons les élèves du collège au lycée dans un cadre sécurisé, moderne et stimulant, propice à l'apprentissage et à l'épanouissement personnel.",
      whoP3:
        "Notre engagement repose sur des valeurs fortes et une pédagogie centrée sur l'élève, afin de lui donner les moyens de réussir aujourd'hui et de s'accomplir demain.",
      campusAlt: "Cadre naturel du campus Berthe et Jean",
      directionAlt: "Bâtiment du Lycée Privé International Berthe et Jean",
      directionTitle: "Le mot de la direction",
      directionP1:
        "Au Lycée Privé International Berthe & Jean, nous plaçons la réussite et le bien-être de chaque élève au cœur de notre action.",
      directionP2:
        "Notre équipe pédagogique s'engage chaque jour à offrir un enseignement de qualité, dans un climat de confiance et de respect, pour former des jeunes responsables et ambitieux.",
      directionP3:
        "Nous croyons au potentiel de chaque élève et nous sommes fiers de les accompagner sur le chemin de l'excellence.",
      directionSignature: "La Direction",
      approach: "Notre approche pédagogique",
      life: "La vie au lycée",
    },
    programs: {
      heroTitle: "Nos programmes",
      heroText:
        "Le Lycée Privé International Berthe & Jean propose un parcours structuré de la 6e à la Terminale, fondé sur l'excellence académique, l'accompagnement personnalisé et une préparation rigoureuse aux examens et à l'avenir.",
      heroAlt: "Élèves du lycée accompagnés par un enseignant",
      viewTracks: "Voir les parcours",
      admissions: "Admissions",
      collegeTitle: "Parcours Collège",
      collegeAlt: "Parcours collège au Lycée Berthe et Jean",
      collegeText:
        "Le cycle collège, de la 6e à la 3e, pose les bases solides d'une réussite durable. Les élèves développent leurs connaissances fondamentales, leur méthodologie de travail, la maîtrise des langues, des sciences et des outils numériques.",
      lyceeTitle: "Parcours Lycée",
      lyceeAlt: "Parcours lycée et activités scientifiques",
      lyceeText:
        "Du second cycle à la Terminale, les élèves bénéficient d'un enseignement approfondi, d'un accompagnement vers l'orientation et d'une préparation exigeante aux examens.",
      domains: "Domaines d'apprentissage",
      series: "Séries et orientations au lycée",
      exams: "Préparation aux examens",
      complementary: "Activités complémentaires",
      ctaTitle: "Construisez votre parcours avec Berthe & Jean",
    },
    admissions: {
      heroTitle: "Admissions",
      heroText:
        "Rejoignez le Lycée Privé International Berthe & Jean et offrez à votre enfant un cadre d'excellence, de discipline et d'accompagnement personnalisé, du collège au lycée.",
      heroAlt: "Élèves du lycée en démarche d'admission",
      request: "Demander une admission",
      appointment: "Prendre rendez-vous",
      how: "Comment s'inscrire ?",
      docs: "Pièces à fournir",
      levels: "Niveaux concernés",
      familyAlt: "Accueil des familles au Lycée Berthe et Jean",
      why: "Pourquoi nous choisir ?",
      prospectus: "Prospectus & conditions financières",
      prospectusText:
        "Les informations ci-dessous reprennent le prospectus 2026-2027 transmis pour le lycée. Les montants restent à confirmer auprès de l'administration lors de l'inscription finale.",
      openPdf: "Ouvrir le PDF",
      faq: "Questions fréquentes",
      ctaTitle: "Prêt à rejoindre Berthe & Jean ?",
    },
    life: {
      heroTitle: "Vie scolaire",
      heroText:
        "Au Lycée Privé International Berthe & Jean, nous offrons à nos élèves une vie scolaire équilibrée qui allie discipline, activités sportives, culture, clubs, développement personnel et accompagnement académique.",
      heroAlt: "Élèves du Lycée Berthe et Jean en séance d'information",
      discover: "Découvrir nos activités",
      contact: "Nous contacter",
      sectionTitle: "Une vie scolaire épanouissante",
      sectionP1:
        "Situé à Essassa, notre établissement offre un environnement sûr, structuré et stimulant où chaque élève peut grandir, apprendre et s'épanouir pleinement.",
      sectionP2:
        "Nous encourageons l'engagement, la responsabilité et la confiance en soi à travers une variété d'activités et un encadrement de qualité.",
      location: "Essassa, Gabon",
      imageAlt: "Vie scolaire dans le campus du Lycée Berthe et Jean",
      activities: "Nos activités",
      moments: "Temps forts de l'année",
      difference: "Pourquoi notre vie scolaire fait la différence ?",
      ctaTitle:
        "Découvrez un cadre de vie motivant pour réussir et s'épanouir",
      ctaText: "Rejoignez le Lycée Privé International Berthe & Jean à Essassa.",
    },
    news: {
      heroTitle: "Actualités",
      heroText:
        "Restez informés des dernières nouvelles du Lycée Privé International Berthe & Jean : réussites de nos élèves, événements marquants, annonces importantes et initiatives qui font vivre notre communauté scolaire.",
      heroAlt: "Remise de distinction aux élèves du Lycée Berthe et Jean",
      allNews: "Voir toutes les actualités",
      contact: "Nous contacter",
      featured: "À la une",
      latest: "Dernières actualités",
      agenda: "Agenda & annonces",
      announcements: "Annonces importantes",
      register: "S'inscrire",
      gallery: "Galerie de la vie du lycée",
      ctaTitle:
        "Suivez notre actualité et faites partie de notre communauté scolaire !",
      ctaText:
        "Restez informé des dernières nouvelles et rejoignez le Lycée Privé International Berthe & Jean.",
      backToNews: "Retour aux actualités",
      allArticles: "Toutes les actualités",
      alsoRead: "À lire aussi",
    },
    contact: {
      heroTitle: "Contact",
      heroText:
        "Notre équipe est à votre écoute pour répondre à vos questions, vous accompagner dans vos démarches et vous accueillir au sein du Lycée Privé International Berthe & Jean à Essassa.",
      heroAlt: "Cour et bâtiments du Lycée Privé International Berthe et Jean",
      write: "Nous écrire",
      appointment: "Prendre rendez-vous",
      address: "Adresse",
      seeAddress: "Voir l'adresse sur la carte",
      phone: "Téléphone",
      callNow: "Appeler maintenant",
      email: "E-mail",
      writeEmail: "Écrire par e-mail",
      hours: "Horaires",
      writeSchool: "Écrire au lycée",
      quickActionsAria: "Actions de contact rapides",
      callSchool: "Appeler le lycée",
      sendEmail: "Envoyer un e-mail",
      directions: "Voir l'itinéraire",
      internationalTitle: "For international families",
      internationalText:
        "The school team can guide families looking for information about admissions, school life and visits in Essassa. Please contact the administration before coming to campus.",
      socialTitle: "Réseaux sociaux",
      socialText:
        "Suivez les annonces et la vie du lycée directement depuis la page Facebook officielle.",
      facebook: "Page Facebook du lycée",
      visitTitle: "Visite du campus sur rendez-vous",
      visitText:
        "Les familles peuvent demander une visite pour découvrir les salles de classe, les espaces de vie scolaire et les conditions d'admission.",
      requestVisit: "Demander une visite",
      call: "Appeler",
      seeInfo: "Voir les informations",
      writeService: "Écrire au service",
      entranceAlt: "Entrée du Lycée Privé International Berthe et Jean",
      findTitle: "Nous trouver",
      findText:
        "Le Lycée Privé International Berthe & Jean est situé sur la Route Nationale 1, au PK 23 Essassa, dans la commune de Ntoum. Depuis Libreville, l'itinéraire se fait par la RN1 en direction d'Essassa.",
      mapAria: "Carte Google Maps du lycée à Essassa",
      mapTitle:
        "Localisation Google Maps du Lycée Privé International Berthe et Jean à Essassa",
      landmark:
        "Repère pratique : Route Nationale 1, PK 23 Essassa, commune de Ntoum, à environ 23 kilomètres de Libreville.",
      openMaps: "Ouvrir dans Google Maps",
      fromLibreville: "Itinéraire depuis Libreville",
      campusAlt: "Vue du campus du Lycée Berthe et Jean",
      practical: "Informations pratiques",
      followup:
        "Pour une admission, préparez vos pièces avant la prise de contact. La page",
      followupLink: "Admissions",
      followupEnd: "détaille les étapes et les documents à fournir.",
      ctaTitle: "Rencontrons-nous pour construire l'avenir de votre enfant",
      ctaText:
        "Contactez-nous dès aujourd'hui ou visitez notre campus pour découvrir notre établissement.",
    },
  },
  en: {
    metadata: {
      homeTitle: "Lycée Privé International Berthe & Jean",
      homeDescription:
        "An excellent education in Essassa, from lower secondary to upper secondary school, in a structured and ambitious environment.",
      aboutTitle: "About | Lycée Privé International Berthe & Jean",
      aboutDescription:
        "Mission, vision, values and educational approach of Lycée Privé International Berthe & Jean in Essassa.",
      programsTitle: "Programs | Lycée Privé International Berthe & Jean",
      programsDescription:
        "Programs from lower secondary to final year, BEPC and Baccalauréat preparation, learning areas and complementary activities.",
      admissionsTitle: "Admissions | Lycée Privé International Berthe & Jean",
      admissionsDescription:
        "Admission file, required documents, 2026-2027 fees and prospectus for Lycée Privé International Berthe & Jean.",
      lifeTitle: "School life | Lycée Privé International Berthe & Jean",
      lifeDescription:
        "School life, sports, clubs, culture, supervision and key moments at Lycée Privé International Berthe & Jean.",
      newsTitle: "News | Lycée Privé International Berthe & Jean",
      newsDescription:
        "News, results, events, agenda and announcements from Lycée Privé International Berthe & Jean.",
      contactTitle: "Contact | Lycée Privé International Berthe & Jean",
      contactDescription:
        "Address, phone, email, opening hours, contact form and practical information for Lycée Privé International Berthe & Jean.",
      newsNotFound: "News item not found | Lycée Privé International Berthe & Jean",
    },
    home: {
      eyebrow: "National Road 1 - PK 23 Essassa",
      title: "An excellent education in Essassa",
      intro:
        "Lycée Privé International Berthe & Jean supports students from lower to upper secondary school in a structured, ambitious setting open to the world, about 23 kilometers from Libreville.",
      discover: "Discover the school",
      admission: "Request admission",
      location: "Essassa, Ntoum municipality, Estuaire, Gabon",
      pillarsAria: "School strengths",
      aboutTitle: "About the school",
      aboutP1:
        "Lycée Privé International Berthe & Jean is a private secular general secondary school located in Essassa on National Road 1. It received public utility recognition on February 5, 2009.",
      aboutP2:
        "Its motto, “Savoir-être and Savoir-faire”, carries an educational project centered on academic rigor, ethics, mutual respect and responsible leadership.",
      values: "Our values: Discipline - Rigor - Innovation - Support",
      aboutImageAlt: "Green spaces on the Berthe and Jean school campus",
      clarityAria: "Institutional clarification",
      sinceTitle: "Since October 2025",
      sinceText:
        "Lycée Privé International Berthe & Jean continues its activities as an autonomous private entity, adjacent to and distinct from Lycée public d'Excellence d'Essassa. For the 2026-2027 school year, the prospectus announces new modern, spacious facilities adapted to the requirements of quality education.",
      leadershipEyebrow: "A word from the leadership",
      leadershipTitle: "A vision carried by committed leaders",
      leadershipText:
        "The leadership team's message highlights the school's educational project, its daily standards and the relationship of trust built with families. It brings together the censor, the principal and the founder around one ambition: to educate with rigor and humanity.",
      directionAlt:
        "MAVOUNGOU Denis Marin and OBOLO Clément, leadership team of Lycée Berthe et Jean",
      directionLabel: "Administrative leadership",
      directionTitle: "Mr. OBOLO Clément & Mr. MAVOUNGOU Denis Marin",
      directionText:
        "Since 2015, the leadership of Lycée Privé International Berthe & Jean has relied on strong administrative continuity: pedagogical standards, daily discipline and dialogue with families.",
      statsAria: "Key figures",
      programsTitle: "Our programs",
      infrastructureAria: "Campus and facilities",
      infrastructureEyebrow: "Campus, facilities & boarding",
      infrastructureTitle: "A school environment designed to learn and grow",
      infrastructureText:
        "The historic Essassa campus brings together learning spaces, sports facilities, a resource center, laboratories and boarding in a natural environment.",
      lifeNewsTitle: "School life & news",
      newsAria: "News",
      galleryAria: "School photos",
      galleryTitle: "The school in pictures",
      enlargePhoto: "Enlarge",
      galleryPreviewAria: "Photo preview",
      closeImage: "Close image",
      hymnAria: "Berthe and Jean anthem",
      hymnEyebrow: "School anthem",
      hymnTitle: "The Berthe & Jean anthem",
      hymnText:
        "The school anthem is available as audio with simple controls to highlight the identity, motto and spirit of the educational community.",
      officialHymn: "Official anthem",
      audioFallback: "Your browser does not support audio playback.",
    },
    about: {
      heroTitle: "About the school",
      heroText:
        "Located in Essassa, Lycée Privé International Berthe & Jean supports students from lower to upper secondary school in a structured, demanding and caring environment, helping them become responsible citizens.",
      heroAlt: "Students at Lycée Berthe et Jean supported in their learning",
      mission: "Our mission",
      contact: "Contact us",
      whoTitle: "Who are we?",
      whoP1:
        "Lycée Privé International Berthe & Jean is a private secular general secondary school located in Essassa, Gabon.",
      whoP2:
        "We welcome students from lower to upper secondary school in a safe, modern and stimulating environment that supports learning and personal development.",
      whoP3:
        "Our commitment is based on strong values and student-centered teaching, giving learners the means to succeed today and thrive tomorrow.",
      campusAlt: "Natural setting of the Berthe and Jean campus",
      directionAlt: "Building of Lycée Privé International Berthe et Jean",
      directionTitle: "A word from the leadership",
      directionP1:
        "At Lycée Privé International Berthe & Jean, the success and well-being of every student are at the heart of our work.",
      directionP2:
        "Our teaching team works every day to provide quality education in a climate of trust and respect, shaping responsible and ambitious young people.",
      directionP3:
        "We believe in each student's potential and are proud to guide them on the path to excellence.",
      directionSignature: "The Leadership Team",
      approach: "Our educational approach",
      life: "Life at school",
    },
    programs: {
      heroTitle: "Our programs",
      heroText:
        "Lycée Privé International Berthe & Jean offers a structured path from 6e to Terminale, based on academic excellence, personalized support and rigorous preparation for exams and the future.",
      heroAlt: "Students supported by a teacher",
      viewTracks: "View pathways",
      admissions: "Admissions",
      collegeTitle: "Lower secondary pathway",
      collegeAlt: "Lower secondary pathway at Lycée Berthe et Jean",
      collegeText:
        "The lower secondary cycle, from 6e to 3e, lays solid foundations for lasting success. Students develop core knowledge, working methods, language skills, sciences and digital tools.",
      lyceeTitle: "Upper secondary pathway",
      lyceeAlt: "Upper secondary pathway and scientific activities",
      lyceeText:
        "From the second cycle to Terminale, students benefit from advanced teaching, guidance support and demanding exam preparation.",
      domains: "Learning areas",
      series: "Streams and guidance in upper secondary school",
      exams: "Exam preparation",
      complementary: "Complementary activities",
      ctaTitle: "Build your pathway with Berthe & Jean",
    },
    admissions: {
      heroTitle: "Admissions",
      heroText:
        "Join Lycée Privé International Berthe & Jean and offer your child an environment of excellence, discipline and personalized support, from lower to upper secondary school.",
      heroAlt: "Students in the admission process",
      request: "Request admission",
      appointment: "Book an appointment",
      how: "How to apply",
      docs: "Required documents",
      levels: "Available levels",
      familyAlt: "Welcoming families at Lycée Berthe et Jean",
      why: "Why choose us?",
      prospectus: "Prospectus & financial conditions",
      prospectusText:
        "The information below is taken from the school's 2026-2027 prospectus. Amounts should be confirmed with the administration during final registration.",
      openPdf: "Open PDF",
      faq: "Frequently asked questions",
      ctaTitle: "Ready to join Berthe & Jean?",
    },
    life: {
      heroTitle: "School life",
      heroText:
        "At Lycée Privé International Berthe & Jean, we offer students a balanced school life combining discipline, sports, culture, clubs, personal development and academic support.",
      heroAlt: "Students at Lycée Berthe et Jean during an information session",
      discover: "Discover our activities",
      contact: "Contact us",
      sectionTitle: "A fulfilling school life",
      sectionP1:
        "Located in Essassa, our school offers a safe, structured and stimulating environment where every student can grow, learn and fully flourish.",
      sectionP2:
        "We encourage engagement, responsibility and self-confidence through a variety of activities and quality supervision.",
      location: "Essassa, Gabon",
      imageAlt: "School life on the Berthe and Jean campus",
      activities: "Our activities",
      moments: "Highlights of the year",
      difference: "Why our school life makes a difference",
      ctaTitle: "Discover a motivating environment to succeed and grow",
      ctaText: "Join Lycée Privé International Berthe & Jean in Essassa.",
    },
    news: {
      heroTitle: "News",
      heroText:
        "Stay informed about the latest news from Lycée Privé International Berthe & Jean: student achievements, key events, important announcements and initiatives that bring our school community to life.",
      heroAlt: "Award ceremony for students at Lycée Berthe et Jean",
      allNews: "View all news",
      contact: "Contact us",
      featured: "Featured",
      latest: "Latest news",
      agenda: "Agenda & announcements",
      announcements: "Important announcements",
      register: "Register",
      gallery: "Gallery of school life",
      ctaTitle: "Follow our news and be part of our school community!",
      ctaText:
        "Stay informed about the latest news and join Lycée Privé International Berthe & Jean.",
      backToNews: "Back to news",
      allArticles: "All news",
      alsoRead: "Read also",
    },
    contact: {
      heroTitle: "Contact",
      heroText:
        "Our team is ready to answer your questions, support your administrative steps and welcome you to Lycée Privé International Berthe & Jean in Essassa.",
      heroAlt: "Courtyard and buildings of Lycée Privé International Berthe et Jean",
      write: "Write to us",
      appointment: "Book an appointment",
      address: "Address",
      seeAddress: "View address on the map",
      phone: "Phone",
      callNow: "Call now",
      email: "Email",
      writeEmail: "Write by email",
      hours: "Opening hours",
      writeSchool: "Write to the school",
      quickActionsAria: "Quick contact actions",
      callSchool: "Call the school",
      sendEmail: "Send an email",
      directions: "Get directions",
      internationalTitle: "For international families",
      internationalText:
        "The school team can guide families looking for information about admissions, school life and visits in Essassa. Please contact the administration before coming to campus.",
      socialTitle: "Social media",
      socialText:
        "Follow announcements and school life directly from the official Facebook page.",
      facebook: "School Facebook page",
      visitTitle: "Campus visit by appointment",
      visitText:
        "Families can request a visit to discover classrooms, school life spaces and admission conditions.",
      requestVisit: "Request a visit",
      call: "Call",
      seeInfo: "View information",
      writeService: "Write to the service",
      entranceAlt: "Entrance of Lycée Privé International Berthe et Jean",
      findTitle: "Find us",
      findText:
        "Lycée Privé International Berthe & Jean is located on National Road 1, at PK 23 Essassa, in the municipality of Ntoum. From Libreville, take RN1 toward Essassa.",
      mapAria: "Google Maps location of the school in Essassa",
      mapTitle:
        "Google Maps location of Lycée Privé International Berthe et Jean in Essassa",
      landmark:
        "Practical landmark: National Road 1, PK 23 Essassa, Ntoum municipality, about 23 kilometers from Libreville.",
      openMaps: "Open in Google Maps",
      fromLibreville: "Directions from Libreville",
      campusAlt: "View of the Berthe and Jean campus",
      practical: "Practical information",
      followup: "For admission, prepare your documents before contacting us. The",
      followupLink: "Admissions",
      followupEnd: "page details the steps and documents required.",
      ctaTitle: "Let us meet to build your child's future",
      ctaText:
        "Contact us today or visit our campus to discover our school.",
    },
  },
} as const;

const enText: Record<string, string> = {
  Accueil: "Home",
  "À propos": "About",
  Programmes: "Programs",
  Admissions: "Admissions",
  "Vie scolaire": "School life",
  Actualités: "News",
  Contact: "Contact",
  "Essassa, Gabon": "Essassa, Gabon",
  "Route Nationale 1, PK 23 Essassa, Ntoum": "National Road 1, PK 23 Essassa, Ntoum",
  "Lun - Ven : 7h30 - 17h00": "Mon - Fri: 7:30 AM - 5:00 PM",
  "Sam : 9h00 - 12h00": "Sat: 9:00 AM - 12:00 PM",
  "Excellence académique": "Academic excellence",
  "Baccalauréat à 100% et BEPC à 98,31% affichés pour 2024-2025.":
    "100% Baccalauréat and 98.31% BEPC results reported for 2024-2025.",
  "Suivi personnalisé": "Personalized support",
  "Études encadrées et accompagnement des élèves en difficulté.":
    "Supervised study sessions and support for students facing difficulties.",
  "Nouveau départ": "A new beginning",
  "Des installations modernes annoncées pour la rentrée 2026-2027.":
    "Modern facilities announced for the 2026-2027 school year.",
  "Programmes nationaux": "National programs",
  "Un enseignement conforme au Ministère de l'Éducation nationale et à l'IPN.":
    "Teaching aligned with the Ministry of National Education and the IPN.",
  "Reconnaissance d'utilité publique": "Public utility recognition",
  "Secondaire général complet": "Complete general secondary education",
  "Séries du Baccalauréat": "Baccalauréat streams",
  "Route Nationale 1, Essassa": "National Road 1, Essassa",
  "Élèves maximum par classe historiquement": "Historical maximum number of students per class",
  "Nouvelles installations modernes": "New modern facilities",
  "Mot du censeur": "Message from the censor",
  "Censeur depuis septembre 2015": "Censor since September 2015",
  "MAVOUNGOU Denis Marin, censeur du Lycée Berthe et Jean":
    "MAVOUNGOU Denis Marin, censor of Lycée Berthe et Jean",
  "Depuis septembre 2015, notre mission est de garantir un cadre de travail sérieux, discipliné et humain. Le censeur veille chaque jour à l'assiduité, au respect des règles et à l'accompagnement des élèves, afin que chacun puisse progresser avec confiance et donner le meilleur de lui-même.":
    "Since September 2015, our mission has been to ensure a serious, disciplined and humane learning environment. The censor watches over attendance, respect for rules and student support every day, so each learner can progress with confidence and give their best.",
  "Mot du proviseur": "Message from the principal",
  "Proviseur adjoint de janvier à juin 2015, proviseur central depuis juillet 2015":
    "Deputy principal from January to June 2015, principal since July 2015",
  "OBOLO Clément, proviseur central du Lycée Berthe et Jean":
    "OBOLO Clément, principal of Lycée Berthe et Jean",
  "Notre ambition est de faire du Lycée Privé International Berthe & Jean un espace d'excellence, d'écoute et de responsabilité. Depuis juillet 2015, nous travaillons avec les enseignants, les familles et les élèves pour construire une réussite durable, fondée sur la rigueur, le mérite et l'ouverture.":
    "Our ambition is to make Lycée Privé International Berthe & Jean a place of excellence, listening and responsibility. Since July 2015, we have worked with teachers, families and students to build lasting success based on rigor, merit and openness.",
  "Mot de la fondatrice": "Message from the founder",
  "Fondatrice du Lycée Privé International Berthe & Jean":
    "Founder of Lycée Privé International Berthe & Jean",
  "Dr. Marie Madeleine Mborantsuo, fondatrice du Lycée Berthe et Jean":
    "Dr. Marie Madeleine Mborantsuo, founder of Lycée Berthe et Jean",
  "Photo : UN Photo/ICJ-CIJ/Frank van Beek": "Photo: UN Photo/ICJ-CIJ/Frank van Beek",
  "Fonder Berthe & Jean, c'est porter la conviction qu'une école peut transformer des parcours et révéler des talents. J'invite chaque élève à cultiver le goût de l'effort, l'élégance morale et l'amour du savoir, car l'excellence commence par la discipline personnelle et le respect des autres.":
    "Founding Berthe & Jean means carrying the conviction that a school can transform paths and reveal talents. I invite every student to cultivate effort, moral elegance and a love of knowledge, because excellence begins with personal discipline and respect for others.",
  Collège: "Lower secondary",
  "De la sixième à la troisième, un socle exigeant pour consolider les méthodes, la discipline et l'autonomie.":
    "From 6e to 3e, a demanding foundation to strengthen methods, discipline and independence.",
  "Élèves en séance de classe au Lycée Berthe et Jean":
    "Students in class at Lycée Berthe et Jean",
  Lycée: "Upper secondary",
  "Un cycle de la seconde à la terminale avec les séries générales A1, B, C et D.":
    "A cycle from Seconde to Terminale with general streams A1, B, C and D.",
  "Élèves réalisant une activité scientifique": "Students carrying out a science activity",
  "Préparation aux examens": "Exam preparation",
  "Un suivi régulier, des évaluations et des études encadrées pour préparer le BEPC et le Baccalauréat.":
    "Regular follow-up, assessments and supervised study to prepare for the BEPC and Baccalauréat.",
  "Groupe d'élèves du Lycée Berthe et Jean": "Group of students from Lycée Berthe et Jean",
  "Laboratoires de sciences": "Science laboratories",
  "Deux laboratoires équipés pour les manipulations scientifiques et l'expérimentation.":
    "Two equipped laboratories for scientific work and experimentation.",
  "Langues vivantes": "Modern languages",
  "Un laboratoire de langues pour renforcer l'anglais et l'espagnol.":
    "A language laboratory to strengthen English and Spanish.",
  "Salle informatique": "Computer room",
  "Une vingtaine de postes connectés à Internet pour les usages numériques.":
    "About twenty internet-connected workstations for digital learning.",
  "CDI & bibliothèque": "Resource center & library",
  "Un CDI moderne pour la lecture, la recherche et le travail autonome.":
    "A modern resource center for reading, research and independent work.",
  "Complexe sportif": "Sports complex",
  "Des terrains de football, basketball, volleyball et tennis.":
    "Football, basketball, volleyball and tennis facilities.",
  "Vie résidentielle": "Boarding life",
  "Internat non mixte, études surveillées et encadrement quotidien.":
    "Separate boarding, supervised study and daily guidance.",
  "Discipline & leadership": "Discipline & leadership",
  "L'Esprit Berthe & Jean valorise le dépassement de soi, le respect mutuel et le vivre-ensemble.":
    "The Berthe & Jean spirit values self-improvement, mutual respect and living together.",
  "Recherche & culture": "Research & culture",
  "Le CDI et les clubs socio-culturels développent la curiosité, l'expression et l'ouverture.":
    "The resource center and socio-cultural clubs develop curiosity, expression and openness.",
  "Prospectus 2026-2027 disponible": "2026-2027 prospectus available",
  "Les familles peuvent consulter les conditions d'inscription, les horaires et les frais publiés.":
    "Families can consult the published registration conditions, schedules and fees.",
  "Nouvelle configuration institutionnelle": "New institutional configuration",
  "Le pôle privé poursuit son activité comme entité autonome, distincte du Lycée public d'Excellence d'Essassa.":
    "The private section continues as an autonomous entity, distinct from Lycée public d'Excellence d'Essassa.",
  "Reconnaissance officielle": "Official recognition",
  "La reconnaissance d'utilité publique inscrit l'établissement dans la carte scolaire nationale.":
    "Public utility recognition places the school within the national school map.",
  Résultats: "Results",
  "Excellents résultats aux examens 2025": "Excellent 2025 examination results",
  "Nos élèves ont une fois de plus brillé aux examens nationaux : Baccalauréat à 100% et BEPC à 98,31%.":
    "Our students once again excelled in national examinations: 100% Baccalauréat and 98.31% BEPC.",
  "Élèves distingués pour leurs résultats scolaires": "Students recognized for their academic results",
  "Examens 2025": "2025 exams",
  "Le Lycée Privé International Berthe & Jean félicite ses élèves pour leur travail, leur persévérance et leur discipline tout au long de l'année.":
    "Lycée Privé International Berthe & Jean congratulates its students for their work, perseverance and discipline throughout the year.",
  "Ces résultats confirment l'importance d'un encadrement régulier, de la rigueur académique et d'un accompagnement personnalisé de chaque élève.":
    "These results confirm the importance of regular supervision, academic rigor and personalized support for every student.",
  "L'équipe pédagogique poursuit son engagement pour préparer les apprenants au BEPC, au Baccalauréat et à leurs projets d'avenir.":
    "The teaching team continues its commitment to preparing learners for the BEPC, the Baccalauréat and their future plans.",
  "Journée culturelle à Essassa": "Cultural day in Essassa",
  "Une journée riche en couleurs, en traditions et en partage pour célébrer notre diversité culturelle.":
    "A colorful day of traditions and sharing to celebrate our cultural diversity.",
  "Activité culturelle au lycée": "Cultural activity at the school",
  Culture: "Culture",
  Expression: "Expression",
  "La journée culturelle met en valeur les talents des élèves, l'expression artistique et le respect des identités.":
    "The cultural day highlights students' talents, artistic expression and respect for identities.",
  "À travers les présentations, les échanges et les activités, les élèves apprennent à mieux se connaître et à développer leur confiance.":
    "Through presentations, exchanges and activities, students learn to know one another better and build confidence.",
  "Cette initiative renforce la vie scolaire et rappelle que l'éducation se construit aussi par la culture, la créativité et le vivre-ensemble.":
    "This initiative strengthens school life and reminds us that education is also built through culture, creativity and living together.",
  "Ouverture des admissions 2025-2026": "Admissions open for 2025-2026",
  "Les demandes d'admission pour l'année scolaire sont ouvertes. Les familles peuvent contacter l'établissement dès maintenant.":
    "Admission requests for the school year are open. Families can contact the school now.",
  "PrÃ©inscription": "Pre-registration",
  Préinscription: "Pre-registration",
  Dossier: "File",
  Validation: "Validation",
  "Voir les admissions": "View admissions",
  "Les familles intéressées peuvent lancer une demande d'admission ou prendre contact avec le service admissions.":
    "Interested families can start an admission request or contact the admissions service.",
  "Le dossier permet à l'administration d'étudier le niveau demandé, les pièces scolaires et les besoins d'accompagnement de l'élève.":
    "The file allows the administration to review the requested level, school documents and the student's support needs.",
  "Une réponse est ensuite transmise aux parents afin de préparer sereinement les étapes suivantes de l'inscription.":
    "A response is then sent to parents so they can calmly prepare the next registration steps.",
  "Tournoi interclasses : esprit d'équipe et fair-play": "Inter-class tournament: teamwork and fair play",
  "Un tournoi sportif mémorable qui a renforcé l'esprit d'équipe et la solidarité entre les classes.":
    "A memorable sports tournament that strengthened teamwork and solidarity between classes.",
  "Élèves réunis pour une activité sportive": "Students gathered for a sports activity",
  Sport: "Sport",
  "Fair-play": "Fair play",
  Cohésion: "Cohesion",
  "Le tournoi interclasses encourage le dépassement de soi, le respect des règles et la cohésion entre les élèves.":
    "The inter-class tournament encourages self-improvement, respect for rules and cohesion among students.",
  "Au-delà du résultat sportif, ces rencontres permettent de cultiver le fair-play, l'entraide et la responsabilité.":
    "Beyond the sports result, these encounters cultivate fair play, mutual help and responsibility.",
  "La vie scolaire du lycée s'appuie sur ces moments pour équilibrer exigence académique et épanouissement personnel.":
    "School life relies on these moments to balance academic standards with personal fulfillment.",
  "Semaine de l'excellence et du mérite": "Excellence and merit week",
  "Célébration des meilleurs élèves et encouragement à l'effort, à la discipline et au dépassement de soi.":
    "Celebrating top students and encouraging effort, discipline and self-improvement.",
  "Bâtiment scolaire du lycée": "School building",
  Mérite: "Merit",
  Discipline: "Discipline",
  Distinctions: "Awards",
  "La semaine de l'excellence récompense les efforts constants et met en avant les parcours exemplaires.":
    "Excellence week rewards consistent effort and highlights exemplary paths.",
  "Elle encourage chaque élève à viser plus haut, avec humilité, discipline et confiance dans ses capacités.":
    "It encourages every student to aim higher with humility, discipline and confidence.",
  "L'établissement valorise ainsi une culture du mérite, du travail bien fait et de la progression continue.":
    "The school thus promotes a culture of merit, good work and continuous progress.",
  "Sortie éducative et découverte scientifique": "Educational trip and scientific discovery",
  "Une activité pour découvrir le monde des sciences et apprendre autrement, en dehors de la salle de classe.":
    "An activity to discover science and learn differently outside the classroom.",
  "Élèves en atelier scientifique": "Students in a science workshop",
  Sciences: "Sciences",
  Découverte: "Discovery",
  Orientation: "Guidance",
  "Les sorties éducatives enrichissent les apprentissages en reliant les cours à des expériences concrètes.":
    "Educational trips enrich learning by connecting lessons with concrete experiences.",
  "Elles développent la curiosité, l'esprit d'observation et la capacité des élèves à poser des questions.":
    "They develop curiosity, observation skills and students' ability to ask questions.",
  "Ces activités complètent l'enseignement scientifique et renforcent l'ouverture sur le monde professionnel et universitaire.":
    "These activities complement science teaching and strengthen openness to professional and higher education worlds.",
  "Rencontre parents-administration": "Parent-administration meeting",
  "Un échange constructif avec les parents pour faire le point sur les progrès et projets de l'établissement.":
    "A constructive exchange with parents to review the school's progress and projects.",
  "Réunion pédagogique au lycée": "Educational meeting at the school",
  Parents: "Parents",
  Suivi: "Follow-up",
  Dialogue: "Dialogue",
  "Contacter l'administration": "Contact the administration",
  "La relation avec les familles est essentielle pour accompagner efficacement les élèves.":
    "The relationship with families is essential to effectively support students.",
  "Ces rencontres permettent de présenter les projets, d'écouter les attentes et de renforcer le suivi individualisé.":
    "These meetings present projects, listen to expectations and strengthen individualized follow-up.",
  "Le lycée encourage un dialogue régulier entre parents, administration et équipe pédagogique.":
    "The school encourages regular dialogue between parents, administration and teaching staff.",
  "Les élèves du lycée réunis": "Students of the school gathered together",
  Frais: "Fees",
  "Consulter les démarches": "View the steps",
  "Le prospectus officiel présente les informations utiles pour préparer l'année scolaire 2026-2027.":
    "The official prospectus presents useful information to prepare for the 2026-2027 school year.",
  "Il détaille les niveaux concernés, les pièces à fournir, les conditions financières et les étapes d'admission.":
    "It details the relevant levels, required documents, financial conditions and admission steps.",
  "Le document peut être téléchargé depuis le site ou consulté directement en ligne.":
    "The document can be downloaded from the site or viewed directly online.",
  Institution: "Institution",
  Autonomie: "Autonomy",
  "Projet éducatif": "Educational project",
  "Bâtiment du Lycée Privé International Berthe et Jean":
    "Building of Lycée Privé International Berthe et Jean",
  "Le Lycée Privé International Berthe & Jean poursuit son projet éducatif dans une dynamique autonome.":
    "Lycée Privé International Berthe & Jean continues its educational project with autonomous momentum.",
  "Cette organisation permet de mieux affirmer l'identité du lycée, sa devise et son accompagnement des familles.":
    "This organization better affirms the school's identity, motto and support for families.",
  "L'établissement continue de renforcer son cadre pédagogique, son suivi des élèves et ses outils d'information.":
    "The school continues to strengthen its educational framework, student follow-up and information tools.",
  "Bâtiment du lycée": "School building",
  "La reconnaissance officielle marque une étape importante dans l'histoire du Lycée Privé International Berthe & Jean.":
    "Official recognition marks an important step in the history of Lycée Privé International Berthe & Jean.",
  "Elle confirme l'inscription de l'établissement dans un cadre éducatif structuré et reconnu.":
    "It confirms the school's place within a structured and recognized educational framework.",
  "Cette base institutionnelle soutient le développement d'un enseignement exigeant, ouvert et durable.":
    "This institutional foundation supports the development of demanding, open and sustainable education.",
  "Lycée Berthe & Jean": "Berthe & Jean School",
  "Espaces verts du campus": "Campus green spaces",
  "Cadre naturel": "Natural setting",
  "Élèves du lycée en séance d'information": "Students during an information session",
  "CDI": "Resource center",
  "Atelier scientifique avec des élèves": "Science workshop with students",
  "Groupe d'élèves": "Group of students",
  "Communauté éducative": "Educational community",
  "Demande d'inscription à titre privé adressée au proviseur":
    "Private admission request addressed to the principal",
  "Bulletins de notes des trois trimestres de l'année précédente":
    "Report cards for the three terms of the previous year",
  "Acte de naissance légalisé": "Legalized birth certificate",
  "Certificat médical datant de moins de trois mois":
    "Medical certificate issued less than three months ago",
  "Copie du carnet de santé pour les élèves de 6e":
    "Copy of the health booklet for 6e students",
  "Quatre photos d'identité récentes": "Four recent passport photos",
  "Retrait et renseignement de la fiche d'admission":
    "Collect and complete the admission form",
  "Dépôt du dossier scolaire complet": "Submit the complete school file",
  "Examen et validation par une commission de recrutement":
    "Review and validation by an admissions committee",
  "Inscription administrative après avis favorable":
    "Administrative registration after approval",
  "Entretien possible avec le psychologue pour un meilleur encadrement":
    "Possible meeting with the psychologist for better support",
  Niveaux: "Levels",
  "De la 6e à la Terminale": "From 6e to Terminale",
  Examens: "Exams",
  "BEPC et Baccalauréat": "BEPC and Baccalauréat",
  Séries: "Streams",
  Horaires: "Schedule",
  "8h00-13h30 ou 15h40 selon les classes":
    "8:00 AM-1:30 PM or 3:40 PM depending on classes",
  "Frais de dossier": "Application fee",
  "Frais d'inscription": "Registration fee",
  "Scolarité 1er cycle": "Lower cycle tuition",
  "Scolarité 2nd cycle": "Upper cycle tuition",
  Uniforme: "Uniform",
  "Transport scolaire": "School transport",
  "Prospectus Berthe & Jean 2026-2027": "Berthe & Jean 2026-2027 prospectus",
  "Présentation, admission, pièces à fournir, performances et conditions financières.":
    "Presentation, admissions, required documents, performance and financial conditions.",
  "Liste des manuels 2026-2027": "2026-2027 textbook list",
  "Manuels scolaires demandés pour la rentrée 2026-2027.":
    "Textbooks required for the 2026-2027 school year.",
  "Liste de fournitures rentrée 2026-2027": "2026-2027 school supplies list",
  "Fournitures scolaires à prévoir pour la rentrée 2026-2027.":
    "School supplies to prepare for the 2026-2027 school year.",
  "Notre mission": "Our mission",
  "Offrir une éducation d'excellence fondée sur la rigueur académique, la discipline et un accompagnement personnalisé de chaque élève.":
    "Offer an excellent education based on academic rigor, discipline and personalized support for every student.",
  "Notre vision": "Our vision",
  "Former des citoyens responsables, confiants et ouverts sur le monde, capables de relever les défis d'un monde en constante évolution.":
    "Educate responsible, confident citizens open to the world and able to meet the challenges of a constantly changing world.",
  "Nos valeurs": "Our values",
  Rigueur: "Rigor",
  Innovation: "Innovation",
  Accompagnement: "Support",
  "Encadrement de qualité": "Quality supervision",
  "Des enseignants qualifiés et investis qui assurent un suivi rigoureux et bienveillant.":
    "Qualified, committed teachers provide rigorous and caring support.",
  "Cadre sécurisé": "Safe environment",
  "Un environnement sain, sûr et stimulant pour apprendre en toute sérénité.":
    "A healthy, safe and stimulating environment for peaceful learning.",
  "Ouverture internationale": "International openness",
  "Langues, valeurs et ambition pour développer une vision ouverte sur le monde.":
    "Languages, values and ambition to develop a worldview open to the world.",
  "Collège au Lycée": "From lower to upper secondary",
  "Un collège à la terminale, nous accompagnons chaque élève à chaque étape.":
    "From lower secondary to Terminale, we support each student at every stage.",
  "Classes à taille humaine": "Human-scale classes",
  "Des effectifs raisonnables pour mieux suivre chaque élève et encourager sa progression.":
    "Reasonable class sizes to better support each student and encourage progress.",
  "Activités scolaires": "School activities",
  "Activités sportives, culturelles et scientifiques pour développer talents et passions.":
    "Sports, cultural and scientific activities to develop talents and passions.",
  "Admissions ouvertes": "Admissions open",
  "Les demandes d'admission pour l'année 2026-2027 sont ouvertes.":
    "Admission requests for the 2026-2027 year are open.",
  "Un environnement bienveillant qui favorise l'apprentissage, le respect et l'épanouissement de chacun.":
    "A caring environment that supports learning, respect and everyone's development.",
  "Élèves au travail en salle de classe": "Students working in the classroom",
  "Clubs & culture": "Clubs & culture",
  "Des clubs variés pour développer la créativité, l'expression et le sens des responsabilités.":
    "Varied clubs to develop creativity, expression and responsibility.",
  "Activité culturelle et documentaire au lycée": "Cultural and documentation activity at the school",
  "Activités sportives": "Sports activities",
  "Des disciplines sportives pour cultiver l'esprit d'équipe, la discipline et le dépassement de soi.":
    "Sports disciplines to cultivate teamwork, discipline and self-improvement.",
  Encadrement: "Supervision",
  "Des enseignants qualifiés et un suivi personnalisé.": "Qualified teachers and personalized follow-up.",
  "Préparation au BEPC, au Baccalauréat et à l'orientation.":
    "Preparation for the BEPC, Baccalauréat and guidance.",
  "Découverte et adaptation": "Discovery and adaptation",
  "Consolidation des apprentissages": "Learning consolidation",
  "Approfondissement et autonomie": "Deepening and autonomy",
  "Préparation au BEPC": "BEPC preparation",
  "Choix et construction de l'orientation": "Choosing and building a path",
  "Approfondissement des spécialités": "Deepening specialties",
  "Préparation au Bac et projets d'avenir": "Baccalauréat preparation and future plans",
  Langues: "Languages",
  "Maîtrise du français, de l'anglais et des compétences de communication.":
    "Mastery of French, English and communication skills.",
  "SVT, physique-chimie et expérimentation pour comprendre le monde.":
    "Life sciences, physics-chemistry and experimentation to understand the world.",
  Mathématiques: "Mathematics",
  "Raisonnement, logique et résolution de problèmes.": "Reasoning, logic and problem solving.",
  Humanités: "Humanities",
  "Histoire-géographie, culture générale et éducation à la citoyenneté.":
    "History-geography, general culture and citizenship education.",
  Numérique: "Digital skills",
  "Maîtrise des outils digitaux et des compétences du 21e siècle.":
    "Mastery of digital tools and 21st-century skills.",
  "Orientation & méthode": "Guidance & method",
  "Méthodes de travail, accompagnement à l'orientation et projets d'avenir.":
    "Working methods, guidance support and future plans.",
  "Série A1": "A1 stream",
  "Orientation littéraire, langues, culture générale et expression écrite et orale.":
    "Literary orientation, languages, general culture and written and oral expression.",
  "Série B": "B stream",
  "Sciences économiques et sociales, raisonnement, analyse et méthodes de travail.":
    "Economic and social sciences, reasoning, analysis and working methods.",
  "Série C": "C stream",
  "Mathématiques renforcées, sciences physiques et préparation aux filières scientifiques.":
    "Advanced mathematics, physical sciences and preparation for scientific pathways.",
  "Série D": "D stream",
  "Sciences de la vie, sciences physiques, mathématiques et ouverture vers les études supérieures.":
    "Life sciences, physical sciences, mathematics and openness to higher education.",
  "Un accompagnement rigoureux pour réussir le Brevet des Collèges : cours renforcés, révisions guidées et simulations régulières.":
    "Rigorous support to succeed in the BEPC: reinforced courses, guided revision and regular mock exams.",
  "Élèves en préparation au BEPC": "Students preparing for the BEPC",
  Baccalauréat: "Baccalauréat",
  "Préparation intensive au Bac général : approfondissement des spécialités, devoirs surveillés et entraînements ciblés.":
    "Intensive preparation for the general Baccalauréat: deepening specialties, supervised tests and targeted practice.",
  "Élèves préparant le Baccalauréat": "Students preparing for the Baccalauréat",
  "Accompagnement vers l'enseignement supérieur": "Support toward higher education",
  "Conseil en orientation, suivi individuel et aide à la constitution des dossiers.":
    "Guidance advice, individual follow-up and help preparing application files.",
  "Élèves accompagnés dans un projet scientifique": "Students supported in a science project",
  "Clubs artistiques, musique, théâtre, lecture et débats pour développer la créativité.":
    "Art clubs, music, theater, reading and debates to develop creativity.",
  "Club culturel au lycée": "Cultural club at the school",
  "Football, basket, athlétisme et bien-être pour cultiver l'esprit d'équipe.":
    "Football, basketball, athletics and wellness to cultivate team spirit.",
  "Activités sportives du lycée": "School sports activities",
  "Projets scientifiques": "Scientific projects",
  "Expériences, concours et projets innovants pour stimuler la curiosité.":
    "Experiments, competitions and innovative projects to stimulate curiosity.",
  "Projet scientifique au lycée": "Scientific project at the school",
  "Demande simple": "Simple request",
  "Une démarche rapide par contact direct ou sur place.": "A quick process by direct contact or on site.",
  "Étude du dossier": "File review",
  "Analyse des pièces et entretien si nécessaire.": "Review of documents and interview if necessary.",
  "Conseils selon le niveau et le parcours visé.": "Advice according to level and intended pathway.",
  Intégration: "Integration",
  "Accueil et accompagnement avant la rentrée.": "Welcome and support before the school year begins.",
  Demande: "Request",
  "Remplir la fiche d'admission.": "Complete the admission form.",
  "Déposer les pièces administratives et scolaires.": "Submit administrative and school documents.",
  "Étude du dossier et confirmation d'admission.": "File review and admission confirmation.",
  "Inscription finale": "Final registration",
  "Paiement, affectation et préparation de la rentrée.": "Payment, placement and preparation for the school year.",
  Transfert: "Transfer",
  "Accueil d'élèves venant d'autres établissements.": "Welcome for students from other schools.",
  "Un enseignement exigeant et des résultats durables.": "Demanding teaching and lasting results.",
  "Des enseignants qualifiés et un suivi attentif.": "Qualified teachers and attentive follow-up.",
  "Un environnement propice à l'apprentissage.": "An environment conducive to learning.",
  "Langues, valeurs et ambition pour l'avenir.": "Languages, values and ambition for the future.",
  "Quand commencent les inscriptions ?": "When do registrations begin?",
  "Les demandes d'admission sont ouvertes avant chaque rentrée scolaire et peuvent se poursuivre selon les places disponibles.":
    "Admission requests open before each school year and may continue depending on available places.",
  "Peut-on visiter le campus ?": "Can we visit the campus?",
  "Oui, des rendez-vous et des journées de découverte peuvent être organisés.":
    "Yes, appointments and discovery days can be organized.",
  "Comment contacter le service admissions ?": "How can I contact the admissions service?",
  "Par téléphone, e-mail ou directement à Essassa, Gabon.":
    "By phone, email or directly in Essassa, Gabon.",
  "Hymne Berthe & Jean": "Berthe & Jean anthem",
  "Un support audio transmis pour valoriser l'esprit, la devise et l'identité du lycée.":
    "An audio resource shared to highlight the school's spirit, motto and identity.",
  "Savoir-être - Savoir-faire": "Savoir-être - Savoir-faire",
  "L'hymne accompagne la vie scolaire et rappelle l'engagement collectif de la communauté éducative.":
    "The anthem accompanies school life and recalls the collective commitment of the educational community.",
  "À écouter sur le site": "Listen on the site",
  "Le lecteur audio intègre les contrôles natifs pour ordinateur et mobile.":
    "The audio player includes native controls for desktop and mobile.",
  "Visitez nos locaux, rencontrez notre équipe et découvrez la qualité de notre enseignement.":
    "Visit our facilities, meet our team and discover the quality of our teaching.",
  "Explorez nos programmes, rencontrez notre équipe pédagogique et offrez à votre enfant un environnement d'excellence.":
    "Explore our programs, meet our teaching team and offer your child an environment of excellence.",
  "Contactez notre service admissions ou demandez un accompagnement dès aujourd'hui.":
    "Contact our admissions service or request support today.",
};

function translateValue<T>(value: T): T {
  if (typeof value === "string") {
    return (enText[value] ?? value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateValue(item)) as T;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).map(([key, entry]) => [
      key,
      translateValue(entry),
    ]);
    return Object.fromEntries(entries) as T;
  }

  return value;
}

let englishData: SiteData | null = null;

export function getLocalizedSiteData(locale: Locale): SiteData {
  if (locale === "fr") {
    return siteData;
  }

  englishData ??= translateValue(siteData);
  return englishData;
}

export function getSiteDictionary(locale: Locale) {
  return {
    common: commonCopy[locale],
    pages: pageCopy[locale],
    data: getLocalizedSiteData(locale),
  };
}
