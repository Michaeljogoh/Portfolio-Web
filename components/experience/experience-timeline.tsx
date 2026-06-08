"use client";

import Image from "next/image";
import { ScrollRevealItem } from "@/components/motion/scroll-reveal-item";
import type { ExperienceEntry } from "@/lib/portfolio-types";

function companyInitials(company: string | null): string {
  if (!company?.trim()) return "—";
  const parts = company.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0]![0];
    const b = parts[1]![0];
    if (a && b) return (a + b).toUpperCase();
  }
  const word = parts[0] ?? company;
  return word.slice(0, 2).toUpperCase();
}

function parseRoleTitle(title: string): {
  role: string;
  company: string | null;
} {
  const sep = " — ";
  const i = title.indexOf(sep);
  if (i === -1) return { role: title, company: null };
  return {
    role: title.slice(0, i).trim(),
    company: title.slice(i + sep.length).trim(),
  };
}

type Props = {
  entries: ExperienceEntry[];
};

function ExperienceLogoSlot({
  logo,
  company,
}: {
  logo?: string | null;
  company: string | null;
}) {
  const label = company ? `${company} logo` : "Company logo";
  const initials = companyInitials(company);

  return (
    <div className="relative flex size-14 rounded-md shrink-0 items-center justify-center overflow-hidden border border-border bg-muted/30 md:size-16">
      {logo ? (
        <Image
          src={logo}
          alt={label}
          fill
          unoptimized={logo.startsWith("/")}
          className="object-cover"
          sizes="(min-width: 768px) 64px, 56px"
        />
      ) : (
        <span
          aria-hidden
          className="select-none font-mono text-xs font-semibold tracking-tighter text-muted-foreground md:text-sm"
        >
          {initials}
        </span>
      )}
    </div>
  );
}

export function ExperienceTimeline({ entries }: Props) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[0.65rem] top-2 bottom-2 w-px bg-border md:left-[0.85rem]"
      />
      <ol className="relative m-0 list-none space-y-10 p-0 md:space-y-12">
        {entries.map((entry, index) => {
          const { role, company } = parseRoleTitle(entry.title);
          return (
            <ScrollRevealItem
              as="li"
              key={entry.id ?? `${entry.title}-${entry.date}`}
              className="relative pl-10 md:pl-14"
            >
              <span
                aria-hidden
                className="absolute left-1.5 top-1.5 z-[1] size-3 rounded-full border-2 border-primary bg-background shadow-[0_0_0_4px_hsl(var(--background))] md:top-2 md:size-3.5"
              />
              <article className="group border border-border bg-card/20 p-5 transition-colors duration-300 hover:border-primary/40 hover:bg-card/35 md:p-7">
                <div className="mb-4 flex flex-col gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="flex min-w-0 gap-4 sm:gap-5">
                    <ExperienceLogoSlot logo={entry.logo} company={company} />
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl leading-tight tracking-tight text-balance transition-colors group-hover:text-primary md:text-2xl">
                        {role}
                      </h2>
                      {company ? (
                        <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground md:text-sm">
                          {company}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-muted-foreground sm:text-right md:text-xs">
                    <p className="tabular-nums text-foreground/90">
                      {entry.date}
                    </p>
                    <p className="mt-1 max-w-[16rem] text-muted-foreground sm:ml-auto">
                      {entry.readTime}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {entry.excerpt}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-border group-hover:text-primary/60">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(entries.length).padStart(2, "0")}
                </p>
              </article>
            </ScrollRevealItem>
          );
        })}
      </ol>
    </div>
  );
}
