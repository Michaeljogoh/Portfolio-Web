"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Search,
  LayoutList,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Certification } from "@/lib/portfolio-data";
import {
  CERTIFICATION_CATEGORIES,
  type CertificationCategoryId,
  getCertificationCategoryLabel,
} from "@/lib/cert-categories";
import { ProjectImage } from "@/components/project-image";
import { cn } from "@/lib/utils";

function matchesSearch(cert: Certification, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    cert.title,
    cert.excerpt,
    cert.issuer,
    cert.issued,
    ...cert.tags,
    ...cert.categories.map((id) => getCertificationCategoryLabel(id)),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function matchesCategories(
  cert: Certification,
  selected: ReadonlySet<CertificationCategoryId>,
): boolean {
  if (selected.size === 0) return true;
  return cert.categories.some((c) => selected.has(c));
}

const SEARCH_DEBOUNCE_MS = 300;
const PAGE_SIZE = 6;
const CARD_VIEW_STORAGE_KEY = "portfolio-certifications-card-view";

export type CertificationCardViewMode = "row" | "grid";

type Props = {
  certifications: Certification[];
};

function CertCategoryBadges({ cert }: { cert: Certification }) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {cert.categories.map((cid) => (
        <Badge
          key={cid}
          variant="outline"
          className="font-mono text-[10px] uppercase tracking-tight border-primary/30 text-muted-foreground"
        >
          {getCertificationCategoryLabel(cid)}
        </Badge>
      ))}
    </div>
  );
}

