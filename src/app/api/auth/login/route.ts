import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  PROFILE_NAME_COOKIE,
  PROFILE_ROLE_COOKIE,
  REFRESH_TOKEN_COOKIE,
  signInWithPassword,
} from "@/lib/school/auth";
import { getDefaultPathForRole } from "@/lib/school/permissions";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password) {
      return jsonError("Veuillez renseigner l'e-mail et le mot de passe.");
    }

    const session = await signInWithPassword(email, password);
    const response = NextResponse.json({
      redirectTo: getDefaultPathForRole(session.profile.role),
      role: session.profile.role,
    });

    response.cookies.set(ACCESS_TOKEN_COOKIE, session.accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60,
    });
    response.cookies.set(REFRESH_TOKEN_COOKIE, session.refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
    response.cookies.set(PROFILE_ROLE_COOKIE, session.profile.role, {
      ...cookieOptions,
      maxAge: 60 * 60,
    });
    response.cookies.set(PROFILE_NAME_COOKIE, session.profile.full_name, {
      ...cookieOptions,
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    return jsonError(
      error instanceof Error
        ? error.message
        : "Connexion impossible pour le moment.",
      401,
    );
  }
}
