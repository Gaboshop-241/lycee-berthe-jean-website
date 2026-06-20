import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark, MapPin } from "lucide-react";
import { SiteFooter, SiteHeader } from "./site-components";
import { getSiteContent } from "./i18n-server";

export default async function Home() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.home;
  const {
    galleryImages,
    hymnItems,
    infrastructures,
    leadershipMessages,
    lifeItems,
    newsItems,
    pillars,
    programs,
    stats,
  } = data;

  return (
    <main id="accueil" className="site-shell">
      <SiteHeader
        active="accueil"
        common={common}
        currentLocale={locale}
        items={data.navItems}
      />

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/a-propos">
              {copy.discover}
            </Link>
            <Link className="secondary-button" href="/contact#message">
              {copy.admission}
            </Link>
          </div>
          <p className="location-line">
            <MapPin size={21} />
            {copy.location}
          </p>
        </div>

        <div className="hero-image">
          <Image
            src="/assets/real/hero-berthe-jean-gabon4you.jpg"
            alt={galleryImages[0].alt}
            fill
            preload
            unoptimized
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </div>
      </section>

      <section className="pillars" aria-label={copy.pillarsAria}>
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
          <h2>{copy.aboutTitle}</h2>
          <p>{copy.aboutP1}</p>
          <p>{copy.aboutP2}</p>
          <strong>{copy.values}</strong>
        </div>

        <div className="about-image">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt={copy.aboutImageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 43vw"
          />
        </div>
      </section>

      <section className="clarity-section" aria-label={copy.clarityAria}>
        <div>
          <Landmark size={30} />
          <h2>{copy.sinceTitle}</h2>
        </div>
        <p>{copy.sinceText}</p>
      </section>

      <section
        id="mot-direction"
        className="leadership-section"
        aria-labelledby="leadership-title"
      >
        <div className="split-heading leadership-heading">
          <div>
            <span className="eyebrow">{copy.leadershipEyebrow}</span>
            <h2 id="leadership-title">{copy.leadershipTitle}</h2>
          </div>
          <p>{copy.leadershipText}</p>
        </div>

        <div className="leadership-spotlight">
          <div className="leadership-spotlight-image">
            <Image
              src="/assets/real/leadership/direction-mavoungou-obolo.jpg"
              alt={copy.directionAlt}
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
          <div className="leadership-spotlight-copy">
            <span>{copy.directionLabel}</span>
            <h3>{copy.directionTitle}</h3>
            <p>{copy.directionText}</p>
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

      <section className="stats-section" aria-label={copy.statsAria}>
        {stats.map(([value, label]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section id="programmes" className="programs-section">
        <div className="center-heading">
          <h2>{copy.programsTitle}</h2>
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
                  {common.learnMore} <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="infrastructure-section" aria-label={copy.infrastructureAria}>
        <div className="split-heading">
          <div>
            <span className="eyebrow">{copy.infrastructureEyebrow}</span>
            <h2>{copy.infrastructureTitle}</h2>
          </div>
          <p>{copy.infrastructureText}</p>
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
          <h2>{copy.lifeNewsTitle}</h2>
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
                  {common.readMore} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <aside id="actualites" className="news-panel" aria-label={copy.newsAria}>
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
                  {common.readMore} <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </aside>
      </section>

      <section className="gallery-section" aria-label={copy.galleryAria}>
        <div className="center-heading">
          <h2>{copy.galleryTitle}</h2>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <figure className={index === 0 ? "featured" : ""} key={image.src}>
              <Link
                href={`#photo-${index + 1}`}
                aria-label={`${copy.enlargePhoto}: ${image.label}`}
              >
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
        <div className="gallery-modals" aria-label={copy.galleryPreviewAria}>
          {galleryImages.map((image, index) => (
            <div className="gallery-modal" id={`photo-${index + 1}`} key={`modal-${image.src}`}>
              <Link className="gallery-close" href="#accueil" aria-label={copy.closeImage}>
                {common.close}
              </Link>
              <figure>
                <Image src={image.src} alt={image.alt} fill sizes="100vw" />
                <figcaption>{image.label}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </section>

      <section className="hymn-section" aria-label={copy.hymnAria}>
        <div className="split-heading">
          <div>
            <span className="eyebrow">{copy.hymnEyebrow}</span>
            <h2>{copy.hymnTitle}</h2>
          </div>
          <p>{copy.hymnText}</p>
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
                <span>{copy.officialHymn}</span>
                <strong>Berthe & Jean</strong>
              </div>
            </div>
            <audio className="hymn-audio" controls preload="metadata">
              <source src="/assets/hymne-berthe-jean.mp4" type="audio/mp4" />
              {copy.audioFallback}
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

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
