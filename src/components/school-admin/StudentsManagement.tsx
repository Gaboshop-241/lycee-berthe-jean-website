import { Edit3, Filter, GraduationCap, Plus, Search, UserRound } from "lucide-react";
import { createStudentAction, updateStudentAction } from "@/lib/school/actions";
import {
  formatSchoolDate,
  type ClassRecord,
  type ParentRecord,
  type StudentRecord,
  type StudentsPageData,
  type StudentsPageFilters,
  type StudentStatus,
} from "@/lib/school/data";
import type { UserProfile } from "@/lib/school/types";

type StudentsManagementProps = {
  profile: UserProfile;
  data: StudentsPageData;
  filters: StudentsPageFilters;
  returnTo: string;
};

const statusOptions: { value: StudentStatus; label: string }[] = [
  { value: "active", label: "Actif" },
  { value: "pending", label: "En attente" },
  { value: "inactive", label: "Inactif" },
  { value: "suspended", label: "Suspendu" },
];

function canManage(profile: UserProfile) {
  return (
    profile.role === "super_admin" ||
    profile.role === "admin" ||
    profile.role === "direction"
  );
}

function statusClass(status: StudentStatus) {
  if (status === "pending") return "en-attente";
  if (status === "suspended") return "suspendu";
  if (status === "inactive") return "inactif";
  return "actif";
}

function statusLabel(status: StudentStatus) {
  return statusOptions.find((item) => item.value === status)?.label ?? "Actif";
}

function SelectClass({
  classes,
  defaultValue,
  name = "class_id",
}: {
  classes: ClassRecord[];
  defaultValue?: string | null;
  name?: string;
}) {
  return (
    <select className="school-control" name={name} defaultValue={defaultValue ?? ""}>
      <option value="">Non affecté</option>
      {classes.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name} · {item.academic_year}
        </option>
      ))}
    </select>
  );
}

function SelectParent({
  parents,
  defaultValue,
}: {
  parents: ParentRecord[];
  defaultValue?: string | null;
}) {
  return (
    <select className="school-control" name="parent_id" defaultValue={defaultValue ?? ""}>
      <option value="">Parent non renseigné</option>
      {parents.map((parent) => (
        <option key={parent.id} value={parent.id}>
          {parent.full_name}
        </option>
      ))}
    </select>
  );
}

