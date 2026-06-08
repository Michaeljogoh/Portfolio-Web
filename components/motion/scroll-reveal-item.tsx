"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import { DURATION, EASE_OUT, slideUpOnScroll } from "./presets";

type ScrollRevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  delay?: number;
  amount?: number;
};

export function ScrollRevealItem({
  children,
  className,
  as = "div",
  delay = 0,
  amount = 0.2,
}: ScrollRevealItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const ready = useAnimationReady();

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag =
    as === "li" ? motion.li : as === "article" ? motion.article : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView={ready ? "visible" : "hidden"}
      viewport={{ once: true, amount }}
      variants={slideUpOnScroll}
      transition={{ duration: DURATION.scroll, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}
