import type { Metadata } from "next";
import { Container } from "@/components/zippystarter/container";
import { ContactPageContent } from "@/components/contact/contact-page-content";

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
      <ContactPageContent />
    </Container>
  );
}
