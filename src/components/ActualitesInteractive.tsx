"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  Search,
  Send,
  Share2,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { Locale } from "@/app/i18n-config";

export type NewsArticle = {
  slug: string;
  tag: string;
  date: string;
  dateTime: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  ctaHref?: string;
  ctaLabel?: string;
  summaryStats?: string[];
};

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
};

type NewsExplorerProps = {
  articles: NewsArticle[];
  locale: Locale;
};

type NewsletterSignupProps = {
  locale: Locale;
};

type NewsGalleryProps = {
  images: GalleryItem[];
  locale: Locale;
};

const newsInteractiveCopy = {
  fr: {
    allFilter: "Toutes",
    filtersAria: "Filtres des actualités",
    searchLabel: "Rechercher une actualité",
    searchPlaceholder: "Rechercher une actualité...",
    year: "Année",
    categoriesAria: "Catégories d'actualités",
    resultCount(count: number) {
      return `${count} actualité${count > 1 ? "s" : ""} trouvée${count > 1 ? "s" : ""}`;
    },
    readArticle: "Lire l'article",
    cardActions(title: string) {
      return `Actions pour ${title}`;
    },
    shareFacebook(title: string) {
      return `Partager ${title} sur Facebook`;
    },
    shareEmail(title: string) {
      return `Partager ${title} par e-mail`;
    },
    facebook: "Facebook",
    email: "E-mail",
    copied: "Copié",
    copy: "Copier",
    empty: "Aucune actualité ne correspond à votre recherche.",
    loadMore: "Charger plus d'actualités",
    newsletterEyebrow: "Suivre le lycée",
    newsletterTitle: "Recevoir les annonces importantes",
    newsletterText:
      "Admissions, réunions, visites du campus et informations scolaires : demandez à être ajouté à la liste de diffusion.",
    newsletterLabel: "Adresse e-mail",
    newsletterPlaceholder: "parent@email.com",
    newsletterButton: "S'inscrire",
    newsletterSubject: "Inscription aux actualités du lycée",
    newsletterBody(email: string) {
      return `Merci de m'inscrire aux actualités : ${email}`;
    },
    newsletterError: "Veuillez entrer une adresse e-mail valide.",
    newsletterSuccess: "Votre demande est prête à être envoyée par e-mail.",
    closeGallery: "Fermer la galerie",
    previousImage: "Image précédente",
    nextImage: "Image suivante",
  },
  en: {
    allFilter: "All",
    filtersAria: "News filters",
    searchLabel: "Search news",
    searchPlaceholder: "Search news...",
    year: "Year",
    categoriesAria: "News categories",
    resultCount(count: number) {
      return `${count} news item${count === 1 ? "" : "s"} found`;
    },
    readArticle: "Read the article",
    cardActions(title: string) {
      return `Actions for ${title}`;
    },
    shareFacebook(title: string) {
      return `Share ${title} on Facebook`;
    },
    shareEmail(title: string) {
      return `Share ${title} by email`;
    },
    facebook: "Facebook",
    email: "Email",
    copied: "Copied",
    copy: "Copy",
    empty: "No news item matches your search.",
    loadMore: "Load more news",
    newsletterEyebrow: "Follow the school",
    newsletterTitle: "Receive important announcements",
    newsletterText:
      "Admissions, meetings, campus visits and school information: ask to be added to the mailing list.",
    newsletterLabel: "Email address",
    newsletterPlaceholder: "parent@email.com",
    newsletterButton: "Subscribe",
    newsletterSubject: "School news subscription",
    newsletterBody(email: string) {
      return `Please add me to the news mailing list: ${email}`;
    },
    newsletterError: "Please enter a valid email address.",
    newsletterSuccess: "Your request is ready to be sent by email.",
    closeGallery: "Close gallery",
    previousImage: "Previous image",
    nextImage: "Next image",
  },
} as const;

const initialVisibleCount = 6;
const visibleStep = 3;
const publicSiteUrl = "https://lycee-berthe-jean-website.vercel.app";

function getYear(dateTime: string) {
  return dateTime.slice(0, 4);
}

function getPublicArticleUrl(slug: string) {
  return `${publicSiteUrl}/actualites/${slug}`;
}

function getArticleUrl(slug: string) {
  if (typeof window === "undefined") {
    return `/actualites/${slug}`;
  }

  return `${window.location.origin}/actualites/${slug}`;
}

