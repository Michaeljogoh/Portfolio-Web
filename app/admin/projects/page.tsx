import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectsAdmin } from "@/components/admin/projects-admin";

export default function AdminProjectsPage() {
  return (
    <AdminShell title="Projects">
      <ProjectsAdmin />
    </AdminShell>
  );
}
