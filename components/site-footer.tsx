import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { SOCIAL } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <Container
      component="footer"
      className="py-8 border-t border-border bg-background text-center max-w-7xl mx-auto mt-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs font-mono text-muted-foreground">
          © 2026 MICHAEL JOGOH. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 text-xs font-mono text-muted-foreground">
          <Link
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GITHUB
          </Link>
          <Link
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LINKEDIN
          </Link>
          <Link
            href={SOCIAL.email}
            className="hover:text-primary transition-colors"
          >
            EMAIL
          </Link>
        </div>
      </div>
    </Container>
  );
}
