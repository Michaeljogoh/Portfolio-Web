import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { getProjects } from "@/lib/data/portfolio";
import { ProjectsFilteredGrid } from "@/components/projects/projects-filtered-grid";
import {
  AnimatedPageHeader,
  PageHeaderMeta,
} from "@/components/motion/animated-page-header";

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
      <AnimatedPageHeader
        breadcrumb={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
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
        }
        title="SELECTED"
        accent="WORKS"
        meta={<PageHeaderMeta label="Portfolio index" />}
        scope={
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Production-minded builds and experiments — use category filters or
            search to surface stack, domain, and how each piece ships.
          </p>
        }
      />

      <ProjectsFilteredGrid projects={projects} />
    </Container>
  );
}
