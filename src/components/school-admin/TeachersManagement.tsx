import { Edit3, Filter, Plus, Search, UserRound, UsersRound } from "lucide-react";
import { createTeacherAction, updateTeacherAction } from "@/lib/school/actions";
import {
  formatSchoolDate,
  type TeacherRecord,
  type TeachersPageData,
  type TeachersPageFilters,
} from "@/lib/school/data";
import type { ProfileStatus, UserProfile } from "@/lib/school/types";

type TeachersManagementProps = {
  profile: UserProfile;
  data: TeachersPageData;
  filters: TeachersPageFilters;
  returnTo: string;
};

const statusOptions: { value: ProfileStatus; label: string }[] = [
  { value: "active", label: "Actif" },
  { value: "pending", label: "En attente" },
  { value: "inactive", label: "Inactif" },
  { value: "suspended", label: "Suspendu" },
];

function canManage(profile: UserProfile) {
  return profile.role === "admin" || profile.role === "direction";
}

function statusClass(status: ProfileStatus) {
  if (status === "pending") return "en-attente";
  if (status === "suspended") return "suspendu";
  if (status === "inactive") return "inactif";
  return "actif";
}

function statusLabel(status: ProfileStatus) {
  return statusOptions.find((item) => item.value === status)?.label ?? "Actif";
}

function TeacherFields({ teacher }: { teacher?: TeacherRecord }) {
  return (
    <div className="school-form-grid">
      <label className="school-field school-field-wide">
        Nom complet
        <input
          className="school-control"
          name="full_name"
          required
          defaultValue={teacher?.full_name ?? ""}
          placeholder="Nom et prénom de l’enseignant"
        />
      </label>
      <label className="school-field">
        Spécialité
        <input
          className="school-control"
          name="subject_speciality"
          defaultValue={teacher?.subject_speciality ?? ""}
          placeholder="Ex. Mathématiques"
        />
      </label>
      <label className="school-field">
        Statut
        <select className="school-control" name="status" defaultValue={teacher?.status ?? "active"}>
          {statusOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="school-field">
        Téléphone
        <input
          className="school-control"
          name="phone"
          inputMode="tel"
          defaultValue={teacher?.phone ?? ""}
        />
      </label>
      <label className="school-field">
        E-mail
        <input
          className="school-control"
          name="email"
          type="email"
          defaultValue={teacher?.email ?? ""}
        />
      </label>
      <label className="school-field school-field-wide">
        Photo URL
        <input
          className="school-control"
          name="photo_url"
          defaultValue={teacher?.photo_url ?? ""}
          placeholder="Lien de photo si disponible"
        />
      </label>
    </div>
  );
}

export function TeachersManagement({
  profile,
  data,
  filters,
  returnTo,
}: TeachersManagementProps) {
  const manager = canManage(profile);

  return (
    <div className="school-dashboard">
      <section className="school-admin-hero">
        <div>
          <span className="school-admin-eyebrow">Gestion pédagogique</span>
          <h1>Enseignants</h1>
          <p>
            Consultez et organisez les enseignants enregistrés dans Supabase.
            Les créations et modifications sont réservées à l’administration et
            à la direction.
          </p>
          <div className="school-admin-meta">
            <span>{data.total} enseignant{data.total > 1 ? "s" : ""}</span>
            <span>{manager ? "Modification autorisée" : "Lecture seule"}</span>
          </div>
        </div>
        {manager ? (
          <a className="school-header-action" href="#nouvel-enseignant">
            <Plus size={18} />
            Nouvel enseignant
          </a>
        ) : null}
      </section>

      <section className="school-panel">
        <form className="school-admin-filters" action="/gestion/enseignants">
          <label>
            <span>Recherche</span>
            <div className="school-control-icon">
              <Search size={17} />
              <input
                className="school-control"
                name="q"
                defaultValue={filters.q ?? ""}
                placeholder="Nom, spécialité, téléphone ou e-mail"
              />
            </div>
          </label>
          <label>
            <span>Statut</span>
            <select className="school-control" name="status" defaultValue={filters.status ?? ""}>
              <option value="">Tous les statuts</option>
              {statusOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <button className="school-filter-button" type="submit">
            <Filter size={17} />
            Filtrer
          </button>
        </form>
      </section>

      <section className="school-dashboard-grid school-dashboard-main">
        <article className="school-panel school-panel-large">
          <div className="school-panel-heading">
            <div>
              <h2>Liste des enseignants</h2>
              <p>
                {data.teachers.length} résultat
                {data.teachers.length > 1 ? "s" : ""} affiché
                {data.teachers.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {data.teachers.length > 0 ? (
            <div className="school-table-wrap">
              <table className="school-table school-table-large">
                <thead>
                  <tr>
                    <th>Enseignant</th>
                    <th>Spécialité</th>
                    <th>Contact</th>
                    <th>Matières</th>
                    <th>Classes principales</th>
                    <th>Statut</th>
                    <th>Créé le</th>
                    {manager ? <th>Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {data.teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td>
                        <strong>{teacher.full_name}</strong>
                        <small>{teacher.email ?? "E-mail non renseigné"}</small>
                      </td>
                      <td>{teacher.subject_speciality ?? "Non renseignée"}</td>
                      <td>{teacher.phone ?? teacher.email ?? "Non renseigné"}</td>
                      <td>{teacher.subjectCount}</td>
                      <td>{teacher.mainClassCount}</td>
                      <td>
                        <span className={`school-status ${statusClass(teacher.status)}`}>
                          {statusLabel(teacher.status)}
                        </span>
                      </td>
                      <td>{formatSchoolDate(teacher.created_at)}</td>
                      {manager ? (
                        <td>
                          <details className="school-record-details">
                            <summary>
                              <Edit3 size={15} />
                              Modifier
                            </summary>
                            <form action={updateTeacherAction} className="school-inline-form">
                              <input type="hidden" name="id" value={teacher.id} />
                              <input type="hidden" name="returnTo" value={returnTo} />
                              <TeacherFields teacher={teacher} />
                              <button className="school-submit-small" type="submit">
                                Enregistrer
                              </button>
                            </form>
                          </details>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="school-empty-state">
              <UsersRound size={28} />
              <strong>Aucun enseignant trouvé</strong>
              <p>Aucun enseignant réel ne correspond aux critères actuels.</p>
            </div>
          )}
        </article>

        {manager ? (
          <aside className="school-dashboard-side" id="nouvel-enseignant">
            <article className="school-panel">
              <div className="school-panel-heading">
                <div>
                  <h2>Ajouter un enseignant</h2>
                  <p>La fiche sera créée dans la table Supabase teachers.</p>
                </div>
                <UserRound size={22} />
              </div>
              <form action={createTeacherAction}>
                <input type="hidden" name="returnTo" value={returnTo} />
                <TeacherFields />
                <button className="school-submit-button" type="submit">
                  Enregistrer l’enseignant
                </button>
              </form>
            </article>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
