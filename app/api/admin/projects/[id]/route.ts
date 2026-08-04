import { NextResponse } from "next/server";
import { destroyProjectMedia } from "@/lib/cloudinary";
import { getPrisma } from "@/lib/prisma";
import { parseProjectMedia } from "@/lib/project-media";
import { projectSchema } from "@/lib/validations/admin";
import { revalidatePublicSection } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const project = await getPrisma().project.findUnique({ where: { id } });
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const prisma = getPrisma();
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const project = await prisma.project.update({
      where: { id },
      data: parsed.data,
    });

    if (parsed.data.media) {
      const previous = parseProjectMedia(existing.media);
      const next = parseProjectMedia(parsed.data.media);
      if (previous.publicId && previous.publicId !== next.publicId) {
        await destroyProjectMedia(previous).catch(() => undefined);
      }
    }

    revalidatePublicSection("projects");
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const prisma = getPrisma();
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });
    await destroyProjectMedia(parseProjectMedia(existing.media)).catch(
      () => undefined,
    );

    revalidatePublicSection("projects");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
