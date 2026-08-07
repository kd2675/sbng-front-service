import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminCookieValue,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/app/adminAuth";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, message: "운영자 인증이 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  const body = await readLoginBody(request);
  const password = body.password ?? "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { ok: false, message: "비밀번호가 올바르지 않습니다." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminCookieValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

async function readLoginBody(request: Request): Promise<{ password?: string }> {
  try {
    const value = await request.json() as unknown;
    if (!value || typeof value !== "object") {
      return {};
    }
    const password = (value as Record<string, unknown>).password;
    return typeof password === "string" ? { password } : {};
  } catch {
    return {};
  }
}
