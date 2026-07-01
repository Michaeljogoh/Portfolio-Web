"use client";

import { HERO_PILLARS } from "@/lib/hero-pillars";
import { Stagger, StaggerItem } from "./stagger";

export function HeroPillarsGrid() {
  return (
    <Stagger
      className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px rounded-none border border-border bg-border overflow-hidden"
      stagger={0.06}
    >
      {HERO_PILLARS.map(({ title, body, Icon }) => (
        <StaggerItem key={title}>
          <div className="group bg-background/95 backdrop-blur-sm p-5 md:p-6 flex flex-col gap-3 min-h-[140px] md:min-h-[160px] h-full transition-colors hover:bg-primary hover:text-primary-foreground">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-lg md:text-xl tracking-tight">
                {title}
              </span>
              <Icon className="size-5 md:size-6 text-primary shrink-0 transition-colors group-hover:text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed transition-colors group-hover:text-primary-foreground/85">
              {body}
            </p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
