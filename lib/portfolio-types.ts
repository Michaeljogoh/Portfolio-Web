import type { ProjectCategoryId } from "@/lib/project-categories";
import type { CertificationCategoryId } from "@/lib/cert-categories";
import type { ProjectMedia } from "@/lib/project-media";

export type Project = {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  categories: ProjectCategoryId[];
  media: ProjectMedia;
  link: string;
  repo: string;
};

export type SkillItem = {
  id?: string;
  name: string;
  iconUrl: string | null;
};

export type SkillGroup = {
  id?: string;
  category: string;
  items: SkillItem[];
};

/** @deprecated Use SkillGroup with SkillItem[] — kept for static seed data. */
export type SkillGroupLegacy = {
  category: string;
  items: string[];
};

export type ExperienceEntry = {
  id?: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  logo?: string | null;
};

export type Certification = {
  id?: string;
  title: string;
  issuer: string;
  issued: string;
  excerpt: string;
  tags: string[];
  categories: CertificationCategoryId[];
  image: string;
  credentialUrl: string;
};
