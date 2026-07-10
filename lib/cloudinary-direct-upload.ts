import type { ProjectMedia } from "@/lib/project-media";
import {
  projectMediaFromCloudinaryUpload,
  validateProjectMediaFile,
  type CloudinaryProjectMediaUploadResult,
} from "@/lib/cloudinary-project-media";

export type ProjectMediaUploadSignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  uploadUrl: string;
};

function parseCloudinaryUploadError(data: unknown): string {
  if (data && typeof data === "object" && "error" in data) {
    const error = (data as { error?: { message?: string } }).error;
    if (error?.message) return error.message;
  }
  return "Cloudinary upload failed.";
}

export async function uploadProjectMediaDirect(
  file: File,
): Promise<ProjectMedia> {
  const validation = validateProjectMediaFile(file);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const signRes = await fetch("/api/admin/projects/media/sign", {
    method: "POST",
  });
  if (!signRes.ok) {
    const data = await signRes.json().catch(() => ({}));
    const message =
      typeof data.error === "string" ? data.error : "Could not start upload.";
    throw new Error(message);
  }

  const sign = (await signRes.json()) as ProjectMediaUploadSignature;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sign.apiKey);
  formData.append("timestamp", String(sign.timestamp));
  formData.append("signature", sign.signature);
  formData.append("folder", sign.folder);
  formData.append("asset_folder", sign.folder);
  formData.append("use_asset_folder_as_public_id_prefix", "true");

  const uploadRes = await fetch(sign.uploadUrl, {
    method: "POST",
    body: formData,
  });

  const uploadData = (await uploadRes.json()) as
    | CloudinaryProjectMediaUploadResult
    | { error?: { message?: string } };

  if (!uploadRes.ok) {
    throw new Error(parseCloudinaryUploadError(uploadData));
  }

  return projectMediaFromCloudinaryUpload(
    uploadData as CloudinaryProjectMediaUploadResult,
    sign.cloudName,
  );
}
