import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { getSkillGroups } from "@/lib/data/portfolio";
import { SkillsPageContent } from "@/components/skills/skills-page-content";
import {
  AnimatedPageHeader,
  PageHeaderMeta,
} from "@/components/motion/animated-page-header";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frameworks, data stores, cloud, and DevOps tooling used in production.",
};

export default async function SkillsPage() {
  const skills = await getSkillGroups();
  const domainCount = skills.length;
  const toolCount = skills.reduce((n, g) => n + g.items.length, 0);

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
            <span className="text-primary">Skills</span>
            <span className="hidden text-border sm:inline" aria-hidden>
              //
            </span>
            <span className="hidden tabular-nums text-muted-foreground sm:inline">
              {String(domainCount).padStart(2, "0")} domains ·{" "}
              {String(toolCount).padStart(2, "0")} tools
            </span>
          </div>
        }
        title="TECH"
        accent="STACK"
        meta={<PageHeaderMeta label="Capability map" />}
        scope={
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Languages, frameworks, data stores, and cloud tooling I use in
            production — plus GraphQL, REST, Kafka, RabbitMQ, WebSockets, and
            LLM integrations where the product needs them.
          </p>
        }
      />

      <SkillsPageContent skills={skills} />
    </Container>
  );
}
