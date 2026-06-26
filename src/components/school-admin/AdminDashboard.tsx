import {
  Bell,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { demoDashboardData } from "@/lib/school/demo-data";
import { roleLabels } from "@/lib/school/permissions";
import type { DashboardMetric, UserProfile } from "@/lib/school/types";

type AdminDashboardProps = {
  profile: UserProfile;
};

function MetricIcon({ label }: { label: string }) {
  if (label.includes("Élèves")) return <GraduationCap size={24} />;
  if (label.includes("Enseignants")) return <UsersRound size={24} />;
  if (label.includes("Absences")) return <ClipboardCheck size={24} />;
  if (label.includes("Paiements")) return <CreditCard size={24} />;
  return <Bell size={24} />;
}

function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article className={`school-stat-card ${metric.tone}`}>
      <MetricIcon label={metric.label} />
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <small>{metric.detail}</small>
    </article>
  );
}

function MiniChart({ values, label }: { values: number[]; label: string }) {
  return (
    <div className="school-chart-card">
      <div>
        <h2>{label}</h2>
        <p>Vue de démonstration sur 6 jours</p>
      </div>
      <div className="school-bars" aria-label={label}>
        {values.map((value, index) => (
          <span key={`${label}-${index}`}>
            <i style={{ height: `${value}%` }} />
            <small>{value}%</small>
          </span>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboard({ profile }: AdminDashboardProps) {
  const data = demoDashboardData;

  return (
    <div className="school-dashboard">
      <section className="school-page-header">
        <div>
          <span>Tableau de bord</span>
          <h1>Bonjour, {profile.full_name}</h1>
          <p>
            Vue de synthèse pour le rôle {roleLabels[profile.role]}. Les chiffres
            affichés sont des données de démonstration tant que Supabase n&apos;est pas
            relié aux modules métier.
          </p>
        </div>
        <Link className="school-header-action" href="/gestion/annonces">
          Créer une annonce
        </Link>
      </section>

      <section className="school-stat-grid" aria-label="Statistiques clés">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="school-dashboard-grid">
        <MiniChart values={data.attendanceTrend} label="Présences" />
        <MiniChart values={data.paymentTrend} label="Paiements" />
      </section>

      <section className="school-dashboard-grid wide">
        <article className="school-panel">
          <div className="school-panel-heading">
            <h2>Dernières annonces</h2>
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

        <article className="school-panel">
          <div className="school-panel-heading">
            <h2>Activité récente</h2>
            <Link href="/gestion/eleves">Élèves</Link>
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
      </section>

      <section className="school-dashboard-grid wide">
        <article className="school-panel">
          <div className="school-panel-heading">
            <h2>Dernières inscriptions</h2>
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

        <article className="school-panel">
          <div className="school-panel-heading">
            <h2>Classes suivies</h2>
            <Link href="/gestion/classes">Configurer</Link>
          </div>
          <div className="school-class-list">
            {data.classes.map((item) => (
              <div key={item.id}>
                <strong>{item.name}</strong>
                <span>{item.level}</span>
                <p>{item.students} élèves</p>
                <small>{item.mainTeacher}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
