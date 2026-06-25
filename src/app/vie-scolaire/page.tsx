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
import { getSiteContent } from "../i18n-server";
import type { Locale } from "../i18n-config";
import { JsonLd } from "../JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata, getSiteUrl, SITE_URL } from "../seo";
import {
  ClosingCta,
  IconGrid,
  ImageCard,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pages } = await getSiteContent();
  const { lifeTitle, lifeDescription } = pages.metadata;

  return buildPageMetadata({
    title: lifeTitle,
    description: lifeDescription,
    path: "/vie-scolaire",
    locale,
    image: "/assets/real/student-cohort.jpg",
    imageAlt: "Vie scolaire et élèves du Lycée Privé International Berthe & Jean",
    keywords: ["vie scolaire Gabon", "internat lycée privé Gabon"],
  });
}

function getLifePageData(locale: Locale) {
  if (locale === "en") {
    return {
      lifeHighlights: [
        {
          icon: Trophy,
          title: "Sports activities",
          text: "A variety of sports to develop fitness, teamwork and self-improvement.",
        },
        {
          icon: Drama,
          title: "Clubs & culture",
          text: "Dynamic clubs to stimulate creativity, expression and curiosity.",
        },
        {
          icon: ShieldCheck,
          title: "Discipline & values",
          text: "An education based on respect, rigor and civic values.",
        },
        {
          icon: UsersRound,
          title: "Support",
          text: "Personalized guidance to help every student grow and succeed.",
        },
      ],
      activities: [
        {
          title: "Sport",
          text: "Football, basketball, athletics and more to move, train and grow.",
          image: "/assets/real/student-cohort.jpg",
          alt: "Sports activities at the school",
        },
        {
          title: "Clubs & debates",
          text: "Reading, debate, science and environment clubs: sharing, learning and speaking up.",
          image: "/assets/real/class-session.jpg",
          alt: "Students in a club and debate activity",
        },
        {
          title: "Music & arts",
          text: "Art workshops to reveal talents and cultivate creativity.",
          image: "/assets/real/cdi-library.jpg",
          alt: "Cultural and artistic activities",
        },
        {
          title: "Educational trips",
          text: "Visits and excursions to learn differently and discover the world.",
          image: "/assets/real/campus-gardens.jpeg",
          alt: "Educational trip on campus",
        },
        {
          title: "Academic support",
          text: "Support sessions to strengthen knowledge and confidence.",
          image: "/assets/real/science-workshop.jpg",
          alt: "Academic support and guidance",
        },
        {
          title: "Leadership & citizenship",
          text: "Civic initiatives, solidarity projects and responsibility-building.",
          image: "/assets/real/student-group.jpg",
          alt: "Students involved in a civic initiative",
        },
      ],
      yearMoments: [
        {
          image: "/assets/real/cdi-library.jpg",
          href: "/actualites/journee-culturelle-essassa",
          date: "15",
          month: "MAY",
          year: "2025",
          title: "Cultural day",
          text: "A celebration of the diversity and talents of our school community.",
        },
        {
          image: "/assets/real/student-cohort.jpg",
          href: "/actualites/tournoi-interclasses-esprit-equipe",
          date: "22",
          month: "JUN",
          year: "2025",
          title: "Interclass tournament",
          text: "Competition, fair play and team spirit at the heart of school life.",
        },
        {
          image: "/assets/real/student-group.jpg",
          href: "/actualites/semaine-excellence-merite",
          date: "05",
          month: "JUL",
          year: "2025",
          title: "Excellence week",
          text: "Valuing good work and encouraging every student to aim higher.",
        },
      ],
      differenceItems: [
        {
          icon: UsersRound,
          title: "Team spirit",
          text: "Students learn to collaborate and support one another.",
        },
        {
          icon: Handshake,
          title: "Attentive supervision",
          text: "Adults are available and attentive to every student.",
        },
        {
          icon: ClipboardList,
          title: "Balanced schedule",
          text: "A balanced rhythm to succeed and grow.",
        },
        {
          icon: Globe,
          title: "Openness to the world",
          text: "Activities and partnerships broaden horizons and perspectives.",
        },
      ],
      readMore: "Learn more",
    };
  }

  return {
    lifeHighlights: [
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
    ],
    activities: [
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
    ],
    yearMoments: [
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
    ],
    differenceItems: [
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
    ],
    readMore: "En savoir plus",
  };
}

export default async function VieScolairePage() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.life;
  const lifeData = getLifePageData(locale);

  return (
    <main className="site-shell">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: locale === "en" ? "Home" : "Accueil", path: "/" },
          {
            name: locale === "en" ? "School life" : "Vie scolaire",
            path: "/vie-scolaire",
          },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: locale === "en" ? "School events" : "Événements scolaires",
          itemListElement: lifeData.yearMoments.map((event, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Event",
              name: event.title,
              description: event.text,
              startDate: `${event.year}-${event.month === "MAI" || event.month === "MAY" ? "05" : event.month === "JUIN" || event.month === "JUN" ? "06" : "07"}-${event.date}`,
              location: {
                "@type": "Place",
                name: "Lycée Privé International Berthe & Jean",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Route Nationale 1, PK 23 Essassa",
                  addressLocality: "Ntoum",
                  addressRegion: "Estuaire",
                  addressCountry: "GA",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Lycée Privé International Berthe & Jean",
                url: SITE_URL,
              },
              url: getSiteUrl(event.href),
            },
          })),
        }}
      />
      <PageHero
        active="vie-scolaire"
        title={copy.heroTitle}
        text={copy.heroText}
        image="/assets/real/class-session.jpg"
        imageAlt={copy.heroAlt}
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          { label: copy.discover, href: "#activites" },
          { label: copy.contact, href: "/contact#message", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={lifeData.lifeHighlights} className="four-columns" />
      </section>

      <section className="page-section two-column-section">
        <div className="section-copy">
          <h2>{copy.sectionTitle}</h2>
          <p>{copy.sectionP1}</p>
          <p>{copy.sectionP2}</p>
          <p className="location-line">
            <MapPin size={21} />
            {copy.location}
          </p>
        </div>
        <div className="image-frame tall">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt={copy.imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </section>

      <section id="activites" className="page-section">
        <SectionHeading title={copy.activities} centered />
        <div className="image-card-grid two-rows">
          {lifeData.activities.map((item) => (
            <ImageCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.moments} />
        <div className="event-card-grid">
          {lifeData.yearMoments.map((item) => (
            <article className="event-card" key={item.title}>
              <div className="event-image">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 28vw" />
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
                  {lifeData.readMore} <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.difference} />
        <IconGrid items={lifeData.differenceItems} className="four-columns compact-icons" />
      </section>

      <ClosingCta title={copy.ctaTitle} text={copy.ctaText} common={common} />

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
