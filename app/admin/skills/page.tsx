import { AdminShell } from "@/components/admin/admin-shell";
import { SkillsAdmin } from "@/components/admin/skills-admin";

export default function AdminSkillsPage() {
  return (
    <AdminShell title="Skills">
      <SkillsAdmin />
    </AdminShell>
  );
}
