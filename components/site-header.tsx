import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";
import { SiteHeaderNav } from "@/components/site-header-nav";

export function SiteHeader() {
  return (
    <Container
      component="header"
      wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      className="mx-auto max-w-7xl flex items-center justify-between h-16 uppercase gap-4"
    >
      <Link
        href="/"
        className="text-xl font-bold font-mono tracking-tighter shrink-0"
      >
        Michael<span className="text-primary">_</span>Jogoh
      </Link>
      <SiteHeaderNav />

      <Button
        variant="default"
        className="font-mono text-[10px] xs:text-xs border-primary/50  shrink-0 px-2 sm:px-3"
        asChild
      >
        <Link href="/contact">Resume / CV</Link>
      </Button>
    </Container>
  );
}
