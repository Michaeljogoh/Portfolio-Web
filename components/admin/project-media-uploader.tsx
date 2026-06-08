"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PROJECT_MEDIA_PLACEHOLDER,
  getProjectMediaUrl,
  type ProjectMedia,
} from "@/lib/project-media";
import { buildProjectImageSrc } from "@/lib/cloudinary-url";
import { parseApiError, toastError } from "@/lib/admin-toast";

type ProjectMediaUploaderProps = {
  value: ProjectMedia;
  onChange: (media: ProjectMedia) => void;
  className?: string;
};

export function ProjectMediaUploader({
  value,
  onChange,
  className,
}: ProjectMediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const previewUrl =
    value.type === "image"
      ? buildProjectImageSrc(value, 640, 480)
      : value.posterUrl ?? value.url;

  async function handleFileChange(file: File | null) {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/projects/media/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        toastError(await parseApiError(res));
        return;
      }
      const data = (await res.json()) as { media: ProjectMedia };
      onChange(data.media);
    } catch {
      toastError("Upload failed. Try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    onChange({ ...PROJECT_MEDIA_PLACEHOLDER });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-video overflow-hidden border border-border bg-muted/30">
        {value.type === "video" ? (
          <video
            key={value.url}
            src={value.url}
            poster={value.posterUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={previewUrl}
            alt="Project media preview"
            fill
            unoptimized={previewUrl.startsWith("/")}
            className="object-cover"
          />
        )}

        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={(e) => void handleFileChange(e.target.files?.[0] ?? null)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="font-mono text-[10px] uppercase"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus className="size-3.5" />
          {uploading ? "Uploading…" : "Upload image or video"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="font-mono text-[10px] uppercase"
          disabled={uploading}
          onClick={handleRemove}
        >
          <Trash2 className="size-3.5" />
          Reset placeholder
        </Button>
        <span className="font-mono text-[10px] uppercase text-muted-foreground">
          {value.type} · {getProjectMediaUrl(value)}
        </span>
      </div>
    </div>
  );
}
