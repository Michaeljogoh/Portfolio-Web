"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

export function SiteHeaderNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-1 min-w-0 justify-center overflow-x-auto gap-3 sm:gap-6 md:gap-8 text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap pr-1 [scrollbar-width:thin]"
      aria-label="Primary"
    >
      {nav.map(({ href, label }) => {
        const active = isNavActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 transition-colors",
              active
                ? "text-primary underline decoration-primary decoration-2 underline-offset-4"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
