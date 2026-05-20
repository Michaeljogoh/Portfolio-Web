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
          ? "text-primary underline decoration-primary decoration-2 underline-offset-4"
          : "text-muted-foreground hover:text-primary",
        className,
      )}
    >
      {label}
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
