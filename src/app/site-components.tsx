import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  ChevronRight,
  Download,
  Mail,
  MapPin,
  MapPinned,
  Medal,
  Menu,
  Phone,
  Play,
} from "lucide-react";
import { contactInfo, navItems } from "./site-data";

type ActiveKey = (typeof navItems)[number]["key"];

type IconCardData = {
  icon: LucideIcon;
  title: string;
  text?: string;
  list?: string[];
};

type PageAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export function SchoolLogo() {
  return (
    <Link className="brand" href="/" aria-label="Accueil Berthe et Jean">
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
    </Link>
  );
}

export function SiteHeader({ active }: { active: ActiveKey }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <SchoolLogo />

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.key}
              className={item.key === active ? "active" : ""}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="preinscription-button" href="/admissions">
          Préinscription
        </Link>

        <details className="mobile-nav">
          <summary aria-label="Ouvrir le menu">
            <Menu size={22} strokeWidth={2.2} />
          </summary>
          <div>
            {navItems.map((item) => (
              <Link key={item.key} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="mobile-cta" href="/admissions">
              Préinscription
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <SchoolLogo />
        </div>

        <div className="footer-column">
          <h2>Nous contacter</h2>
          <p>
            <MapPinned size={18} /> {contactInfo.location}
          </p>
          <p>
            <MapPin size={18} /> {contactInfo.postal}
          </p>
          {contactInfo.emails.map((email) => (
            <p key={email}>
              <Mail size={18} /> {email}
            </p>
          ))}
          {contactInfo.phones.map((phone) => (
            <p key={phone}>
              <Phone size={18} /> {phone}
            </p>
          ))}
        </div>

        <div className="footer-column">
          <h2>Liens rapides</h2>
          <div className="footer-links">
            {navItems.slice(1).map((item) => (
              <Link key={item.key} href={item.href}>
                {item.label}
              </Link>
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
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <p className="breadcrumb">
      <Link href="/">Accueil</Link>
      <ChevronRight size={14} />
      <span>{current}</span>
    </p>
  );
}

export function PageHero({
  active,
  title,
  text,
  image,
  imageAlt,
  actions,
}: {
  active: ActiveKey;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  actions: PageAction[];
}) {
  return (
    <>
      <SiteHeader active={active} />
      <section className="page-hero">
        <div className="page-hero-copy">
          <Breadcrumb current={title} />
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="hero-actions">
            {actions.map((action) => (
              <Link
                key={action.href}
                className={action.variant === "secondary" ? "secondary-button" : "primary-button"}
                href={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="page-hero-image">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            unoptimized
            loading="eager"
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
      </section>
    </>
  );
}

export function IconCard({
  item,
  className = "",
}: {
  item: IconCardData;
  className?: string;
}) {
  const Icon = item.icon;

  return (
    <article className={`icon-card ${className}`}>
      <Icon size={42} strokeWidth={1.8} />
      <div>
        <h3>{item.title}</h3>
        {item.text ? <p>{item.text}</p> : null}
        {item.list ? (
          <ul>
            {item.list.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export function IconGrid({
  items,
  className = "",
}: {
  items: IconCardData[];
  className?: string;
}) {
  return (
    <div className={`icon-grid ${className}`}>
      {items.map((item) => (
        <IconCard key={item.title} item={item} />
      ))}
    </div>
  );
}

export function SectionHeading({
  title,
  eyebrow,
  centered = false,
}: {
  title: string;
  eyebrow?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "center-heading page-heading" : "section-copy page-heading"}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
    </div>
  );
}

export function ImageCard({
  title,
  text,
  image,
  alt,
}: {
  title: string;
  text: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="image-card">
      <div className="image-card-media">
        <Image
          src={image}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width: 900px) 100vw, 32vw"
        />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

export function ClosingCta({
  title,
  text,
  href = "/admissions",
  label = "Demander une admission",
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="cta-band" aria-label={title}>
      <GraduationIcon />
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="primary-button" href={href}>
        {label}
      </Link>
    </section>
  );
}

function GraduationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="cta-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

export function DownloadLink({ href, title }: { href: string; title: string }) {
  return (
    <a className="download-button" href={href} download>
      <Download size={18} />
      {title}
    </a>
  );
}
