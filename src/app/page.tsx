import Image from "next/image";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Camera,
  Download,
  FileText,
  FlaskConical,
  GraduationCap,
  Landmark,
  LibraryBig,
  Laptop,
  Mail,
  MapPin,
  MapPinned,
  Medal,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Trees,
  Trophy,
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
    text: "Baccalauréat à 100% et BEPC à 98,31% affichés pour 2024-2025.",
  },
  {
    icon: UsersRound,
    title: "Suivi personnalisé",
    text: "Études encadrées et accompagnement des élèves en difficulté.",
  },
  {
    icon: Trees,
    title: "Nouveau départ",
    text: "Des installations modernes annoncées pour la rentrée 2026-2027.",
  },
  {
    icon: BookOpenCheck,
    title: "Programmes nationaux",
    text: "Un enseignement conforme au Ministère de l'Éducation nationale et à l'IPN.",
  },
];

const stats = [
  ["2009", "Reconnaissance d'utilité publique"],
  ["6e-Tle", "Secondaire général complet"],
  ["A1/B/C/D", "Séries du Baccalauréat"],
  ["PK 23", "Route Nationale 1, Essassa"],
  ["25", "Élèves maximum par classe historiquement"],
  ["2026-2027", "Nouvelles installations modernes"],
];

const programs = [
  {
    title: "Collège",
    text: "De la sixième à la troisième, un socle exigeant pour consolider les méthodes, la discipline et l'autonomie.",
    image: "/assets/real/class-session.jpg",
    alt: "Élèves en séance de classe au Lycée Berthe et Jean",
  },
  {
    title: "Lycée",
    text: "Un cycle de la seconde à la terminale avec les séries générales A1, B, C et D.",
    image: "/assets/real/science-workshop.jpg",
    alt: "Élèves réalisant une activité scientifique",
  },
  {
    title: "Préparation aux examens",
    text: "Un suivi régulier, des évaluations et des études encadrées pour préparer le BEPC et le Baccalauréat.",
    image: "/assets/real/student-group.jpg",
    alt: "Groupe d'élèves du Lycée Berthe et Jean",
  },
];

const infrastructures = [
  {
    icon: FlaskConical,
    title: "Laboratoires de sciences",
    text: "Deux laboratoires équipés pour les manipulations scientifiques et l'expérimentation.",
  },
  {
    icon: BookOpenCheck,
    title: "Langues vivantes",
    text: "Un laboratoire de langues pour renforcer l'anglais et l'espagnol.",
  },
  {
    icon: Laptop,
    title: "Salle informatique",
    text: "Une vingtaine de postes connectés à Internet pour les usages numériques.",
  },
  {
    icon: LibraryBig,
    title: "CDI & bibliothèque",
    text: "Un CDI moderne pour la lecture, la recherche et le travail autonome.",
  },
  {
    icon: Trophy,
    title: "Complexe sportif",
    text: "Des terrains de football, basketball, volleyball et tennis.",
  },
  {
    icon: ShieldCheck,
    title: "Vie résidentielle",
    text: "Internat non mixte, études surveillées et encadrement quotidien.",
  },
];

const lifeItems = [
  {
    title: "Discipline & leadership",
    text: "L'Esprit Berthe & Jean valorise le dépassement de soi, le respect mutuel et le vivre-ensemble.",
    image: "/assets/real/student-cohort.jpg",
    alt: "Élèves du lycée réunis en groupe",
  },
  {
    title: "Recherche & culture",
    text: "Le CDI et les clubs socio-culturels développent la curiosité, l'expression et l'ouverture.",
    image: "/assets/real/cdi-library.jpg",
    alt: "Centre de documentation et d'information du lycée",
  },
];

const newsItems = [
  {
    dateTime: "2026-06-16",
    day: "16",
    month: "JUIN",
    year: "2026",
    title: "Prospectus 2026-2027 disponible",
    text: "Les familles peuvent consulter les conditions d'inscription, les horaires et les frais publiés.",
  },
  {
    dateTime: "2025-10-01",
    day: "01",
    month: "OCT.",
    year: "2025",
    title: "Nouvelle configuration institutionnelle",
    text: "Le pôle privé poursuit son activité comme entité autonome, distincte du Lycée public d'Excellence d'Essassa.",
  },
  {
    dateTime: "2009-02-05",
    day: "05",
    month: "FÉV.",
    year: "2009",
    title: "Reconnaissance officielle",
    text: "La reconnaissance d'utilité publique inscrit l'établissement dans la carte scolaire nationale.",
  },
];

