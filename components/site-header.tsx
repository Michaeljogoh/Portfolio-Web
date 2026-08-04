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
      wrapperClassName="fixed top-0 left-0 w-full z-50 pt-3 md:pt-4"
      className="flex h-14 items-center gap-4 rounded-full border border-border bg-card/90 pl-5 pr-2 uppercase shadow-lg shadow-black/5 backdrop-blur-md md:h-16  md:pr-2 xl:mx-auto xl:max-w-7xl dark:shadow-black/40"
    >
      <Link
        href="/"
        className="text-xl font-bold font-mono tracking-tighter shrink-0"
      >
        Michael<span className="text-primary">_</span>Jogoh
      </Link>

      <SiteHeaderNav resumeDownloads={resumeDownloads} />

      <div className="hidden shrink-0 items-center gap-1 lg:flex">
        <ThemeToggle className="rounded-full" />
        <ResumeCvButton downloads={resumeDownloads} />
      </div>
    </Container>
  );
}
