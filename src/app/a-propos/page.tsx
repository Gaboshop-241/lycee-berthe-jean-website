import type { Metadata } from "next";
import Image from "next/image";
import {
  aboutCards,
  approachItems,
  ctaText,
  lifeSchoolCards,
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
  title: "À propos | Lycée Privé International Berthe & Jean",
  description:
    "Mission, vision, valeurs et approche pédagogique du Lycée Privé International Berthe & Jean à Essassa.",
};

export default function AboutPage() {
  return (
    <main className="site-shell">
      <PageHero
        active="a-propos"
        title="À propos du lycée"
        text="Situé à Essassa, le Lycée Privé International Berthe & Jean accompagne les élèves du collège au lycée dans un cadre structuré, exigeant et bienveillant, pour leur permettre de devenir des citoyens responsables."
        image="/assets/real/class-session.jpg"
        imageAlt="Élèves du Lycée Berthe et Jean accompagnés dans leurs apprentissages"
        actions={[
          { label: "Notre mission", href: "#mission" },
          { label: "Préinscription", href: "/admissions", variant: "secondary" },
        ]}
      />

      <section id="mission" className="page-section">
        <IconGrid items={aboutCards} className="three-columns" />
      </section>

      <section className="page-section two-column-section">
        <div className="section-copy">
          <h2>Qui sommes-nous ?</h2>
          <p>
            Le Lycée Privé International Berthe & Jean est un établissement
            privé laïc d&apos;enseignement secondaire général, situé à Essassa, au
            Gabon.
          </p>
          <p>
            Nous accueillons les élèves du collège au lycée dans un cadre
            sécurisé, moderne et stimulant, propice à l&apos;apprentissage et à
            l&apos;épanouissement personnel.
          </p>
          <p>
            Notre engagement repose sur des valeurs fortes et une pédagogie
            centrée sur l&apos;élève, afin de lui donner les moyens de réussir
            aujourd&apos;hui et de s&apos;accomplir demain.
          </p>
        </div>
        <div className="image-frame tall">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt="Cadre naturel du campus Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </section>

      <section className="page-section direction-section">
        <div className="image-frame">
          <Image
            src="/assets/real/campus-building.jpg"
            alt="Bâtiment du Lycée Privé International Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
        <div className="section-copy">
          <h2>Le mot de la direction</h2>
          <p>
            Au Lycée Privé International Berthe & Jean, nous plaçons la réussite
            et le bien-être de chaque élève au cœur de notre action.
          </p>
          <p>
            Notre équipe pédagogique s&apos;engage chaque jour à offrir un
            enseignement de qualité, dans un climat de confiance et de respect,
            pour former des jeunes responsables et ambitieux.
          </p>
          <p>
            Nous croyons au potentiel de chaque élève et nous sommes fiers de
            les accompagner sur le chemin de l&apos;excellence.
          </p>
          <strong>La Direction</strong>
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Notre approche pédagogique" centered />
        <IconGrid items={approachItems} className="four-columns compact-icons" />
      </section>

      <section className="page-section">
        <SectionHeading title="La vie au lycée" />
        <div className="image-card-grid">
          {lifeSchoolCards.map((item) => (
            <ImageCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <ClosingCta
        title="Venez découvrir notre lycée"
        text={ctaText.discover}
      />

      <SiteFooter />
    </main>
  );
}
