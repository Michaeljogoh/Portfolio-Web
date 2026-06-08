import { z } from "zod";

/** Default project media — first portfolio placeholder image. */
export const PROJECT_MEDIA_PLACEHOLDER = {
  type: "image",
  url: "/project-placeholder-1.jpg",
  provider: "local",
} as const satisfies ProjectImageMedia;

export const projectImageMediaSchema = z.object({
  type: z.literal("image"),
  url: z.string().min(1),
  publicId: z.string().min(1).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  format: z.string().min(1).optional(),
  provider: z.enum(["cloudinary", "local", "external"]).optional(),
});

export const projectVideoMediaSchema = z.object({
  type: z.literal("video"),
  url: z.string().min(1),
  publicId: z.string().min(1).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  format: z.string().min(1).optional(),
  duration: z.number().positive().optional(),
  posterUrl: z.string().min(1).optional(),
  provider: z.enum(["cloudinary", "local", "external"]).optional(),
  playback: z
    .object({
      loop: z.boolean().optional(),
      muted: z.boolean().optional(),
      autoplay: z.boolean().optional(),
    })
    .optional(),
});

export const projectMediaSchema = z.discriminatedUnion("type", [
  projectImageMediaSchema,
  projectVideoMediaSchema,
]);

export type ProjectImageMedia = z.infer<typeof projectImageMediaSchema>;
export type ProjectVideoMedia = z.infer<typeof projectVideoMediaSchema>;
export type ProjectMedia = z.infer<typeof projectMediaSchema>;

export function projectMediaFromUrl(url: string): ProjectImageMedia {
  const provider = url.startsWith("/")
    ? "local"
    : url.includes("cloudinary.com")
      ? "cloudinary"
      : "external";
  return { type: "image", url, provider };
}

export function getProjectMediaUrl(media: ProjectMedia): string {
  return media.url;
}

export function parseProjectMedia(value: unknown): ProjectMedia {
  const parsed = projectMediaSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  if (typeof value === "string" && value.length > 0) {
    return projectMediaFromUrl(value);
  }
  return { ...PROJECT_MEDIA_PLACEHOLDER };
}
