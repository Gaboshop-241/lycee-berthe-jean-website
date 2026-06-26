import {
  ArrowRight,
  Bell,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  Megaphone,
  ReceiptText,
  Settings,
  UserPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  formatSchoolDate,
  type SchoolDashboardData,
} from "@/lib/school/data";
import { roleLabels } from "@/lib/school/permissions";
import type { SchoolRole, UserProfile } from "@/lib/school/types";
import { getManagementWelcome } from "@/lib/school/welcome";

type AdminDashboardProps = {
  profile: UserProfile;
  data: SchoolDashboardData;
};

type QuickAction = {
  label: string;
  detail: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  roles: SchoolRole[];
};

const quickActions: QuickAction[] = [
  {
    label: "Ajouter un élève",
    detail: "Créer un vrai dossier élève dans Supabase.",
    href: "/gestion/eleves",
    icon: UserPlus,
    roles: ["admin", "direction"],
  },
  {
    label: "Ajouter un parent",
    detail: "Créer ou compléter un contact responsable.",
    href: "/gestion/parents",
    icon: UsersRound,
    roles: ["admin", "direction"],
  },
  {
    label: "Gérer les paiements",
    detail: "Suivre les frais et reçus.",
    href: "/gestion/paiements",
    icon: ReceiptText,
    roles: ["admin", "direction", "accountant"],
  },
  {
    label: "Paramètres",
    detail: "Rôles, comptes et configuration.",
    href: "/gestion/parametres",
    icon: Settings,
    roles: ["admin"],
  },
];

function MetricIcon({ label }: { label: string }) {
  if (label.includes("Élèves")) return <GraduationCap size={22} />;
  if (label.includes("Parents")) return <UsersRound size={22} />;
  if (label.includes("Absences")) return <ClipboardCheck size={22} />;
  if (label.includes("Paiements")) return <CreditCard size={22} />;
  return <Bell size={22} />;
}

function MetricCard({ metric }: { metric: SchoolDashboardData["metrics"][number] }) {
  return (
    <article className={`school-stat-card ${metric.tone}`}>
      <div className="school-stat-icon">
        <MetricIcon label={metric.label} />
      </div>
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <small>{metric.detail}</small>
    </article>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="school-empty-state">
      <strong>{label}</strong>
      <p>Les informations apparaîtront ici dès qu’elles seront enregistrées.</p>
    </div>
  );
}

function statusClass(status: string) {
  if (status === "pending") return "en-attente";
  if (status === "suspended") return "suspendu";
  if (status === "inactive") return "inactif";
  return "actif";
}

function statusLabel(status: string) {
  if (status === "pending") return "En attente";
  if (status === "suspended") return "Suspendu";
  if (status === "inactive") return "Inactif";
  return "Actif";
}

