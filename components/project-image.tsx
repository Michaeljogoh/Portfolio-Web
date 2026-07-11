"use client";

import { useState } from "react";
import Image from "next/image";
import { shouldUseNextImage } from "@/lib/cloudinary-url";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Override outer wrapper sizing (default: full-width square). */
  wrapperClassName?: string;
}

const imageClassName =
  "object-cover transition-transform duration-500 group-hover:scale-[1.03]";

export function ProjectImage({
  src,
  alt,
  wrapperClassName,
}: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false);
  const useNextImage = shouldUseNextImage(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/40 transition-opacity duration-500",
        wrapperClassName ?? "aspect-square border-b border-border",
        loaded ? "opacity-100" : "opacity-0",
      )}
    >
      {useNextImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={src.startsWith("/")}
          onLoad={() => setLoaded(true)}
          className={imageClassName}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={cn("absolute inset-0 h-full w-full", imageClassName)}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/4" />
    </div>
  );
}
