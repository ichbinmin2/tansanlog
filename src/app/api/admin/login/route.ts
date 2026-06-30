import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "tansanlog_admin_session";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || adminPassword;

  if (!adminUsername || !adminPassword || !sessionSecret) {
    return NextResponse.json(
      { message: "Admin credentials are not configured." },
      { status: 503 }
    );
  }

  if (username !== adminUsername || password !== adminPassword) {
    return NextResponse.json(
      { message: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, sessionSecret, {
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

