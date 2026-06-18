import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Drama,
  Globe,
  Handshake,
  MapPin,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import {
  ClosingCta,
  IconGrid,
  ImageCard,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";

export const metadata: Metadata = {
  title: "Vie scolaire | Lycée Privé International Berthe & Jean",
  description:
    "Vie scolaire, activités sportives, clubs, culture, encadrement et temps forts du Lycée Privé International Berthe & Jean.",
};

const lifeHighlights = [
  {
    icon: Trophy,
    title: "Activités sportives",
    text: "Des sports variés pour développer le corps, l'esprit d'équipe et le sens du dépassement.",
  },
  {
    icon: Drama,
    title: "Clubs & culture",
    text: "Des clubs dynamiques pour stimuler la créativité, l'expression et la curiosité.",
  },
  {
    icon: ShieldCheck,
    title: "Discipline & valeurs",
    text: "Une éducation fondée sur le respect, la rigueur et les valeurs citoyennes.",
  },
  {
    icon: UsersRound,
    title: "Accompagnement",
    text: "Un suivi personnalisé pour aider chaque élève à s'épanouir et réussir.",
  },
];

const activities = [
  {
    title: "Sport",
    text: "Football, basketball, athlétisme et bien plus pour bouger, s'entraîner et se dépasser.",
    image: "/assets/real/student-cohort.jpg",
    alt: "Activités sportives au lycée",
  },
  {
    title: "Clubs & débats",
    text: "Clubs de lecture, débats, sciences, environnement : partager, apprendre et s'exprimer.",
    image: "/assets/real/class-session.jpg",
    alt: "Élèves en club et débat",
  },
  {
    title: "Musique & arts",
    text: "Ateliers artistiques pour révéler les talents et cultiver la créativité.",
    image: "/assets/real/cdi-library.jpg",
    alt: "Activités culturelles et artistiques",
  },
  {
    title: "Sorties éducatives",
    text: "Des visites et excursions pour apprendre autrement et découvrir le monde.",
    image: "/assets/real/campus-gardens.jpeg",
    alt: "Sortie éducative dans le campus",
  },
  {
    title: "Soutien scolaire",
    text: "Des séances d'accompagnement pour renforcer les connaissances et la confiance.",
    image: "/assets/real/science-workshop.jpg",
    alt: "Soutien scolaire et accompagnement",
  },
  {
    title: "Leadership & citoyenneté",
    text: "Initiatives citoyennes, projets solidaires et prise de responsabilités.",
    image: "/assets/real/student-group.jpg",
    alt: "Élèves en initiative citoyenne",
  },
];

const yearMoments = [
  {
    image: "/assets/real/cdi-library.jpg",
    href: "/actualites/journee-culturelle-essassa",
    date: "15",
    month: "MAI",
    year: "2025",
    title: "Journée culturelle",
    text: "Célébration de la diversité et des talents de notre communauté scolaire.",
  },
  {
    image: "/assets/real/student-cohort.jpg",
    href: "/actualites/tournoi-interclasses-esprit-equipe",
    date: "22",
    month: "JUIN",
    year: "2025",
    title: "Tournoi interclasses",
    text: "Compétition, fair-play et esprit d'équipe au cœur de la vie du lycée.",
  },
  {
    image: "/assets/real/student-group.jpg",
    href: "/actualites/semaine-excellence-merite",
    date: "05",
    month: "JUIL.",
    year: "2025",
    title: "Semaine de l'excellence",
    text: "Valoriser le travail bien fait et encourager chaque élève à viser plus haut.",
  },
];

const differenceItems = [
  {
    icon: UsersRound,
    title: "Esprit d'équipe",
    text: "Les élèves apprennent à collaborer et à se soutenir.",
  },
  {
    icon: Handshake,
    title: "Encadrement attentif",
    text: "Des adultes disponibles et à l'écoute de chaque élève.",
  },
  {
    icon: ClipboardList,
    title: "Équilibre étude-vie scolaire",
    text: "Un emploi du temps harmonieux pour réussir et s'épanouir.",
  },
  {
    icon: Globe,
    title: "Ouverture sur le monde",
    text: "Des activités et partenariats pour élargir horizons et perspectives.",
  },
];

export default function VieScolairePage() {
  return (
    <main className="site-shell">
      <PageHero
        active="vie-scolaire"
        title="Vie scolaire"
        text="Au Lycée Privé International Berthe & Jean, nous offrons à nos élèves une vie scolaire équilibrée qui allie discipline, activités sportives, culture, clubs, développement personnel et accompagnement académique."
        image="/assets/real/campus-aerial.jpg"
        imageAlt="Élèves échangeant dans le campus du Lycée Berthe et Jean"
        actions={[
          { label: "Découvrir nos activités", href: "#activites" },
          { label: "Préinscription", href: "/preinscription", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={lifeHighlights} className="four-columns" />
      </section>

      <section className="page-section two-column-section">
        <div className="section-copy">
          <h2>Une vie scolaire épanouissante</h2>
          <p>
            Situé à Essassa, notre établissement offre un environnement sûr,
            structuré et stimulant où chaque élève peut grandir, apprendre et
            s&apos;épanouir pleinement.
          </p>
          <p>
            Nous encourageons l&apos;engagement, la responsabilité et la confiance en
            soi à travers une variété d&apos;activités et un encadrement de qualité.
          </p>
          <p className="location-line">
            <MapPin size={21} />
            Essassa, Gabon
          </p>
        </div>
        <div className="image-frame tall">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt="Vie scolaire dans le campus du Lycée Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </section>

      <section id="activites" className="page-section">
        <SectionHeading title="Nos activités" centered />
        <div className="image-card-grid two-rows">
          {activities.map((item) => (
            <ImageCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Temps forts de l'année" />
        <div className="event-card-grid">
          {yearMoments.map((item) => (
            <article className="event-card" key={item.title}>
              <div className="event-image">
                <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 28vw" />
              </div>
              <time>
                <strong>{item.date}</strong>
                <span>{item.month}</span>
                <span>{item.year}</span>
              </time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Pourquoi notre vie scolaire fait la différence ?" />
        <IconGrid items={differenceItems} className="four-columns compact-icons" />
      </section>

      <ClosingCta
        title="Découvrez un cadre de vie motivant pour réussir et s'épanouir"
        text="Rejoignez le Lycée Privé International Berthe & Jean à Essassa."
      />

      <SiteFooter />
    </main>
  );
}
