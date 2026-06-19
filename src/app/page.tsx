import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark, MapPin } from "lucide-react";
import { SiteFooter, SiteHeader } from "./site-components";
import {
  galleryImages,
  hymnItems,
  infrastructures,
  leadershipMessages,
  lifeItems,
  newsItems,
  pillars,
  programs,
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
            <Link className="secondary-button" href="/contact#message">
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
            src="/assets/real/hero-berthe-jean-gabon4you.jpg"
            alt="Bâtiment du Lycée Privé International Berthe et Jean"
            fill
            preload
            unoptimized
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

      <section
        id="mot-direction"
        className="leadership-section"
        aria-labelledby="leadership-title"
      >
        <div className="split-heading leadership-heading">
          <div>
            <span className="eyebrow">Mot de la direction</span>
            <h2 id="leadership-title">Une vision portée par des responsables engagés</h2>
          </div>
          <p>
            La parole de la direction éclaire le projet éducatif du lycée, son
            exigence quotidienne et le lien de confiance construit avec les
            familles. Elle réunit ici le censeur, le proviseur et la fondatrice
            autour d&apos;une même ambition : former avec rigueur et humanité.
          </p>
        </div>

        <div className="leadership-spotlight">
          <div className="leadership-spotlight-image">
            <Image
              src="/assets/real/leadership/direction-mavoungou-obolo.jpg"
              alt="MAVOUNGOU Denis Marin et OBOLO Clément, équipe de direction du Lycée Berthe et Jean"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
          <div className="leadership-spotlight-copy">
            <span>Direction administrative</span>
            <h3>M. OBOLO Clément & M. MAVOUNGOU Denis Marin</h3>
            <p>
              Depuis 2015, l&apos;encadrement du Lycée Privé International
              Berthe & Jean s&apos;appuie sur une continuité administrative forte :
              exigence pédagogique, discipline quotidienne et dialogue avec les
              familles.
            </p>
          </div>
        </div>

        <div className="leadership-grid">
          {leadershipMessages.map((person) => (
            <article className="leadership-card" key={person.name}>
              <div className="leadership-photo">
                <Image
                  src={person.image}
                  alt={person.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 31vw"
                />
              </div>
              <div className="leadership-body">
                <span className="leadership-role">{person.role}</span>
                <h3>{person.name}</h3>
                <p className="leadership-tenure">{person.tenure}</p>
                <p className="leadership-message">{person.message}</p>
                {"credit" in person ? (
                  <small className="leadership-credit">{person.credit}</small>
                ) : null}
              </div>
            </article>
          ))}
        </div>
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
                <Link href={program.href}>
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
                <Link href={item.href}>
                  Lire la suite <ArrowRight size={16} />
                </Link>
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
                <Link href={item.href}>
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
              <Link href={`#photo-${index + 1}`} aria-label={`Agrandir : ${image.label}`}>
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
              </Link>
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-modals" aria-label="Aperçu des photos">
          {galleryImages.map((image, index) => (
            <div className="gallery-modal" id={`photo-${index + 1}`} key={`modal-${image.src}`}>
              <Link className="gallery-close" href="#accueil" aria-label="Fermer l'image">
                Fermer
              </Link>
              <figure>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                />
                <figcaption>{image.label}</figcaption>
              </figure>
            </div>
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
            L&apos;hymne du lycée est proposé en écoute audio avec des contrôles
            simples pour valoriser l&apos;identité, la devise et l&apos;esprit de la
            communauté éducative.
          </p>
        </div>
        <div className="hymn-layout">
          <div className="audio-player-card">
            <div className="audio-player-cover">
              <Image
                src="/assets/real/campus-gardens.jpeg"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
              />
              <div>
                <span>Hymne officiel</span>
                <strong>Berthe & Jean</strong>
              </div>
            </div>
            <audio className="hymn-audio" controls preload="metadata">
              <source src="/assets/hymne-berthe-jean.mp4" type="audio/mp4" />
              Votre navigateur ne prend pas en charge la lecture audio.
            </audio>
          </div>
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


      <SiteFooter />
    </main>
  );
}
