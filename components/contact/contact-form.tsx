"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parseApiError, toastError, toastSuccess } from "@/lib/admin-toast";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, website }),
    });

    setLoading(false);

    if (!res.ok) {
      toastError(await parseApiError(res));
      return;
    }

    toastSuccess("Message sent — I'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
    setWebsite("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-xs font-mono text-muted-foreground"
          >
            NAME
          </label>
          <Input
            id="contact-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="text-xs font-mono text-muted-foreground"
          >
            EMAIL
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            disabled={loading}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="text-xs font-mono text-muted-foreground"
        >
          MESSAGE
        </label>
        <Textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about the role or project…"
          className="min-h-[150px]"
          required
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "SENDING…" : "SEND MESSAGE"}
      </Button>
    </form>
  );
}
