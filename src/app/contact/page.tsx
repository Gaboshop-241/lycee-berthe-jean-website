import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CalendarDays,
  Clock3,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Share2,
  UsersRound,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import type { Locale } from "../i18n-config";
import { getSiteContent } from "../i18n-server";
import {
  ClosingCta,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pages } = await getSiteContent();
  const { contactTitle, contactDescription } = pages.metadata;

  return {
    title: contactTitle,
    description: contactDescription,
    openGraph: {
      title: contactTitle,
      description: contactDescription,
      url: "/contact",
      type: "website",
      locale: locale === "en" ? "en_US" : "fr_GA",
    },
    twitter: {
      card: "summary_large_image",
      title: contactTitle,
      description: contactDescription,
    },
  };
}

function contactMailHref(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

function getContactPageData(locale: Locale, email: string) {
  if (locale === "en") {
    return {
      services: [
        {
          icon: GraduationCap,
          title: "Admissions office",
          text: "For admission requests, program information or guidance questions.",
          pageHref: "/admissions",
          actionHref: contactMailHref(email, "Admissions office - information request"),
        },
        {
          icon: UsersRound,
          title: "School life",
          text: "For questions about schooling, activities, clubs and student follow-up.",
          pageHref: "/vie-scolaire",
          actionHref: contactMailHref(email, "School life - information request"),
        },
        {
          icon: Building2,
          title: "Administration",
          text: "For general questions, official documents and administrative procedures.",
          pageHref: "/contact#message",
          actionHref: contactMailHref(email, "Administration - information request"),
        },
      ],
      practicalItems: [
        {
          question: "How can I make an appointment?",
          answer: (
            <>
              <p>
                Use the contact form and choose the relevant service, or call the
                administration directly during opening hours.
              </p>
              <Link href="#visite-campus">See campus visit information</Link>
            </>
          ),
        },
        {
          question: "Can families visit the campus?",
          answer: (
            <p>
              Yes. Visits are by appointment: the team can present classrooms,
              school life areas, admissions services and answer families&apos;
              questions.
            </p>
          ),
        },
        {
          question: "Which documents should be prepared for admission?",
          answer: (
            <p>
              Prepare the birth certificate, school reports, passport photos, a
              medical form if requested and, for transfers, the school certificate
              or release document. Documents may be submitted to the administration
              or emailed after confirmation.
            </p>
          ),
        },
        {
          question: "When does the administration receive visitors?",
          answer: (
            <p>
              The administration receives visitors Monday to Friday from 7:30 AM
              to 5:00 PM and Saturday from 9:00 AM to 12:00 PM. For file requests,
              calling ahead helps confirm the relevant service is available.
            </p>
          ),
        },
      ],
    };
  }

  return {
    services: [
      {
        icon: GraduationCap,
        title: "Service admissions",
        text: "Pour toutes demandes d'inscription, d'information sur nos programmes ou d'orientation.",
        pageHref: "/admissions",
        actionHref: contactMailHref(email, "Service admissions - demande d'information"),
      },
      {
        icon: UsersRound,
        title: "Vie scolaire",
        text: "Pour les questions liées à la scolarité, aux activités, aux clubs et au suivi des élèves.",
        pageHref: "/vie-scolaire",
        actionHref: contactMailHref(email, "Vie scolaire - demande d'information"),
      },
      {
        icon: Building2,
        title: "Administration",
        text: "Pour les questions générales, les documents officiels et les démarches administratives.",
        pageHref: "/contact#message",
        actionHref: contactMailHref(email, "Administration - demande d'information"),
      },
    ],
    practicalItems: [
      {
        question: "Comment prendre rendez-vous ?",
        answer: (
          <>
            <p>
              Utilisez le formulaire de contact en choisissant le service concerné,
              ou appelez directement l&apos;administration pendant les horaires
              d&apos;ouverture.
            </p>
            <Link href="#visite-campus">Voir les informations de visite</Link>
          </>
        ),
      },
      {
        question: "Peut-on visiter le campus ?",
        answer: (
          <p>
            Oui. Les visites se font sur rendez-vous : l&apos;équipe peut présenter les
            espaces de classe, la vie scolaire, les services d&apos;admission et
            répondre aux questions des familles.
          </p>
        ),
      },
      {
        question: "Quels documents prévoir pour une demande d'admission ?",
        answer: (
          <p>
            Préparez l&apos;acte de naissance, les bulletins scolaires, des photos
            d&apos;identité, la fiche médicale si demandée et, pour un transfert, le
            certificat de scolarité ou de radiation. Les pièces peuvent être
            déposées à l&apos;administration ou envoyées par e-mail après confirmation.
          </p>
        ),
      },
      {
        question: "À quels horaires l'administration reçoit-elle ?",
        answer: (
          <p>
            L&apos;administration reçoit du lundi au vendredi de 7h30 à 17h00 et le
            samedi de 9h00 à 12h00. Pour les demandes de dossier, un appel préalable
            permet de confirmer la disponibilité du service concerné.
          </p>
        ),
      },
    ],
  };
}

export default async function ContactPage() {
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.contact;
  const email = data.contactInfo.emails[0];
  const phone = data.contactInfo.phones[0];
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const mailSubject =
    locale === "en"
      ? "Contact from the Berthe & Jean website"
      : "Contact depuis le site Berthe & Jean";
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(mailSubject)}`;
  const contactData = getContactPageData(locale, email);
  const contactCards = [
    {
      icon: MapPin,
      title: copy.address,
      text: data.contactInfo.postal,
      href: data.contactInfo.mapsUrl,
      label: copy.seeAddress,
      external: true,
    },
    {
      icon: Phone,
      title: copy.phone,
      text: phone,
      href: telHref,
      label: copy.callNow,
    },
    {
      icon: Mail,
      title: copy.email,
      text: email,
      href: mailHref,
      label: copy.writeEmail,
    },
    {
      icon: Clock3,
      title: copy.hours,
      list: data.contactInfo.hours,
      href: "#message",
      label: copy.writeSchool,
    },
  ];

  return (
    <main className="site-shell">
      <PageHero
        active="contact"
        title={copy.heroTitle}
        text={copy.heroText}
        image="/assets/real/building-courtyard.jpg"
        imageAlt={copy.heroAlt}
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          { label: copy.write, href: "#message" },
          { label: copy.appointment, href: "#visite-campus", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <div className="icon-grid four-columns contact-cards">
          {contactCards.map((item) => {
            const Icon = item.icon;

            return (
              <article className="icon-card contact-card" key={item.title}>
                <Icon size={42} strokeWidth={1.8} />
                <div>
                  <h3>{item.title}</h3>
                  {"text" in item && item.text ? <p>{item.text}</p> : null}
                  {"list" in item && item.list ? (
                    <ul>
                      {item.list.map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  ) : null}
                  <a
                    className="contact-card-link"
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  >
                    {item.label}
                    {item.external ? <ExternalLink size={14} /> : null}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="contact-action-row" aria-label={copy.quickActionsAria}>
          <a className="primary-button icon-button" href={telHref}>
            <Phone size={18} />
            {copy.callSchool}
          </a>
          <a className="secondary-button icon-button" href={mailHref}>
            <Mail size={18} />
            {copy.sendEmail}
          </a>
          <a
            className="secondary-button icon-button"
            href={data.contactInfo.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Navigation size={18} />
            {copy.directions}
          </a>
        </div>
        <div className="contact-support-grid">
          <article className="contact-language-note">
            <MessageSquare size={24} />
            <div>
              <h2>{copy.internationalTitle}</h2>
              <p>{copy.internationalText}</p>
            </div>
          </article>
          <article className="contact-social-panel">
            <Share2 size={24} />
            <div>
              <h2>{copy.socialTitle}</h2>
              <p>{copy.socialText}</p>
              <a href={data.contactInfo.facebookUrl} target="_blank" rel="noreferrer">
                {copy.facebook} <ExternalLink size={14} />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="message" className="page-section contact-layout">
        <ContactForm email={email} phone={phone} locale={locale} />

        <div className="service-stack" id="visite-campus">
          <article className="appointment-card">
            <CalendarDays size={42} />
            <div>
              <h3>{copy.visitTitle}</h3>
              <p>{copy.visitText}</p>
              <div className="service-link-row">
                <Link href="#message">{copy.requestVisit}</Link>
                <a href={telHref}>{copy.call}</a>
              </div>
            </div>
          </article>
          {contactData.services.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title}>
                <Icon size={42} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="service-link-row">
                    <Link href={item.pageHref}>{copy.seeInfo}</Link>
                    <a href={item.actionHref}>{copy.writeService}</a>
                  </div>
                </div>
              </article>
            );
          })}
          <div className="image-frame contact-image">
            <Image
              src="/assets/real/hero-berthe-jean-gabon4you.jpg"
              alt={copy.entranceAlt}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="page-section contact-find">
        <div className="section-copy">
          <h2>{copy.findTitle}</h2>
          <p>{copy.findText}</p>
          <div className="google-map-card" aria-label={copy.mapAria}>
            <iframe
              className="google-map"
              title={copy.mapTitle}
              src={data.contactInfo.mapsEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
            <div className="map-details">
              <strong>Lycée Privé International Berthe & Jean</strong>
              <span>{data.contactInfo.postal}</span>
              <p>{copy.landmark}</p>
              <a href={data.contactInfo.mapsUrl} target="_blank" rel="noreferrer">
                {copy.openMaps} <ExternalLink size={15} />
              </a>
              <a
                href={data.contactInfo.directionsFromLibrevilleUrl}
                target="_blank"
                rel="noreferrer"
              >
                {copy.fromLibreville} <Navigation size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="image-frame tall">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt={copy.campusAlt}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title={copy.practical} />
        <div className="faq-grid contact-faq-grid">
          {contactData.practicalItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <div className="faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
        <div className="documents-followup">
          <FileText size={28} />
          <p>
            {copy.followup} <Link href="/admissions">{copy.followupLink}</Link>{" "}
            {copy.followupEnd}
          </p>
        </div>
      </section>

      <ClosingCta title={copy.ctaTitle} text={copy.ctaText} common={common} />

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
