import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

const PRISMA_MODEL_DELEGATES = [
  "admin",
  "project",
  "skillCategory",
  "skill",
  "experience",
  "certification",
  "resumeFile",
] as const;

function createPrismaClient(): PrismaClient | undefined {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) return undefined;

  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString,
      connectionTimeoutMillis: 15_000,
      idleTimeoutMillis: 30_000,
      max: process.env.NODE_ENV === "production" ? 10 : 5,
    });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export function resetPrismaClient(): void {
  globalForPrisma.prisma = undefined;
  void globalForPrisma.pool?.end().catch(() => undefined);
  globalForPrisma.pool = undefined;
}

/** Dev hot-reload can keep a client generated before new models were added. */
function isStalePrismaClient(client: PrismaClient): boolean {
  return PRISMA_MODEL_DELEGATES.some((delegate) => !(delegate in client));
}

function resolvePrismaClient(): PrismaClient | undefined {
  const cached = globalForPrisma.prisma;
  if (cached && !isStalePrismaClient(cached)) {
    return cached;
  }

  const client = createPrismaClient();
  if (client && process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

export function getPrisma(): PrismaClient {
  const client = resolvePrismaClient();
  if (!client) {
    throw new Error("DATABASE_URL is not configured");
  }
  return client;
}

export const prisma = resolvePrismaClient();

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
