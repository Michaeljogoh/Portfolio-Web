"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/admin/form-field";
import { parseApiError, toastError, toastSuccess } from "@/lib/admin-toast";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      toastError(await parseApiError(res));
      return;
    }
    toastSuccess("Signed in");
    const from = searchParams.get("from") || "/admin";
    router.push(from.startsWith("/admin") ? from : "/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-6 border border-border bg-card/20 p-8"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Admin
        </p>
        <h1 className="font-display text-2xl tracking-tight">Sign in</h1>
      </div>
      <FormField label="Email">
        <Input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>
      <FormField label="Password">
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormField>
      <Button
        type="submit"
        className="w-full font-mono text-xs uppercase"
        disabled={loading}
      >
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
