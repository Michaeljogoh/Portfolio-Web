"use client";

import { useRef, useState } from "react";
import { FileUp, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type ResumeFile,
  type ResumeFormat,
  resumeAcceptMime,
  resumeFormatLabel,
} from "@/lib/resume";
import { parseApiError, toastError, toastSuccess } from "@/lib/admin-toast";

type ResumeFileUploaderProps = {
  format: ResumeFormat;
  value: ResumeFile | null;
  onChange: (file: ResumeFile | null) => void;
  className?: string;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResumeFileUploader({
  format,
  value,
  onChange,
  className,
}: ResumeFileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function handleFileChange(file: File | null) {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    try {
      const res = await fetch("/api/admin/resume/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        toastError(await parseApiError(res));
        return;
      }
      const data = (await res.json()) as { file: ResumeFile };
      onChange(data.file);
      toastSuccess(`${resumeFormatLabel(format)} resume uploaded`);
    } catch {
      toastError("Resume upload failed. Try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!value) return;

    setRemoving(true);
    try {
      const res = await fetch(`/api/admin/resume/${format}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        toastError(await parseApiError(res));
        return;
      }
      onChange(null);
      toastSuccess(`${resumeFormatLabel(format)} resume removed`);
    } catch {
      toastError("Could not remove resume file.");
    } finally {
      setRemoving(false);
    }
  }

  const busy = uploading || removing;

  return (
    <div
      className={cn(
        "space-y-3 border border-border bg-card/20 p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg">{resumeFormatLabel(format)}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            .{format} only · max 10 MB
          </p>
        </div>
        {value ? (
          <span className="font-mono text-[10px] uppercase text-primary">
            Uploaded
          </span>
        ) : null}
      </div>

      {value ? (
        <div className="rounded-md border border-border bg-muted/20 px-3 py-2">
          <p className="truncate text-sm">{value.fileName}</p>
          <p className="font-mono text-[10px] text-muted-foreground">
            {formatBytes(value.byteSize)} · updated{" "}
            {new Date(value.updatedAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No {resumeFormatLabel(format)} resume uploaded yet.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={resumeAcceptMime(format)}
          className="hidden"
          onChange={(e) => void handleFileChange(e.target.files?.[0] ?? null)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="font-mono text-[10px] uppercase"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <FileUp className="size-3.5" />
          )}
          {uploading
            ? "Uploading…"
            : value
              ? `Replace ${resumeFormatLabel(format)}`
              : `Upload ${resumeFormatLabel(format)}`}
        </Button>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="font-mono text-[10px] uppercase"
            disabled={busy}
            onClick={() => void handleRemove()}
          >
            <Trash2 className="size-3.5" />
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}
