import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { experience } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and roles across full-stack, backend, and DevOps.",
};

export default function ExperiencePage() {
  const count = experience.length;

  return (
    <Container
      component="section"
      wrapperClassName="py-24 md:py-28 border-b border-border/50"
      className="mx-auto max-w-7xl flex-1"
    >
      <header className="relative mb-12 border border-border bg-card/25 p-6 md:mb-16 md:p-10 lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-primary/[0.04]"
        />
        <div className="pointer-events-none absolute left-3 top-3 size-4 border-t-2 border-l-2 border-primary md:left-4 md:top-4" />
        <div className="pointer-events-none absolute right-3 top-3 size-4 border-t-2 border-r-2 border-primary md:right-4 md:top-4" />
        <div className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-primary md:bottom-4 md:left-4" />
        <div className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-primary md:bottom-4 md:right-4" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
              <Link
                href="/"
                className="text-foreground/80 transition-colors hover:text-primary"
              >
                Home
              </Link>
              <span className="text-border" aria-hidden>
                //
              </span>
              <span className="text-primary">Experience</span>
              <span className="hidden text-border sm:inline" aria-hidden>
                //
              </span>
              <span className="hidden tabular-nums text-muted-foreground sm:inline">
                {String(count).padStart(2, "0")} roles
              </span>
            </div>

            <h1 className="font-display text-4xl tracking-tighter leading-[0.92] md:text-6xl lg:text-7xl">
              <span className="block">CAREER</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-foreground">
                TIMELINE
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-1 w-16 shrink-0 bg-primary md:w-24" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Newest first
              </p>
            </div>
          </div>

          <div className="relative lg:border-l lg:border-border/70 lg:pl-10">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">
              Scope
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Contracts and full-time roles across the US, UK, and Nigeria —
              full-stack delivery, secure backends, and DevOps automation.
              Credentials live on{" "}
              <Link
                href="/certifications"
                className="text-foreground underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
              >
                certifications
              </Link>
              .
            </p>
          </div>
        </div>
      </header>

      <ExperienceTimeline entries={experience} />
    </Container>
  );
}
