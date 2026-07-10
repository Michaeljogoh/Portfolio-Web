import { isRecoverableDatabaseError } from "@/lib/db-errors";
import { resetPrismaClient } from "@/lib/prisma";

export async function safeDatabaseQuery<T>(
  scope: string,
  query: () => Promise<T>,
  fallback: T,
): Promise<T> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await query();
    } catch (error) {
      if (!isRecoverableDatabaseError(error)) {
        throw error;
      }

      if (attempt === 0) {
        resetPrismaClient();
        await new Promise((resolve) => setTimeout(resolve, 300));
        continue;
      }

      if (process.env.NODE_ENV === "development") {
        console.warn(`[db] ${scope} unavailable; serving fallback.`, error);
      }

      return fallback;
    }
  }

  return fallback;
}
