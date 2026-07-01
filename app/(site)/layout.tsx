import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getResumeDownloads } from "@/lib/data/resume";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resumeDownloads = await getResumeDownloads();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden flex flex-col">
      <SiteHeader resumeDownloads={resumeDownloads} />
      <main className="flex-1 w-full">{children}</main>
      <SiteFooter />
    </div>
  );
}
