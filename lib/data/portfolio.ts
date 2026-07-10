import type { ProjectCategoryId } from "@/lib/project-categories";
import type { CertificationCategoryId } from "@/lib/cert-categories";
import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
import { safeDatabaseQuery } from "@/lib/db-query";
import type {
  Certification,
  ExperienceEntry,
  Project,
  SkillGroup,
} from "@/lib/portfolio-types";
import { parseProjectMedia } from "@/lib/project-media";

function mapProject(row: {
  id: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  media: unknown;
  link: string;
  repo: string;
}): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    tags: row.tags,
    categories: row.categories as ProjectCategoryId[],
    media: parseProjectMedia(row.media),
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
  if (!isDatabaseConfigured()) return [];

  return safeDatabaseQuery("getProjects", async () => {
    const rows = await getPrisma().project.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map(mapProject);
  }, []);
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  if (!isDatabaseConfigured()) return [];

  return safeDatabaseQuery("getExperience", async () => {
    const rows = await getPrisma().experience.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map(mapExperience);
  }, []);
}

export async function getCertifications(): Promise<Certification[]> {
  if (!isDatabaseConfigured()) return [];

  return safeDatabaseQuery("getCertifications", async () => {
    const rows = await getPrisma().certification.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return rows.map(mapCertification);
  }, []);
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  if (!isDatabaseConfigured()) return [];

  return safeDatabaseQuery("getSkillGroups", async () => {
    const categories = await getPrisma().skillCategory.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: {
        skills: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
      },
    });
    return categories.map((c) => ({
      id: c.id,
      category: c.name,
      items: c.skills.map((s) => ({
        id: s.id,
        name: s.name,
        iconUrl: s.iconUrl,
      })),
    }));
  }, []);
}
