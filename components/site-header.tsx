import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { ResumeCvButton } from "@/components/resume-cv-button";
import type { ResumeDownload } from "@/lib/resume";

type SiteHeaderProps = {
  resumeDownloads: ResumeDownload[];
};

export function SiteHeader({ resumeDownloads }: SiteHeaderProps) {
  return (
    <Container
      component="header"
      siteWidth="inset"
      wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      className="flex items-center justify-between h-16 uppercase gap-4"
    >
      <Link
        href="/"
        className="text-xl font-bold font-mono tracking-tighter shrink-0"
      >
        Michael<span className="text-primary">_</span>Jogoh
      </Link>

      <div className="flex flex-1 items-center justify-end gap-2 md:min-w-0">
        <SiteHeaderNav resumeDownloads={resumeDownloads} />
        <ThemeToggle />
        <ResumeCvButton
          downloads={resumeDownloads}
          className="hidden md:inline-flex"
        />
      </div>
    </Container>
  );
}
