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

const latestNews = [
  {
    tag: "Vie scolaire",
    date: "10 mai 2025",
    title: "Journée culturelle à Essassa",
    text: "Une journée riche en couleurs, en traditions et en partage pour célébrer notre diversité culturelle.",
    image: "/assets/real/cdi-library.jpg",
  },
  {
    tag: "Admissions",
    date: "8 mai 2025",
    title: "Ouverture des préinscriptions 2025-2026",
    text: "Les préinscriptions pour l'année scolaire sont ouvertes. Réservez votre place dès maintenant.",
    image: "/assets/real/student-group.jpg",
  },
  {
    tag: "Vie scolaire",
    date: "5 mai 2025",
    title: "Tournoi interclasses : esprit d'équipe et fair-play",
    text: "Un tournoi sportif mémorable qui a renforcé l'esprit d'équipe et la solidarité entre les classes.",
    image: "/assets/real/student-cohort.jpg",
  },
  {
    tag: "Résultats",
    date: "2 mai 2025",
    title: "Semaine de l'excellence et du mérite",
    text: "Célébration des meilleurs élèves et encouragement à l'effort, à la discipline et au dépassement de soi.",
    image: "/assets/real/campus-building.jpg",
  },
  {
    tag: "Activités",
    date: "30 avril 2025",
    title: "Sortie éducative et découverte scientifique",
    text: "Visite du Centre National de Recherches pour découvrir le monde des sciences en action.",
    image: "/assets/real/science-workshop.jpg",
  },
  {
    tag: "Vie scolaire",
    date: "25 avril 2025",
    title: "Rencontre parents-administration",
    text: "Un échange constructif avec les parents pour faire le point sur les progrès et projets de l'établissement.",
    image: "/assets/real/class-session.jpg",
  },
];

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
    title: "Préinscriptions 2025-2026",
    text: "Les préinscriptions sont ouvertes. Réservez votre place dès maintenant sur notre plateforme.",
    href: "/preinscription",
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
        <article className="featured-news">
          <div className="featured-news-image">
            <Image
              src="/assets/real/campus-building.jpg"
              alt="Élèves distingués au Lycée Berthe et Jean"
              fill
              sizes="(max-width: 900px) 100vw, 38vw"
            />
          </div>
          <div>
            <div className="news-meta-row">
              <span>Résultats</span>
              <time dateTime="2025-04-28">28 avril 2025</time>
            </div>
            <h2>Excellents résultats aux examens 2025</h2>
            <p>
              Nos élèves ont une fois de plus brillé aux examens nationaux avec
              un taux de réussite remarquable. Félicitations à tous pour leur
              travail, leur persévérance et leur excellence.
            </p>
            <Link href="/actualites#dernieres-actualites">
              Lire l&apos;article <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </section>

      <section id="dernieres-actualites" className="page-section">
        <SectionHeading title="Dernières actualités" />
        <div className="news-card-grid">
          {latestNews.map((item) => (
            <article className="news-card" key={item.title}>
              <div className="news-card-image">
                <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
              </div>
              <div>
                <div className="news-meta-row">
                  <span>{item.tag}</span>
                  <time>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="center-action">
          <Link className="text-action" href="/actualites">
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
