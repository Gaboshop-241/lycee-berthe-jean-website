export const schoolRoles = [
  "admin",
  "direction",
  "teacher",
  "student",
  "parent",
  "accountant",
] as const;

export type SchoolRole = (typeof schoolRoles)[number];

export type ProfileStatus = "active" | "inactive" | "pending" | "suspended";

export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: SchoolRole;
  avatar_url: string | null;
  status: ProfileStatus;
  created_at: string;
  updated_at: string;
};

export type SchoolSession = {
  accessToken: string;
  profile: UserProfile;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  tone: "green" | "gold" | "blue" | "red";
};

export type DashboardAnnouncement = {
  id: string;
  title: string;
  audience: string;
  priority: "normale" | "importante" | "urgente";
  date: string;
};

export type DashboardActivity = {
  id: string;
  label: string;
  detail: string;
  date: string;
};

export type DemoStudent = {
  id: string;
  matricule: string;
  fullName: string;
  className: string;
  status: "actif" | "en attente" | "suspendu";
  parent: string;
};

export type DemoClass = {
  id: string;
  name: string;
  level: string;
  students: number;
  mainTeacher: string;
};

export type DashboardData = {
  metrics: DashboardMetric[];
  attendanceTrend: number[];
  paymentTrend: number[];
  announcements: DashboardAnnouncement[];
  activities: DashboardActivity[];
  students: DemoStudent[];
  classes: DemoClass[];
};
