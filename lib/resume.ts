export const RESUME_FORMATS = ["pdf", "docx"] as const;

export type ResumeFormat = (typeof RESUME_FORMATS)[number];

export type ResumeFile = {
  format: ResumeFormat;
  url: string;
  publicId: string | null;
  fileName: string;
  byteSize: number;
  updatedAt: string;
};

export type ResumeDownload = {
  format: ResumeFormat;
  fileName: string;
  downloadUrl: string;
};

export function isResumeFormat(value: string): value is ResumeFormat {
  return (RESUME_FORMATS as readonly string[]).includes(value);
}

export function resumeFormatLabel(format: ResumeFormat): string {
  return format === "pdf" ? "PDF" : "DOCX";
}

export function resumeAcceptMime(format: ResumeFormat): string {
  return format === "pdf"
    ? "application/pdf,.pdf"
    : "application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx";
}
