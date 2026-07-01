import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/resume", label: "Resume" },
] as const;

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              Admin
            </p>
            <h1 className="font-display text-2xl tracking-tight">{title}</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-md border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
              >
                {label}
              </Link>
            ))}
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
