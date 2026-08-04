import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { resolveSkillIconUrl } from "@/lib/skill-icon-resolver";
import { skillSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = skillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const iconUrl =
    data.iconUrl !== undefined && data.iconUrl !== null
      ? data.iconUrl
      : await resolveSkillIconUrl(data.name);

  const maxOrder = await getPrisma().skill.aggregate({
    where: { categoryId: data.categoryId },
    _max: { sortOrder: true },
  });

  const skill = await getPrisma().skill.create({
    data: {
      name: data.name,
      categoryId: data.categoryId,
      iconUrl,
      sortOrder: data.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });
  revalidatePublicSection("skills");
  return NextResponse.json(skill, { status: 201 });
}