export function AdminDashboard({ profile, data }: AdminDashboardProps) {
  const visibleQuickActions = quickActions.filter((action) =>
    action.roles.includes(profile.role),
  );
  const welcomeMessage = getManagementWelcome(profile);

  return (
    <div className="school-dashboard">
      <section className="school-admin-hero">
        <div>
          <span className="school-admin-eyebrow">Tableau de bord</span>
          <h1>{welcomeMessage}</h1>
          <p>
            Bonjour {profile.full_name}. Vue réelle de la gestion scolaire du
            Lycée Privé International Berthe & Jean. Les cartes et listes
            ci-dessous utilisent les données actuellement enregistrées dans
            Supabase.
          </p>
          <div className="school-admin-meta" aria-label="Contexte du compte">
            <span>{roleLabels[profile.role]}</span>
            <span>Session sécurisée</span>
            <span>Données réelles</span>
          </div>
        </div>
        <Link className="school-header-action" href="/gestion/annonces">
          <Megaphone size={18} />
          Créer une annonce
        </Link>
      </section>

      <section className="school-stat-grid" aria-label="Statistiques clés">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="school-dashboard-grid school-dashboard-main">
        <article className="school-panel school-panel-large">
          <div className="school-panel-heading">
            <div>
              <h2>Derniers élèves</h2>
              <p>Dossiers élèves récemment enregistrés.</p>
            </div>
            <Link href="/gestion/eleves">Gérer les élèves</Link>
          </div>
          {data.latestStudents.length > 0 ? (
            <div className="school-table-wrap">
              <table className="school-table">
                <thead>
                  <tr>
                    <th>Matricule</th>
                    <th>Élève</th>
                    <th>Classe</th>
                    <th>Parent</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {data.latestStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.matricule}</td>
                      <td>
                        {student.first_name} {student.last_name}
                      </td>
                      <td>{student.classes?.name ?? "Non affecté"}</td>
                      <td>{student.parents?.full_name ?? "Non renseigné"}</td>
                      <td>
                        <span className={`school-status ${statusClass(student.status)}`}>
                          {statusLabel(student.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState label="Aucun élève enregistré" />
          )}
        </article>

        <aside className="school-dashboard-side">
          <article className="school-panel">
            <div className="school-panel-heading">
              <div>
                <h2>Actions rapides</h2>
                <p>Accès direct aux opérations autorisées.</p>
              </div>
            </div>
            {visibleQuickActions.length > 0 ? (
              <div className="school-quick-actions">
                {visibleQuickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link key={action.href} href={action.href}>
                      <Icon size={20} />
                      <span>
                        <strong>{action.label}</strong>
                        <small>{action.detail}</small>
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <EmptyState label="Aucune action rapide disponible" />
            )}
          </article>

          <article className="school-panel">
            <div className="school-panel-heading">
              <div>
                <h2>Dernières annonces</h2>
                <p>Messages publiés dans le système.</p>
              </div>
              <Link href="/gestion/annonces">Voir tout</Link>
            </div>
            {data.announcements.length > 0 ? (
              <div className="school-announcement-list">
                {data.announcements.map((announcement) => (
                  <div key={announcement.id}>
                    <span className={`school-priority ${announcement.priority}`}>
                      {announcement.priority}
                    </span>
                    <strong>{announcement.title}</strong>
                    <p>Cible : {announcement.target_role}</p>
                    <small>{formatSchoolDate(announcement.created_at)}</small>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState label="Aucune annonce publiée" />
            )}
          </article>
        </aside>
      </section>

      <section className="school-dashboard-grid school-dashboard-main">
        <article className="school-panel">
          <div className="school-panel-heading">
            <div>
              <h2>Parents récents</h2>
              <p>Contacts responsables enregistrés récemment.</p>
            </div>
            <Link href="/gestion/parents">Gérer les parents</Link>
          </div>
          {data.latestParents.length > 0 ? (
            <div className="school-class-list">
              {data.latestParents.map((parent) => (
                <div key={parent.id}>
                  <UsersRound size={18} />
                  <div>
                    <strong>{parent.full_name}</strong>
                    <span>{parent.phone ?? parent.email ?? "Contact non renseigné"}</span>
                    <p>
                      {parent.studentCount} enfant
                      {parent.studentCount > 1 ? "s" : ""} associé
                      {parent.studentCount > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState label="Aucun parent enregistré" />
          )}
        </article>

        <article className="school-panel">
          <div className="school-panel-heading">
            <div>
              <h2>Classes suivies</h2>
              <p>Effectifs réels par classe enregistrée.</p>
            </div>
            <Link href="/gestion/classes">Configurer</Link>
          </div>
          {data.classes.length > 0 ? (
            <div className="school-class-list">
              {data.classes.map((item) => {
                const teacher = Array.isArray(item.teachers)
                  ? item.teachers[0]
                  : item.teachers;

                return (
                  <div key={item.id}>
                    <CalendarCheck size={18} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>
                        {item.level} · {item.academic_year}
                      </span>
                      <p>
                        {item.studentCount} élève
                        {item.studentCount > 1 ? "s" : ""}
                      </p>
                      <small>
                        {teacher?.full_name
                          ? `Professeur principal : ${teacher.full_name}`
                          : "Professeur principal non renseigné"}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState label="Aucune classe enregistrée" />
          )}
        </article>
      </section>
    </div>
  );
}
