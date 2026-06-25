import type { Metadata, MetadataRoute } from "next";
import type { Locale } from "./i18n-config";
import { contactInfo, newsArticles } from "./site-data";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lycee-berthe-jean-website.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Lycée Privé International Berthe & Jean";
export const SITE_ALTERNATE_NAME = "Institution Internationale Berthe et Jean";
export const DEFAULT_OG_IMAGE = "/assets/real/hero-berthe-jean-gabon4you.jpg";

export const SEO_KEYWORDS = [
  "Lycée Privé International Berthe et Jean",
  "Institution Internationale Berthe et Jean",
  "lycée privé international Gabon",
  "lycée privé Libreville",
  "école privée Essassa",
  "établissement scolaire privé Ntoum",
  "école privée au Gabon",
  "admission lycée privé Gabon",
  "école internationale Libreville",
  "collège lycée privé Gabon",
];

export const SEO_ROUTES = [
  {
    path: "/",
    lastModified: "2026-06-24",
    changeFrequency: "weekly",
    priority: 1,
    images: [DEFAULT_OG_IMAGE],
  },
  {
    path: "/a-propos",
    lastModified: "2026-06-24",
    changeFrequency: "monthly",
    priority: 0.82,
    images: ["/assets/real/class-session.jpg"],
  },
  {
    path: "/programmes",
    lastModified: "2026-06-24",
    changeFrequency: "monthly",
    priority: 0.86,
    images: ["/assets/real/class-session.jpg", "/assets/real/science-workshop.jpg"],
  },
  {
    path: "/admissions",
    lastModified: "2026-06-24",
    changeFrequency: "weekly",
    priority: 0.92,
    images: ["/assets/real/student-group.jpg"],
  },
  {
    path: "/vie-scolaire",
    lastModified: "2026-06-24",
    changeFrequency: "monthly",
    priority: 0.76,
    images: ["/assets/real/student-cohort.jpg"],
  },
  {
    path: "/actualites",
    lastModified: "2026-06-24",
    changeFrequency: "weekly",
    priority: 0.8,
    images: ["/assets/real/student-group.jpg"],
  },
  {
    path: "/contact",
    lastModified: "2026-06-24",
    changeFrequency: "monthly",
    priority: 0.78,
    images: ["/assets/real/building-courtyard.jpg"],
  },
  {
    path: "/faq",
    lastModified: "2026-06-24",
    changeFrequency: "monthly",
    priority: 0.7,
    images: ["/assets/real/class-session.jpg"],
  },
] as const;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type NewsArticle = (typeof newsArticles)[number];

export function getSiteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path.replace(/\/$/, "");
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath === "/" ? SITE_URL : `${SITE_URL}${cleanPath}`;
}

export function getOpenGraphLocale(locale: Locale) {
  return locale === "en" ? "en_US" : "fr_GA";
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  image = DEFAULT_OG_IMAGE,
  imageAlt = `${SITE_NAME} à Essassa, Gabon`,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords = [],
}: PageMetadataInput): Metadata {
  const canonical = getSiteUrl(path);
  const allKeywords = Array.from(new Set([...SEO_KEYWORDS, ...keywords]));
  const imageObject = {
    url: image,
    width: 1200,
    height: 630,
    alt: imageAlt,
  };
  const openGraph =
    type === "article"
      ? {
          title,
          description,
          url: canonical,
          siteName: SITE_NAME,
          locale: getOpenGraphLocale(locale),
          type: "article" as const,
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
          images: [imageObject],
        }
      : {
          title,
          description,
          url: canonical,
          siteName: SITE_NAME,
          locale: getOpenGraphLocale(locale),
          type: "website" as const,
          images: [imageObject],
        };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    category: "education",
    keywords: allKeywords,
    alternates: {
      canonical,
      languages: {
        "fr-GA": canonical,
        "x-default": canonical,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildSiteJsonLd(locale: Locale) {
  const schoolId = `${SITE_URL}/#school`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["School", "EducationalOrganization"],
        "@id": schoolId,
        name: SITE_NAME,
        alternateName: [SITE_ALTERNATE_NAME, "Berthe & Jean"],
        url: SITE_URL,
        logo: getSiteUrl("/assets/logo-berthe-jean.png"),
        image: [
          getSiteUrl(DEFAULT_OG_IMAGE),
          getSiteUrl("/assets/real/building-courtyard.jpg"),
          getSiteUrl("/assets/real/student-group.jpg"),
        ],
        description:
          "Lycée privé laïc international à Essassa, au Gabon, proposant un parcours du collège au lycée avec préparation aux examens.",
        slogan: "Savoir-être - Savoir-faire",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Route Nationale 1, PK 23 Essassa",
          addressLocality: "Ntoum",
          addressRegion: "Estuaire",
          addressCountry: "GA",
        },
        telephone: contactInfo.phones[0],
        email: contactInfo.emails[0],
        areaServed: ["Essassa", "Ntoum", "Libreville", "Gabon"],
        educationalLevel: ["Collège", "Lycée"],
        knowsAbout: [
          "Admissions",
          "Programmes collège et lycée",
          "Préparation au BEPC",
          "Préparation au Baccalauréat",
          "Vie scolaire",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:30",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "12:00",
          },
        ],
        sameAs: [contactInfo.facebookUrl],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAME,
        url: SITE_URL,
        inLanguage: locale === "en" ? "en" : "fr-GA",
        publisher: {
          "@id": schoolId,
        },
      },
    ],
  };
}

export function buildContactPageJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: locale === "en" ? "Contact Berthe & Jean School" : "Contact Lycée Berthe & Jean",
    url: getSiteUrl("/contact"),
    mainEntity: {
      "@type": "School",
      "@id": `${SITE_URL}/#school`,
      name: SITE_NAME,
      telephone: contactInfo.phones[0],
      email: contactInfo.emails[0],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Route Nationale 1, PK 23 Essassa",
        addressLocality: "Ntoum",
        addressRegion: "Estuaire",
        addressCountry: "GA",
      },
    },
  };
}

export function buildNewsArticleJsonLd(article: NewsArticle, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateTime,
    dateModified: article.dateTime,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#school`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#school`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: getSiteUrl("/assets/logo-berthe-jean.png"),
      },
    },
    image: getSiteUrl(article.image),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getSiteUrl(path),
    },
  };
}

export function buildNewsItemListJsonLd(articles: NewsArticle[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Actualités - ${SITE_NAME}`,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getSiteUrl(`/actualites/${article.slug}`),
      name: article.title,
    })),
  };
}

export function buildSitemapEntry(
  path: string,
  lastModified: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  images: readonly string[] = [],
): MetadataRoute.Sitemap[number] {
  return {
    url: getSiteUrl(path),
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
    images: images.map((image) => getSiteUrl(image)),
  };
}
