import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SOCIAL } from "@/lib/portfolio-data";
import { HERO_PILLARS } from "@/lib/hero-pillars";

export default function Home() {
  return (
    <>
      <Container
        wrapperClassName="relative min-h-screen flex flex-col justify-center pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden border-b border-border/50"
        className="w-full max-w-none flex-1"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute -top-[20%] right-[-10%] h-[min(70vw,32rem)] w-[min(70vw,32rem)] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-15%] h-[min(55vw,26rem)] w-[min(55vw,26rem)] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full space-y-8 md:space-y-12 lg:space-y-14">
          <div className="flex justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              LAGOS, NG // OPEN TO REMOTE ROLES
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="rounded-md p-1.5 text-[#181717] transition-colors hover:bg-foreground/5 hover:opacity-90 dark:text-zinc-100"
              >
                <Github className="size-5" aria-hidden />
              </Link>
              <Link
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-md p-1.5 text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/10"
              >
                <Linkedin className="size-5" aria-hidden />
              </Link>
              <Link
                href={SOCIAL.email}
                aria-label="Send email"
                className="rounded-md p-1.5 text-teal-600 transition-colors hover:bg-teal-600/10 dark:text-teal-400"
              >
                <MessageCircle className="size-5" aria-hidden />
              </Link>
            </div>
          </div>

          <header className="relative w-full border border-border bg-card/25 p-6 md:p-8 lg:p-10">
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
                <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[6px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                  <span className="text-primary" aria-current="page">
                    Home
                  </span>
                  <span className="text-border" aria-hidden>
                    //
                  </span>
                  <span className="text-foreground/80">Profile</span>
                  <span className="text-border" aria-hidden>
                    //
                  </span>
                  <span className="tabular-nums">5+ yrs</span>
                </div>

                <h3 className="w-full font-display tracking-tighter leading-[0.88] text-[clamp(1.75rem,11vw,5.5rem)]">
                  <span className="block text-foreground">BACKEND</span>
                  <span className="block text-primary">FULL STACK</span>
                  <span className="flex flex-wrap items-end gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-0">
                    <span className="block text-foreground">DEVOPS</span>
                    <span className="translate-y-[-0.05em] pb-1 font-mono text-[clamp(0.85rem,2.8vw,1.5rem)] text-primary sm:pb-2 md:pb-3">
                      +
                    </span>
                    <span className="bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
                      CLOUD
                    </span>
                  </span>
                </h3>

                <div className="mt-6 flex items-center gap-4">
                  <div className="h-1 w-16 shrink-0 bg-primary md:w-24" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Current focus
                  </p>
                </div>
              </div>

              <div className="relative border-border/70 pt-8 lg:border-l lg:pl-10 lg:pt-0">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Summary
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  5+ years shipping secure, scalable systems: backend services
                  and APIs first, full-stack product work when the problem needs
                  it, and DevOps on{" "}
                  <span className="text-foreground/90 not-italic">
                    AWS, Azure,
                  </span>{" "}
                  and <span className="text-foreground/90">GCP</span>. Strong on
                  microservices, event-driven design, RBAC, and HIPAA/GDPR-aware
                  architecture.
                </p>
              </div>
            </div>
          </header>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px rounded-none border border-border bg-border overflow-hidden">
            {HERO_PILLARS.map(({ title, body, Icon }) => (
              <div
                key={title}
                className="group bg-background/95 backdrop-blur-sm p-5 md:p-6 flex flex-col gap-3 min-h-[140px] md:min-h-[160px] hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg md:text-xl tracking-tight">
                    {title}
                  </span>
                  <Icon className="size-5 md:size-6 text-primary/80 shrink-0 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 w-full border-t border-border/60 pt-8 md:pt-10">
            <Link
              href="/projects"
              className={cn(
                "uppercase w-full sm:w-auto justify-center sm:justify-start",
                buttonVariants({ size: "lg" }),
              )}
            >
              View projects <ArrowRight className="size-4" />
            </Link>
            <div className="flex gap-2 sm:ml-auto">
              <Link
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                )}
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                )}
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={SOCIAL.email}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                )}
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
