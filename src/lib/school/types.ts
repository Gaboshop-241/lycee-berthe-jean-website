export const schoolRoles = [
  "super_admin",
  "admin",
  "direction",
  "secretary",
  "teacher",
  "student",
  "parent",
  "accountant",
  "staff",
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
