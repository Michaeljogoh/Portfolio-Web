import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPrisma } from "@/lib/prisma";
import { setAuthCookie, signAdminToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;
    const admin = await getPrisma().admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = await signAdminToken({
      adminId: admin.id,
      email: admin.email,
    });

    const response = NextResponse.json({ ok: true });
    setAuthCookie(response, token);
    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in. Check database configuration." },
      { status: 500 },
    );
  }
}
