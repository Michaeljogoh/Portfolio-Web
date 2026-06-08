import type { ProjectImageMedia, ProjectMedia } from "@/lib/project-media";

const CLOUDINARY_HOST = "res.cloudinary.com";

export function isCloudinaryUrl(url: string): boolean {
  return url.includes(CLOUDINARY_HOST);
}

/** Build a responsive Cloudinary image URL that fills the project card container. */
export function buildProjectImageSrc(
  media: ProjectImageMedia,
  width = 960,
  height = 720,
): string {
  if (media.provider === "cloudinary" && media.publicId) {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloud) return media.url;

    const transforms = [
      "f_auto",
      "q_auto",
      `c_fill`,
      `g_auto`,
      `w_${width}`,
      `h_${height}`,
    ].join(",");

    return `https://${CLOUDINARY_HOST}/${cloud}/image/upload/${transforms}/${media.publicId}`;
  }

  return media.url;
}

export function getProjectMediaDisplaySrc(
  media: ProjectMedia,
  width = 960,
  height = 720,
): string {
  if (media.type === "image") {
    return buildProjectImageSrc(media, width, height);
  }
  return media.url;
}
