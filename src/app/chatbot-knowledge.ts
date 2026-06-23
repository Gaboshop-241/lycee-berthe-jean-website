import { getSiteDictionary } from "./i18n-content";
import type { Locale } from "./i18n-config";

export type ChatAction = {
  href?: string;
  id: string;
  kind: "internal" | "external" | "phone" | "email" | "notification";
  label: string;
  topic?: "news" | "admissions" | "general";
};

type KnowledgeChunk = {
  always?: boolean;
  href?: string;
  tags: string[];
  text: string;
  title: string;
};

const MAX_CONTEXT_CHUNKS = 14;

const actionLabels = {
  fr: {
    admissions: "Voir les admissions",
    call: "Appeler le lycee",
    contact: "Aller a la page Contact",
    email: "Envoyer un e-mail",
    maps: "Ouvrir l'itineraire",
    news: "Voir les actualites",
    notifications: "Activer les notifications",
    preinscription: "Preinscription",
    programs: "Voir les programmes",
    schoolLife: "Consulter la vie scolaire",
  },
  en: {
    admissions: "View admissions",
    call: "Call the school",
    contact: "Go to Contact",
    email: "Send an email",
    maps: "Open directions",
    news: "View news",
    notifications: "Enable notifications",
    preinscription: "Pre-registration",
    programs: "View programs",
    schoolLife: "See school life",
  },
} as const;

