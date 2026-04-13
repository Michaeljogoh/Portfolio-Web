"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const enterEase = [0.16, 1, 0.3, 1] as const;
const exitEase = [0.4, 0, 1, 1] as const;

const enterTransition = {
  delay: 0.14,
  duration: 0.5,
  ease: enterEase,
} as const;

const exitTransition = {
  delay: 0,
  duration: 0.22,
  ease: exitEase,
} as const;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="contents">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="w-full origin-top"
        initial={{ opacity: 0, y: 36, scale: 0.94 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: enterTransition,
        }}
        exit={{
          opacity: 0,
          y: -18,
          scale: 0.97,
          transition: exitTransition,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
