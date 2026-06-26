import { NextResponse, type NextRequest } from "next/server";
import {
  isSuspiciousMiddlewareBypass,
  withManagementSecurityHeaders,
} from "@/lib/school/security";

const ACCESS_TOKEN_COOKIE = "bj_access_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/gestion/connexion", request.url);
  const hasSessionCookie = Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);

  if (isSuspiciousMiddlewareBypass(request)) {
    loginUrl.searchParams.set("security", "1");
    return withManagementSecurityHeaders(NextResponse.redirect(loginUrl));
  }

  if (pathname === "/gestion/connexion") {
    return withManagementSecurityHeaders(NextResponse.next());
  }

  if (!hasSessionCookie) {
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return withManagementSecurityHeaders(NextResponse.redirect(loginUrl));
  }

  return withManagementSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/gestion/:path*"],
};
