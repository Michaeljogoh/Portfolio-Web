import { Prisma } from "@/generated/prisma/client";

const TRANSIENT_PRISMA_CODES = new Set([
  "P1001", // Can't reach database server
  "P1002", // Database server timed out
  "P1008", // Operations timed out
  "P1017", // Server closed the connection
  "P2021", // Table does not exist
  "P2022", // Column does not exist
  "P2024", // Timed out fetching connection from pool
  "ETIMEDOUT",
]);

const TRANSIENT_NODE_CODES = new Set([
  "ETIMEDOUT",
  "ECONNREFUSED",
  "ECONNRESET",
  "ENOTFOUND",
  "EAI_AGAIN",
]);

export function isRecoverableDatabaseError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return TRANSIENT_PRISMA_CODES.has(error.code);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (error && typeof error === "object" && "code" in error) {
    const code = String((error as { code?: unknown }).code);
    if (TRANSIENT_NODE_CODES.has(code) || TRANSIENT_PRISMA_CODES.has(code)) {
      return true;
    }
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("timed out") ||
      message.includes("timeout") ||
      message.includes("econnrefused") ||
      message.includes("can't reach database server")
    );
  }

  return false;
}
