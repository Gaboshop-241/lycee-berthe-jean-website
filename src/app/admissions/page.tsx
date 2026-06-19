import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CircleCheck,
  admissionDocs,
  admissionHighlights,
  admissionLevels,
  admissionProcess,
  ctaText,
  downloadItems,
  faqItems,
  financialItems,
  whyChooseItems,
} from "../site-data";
import {
  ClosingCta,
  DownloadLink,
  IconGrid,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";

export const metadata: Metadata = {
  title: "Admissions | Lycée Privé International Berthe & Jean",
  description:
    "Dossier d'admission, pièces à fournir, frais 2026-2027 et prospectus du Lycée Privé International Berthe & Jean.",
};

export default function AdmissionsPage() {
  return (
    <main className="site-shell">
      <PageHero
        active="admissions"
        title="Admissions"
        text="Rejoignez le Lycée Privé International Berthe & Jean et offrez à votre enfant un cadre d'excellence, de discipline et d'accompagnement personnalisé, du collège au lycée."
        image="/assets/real/student-group.jpg"
        imageAlt="Élèves du lycée en démarche d'admission"
        actions={[
          { label: "Demander une admission", href: "/contact#message" },
          { label: "Prendre rendez-vous", href: "/contact#rendez-vous", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={admissionHighlights} className="four-columns" />
      </section>

      <section id="demarche" className="page-section">
        <SectionHeading title="Comment s'inscrire ?" />
        <div className="process-grid">
          {admissionProcess.map((step, index) => {
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
          <SectionHeading title="Pièces à fournir" />
          <div className="checklist-card">
            {admissionDocs.map((doc) => (
              <p key={doc}>
                <CircleCheck size={16} /> {doc}
              </p>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title="Niveaux concernés" />
          <IconGrid items={admissionLevels} className="three-columns mini-icons" />
        </div>

        <div className="image-frame">
          <Image
            src="/assets/real/campus-building.jpg"
            alt="Accueil des familles au Lycée Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 36vw"
          />
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Pourquoi nous choisir ?" />
        <IconGrid items={whyChooseItems} className="four-columns" />
      </section>

      <section className="page-section admission-download-panel">
        <div>
          <SectionHeading title="Prospectus & conditions financières" />
          <p>
            Les informations ci-dessous reprennent le prospectus 2026-2027
            transmis pour le lycée. Les montants restent à confirmer auprès de
            l&apos;administration lors de l&apos;inscription finale.
          </p>
          <div className="download-actions">
            {downloadItems.map((item) => (
              <DownloadLink key={item.href} href={item.href} title="Télécharger le prospectus" />
            ))}
            <Link
              className="secondary-button compact"
              href="/downloads/prospectus-berthe-jean-2026-2027.pdf"
              target="_blank"
            >
              Ouvrir le PDF
            </Link>
          </div>
        </div>
        <dl className="fees-grid">
          {financialItems.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="page-section">
        <SectionHeading title="Questions fréquentes" />
        <div className="faq-grid">
          {faqItems.map((item) => (
            <details key={item.question} open>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ClosingCta
        title="Prêt à rejoindre Berthe & Jean ?"
        text={ctaText.admissions}
      />

      <SiteFooter />
    </main>
  );
}
