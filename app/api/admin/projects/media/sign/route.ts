import { NextResponse } from "next/server";
import {
  createProjectMediaUploadSignature,
  isCloudinaryConfigured,
} from "@/lib/cloudinary";
import { jsonError } from "@/lib/api-auth";

export async function POST() {
  if (!isCloudinaryConfigured()) {
    return jsonError(
      "Cloudinary is not configured. Add CLOUDINARY_* env vars.",
      503,
    );
  }

  try {
    const signature = createProjectMediaUploadSignature();
    return NextResponse.json(signature);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not sign upload.";
    return jsonError(message, 500);
  }
}
