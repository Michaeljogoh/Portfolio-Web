"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import {
  DURATION,
  EASE_OUT,
  fadeUp,
  staggerContainer,
} from "./presets";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.04,
  once = true,
  amount = 0.15,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const ready = useAnimationReady();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={ready ? "visible" : "hidden"}
      viewport={{ once, amount }}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as;

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      transition={{ duration: DURATION.normal, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}
