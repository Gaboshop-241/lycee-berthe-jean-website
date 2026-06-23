import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Megaphone,
  Trophy,
  UsersRound,
} from "lucide-react";
import type { Locale } from "../i18n-config";
import { getSiteContent } from "../i18n-server";
import {
  ClosingCta,
  IconGrid,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";
import {
  NewsExplorer,
  NewsGallery,
  NewsletterSignup,
} from "@/components/ActualitesInteractive";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pages } = await getSiteContent();
  const { newsTitle, newsDescription } = pages.metadata;

  return {
    title: newsTitle,
    description: newsDescription,
    openGraph: {
      title: newsTitle,
      description: newsDescription,
      url: "/actualites",
      type: "website",
      locale: locale === "en" ? "en_US" : "fr_GA",
    },
    twitter: {
      card: "summary_large_image",
      title: newsTitle,
      description: newsDescription,
    },
  };
}

function getNewsPageData(locale: Locale) {
  if (locale === "en") {
    return {
      newsHighlights: [
        {
          icon: Trophy,
          title: "Results",
          text: "Discover our students' achievements and distinctions.",
        },
        {
          icon: CalendarDays,
          title: "Events",
          text: "Relive the key moments of school life.",
        },
        {
          icon: UsersRound,
          title: "School life",
          text: "Activities, clubs, projects and daily initiatives.",
        },
        {
          icon: Megaphone,
          title: "Announcements",
          text: "Important information and official notices.",
        },
      ],
      agendaItems: [
        {
          day: "12",
          month: "MAY",
          year: "2025",
          title: "Class delegate meeting",
          text: "Monday, May 12, 2025: monthly meeting to review class activities and needs. Internal participation.",
          meta: "8:00 AM - Meeting room",
        },
        {
          day: "22",
          month: "JUN",
          year: "2025",
          title: "End-of-year celebration",
          text: "Sunday, June 22, 2025: celebration, awards and student performances. Families are invited to confirm attendance.",
          meta: "9:00 AM - Main courtyard",
        },
        {
          day: "05",
          month: "JUL",
          year: "2025",
          title: "School open day",
          text: "Saturday, July 5, 2025: campus visit, meetings with teams and program presentation. Registration recommended.",
          meta: "9:00 AM - School campus",
          href: "/contact#visite-campus",
        },
      ],
      announcements: [
        {
          icon: ClipboardList,
          title: "Admissions 2025-2026",
          text: "Admission requests are open. Contact the admissions office now.",
          href: "/admissions",
        },
        {
          icon: UsersRound,
          title: "Parents' meeting",
          text: "Parents are invited to the term meeting on Saturday, May 17, 2025 at 9:00 AM. Confirmation with the administration is recommended.",
          href: "/contact#message",
        },
        {
          icon: CalendarDays,
          title: "Campus visit",
          text: "Guided tours are organized every Wednesday and Saturday by appointment.",
          href: "/contact#visite-campus",
        },
      ],
      readArticle: "Read the article",
      learnMore: "Learn more",
    };
  }

  return {
    newsHighlights: [
      {
        icon: Trophy,
        title: "Résultats",
        text: "Découvrez les performances et distinctions de nos élèves.",
      },
      {
        icon: CalendarDays,
        title: "Événements",
        text: "Revivez les moments forts de la vie du lycée.",
      },
      {
        icon: UsersRound,
        title: "Vie scolaire",
        text: "Activités, clubs, projets et initiatives au quotidien.",
      },
      {
        icon: Megaphone,
        title: "Annonces",
        text: "Informations importantes et communiqués officiels.",
      },
    ],
    agendaItems: [
      {
        day: "12",
        month: "MAI",
        year: "2025",
        title: "Réunion des délégués de classe",
        text: "Lundi 12 mai 2025 : rencontre mensuelle pour faire le point sur les activités et besoins des classes. Participation interne.",
        meta: "08h00 - Salle de réunion",
      },
      {
        day: "22",
        month: "JUIN",
        year: "2025",
        title: "Fête de fin d'année scolaire",
        text: "Dimanche 22 juin 2025 : célébration, remise de prix et spectacles des élèves. Les familles sont invitées à confirmer leur présence.",
        meta: "09h00 - Cour principale",
      },
      {
        day: "05",
        month: "JUIL.",
        year: "2025",
        title: "Portes ouvertes du lycée",
        text: "Samedi 5 juillet 2025 : visite du campus, rencontre avec les équipes et présentation des programmes. Inscription recommandée.",
        meta: "09h00 - Campus du lycée",
        href: "/contact#visite-campus",
      },
    ],
    announcements: [
      {
        icon: ClipboardList,
        title: "Admissions 2025-2026",
        text: "Les demandes d'admission sont ouvertes. Contactez le service admissions dès maintenant.",
        href: "/admissions",
      },
      {
        icon: UsersRound,
        title: "Réunion des parents",
        text: "Les parents sont invités à la réunion trimestrielle le samedi 17 mai 2025 à 09h00. Confirmation souhaitée auprès de l'administration.",
        href: "/contact#message",
      },
      {
        icon: CalendarDays,
        title: "Visite du campus",
        text: "Des visites guidées sont organisées chaque mercredi et samedi sur rendez-vous.",
        href: "/contact#visite-campus",
      },
    ],
    readArticle: "Lire l'article",
    learnMore: "En savoir plus",
  };
}

