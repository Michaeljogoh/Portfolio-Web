"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toastSuccess } from "@/lib/admin-toast";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toastSuccess("Signed out");
    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="font-mono text-[10px] uppercase"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
