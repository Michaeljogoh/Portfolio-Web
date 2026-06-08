"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useAnimationReady } from "@/hooks/use-animation-ready";
import { DURATION, EASE_OUT, staggerContainer } from "./presets";

type AnimatedPageHeaderProps = {
  breadcrumb: ReactNode;
  title: ReactNode;
  accent: ReactNode;
  meta?: ReactNode;
  scopeLabel?: string;
  scope?: ReactNode;
  className?: string;
};

export function AnimatedPageHeader({
  breadcrumb,
  title,
  accent,
  meta,
  scopeLabel = "Scope",
  scope,
  className,
}: AnimatedPageHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const ready = useAnimationReady();

  if (prefersReducedMotion) {
    return (
      <header
        className={`relative mb-12 border border-border bg-card/25 p-6 md:mb-16 md:p-10 lg:p-12 ${className ?? ""}`}
      >
        <HeaderChrome />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
          <div>
            <div className="mb-6">{breadcrumb}</div>
            <h1 className="font-display text-4xl tracking-tighter leading-[0.92] md:text-6xl lg:text-7xl">
              <span className="block">{title}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-foreground">
                {accent}
              </span>
            </h1>
            {meta ? <div className="mt-6">{meta}</div> : null}
          </div>
          {scope ? (
            <div className="relative lg:border-l lg:border-border/70 lg:pl-10">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">
                {scopeLabel}
              </p>
              {scope}
            </div>
          ) : null}
        </div>
      </header>
    );
  }

  return (
    <motion.header
      className={`relative mb-12 border border-border bg-card/25 p-6 md:mb-16 md:p-10 lg:p-12 ${className ?? ""}`}
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
      variants={staggerContainer(0.14, 0.1)}
    >
      <HeaderChrome />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
        <div>
          <motion.div
            className="mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: DURATION.hero, ease: EASE_OUT }}
          >
            {breadcrumb}
          </motion.div>

          <h1 className="font-display text-4xl tracking-tighter leading-[0.92] md:text-6xl lg:text-7xl">
            <motion.span
              className="block"
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: DURATION.hero, ease: EASE_OUT }}
            >
              {title}
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-foreground"
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: DURATION.hero, ease: EASE_OUT }}
            >
              {accent}
            </motion.span>
          </h1>

          {meta ? (
            <motion.div
              className="mt-6"
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1 },
              }}
              style={{ originX: 0 }}
              transition={{ duration: DURATION.hero, ease: EASE_OUT }}
            >
              {meta}
            </motion.div>
          ) : null}
        </div>

        {scope ? (
          <motion.div
            className="relative lg:border-l lg:border-border/70 lg:pl-10"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: DURATION.hero, ease: EASE_OUT }}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">
              {scopeLabel}
            </p>
            {scope}
          </motion.div>
        ) : null}
      </div>
    </motion.header>
  );
}

export function HeaderChrome() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-primary/[0.04]"
      />
      <div className="pointer-events-none absolute left-3 top-3 size-4 border-t-2 border-l-2 border-primary md:left-4 md:top-4" />
      <div className="pointer-events-none absolute right-3 top-3 size-4 border-t-2 border-r-2 border-primary md:right-4 md:top-4" />
      <div className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-primary md:bottom-4 md:left-4" />
      <div className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-primary md:bottom-4 md:right-4" />
    </>
  );
}

export function PageHeaderMeta({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-1 w-16 shrink-0 bg-primary md:w-24" />
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
