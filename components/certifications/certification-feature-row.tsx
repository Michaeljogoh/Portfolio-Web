"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { DURATION, EASE_OUT, slideUpOnScroll } from "@/components/motion/presets";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import { Button } from "@/components/ui/button";
import {
  CertificationCategoryBadges,
  CertificationSkillBadges,
} from "@/components/certifications/certification-badges";
import { CertificationImage } from "@/components/certifications/certification-image";
import type { Certification } from "@/lib/portfolio-types";
import { cn } from "@/lib/utils";

type Props = {
  cert: Certification;
  index: number;
};

function CertificationFeatureCopy({ cert }: { cert: Certification }) {
  const isExternal = cert.credentialUrl.startsWith("http");

  return (
    <div className="flex min-w-0 flex-col justify-center gap-5 sm:gap-6">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-display text-2xl leading-[1.12] tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-[1.1]">
          {cert.title}
        </h3>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
          {cert.issuer}
          <span className="text-border"> · </span>
          <span className="tabular-nums text-foreground/80">{cert.issued}</span>
        </p>
        <CertificationCategoryBadges cert={cert} />
      </div>

      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
        {cert.excerpt}
      </p>

      <CertificationSkillBadges cert={cert} />

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          asChild
          className="h-10 rounded-lg px-5 font-mono text-xs uppercase tracking-wide active:scale-[0.98]"
        >
          <Link
            href={cert.credentialUrl}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            View credential
            <ExternalLink className="size-3.5" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}

const rowMotion = {
  hidden: slideUpOnScroll.hidden,
  visible: slideUpOnScroll.visible,
};

const MotionSection = motion.section;

export function CertificationFeatureRow({ cert, index }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const ready = useAnimationReady();
  const mediaFirst = index % 2 === 0;

  const content = (
    <>
      <div
        className={cn(
          "order-2 min-w-0",
          mediaFirst ? "lg:order-2" : "lg:order-1",
        )}
      >
        <CertificationFeatureCopy cert={cert} />
      </div>
      <div
        className={cn(
          "order-1 min-w-0",
          mediaFirst ? "lg:order-1" : "lg:order-2",
        )}
      >
        <div className="relative min-w-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[1.35rem] bg-primary/10 blur-2xl sm:-inset-4"
          />
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_20px_60px_-36px] shadow-primary/20">
            <CertificationImage
              src={cert.image}
              alt={`${cert.title} badge`}
              variant="row"
              priority={index < 2}
            />
          </div>
        </div>
      </div>
    </>
  );

  const className =
    "group grid w-full grid-cols-1 items-center gap-8 py-12 first:pt-4 last:pb-4 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16 xl:gap-20";

  if (prefersReducedMotion) {
    return <section className={className}>{content}</section>;
  }

  return (
    <MotionSection
      variants={rowMotion}
      initial="hidden"
      whileInView={ready ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: DURATION.scroll,
        ease: EASE_OUT,
        delay: index * 0.04,
      }}
      className={className}
    >
      {content}
    </MotionSection>
  );
}
