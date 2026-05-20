import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { getProjects } from "@/lib/data/portfolio";
import { ProjectsFilteredGrid } from "@/components/projects/projects-filtered-grid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work — filter by category or search APIs, automation, AI, and cloud projects.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Container
      component="section"
      siteWidth="content"
      wrapperClassName="py-24 md:py-28 border-b border-border/50"
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
              <span className="text-primary">Projects</span>
              <span className="hidden text-border sm:inline" aria-hidden>
                //
              </span>
              <span className="hidden tabular-nums text-muted-foreground sm:inline">
                {String(projects.length).padStart(2, "0")} entries
              </span>
            </div>

            <h1 className="font-display text-4xl tracking-tighter leading-[0.92] md:text-6xl lg:text-7xl">
              <span className="block">SELECTED</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-foreground">
                WORKS
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-1 w-16 shrink-0 bg-primary md:w-24" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Portfolio index
              </p>
            </div>
          </div>

          <div className="relative lg:border-l lg:border-border/70 lg:pl-10">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">
              Scope
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Production-minded builds and experiments — use category filters or
              search to surface stack, domain, and how each piece ships.
            </p>
          </div>
        </div>
      </header>

      <ProjectsFilteredGrid projects={projects} />
    </Container>
  );
}
