import {
  ArrowRight,
  Bell,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  Megaphone,
  ReceiptText,
  Settings,
  UserPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { demoDashboardData } from "@/lib/school/demo-data";
import { roleLabels } from "@/lib/school/permissions";
import type { DashboardMetric, SchoolRole, UserProfile } from "@/lib/school/types";

type AdminDashboardProps = {
  profile: UserProfile;
};

type QuickAction = {
  label: string;
  detail: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  roles: SchoolRole[];
};

const chartLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const quickActions: QuickAction[] = [
  {
    label: "Ajouter un élève",
    detail: "Créer ou compléter un dossier scolaire.",
    href: "/gestion/eleves",
    icon: UserPlus,
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
    label: "Publier une annonce",
    detail: "Informer parents, élèves ou enseignants.",
    href: "/gestion/annonces",
    icon: Megaphone,
    roles: ["admin", "direction", "teacher"],
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
  if (label.includes("Enseignants")) return <UsersRound size={22} />;
  if (label.includes("Classes")) return <FileText size={22} />;
  if (label.includes("Absences")) return <ClipboardCheck size={22} />;
  if (label.includes("Paiements")) return <CreditCard size={22} />;
  return <Bell size={22} />;
}

function MetricCard({ metric }: { metric: DashboardMetric }) {
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

function MiniChart({ values, label }: { values: number[]; label: string }) {
  return (
    <article className="school-chart-card">
      <div className="school-panel-heading">
        <div>
          <h2>{label}</h2>
          <p>Suivi de démonstration sur 6 jours</p>
        </div>
        <span className="school-chart-badge">Semaine</span>
      </div>
      <div className="school-bars" aria-label={label}>
        {values.map((value, index) => (
          <span key={`${label}-${chartLabels[index]}`}>
            <i style={{ height: `${value}%` }} />
            <small>{chartLabels[index]}</small>
          </span>
        ))}
      </div>
    </article>
  );
}

export function AdminDashboard({ profile }: AdminDashboardProps) {
  const data = demoDashboardData;
  const visibleQuickActions = quickActions.filter((action) =>
    action.roles.includes(profile.role),
  );

  return (
    <div className="school-dashboard">
      <section className="school-admin-hero">
        <div>
          <span className="school-admin-eyebrow">Tableau de bord</span>
          <h1>Bonjour, {profile.full_name}</h1>
          <p>
            Vue complète de la gestion scolaire du Lycée Privé International
            Berthe & Jean. Les chiffres affichés servent de démonstration en
            attendant la connexion des modules métier aux données Supabase.
          </p>
          <div className="school-admin-meta" aria-label="Contexte du compte">
            <span>{roleLabels[profile.role]}</span>
            <span>Session sécurisée</span>
            <span>Essassa, Gabon</span>
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

      <section className="school-dashboard-grid school-dashboard-charts">
        <MiniChart values={data.attendanceTrend} label="Présences" />
        <MiniChart values={data.paymentTrend} label="Paiements" />
      </section>

      <section className="school-dashboard-grid school-dashboard-main">
        <article className="school-panel school-panel-large">
          <div className="school-panel-heading">
            <div>
              <h2>Dernières inscriptions</h2>
              <p>Dossiers récents à suivre depuis l’administration.</p>
            </div>
            <Link href="/gestion/eleves">Gérer</Link>
          </div>
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
                {data.students.map((student) => {
                  const statusClass = student.status.replace(/\s+/g, "-");

                  return (
                    <tr key={student.id}>
                      <td>{student.matricule}</td>
                      <td>{student.fullName}</td>
                      <td>{student.className}</td>
                      <td>{student.parent}</td>
                      <td>
                        <span className={`school-status ${statusClass}`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="school-dashboard-side">
          <article className="school-panel">
            <div className="school-panel-heading">
              <div>
                <h2>Actions rapides</h2>
                <p>Accès direct aux opérations courantes.</p>
              </div>
            </div>
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
          </article>

          <article className="school-panel">
            <div className="school-panel-heading">
              <div>
                <h2>Dernières annonces</h2>
                <p>Messages visibles selon les rôles.</p>
              </div>
              <Link href="/gestion/annonces">Voir tout</Link>
            </div>
            <div className="school-announcement-list">
              {data.announcements.map((announcement) => (
                <div key={announcement.id}>
                  <span className={`school-priority ${announcement.priority}`}>
                    {announcement.priority}
                  </span>
                  <strong>{announcement.title}</strong>
                  <p>{announcement.audience}</p>
                  <small>{announcement.date}</small>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className="school-dashboard-grid school-dashboard-main">
        <article className="school-panel">
          <div className="school-panel-heading">
            <div>
              <h2>Activité récente</h2>
              <p>Événements administratifs de la journée.</p>
            </div>
          </div>
          <div className="school-activity-list">
            {data.activities.map((activity) => (
              <div key={activity.id}>
                <span>{activity.date}</span>
                <div>
                  <strong>{activity.label}</strong>
                  <p>{activity.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="school-panel">
          <div className="school-panel-heading">
            <div>
              <h2>Classes suivies</h2>
              <p>Vue rapide des effectifs par niveau.</p>
            </div>
            <Link href="/gestion/classes">Configurer</Link>
          </div>
          <div className="school-class-list">
            {data.classes.map((item) => (
              <div key={item.id}>
                <CalendarCheck size={18} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.level}</span>
                  <p>{item.students} élèves</p>
                  <small>{item.mainTeacher}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
