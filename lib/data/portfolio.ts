import type { ProjectCategoryId } from "@/lib/project-categories";
import type { CertificationCategoryId } from "@/lib/cert-categories";
import {
  certifications as staticCertifications,
  experience as staticExperience,
  projects as staticProjects,
  skills as staticSkillsLegacy,
} from "@/lib/portfolio-data";
import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
import type {
  Certification,
  ExperienceEntry,
  Project,
  SkillGroup,
} from "@/lib/portfolio-types";

function mapProject(row: {
  id: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  image: string;
  link: string;
  repo: string;
}): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    tags: row.tags,
    categories: row.categories as ProjectCategoryId[],
    image: row.image,
    link: row.link,
    repo: row.repo,
  };
}

function mapExperience(row: {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  logo: string | null;
}): ExperienceEntry {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    readTime: row.readTime,
    excerpt: row.excerpt,
    logo: row.logo ?? undefined,
  };
}

function mapCertification(row: {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  image: string;
  credentialUrl: string;
}): Certification {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    issued: row.issued,
    excerpt: row.excerpt,
    tags: row.tags,
    categories: row.categories as CertificationCategoryId[],
    image: row.image,
    credentialUrl: row.credentialUrl,
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!isDatabaseConfigured()) {
    return staticProjects;
  }
  try {
    const rows = await getPrisma().project.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return staticProjects;
    return rows.map(mapProject);
  } catch {
    return staticProjects;
  }
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  if (!isDatabaseConfigured()) {
    return staticExperience;
  }
  try {
    const rows = await getPrisma().experience.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return staticExperience;
    return rows.map(mapExperience);
  } catch {
    return staticExperience;
  }
}

export async function getCertifications(): Promise<Certification[]> {
  if (!isDatabaseConfigured()) {
    return staticCertifications;
  }
  try {
    const rows = await getPrisma().certification.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return staticCertifications;
    return rows.map(mapCertification);
  } catch {
    return staticCertifications;
  }
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  if (!isDatabaseConfigured()) {
    return staticSkillsLegacy.map((g) => ({
      category: g.category,
      items: g.items.map((name) => ({ name, iconUrl: null })),
    }));
  }
  try {
    const categories = await getPrisma().skillCategory.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: {
        skills: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
      },
    });
    if (categories.length === 0) {
      return staticSkillsLegacy.map((g) => ({
        category: g.category,
        items: g.items.map((name) => ({ name, iconUrl: null })),
      }));
    }
    return categories.map((c) => ({
      id: c.id,
      category: c.name,
      items: c.skills.map((s) => ({
        id: s.id,
        name: s.name,
        iconUrl: s.iconUrl,
      })),
    }));
  } catch {
    return staticSkillsLegacy.map((g) => ({
      category: g.category,
      items: g.items.map((name) => ({ name, iconUrl: null })),
    }));
  }
}
