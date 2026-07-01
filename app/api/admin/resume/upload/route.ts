import { NextResponse } from "next/server";
import {
  destroyRawFile,
  isCloudinaryConfigured,
  uploadResumeFile,
} from "@/lib/cloudinary";
import { getPrisma } from "@/lib/prisma";
import { isResumeFormat } from "@/lib/resume";
import { jsonError } from "@/lib/api-auth";

export async function POST(request: Request) {
  if (!isCloudinaryConfigured()) {
    return jsonError(
      "Cloudinary is not configured. Add CLOUDINARY_* env vars.",
      503,
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const formatValue = formData.get("format");

    if (typeof formatValue !== "string" || !isResumeFormat(formatValue)) {
      return jsonError("A valid format (pdf or docx) is required.", 400);
    }

    if (!(file instanceof File) || file.size === 0) {
      return jsonError("A resume file is required.", 400);
    }

    const uploaded = await uploadResumeFile(file, formatValue);
    const prisma = getPrisma();
    const existing = await prisma.resumeFile.findUnique({
      where: { format: formatValue },
    });

    const record = await prisma.resumeFile.upsert({
      where: { format: formatValue },
      create: {
        format: formatValue,
        url: uploaded.url,
        publicId: uploaded.publicId,
        fileName: uploaded.fileName,
        byteSize: uploaded.byteSize,
      },
      update: {
        url: uploaded.url,
        publicId: uploaded.publicId,
        fileName: uploaded.fileName,
        byteSize: uploaded.byteSize,
      },
    });

    if (
      existing?.publicId &&
      existing.publicId !== uploaded.publicId
    ) {
      await destroyRawFile(existing.publicId).catch(() => undefined);
    }

    return NextResponse.json({
      file: {
        format: record.format,
        url: record.url,
        publicId: record.publicId,
        fileName: record.fileName,
        byteSize: record.byteSize,
        updatedAt: record.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return jsonError(message, 400);
  }
}
