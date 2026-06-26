import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  PROFILE_NAME_COOKIE,
  PROFILE_ROLE_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/school/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  for (const name of [
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    PROFILE_ROLE_COOKIE,
    PROFILE_NAME_COOKIE,
  ]) {
    response.cookies.set(name, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
  }

  return response;
}
