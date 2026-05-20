import { AdminShell } from "@/components/admin/admin-shell";
import { CertificationsAdmin } from "@/components/admin/certifications-admin";

export default function AdminCertificationsPage() {
  return (
    <AdminShell title="Certifications">
      <CertificationsAdmin />
    </AdminShell>
  );
}
