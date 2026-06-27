import type { SchoolRole, UserProfile } from "./types";

const roleWelcome: Record<SchoolRole, string> = {
  super_admin: "Bienvenue dans l'espace Super Admin",
  admin: "Bienvenue dans l'espace Admin",
  direction: "Bienvenue dans l'espace Direction",
  secretary: "Bienvenue dans l'espace Secrétariat",
  teacher: "Bienvenue dans votre espace Enseignant",
  student: "Bienvenue dans votre espace Élève",
  parent: "Bienvenue dans votre espace Parent",
  accountant: "Bienvenue dans l'espace Comptabilité",
  staff: "Bienvenue dans l'espace du personnel",
};

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getManagementWelcome(profile: Pick<UserProfile, "full_name" | "role">) {
  const name = normalizeName(profile.full_name);

  if (name.includes("obolo") || name.includes("proviseur")) {
    return "Bienvenue, Monsieur le Proviseur";
  }

  if (name.includes("mavoungou") || name.includes("censeur")) {
    return "Bienvenue, Monsieur le Censeur";
  }

  if (name.includes("mborantsuo") || name.includes("fondatrice")) {
    return "Bienvenue, Madame la Fondatrice";
  }

  return roleWelcome[profile.role];
}
