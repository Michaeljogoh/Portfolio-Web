"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProjectMedia as ProjectMediaType } from "@/lib/project-media";
import { buildProjectImageSrc } from "@/lib/cloudinary-url";

type ProjectMediaVariant = "default" | "row" | "feature";

type ProjectMediaProps = {
  media: ProjectMediaType;
  alt: string;
  wrapperClassName?: string;
  variant?: ProjectMediaVariant;
  priority?: boolean;
};

export function ProjectMedia({
  media,
  alt,
  wrapperClassName,
  variant = "default",
  priority = false,
}: ProjectMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isFeature = variant === "feature";
  const isRow = variant === "row" || isFeature;

  useEffect(() => {
    const node = containerRef.current;
    if (!node || media.type !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false);
      },
      { threshold: isFeature ? 0.3 : 0.25, rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [media.type, isFeature]);

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
      ? buildProjectImageSrc(
          media,
          isFeature ? 1280 : isRow ? 1120 : 960,
          isFeature ? 800 : isRow ? 840 : 720,
        )
      : media.posterUrl ?? media.url;

  const aspectClass = isFeature
    ? "aspect-[16/10] w-full"
    : isRow
      ? "aspect-video min-h-52"
      : "aspect-square";

  const objectClass = isFeature
    ? "object-contain object-center"
    : "object-cover";

  const sizes = isFeature
    ? "(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
    : isRow
      ? "(min-width: 1024px) 560px, (min-width: 640px) 55vw, 100vw"
      : "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw";

  const mediaSurface = (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden transition-opacity duration-500 ease-out",
        isFeature ? "bg-muted/20" : "bg-muted/40",
        aspectClass,
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
              priority={priority}
              unoptimized={!media.posterUrl.includes("cloudinary.com")}
              onLoad={() => setLoaded(true)}
              className={cn(
                objectClass,
                "transition-opacity duration-300 ease-out",
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
            preload={isFeature ? "auto" : "metadata"}
            onLoadedData={() => setLoaded(true)}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-300 ease-out",
              objectClass,
              showVideo ? "opacity-100" : "opacity-0",
            )}
          />
        </>
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          unoptimized={imageSrc.startsWith("/")}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={cn(objectClass, "transition-transform duration-500 ease-out")}
        />
      )}
    </div>
  );

  if (isFeature) {
    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-[1.35rem] bg-primary/15 blur-2xl sm:-inset-4"
        />
        <div className="relative rounded-2xl bg-linear-to-br from-primary/50 via-primary/25 to-foreground/10 p-[3px] shadow-[0_28px_80px_-32px] shadow-primary/30">
          <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-background">
            {mediaSurface}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/40 transition-opacity duration-500",
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
              "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]",
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
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/3 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:bg-white/4" />
    </div>
  );
}