function StudentFields({
  student,
  classes,
  parents,
}: {
  student?: StudentRecord;
  classes: ClassRecord[];
  parents: ParentRecord[];
}) {
  return (
    <div className="school-form-grid">
      <label className="school-field">
        Matricule
        <input
          className="school-control"
          name="matricule"
          required
          defaultValue={student?.matricule ?? ""}
          placeholder="Ex. BJ-2026-001"
        />
      </label>
      <label className="school-field">
        Prénom
        <input
          className="school-control"
          name="first_name"
          required
          defaultValue={student?.first_name ?? ""}
        />
      </label>
      <label className="school-field">
        Nom
        <input
          className="school-control"
          name="last_name"
          required
          defaultValue={student?.last_name ?? ""}
        />
      </label>
      <label className="school-field">
        Statut
        <select className="school-control" name="status" defaultValue={student?.status ?? "active"}>
          {statusOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="school-field">
        Classe
        <SelectClass classes={classes} defaultValue={student?.class_id} />
      </label>
      <label className="school-field">
        Parent responsable
        <SelectParent parents={parents} defaultValue={student?.parent_id} />
      </label>
      <label className="school-field">
        Genre
        <input
          className="school-control"
          name="gender"
          defaultValue={student?.gender ?? ""}
          placeholder="Féminin, masculin..."
        />
      </label>
      <label className="school-field">
        Date de naissance
        <input
          className="school-control"
          name="date_of_birth"
          type="date"
          defaultValue={student?.date_of_birth ?? ""}
        />
      </label>
      <label className="school-field">
        Lieu de naissance
        <input
          className="school-control"
          name="place_of_birth"
          defaultValue={student?.place_of_birth ?? ""}
        />
      </label>
      <label className="school-field">
        Téléphone
        <input
          className="school-control"
          name="phone"
          defaultValue={student?.phone ?? ""}
          inputMode="tel"
        />
      </label>
      <label className="school-field">
        E-mail
        <input
          className="school-control"
          name="email"
          type="email"
          defaultValue={student?.email ?? ""}
        />
      </label>
      <label className="school-field school-field-wide">
        Adresse
        <input
          className="school-control"
          name="address"
          defaultValue={student?.address ?? ""}
        />
      </label>
    </div>
  );
}

export function StudentsManagement({
  profile,
  data,
  filters,
  returnTo,
}: StudentsManagementProps) {
  const manager = canManage(profile);

  return (
    <div className="school-dashboard">
      <section className="school-admin-hero">
        <div>
          <span className="school-admin-eyebrow">Gestion des élèves</span>
          <h1>Élèves</h1>
          <p>
            Consultez les dossiers réellement enregistrés dans Supabase. Les
            ajouts et modifications sont réservés à l’administration et à la
            direction.
          </p>
          <div className="school-admin-meta">
            <span>{data.total} dossier{data.total > 1 ? "s" : ""}</span>
            <span>{manager ? "Modification autorisée" : "Lecture seule"}</span>
          </div>
        </div>
        {manager ? (
          <a className="school-header-action" href="#nouvel-eleve">
            <Plus size={18} />
            Nouvel élève
          </a>
        ) : null}
      </section>

      <section className="school-panel">
        <form className="school-admin-filters" action="/gestion/eleves">
          <label>
            <span>Recherche</span>
            <div className="school-control-icon">
              <Search size={17} />
              <input
                className="school-control"
                name="q"
                defaultValue={filters.q ?? ""}
                placeholder="Nom, prénom, matricule ou e-mail"
              />
            </div>
          </label>
          <label>
            <span>Classe</span>
            <SelectClass classes={data.classes} defaultValue={filters.classId} name="classId" />
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
              <h2>Liste des élèves</h2>
              <p>{data.students.length} résultat{data.students.length > 1 ? "s" : ""} affiché{data.students.length > 1 ? "s" : ""}</p>
            </div>
          </div>
          {data.students.length > 0 ? (
            <div className="school-table-wrap">
              <table className="school-table school-table-large">
                <thead>
                  <tr>
                    <th>Matricule</th>
                    <th>Élève</th>
                    <th>Classe</th>
                    <th>Parent</th>
                    <th>Contact</th>
                    <th>Statut</th>
                    <th>Créé le</th>
                    {manager ? <th>Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {data.students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.matricule}</td>
                      <td>
                        <strong>
                          {student.first_name} {student.last_name}
                        </strong>
                        <small>{student.place_of_birth ?? "Lieu non renseigné"}</small>
                      </td>
                      <td>{student.classes?.name ?? "Non affecté"}</td>
                      <td>{student.parents?.full_name ?? "Non renseigné"}</td>
                      <td>{student.phone ?? student.email ?? "Non renseigné"}</td>
                      <td>
                        <span className={`school-status ${statusClass(student.status)}`}>
                          {statusLabel(student.status)}
                        </span>
                      </td>
                      <td>{formatSchoolDate(student.created_at)}</td>
                      {manager ? (
                        <td>
                          <details className="school-record-details">
                            <summary>
                              <Edit3 size={15} />
                              Modifier
                            </summary>
                            <form action={updateStudentAction} className="school-inline-form">
                              <input type="hidden" name="id" value={student.id} />
                              <input type="hidden" name="returnTo" value={returnTo} />
                              <StudentFields
                                student={student}
                                classes={data.classes}
                                parents={data.parents}
                              />
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
              <GraduationCap size={28} />
              <strong>Aucun élève trouvé</strong>
              <p>
                Aucun dossier réel ne correspond aux critères. Ajoutez un élève
                ou modifiez la recherche.
              </p>
            </div>
          )}
        </article>

        {manager ? (
          <aside className="school-dashboard-side" id="nouvel-eleve">
            <article className="school-panel">
              <div className="school-panel-heading">
                <div>
                  <h2>Ajouter un élève</h2>
                  <p>Le dossier sera créé dans la table Supabase `students`.</p>
                </div>
                <UserRound size={22} />
              </div>
              <form action={createStudentAction}>
                <input type="hidden" name="returnTo" value={returnTo} />
                <StudentFields classes={data.classes} parents={data.parents} />
                <button className="school-submit-button" type="submit">
                  Enregistrer l’élève
                </button>
              </form>
            </article>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
