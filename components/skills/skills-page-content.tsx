"use client";

import { Code2, Cloud, Bot, ShieldCheck } from "lucide-react";
import { ScrollRevealItem } from "@/components/motion/scroll-reveal-item";
import { SkillStackIcon } from "@/components/skills/skill-stack-icon";
import type { SkillGroup } from "@/lib/portfolio-types";

const capabilityTiles = [
  { label: "FULL_STACK_ENG", Icon: Code2 },
  { label: "DEVOPS_CLOUD", Icon: Cloud },
  { label: "AI_AUTOMATION", Icon: Bot },
  { label: "SECURE_SYSTEMS", Icon: ShieldCheck },
] as const;

type Props = {
  skills: SkillGroup[];
};

export function SkillsPageContent({ skills }: Props) {
  return (
    <div className="grid md:grid-cols-12 gap-12">
      <div className="md:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          {capabilityTiles.map(({ label, Icon }) => (
            <ScrollRevealItem key={label}>
              <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
                <Icon className="h-8 w-8 mb-2 text-primary" />
                <span className="font-mono text-xs">{label}</span>
              </div>
            </ScrollRevealItem>
          ))}
        </div>
      </div>

      <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
        {skills.map((skillGroup) => (
          <ScrollRevealItem key={skillGroup.id ?? skillGroup.category}>
            <div className="space-y-6">
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
                      <SkillStackIcon skill={skill.name} iconUrl={skill.iconUrl} />
                      {skill.name}
                    </span>
                    <div className="h-[2px] w-12 bg-secondary group-hover:bg-primary transition-colors" />
                  </li>
                ))}
              </ul>
            </div>
          </ScrollRevealItem>
        ))}
      </div>
    </div>
  );
}
