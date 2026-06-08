"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { FrozenRouter } from "./frozen-router";
import { DURATION, EASE_IN, EASE_OUT, getRouteDirection } from "./presets";

const enterTransition = {
  duration: DURATION.normal,
  ease: EASE_OUT,
} as const;

const exitTransition = {
  duration: DURATION.fast,
  ease: EASE_IN,
} as const;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const previousPath = useRef(pathname);

  const direction = getRouteDirection(previousPath.current, pathname);

  useEffect(() => {
    previousPath.current = pathname;
  }, [pathname]);

  if (prefersReducedMotion) {
    return <div className="contents">{children}</div>;
  }

  const enterX = direction === "forward" ? 16 : direction === "backward" ? -16 : 0;
  const exitX = direction === "forward" ? -12 : direction === "backward" ? 12 : 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="w-full"
        initial={{ opacity: 0, y: 10, x: enterX, scale: 0.985 }}
        animate={{
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: enterTransition,
        }}
        exit={{
          opacity: 0,
          y: -6,
          x: exitX,
          scale: 0.99,
          transition: exitTransition,
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
