import Link from "next/link";
import type { SchoolNavItem } from "@/lib/school/permissions";

type ModulePlaceholderProps = {
  module: SchoolNavItem;
};

export function ModulePlaceholder({ module }: ModulePlaceholderProps) {
  const Icon = module.icon;

  return (
    <section className="school-module-placeholder">
      <div>
        <span>{module.phase}</span>
        <h1>{module.label}</h1>
        <p>
          Ce module est prévu dans le plan de gestion scolaire. La sécurité,
          l&apos;authentification, les rôles et le tableau de bord sont déjà posés ;
          les écrans CRUD détaillés seront ajoutés progressivement.
        </p>
      </div>
      <div className="school-module-card">
        <Icon size={34} />
        <h2>Fonctionnalités à venir</h2>
        <ul>
          <li>Recherche et filtres</li>
          <li>Ajout et modification</li>
          <li>Validation serveur</li>
          <li>Permissions par rôle</li>
          <li>Export ou impression quand utile</li>
        </ul>
        <Link href="/gestion">Retour au dashboard</Link>
      </div>
    </section>
  );
}
