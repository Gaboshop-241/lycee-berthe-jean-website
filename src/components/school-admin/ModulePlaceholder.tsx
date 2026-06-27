import Link from "next/link";
import { roleLabels, type SchoolModuleKey, type SchoolNavItem } from "@/lib/school/permissions";

type ModulePlaceholderProps = {
  module: SchoolNavItem;
};

type ModulePlan = {
  summary: string;
  tables: string[];
  features: string[];
  nextSteps: string[];
};

const modulePlans: Partial<Record<SchoolModuleKey, ModulePlan>> = {
  grades: {
    summary:
      "Saisie, consultation et calcul des moyennes par élève, classe, matière et trimestre.",
    tables: ["grades", "students", "subjects", "classes", "teachers", "audit_logs"],
    features: [
      "Saisie des notes par classe et par matière",
      "Contrôle des enseignants sur leurs classes uniquement",
      "Calcul des moyennes avec coefficients",
      "Préparation des bulletins imprimables et exportables",
    ],
    nextSteps: [
      "Créer les écrans de saisie enseignant",
      "Ajouter les vues parent et élève en lecture seule",
      "Générer les bulletins PDF côté serveur",
    ],
  },
  attendance: {
    summary:
      "Appel quotidien, suivi des absences, retards et justificatifs selon les classes.",
    tables: ["attendance", "students", "classes", "users_profiles", "audit_logs"],
    features: [
      "Appel journalier par classe",
      "Statuts présent, absent, retard et excusé",
      "Historique des présences par élève",
      "Préparation des notifications aux parents",
    ],
    nextSteps: [
      "Créer la grille d'appel enseignant",
      "Ajouter le rapport direction par période",
      "Relier les notifications internes aux absences",
    ],
  },
  schedule: {
    summary:
      "Organisation hebdomadaire des cours par classe, matière, enseignant et salle.",
    tables: ["schedules", "classes", "subjects", "teachers"],
    features: [
      "Vue semaine lundi à samedi",
      "Filtre par classe ou enseignant",
      "Créneaux horaires avec salle",
      "Architecture prête pour un futur export calendrier",
    ],
    nextSteps: [
      "Créer l'éditeur de créneaux",
      "Ajouter les conflits enseignant/salle",
      "Préparer l'export PDF",
    ],
  },
  homework: {
    summary:
      "Publication de devoirs par enseignant avec classe, matière, date limite et fichier.",
    tables: ["homework", "classes", "subjects", "teachers", "documents"],
    features: [
      "Création de devoirs publiés ou brouillons",
      "Consultation par parents et élèves",
      "Pièces jointes via stockage privé",
      "Suivi des échéances",
    ],
    nextSteps: [
      "Créer le formulaire enseignant",
      "Brancher Supabase Storage pour les fichiers",
      "Ajouter la vue calendrier des devoirs",
    ],
  },
  fees: {
    summary:
      "Suivi administratif des frais scolaires sans paiement en ligne réel pour l'instant.",
    tables: ["school_fees", "invoices", "students", "payments", "audit_logs"],
    features: [
      "Montants dus, payés et restants",
      "Statuts payé, partiel ou impayé",
      "Lien avec les factures et reçus",
      "Accès réservé à la direction et à la comptabilité",
    ],
    nextSteps: [
      "Créer la page de suivi par élève",
      "Ajouter la génération de factures",
      "Préparer une intégration Mobile Money future",
    ],
  },
  payments: {
    summary:
      "Enregistrement des paiements reçus, reçu administratif et historique financier.",
    tables: ["payments", "school_fees", "invoices", "students", "audit_logs"],
    features: [
      "Saisie d'un paiement par élève",
      "Numéro de reçu unique",
      "Historique par date et méthode",
      "Exports finance CSV/PDF à préparer",
    ],
    nextSteps: [
      "Créer le formulaire de paiement",
      "Générer les reçus imprimables",
      "Ajouter les filtres par période et classe",
    ],
  },
  documents: {
    summary:
      "Gestion sécurisée des documents scolaires et administratifs des élèves.",
    tables: ["documents", "students", "users_profiles", "audit_logs"],
    features: [
      "Catégories certificats, bulletins, reçus et dossiers",
      "Accès selon le rôle",
      "Stockage privé prévu avec Supabase Storage",
      "Traçabilité des uploads",
    ],
    nextSteps: [
      "Créer le composant d'upload",
      "Configurer un bucket privé Supabase",
      "Ajouter les permissions par élève et parent",
    ],
  },
  announcements: {
    summary:
      "Communication interne ciblée vers tous, les parents, élèves, enseignants ou une classe.",
    tables: ["announcements", "classes", "users_profiles", "notifications", "audit_logs"],
    features: [
      "Annonce publiée ou brouillon",
      "Ciblage par rôle ou classe",
      "Priorité normale, importante ou urgente",
      "Affichage sur les dashboards concernés",
    ],
    nextSteps: [
      "Créer l'éditeur d'annonce",
      "Ajouter les notifications internes",
      "Préparer l'envoi email/SMS si activé",
    ],
  },
  reports: {
    summary:
      "Exports administratifs pour les listes, présences, notes, paiements et inscriptions.",
    tables: ["report_exports", "students", "parents", "teachers", "grades", "payments"],
    features: [
      "Filtres par année scolaire, classe et période",
      "Formats CSV, XLSX et PDF à préparer",
      "Historique des exports demandés",
      "Accès réservé aux responsables autorisés",
    ],
    nextSteps: [
      "Créer les filtres de rapport",
      "Générer les premiers CSV côté serveur",
      "Ajouter les exports PDF/XLSX ensuite",
    ],
  },
  settings: {
    summary:
      "Paramètres de l'espace de gestion, comptes utilisateurs, rôles et sécurité.",
    tables: ["users_profiles", "academic_years", "audit_logs"],
    features: [
      "Gestion des profils et statuts",
      "Années scolaires actives",
      "Contrôle des rôles",
      "Audit des actions sensibles",
    ],
    nextSteps: [
      "Créer l'écran des comptes utilisateurs",
      "Ajouter la promotion de rôle sécurisée",
      "Ajouter la rotation de sessions sensibles",
    ],
  },
};

