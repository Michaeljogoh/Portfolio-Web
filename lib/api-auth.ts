import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth";

export async function requireAdminApi(): Promise<
  { session: NonNullable<Awaited<ReturnType<typeof getSessionFromCookies>>> } | NextResponse
> {
  const session = await getSessionFromCookies();
  if (!session?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return { session };
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
