import { AdminShell } from "@/components/admin/admin-shell";
import { ExperienceAdmin } from "@/components/admin/experience-admin";

export default function AdminExperiencePage() {
  return (
    <AdminShell title="Experience">
      <ExperienceAdmin />
    </AdminShell>
  );
}
