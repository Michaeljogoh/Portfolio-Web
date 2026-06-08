import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { getExperience } from "@/lib/data/portfolio";
import {
  AnimatedPageHeader,
  PageHeaderMeta,
} from "@/components/motion/animated-page-header";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and roles across full-stack, backend, and DevOps.",
};

export default async function ExperiencePage() {
  const experience = await getExperience();
  const count = experience.length;

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
            <span className="text-primary">Experience</span>
            <span className="hidden text-border sm:inline" aria-hidden>
              //
            </span>
            <span className="hidden tabular-nums text-muted-foreground sm:inline">
              {String(count).padStart(2, "0")} roles
            </span>
          </div>
        }
        title="CAREER"
        accent="TIMELINE"
        meta={<PageHeaderMeta label="Newest first" />}
        scope={
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
        }
      />

      <ExperienceTimeline entries={experience} />
    </Container>
  );
}