const intentKeywords = {
  admissions: [
    "admission",
    "admissions",
    "inscription",
    "inscrire",
    "preinscription",
    "dossier",
    "documents",
    "frais",
    "fees",
    "apply",
    "registration",
    "enroll",
  ],
  contact: [
    "contact",
    "telephone",
    "phone",
    "mail",
    "email",
    "adresse",
    "address",
    "appeler",
    "call",
  ],
  location: [
    "essassa",
    "itineraire",
    "itinéraire",
    "maps",
    "map",
    "where",
    "ou",
    "où",
    "route",
    "location",
  ],
  news: [
    "actualite",
    "actualités",
    "actualites",
    "news",
    "annonce",
    "annonces",
    "nouvelle",
    "publication",
  ],
  notifications: [
    "notification",
    "notifications",
    "notifier",
    "alerte",
    "alert",
    "rappel",
    "reminder",
  ],
  programs: [
    "programme",
    "programmes",
    "program",
    "programs",
    "college",
    "collège",
    "lycee",
    "lycée",
    "classe",
    "niveau",
    "series",
    "séries",
  ],
  schoolLife: [
    "vie scolaire",
    "school life",
    "club",
    "clubs",
    "sport",
    "sports",
    "culture",
    "discipline",
    "internat",
  ],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getWords(value: string) {
  return normalize(value)
    .split(/[^a-z0-9]+/i)
    .filter((word) => word.length > 2);
}

function compact(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function joinList(items: Array<string | number | undefined>, separator = " | ") {
  return items.filter(Boolean).map(String).join(separator);
}

function containsIntent(message: string, intent: keyof typeof intentKeywords) {
  const normalized = normalize(message);
  return intentKeywords[intent].some((keyword) => normalized.includes(normalize(keyword)));
}

function uniqueActions(actions: ChatAction[]) {
  const seen = new Set<string>();
  return actions
    .filter((action) => {
      const key = `${action.kind}:${action.href ?? action.topic ?? action.id}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, 4);
}

function getContactTargets(locale: Locale) {
  const { data } = getSiteDictionary(locale);
  const phone = data.contactInfo.phones[0] ?? "";
  const email = data.contactInfo.emails[0] ?? "";

  return {
    email,
    emailHref: email ? `mailto:${email}` : undefined,
    mapsHref: data.contactInfo.directionsFromLibrevilleUrl || data.contactInfo.mapsUrl,
    phone,
    phoneHref: phone ? `tel:${phone.replace(/\s/g, "")}` : undefined,
  };
}

function getKnowledgeChunks(locale: Locale): KnowledgeChunk[] {
  const { common, data, pages } = getSiteDictionary(locale);
  const contact = data.contactInfo;

  return [
    {
      always: true,
      href: "/contact",
      tags: ["identity", "contact", "hours", "address", "footer"],
      title: locale === "en" ? "School identity and contact" : "Identite et contact du lycee",
      text: compact(
        [
          common.brandTitleLine1,
          common.brandTitleLine2,
          common.brandMotto,
          contact.location,
          contact.postal,
          contact.emails.join(", "),
          contact.phones.join(", "),
          contact.hours.join(", "),
          contact.facebookUrl,
        ].join(". "),
      ),
    },
    {
      always: true,
      tags: ["navigation", "links", "footer"],
      title: locale === "en" ? "Useful links" : "Liens utiles",
      text: data.navItems.map((item) => `${item.label}: ${item.href}`).join(" | "),
    },
    {
      href: "/",
      tags: ["home", "overview", "values"],
      title: locale === "en" ? "Home page" : "Page accueil",
      text: compact(
        [
          pages.home.title,
          pages.home.intro,
          pages.home.aboutTitle,
          pages.home.aboutP1,
          pages.home.aboutP2,
          pages.home.values,
          data.pillars.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.stats.map((item) => item.join(": ")).join(" | "),
        ].join(". "),
      ),
    },
    {
      href: "/a-propos",
      tags: ["about", "mission", "vision", "leadership", "fondatrice", "proviseur", "censeur"],
      title: locale === "en" ? "About the school" : "A propos du lycee",
      text: compact(
        [
          pages.about.heroTitle,
          pages.about.heroText,
          data.aboutCards.map((item) => joinList([item.title, item.text, item.list?.join(", ")], ": ")).join(" | "),
          data.approachItems.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.leadershipMessages.map((item) => `${item.role} - ${item.name}: ${item.tenure}. ${item.message}`).join(" | "),
        ].join(". "),
      ),
    },
    {
      href: "/programmes",
      tags: ["programs", "programme", "college", "lycee", "examens", "bac", "bepc", "series"],
      title: locale === "en" ? "Programs" : "Programmes",
      text: compact(
        [
          pages.programs.heroTitle,
          pages.programs.heroText,
          data.programs.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.programHighlights.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.collegeLevels.map((item) => item.join(": ")).join(" | "),
          data.lyceeLevels.map((item) => item.join(": ")).join(" | "),
          data.programSeries.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.examPrepItems.map((item) => `${item.title}: ${item.text}`).join(" | "),
        ].join(". "),
      ),
    },
    {
      href: "/admissions",
      tags: ["admissions", "inscription", "preinscription", "documents", "fees", "frais", "dossier"],
      title: locale === "en" ? "Admissions" : "Admissions",
      text: compact(
        [
          pages.admissions.heroTitle,
          pages.admissions.heroText,
          data.admissionHighlights.map((item) => `${item.title}: ${item.text}`).join(" | "),
          `Documents: ${data.admissionDocs.join(" | ")}`,
          `Etapes: ${data.admissionSteps.join(" | ")}`,
          `Processus: ${data.admissionProcess.map((item) => `${item.title}: ${item.text}`).join(" | ")}`,
          `Niveaux: ${data.admissionLevels.map((item) => `${item.title}: ${item.text}`).join(" | ")}`,
          `Frais: ${data.financialItems.map((item) => item.join(": ")).join(" | ")}`,
          `Telechargements: ${data.downloadItems.map((item) => `${item.title}: ${item.href}`).join(" | ")}`,
          data.faqItems.map((item) => `${item.question} ${item.answer}`).join(" | "),
        ].join(". "),
      ),
    },
    {
      href: "/vie-scolaire",
      tags: ["school life", "vie scolaire", "clubs", "culture", "sport", "discipline", "internat"],
      title: locale === "en" ? "School life" : "Vie scolaire",
      text: compact(
        [
          pages.life.heroTitle,
          pages.life.heroText,
          data.lifeItems.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.lifeSchoolCards.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.complementaryActivities.map((item) => `${item.title}: ${item.text}`).join(" | "),
          data.infrastructures.map((item) => `${item.title}: ${item.text}`).join(" | "),
        ].join(". "),
      ),
    },
    {
      href: "/actualites",
      tags: ["news", "actualites", "annonces", "events", "resultats", "prospectus"],
      title: locale === "en" ? "News" : "Actualites",
      text: compact(
        [
          pages.news.heroTitle,
          pages.news.heroText,
          data.newsItems.map((item) => `${item.dateTime} - ${item.title}: ${item.text} (${item.href})`).join(" | "),
          data.newsArticles.map((item) => `${item.date} - ${item.title}: ${item.excerpt} ${item.summaryStats?.join(", ") ?? ""} /actualites/${item.slug}`).join(" | "),
        ].join(". "),
      ),
    },
    {
      href: "/contact",
      tags: ["contact", "phone", "email", "maps", "address", "hours", "facebook"],
      title: locale === "en" ? "Contact page" : "Page contact",
      text: compact(
        [
          pages.contact.heroTitle,
          pages.contact.heroText,
          contact.location,
          contact.postal,
          contact.emails.join(", "),
          contact.phones.join(", "),
          contact.hours.join(", "),
          contact.mapsUrl,
          contact.directionsFromLibrevilleUrl,
          contact.facebookUrl,
        ].join(". "),
      ),
    },
  ];
}

function scoreChunk(chunk: KnowledgeChunk, query: string) {
  const queryWords = new Set(getWords(query));
  const haystack = normalize(`${chunk.title} ${chunk.tags.join(" ")} ${chunk.text}`);
  let score = chunk.always ? 100 : 0;

  for (const word of queryWords) {
    if (haystack.includes(word)) {
      score += chunk.tags.some((tag) => normalize(tag).includes(word)) ? 8 : 3;
    }
  }

  return score;
}

export function buildChatbotKnowledge(locale: Locale, query: string) {
  const chunks = getKnowledgeChunks(locale)
    .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, query) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CONTEXT_CHUNKS);
  const intro =
    locale === "en"
      ? "Knowledge base generated from the current website content. Use only this information and the conversation. If the answer is not covered here, say so and suggest contacting the administration."
      : "Base de connaissances generee depuis le contenu actuel du site. Utilise uniquement ces informations et la conversation. Si la reponse n'est pas couverte ici, dis-le et propose de contacter l'administration.";

  return [
    intro,
    ...chunks.map((chunk) => {
      const href = chunk.href ? ` (${chunk.href})` : "";
      return `[${chunk.title}${href}] ${chunk.text}`;
    }),
  ].join("\n");
}

export function buildActionInstruction(locale: Locale, actions: ChatAction[]) {
  if (actions.length === 0) {
    return "";
  }

  const list = actions.map((action) => `- ${action.label}${action.href ? `: ${action.href}` : ""}`).join("\n");

  if (locale === "en") {
    return `Useful action buttons will be shown with this answer:\n${list}\nMention them only if it feels natural. If there is a notification button, ask for permission in a calm, non-insistent way.`;
  }

  return `Des boutons d'action utiles seront affiches avec cette reponse :\n${list}\nMentionne-les seulement si c'est naturel. S'il y a un bouton de notification, demande l'autorisation calmement, sans insister.`;
}

export function getChatbotActions(locale: Locale, message: string): ChatAction[] {
  const labels = actionLabels[locale];
  const contact = getContactTargets(locale);
  const actions: ChatAction[] = [];

  if (containsIntent(message, "contact")) {
    actions.push(
      { href: "/contact", id: "contact-page", kind: "internal", label: labels.contact },
      { href: contact.phoneHref, id: "call-school", kind: "phone", label: labels.call },
      { href: contact.emailHref, id: "email-school", kind: "email", label: labels.email },
    );
  }

  if (containsIntent(message, "location")) {
    actions.push(
      { href: contact.mapsHref, id: "maps", kind: "external", label: labels.maps },
      { href: "/contact", id: "contact-page", kind: "internal", label: labels.contact },
    );
  }

  if (containsIntent(message, "admissions")) {
    actions.push(
      { href: "/admissions", id: "admissions", kind: "internal", label: labels.admissions },
      { href: "/preinscription", id: "preinscription", kind: "internal", label: labels.preinscription },
      { href: "/contact", id: "contact-page", kind: "internal", label: labels.contact },
    );
  }

  if (containsIntent(message, "programs")) {
    actions.push(
      { href: "/programmes", id: "programs", kind: "internal", label: labels.programs },
      { href: "/admissions", id: "admissions", kind: "internal", label: labels.admissions },
    );
  }

  if (containsIntent(message, "schoolLife")) {
    actions.push(
      { href: "/vie-scolaire", id: "school-life", kind: "internal", label: labels.schoolLife },
      { href: "/contact", id: "contact-page", kind: "internal", label: labels.contact },
    );
  }

  if (containsIntent(message, "news")) {
    actions.push(
      { href: "/actualites", id: "news", kind: "internal", label: labels.news },
      { id: "notify-news", kind: "notification", label: labels.notifications, topic: "news" },
    );
  }

  if (containsIntent(message, "notifications")) {
    actions.push(
      { id: "notify-general", kind: "notification", label: labels.notifications, topic: "general" },
    );
  }

  return uniqueActions(actions.filter((action) => action.kind === "notification" || Boolean(action.href)));
}
