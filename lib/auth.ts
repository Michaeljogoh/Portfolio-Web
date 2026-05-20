import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const AUTH_COOKIE = "portfolio_admin_token";

const JWT_ALG = "HS256";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export type AdminTokenPayload = JWTPayload & {
  sub: string;
  email: string;
};

export async function signAdminToken(payload: {
  adminId: string;
  email: string;
}): Promise<string> {
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: JWT_ALG })
    .setSubject(payload.adminId)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getJwtSecret());
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      algorithms: [JWT_ALG],
    });
    if (!payload.sub || typeof payload.email !== "string") {
      return null;
    }
    return payload as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function getSessionFromCookies(): Promise<AdminTokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export function setAuthCookie(response: NextResponse, token: string): void {
  const secure = process.env.NODE_ENV === "production";
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function requireAdminSession(): Promise<AdminTokenPayload> {
  const session = await getSessionFromCookies();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
