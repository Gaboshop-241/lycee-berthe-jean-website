import Image from "next/image";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  Camera,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  ThumbsUp,
  UsersRound,
} from "lucide-react";

const navItems = [
  ["Accueil", "#accueil"],
  ["À propos", "#apropos"],
  ["Programmes", "#programmes"],
  ["Admissions", "#admissions"],
  ["Vie scolaire", "#vie-scolaire"],
  ["Actualités", "#actualites"],
  ["Contact", "#contact"],
];

const pillars = [
  {
    icon: GraduationCap,
    title: "Excellence académique",
    text: "Un enseignement exigeant pour des résultats durables.",
  },
  {
    icon: UsersRound,
    title: "Encadrement de qualité",
    text: "Des enseignants qualifiés et à l'écoute de chaque élève.",
  },
  {
    icon: ShieldCheck,
    title: "Cadre sécurisé",
    text: "Un environnement sain et sûr pour apprendre sereinement.",
  },
  {
    icon: BookOpenCheck,
    title: "Ouverture internationale",
    text: "Des partenariats et des échanges pour voir plus loin.",
  },
];

const programs = [
  {
    title: "Collège",
    text: "Un parcours solide pour développer les compétences fondamentales et préparer l'avenir.",
    image: "/assets/college-classroom.png",
    alt: "Élèves du collège en classe",
  },
  {
    title: "Lycée",
    text: "Des enseignements approfondis pour construire un projet d'orientation ambitieux.",
    image: "/assets/science-lab.png",
    alt: "Élèves du lycée en laboratoire de sciences",
  },
  {
    title: "Préparation aux examens",
    text: "Un accompagnement ciblé pour réussir les examens nationaux et internationaux.",
    image: "/assets/exam-prep.png",
    alt: "Élève écrivant dans un cahier d'examen",
  },
];

const lifeItems = [
  {
    title: "Activités sportives",
    text: "Esprit d'équipe et dépassement de soi.",
    image: "/assets/sports-life.png",
    alt: "Élèves jouant au football sur le terrain du lycée",
  },
  {
    title: "Clubs & culture",
    text: "Développer ses talents et sa créativité.",
    image: "/assets/culture-violin.png",
    alt: "Élève pratiquant le violon dans un club culturel",
  },
];

const newsItems = [
  {
    day: "12",
    month: "MAI",
    year: "2025",
    title: "Préinscriptions 2025-2026",
    text: "Les préinscriptions sont ouvertes. Réservez votre place dès maintenant.",
  },
  {
    day: "28",
    month: "AVR.",
    year: "2025",
    title: "Excellents résultats aux examens",
    text: "Félicitations à nos élèves pour leurs performances remarquables !",
  },
];

function SchoolLogo() {
  return (
    <a className="brand" href="#accueil" aria-label="Accueil Berthe et Jean">
      <Image
        className="school-logo"
        src="/assets/logo-berthe-jean.png"
        alt=""
        width={88}
        height={92}
        priority
      />
      <span>
        <strong className="brand-title">
          Lycée Privé International
          <br />
          Berthe & Jean
        </strong>
        <em>Savoir-être - Savoir-faire</em>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main id="accueil" className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <SchoolLogo />

          <nav className="desktop-nav" aria-label="Navigation principale">
            {navItems.map(([label, href], index) => (
              <a key={label} className={index === 0 ? "active" : ""} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <a className="preinscription-button" href="#admissions">
            Préinscription
          </a>

          <details className="mobile-nav">
            <summary aria-label="Ouvrir le menu">
              <Menu size={22} strokeWidth={2.2} />
            </summary>
            <div>
              {navItems.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
              <a className="mobile-cta" href="#admissions">
                Préinscription
              </a>
            </div>
          </details>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <h1>Une éducation d&apos;excellence à Essassa</h1>
          <p>
            Le Lycée Privé International Berthe & Jean accompagne les élèves du
            collège au lycée dans un cadre structuré, ambitieux et ouvert sur le
            monde.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#apropos">
              Découvrir le lycée
            </a>
            <a className="secondary-button" href="#admissions">
              Demander une admission
            </a>
          </div>
          <p className="location-line">
            <MapPin size={21} />
            Essassa, Gabon
          </p>
        </div>

        <div className="hero-image">
          <Image
            src="/assets/hero-students.png"
            alt="Deux élèves étudiant dans la cour du lycée Berthe et Jean"
            fill
            priority
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
            d&apos;enseignement général qui place l&apos;élève au cœur de son projet
            éducatif. Nous formons des jeunes responsables, disciplinés et
            curieux, capables de relever les défis d&apos;un monde en constante
            évolution.
          </p>
          <p>
            Notre approche repose sur la rigueur académique, l&apos;innovation
            pédagogique et un accompagnement personnalisé pour révéler le
            potentiel de chacun.
          </p>
          <strong>
            Nos valeurs : Discipline - Rigueur - Innovation - Accompagnement
          </strong>
        </div>

        <div className="about-image">
          <Image
            src="/assets/campus-gate.png"
            alt="Entrée du Lycée Privé International Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 43vw"
          />
        </div>
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
                <a href="#admissions">
                  En savoir plus <ArrowRight size={16} />
                </a>
              </div>
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
              <time dateTime={`${item.year}-${item.month === "MAI" ? "05" : "04"}-${item.day}`}>
                <span>{item.day}</span>
                <small>{item.month}</small>
                <small>{item.year}</small>
              </time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#admissions">
                  Lire la suite <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </aside>
      </section>

      <section id="admissions" className="admission-band">
        <CalendarDays size={28} />
        <div>
          <h2>Admissions & préinscriptions</h2>
          <p>
            Les familles peuvent nous contacter pour préparer une demande
            d&apos;admission au collège ou au lycée.
          </p>
        </div>
        <a className="primary-button" href="#contact">
          Nous contacter
        </a>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <SchoolLogo />
          </div>

          <div className="footer-column">
            <h2>Nous contacter</h2>
            <p>
              <MapPin size={18} /> Essassa, Gabon
            </p>
            <p>
              <Mail size={18} /> contact@berthejean.ga
            </p>
            <p>
              <Phone size={18} /> +241 00 00 00 00
            </p>
          </div>

          <div className="footer-column">
            <h2>Liens rapides</h2>
            <div className="footer-links">
              {navItems.slice(1, 7).map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h2>Suivez-nous</h2>
            <div className="social-links" aria-label="Réseaux sociaux">
              <a href="#contact" aria-label="Facebook">
                <ThumbsUp size={20} />
              </a>
              <a href="#contact" aria-label="Instagram">
                <Camera size={20} />
              </a>
              <a href="#contact" aria-label="YouTube">
                <Play size={21} />
              </a>
            </div>
          </div>
        </div>
        <p className="copyright">
          © 2025 Lycée Privé International Berthe & Jean. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
