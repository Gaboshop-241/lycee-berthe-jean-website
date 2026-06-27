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
  | "reports"
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
  super_admin: "Super Admin",
  admin: "Admin",
  direction: "Direction",
  secretary: "Secrétariat",
  teacher: "Enseignant",
  student: "Élève",
  parent: "Parent",
  accountant: "Comptabilité",
  staff: "Personnel",
};

export const schoolNavItems: SchoolNavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/gestion",
    icon: Home,
    roles: [
      "super_admin",
      "admin",
      "direction",
      "secretary",
      "teacher",
      "student",
      "parent",
      "accountant",
      "staff",
    ],
    phase: "Phase 1",
  },
  {
    key: "students",
    label: "Élèves",
    href: "/gestion/eleves",
    icon: GraduationCap,
    roles: ["super_admin", "admin", "direction", "secretary", "teacher"],
    phase: "Phase 2",
  },
  {
    key: "parents",
    label: "Parents",
    href: "/gestion/parents",
    icon: UsersRound,
    roles: ["super_admin", "admin", "direction", "secretary"],
    phase: "Phase 2",
  },
  {
    key: "teachers",
    label: "Enseignants",
    href: "/gestion/enseignants",
    icon: UserRound,
    roles: ["super_admin", "admin", "direction"],
    phase: "Phase 2",
  },
  {
    key: "classes",
    label: "Classes",
    href: "/gestion/classes",
    icon: Landmark,
    roles: ["super_admin", "admin", "direction", "teacher"],
    phase: "Phase 2",
  },
  {
    key: "subjects",
    label: "Matières",
    href: "/gestion/matieres",
    icon: LibraryBig,
    roles: ["super_admin", "admin", "direction", "teacher"],
    phase: "Phase 2",
  },
  {
    key: "grades",
    label: "Notes",
    href: "/gestion/notes",
    icon: NotebookPen,
    roles: ["super_admin", "admin", "direction", "teacher", "student", "parent"],
    phase: "Phase 3",
  },
  {
    key: "attendance",
    label: "Présences",
    href: "/gestion/presences",
    icon: ClipboardCheck,
    roles: ["super_admin", "admin", "direction", "secretary", "teacher", "student", "parent"],
    phase: "Phase 3",
  },
  {
    key: "schedule",
    label: "Emploi du temps",
    href: "/gestion/emploi-du-temps",
    icon: CalendarDays,
    roles: ["super_admin", "admin", "direction", "teacher", "student", "parent"],
    phase: "Phase 3",
  },
  {
    key: "homework",
    label: "Devoirs",
    href: "/gestion/devoirs",
    icon: BookOpen,
    roles: ["super_admin", "admin", "direction", "teacher", "student", "parent"],
    phase: "Phase 4",
  },
  {
    key: "fees",
    label: "Frais scolaires",
    href: "/gestion/frais-scolaires",
    icon: CreditCard,
    roles: ["super_admin", "admin", "direction", "accountant", "parent"],
    phase: "Phase 5",
  },
  {
    key: "payments",
    label: "Paiements",
    href: "/gestion/paiements",
    icon: ReceiptText,
    roles: ["super_admin", "admin", "direction", "accountant", "parent"],
    phase: "Phase 5",
  },
  {
    key: "documents",
    label: "Documents",
    href: "/gestion/documents",
    icon: FileText,
    roles: [
      "super_admin",
      "admin",
      "direction",
      "secretary",
      "teacher",
      "student",
      "parent",
      "accountant",
      "staff",
    ],
    phase: "Phase 4",
  },
  {
    key: "announcements",
    label: "Annonces",
    href: "/gestion/annonces",
    icon: Bell,
    roles: [
      "super_admin",
      "admin",
      "direction",
      "secretary",
      "teacher",
      "student",
      "parent",
      "accountant",
      "staff",
    ],
    phase: "Phase 4",
  },
  {
    key: "reports",
    label: "Rapports",
    href: "/gestion/rapports",
    icon: BarChart3,
    roles: ["super_admin", "admin", "direction", "accountant"],
    phase: "Phase 6",
  },
  {
    key: "settings",
    label: "Paramètres",
    href: "/gestion/parametres",
    icon: Settings,
    roles: ["super_admin", "admin"],
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
  rapports: "reports",
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
