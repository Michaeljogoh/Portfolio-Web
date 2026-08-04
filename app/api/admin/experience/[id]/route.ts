import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { experienceSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = experienceSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  try {
    const data = parsed.data;
    const item = await getPrisma().experience.update({
      where: { id },
      data: {
        ...data,
        logo: data.logo === undefined ? undefined : (data.logo ?? null),
      },
    });
    revalidatePublicSection("experience");
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await getPrisma().experience.delete({ where: { id } });
    revalidatePublicSection("experience");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
