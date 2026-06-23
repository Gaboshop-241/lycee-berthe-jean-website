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
  const { locale, pages } = await getSiteContent();
  const { programsTitle, programsDescription } = pages.metadata;

  return {
    title: programsTitle,
    description: programsDescription,
    openGraph: {
      title: programsTitle,
      description: programsDescription,
      url: "/programmes",
      type: "website",
      locale: locale === "en" ? "en_US" : "fr_GA",
    },
    twitter: {
      card: "summary_large_image",
      title: programsTitle,
      description: programsDescription,
    },
  };
}

export default async function ProgrammesPage() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.programs;

  return (
    <main className="site-shell">
      <PageHero
        active="programmes"
        title={copy.heroTitle}
        text={copy.heroText}
        image="/assets/real/class-session.jpg"
        imageAlt={copy.heroAlt}
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          { label: copy.viewTracks, href: "#parcours-college" },
          { label: copy.admissions, href: "/admissions", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={data.programHighlights} className="four-columns" />
      </section>

      <section id="parcours-college" className="page-section media-split">
        <div className="image-frame">
          <Image
            src="/assets/real/class-session.jpg"
            alt={copy.collegeAlt}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
        <div className="section-copy">
          <h2>{copy.collegeTitle}</h2>
          <p>{copy.collegeText}</p>
          <div className="level-grid">
            {data.collegeLevels.map(([level, text]) => (
              <article key={level}>
                <strong>{level}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="parcours-lycee" className="page-section media-split reverse">
        <div className="section-copy">
          <h2>{copy.lyceeTitle}</h2>
          <p>{copy.lyceeText}</p>
          <div className="level-grid three">
            {data.lyceeLevels.map(([level, text]) => (
              <article key={level}>
                <strong>{level}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="image-frame">
          <Image
            src="/assets/real/science-workshop.jpg"
            alt={copy.lyceeAlt}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.domains} centered />
        <IconGrid items={data.learningDomains} className="six-columns compact-icons" />
      </section>

      <section className="page-section">
        <SectionHeading title={copy.series} centered />
        <IconGrid
          items={data.programSeries}
          className="four-columns compact-icons series-grid"
        />
      </section>

      <section className="page-section split-programs">
        <div id="preparation-examens">
          <SectionHeading title={copy.exams} centered />
          <div className="image-card-grid compact">
            {data.examPrepItems.map((item) => (
              <ImageCard key={item.title} {...item} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeading title={copy.complementary} centered />
          <div className="image-card-grid compact">
            {data.complementaryActivities.map((item) => (
              <ImageCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <ClosingCta title={copy.ctaTitle} text={data.ctaText.programs} common={common} />

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
