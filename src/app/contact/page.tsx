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
import {
  ClosingCta,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";
import { contactInfo } from "../site-data";

export const metadata: Metadata = {
  title: "Contact | Lycée Privé International Berthe & Jean",
  description:
    "Adresse, téléphone, e-mail, horaires, formulaire de contact et informations pratiques du Lycée Privé International Berthe & Jean.",
};

function contactMailHref(subject: string) {
  return `mailto:${contactInfo.emails[0]}?subject=${encodeURIComponent(subject)}`;
}

const services = [
  {
    icon: GraduationCap,
    title: "Service admissions",
    text: "Pour toutes demandes d'inscription, d'information sur nos programmes ou d'orientation.",
    pageHref: "/admissions",
    actionHref: contactMailHref("Service admissions - demande d'information"),
  },
  {
    icon: UsersRound,
    title: "Vie scolaire",
    text: "Pour les questions liées à la scolarité, aux activités, aux clubs et au suivi des élèves.",
    pageHref: "/vie-scolaire",
    actionHref: contactMailHref("Vie scolaire - demande d'information"),
  },
  {
    icon: Building2,
    title: "Administration",
    text: "Pour les questions générales, les documents officiels et les démarches administratives.",
    pageHref: "/contact#message",
    actionHref: contactMailHref("Administration - demande d'information"),
  },
];

const practicalItems = [
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
        Oui. Les visites se font sur rendez-vous : l&apos;équipe peut présenter
        les espaces de classe, la vie scolaire, les services d&apos;admission et
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
];

export default function ContactPage() {
  const email = contactInfo.emails[0];
  const phone = contactInfo.phones[0];
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const mailHref = `mailto:${email}?subject=Contact%20depuis%20le%20site%20Berthe%20%26%20Jean`;
  const contactCards = [
    {
      icon: MapPin,
      title: "Adresse",
      text: contactInfo.postal,
      href: contactInfo.mapsUrl,
      label: "Voir l'adresse sur la carte",
      external: true,
    },
    {
      icon: Phone,
      title: "Téléphone",
      text: phone,
      href: telHref,
      label: "Appeler maintenant",
    },
    {
      icon: Mail,
      title: "E-mail",
      text: email,
      href: mailHref,
      label: "Écrire par e-mail",
    },
    {
      icon: Clock3,
      title: "Horaires",
      list: contactInfo.hours,
      href: "#message",
      label: "Écrire au lycée",
    },
  ];

  return (
    <main className="site-shell">
      <PageHero
        active="contact"
        title="Contact"
        text="Notre équipe est à votre écoute pour répondre à vos questions, vous accompagner dans vos démarches et vous accueillir au sein du Lycée Privé International Berthe & Jean à Essassa."
        image="/assets/real/building-courtyard.jpg"
        imageAlt="Cour et bâtiments du Lycée Privé International Berthe et Jean"
        actions={[
          { label: "Nous écrire", href: "#message" },
          { label: "Prendre rendez-vous", href: "#visite-campus", variant: "secondary" },
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
                  {item.text ? <p>{item.text}</p> : null}
                  {item.list ? (
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
        <div className="contact-action-row" aria-label="Actions de contact rapides">
          <a className="primary-button icon-button" href={telHref}>
            <Phone size={18} />
            Appeler le lycée
          </a>
          <a className="secondary-button icon-button" href={mailHref}>
            <Mail size={18} />
            Envoyer un e-mail
          </a>
          <a
            className="secondary-button icon-button"
            href={contactInfo.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Navigation size={18} />
            Voir l&apos;itinéraire
          </a>
        </div>
        <div className="contact-support-grid">
          <article className="contact-language-note">
            <MessageSquare size={24} />
            <div>
              <h2>For international families</h2>
              <p>
                The school team can guide families looking for information about
                admissions, school life and visits in Essassa. Please contact
                the administration before coming to campus.
              </p>
            </div>
          </article>
          <article className="contact-social-panel">
            <Share2 size={24} />
            <div>
              <h2>Réseaux sociaux</h2>
              <p>
                Suivez les annonces et la vie du lycée directement depuis la
                page Facebook officielle.
              </p>
              <a href={contactInfo.facebookUrl} target="_blank" rel="noreferrer">
                Page Facebook du lycée <ExternalLink size={14} />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="message" className="page-section contact-layout">
        <ContactForm email={email} phone={phone} />

        <div className="service-stack" id="visite-campus">
          <article className="appointment-card">
            <CalendarDays size={42} />
            <div>
              <h3>Visite du campus sur rendez-vous</h3>
              <p>
                Les familles peuvent demander une visite pour découvrir les
                salles de classe, les espaces de vie scolaire et les conditions
                d&apos;admission.
              </p>
              <div className="service-link-row">
                <Link href="#message">Demander une visite</Link>
                <a href={telHref}>Appeler</a>
              </div>
            </div>
          </article>
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title}>
                <Icon size={42} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="service-link-row">
                    <Link href={item.pageHref}>Voir les informations</Link>
                    <a href={item.actionHref}>Écrire au service</a>
                  </div>
                </div>
              </article>
            );
          })}
          <div className="image-frame contact-image">
            <Image
              src="/assets/real/hero-berthe-jean-gabon4you.jpg"
              alt="Entrée du Lycée Privé International Berthe et Jean"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="page-section contact-find">
        <div className="section-copy">
          <h2>Nous trouver</h2>
          <p>
            Le Lycée Privé International Berthe & Jean est situé sur la Route
            Nationale 1, au PK 23 Essassa, dans la commune de Ntoum. Depuis
            Libreville, l&apos;itinéraire se fait par la RN1 en direction
            d&apos;Essassa.
          </p>
          <div className="google-map-card" aria-label="Carte Google Maps du lycée à Essassa">
            <iframe
              className="google-map"
              title="Localisation Google Maps du Lycée Privé International Berthe et Jean à Essassa"
              src={contactInfo.mapsEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-details">
              <strong>Lycée Privé International Berthe & Jean</strong>
              <span>{contactInfo.postal}</span>
              <p>
                Repère pratique : Route Nationale 1, PK 23 Essassa, commune de
                Ntoum, à environ 23 kilomètres de Libreville.
              </p>
              <a href={contactInfo.mapsUrl} target="_blank" rel="noreferrer">
                Ouvrir dans Google Maps <ExternalLink size={15} />
              </a>
              <a
                href={contactInfo.directionsFromLibrevilleUrl}
                target="_blank"
                rel="noreferrer"
              >
                Itinéraire depuis Libreville <Navigation size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="image-frame tall">
          <Image
            src="/assets/real/campus-gardens.jpeg"
            alt="Vue du campus du Lycée Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Informations pratiques" />
        <div className="faq-grid contact-faq-grid">
          {practicalItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <div className="faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
        <div className="documents-followup">
          <FileText size={28} />
          <p>
            Pour une admission, préparez vos pièces avant la prise de contact.
            La page <Link href="/admissions">Admissions</Link> détaille les
            étapes et les documents à fournir.
          </p>
        </div>
      </section>

      <ClosingCta
        title="Rencontrons-nous pour construire l'avenir de votre enfant"
        text="Contactez-nous dès aujourd'hui ou visitez notre campus pour découvrir notre établissement."
      />

      <SiteFooter />
    </main>
  );
}
