import { v2 as cloudinary, type UploadApiOptions } from "cloudinary";
import type { ProjectMedia } from "@/lib/project-media";
import type { ResumeFormat } from "@/lib/resume";
import {
  projectMediaFromCloudinaryUpload,
  validateProjectMediaFile,
} from "@/lib/cloudinary-project-media";

export { validateProjectMediaFile } from "@/lib/cloudinary-project-media";

const LOGO_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_MAX_BYTES = 10 * 1024 * 1024;

const LOGO_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

const RESUME_MIME_BY_FORMAT = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

const EXT_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function resolveFileMime(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext ? (EXT_TO_MIME[ext] ?? "") : "";
}

function normalizeFolder(raw: string): string {
  return raw.replace(/^["']|["']$/g, "").replace(/\/+$/, "");
}

function getUploadFolder(): string {
  return normalizeFolder(process.env.CLOUDINARY_FOLDER ?? "portfolio/projects");
}

function getLogoFolder(): string {
  return normalizeFolder(
    process.env.CLOUDINARY_LOGO_FOLDER ?? "portfolio/logos",
  );
}

function getResumeFolder(): string {
  return normalizeFolder(
    process.env.CLOUDINARY_RESUME_FOLDER ?? "portfolio/resume",
  );
}

function formatCloudinaryError(error: unknown): string {
  if (error && typeof error === "object") {
    const err = error as { message?: string; http_code?: number };
    if (err.http_code === 403) {
      return (
        "Cloudinary API key cannot upload (missing create permission). " +
        "In Cloudinary Console go to Settings → API Keys, use the root key or assign a role with Upload permissions to this key, then update CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local."
      );
    }
    if (err.message) {
      return err.http_code
        ? `Cloudinary (${err.http_code}): ${err.message}`
        : err.message;
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return "Upload failed.";
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

export type ProjectMediaUploadSignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  uploadUrl: string;
};

export function createProjectMediaUploadSignature(): ProjectMediaUploadSignature {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const folder = getUploadFolder();
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = {
    asset_folder: folder,
    folder,
    timestamp,
    use_asset_folder_as_public_id_prefix: "true",
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    cloudName,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    timestamp,
    signature,
    folder,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
  };
}

export function validateLogoFile(
  file: File,
): { ok: true } | { ok: false; error: string } {
  const mime = resolveFileMime(file);
  if (!LOGO_MIME.has(mime)) {
    return {
      ok: false,
      error: "Unsupported logo type. Use PNG, JPG, WebP, or SVG.",
    };
  }
  if (file.size > LOGO_MAX_BYTES) {
    return { ok: false, error: "Logo must be 5 MB or smaller." };
  }
  return { ok: true };
}

export function validateResumeFile(
  file: File,
  format: ResumeFormat,
): { ok: true } | { ok: false; error: string } {
  const mime = resolveFileMime(file);
  const expectedMime = RESUME_MIME_BY_FORMAT[format];
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (mime !== expectedMime && ext !== format) {
    return {
      ok: false,
      error: `Unsupported file type. Upload a .${format} file.`,
    };
  }
  if (file.size > RESUME_MAX_BYTES) {
    return { ok: false, error: "Resume file must be 10 MB or smaller." };
  }
  return { ok: true };
}

type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format?: string;
  width?: number;
  height?: number;
  duration?: number;
};

/** Stream a file buffer to Cloudinary inside the given folder (dynamic + legacy folder modes). */
async function uploadBufferToFolder(
  buffer: Buffer,
  folder: string,
  options: UploadApiOptions = {},
): Promise<CloudinaryUploadResult> {
  const cld = getCloudinary();
  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        // Dynamic folder mode (default on new accounts): asset_folder + prefix.
        // Legacy fixed folder mode: folder still works via public_id path.
        asset_folder: folder,
        use_asset_folder_as_public_id_prefix: true,
        folder,
        ...options,
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(new Error(formatCloudinaryError(error ?? "Upload failed")));
          return;
        }
        resolve(uploadResult as CloudinaryUploadResult);
      },
    );
    stream.end(buffer);
  });
}

export async function uploadProjectMediaFile(
  file: File,
): Promise<ProjectMedia> {
  const validation = validateProjectMediaFile(file);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadBufferToFolder(buffer, getUploadFolder(), {
    resource_type: "auto",
  });

  return projectMediaFromCloudinaryUpload(
    result,
    process.env.CLOUDINARY_CLOUD_NAME!,
  );
}

export async function destroyProjectMedia(media: ProjectMedia): Promise<void> {
  if (media.provider !== "cloudinary" || !media.publicId) return;
  if (!isCloudinaryConfigured()) return;

  const cld = getCloudinary();
  const resourceType = media.type === "video" ? "video" : "image";
  await cld.uploader.destroy(media.publicId, { resource_type: resourceType });
}

export type UploadedLogo = {
  url: string;
  publicId: string;
};

/**
 * Upload a company logo. A `c_limit` eager transform caps the stored asset so it
 * comfortably fits the timeline logo slot while preserving aspect ratio.
 */
export async function uploadLogoFile(file: File): Promise<UploadedLogo> {
  const validation = validateLogoFile(file);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadBufferToFolder(buffer, getLogoFolder(), {
    resource_type: "image",
    transformation: [{ width: 256, height: 256, crop: "limit" }],
  });

  return { url: result.secure_url, publicId: result.public_id };
}

export type UploadedResume = {
  url: string;
  publicId: string;
  fileName: string;
  byteSize: number;
};

export async function uploadResumeFile(
  file: File,
  format: ResumeFormat,
): Promise<UploadedResume> {
  const validation = validateResumeFile(file, format);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadBufferToFolder(buffer, getResumeFolder(), {
    resource_type: "raw",
    format,
    public_id: `resume-${format}`,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    fileName: file.name,
    byteSize: file.size,
  };
}

export async function destroyRawFile(publicId: string): Promise<void> {
  if (!isCloudinaryConfigured()) return;
  const cld = getCloudinary();
  await cld.uploader.destroy(publicId, { resource_type: "raw" });
}
