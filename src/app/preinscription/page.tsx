import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarDays,
  ClipboardCheck,
  FileCheck2,
  FolderOpen,
  GraduationCap,
  Laptop,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import {
  ClosingCta,
  DownloadLink,
  IconGrid,
  PageHero,
  SectionHeading,
  SiteFooter,
} from "../site-components";
import {
  admissionDocs,
  admissionLevels,
  contactInfo,
  downloadItems,
} from "../site-data";

export const metadata: Metadata = {
  title: "Préinscription | Lycée Privé International Berthe & Jean",
  description:
    "Formulaire de préinscription, étapes, pièces à fournir et téléchargement du dossier d'admission du Lycée Privé International Berthe & Jean.",
};

const preinscriptionHighlights = [
  {
    icon: ClipboardCheck,
    title: "Simple",
    text: "Une démarche rapide et guidée.",
  },
  {
    icon: Laptop,
    title: "En ligne ou sur place",
    text: "Déposez votre demande selon votre préférence.",
  },
  {
    icon: FolderOpen,
    title: "Étude du dossier",
    text: "Analyse des pièces et orientation si nécessaire.",
  },
  {
    icon: CalendarDays,
    title: "Rentrée 2025-2026",
    text: "Les préinscriptions sont ouvertes.",
  },
];

const steps = [
  {
    icon: FileCheck2,
    title: "Remplir le formulaire",
    text: "Renseignez les informations demandées.",
  },
  {
    icon: FolderOpen,
    title: "Déposer les pièces",
    text: "Ajoutez les documents requis.",
  },
  {
    icon: ShieldCheck,
    title: "Étude du dossier",
    text: "Nous analysons votre demande.",
  },
  {
    icon: UserCheck,
    title: "Confirmation",
    text: "Nous vous informons de la suite.",
  },
];

const reasons = [
  {
    icon: CalendarDays,
    title: "Réserver une place",
    text: "Assurez-vous une place dans la classe souhaitée.",
  },
  {
    icon: GraduationCap,
    title: "Préparer la rentrée",
    text: "Anticipez les démarches et documents nécessaires.",
  },
  {
    icon: UserCheck,
    title: "Orientation personnalisée",
    text: "Bénéficiez d'un accompagnement adapté à votre enfant.",
  },
  {
    icon: FolderOpen,
    title: "Suivi administratif",
    text: "Restez informé à chaque étape de votre dossier.",
  },
];

const usefulItems = [
  {
    question: "Quand reçoit-on une réponse ?",
    answer:
      "Vous recevrez une réponse par e-mail ou téléphone dans un délai de 7 à 10 jours ouvrés après l'étude de votre dossier.",
  },
  {
    question: "Peut-on finaliser l'inscription plus tard ?",
    answer:
      "Oui, la préinscription ne vous engage pas immédiatement. Vous pourrez finaliser l'inscription ultérieurement.",
  },
  {
    question: "La visite du campus est-elle possible ?",
    answer:
      "Oui, des visites guidées du campus sont organisées sur rendez-vous pour les familles intéressées.",
  },
  {
    question: "Quels sont les horaires du service admissions ?",
    answer:
      "Le service admissions vous accueille du lundi au vendredi de 7h30 à 17h00 et le samedi de 9h00 à 12h00.",
  },
];

