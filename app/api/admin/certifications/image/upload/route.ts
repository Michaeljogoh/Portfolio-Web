import { NextResponse } from "next/server";
import { isCloudinaryConfigured, uploadLogoFile } from "@/lib/cloudinary";
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
      return jsonError("An image file is required.", 400);
    }

    const logo = await uploadLogoFile(file);
    return NextResponse.json({ logo });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return jsonError(message, 400);
  }
}
