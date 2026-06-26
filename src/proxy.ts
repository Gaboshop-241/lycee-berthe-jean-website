import { NextResponse, type NextRequest } from "next/server";

const ACCESS_TOKEN_COOKIE = "bj_access_token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/gestion/connexion", request.url);
  const hasSessionCookie = Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);

  if (pathname === "/gestion/connexion") {
    return NextResponse.next();
  }

  if (!hasSessionCookie) {
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gestion/:path*"],
};
