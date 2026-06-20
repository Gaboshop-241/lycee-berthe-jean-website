import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { getSiteContent } from "../i18n-server";
import {
  ClosingCta,
  DownloadLink,
  IconGrid,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getSiteContent();

  return {
    title: pages.metadata.admissionsTitle,
    description: pages.metadata.admissionsDescription,
  };
}

export default async function AdmissionsPage() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.admissions;

  return (
    <main className="site-shell">
      <PageHero
        active="admissions"
        title={copy.heroTitle}
        text={copy.heroText}
        image="/assets/real/student-group.jpg"
        imageAlt={copy.heroAlt}
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          { label: copy.request, href: "/contact#message" },
          { label: copy.appointment, href: "/contact#rendez-vous", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={data.admissionHighlights} className="four-columns" />
      </section>

      <section id="demarche" className="page-section">
        <SectionHeading title={copy.how} />
        <div className="process-grid">
          {data.admissionProcess.map((step, index) => {
            const Icon = step.icon;

            return (
              <article className="process-card" key={step.title}>
                <span>{index + 1}</span>
                <Icon size={32} />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-section admissions-overview">
        <div>
          <SectionHeading title={copy.docs} />
          <div className="checklist-card">
            {data.admissionDocs.map((doc) => (
              <p key={doc}>
                <CircleCheck size={16} /> {doc}
              </p>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title={copy.levels} />
          <IconGrid items={data.admissionLevels} className="three-columns mini-icons" />
        </div>

        <div className="image-frame">
          <Image
            src="/assets/real/campus-building.jpg"
            alt={copy.familyAlt}
            fill
            sizes="(max-width: 900px) 100vw, 36vw"
          />
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.why} />
        <IconGrid items={data.whyChooseItems} className="four-columns" />
      </section>

      <section className="page-section admission-download-panel">
        <div>
          <SectionHeading title={copy.prospectus} />
          <p>{copy.prospectusText}</p>
          <div className="download-actions">
            {data.downloadItems.map((item) => (
              <DownloadLink key={item.href} href={item.href} title={item.title} />
            ))}
            <Link
              className="secondary-button compact"
              href="/downloads/prospectus-berthe-jean-2026-2027.pdf"
              target="_blank"
            >
              {copy.openPdf}
            </Link>
          </div>
        </div>
        <dl className="fees-grid">
          {data.financialItems.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.faq} />
        <div className="faq-grid">
          {data.faqItems.map((item) => (
            <details key={item.question} open>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ClosingCta title={copy.ctaTitle} text={data.ctaText.admissions} common={common} />

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
