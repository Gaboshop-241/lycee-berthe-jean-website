import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UsersRound,
} from "lucide-react";
import {
  ClosingCta,
  IconGrid,
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

const contactCards = [
  {
    icon: MapPin,
    title: "Adresse",
    text: contactInfo.location,
  },
  {
    icon: Phone,
    title: "Téléphone",
    text: contactInfo.phones[0],
  },
  {
    icon: Mail,
    title: "E-mail",
    text: contactInfo.emails[0],
  },
  {
    icon: Clock3,
    title: "Horaires",
    list: contactInfo.hours,
  },
];

const services = [
  {
    icon: GraduationCap,
    title: "Service admissions",
    text: "Pour toutes demandes d'inscription, d'information sur nos programmes ou d'orientation.",
  },
  {
    icon: UsersRound,
    title: "Vie scolaire",
    text: "Pour les questions liées à la scolarité, aux activités, aux clubs et au suivi des élèves.",
  },
  {
    icon: Building2,
    title: "Administration",
    text: "Pour les questions générales, les documents officiels et les démarches administratives.",
  },
];

const practicalItems = [
  {
    question: "Comment prendre rendez-vous ?",
    answer:
      "Vous pouvez prendre rendez-vous en ligne via notre formulaire ou nous contacter par téléphone ou par e-mail.",
  },
  {
    question: "Peut-on visiter le campus ?",
    answer:
      "Oui, des visites du campus sont organisées sur rendez-vous pour les familles et futurs élèves.",
  },
  {
    question: "Quels documents prévoir pour une demande d'admission ?",
    answer:
      "Prévoir les bulletins scolaires, acte de naissance, photos d'identité et fiche médicale de l'élève.",
  },
  {
    question: "À quels horaires l'administration reçoit-elle ?",
    answer:
      "L'administration vous accueille du lundi au vendredi de 7h30 à 17h00 et le samedi de 9h00 à 12h00.",
  },
];

export default function ContactPage() {
  const email = contactInfo.emails[0];

  return (
    <main className="site-shell">
      <PageHero
        active="contact"
        title="Contact"
        text="Notre équipe est à votre écoute pour répondre à vos questions, vous accompagner dans vos démarches et vous accueillir au sein du Lycée Privé International Berthe & Jean à Essassa."
        image="/assets/real/student-group.jpg"
        imageAlt="Accueil des familles au Lycée Berthe et Jean"
        actions={[
          { label: "Nous écrire", href: "#message" },
          { label: "Prendre rendez-vous", href: "#rendez-vous", variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={contactCards} className="four-columns contact-cards" />
      </section>

      <section id="message" className="page-section contact-layout">
        <form
          className="form-card"
          action={`mailto:${email}`}
          method="post"
          encType="text/plain"
        >
          <SectionHeading title="Envoyez-nous un message" />
          <div className="form-grid">
            <label className="form-field">
              <span>Nom complet</span>
              <input name="nom" placeholder="Votre nom complet" required />
            </label>
            <label className="form-field">
              <span>Adresse e-mail</span>
              <input name="email" type="email" placeholder="Votre adresse e-mail" required />
            </label>
            <label className="form-field">
              <span>Téléphone</span>
              <input name="telephone" type="tel" placeholder="Votre numéro de téléphone" />
            </label>
            <label className="form-field">
              <span>Sujet</span>
              <input name="sujet" placeholder="Objet de votre message" required />
            </label>
            <label className="form-field full">
              <span>Votre message</span>
              <textarea name="message" placeholder="Écrivez votre message ici..." required />
            </label>
          </div>
          <button className="primary-button form-button" type="submit">
            Envoyer le message
          </button>
        </form>

        <div className="service-stack" id="rendez-vous">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title}>
                <Icon size={42} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
          <div className="image-frame contact-image">
            <Image
              src="/assets/real/campus-building.jpg"
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
            Le Lycée Privé International Berthe & Jean est situé à Essassa, dans
            un environnement calme, sécurisé et facilement accessible.
          </p>
          <div className="map-card" aria-label="Localisation du lycée à Essassa">
            <span className="map-pin">
              <MapPin size={34} />
            </span>
            <strong>Essassa, Gabon</strong>
            <small>N1</small>
          </div>
        </div>
        <div className="image-frame tall">
          <Image
            src="/assets/real/campus-aerial.jpg"
            alt="Vue du campus du Lycée Berthe et Jean"
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </div>
      </section>

      <section className="page-section">
        <SectionHeading title="Informations pratiques" />
        <div className="faq-grid">
          {practicalItems.map((item) => (
            <details key={item.question} open>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
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
