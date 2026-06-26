import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  Landmark,
  LibraryBig,
  NotebookPen,
  ReceiptText,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SchoolRole } from "./types";

export type SchoolModuleKey =
  | "dashboard"
  | "students"
  | "parents"
  | "teachers"
  | "classes"
  | "subjects"
  | "grades"
  | "attendance"
  | "schedule"
  | "homework"
  | "fees"
  | "payments"
  | "documents"
  | "announcements"
  | "settings";

export type SchoolNavItem = {
  key: SchoolModuleKey;
  label: string;
  href: string;
  icon: LucideIcon;
  roles: SchoolRole[];
  phase: string;
};

export const roleLabels: Record<SchoolRole, string> = {
  admin: "Admin",
  direction: "Direction",
  teacher: "Enseignant",
  student: "Élève",
  parent: "Parent",
  accountant: "Comptabilité",
};

export const schoolNavItems: SchoolNavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/gestion",
    icon: Home,
    roles: ["admin", "direction", "teacher", "student", "parent", "accountant"],
    phase: "Phase 1",
  },
  {
    key: "students",
    label: "Élèves",
    href: "/gestion/eleves",
    icon: GraduationCap,
    roles: ["admin", "direction", "teacher", "parent"],
    phase: "Phase 2",
  },
  {
    key: "parents",
    label: "Parents",
    href: "/gestion/parents",
    icon: UsersRound,
    roles: ["admin", "direction"],
    phase: "Phase 2",
  },
  {
    key: "teachers",
    label: "Enseignants",
    href: "/gestion/enseignants",
    icon: UserRound,
    roles: ["admin", "direction"],
    phase: "Phase 2",
  },
  {
    key: "classes",
    label: "Classes",
    href: "/gestion/classes",
    icon: Landmark,
    roles: ["admin", "direction", "teacher"],
    phase: "Phase 2",
  },
  {
    key: "subjects",
    label: "Matières",
    href: "/gestion/matieres",
    icon: LibraryBig,
    roles: ["admin", "direction", "teacher"],
    phase: "Phase 2",
  },
  {
    key: "grades",
    label: "Notes",
    href: "/gestion/notes",
    icon: NotebookPen,
    roles: ["admin", "direction", "teacher", "student", "parent"],
    phase: "Phase 3",
  },
  {
    key: "attendance",
    label: "Présences",
    href: "/gestion/presences",
    icon: ClipboardCheck,
    roles: ["admin", "direction", "teacher", "student", "parent"],
    phase: "Phase 3",
  },
  {
    key: "schedule",
    label: "Emploi du temps",
    href: "/gestion/emploi-du-temps",
    icon: CalendarDays,
    roles: ["admin", "direction", "teacher", "student", "parent"],
    phase: "Phase 3",
  },
  {
    key: "homework",
    label: "Devoirs",
    href: "/gestion/devoirs",
    icon: BookOpen,
    roles: ["admin", "direction", "teacher", "student", "parent"],
    phase: "Phase 4",
  },
  {
    key: "fees",
    label: "Frais scolaires",
    href: "/gestion/frais-scolaires",
    icon: CreditCard,
    roles: ["admin", "direction", "accountant", "parent"],
    phase: "Phase 5",
  },
  {
    key: "payments",
    label: "Paiements",
    href: "/gestion/paiements",
    icon: ReceiptText,
    roles: ["admin", "direction", "accountant", "parent"],
    phase: "Phase 5",
  },
  {
    key: "documents",
    label: "Documents",
    href: "/gestion/documents",
    icon: FileText,
    roles: ["admin", "direction", "teacher", "student", "parent", "accountant"],
    phase: "Phase 4",
  },
  {
    key: "announcements",
    label: "Annonces",
    href: "/gestion/annonces",
    icon: Bell,
    roles: ["admin", "direction", "teacher", "student", "parent", "accountant"],
    phase: "Phase 4",
  },
  {
    key: "settings",
    label: "Paramètres",
    href: "/gestion/parametres",
    icon: Settings,
    roles: ["admin"],
    phase: "Phase 6",
  },
];

export const moduleAliases: Record<string, SchoolModuleKey> = {
  eleves: "students",
  parents: "parents",
  enseignants: "teachers",
  classes: "classes",
  matieres: "subjects",
  notes: "grades",
  presences: "attendance",
  "emploi-du-temps": "schedule",
  devoirs: "homework",
  "frais-scolaires": "fees",
  paiements: "payments",
  documents: "documents",
  annonces: "announcements",
  parametres: "settings",
};

export function getNavItemsForRole(role: SchoolRole) {
  return schoolNavItems.filter((item) => item.roles.includes(role));
}

export function canAccessModule(role: SchoolRole, moduleKey: SchoolModuleKey) {
  return schoolNavItems.some(
    (item) => item.key === moduleKey && item.roles.includes(role),
  );
}

export function getDefaultPathForRole(role: SchoolRole) {
  void role;
  return "/gestion";
}

export function getModuleByKey(moduleKey: SchoolModuleKey) {
  return schoolNavItems.find((item) => item.key === moduleKey);
}

export function getDashboardIcon() {
  return BarChart3;
}
