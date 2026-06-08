"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
  showIndicator = false,
}: NavLinkProps & { showIndicator?: boolean }) {
  const active = isNavActive(pathname, href);
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative transition-colors",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-primary",
        className,
      )}
    >
      {label}
      {active && showIndicator && !prefersReducedMotion ? (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : active ? (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
      ) : null}
    </Link>
  );
}

export function SiteHeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <>
      <nav
        className="hidden md:flex flex-1 min-w-0 justify-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium"
        aria-label="Primary"
      >
        {nav.map(({ href, label }) => (
          <NavLink
            key={href}
            pathname={pathname}
            href={href}
            label={label}
            className="shrink-0"
            showIndicator
          />
        ))}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
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
          <Button
            variant="default"
            className="mt-auto w-full font-mono text-xs border-primary/50"
            asChild
          >
            <Link href="/contact" onClick={closeSheet}>
              Resume / CV
            </Link>
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
