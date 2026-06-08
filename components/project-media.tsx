"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProjectMedia as ProjectMediaType } from "@/lib/project-media";
import { buildProjectImageSrc } from "@/lib/cloudinary-url";

type ProjectMediaProps = {
  media: ProjectMediaType;
  alt: string;
  wrapperClassName?: string;
};

export function ProjectMedia({
  media,
  alt,
  wrapperClassName,
}: ProjectMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || media.type !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false);
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [media.type]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || media.type !== "video") return;

    if (prefersReducedMotion || !inView) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      /* autoplay may be blocked until user interaction */
    });
  }, [inView, media.type, prefersReducedMotion]);

  const showVideo =
    media.type === "video" && !prefersReducedMotion && inView;

  const imageSrc =
    media.type === "image"
      ? buildProjectImageSrc(media, 960, 720)
      : media.posterUrl ?? media.url;

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-primary relative overflow-hidden transition-opacity duration-500",
        wrapperClassName ?? "aspect-square border-b border-border",
        loaded || media.type === "video" ? "opacity-100" : "opacity-0",
      )}
    >
      {media.type === "video" ? (
        <>
          {media.posterUrl ? (
            <Image
              src={media.posterUrl}
              alt={alt}
              fill
              unoptimized={!media.posterUrl.includes("cloudinary.com")}
              onLoad={() => setLoaded(true)}
              className={cn(
                "object-cover transition-opacity duration-300",
                showVideo ? "opacity-0" : "opacity-100",
              )}
            />
          ) : null}
          <video
            ref={videoRef}
            src={media.url}
            poster={media.posterUrl}
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
              showVideo ? "opacity-100" : "opacity-0",
            )}
          />
        </>
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          unoptimized={imageSrc.startsWith("/")}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          onLoad={() => setLoaded(true)}
          className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale mix-blend-luminosity dark:mix-blend-darken"
        />
      )}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
