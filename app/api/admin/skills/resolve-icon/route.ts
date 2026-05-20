import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveSkillIconUrl } from "@/lib/skill-icon-resolver";

const schema = z.object({ name: z.string().min(1) });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  const iconUrl = await resolveSkillIconUrl(parsed.data.name);
  return NextResponse.json({ iconUrl });
}
