import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Suspense fallback={<p className="font-mono text-xs">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