export default function PreinscriptionPage() {
  const email = contactInfo.emails[0];

  return (
    <main className="site-shell">
      <PageHero
        active="preinscription"
        title="Préinscription"
        text="Préinscrivez votre enfant pour la prochaine année scolaire et demandez une place au Lycée Privé International Berthe & Jean, du collège au lycée."
        image="/assets/real/student-group.jpg"
        imageAlt="Famille en entretien de préinscription au Lycée Berthe et Jean"
        actions={[
          { label: "Commencer la préinscription", href: "#formulaire" },
          { label: "Télécharger le dossier", href: downloadItems[0].href, variant: "secondary" },
        ]}
      />

      <section className="page-section">
        <IconGrid items={preinscriptionHighlights} className="four-columns" />
      </section>

      <section id="formulaire" className="page-section preinscription-layout">
        <form
          className="form-card"
          action={`mailto:${email}`}
          method="post"
          encType="text/plain"
        >
          <SectionHeading title="Formulaire de préinscription" />
          <div className="form-grid">
            <label className="form-field">
              <span>Nom de l&apos;élève</span>
              <input name="nom-eleve" placeholder="Nom de l'élève" required />
            </label>
            <label className="form-field">
              <span>Prénom de l&apos;élève</span>
              <input name="prenom-eleve" placeholder="Prénom de l'élève" required />
            </label>
            <label className="form-field">
              <span>Date de naissance</span>
              <input name="date-naissance" type="date" required />
            </label>
            <label className="form-field">
              <span>Classe demandée</span>
              <select name="classe" required defaultValue="">
                <option value="" disabled>
                  Sélectionner une classe
                </option>
                <option>6e</option>
                <option>5e</option>
                <option>4e</option>
                <option>3e</option>
                <option>2nde</option>
                <option>1re</option>
                <option>Terminale</option>
              </select>
            </label>
            <label className="form-field">
              <span>Nom du parent / tuteur</span>
              <input name="parent" placeholder="Nom et prénom" required />
            </label>
            <label className="form-field">
              <span>Téléphone</span>
              <input name="telephone" type="tel" placeholder="+241 00 00 00 00" required />
            </label>
            <label className="form-field">
              <span>Adresse e-mail</span>
              <input name="email" type="email" placeholder="exemple@email.com" required />
            </label>
            <label className="form-field">
              <span>Adresse</span>
              <input name="adresse" placeholder="Quartier, Ville" />
            </label>
            <label className="form-field full">
              <span>Établissement d&apos;origine</span>
              <input name="etablissement-origine" placeholder="Nom de l'établissement" />
            </label>
            <label className="form-field full">
              <span>Observations (facultatif)</span>
              <textarea
                name="observations"
                placeholder="Toute information utile pour l'étude du dossier..."
              />
            </label>
          </div>
          <label className="checkbox-line">
            <input type="checkbox" name="certification" required />
            <span>Je certifie que les informations fournies sont exactes.</span>
          </label>
          <button className="primary-button form-button" type="submit">
            Envoyer la demande
          </button>
        </form>

        <aside className="preinscription-side">
          <div className="steps-vertical">
            <SectionHeading title="Étapes de la préinscription" />
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.title}>
                  <span>{index + 1}</span>
                  <Icon size={28} />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="side-grid">
            <div>
              <SectionHeading title="Pièces à fournir" />
              <div className="checklist-card dense">
                {admissionDocs.slice(2, 6).map((doc) => (
                  <p key={doc}>
                    <ClipboardCheck size={16} /> {doc}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading title="Niveaux concernés" />
              <IconGrid items={admissionLevels} className="three-columns mini-icons" />
            </div>
          </div>

          <div className="download-actions">
            {downloadItems.map((item) => (
              <DownloadLink key={item.href} href={item.href} title="Télécharger le dossier" />
            ))}
          </div>

          <div className="image-frame">
            <Image
              src="/assets/real/campus-building.jpg"
              alt="Entrée du Lycée Berthe et Jean"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
        </aside>
      </section>

      <section className="page-section">
        <SectionHeading title="Pourquoi préinscrire maintenant ?" />
        <IconGrid items={reasons} className="four-columns compact-icons" />
      </section>

      <section className="page-section">
        <SectionHeading title="Informations utiles" />
        <div className="faq-grid">
          {usefulItems.map((item) => (
            <details key={item.question} open>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ClosingCta
        title="Préinscrivez votre enfant dès aujourd'hui"
        text="Remplissez le formulaire en ligne ou contactez notre service admissions pour toute question."
        href="/contact"
        label="Contacter les admissions"
      />

      <SiteFooter />
    </main>
  );
}
