import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";

const sections = [
  { href: "/admin/projects", label: "Projects", desc: "Add, edit, or remove portfolio projects" },
  { href: "/admin/skills", label: "Skills", desc: "Manage categories and skills with auto icons" },
  { href: "/admin/experience", label: "Experience", desc: "Update work history entries" },
  {
    href: "/admin/certifications",
    label: "Certifications",
    desc: "Manage credentials and badges",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block border border-border bg-card/20 p-6 transition-colors hover:border-primary"
          >
            <h2 className="font-display text-xl">{s.label}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