const galleryImages = [
  {
    src: "/assets/real/campus-aerial.jpg",
    alt: "Vue aérienne du campus Berthe et Jean",
    label: "Campus d'Essassa",
  },
  {
    src: "/assets/real/campus-gardens.jpeg",
    alt: "Espaces verts du campus",
    label: "Cadre naturel",
  },
  {
    src: "/assets/real/campus-building.jpg",
    alt: "Bâtiment du lycée",
    label: "Bâtiments scolaires",
  },
  {
    src: "/assets/real/cdi-library.jpg",
    alt: "CDI du lycée",
    label: "CDI",
  },
  {
    src: "/assets/real/science-workshop.jpg",
    alt: "Atelier scientifique avec des élèves",
    label: "Sciences",
  },
  {
    src: "/assets/real/student-group.jpg",
    alt: "Groupe d'élèves",
    label: "Communauté éducative",
  },
];

const admissionDocs = [
  "Demande d'inscription à titre privé adressée au proviseur",
  "Bulletins de notes des trois trimestres de l'année précédente",
  "Acte de naissance légalisé",
  "Certificat médical datant de moins de trois mois",
  "Copie du carnet de santé pour les élèves de 6e",
  "Quatre photos d'identité récentes",
];

const admissionSteps = [
  "Retrait et renseignement de la fiche de préinscription",
  "Dépôt du dossier scolaire complet",
  "Examen et validation par une commission de recrutement",
  "Inscription administrative après avis favorable",
  "Entretien possible avec le psychologue pour un meilleur encadrement",
];

const prospectusFacts = [
  ["Niveaux", "De la 6e à la Terminale"],
  ["Examens", "BEPC et Baccalauréat"],
  ["Séries", "A1, B, C et D"],
  ["Horaires", "8h00-13h30 ou 15h40 selon les classes"],
];

const financialItems = [
  ["Frais de dossier", "25 000 FCFA"],
  ["Frais d'inscription", "19 000 FCFA"],
  ["Scolarité 1er cycle", "100 000 FCFA / mois"],
  ["Scolarité 2nd cycle", "110 000 FCFA / mois"],
  ["Uniforme", "55 000 à 70 000 FCFA"],
  ["Transport scolaire", "45 000 FCFA / mois"],
];

const downloadItems = [
  {
    title: "Prospectus Berthe & Jean 2026-2027",
    text: "Présentation, admission, pièces à fournir, performances et conditions financières.",
    href: "/downloads/prospectus-berthe-jean-2026-2027.pdf",
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
          <span className="eyebrow">Route Nationale 1 - PK 23 Essassa</span>
          <h1>Une éducation d&apos;excellence à Essassa</h1>
          <p>
            Le Lycée Privé International Berthe & Jean accompagne les élèves du
            collège au lycée dans un cadre structuré, ambitieux et ouvert sur le
            monde, à environ 23 kilomètres de Libreville.
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
            Essassa, commune de Ntoum, Estuaire, Gabon
          </p>
        </div>

        <div className="hero-image">
          <Image
            src="/assets/real/campus-aerial.jpg"
            alt="Vue aérienne du campus du Lycée Berthe et Jean à Essassa"
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
                <a href="#admissions">
                  En savoir plus <ArrowRight size={16} />
                </a>
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
                <a href="#apropos">
                  Lire la suite <ArrowRight size={16} />
                </a>
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
          <a className="primary-button" href="#contact">
            Nous contacter
          </a>
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

      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <SchoolLogo />
          </div>

          <div className="footer-column">
            <h2>Nous contacter</h2>
            <p>
              <MapPinned size={18} /> Route Nationale 1, PK 23 Essassa, Ntoum
            </p>
            <p>
              <MapPin size={18} /> B.P. 20411, Libreville, République Gabonaise
            </p>
            <p>
              <Mail size={18} /> contact@uil-universite.com
            </p>
            <p>
              <Mail size={18} /> infos@univ-inter-libreville.com
            </p>
            <p>
              <Phone size={18} /> +241 66 76 32 89 / +241 66 63 08 56
            </p>
            <p>
              <Phone size={18} /> +241 (0)62 26 51 28
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
                <Medal size={20} />
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
          © 2026 Lycée Privé International Berthe & Jean. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
