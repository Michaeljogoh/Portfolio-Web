import { Container } from "@/components/zippystarter/container";

/**
 * Shown while a site page streams in. Its real job is to give the App Router a
 * Suspense boundary to prefetch up to — without one, `<Link>` prefetch has
 * nothing to cache and every click blocks on the full server round trip.
 */
export default function SiteLoading() {
  return (
    <Container
      component="section"
      siteWidth="content"
      wrapperClassName="py-24 md:py-28 border-b border-border/50"
    >
      <div className="animate-pulse" aria-hidden>
        <div className="h-3 w-56 bg-muted" />
        <div className="mt-6 h-10 w-2/3 max-w-xl bg-muted md:h-14" />
        <div className="mt-6 flex items-center gap-4">
          <div className="h-1 w-16 shrink-0 bg-muted md:w-24" />
          <div className="h-3 w-32 bg-muted" />
        </div>
        <div className="mt-6 h-4 w-full max-w-2xl bg-muted" />
        <div className="mt-2 h-4 w-3/4 max-w-xl bg-muted" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-56 bg-muted" />
          ))}
        </div>
      </div>

      <p role="status" className="sr-only">
        Loading page
      </p>
    </Container>
  );
}
