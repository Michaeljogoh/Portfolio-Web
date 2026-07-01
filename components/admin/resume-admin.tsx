"use client";

import { useCallback, useEffect, useState } from "react";
import { ResumeFileUploader } from "@/components/admin/resume-file-uploader";
import {
  RESUME_FORMATS,
  type ResumeFile,
  type ResumeFormat,
} from "@/lib/resume";

export function ResumeAdmin() {
  const [files, setFiles] = useState<Partial<Record<ResumeFormat, ResumeFile>>>(
    {},
  );
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/resume");
    if (res.ok) {
      const items = (await res.json()) as ResumeFile[];
      const next: Partial<Record<ResumeFormat, ResumeFile>> = {};
      for (const item of items) {
        next[item.format] = item;
      }
      setFiles(next);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function handleChange(format: ResumeFormat, file: ResumeFile | null) {
    setFiles((current) => {
      const next = { ...current };
      if (file) {
        next[format] = file;
      } else {
        delete next[format];
      }
      return next;
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs text-muted-foreground">
          {loading
            ? "Loading…"
            : `${RESUME_FORMATS.filter((format) => files[format]).length} of ${RESUME_FORMATS.length} formats uploaded`}
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Upload PDF and DOCX resume files. Visitors can download them from the
          Resume / CV button in the site header.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {RESUME_FORMATS.map((format) => (
          <ResumeFileUploader
            key={format}
            format={format}
            value={files[format] ?? null}
            onChange={(file) => handleChange(format, file)}
          />
        ))}
      </div>
    </div>
  );
}
