import { BookOpen, Edit3, Filter, LibraryBig, Plus, Search } from "lucide-react";
import { createSubjectAction, updateSubjectAction } from "@/lib/school/actions";
import {
  formatSchoolDate,
  type ClassRecord,
  type SubjectRecord,
  type SubjectsPageData,
  type SubjectsPageFilters,
  type TeacherRecord,
} from "@/lib/school/data";
import type { UserProfile } from "@/lib/school/types";

type SubjectsManagementProps = {
  profile: UserProfile;
  data: SubjectsPageData;
  filters: SubjectsPageFilters;
  returnTo: string;
};

function canManage(profile: UserProfile) {
  return profile.role === "admin" || profile.role === "direction";
}

function subjectCoefficient(value: number | string) {
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed.toLocaleString("fr-FR") : "1";
}

function subjectCoefficientInput(value: number | string | undefined) {
  if (value === undefined) return "1";
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? String(parsed) : "1";
}

function SelectClass({
  classes,
  defaultValue,
  name = "class_id",
  includeAll = false,
}: {
  classes: ClassRecord[];
  defaultValue?: string | null;
  name?: string;
  includeAll?: boolean;
}) {
  return (
    <select className="school-control" name={name} defaultValue={defaultValue ?? ""} required={!includeAll}>
      {includeAll ? <option value="">Toutes les classes</option> : <option value="">Choisir une classe</option>}
      {classes.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name} · {item.academic_year}
        </option>
      ))}
    </select>
  );
}

function SelectTeacher({
  teachers,
  defaultValue,
  name = "teacher_id",
  includeAll = false,
}: {
  teachers: TeacherRecord[];
  defaultValue?: string | null;
  name?: string;
  includeAll?: boolean;
}) {
  return (
    <select className="school-control" name={name} defaultValue={defaultValue ?? ""}>
      {includeAll ? (
        <option value="">Tous les enseignants</option>
      ) : (
        <option value="">Enseignant non affecté</option>
      )}
      {teachers.map((teacher) => (
        <option key={teacher.id} value={teacher.id}>
          {teacher.full_name}
        </option>
      ))}
    </select>
  );
}

function SubjectFields({
  subject,
  classes,
  teachers,
}: {
  subject?: SubjectRecord;
  classes: ClassRecord[];
  teachers: TeacherRecord[];
}) {
  return (
    <div className="school-form-grid">
      <label className="school-field">
        Nom de la matière
        <input
          className="school-control"
          name="name"
          required
          defaultValue={subject?.name ?? ""}
          placeholder="Ex. Français"
        />
      </label>
      <label className="school-field">
        Coefficient
        <input
          className="school-control"
          name="coefficient"
          type="number"
          min="0.1"
          step="0.1"
          required
          defaultValue={subjectCoefficientInput(subject?.coefficient)}
        />
      </label>
      <label className="school-field">
        Classe
        <SelectClass classes={classes} defaultValue={subject?.class_id} />
      </label>
      <label className="school-field">
        Enseignant
        <SelectTeacher teachers={teachers} defaultValue={subject?.teacher_id} />
      </label>
    </div>
  );
}

export function SubjectsManagement({
  profile,
  data,
  filters,
  returnTo,
}: SubjectsManagementProps) {
  const manager = canManage(profile);

  return (
    <div className="school-dashboard">
      <section className="school-admin-hero">
        <div>
          <span className="school-admin-eyebrow">Organisation pédagogique</span>
          <h1>Matières</h1>
          <p>
            Consultez les matières enregistrées, leurs coefficients et leurs
            affectations par classe. Les créations et modifications sont
            réservées à l’administration et à la direction.
          </p>
          <div className="school-admin-meta">
            <span>{data.total} matière{data.total > 1 ? "s" : ""}</span>
            <span>{manager ? "Modification autorisée" : "Lecture seule"}</span>
          </div>
        </div>
        {manager ? (
          <a className="school-header-action" href="#nouvelle-matiere">
            <Plus size={18} />
            Nouvelle matière
          </a>
        ) : null}
      </section>

      <section className="school-panel">
        <form className="school-admin-filters" action="/gestion/matieres">
          <label>
            <span>Recherche</span>
            <div className="school-control-icon">
              <Search size={17} />
              <input
                className="school-control"
                name="q"
                defaultValue={filters.q ?? ""}
                placeholder="Nom de matière"
              />
            </div>
          </label>
          <label>
            <span>Classe</span>
            <SelectClass
              classes={data.classes}
              defaultValue={filters.classId}
              name="classId"
              includeAll
            />
          </label>
          <label>
            <span>Enseignant</span>
            <SelectTeacher
              teachers={data.teachers}
              defaultValue={filters.teacherId}
              name="teacherId"
              includeAll
            />
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
              <h2>Liste des matières</h2>
              <p>
                {data.subjects.length} résultat
                {data.subjects.length > 1 ? "s" : ""} affiché
                {data.subjects.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {data.subjects.length > 0 ? (
            <div className="school-table-wrap">
              <table className="school-table school-table-large">
                <thead>
                  <tr>
                    <th>Matière</th>
                    <th>Coefficient</th>
                    <th>Classe</th>
                    <th>Enseignant</th>
                    <th>Créée le</th>
                    {manager ? <th>Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {data.subjects.map((subject) => (
                    <tr key={subject.id}>
                      <td>
                        <strong>{subject.name}</strong>
                        <small>{subject.id}</small>
                      </td>
                      <td>{subjectCoefficient(subject.coefficient)}</td>
                      <td>
                        {subject.classes
                          ? `${subject.classes.name} · ${subject.classes.academic_year}`
                          : "Classe non renseignée"}
                      </td>
                      <td>{subject.teachers?.full_name ?? "Non affecté"}</td>
                      <td>{formatSchoolDate(subject.created_at)}</td>
                      {manager ? (
                        <td>
                          <details className="school-record-details">
                            <summary>
                              <Edit3 size={15} />
                              Modifier
                            </summary>
                            <form action={updateSubjectAction} className="school-inline-form">
                              <input type="hidden" name="id" value={subject.id} />
                              <input type="hidden" name="returnTo" value={returnTo} />
                              <SubjectFields
                                subject={subject}
                                classes={data.classes}
                                teachers={data.teachers}
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
              <LibraryBig size={28} />
              <strong>Aucune matière trouvée</strong>
              <p>Aucune matière réelle ne correspond aux critères actuels.</p>
            </div>
          )}
        </article>

        {manager ? (
          <aside className="school-dashboard-side" id="nouvelle-matiere">
            <article className="school-panel">
              <div className="school-panel-heading">
                <div>
                  <h2>Ajouter une matière</h2>
                  <p>La matière sera créée dans la table Supabase subjects.</p>
                </div>
                <BookOpen size={22} />
              </div>
              <form action={createSubjectAction}>
                <input type="hidden" name="returnTo" value={returnTo} />
                <SubjectFields classes={data.classes} teachers={data.teachers} />
                <button className="school-submit-button" type="submit">
                  Enregistrer la matière
                </button>
              </form>
            </article>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
