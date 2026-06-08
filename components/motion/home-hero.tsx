"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import { HeaderChrome } from "./animated-page-header";
import { DURATION, EASE_OUT, staggerContainer } from "./presets";

const heroItemTransition = {
  duration: DURATION.hero,
  ease: EASE_OUT,
} as const;

const heroVariants = {
  breadcrumb: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  title: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  meta: {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1 },
  },
  scope: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
} as const;

type HomeHeroProps = {
  statusBar: ReactNode;
  breadcrumb: ReactNode;
  headline: ReactNode;
  headlineAccent?: ReactNode;
  headlineExtra?: ReactNode;
  meta?: ReactNode;
  scopeLabel?: string;
  scope?: ReactNode;
  pillars: ReactNode;
  cta: ReactNode;
};

export function HomeHero({
  statusBar,
  breadcrumb,
  headline,
  headlineAccent,
  headlineExtra,
  meta,
  scopeLabel = "Summary",
  scope,
  pillars,
  cta,
}: HomeHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const ready = useAnimationReady();

  if (prefersReducedMotion) {
    return (
      <div className="relative z-10 w-full space-y-8 md:space-y-12 lg:space-y-14">
        {statusBar}
        <header className="relative w-full border border-border bg-card/25 p-6 md:p-8 lg:p-10">
          <HeaderChrome />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
            <div>
              <div className="mb-6">{breadcrumb}</div>
              <h3 className="w-full font-display tracking-tighter leading-[0.88] text-[clamp(1.75rem,11vw,5.5rem)]">
                <span className="block text-foreground">{headline}</span>
                {headlineAccent ? (
                  <span className="block text-primary">{headlineAccent}</span>
                ) : null}
                {headlineExtra}
              </h3>
              {meta ? <div className="mt-6">{meta}</div> : null}
            </div>
            {scope ? (
              <div className="relative border-border/70 pt-8 lg:border-l lg:pl-10 lg:pt-0">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {scopeLabel}
                </p>
                {scope}
              </div>
            ) : null}
          </div>
        </header>
        {pillars}
        {cta}
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full space-y-8 md:space-y-12 lg:space-y-14">
      <motion.div
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        variants={heroVariants.breadcrumb}
        transition={heroItemTransition}
      >
        {statusBar}
      </motion.div>

      <motion.header
        className="relative w-full border border-border bg-card/25 p-6 md:p-8 lg:p-10"
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        variants={staggerContainer(0.14, 0.1)}
      >
        <HeaderChrome />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
          <div>
            <motion.div
              className="mb-6"
              variants={heroVariants.breadcrumb}
              transition={heroItemTransition}
            >
              {breadcrumb}
            </motion.div>

            <h3 className="w-full font-display tracking-tighter leading-[0.88] text-[clamp(1.75rem,11vw,5.5rem)]">
              <motion.span
                key="headline"
                className="block text-foreground"
                variants={heroVariants.title}
                transition={heroItemTransition}
              >
                {headline}
              </motion.span>
              {headlineAccent ? (
                <motion.span
                  key="headline-accent"
                  className="block text-primary"
                  variants={heroVariants.title}
                  transition={heroItemTransition}
                >
                  {headlineAccent}
                </motion.span>
              ) : null}
              {headlineExtra ? (
                <motion.span
                  key="headline-extra"
                  className="flex flex-wrap items-end gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-0"
                  variants={heroVariants.title}
                  transition={heroItemTransition}
                >
                  {headlineExtra}
                </motion.span>
              ) : null}
            </h3>

            {meta ? (
              <motion.div
                className="mt-6"
                variants={heroVariants.meta}
                style={{ originX: 0 }}
                transition={heroItemTransition}
              >
                {meta}
              </motion.div>
            ) : null}
          </div>

          {scope ? (
            <motion.div
              className="relative border-border/70 pt-8 lg:border-l lg:pl-10 lg:pt-0"
              variants={heroVariants.scope}
              transition={heroItemTransition}
            >
              <p
                key="scope-label"
                className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary"
              >
                {scopeLabel}
              </p>
              <div key="scope-content">{scope}</div>
            </motion.div>
          ) : null}
        </div>
      </motion.header>

      <motion.div
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: DURATION.normal, ease: EASE_OUT }}
      >
        {pillars}
      </motion.div>

      <motion.div
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: DURATION.normal, ease: EASE_OUT }}
      >
        {cta}
      </motion.div>
    </div>
  );
}
