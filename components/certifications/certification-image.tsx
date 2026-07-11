"use client";

import { useState } from "react";
import Image from "next/image";
import { shouldUseNextImage } from "@/lib/cloudinary-url";
import { cn } from "@/lib/utils";

type CertificationImageVariant = "row" | "grid";

type CertificationImageProps = {
  src: string;
  alt: string;
  variant?: CertificationImageVariant;
  priority?: boolean;
  className?: string;
};

export function CertificationImage({
  src,
  alt,
  variant = "grid",
  priority = false,
  className,
}: CertificationImageProps) {
  const [loaded, setLoaded] = useState(false);
  const useNextImage = shouldUseNextImage(src);
  const isRow = variant === "row";

  const sizes = isRow
    ? "(min-width: 1024px) 288px, (min-width: 640px) 40vw, 85vw"
    : "(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw";

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center bg-linear-to-br from-muted/50 via-muted/25 to-background transition-opacity duration-500 ease-out",
        isRow
          ? "min-h-[11rem] p-5 sm:min-h-[13rem] sm:p-7 lg:min-h-[15rem]"
          : "aspect-[4/3] p-4 sm:p-5",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full",
          isRow ? "aspect-[4/3] max-w-[18rem] sm:max-w-[20rem]" : "h-full",
        )}
      >
        {useNextImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={src.startsWith("/")}
            onLoad={() => setLoaded(true)}
            className="object-contain object-center"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 m-auto h-full w-full object-contain object-center"
          />
        )}
      </div>
    </div>
  );
}
