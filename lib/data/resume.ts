import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
import { safeDatabaseQuery } from "@/lib/db-query";
import type { ResumeDownload, ResumeFile, ResumeFormat } from "@/lib/resume";
import { RESUME_FORMATS } from "@/lib/resume";

function mapResumeFile(row: {
  format: string;
  url: string;
  publicId: string | null;
  fileName: string;
  byteSize: number;
  updatedAt: Date;
}): ResumeFile {
  return {
    format: row.format as ResumeFormat,
    url: row.url,
    publicId: row.publicId,
    fileName: row.fileName,
    byteSize: row.byteSize,
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function getResumeDownloadPath(format: ResumeFormat): string {
  return `/api/resume/${format}`;
}

export async function getResumeFiles(): Promise<ResumeFile[]> {
  if (!isDatabaseConfigured()) return [];

  return safeDatabaseQuery("getResumeFiles", async () => {
    const rows = await getPrisma().resumeFile.findMany({
      where: { format: { in: [...RESUME_FORMATS] } },
      orderBy: { format: "asc" },
    });
    return rows.map(mapResumeFile);
  }, []);
}

export async function getResumeFile(
  format: ResumeFormat,
): Promise<ResumeFile | null> {
  if (!isDatabaseConfigured()) return null;

  return safeDatabaseQuery("getResumeFile", async () => {
    const row = await getPrisma().resumeFile.findUnique({ where: { format } });
    return row ? mapResumeFile(row) : null;
  }, null);
}

export async function getResumeDownloads(): Promise<ResumeDownload[]> {
  const files = await getResumeFiles();
  return files.map((file) => ({
    format: file.format,
    fileName: file.fileName,
    downloadUrl: getResumeDownloadPath(file.format),
  }));
}
