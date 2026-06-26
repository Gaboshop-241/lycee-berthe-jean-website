import { Edit3, Filter, Plus, Search, UserRound, UsersRound } from "lucide-react";
import { createParentAction, updateParentAction } from "@/lib/school/actions";
import {
  formatSchoolDate,
  type ParentRecord,
  type ParentsPageData,
  type ParentsPageFilters,
} from "@/lib/school/data";
import type { UserProfile } from "@/lib/school/types";

type ParentsManagementProps = {
  profile: UserProfile;
  data: ParentsPageData;
  filters: ParentsPageFilters;
  returnTo: string;
};

function canManage(profile: UserProfile) {
  return profile.role === "admin" || profile.role === "direction";
}

function ParentFields({ parent }: { parent?: ParentRecord }) {
  return (
    <div className="school-form-grid">
      <label className="school-field school-field-wide">
        Nom complet
        <input
          className="school-control"
          name="full_name"
          required
          defaultValue={parent?.full_name ?? ""}
          placeholder="Nom et prénom du parent ou tuteur"
        />
      </label>
      <label className="school-field">
        Téléphone
        <input
          className="school-control"
          name="phone"
          defaultValue={parent?.phone ?? ""}
          inputMode="tel"
        />
      </label>
      <label className="school-field">
        E-mail
        <input
          className="school-control"
          name="email"
          type="email"
          defaultValue={parent?.email ?? ""}
        />
      </label>
      <label className="school-field">
        Profession
        <input
          className="school-control"
          name="profession"
          defaultValue={parent?.profession ?? ""}
        />
      </label>
      <label className="school-field school-field-wide">
        Adresse
        <input
          className="school-control"
          name="address"
          defaultValue={parent?.address ?? ""}
        />
      </label>
    </div>
  );
}

export function ParentsManagement({
  profile,
  data,
  filters,
  returnTo,
}: ParentsManagementProps) {
  const manager = canManage(profile);

  return (
    <div className="school-dashboard">
      <section className="school-admin-hero">
        <div>
          <span className="school-admin-eyebrow">Gestion des parents</span>
          <h1>Parents</h1>
          <p>
            Gérez les contacts responsables réellement enregistrés dans
            Supabase. Ces informations servent à relier les élèves à leurs
            parents ou tuteurs.
          </p>
          <div className="school-admin-meta">
            <span>{data.total} contact{data.total > 1 ? "s" : ""}</span>
            <span>{manager ? "Modification autorisée" : "Lecture seule"}</span>
          </div>
        </div>
        {manager ? (
          <a className="school-header-action" href="#nouveau-parent">
            <Plus size={18} />
            Nouveau parent
          </a>
        ) : null}
      </section>

      <section className="school-panel">
        <form className="school-admin-filters" action="/gestion/parents">
          <label>
            <span>Recherche</span>
            <div className="school-control-icon">
              <Search size={17} />
              <input
                className="school-control"
                name="q"
                defaultValue={filters.q ?? ""}
                placeholder="Nom, téléphone ou e-mail"
              />
            </div>
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
              <h2>Liste des parents</h2>
              <p>
                {data.parents.length} résultat
                {data.parents.length > 1 ? "s" : ""} affiché
                {data.parents.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {data.parents.length > 0 ? (
            <div className="school-table-wrap">
              <table className="school-table school-table-large">
                <thead>
                  <tr>
                    <th>Parent</th>
                    <th>Contact</th>
                    <th>Profession</th>
                    <th>Adresse</th>
                    <th>Enfants</th>
                    <th>Créé le</th>
                    {manager ? <th>Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {data.parents.map((parent) => (
                    <tr key={parent.id}>
                      <td>
                        <strong>{parent.full_name}</strong>
                        <small>{parent.email ?? "E-mail non renseigné"}</small>
                      </td>
                      <td>{parent.phone ?? parent.email ?? "Non renseigné"}</td>
                      <td>{parent.profession ?? "Non renseignée"}</td>
                      <td>{parent.address ?? "Non renseignée"}</td>
                      <td>
                        {parent.studentCount} enfant
                        {parent.studentCount > 1 ? "s" : ""}
                      </td>
                      <td>{formatSchoolDate(parent.created_at)}</td>
                      {manager ? (
                        <td>
                          <details className="school-record-details">
                            <summary>
                              <Edit3 size={15} />
                              Modifier
                            </summary>
                            <form action={updateParentAction} className="school-inline-form">
                              <input type="hidden" name="id" value={parent.id} />
                              <input type="hidden" name="returnTo" value={returnTo} />
                              <ParentFields parent={parent} />
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
              <strong>Aucun parent trouvé</strong>
              <p>
                Aucun contact réel ne correspond aux critères. Ajoutez un parent
                ou modifiez la recherche.
              </p>
            </div>
          )}
        </article>

        {manager ? (
          <aside className="school-dashboard-side" id="nouveau-parent">
            <article className="school-panel">
              <div className="school-panel-heading">
                <div>
                  <h2>Ajouter un parent</h2>
                  <p>Le contact sera créé dans la table Supabase `parents`.</p>
                </div>
                <UserRound size={22} />
              </div>
              <form action={createParentAction}>
                <input type="hidden" name="returnTo" value={returnTo} />
                <ParentFields />
                <button className="school-submit-button" type="submit">
                  Enregistrer le parent
                </button>
              </form>
            </article>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