export function NewsExplorer({ articles, locale }: NewsExplorerProps) {
  const copy = newsInteractiveCopy[locale];
  const [activeFilter, setActiveFilter] = useState<string>(copy.allFilter);
  const [query, setQuery] = useState("");
  const [activeYear, setActiveYear] = useState<string>(copy.allFilter);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filters = useMemo(
    () => [copy.allFilter, ...Array.from(new Set(articles.map((article) => article.tag)))],
    [articles, copy.allFilter],
  );

  const years = useMemo(
    () => [copy.allFilter, ...Array.from(new Set(articles.map((article) => getYear(article.dateTime))))],
    [articles, copy.allFilter],
  );

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesFilter = activeFilter === copy.allFilter || article.tag === activeFilter;
      const matchesYear = activeYear === copy.allFilter || getYear(article.dateTime) === activeYear;
      const searchableText = [
        article.title,
        article.excerpt,
        article.tag,
        article.date,
        article.summaryStats?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesFilter && matchesYear && matchesQuery;
    });
  }, [activeFilter, activeYear, articles, copy.allFilter, query]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  function updateFilter(filter: string) {
    setActiveFilter(filter);
    setVisibleCount(initialVisibleCount);
  }

  function updateYear(year: string) {
    setActiveYear(year);
    setVisibleCount(initialVisibleCount);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(initialVisibleCount);
  }

  async function copyArticleLink(slug: string) {
    const url = getArticleUrl(slug);

    try {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      window.setTimeout(() => setCopiedSlug(null), 1800);
    } catch {
      setCopiedSlug(null);
    }
  }

  return (
    <div className="news-explorer">
      <div className="news-toolbar" aria-label={copy.filtersAria}>
        <div className="news-search">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="news-search-input">
            {copy.searchLabel}
          </label>
          <input
            id="news-search-input"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            type="search"
          />
        </div>

        <label className="news-year-select">
          <span>{copy.year}</span>
          <select value={activeYear} onChange={(event) => updateYear(event.target.value)}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="news-filter-row" aria-label={copy.categoriesAria}>
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            aria-pressed={activeFilter === filter}
            onClick={() => updateFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="news-result-count" aria-live="polite">
        {copy.resultCount(filteredArticles.length)}
      </p>

      {visibleArticles.length > 0 ? (
        <div className="news-card-grid interactive-news-grid">
          {visibleArticles.map((article) => (
            <article className="news-card interactive-news-card" key={article.slug}>
              <Link className="news-card-main-link" href={`/actualites/${article.slug}`}>
                <div className="news-card-image">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 30vw"
                  />
                </div>
                <div className="interactive-news-content">
                  <div className="news-meta-row">
                    <span>{article.tag}</span>
                    <time dateTime={article.dateTime}>{article.date}</time>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  {article.summaryStats ? (
                    <ul className="news-stat-list">
                      {article.summaryStats.map((stat) => (
                        <li key={stat}>{stat}</li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="article-link">
                    {copy.readArticle} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>

              <div className="news-card-actions" aria-label={copy.cardActions(article.title)}>
                {article.ctaHref && article.ctaLabel ? (
                  <Link className="news-cta-link" href={article.ctaHref}>
                    {article.ctaLabel}
                  </Link>
                ) : null}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    getPublicArticleUrl(article.slug),
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={copy.shareFacebook(article.title)}
                >
                  <Share2 size={16} />
                  {copy.facebook}
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    article.title,
                  )}&body=${encodeURIComponent(getPublicArticleUrl(article.slug))}`}
                  aria-label={copy.shareEmail(article.title)}
                >
                  <Mail size={16} />
                  {copy.email}
                </a>
                <button type="button" onClick={() => void copyArticleLink(article.slug)}>
                  <Copy size={16} />
                  {copiedSlug === article.slug ? copy.copied : copy.copy}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="news-empty-state" role="status">
          {copy.empty}
        </div>
      )}

      {hasMore ? (
        <div className="center-action">
          <button
            type="button"
            className="text-action load-more-button"
            onClick={() => setVisibleCount((current) => current + visibleStep)}
          >
            {copy.loadMore} <ArrowRight size={16} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function NewsletterSignup({ locale }: NewsletterSignupProps) {
  const copy = newsInteractiveCopy[locale];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("success");
    window.location.href = `mailto:contact@bertheetjean.ga?subject=${encodeURIComponent(
      copy.newsletterSubject,
    )}&body=${encodeURIComponent(copy.newsletterBody(email.trim()))}`;
  }

  return (
    <section className="page-section newsletter-band" aria-labelledby="newsletter-title">
      <div>
        <span className="eyebrow">{copy.newsletterEyebrow}</span>
        <h2 id="newsletter-title">{copy.newsletterTitle}</h2>
        <p>{copy.newsletterText}</p>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email">{copy.newsletterLabel}</label>
        <div className="newsletter-input-row">
          <input
            id="newsletter-email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
            }}
            placeholder={copy.newsletterPlaceholder}
            type="email"
            autoComplete="email"
          />
          <button type="submit">
            <Send size={18} />
            {copy.newsletterButton}
          </button>
        </div>
        <p className={`newsletter-status ${status}`} aria-live="polite">
          {status === "error"
            ? copy.newsletterError
            : status === "success"
              ? copy.newsletterSuccess
              : ""}
        </p>
      </form>
    </section>
  );
}

export function NewsGallery({ images, locale }: NewsGalleryProps) {
  const copy = newsInteractiveCopy[locale];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? images.length - 1 : current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === images.length - 1 ? 0 : current + 1;
    });
  }

  return (
    <>
      <div className="gallery-strip interactive-gallery">
        {images.map((item, index) => (
          <button type="button" key={item.src} onClick={() => setActiveIndex(index)}>
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 24vw" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.label}>
          <button
            className="gallery-lightbox-close"
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label={copy.closeGallery}
          >
            <X size={22} />
          </button>
          <button
            className="gallery-lightbox-nav previous"
            type="button"
            onClick={showPrevious}
            aria-label={copy.previousImage}
          >
            <ChevronLeft size={28} />
          </button>
          <figure>
            <div>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 900px) 92vw, 74vw"
              />
            </div>
            <figcaption>{activeImage.label}</figcaption>
          </figure>
          <button
            className="gallery-lightbox-nav next"
            type="button"
            onClick={showNext}
            aria-label={copy.nextImage}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      ) : null}
    </>
  );
}
