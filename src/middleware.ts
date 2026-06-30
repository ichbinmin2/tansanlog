import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATH_PREFIX = "/admin";

const createUnauthorizedResponse = () =>
  new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Tansanlog Admin"',
    },
  });

const parseBasicAuth = (authorization: string | null) => {
  if (!authorization?.startsWith("Basic ")) return null;

  const encoded = authorization.slice("Basic ".length);
  let decoded = "";

  try {
    decoded = atob(encoded);
  } catch {
    return null;
  }

  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) return null;

  return {
    username: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  };
};

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next();
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.next();
    }

    return new NextResponse("Admin credentials are not configured", {
      status: 404,
    });
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));

  if (
    credentials?.username === adminUsername &&
    credentials.password === adminPassword
  ) {
    return NextResponse.next();
  }

  return createUnauthorizedResponse();
}

export const config = {
  matcher: ["/admin/:path*"],
};
