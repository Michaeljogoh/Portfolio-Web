"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { DURATION, EASE_OUT, slideUpOnScroll } from "@/components/motion/presets";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CertificationCategoryBadges,
  CertificationSkillBadges,
} from "@/components/certifications/certification-badges";
import { CertificationImage } from "@/components/certifications/certification-image";
import type { Certification } from "@/lib/portfolio-types";

type Props = {
  cert: Certification;
};

const cardMotion = {
  hidden: slideUpOnScroll.hidden,
  visible: slideUpOnScroll.visible,
  exit: { opacity: 0, y: -8 },
};

const MotionCard = motion.create(Card);

export function CertificationGridCard({ cert }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const ready = useAnimationReady();
  const isExternal = cert.credentialUrl.startsWith("http");

  const cardClassName =
    "group grid grid-rows-subgrid row-span-3 content-start items-start gap-0 overflow-hidden rounded-none border-border bg-card p-0 shadow-none transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_16px_48px_-28px] hover:shadow-primary/10";

  const content = (
    <>
      <CertificationImage src={cert.image} alt={cert.title} variant="grid" />
      <div className="grid gap-4">
        <CardHeader className="mt-2 grid gap-3">
          <CardTitle className="text-2xl font-display leading-tight transition-colors group-hover:text-primary">
            {cert.title}
          </CardTitle>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {cert.issuer}
            <span className="text-border"> · </span>
            <span className="tabular-nums text-foreground/80">{cert.issued}</span>
          </p>
          <CertificationCategoryBadges cert={cert} />
          <CertificationSkillBadges cert={cert} />
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-base leading-relaxed">
            {cert.excerpt}
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter className="flex justify-start py-4">
        <Button
          asChild
          variant="outline"
          className="h-9 rounded-lg border-border/80 bg-background px-4 font-mono text-xs uppercase tracking-wide active:scale-[0.98]"
        >
          <Link
            href={cert.credentialUrl}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2"
          >
            View credential
            <ExternalLink className="size-3.5" aria-hidden />
          </Link>
        </Button>
      </CardFooter>
    </>
  );

  if (prefersReducedMotion) {
    return <Card className={cardClassName}>{content}</Card>;
  }

  return (
    <MotionCard
      layout
      variants={cardMotion}
      initial="hidden"
      whileInView={ready ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.2 }}
      exit="exit"
      transition={{ duration: DURATION.scroll, ease: EASE_OUT }}
      className={cardClassName}
    >
      {content}
    </MotionCard>
  );
}
