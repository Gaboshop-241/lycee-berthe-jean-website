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
import {
  ClosingCta,
  IconGrid,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";
import { newsArticles } from "../site-data";

export const metadata: Metadata = {
  title: "Actualités | Lycée Privé International Berthe & Jean",
  description:
    "Actualités, résultats, événements, agenda et annonces du Lycée Privé International Berthe & Jean.",
};

const newsHighlights = [
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
];

const featuredArticle = newsArticles[0];
const latestNews = newsArticles.slice(1, 7);

const agendaItems = [
  {
    day: "12",
    month: "MAI",
    year: "2025",
    title: "Réunion des délégués de classe",
    text: "Rencontre mensuelle pour faire le point sur les activités et besoins des classes.",
    meta: "08h00 - Salle de réunion",
  },
  {
    day: "22",
    month: "JUIN",
    year: "2025",
    title: "Fête de fin d'année scolaire",
    text: "Célébration, remise de prix et spectacles des élèves.",
    meta: "09h00 - Cour principale",
  },
  {
    day: "05",
    month: "JUIL.",
    year: "2025",
    title: "Portes ouvertes du lycée",
    text: "Visitez notre campus, rencontrez nos équipes et découvrez nos programmes.",
    meta: "09h00 - Campus du lycée",
  },
];

const announcements = [
  {
    icon: ClipboardList,
    title: "Admissions 2025-2026",
    text: "Les demandes d'admission sont ouvertes. Contactez le service admissions dès maintenant.",
    href: "/admissions",
  },
  {
    icon: UsersRound,
    title: "Réunion des parents",
    text: "Les parents sont invités à la réunion trimestrielle le samedi 17 mai à 09h00.",
    href: "/contact",
  },
  {
    icon: CalendarDays,
    title: "Visite du campus",
    text: "Des visites guidées sont organisées chaque mercredi et samedi.",
    href: "/contact#rendez-vous",
  },
];

const gallery = [
  {
    image: "/assets/real/class-session.jpg",
    label: "Apprendre, comprendre, réussir",
  },
  {
    image: "/assets/real/student-cohort.jpg",
    label: "Esprit d'équipe et dépassement de soi",
  },
  {
    image: "/assets/real/cdi-library.jpg",
    label: "Culture, créativité et expression",
  },
  {
    image: "/assets/real/student-group.jpg",
    label: "Reconnaître l'effort, encourager l'excellence",
  },
];

export default function ActualitesPage() {
  return (
    <main className="site-shell">
      <PageHero
        active="actualites"
        title="Actualités"
        text="Restez informés des dernières nouvelles du Lycée Privé International Berthe & Jean : réussites de nos élèves, événements marquants, annonces importantes et initiatives qui font vivre notre communauté scolaire."
        image="/assets/real/student-group.jpg"
        imageAlt="Remise de distinction aux élèves du Lycée Berthe et Jean"
        actions={[
          { label: "Voir toutes les actualités", href: "#dernieres-actualites" },
          { label: "Nous contacter", href: "/contact", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={newsHighlights} className="four-columns" />
      </section>

      <section className="page-section">
        <SectionHeading title="À la une" />
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
            <span className="article-link">
              Lire l&apos;article <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </section>

      <section id="dernieres-actualites" className="page-section">
        <SectionHeading title="Dernières actualités" />
        <div className="news-card-grid">
          {latestNews.map((item) => (
            <Link className="news-card" href={`/actualites/${item.slug}`} key={item.title}>
              <div className="news-card-image">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 30vw" />
              </div>
              <div>
                <div className="news-meta-row">
                  <span>{item.tag}</span>
                  <time dateTime={item.dateTime}>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className="article-link">
                  Lire l&apos;article <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="center-action">
          <Link className="text-action" href="#dernieres-actualites">
            Voir toutes les actualités <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="page-section agenda-announcements">
        <div>
          <SectionHeading title="Agenda & annonces" />
          <div className="agenda-list">
            {agendaItems.map((item) => (
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
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title="Annonces importantes" />
          <div className="announcement-list">
            {announcements.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title}>
                  <Icon size={34} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <Link href={item.href}>
                      En savoir plus <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Galerie de la vie du lycée" />
        <div className="gallery-strip">
          {gallery.map((item) => (
            <figure key={item.label}>
              <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 24vw" />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ClosingCta
        title="Suivez notre actualité et faites partie de notre communauté scolaire !"
        text="Restez informé des dernières nouvelles et rejoignez le Lycée Privé International Berthe & Jean."
      />

      <SiteFooter />
    </main>
  );
}
