


export const CERTIFICATION_CATEGORIES = [
  {
    id: "software-engineering",
    label:
      "Software Engineering",
  },
  {
    id: "devops-platform-engineering",
    label:
      "DevOps",
  },
  {
    id: "cloud-platforms",
    label: "Cloud Platforms",
  },
  {
    id: "networking",
    label: "Networking",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
  },
  {
    id: "ai-machine-learning",
    label: "AI & ML",
  },
] as const;

export type CertificationCategoryId =
  (typeof CERTIFICATION_CATEGORIES)[number]["id"];

const labelById = Object.fromEntries(
  CERTIFICATION_CATEGORIES.map((c) => [c.id, c.label]),
) as Record<CertificationCategoryId, string>;

export function getCertificationCategoryLabel(
  id: CertificationCategoryId,
): string {
  return labelById[id];
}
