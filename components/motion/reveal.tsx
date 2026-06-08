"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import {
  DURATION,
  EASE_OUT,
  fadeIn,
  fadeUp,
  scaleIn,
  slideUpOnScroll,
} from "./presets";

type RevealVariant = "fade-up" | "fade-in" | "scale-in" | "slide-up";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  once?: boolean;
  amount?: number;
};

const variants = {
  "fade-up": fadeUp,
  "fade-in": fadeIn,
  "scale-in": scaleIn,
  "slide-up": slideUpOnScroll,
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  duration = DURATION.scroll,
  variant = "slide-up",
  once = true,
  amount = 0.15,
}: RevealProps) {
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
      variants={variants[variant]}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
