import {
  ACCESS_TOKEN_COOKIE,
  PROFILE_NAME_COOKIE,
  PROFILE_ROLE_COOKIE,
  REFRESH_TOKEN_COOKIE,
  signOutFromAccessToken,
} from "@/lib/school/auth";
import {
  isSameOriginRequest,
  isSuspiciousMiddlewareBypass,
  jsonSecurityResponse,
  sessionCookieOptions,
} from "@/lib/school/security";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request) || isSuspiciousMiddlewareBypass(request)) {
    return jsonSecurityResponse({ message: "Requête refusée." }, { status: 403 });
  }

  const accessToken = request.headers
    .get("cookie")
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${ACCESS_TOKEN_COOKIE}=`))
    ?.split("=")
    .slice(1)
    .join("=");

  if (accessToken) {
    try {
      await signOutFromAccessToken(decodeURIComponent(accessToken));
    } catch {
      // The local session must still be cleared even if Supabase logout fails.
    }
  }

  const response = jsonSecurityResponse({ ok: true });

  for (const name of [
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    PROFILE_ROLE_COOKIE,
    PROFILE_NAME_COOKIE,
  ]) {
    response.cookies.set(name, "", {
      ...sessionCookieOptions,
      maxAge: 0,
    });
  }

  return response;
}
