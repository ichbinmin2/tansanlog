import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATH_PREFIX = "/admin";
const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_SESSION_COOKIE = "tansanlog_admin_session";

const getSessionSecret = () =>
  process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next();
  }

  const sessionSecret = getSessionSecret();
  const isLoginPage = request.nextUrl.pathname === ADMIN_LOGIN_PATH;

  if (!sessionSecret) {
    return isLoginPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = session === sessionSecret;

  if (isLoginPage) {
    return isAuthenticated
      ? NextResponse.redirect(new URL(ADMIN_PATH_PREFIX, request.url))
      : NextResponse.next();
  }

  if (isAuthenticated) return NextResponse.next();

  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
