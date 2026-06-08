import { NextResponse } from "next/server";
import {
  isCloudinaryConfigured,
  uploadProjectMediaFile,
} from "@/lib/cloudinary";
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

    if (!(file instanceof File) || file.size === 0) {
      return jsonError("A media file is required.", 400);
    }

    const media = await uploadProjectMediaFile(file);
    return NextResponse.json({ media });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed.";
    return jsonError(message, 400);
  }
}
