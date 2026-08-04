import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { skillCategorySchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = skillCategorySchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  try {
    const category = await getPrisma().skillCategory.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePublicSection("skills");
    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await getPrisma().skillCategory.delete({ where: { id } });
    revalidatePublicSection("skills");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
