import type { Metadata } from "next";
import Image from "next/image";
import {
  collegeLevels,
  complementaryActivities,
  ctaText,
  examPrepItems,
  learningDomains,
  lyceeLevels,
  programHighlights,
  programSeries,
} from "../site-data";
import {
  ClosingCta,
  IconGrid,
  ImageCard,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";

export const metadata: Metadata = {
  title: "Programmes | Lycée Privé International Berthe & Jean",
  description:
    "Programmes du collège à la Terminale, préparation au BEPC et au Baccalauréat, domaines d'apprentissage et activités complémentaires.",
};

export default function ProgrammesPage() {
  return (
    <main className="site-shell">
      <PageHero
        active="programmes"
        title="Nos programmes"
        text="Le Lycée Privé International Berthe & Jean propose un parcours structuré de la 6e à la Terminale, fondé sur l'excellence académique, l'accompagnement personnalisé et une préparation rigoureuse aux examens et à l'avenir."
        image="/assets/real/class-session.jpg"
        imageAlt="Élèves du lycée accompagnés par un enseignant"
        actions={[
          { label: "Voir les parcours", href: "#parcours-college" },
          { label: "Admissions", href: "/admissions", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={programHighlights} className="four-columns" />
      </section>

      <section id="parcours-college" className="page-section media-split">
        <div className="image-frame">
          <Image
            src="/assets/real/class-session.jpg"
            alt="Parcours collège au Lycée Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
        <div className="section-copy">
          <h2>Parcours Collège</h2>
          <p>
            Le cycle collège, de la 6e à la 3e, pose les bases solides d&apos;une
            réussite durable. Les élèves développent leurs connaissances
            fondamentales, leur méthodologie de travail, la maîtrise des langues,
            des sciences et des outils numériques.
          </p>
          <div className="level-grid">
            {collegeLevels.map(([level, text]) => (
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
          <h2>Parcours Lycée</h2>
          <p>
            Du second cycle à la Terminale, les élèves bénéficient d&apos;un
            enseignement approfondi, d&apos;un accompagnement vers l&apos;orientation
            et d&apos;une préparation exigeante aux examens.
          </p>
          <div className="level-grid three">
            {lyceeLevels.map(([level, text]) => (
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
            alt="Parcours lycée et activités scientifiques"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Domaines d'apprentissage" centered />
        <IconGrid items={learningDomains} className="six-columns compact-icons" />
      </section>

      <section className="page-section">
        <SectionHeading title="Séries et orientations au lycée" centered />
        <IconGrid items={programSeries} className="four-columns compact-icons series-grid" />
      </section>

      <section className="page-section split-programs">
        <div id="preparation-examens">
          <SectionHeading title="Préparation aux examens" centered />
          <div className="image-card-grid compact">
            {examPrepItems.map((item) => (
              <ImageCard key={item.title} {...item} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeading title="Activités complémentaires" centered />
          <div className="image-card-grid compact">
            {complementaryActivities.map((item) => (
              <ImageCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Construisez votre parcours avec Berthe & Jean"
        text={ctaText.programs}
      />

      <SiteFooter />
    </main>
  );
}
