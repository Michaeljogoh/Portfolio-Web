import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { resolveSkillIconUrl } from "@/lib/skill-icon-resolver";
import { skillSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = skillSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  try {
    const data = parsed.data;
    let iconUrl = data.iconUrl;
    if (data.name && iconUrl === undefined) {
      iconUrl = await resolveSkillIconUrl(data.name);
    }
    const skill = await getPrisma().skill.update({
      where: { id },
      data: {
        ...data,
        ...(iconUrl !== undefined ? { iconUrl } : {}),
      },
    });
    revalidatePublicSection("skills");
    return NextResponse.json(skill);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await getPrisma().skill.delete({ where: { id } });
    revalidatePublicSection("skills");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
