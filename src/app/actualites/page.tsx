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
import {
  NewsExplorer,
  NewsGallery,
  NewsletterSignup,
} from "@/components/ActualitesInteractive";
import { galleryImages, newsArticles } from "../site-data";

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

const agendaItems = [
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
    text: "Les parents sont invités à la réunion trimestrielle le samedi 17 mai 2025 à 09h00. Confirmation souhaitée auprès de l'administration.",
    href: "/contact#message",
  },
  {
    icon: CalendarDays,
    title: "Visite du campus",
    text: "Des visites guidées sont organisées chaque mercredi et samedi sur rendez-vous.",
    href: "/contact#visite-campus",
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
            {featuredArticle.summaryStats ? (
              <ul className="news-stat-list featured-stat-list">
                {featuredArticle.summaryStats.map((stat) => (
                  <li key={stat}>{stat}</li>
                ))}
              </ul>
            ) : null}
            <span className="article-link">
              Lire l&apos;article <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </section>

      <section id="dernieres-actualites" className="page-section">
        <SectionHeading title="Dernières actualités" />
        <NewsExplorer articles={newsArticles} />
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
                  {"href" in item && item.href ? (
                    <Link className="agenda-link" href={item.href}>
                      S&apos;inscrire <ArrowRight size={16} />
                    </Link>
                  ) : null}
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
        <NewsGallery images={galleryImages} />
      </section>

      <NewsletterSignup />

      <ClosingCta
        title="Suivez notre actualité et faites partie de notre communauté scolaire !"
        text="Restez informé des dernières nouvelles et rejoignez le Lycée Privé International Berthe & Jean."
      />

      <SiteFooter />
    </main>
  );
}
