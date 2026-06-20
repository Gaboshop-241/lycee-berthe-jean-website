import type { Metadata } from "next";
import Image from "next/image";
import { getSiteContent } from "../i18n-server";
import {
  ClosingCta,
  IconGrid,
  ImageCard,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getSiteContent();

  return {
    title: pages.metadata.aboutTitle,
    description: pages.metadata.aboutDescription,
  };
}

export default async function AboutPage() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.about;

  return (
    <main className="site-shell">
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
