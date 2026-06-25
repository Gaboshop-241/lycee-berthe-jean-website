import type { Metadata } from "next";
import Image from "next/image";
import { getSiteContent } from "../i18n-server";
import { JsonLd } from "../JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "../seo";
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
  const { aboutTitle, aboutDescription } = pages.metadata;

  return buildPageMetadata({
    title: aboutTitle,
    description: aboutDescription,
    path: "/a-propos",
    locale,
    image: "/assets/real/class-session.jpg",
    imageAlt: "Élèves du Lycée Privé International Berthe & Jean à Essassa",
    keywords: ["mission lycée privé Gabon", "valeurs école privée Essassa"],
  });
}

export default async function AboutPage() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.about;

  return (
    <main className="site-shell">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: locale === "en" ? "Home" : "Accueil", path: "/" },
          { name: locale === "en" ? "About" : "À propos", path: "/a-propos" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: locale === "en" ? "Leadership team" : "Équipe de direction",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Person",
                name: "OBOLO Clément",
                jobTitle: locale === "en" ? "Principal" : "Proviseur",
                worksFor: {
                  "@type": "EducationalOrganization",
                  name: "Lycée Privé International Berthe & Jean",
                },
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Person",
                name: "MAVOUNGOU Denis Marin",
                jobTitle: locale === "en" ? "Censor" : "Censeur",
                worksFor: {
                  "@type": "EducationalOrganization",
                  name: "Lycée Privé International Berthe & Jean",
                },
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Person",
                name: "Dr. Marie Madeleine Mborantsuo",
                jobTitle: locale === "en" ? "Founder" : "Fondatrice",
                worksFor: {
                  "@type": "EducationalOrganization",
                  name: "Lycée Privé International Berthe & Jean",
                },
              },
            },
          ],
        }}
      />
      <PageHero
        active="a-propos"
        title={copy.heroTitle}
        text={copy.heroText}
        image="/assets/real/class-session.jpg"
        imageAlt={copy.heroAlt}
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          { label: copy.mission, href: "#mission" },
          { label: copy.contact, href: "/contact#message", variant: "secondary" },
        ]}
      />

      <section id="mission" className="page-section">
        <IconGrid items={data.aboutCards} className="three-columns" />
      </section>

      <section className="page-section two-column-section">
        <div className="section-copy">
          <h2>{copy.whoTitle}</h2>
          <p>{copy.whoP1}</p>
          <p>{copy.whoP2}</p>
          <p>{copy.whoP3}</p>
        </div>
        <div className="image-frame tall">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt={copy.campusAlt}
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </section>

      <section className="page-section direction-section">
        <div className="image-frame">
          <Image
            src="/assets/real/campus-building.jpg"
            alt={copy.directionAlt}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
        <div className="section-copy">
          <h2>{copy.directionTitle}</h2>
          <p>{copy.directionP1}</p>
          <p>{copy.directionP2}</p>
          <p>{copy.directionP3}</p>
          <strong>{copy.directionSignature}</strong>
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.approach} centered />
        <IconGrid items={data.approachItems} className="four-columns compact-icons" />
      </section>

      <section className="page-section">
        <SectionHeading title={copy.life} />
        <div className="image-card-grid">
          {data.lifeSchoolCards.map((item) => (
            <ImageCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <ClosingCta
        title={common.discoverCtaTitle}
        text={data.ctaText.discover}
        common={common}
      />

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
