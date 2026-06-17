import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
  Landmark,
  MapPin,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "./site-components";
import {
  admissionDocs,
  admissionSteps,
  downloadItems,
  financialItems,
  galleryImages,
  hymnItems,
  infrastructures,
  lifeItems,
  newsItems,
  pillars,
  programs,
  prospectusFacts,
  stats,
} from "./site-data";

export default function Home() {
  return (
    <main id="accueil" className="site-shell">
      <SiteHeader active="accueil" />

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Route Nationale 1 - PK 23 Essassa</span>
          <h1>Une éducation d&apos;excellence à Essassa</h1>
          <p>
            Le Lycée Privé International Berthe & Jean accompagne les élèves du
            collège au lycée dans un cadre structuré, ambitieux et ouvert sur le
            monde, à environ 23 kilomètres de Libreville.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/a-propos">
              Découvrir le lycée
            </Link>
            <Link className="secondary-button" href="/preinscription">
              Demander une admission
            </Link>
          </div>
          <p className="location-line">
            <MapPin size={21} />
            Essassa, commune de Ntoum, Estuaire, Gabon
          </p>
        </div>

        <div className="hero-image">
          <Image
            src="/assets/real/campus-aerial.jpg"
            alt="Vue aérienne du campus du Lycée Berthe et Jean à Essassa"
            fill
            priority
            unoptimized
            loading="eager"
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </div>
      </section>

      <section className="pillars" aria-label="Points forts du lycée">
        <div className="pillars-inner">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article className="pillar" key={title}>
              <Icon size={42} strokeWidth={1.8} />
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="apropos" className="about-section section-grid">
        <div className="section-copy">
          <h2>À propos du lycée</h2>
          <p>
            Le Lycée Privé International Berthe & Jean est un établissement
            privé laïc d&apos;enseignement secondaire général, situé à Essassa sur
            la Route Nationale 1. Il a reçu sa reconnaissance d&apos;utilité
            publique le 5 février 2009.
          </p>
          <p>
            Sa devise, « Savoir être et savoir faire », porte un projet éducatif
            centré sur la rigueur académique, l&apos;éthique, le respect mutuel et
            le développement d&apos;un leadership responsable.
          </p>
          <strong>
            Nos valeurs : Discipline - Rigueur - Innovation - Accompagnement
          </strong>
        </div>

        <div className="about-image">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt="Espaces verts du campus du Lycée Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 43vw"
          />
        </div>
      </section>

      <section className="clarity-section" aria-label="Clarification institutionnelle">
        <div>
          <Landmark size={30} />
          <h2>Depuis octobre 2025</h2>
        </div>
        <p>
          Le Lycée Privé International Berthe & Jean poursuit ses activités
          comme entité privée autonome, mitoyenne et distincte du Lycée public
          d&apos;Excellence d&apos;Essassa. Pour la rentrée 2026-2027, le prospectus
          annonce de nouvelles installations modernes, spacieuses et adaptées
          aux exigences d&apos;une éducation de qualité.
        </p>
      </section>

      <section className="stats-section" aria-label="Chiffres clés">
        {stats.map(([value, label]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section id="programmes" className="programs-section">
        <div className="center-heading">
          <h2>Nos programmes</h2>
        </div>
        <div className="program-grid">
          {programs.map((program) => (
            <article className="program-card" key={program.title}>
              <div className="card-image">
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 31vw"
                />
              </div>
              <div className="program-body">
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <Link href="/programmes">
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="infrastructure-section" aria-label="Campus et infrastructures">
        <div className="split-heading">
          <div>
            <span className="eyebrow">Campus, équipements & internat</span>
            <h2>Une cité scolaire conçue pour apprendre et grandir</h2>
          </div>
          <p>
            Le campus historique d&apos;Essassa réunit espaces pédagogiques,
            équipements sportifs, CDI, laboratoires et internat dans un
            environnement naturel.
          </p>
        </div>
        <div className="infrastructure-grid">
          {infrastructures.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="vie-scolaire" className="life-news-section">
        <div>
          <h2>Vie scolaire & actualités</h2>
          <div className="life-grid">
            {lifeItems.map((item) => (
              <article className="life-card" key={item.title}>
                <div className="life-image">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 25vw"
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <aside id="actualites" className="news-panel" aria-label="Actualités">
          {newsItems.map((item) => (
            <article className="news-item" key={item.title}>
              <time dateTime={item.dateTime}>
                <span>{item.day}</span>
                <small>{item.month}</small>
                <small>{item.year}</small>
              </time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href="/actualites">
                  Lire la suite <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </aside>
      </section>

      <section className="gallery-section" aria-label="Photos du lycée">
        <div className="center-heading">
          <h2>Le lycée en images</h2>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <figure className={index === 0 ? "featured" : ""} key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 900px) 100vw, 48vw"
                    : "(max-width: 900px) 50vw, 24vw"
                }
              />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="hymn-section" aria-label="Hymne Berthe et Jean">
        <div className="split-heading">
          <div>
            <span className="eyebrow">Hymne du lycée</span>
            <h2>L&apos;hymne Berthe & Jean</h2>
          </div>
          <p>
            La vidéo transmise est intégrée comme hymne du lycée afin de
            valoriser l&apos;identité, la devise et l&apos;esprit de la communauté
            éducative.
          </p>
        </div>
        <div className="hymn-layout">
          <video
            className="hymn-video"
            controls
            preload="metadata"
            poster="/assets/real/campus-building.jpg"
          >
            <source src="/assets/hymne-berthe-jean.mp4" type="video/mp4" />
          </video>
          <div className="hymn-cards">
            {hymnItems.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={26} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="admissions" className="admission-section">
        <div className="admission-intro">
          <CalendarDays size={28} />
          <div>
            <span className="eyebrow">Admissions & préinscriptions</span>
            <h2>Préparer l&apos;année scolaire 2026-2027</h2>
            <p>
              L&apos;admission se fait sur dossier scolaire complet, puis validation
              par la commission de recrutement. Le prospectus officiel est
              disponible en téléchargement.
            </p>
          </div>
          <Link className="primary-button" href="/contact">
            Nous contacter
          </Link>
        </div>

        <div className="admission-layout">
          <div className="admission-details">
            <div className="steps-panel">
              <h3>Modalités d&apos;inscription</h3>
              <ol>
                {admissionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <h3>Pièces à fournir obligatoirement</h3>
              <div className="documents-grid">
                {admissionDocs.map((doc) => (
                  <article key={doc}>
                    <FileText size={22} />
                    <span>{doc}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="prospectus-panel">
            <FileText size={30} />
            <span className="eyebrow">Prospectus officiel</span>
            <h3>« L&apos;excellence prend un nouveau départ ! »</h3>
            <p>
              Le document présente le lycée, les formations, le fonctionnement,
              les performances scolaires et les conditions financières de la
              rentrée 2026-2027.
            </p>
            <dl className="prospectus-facts">
              {prospectusFacts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="download-list">
              {downloadItems.map((item) => (
                <article key={item.href}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                  <div className="download-actions">
                    <a className="download-button" href={item.href} download>
                      <Download size={18} />
                      Télécharger
                    </a>
                    <a
                      className="secondary-button compact"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ouvrir le PDF
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className="fees-panel" aria-label="Conditions financières 2026-2027">
          <div>
            <span className="eyebrow">Conditions financières</span>
            <h3>Frais publiés dans le prospectus 2026-2027</h3>
            <p>
              Ces montants sont repris du prospectus transmis et restent à
              confirmer directement auprès de l&apos;administration au moment de
              l&apos;inscription.
            </p>
          </div>
          <dl className="fees-grid">
            {financialItems.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
