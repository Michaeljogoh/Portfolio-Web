import type { ProjectMedia } from "@/lib/project-media";

export const IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const VIDEO_MAX_BYTES = 100 * 1024 * 1024;

const IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const VIDEO_MIME = new Set(["video/mp4", "video/webm", "video/quicktime"]);

const EXT_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

export function resolveProjectMediaMime(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext ? (EXT_TO_MIME[ext] ?? "") : "";
}

export function validateProjectMediaFile(file: File): {
  ok: true;
  resourceType: "image" | "video";
} | { ok: false; error: string } {
  const mime = resolveProjectMediaMime(file);

  if (IMAGE_MIME.has(mime)) {
    if (file.size > IMAGE_MAX_BYTES) {
      return { ok: false, error: "Image must be 10 MB or smaller." };
    }
    return { ok: true, resourceType: "image" };
  }
  if (VIDEO_MIME.has(mime)) {
    if (file.size > VIDEO_MAX_BYTES) {
      return { ok: false, error: "Video must be 100 MB or smaller." };
    }
    return { ok: true, resourceType: "video" };
  }
  return {
    ok: false,
    error: "Unsupported file type. Use JPG, PNG, WebP, GIF, MP4, WebM, or MOV.",
  };
}

export type CloudinaryProjectMediaUploadResult = {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format?: string;
  width?: number;
  height?: number;
  duration?: number;
};

export function buildVideoPosterUrl(
  publicId: string,
  cloudName: string,
): string {
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,w_1200,c_limit/${publicId}.jpg`;
}

export function projectMediaFromCloudinaryUpload(
  result: CloudinaryProjectMediaUploadResult,
  cloudName: string,
): ProjectMedia {
  if (result.resource_type === "video") {
    return {
      type: "video",
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      duration: result.duration,
      posterUrl: buildVideoPosterUrl(result.public_id, cloudName),
      provider: "cloudinary",
      playback: { loop: true, muted: true, autoplay: true },
    };
  }

  return {
    type: "image",
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    provider: "cloudinary",
  };
}
