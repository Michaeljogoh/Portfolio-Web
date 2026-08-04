"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { ResumeCvButton } from "@/components/resume-cv-button";
import type { ResumeDownload } from "@/lib/resume";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (href === "/") return false;
  return pathname.startsWith(`${href}/`);
}

type NavLinkProps = {
  pathname: string;
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

function NavLink({
  pathname,
  href,
  label,
  className,
  onNavigate,
}: NavLinkProps) {
  const active = isNavActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "transition-colors",
        active
          ? "font-bold text-primary"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeaderNav({
  resumeDownloads,
}: {
  resumeDownloads: ResumeDownload[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <>
      <nav
        className="hidden lg:flex flex-1 min-w-0 justify-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium"
        aria-label="Primary"
      >
        {nav.map(({ href, label }) => (
          <NavLink
            key={href}
            pathname={pathname}
            href={href}
            label={label}
            className="shrink-0"
          />
        ))}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto shrink-0 rounded-full lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="uppercase">
          <SheetHeader>
            <SheetTitle className="font-mono text-left">Menu</SheetTitle>
          </SheetHeader>
          <nav
            className="flex flex-col gap-6 text-sm font-medium"
            aria-label="Primary"
          >
            {nav.map(({ href, label }) => (
              <NavLink
                key={href}
                pathname={pathname}
                href={href}
                label={label}
                onNavigate={closeSheet}
              />
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <span className="font-mono text-xs text-muted-foreground">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <ResumeCvButton downloads={resumeDownloads} className="mt-auto w-full" />
        </SheetContent>
      </Sheet>
    </>
  );
}