function CertTagBadges({ cert }: { cert: Certification }) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {cert.tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="font-mono text-[11px] sm:text-xs"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function CredentialLink({
  cert,
  className,
}: {
  cert: Certification;
  className?: string;
}) {
  return (
    <Link
      href={cert.credentialUrl}
      target={cert.credentialUrl.startsWith("http") ? "_blank" : undefined}
      rel={
        cert.credentialUrl.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      className={cn(
        "font-display transition-colors hover:text-primary flex items-center gap-2",
        className,
      )}
    >
      CREDENTIAL <ExternalLink className="size-3" />
    </Link>
  );
}

export function CertificationsFilteredGrid({
  certifications: allCerts,
}: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    Set<CertificationCategoryId>
  >(() => new Set());

  useEffect(() => {
    if (search.trim() === "") {
      setDebouncedSearch("");
      return;
    }
    const id = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [search]);

  const filtered = useMemo(() => {
    return allCerts.filter(
      (c) =>
        matchesSearch(c, debouncedSearch) &&
        matchesCategories(c, selectedCategories),
    );
  }, [allCerts, debouncedSearch, selectedCategories]);

  const hasActiveFilters =
    search.trim().length > 0 || selectedCategories.size > 0;

  const searchPending = search.trim() !== debouncedSearch.trim();

  const clearFilters = useCallback(() => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedCategories(new Set());
  }, []);

  const toggleCategory = useCallback((id: CertificationCategoryId) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const [cardView, setCardView] = useState<CertificationCardViewMode>("row");
  const [cardViewReady, setCardViewReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CARD_VIEW_STORAGE_KEY);
      if (stored === "grid" || stored === "row") {
        setCardView(stored);
      }
    } catch {
      /* ignore */
    }
    setCardViewReady(true);
  }, []);

  useEffect(() => {
    if (!cardViewReady) return;
    try {
      localStorage.setItem(CARD_VIEW_STORAGE_KEY, cardView);
    } catch {
      /* ignore */
    }
  }, [cardView, cardViewReady]);

  const [page, setPage] = useState(1);
  const resultsAnchorRef = useRef<HTMLDivElement>(null);
  const skipInitialScrollRef = useRef(true);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
    [filtered.length],
  );

  const pagedFiltered = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [filtered]);

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false;
      return;
    }
    if (totalPages <= 1) return;
    resultsAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page, totalPages]);

  const rangeStart = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filtered.length);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full space-y-1 lg:max-w-md">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, issuer, tags, or category…"
                className="pl-9 font-mono text-sm"
                aria-label="Search certifications"
                aria-busy={searchPending}
              />
            </div>
          </div>
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 font-mono text-xs uppercase self-start lg:self-auto"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          ) : null}
        </div>

        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={selectedCategories.size === 0 ? "default" : "outline"}
              className="font-mono text-xs"
              onClick={() => setSelectedCategories(new Set())}
              aria-pressed={selectedCategories.size === 0}
            >
              All
            </Button>
            {CERTIFICATION_CATEGORIES.map(({ id, label }) => {
              const active = selectedCategories.has(id);
              return (
                <Button
                  key={id}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  className="font-mono text-xs text-left h-auto min-h-9 py-2 whitespace-normal sm:whitespace-nowrap"
                  onClick={() => toggleCategory(id)}
                  aria-pressed={active}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            {totalPages > 1 ? (
              <>
                <span className="text-foreground tabular-nums">
                  {rangeStart}–{rangeEnd}
                </span>{" "}
                of{" "}
                <span className="text-foreground tabular-nums">
                  {filtered.length}
                </span>{" "}
                matches
                <span className="text-border"> · </span>
              </>
            ) : null}
            <span className="text-foreground tabular-nums">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="text-foreground tabular-nums">
              {allCerts.length}
            </span>{" "}
            certifications
          </p>
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Certification card layout"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              View
            </span>
            <Button
              type="button"
              size="sm"
              variant={cardView === "row" ? "default" : "outline"}
              className="h-8 gap-1.5 px-2.5 font-mono text-xs sm:px-3"
              onClick={() => setCardView("row")}
              aria-pressed={cardView === "row"}
              title="Compact rows — image and details side by side"
            >
              <LayoutList className="size-3.5 shrink-0" aria-hidden />
              <span className="hidden sm:inline">Rows</span>
            </Button>
            <Button
              type="button"
              size="sm"
              variant={cardView === "grid" ? "default" : "outline"}
              className="h-8 gap-1.5 px-2.5 font-mono text-xs sm:px-3"
              onClick={() => setCardView("grid")}
              aria-pressed={cardView === "grid"}
              title="Grid tiles — large square image"
            >
              <LayoutGrid className="size-3.5 shrink-0" aria-hidden />
              <span className="hidden sm:inline">Grid</span>
            </Button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-none border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
          <p className="font-display text-lg text-muted-foreground">
            No certifications match your filters.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search or clear category filters.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6 font-mono text-xs uppercase"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <div ref={resultsAnchorRef} className="scroll-mt-24" aria-hidden />
          {cardView === "row" ? (
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
              {pagedFiltered.map((cert) => (
                <Card
                  key={`${cert.title}-${cert.issued}`}
                  className="group grid min-h-0 w-full grid-cols-1 overflow-hidden rounded-none border-border bg-card p-0 transition-all duration-300 hover:border-primary/50 sm:min-h-[11rem] sm:grid-cols-[minmax(12rem,min(42%,22rem))_minmax(0,1fr)] sm:grid-rows-1 sm:items-stretch"
                >
                  <ProjectImage
                    src={cert.image}
                    alt={cert.title}
                    wrapperClassName="relative aspect-video min-h-0 w-full border-b border-border bg-primary sm:aspect-auto sm:h-full sm:min-h-0 sm:w-full sm:border-b-0 sm:border-r"
                  />
                  <div className="flex min-h-0 min-w-0 flex-col gap-3 p-4 sm:gap-3 sm:p-5">
                    <div className="space-y-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                        {cert.issuer}
                        <span className="text-border"> · </span>
                        <span className="tabular-nums text-foreground/80">
                          {cert.issued}
                        </span>
                      </p>
                      <CardTitle className="text-xl font-display leading-tight transition-colors group-hover:text-primary sm:text-2xl">
                        {cert.title}
                      </CardTitle>
                      <CertCategoryBadges cert={cert} />
                      <CertTagBadges cert={cert} />
                    </div>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                      {cert.excerpt}
                    </CardDescription>
                    <div className="mt-auto flex flex-wrap items-center justify-end gap-3 border-t border-border/60 pt-3">
                      <CredentialLink
                        cert={cert}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto grid w-full max-w-7xl grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
              {pagedFiltered.map((cert) => (
                <Card
                  key={`${cert.title}-${cert.issued}`}
                  className="pt-2 group grid grid-rows-subgrid row-span-3 content-start items-start gap-0 overflow-hidden rounded-none border-border bg-card p-0 py-0 shadow-none transition-all duration-300 hover:border-primary/50"
                >
                  <ProjectImage src={cert.image} alt={cert.title} />
                  <div className="grid gap-4">
                    <CardHeader className="grid gap-4 mt-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {cert.issuer}
                        <span className="text-border"> · </span>
                        <span className="tabular-nums text-foreground/80">
                          {cert.issued}
                        </span>
                      </p>
                      <CardTitle className="text-2xl font-display transition-colors group-hover:text-primary">
                        {cert.title}
                      </CardTitle>
                      <CertCategoryBadges cert={cert} />
                      <CertTagBadges cert={cert} />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-base">
                        {cert.excerpt}
                      </CardDescription>
                    </CardContent>
                  </div>
                  <CardFooter className="flex justify-end py-4">
                    <CredentialLink cert={cert} className="text-sm" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          {totalPages > 1 ? (
            <nav
              className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 border-t border-border/60 pt-8 sm:flex-row"
              aria-label="Certification list pages"
            >
              <p className="order-2 font-mono text-xs text-muted-foreground sm:order-1">
                Page{" "}
                <span className="tabular-nums text-foreground">{page}</span> of{" "}
                <span className="tabular-nums text-foreground">
                  {totalPages}
                </span>
              </p>
              <div className="order-1 flex items-center gap-2 sm:order-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="font-mono text-xs"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-4" />
                  <span className="hidden sm:inline">Prev</span>
                </Button>
                {totalPages <= 9 ? (
                  <div className="hidden items-center gap-1 sm:flex">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n) => (
                        <Button
                          key={n}
                          type="button"
                          size="sm"
                          variant={n === page ? "default" : "ghost"}
                          className="size-8 min-w-8 px-0 font-mono text-xs tabular-nums"
                          onClick={() => setPage(n)}
                          aria-label={`Page ${n}`}
                          aria-current={n === page ? "page" : undefined}
                        >
                          {n}
                        </Button>
                      ),
                    )}
                  </div>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="font-mono text-xs"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </nav>
          ) : null}
        </>
      )}
    </div>
  );
}
