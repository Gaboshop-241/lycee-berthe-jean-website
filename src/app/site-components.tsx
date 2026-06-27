import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  Clock3,
  Download,
  Mail,
  MapPin,
  MapPinned,
  Phone,
} from "lucide-react";
import { MobileNavDetails } from "@/components/MobileNavDetails";
import { contactInfo, navItems } from "./site-data";
import { commonCopy } from "./i18n-content";
import type { Locale } from "./i18n-config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type ActiveKey = (typeof navItems)[number]["key"];
type NavItem = (typeof navItems)[number];
type ContactInfo = typeof contactInfo;
type CommonCopy = (typeof commonCopy)[Locale];

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

export function SchoolLogo({ common = commonCopy.fr }: { common?: CommonCopy }) {
  return (
    <Link className="brand" href="/" aria-label={common.brandAria}>
      <Image
        className="school-logo"
        src="/assets/logo-berthe-jean.png"
        alt=""
        width={88}
        height={92}
      />
      <span>
        <strong className="brand-title">
          {common.brandTitleLine1}
          <br />
          {common.brandTitleLine2}
        </strong>
        <em>{common.brandMotto}</em>
      </span>
    </Link>
  );
}

export function SiteHeader({
  active,
  common = commonCopy.fr,
  currentLocale = "fr",
  items = navItems,
}: {
  active: ActiveKey;
  common?: CommonCopy;
  currentLocale?: Locale;
  items?: NavItem[];
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <SchoolLogo common={common} />

        <nav className="desktop-nav" aria-label={common.mainNavigation}>
          {items.map((item) => (
            <Link
              key={item.key}
              className={item.key === active ? "active" : ""}
              href={item.href}
              aria-current={item.key === active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher currentLocale={currentLocale} />

        <Link className="header-contact-button" href="/contact#message">
          {common.contactButton}
        </Link>

        <MobileNavDetails
          menuAria={common.mobileMenuAria}
          closeMenuAria={common.closeMobileMenuAria}
        >
          <div>
            <LanguageSwitcher currentLocale={currentLocale} />
            {items.map((item) => (
              <Link
                key={item.key}
                className={item.key === active ? "active" : ""}
                href={item.href}
                aria-current={item.key === active ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link className="mobile-cta" href="/contact#message">
              {common.contactButton}
            </Link>
          </div>
        </MobileNavDetails>
      </div>
    </header>
  );
}

export function SiteFooter({
  common = commonCopy.fr,
  info = contactInfo,
  items = navItems,
}: {
  common?: CommonCopy;
  info?: ContactInfo;
  items?: NavItem[];
}) {
  const primaryPhone = info.phones[0];
  const telHref = `tel:${primaryPhone.replace(/\s/g, "")}`;

  return (
    <footer id="site-footer" className="footer" aria-label={common.footerAria}>
      <div className="footer-inner">
        <div className="footer-brand">
          <SchoolLogo common={common} />
          <p>{common.footerIntro}</p>
        </div>

        <div className="footer-column">
          <h2>{common.footerContact}</h2>
          <a
            className="footer-contact-link"
            href={info.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPinned size={18} /> {info.location}
          </a>
          <p>
            <MapPin size={18} /> {info.postal}
          </p>
          {info.emails.map((email) => (
            <a className="footer-contact-link" href={`mailto:${email}`} key={email}>
              <Mail size={18} /> {email}
            </a>
          ))}
          <a className="footer-contact-link" href={telHref}>
            <Phone size={18} /> {primaryPhone}
          </a>
          {info.hours.map((item) => (
            <p key={item}>
              <Clock3 size={18} /> {item}
            </p>
          ))}
        </div>

        <div className="footer-column">
          <h2>{common.quickLinks}</h2>
          <div className="footer-links">
            {items.slice(1).map((item) => (
              <Link key={item.key} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/faq">FAQ</Link>
            <Link href="/contact#message">{common.writeUs}</Link>
          </div>
        </div>

        <div className="footer-column">
          <h2>{common.followUs}</h2>
          <div className="social-links" aria-label={common.socialAria}>
            <a
              href={info.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={common.facebookAria}
            >
              <FacebookIcon />
            </a>
          </div>
          <Link className="footer-admission-link" href="/admissions">
            {common.admissionCta}
          </Link>
        </div>
      </div>
      <p className="copyright">{common.copyright}</p>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="social-brand-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14.4 8.2V6.9c0-.6.4-.8.8-.8h2V2.8l-2.8-.1c-3.1 0-4.8 1.9-4.8 5.2v.3H6.8v3.7h2.8v9.4h3.8v-9.4h3.1l.5-3.7z" />
    </svg>
  );
}

export function Breadcrumb({
  current,
  common = commonCopy.fr,
}: {
  current: string;
  common?: CommonCopy;
}) {
  return (
    <nav aria-label={common.breadcrumbAria ?? "Fil d'Ariane"}>
      <p className="breadcrumb">
        <Link href="/">{common.breadcrumbHome}</Link>
        <ChevronRight size={14} aria-hidden="true" />
        <span aria-current="page">{current}</span>
      </p>
    </nav>
  );
}

export function PageHero({
  active,
  title,
  text,
  image,
  imageAlt,
  actions,
  common = commonCopy.fr,
  currentLocale = "fr",
  items = navItems,
}: {
  active: ActiveKey;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  actions: PageAction[];
  common?: CommonCopy;
  currentLocale?: Locale;
  items?: NavItem[];
}) {
  return (
    <>
      <SiteHeader
        active={active}
        common={common}
        currentLocale={currentLocale}
        items={items}
      />
      <section className="page-hero">
        <div className="page-hero-copy">
          <Breadcrumb current={title} common={common} />
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
            preload
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
  href = "/contact#message",
  label,
  common = commonCopy.fr,
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
  common?: CommonCopy;
}) {
  return (
    <section className="cta-band" aria-label={title}>
      <GraduationIcon />
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="primary-button" href={href}>
        {label ?? common.admissionCta}
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
