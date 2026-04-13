import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/zippystarter/container";
import { SOCIAL } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for full-stack, backend, or cloud engineering opportunities.",
};

export default function ContactPage() {
  return (
    <Container
      component="section"
      className="py-24 md:py-28 bg-card border-b border-border/50"
    >
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6 text-center">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          Contact
        </p>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display mb-4">INITIATE_CONTACT</h1>
          <p className="text-muted-foreground">
            Hiring for a full-stack or backend role, or need a secure API and
            cloud deployment? Reach out at{" "}
            <a
              href={SOCIAL.email}
              className="text-primary underline-offset-4 hover:underline"
            >
              {SOCIAL.emailDisplay}
            </a>{" "}
            or{" "}
            <a
              href={SOCIAL.phoneTel}
              className="text-primary underline-offset-4 hover:underline"
            >
              {SOCIAL.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <form className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="text-xs font-mono text-muted-foreground"
              >
                NAME
              </label>
              <Input id="contact-name" name="name" placeholder="Your name" />
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
                placeholder="you@company.com"
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
              placeholder="Tell me about the role or project…"
              className="min-h-[150px]"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </Container>
  );
}
