import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { getCertifications } from "@/lib/data/portfolio";
import { CertificationsFilteredGrid } from "@/components/certifications/certifications-filtered-grid";
import {
  AnimatedPageHeader,
  PageHeaderMeta,
} from "@/components/motion/animated-page-header";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Credentials and assessments — filter by category or search issuers, skills, and topics.",
};

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <Container
      component="section"
      siteWidth="content"
      wrapperClassName="py-24 md:py-28 border-b border-border/50"
    >
      <AnimatedPageHeader
        breadcrumb={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
            <Link
              href="/"
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              Home
            </Link>
            <span className="text-border" aria-hidden>
              //
            </span>
            <span className="text-primary">Certifications</span>
            <span className="hidden text-border sm:inline" aria-hidden>
              //
            </span>
            <span className="hidden tabular-nums text-muted-foreground sm:inline">
              {String(certifications.length).padStart(2, "0")} entries
            </span>
          </div>
        }
        title="CREDENTIALS"
        accent="& PROOF"
        meta={<PageHeaderMeta label="Learning index" />}
        scope={
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Formal certs and scored assessments — filter by domain or search
            issuer, stack, and keywords. Link out to credentials when URLs are
            public.
          </p>
        }
      />

      <Reveal delay={0.1}>
        <CertificationsFilteredGrid certifications={certifications} />
      </Reveal>
    </Container>
  );
}
