import { NextResponse } from "next/server";
import { destroyRawFile } from "@/lib/cloudinary";
import { getPrisma } from "@/lib/prisma";
import { isResumeFormat } from "@/lib/resume";
import { jsonError } from "@/lib/api-auth";
import { revalidateSiteLayout } from "@/lib/revalidate";

type Params = { params: Promise<{ format: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const { format } = await params;

  if (!isResumeFormat(format)) {
    return jsonError("Invalid resume format.", 400);
  }

  const prisma = getPrisma();
  const existing = await prisma.resumeFile.findUnique({ where: { format } });

  if (!existing) {
    return jsonError("Resume file not found.", 404);
  }

  if (existing.publicId) {
    await destroyRawFile(existing.publicId).catch(() => undefined);
  }

  await prisma.resumeFile.delete({ where: { format } });

  revalidateSiteLayout();
  return NextResponse.json({ ok: true });
}
