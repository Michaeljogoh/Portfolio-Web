import { z } from "zod";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";
import { CERTIFICATION_CATEGORIES } from "@/lib/cert-categories";

const projectCategoryIds = PROJECT_CATEGORIES.map((c) => c.id) as [
  string,
  ...string[],
];

const certCategoryIds = CERTIFICATION_CATEGORIES.map((c) => c.id) as [
  string,
  ...string[],
];

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  categories: z.array(z.enum(projectCategoryIds)).min(1),
  image: z.string().min(1),
  link: z.string().min(1),
  repo: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const experienceSchema = z.object({
  title: z.string().min(1).max(300),
  date: z.string().min(1).max(100),
  readTime: z.string().min(1).max(200),
  excerpt: z.string().min(1),
  logo: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export const certificationSchema = z.object({
  title: z.string().min(1).max(200),
  issuer: z.string().min(1).max(200),
  issued: z.string().min(1).max(100),
  excerpt: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  categories: z.array(z.enum(certCategoryIds)).min(1),
  image: z.string().min(1),
  credentialUrl: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const skillCategorySchema = z.object({
  name: z.string().min(1).max(120),
  sortOrder: z.number().int().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1).max(120),
  categoryId: z.string().min(1),
  iconUrl: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export function parseTagsInput(value: string): string[] {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