export default async function ActualitesPage() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.news;
  const newsPageData = getNewsPageData(locale);
  const featuredArticle = data.newsArticles[0];

  return (
    <main className="site-shell">
      <PageHero
        active="actualites"
        title={copy.heroTitle}
        text={copy.heroText}
        image="/assets/real/student-group.jpg"
        imageAlt={copy.heroAlt}
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          { label: copy.allNews, href: "#dernieres-actualites" },
          { label: copy.contact, href: "/contact", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={newsPageData.newsHighlights} className="four-columns" />
      </section>

      <section className="page-section">
        <SectionHeading title={copy.featured} />
        <Link className="featured-news" href={`/actualites/${featuredArticle.slug}`}>
          <div className="featured-news-image">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.alt}
              fill
              sizes="(max-width: 900px) 100vw, 38vw"
            />
          </div>
          <div>
            <div className="news-meta-row">
              <span>{featuredArticle.tag}</span>
              <time dateTime={featuredArticle.dateTime}>{featuredArticle.date}</time>
            </div>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.excerpt}</p>
            {featuredArticle.summaryStats ? (
              <ul className="news-stat-list featured-stat-list">
                {featuredArticle.summaryStats.map((stat) => (
                  <li key={stat}>{stat}</li>
                ))}
              </ul>
            ) : null}
            <span className="article-link">
              {newsPageData.readArticle} <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </section>

      <section id="dernieres-actualites" className="page-section">
        <SectionHeading title={copy.latest} />
        <NewsExplorer key={locale} articles={data.newsArticles} locale={locale} />
      </section>

      <section className="page-section agenda-announcements">
        <div>
          <SectionHeading title={copy.agenda} />
          <div className="agenda-list">
            {newsPageData.agendaItems.map((item) => (
              <article key={item.title}>
                <time>
                  <strong>{item.day}</strong>
                  <span>{item.month}</span>
                  <span>{item.year}</span>
                </time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <small>{item.meta}</small>
                  {"href" in item && item.href ? (
                    <Link className="agenda-link" href={item.href}>
                      {copy.register} <ArrowRight size={16} />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title={copy.announcements} />
          <div className="announcement-list">
            {newsPageData.announcements.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title}>
                  <Icon size={34} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <Link href={item.href}>
                      {newsPageData.learnMore} <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.gallery} />
        <NewsGallery key={locale} images={data.galleryImages} locale={locale} />
      </section>

      <NewsletterSignup key={locale} locale={locale} />

      <ClosingCta title={copy.ctaTitle} text={copy.ctaText} common={common} />

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
