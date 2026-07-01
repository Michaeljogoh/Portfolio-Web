"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shouldUseNextImage } from "@/lib/cloudinary-url";
import { cn } from "@/lib/utils";
import { parseApiError, toastError } from "@/lib/admin-toast";

type UploadedLogo = { url: string; publicId: string };

type LogoUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  uploadEndpoint?: string;
  previewAlt?: string;
  emptyLabel?: string;
};

export function LogoUploader({
  value,
  onChange,
  className,
  uploadEndpoint = "/api/admin/experience/logo/upload",
  previewAlt = "Company logo preview",
  emptyLabel = "Logo",
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(file: File | null) {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        toastError(await parseApiError(res));
        return;
      }
      const data = (await res.json()) as { logo: UploadedLogo };
      onChange(data.logo.url);
    } catch {
      toastError("Logo upload failed. Try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/30">
        {value ? (
          shouldUseNextImage(value) ? (
            <Image
              src={value}
              alt={previewAlt}
              fill
              unoptimized={value.startsWith("/")}
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <img
              src={value}
              alt={previewAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        ) : (
          <span className="select-none font-mono text-[10px] uppercase text-muted-foreground">
            {emptyLabel}
          </span>
        )}
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Loader2 className="size-4 animate-spin text-primary" />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
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
          {uploading
            ? "Uploading…"
            : value
              ? `Replace ${emptyLabel.toLowerCase()}`
              : `Upload ${emptyLabel.toLowerCase()}`}
        </Button>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="font-mono text-[10px] uppercase"
            disabled={uploading}
            onClick={handleRemove}
          >
            <Trash2 className="size-3.5" />
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}
