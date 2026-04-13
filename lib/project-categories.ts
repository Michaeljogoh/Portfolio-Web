export const PROJECT_CATEGORIES = [
  { id: "backend-apis", label: "Backend & APIs" },
  { id: "frontend-ui", label: "Frontend & UI" },
  { id: "devops-cloud", label: "DevOps & Cloud" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "ai-automation-workflows", label: "AI Automation & Workflows" },
  { id: "ai-ml", label: "AI & ML" },
  // { id: "mobile", label: "Mobile" },
  // { id: "data-engineering", label: "Data Engineering" },
  { id: "web3-blockchain", label: "Web3 / Blockchain" },
] as const;

export type ProjectCategoryId = (typeof PROJECT_CATEGORIES)[number]["id"];

const labelById = Object.fromEntries(
  PROJECT_CATEGORIES.map((c) => [c.id, c.label]),
) as Record<ProjectCategoryId, string>;

export function getProjectCategoryLabel(id: ProjectCategoryId): string {
  return labelById[id];
}

export function isFeaturedCategory(
  entry: (typeof PROJECT_CATEGORIES)[number],
): entry is (typeof PROJECT_CATEGORIES)[number] & { featured: true } {
  return "featured" in entry && entry.featured === true;
}
