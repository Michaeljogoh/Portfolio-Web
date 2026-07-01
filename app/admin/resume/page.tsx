import { AdminShell } from "@/components/admin/admin-shell";
import { ResumeAdmin } from "@/components/admin/resume-admin";

export default function AdminResumePage() {
  return (
    <AdminShell title="Resume / CV">
      <ResumeAdmin />
    </AdminShell>
  );
}
