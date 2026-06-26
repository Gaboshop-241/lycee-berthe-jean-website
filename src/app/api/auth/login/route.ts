import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  PROFILE_NAME_COOKIE,
  PROFILE_ROLE_COOKIE,
  REFRESH_TOKEN_COOKIE,
  signInWithPassword,
} from "@/lib/school/auth";
import { getDefaultPathForRole } from "@/lib/school/permissions";
import { getManagementWelcome } from "@/lib/school/welcome";
import {
  checkRateLimit,
  getClientIp,
  isSameOriginRequest,
  isSuspiciousMiddlewareBypass,
  jsonSecurityResponse,
  resetRateLimit,
  sessionCookieOptions,
} from "@/lib/school/security";

function jsonError(message: string, status = 400) {
  return jsonSecurityResponse({ message }, { status });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function clearLegacyProfileCookies(response: NextResponse) {
  for (const name of [PROFILE_ROLE_COOKIE, PROFILE_NAME_COOKIE]) {
    response.cookies.set(name, "", {
      ...sessionCookieOptions,
      maxAge: 0,
    });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request) || isSuspiciousMiddlewareBypass(request)) {
    return jsonError("Requête refusée.", 403);
  }

  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return jsonError("Format de requête invalide.", 415);
    }

    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password || !isValidEmail(email) || password.length > 256) {
      return jsonError("Identifiants invalides.", 401);
    }

    const ip = getClientIp(request);
    const ipKey = `login:ip:${ip}`;
    const emailKey = `login:email:${email}`;
    const ipLimit = checkRateLimit(ipKey, {
      limit: 20,
      windowMs: 15 * 60 * 1000,
      lockMs: 20 * 60 * 1000,
    });
    const emailLimit = checkRateLimit(emailKey, {
      limit: 6,
      windowMs: 15 * 60 * 1000,
      lockMs: 20 * 60 * 1000,
    });

    if (!ipLimit.allowed || !emailLimit.allowed) {
      const retryAfter = Math.max(
        ipLimit.retryAfterSeconds,
        emailLimit.retryAfterSeconds,
      );
      const response = jsonError(
        "Trop de tentatives. Réessayez dans quelques minutes.",
        429,
      );
      response.headers.set("Retry-After", String(retryAfter));
      return response;
    }

    const session = await signInWithPassword(email, password);
    resetRateLimit(ipKey, emailKey);

    const response = jsonSecurityResponse({
      redirectTo: getDefaultPathForRole(session.profile.role),
      role: session.profile.role,
      welcomeMessage: getManagementWelcome(session.profile),
    });

    response.cookies.set(ACCESS_TOKEN_COOKIE, session.accessToken, {
      ...sessionCookieOptions,
      maxAge: 45 * 60,
    });
    response.cookies.set(REFRESH_TOKEN_COOKIE, session.refreshToken, {
      ...sessionCookieOptions,
      maxAge: 60 * 60 * 24 * 14,
    });
    clearLegacyProfileCookies(response);

    return response;
  } catch (error) {
    void error;
    return jsonError("Identifiants invalides ou compte non autorisé.", 401);
  }
}
