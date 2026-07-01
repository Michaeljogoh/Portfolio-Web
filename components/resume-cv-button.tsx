"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { ResumeDownload } from "@/lib/resume";
import { resumeFormatLabel } from "@/lib/resume";
import { cn } from "@/lib/utils";

type ResumeCvButtonProps = {
  downloads: ResumeDownload[];
  className?: string;
};

export function ResumeCvButton({ downloads, className }: ResumeCvButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonClassName = cn(
    "font-mono text-xs border-primary/50",
    className,
  );

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (downloads.length === 0) {
    return (
      <Button variant="default" className={buttonClassName} asChild>
        <Link href="/contact">Resume / CV</Link>
      </Button>
    );
  }

  if (downloads.length === 1) {
    const [file] = downloads;
    return (
      <Button variant="default" className={buttonClassName} asChild>
        <a href={file.downloadUrl} download={file.fileName}>
          <Download className="size-3.5" />
          Resume / CV
        </a>
      </Button>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative", className?.includes("w-full") && "w-full")}
    >
      <Button
        type="button"
        variant="default"
        className={cn(
          "font-mono text-xs border-primary/50",
          className?.includes("w-full") && "w-full",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Download className="size-3.5" />
        Resume / CV
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </Button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-40 border border-border bg-background p-1 shadow-lg"
        >
          {downloads.map((file) => (
            <a
              key={file.format}
              role="menuitem"
              href={file.downloadUrl}
              download={file.fileName}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start font-mono text-[10px] uppercase",
              )}
              onClick={() => setOpen(false)}
            >
              Download {resumeFormatLabel(file.format)}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
