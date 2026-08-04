import { revalidatePath } from "next/cache";

/**
 * Public routes rendered from CMS data. These pages are statically generated,
 * so an admin mutation must explicitly invalidate the matching path to publish.
 */
const SECTION_PATHS = {
  projects: "/projects",
  skills: "/skills",
  experience: "/experience",
  certifications: "/certifications",
} as const;

export type PublicSection = keyof typeof SECTION_PATHS;

/** Publish a CMS edit to its public page immediately. */
export function revalidatePublicSection(section: PublicSection): void {
  revalidatePath(SECTION_PATHS[section]);
}

/**
 * Resume downloads render in the site header, which lives in the shared
 * layout — so a resume change affects every public page, not a single route.
 */
export function revalidateSiteLayout(): void {
  revalidatePath("/", "layout");
}
