import { Edit3, Filter, Landmark, Plus, Search, UsersRound } from "lucide-react";
import { createClassAction, updateClassAction } from "@/lib/school/actions";
import {
  formatSchoolDate,
  type ClassRecord,
  type ClassesPageData,
  type ClassesPageFilters,
  type TeacherRecord,
} from "@/lib/school/data";
import type { UserProfile } from "@/lib/school/types";

type ClassesManagementProps = {
  profile: UserProfile;
  data: ClassesPageData;
  filters: ClassesPageFilters;
  returnTo: string;
};

function canManage(profile: UserProfile) {
  return (
    profile.role === "super_admin" ||
    profile.role === "admin" ||
    profile.role === "direction"
  );
}

function teacherName(
  teacher:
    | Pick<TeacherRecord, "id" | "full_name" | "email">
    | Pick<TeacherRecord, "id" | "full_name" | "email">[]
    | null
    | undefined,
) {
  const item = Array.isArray(teacher) ? teacher[0] : teacher;
  return item?.full_name ?? "Non renseigné";
}

function SelectTeacher({
  teachers,
  defaultValue,
}: {
  teachers: TeacherRecord[];
  defaultValue?: string | null;
}) {
  return (
    <select className="school-control" name="main_teacher_id" defaultValue={defaultValue ?? ""}>
      <option value="">Aucun professeur principal</option>
      {teachers.map((teacher) => (
        <option key={teacher.id} value={teacher.id}>
          {teacher.full_name}
        </option>
      ))}
    </select>
  );
}

function ClassFields({
  item,
  teachers,
}: {
  item?: ClassRecord;
  teachers: TeacherRecord[];
}) {
  return (
    <div className="school-form-grid">
      <label className="school-field">
        Nom de la classe
        <input
          className="school-control"
          name="name"
          required
          defaultValue={item?.name ?? ""}
          placeholder="Ex. 6e A"
        />
      </label>
      <label className="school-field">
        Niveau
        <input
          className="school-control"
          name="level"
          required
          defaultValue={item?.level ?? ""}
          placeholder="Ex. Collège"
        />
      </label>
      <label className="school-field">
        Année scolaire
        <input
          className="school-control"
          name="academic_year"
          required
          defaultValue={item?.academic_year ?? ""}
          placeholder="Ex. 2026-2027"
        />
      </label>
      <label className="school-field">
        Professeur principal
        <SelectTeacher teachers={teachers} defaultValue={item?.main_teacher_id} />
      </label>
    </div>
  );
}

export function ClassesManagement({
  profile,
  data,
  filters,
  returnTo,
}: ClassesManagementProps) {
  const manager = canManage(profile);

  return (
    <div className="school-dashboard">
      <section className="school-admin-hero">
        <div>
          <span className="school-admin-eyebrow">Organisation scolaire</span>
          <h1>Classes</h1>
          <p>
            Consultez les classes enregistrées, leurs effectifs réels et leur
            professeur principal. Les créations et modifications sont réservées
            à l’administration et à la direction.
          </p>
          <div className="school-admin-meta">
            <span>{data.total} classe{data.total > 1 ? "s" : ""}</span>
            <span>{manager ? "Modification autorisée" : "Lecture seule"}</span>
          </div>
        </div>
        {manager ? (
          <a className="school-header-action" href="#nouvelle-classe">
            <Plus size={18} />
            Nouvelle classe
          </a>
        ) : null}
      </section>

      <section className="school-panel">
        <form className="school-admin-filters" action="/gestion/classes">
          <label>
            <span>Recherche</span>
            <div className="school-control-icon">
              <Search size={17} />
              <input
                className="school-control"
                name="q"
                defaultValue={filters.q ?? ""}
                placeholder="Nom, niveau ou année scolaire"
              />
            </div>
          </label>
          <label>
            <span>Année scolaire</span>
            <select
              className="school-control"
              name="academicYear"
              defaultValue={filters.academicYear ?? ""}
            >
              <option value="">Toutes les années</option>
              {data.academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
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
              <h2>Liste des classes</h2>
              <p>
                {data.classes.length} résultat
                {data.classes.length > 1 ? "s" : ""} affiché
                {data.classes.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {data.classes.length > 0 ? (
            <div className="school-table-wrap">
              <table className="school-table school-table-large">
                <thead>
                  <tr>
                    <th>Classe</th>
                    <th>Niveau</th>
                    <th>Année scolaire</th>
                    <th>Professeur principal</th>
                    <th>Élèves</th>
                    <th>Matières</th>
                    <th>Créée le</th>
                    {manager ? <th>Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {data.classes.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.name}</strong>
                        <small>{item.id}</small>
                      </td>
                      <td>{item.level}</td>
                      <td>{item.academic_year}</td>
                      <td>{teacherName(item.teachers)}</td>
                      <td>
                        {item.studentCount} élève
                        {item.studentCount > 1 ? "s" : ""}
                      </td>
                      <td>
                        {item.subjectCount} matière
                        {item.subjectCount > 1 ? "s" : ""}
                      </td>
                      <td>{formatSchoolDate(item.created_at)}</td>
                      {manager ? (
                        <td>
                          <details className="school-record-details">
                            <summary>
                              <Edit3 size={15} />
                              Modifier
                            </summary>
                            <form action={updateClassAction} className="school-inline-form">
                              <input type="hidden" name="id" value={item.id} />
                              <input type="hidden" name="returnTo" value={returnTo} />
                              <ClassFields item={item} teachers={data.teachers} />
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
              <Landmark size={28} />
              <strong>Aucune classe trouvée</strong>
              <p>Aucune classe réelle ne correspond aux critères actuels.</p>
            </div>
          )}
        </article>

        {manager ? (
          <aside className="school-dashboard-side" id="nouvelle-classe">
            <article className="school-panel">
              <div className="school-panel-heading">
                <div>
                  <h2>Ajouter une classe</h2>
                  <p>La classe sera créée dans la table Supabase classes.</p>
                </div>
                <UsersRound size={22} />
              </div>
              <form action={createClassAction}>
                <input type="hidden" name="returnTo" value={returnTo} />
                <ClassFields teachers={data.teachers} />
                <button className="school-submit-button" type="submit">
                  Enregistrer la classe
                </button>
              </form>
            </article>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
