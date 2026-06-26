import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SchoolRole, SchoolSession, UserProfile } from "./types";

export const ACCESS_TOKEN_COOKIE = "bj_access_token";
export const REFRESH_TOKEN_COOKIE = "bj_refresh_token";
export const PROFILE_ROLE_COOKIE = "bj_profile_role";
export const PROFILE_NAME_COOKIE = "bj_profile_name";

type SupabaseAuthResponse = {
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    email?: string;
  };
  error?: string;
  error_description?: string;
  msg?: string;
};

type SupabaseUserResponse = {
  id: string;
  email?: string;
};

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  }

  return url.replace(/\/$/, "");
}

function getSupabaseAnonKey() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured.");
  }

  return key;
}

async function supabaseRequest<T>(
  path: string,
  init: RequestInit & { accessToken?: string } = {},
) {
  const headers = new Headers(init.headers);
  headers.set("apikey", getSupabaseAnonKey());

  if (init.accessToken) {
    headers.set("Authorization", `Bearer ${init.accessToken}`);
  }

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getSupabaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : (null as T);

  if (!response.ok) {
    const message =
      typeof data === "object" && data && "error_description" in data
        ? String((data as SupabaseAuthResponse).error_description)
        : typeof data === "object" && data && "msg" in data
          ? String((data as SupabaseAuthResponse).msg)
          : "La requête Supabase a échoué.";

    throw new Error(message);
  }

  return data;
}

export async function signInWithPassword(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase n'est pas encore configuré. Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const auth = await supabaseRequest<SupabaseAuthResponse>(
    "/auth/v1/token?grant_type=password",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
  );

  if (!auth.access_token || !auth.refresh_token || !auth.user?.id) {
    throw new Error("Réponse Supabase incomplète.");
  }

  const profile = await getProfileFromAccessToken(auth.access_token);

  if (!profile) {
    throw new Error(
      "Profil scolaire introuvable. Demandez à l'administrateur de créer votre profil users_profiles.",
    );
  }

  if (profile.status !== "active") {
    throw new Error("Ce compte n'est pas actif. Contactez l'administration.");
  }

  return {
    accessToken: auth.access_token,
    refreshToken: auth.refresh_token,
    profile,
  };
}

export async function requestPasswordReset(email: string, redirectTo?: string) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase n'est pas encore configuré.");
  }

  await supabaseRequest("/auth/v1/recover", {
    method: "POST",
    body: JSON.stringify({ email, redirect_to: redirectTo }),
  });
}

export async function getProfileFromAccessToken(accessToken: string) {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const user = await supabaseRequest<SupabaseUserResponse>("/auth/v1/user", {
    accessToken,
  });

  const query = new URLSearchParams({
    user_id: `eq.${user.id}`,
    select: "*",
    limit: "1",
  });

  const profiles = await supabaseRequest<UserProfile[]>(
    `/rest/v1/users_profiles?${query.toString()}`,
    {
      accessToken,
      headers: {
        Accept: "application/json",
      },
    },
  );

  return profiles[0] ?? null;
}

export async function getCurrentSession(): Promise<SchoolSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const profile = await getProfileFromAccessToken(accessToken);

    if (!profile || profile.status !== "active") {
      return null;
    }

    return { accessToken, profile };
  } catch {
    return null;
  }
}

export async function requireSchoolSession() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/gestion/connexion");
  }

  return session;
}

export function isSchoolRole(value: string | undefined | null): value is SchoolRole {
  return (
    value === "admin" ||
    value === "direction" ||
    value === "teacher" ||
    value === "student" ||
    value === "parent" ||
    value === "accountant"
  );
}
