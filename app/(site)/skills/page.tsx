import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Cloud, Bot, ShieldCheck } from "lucide-react";
import { SkillStackIcon } from "@/components/skills/skill-stack-icon";
import { Container } from "@/components/zippystarter/container";
import { getSkillGroups } from "@/lib/data/portfolio";

export const dynamic = "force-dynamic";

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
              <span className="text-primary">Skills</span>
              <span className="hidden text-border sm:inline" aria-hidden>
                //
              </span>
              <span className="hidden tabular-nums text-muted-foreground sm:inline">
                {String(domainCount).padStart(2, "0")} domains ·{" "}
                {String(toolCount).padStart(2, "0")} tools
              </span>
            </div>

            <h1 className="font-display text-4xl tracking-tighter leading-[0.92] md:text-6xl lg:text-7xl">
              <span className="block">TECH</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-foreground">
                STACK
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-1 w-16 shrink-0 bg-primary md:w-24" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Capability map
              </p>
            </div>
          </div>

          <div className="relative lg:border-l lg:border-border/70 lg:pl-10">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">
              Scope
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Languages, frameworks, data stores, and cloud tooling I use in
              production — plus GraphQL, REST, Kafka, RabbitMQ, WebSockets, and
              LLM integrations where the product needs them.
            </p>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <Code2 className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">FULL_STACK_ENG</span>
            </div>
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <Cloud className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">DEVOPS_CLOUD</span>
            </div>
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <Bot className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">AI_AUTOMATION</span>
            </div>
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <ShieldCheck className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">SECURE_SYSTEMS</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.id ?? skillGroup.category} className="space-y-6">
              <h2 className="text-xl font-display border-b border-primary/30 pb-2 inline-block">
                {skillGroup.category}
              </h2>
              <ul className="space-y-3">
                {skillGroup.items.map((skill) => (
                  <li
                    key={skill.id ?? skill.name}
                    className="flex items-center justify-between group"
                  >
                    <span className="flex min-w-0 items-center gap-2.5 font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <SkillStackIcon
                        skill={skill.name}
                        iconUrl={skill.iconUrl}
                      />
                      {skill.name}
                    </span>
                    <div className="h-[2px] w-12 bg-secondary group-hover:bg-primary transition-colors"></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
