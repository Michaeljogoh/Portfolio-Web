import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
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
      siteWidth="content"
      wrapperClassName="py-24 md:py-28 bg-card border-b border-border/50"
    >
      <div className="mx-auto max-w-2xl">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span className="mx-2 text-border">/</span>
          Contact
        </p>
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-display text-4xl">INITIATE_CONTACT</h1>
          <p className="text-muted-foreground">
            Hiring for a full-stack or backend role, or need a secure API and
            cloud deployment? Send a message below or reach out at{" "}
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

        <ContactForm />
      </div>
    </Container>
  );
}
