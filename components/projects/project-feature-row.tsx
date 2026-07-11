"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { DURATION, EASE_OUT, slideUpOnScroll } from "@/components/motion/presets";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import { Button } from "@/components/ui/button";
import { ProjectMedia } from "@/components/project-media";
import {
  ProjectCategoryBadges,
  ProjectSkillBadges,
} from "@/components/projects/project-badges";
import type { Project } from "@/lib/portfolio-types";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  index: number;
};

function ProjectFeatureCopy({ project }: { project: Project }) {
  const isExternal = project.link.startsWith("http");

  return (
    <div className="flex min-w-0 flex-col justify-center gap-5 sm:gap-6">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-display text-2xl leading-[1.12] tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-[1.1]">
          {project.title}
        </h3>
        <ProjectCategoryBadges project={project} />
      </div>

      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
        {project.description}
      </p>

      <ProjectSkillBadges project={project} />

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          asChild
          className="h-10 rounded-lg px-5 font-mono text-xs uppercase tracking-wide active:scale-[0.98]"
        >
          <Link
            href={project.link}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            View live
            <ExternalLink className="size-3.5" aria-hidden />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-10 rounded-lg border-border/80 bg-background px-5 font-mono text-xs uppercase tracking-wide active:scale-[0.98]"
        >
          <Link href={project.repo} target="_blank" rel="noopener noreferrer">
            View code
            <Github className="size-3.5" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ProjectFeatureVisual({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="min-w-0">
      <ProjectMedia
        media={project.media}
        alt={`${project.title} demo`}
        variant="feature"
        priority={index < 2}
      />
    </div>
  );
}

const rowMotion = {
  hidden: slideUpOnScroll.hidden,
  visible: slideUpOnScroll.visible,
};

const MotionSection = motion.section;

export function ProjectFeatureRow({ project, index }: Props) {
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
        <ProjectFeatureCopy project={project} />
      </div>
      <div
        className={cn(
          "order-1 min-w-0",
          mediaFirst ? "lg:order-1" : "lg:order-2",
        )}
      >
        <ProjectFeatureVisual project={project} index={index} />
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