export function ModulePlaceholder({ module }: ModulePlaceholderProps) {
  const Icon = module.icon;
  const plan = modulePlans[module.key] ?? {
    summary:
      "Ce module est préparé dans l'architecture et sera complété avec des écrans métier reliés à Supabase.",
    tables: [],
    features: [
      "Recherche et filtres",
      "Validation serveur",
      "Permissions par rôle",
      "Exports ou impression quand utile",
    ],
    nextSteps: [
      "Valider les règles métier avec l'administration",
      "Créer les actions serveur",
      "Tester les accès par rôle",
    ],
  };

  return (
    <div className="school-dashboard">
      <section className="school-module-placeholder">
        <div>
          <span>{module.phase}</span>
          <h1>{module.label}</h1>
          <p>{plan.summary}</p>
          <div className="school-admin-meta">
            <span>Route : {module.href}</span>
            <span>Accès contrôlé par rôle</span>
            <span>Supabase RLS requis</span>
          </div>
        </div>
        <div className="school-module-card">
          <Icon size={34} />
          <h2>Module préparé</h2>
          <p>
            L&apos;authentification, la navigation et la protection serveur sont en place.
            Les écrans métier seront branchés progressivement sur les tables ci-dessous.
          </p>
          <Link href="/gestion">Retour au dashboard</Link>
        </div>
      </section>

      <section className="school-dashboard-grid school-dashboard-main">
        <article className="school-panel">
          <div className="school-panel-heading">
            <div>
              <h2>Fonctionnalités prévues</h2>
              <p>Ce qui doit être livré pour rendre ce module complet.</p>
            </div>
          </div>
          <ul className="school-module-checklist">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>

        <aside className="school-dashboard-side">
          <article className="school-panel">
            <div className="school-panel-heading">
              <div>
                <h2>Rôles autorisés</h2>
                <p>La page reste invisible pour les autres comptes.</p>
              </div>
            </div>
            <div className="school-module-tags">
              {module.roles.map((role) => (
                <span key={role}>{roleLabels[role]}</span>
              ))}
            </div>
          </article>

          <article className="school-panel">
            <div className="school-panel-heading">
              <div>
                <h2>Tables concernées</h2>
                <p>Base de données prévue pour le module.</p>
              </div>
            </div>
            {plan.tables.length > 0 ? (
              <div className="school-module-tags">
                {plan.tables.map((table) => (
                  <span key={table}>{table}</span>
                ))}
              </div>
            ) : (
              <p className="school-module-note">Tables à confirmer selon le besoin métier.</p>
            )}
          </article>
        </aside>
      </section>

      <section className="school-panel">
        <div className="school-panel-heading">
          <div>
            <h2>Prochaines étapes</h2>
            <p>Aucune donnée fictive n&apos;est créée automatiquement.</p>
          </div>
        </div>
        <ol className="school-module-steps">
          {plan.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
