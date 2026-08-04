import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { certificationSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = certificationSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  try {
    const item = await getPrisma().certification.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePublicSection("certifications");
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await getPrisma().certification.delete({ where: { id } });
    revalidatePublicSection("certifications");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
