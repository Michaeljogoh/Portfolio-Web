"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutList,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Certification } from "@/lib/portfolio-types";
import {
  CERTIFICATION_CATEGORIES,
  type CertificationCategoryId,
  getCertificationCategoryLabel,
} from "@/lib/cert-categories";
import { CertificationFeatureRow } from "@/components/certifications/certification-feature-row";
import { CertificationGridCard } from "@/components/certifications/certification-grid-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAGE_SIZE } from "@/lib/pagination";

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
const CARD_VIEW_STORAGE_KEY = "portfolio-certifications-card-view";

export type CertificationCardViewMode = "row" | "grid";

type Props = {
  certifications: Certification[];
};

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
              title="Feature rows with alternating badge layout"
            >
              <LayoutList className="size-3.5 shrink-0" aria-hidden />
              <span className="hidden sm:inline">Features</span>
            </Button>
            <Button
              type="button"
              size="sm"
              variant={cardView === "grid" ? "default" : "outline"}
              className="h-8 gap-1.5 px-2.5 font-mono text-xs sm:px-3"
              onClick={() => setCardView("grid")}
              aria-pressed={cardView === "grid"}
              title="Grid tiles — badge image with details below"
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
            <div className="flex w-full flex-col divide-y divide-border/50">
              <AnimatePresence mode="popLayout">
                {pagedFiltered.map((cert, index) => (
                  <CertificationFeatureRow
                    key={`${cert.title}-${page}`}
                    cert={cert}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
              <AnimatePresence mode="popLayout">
                {pagedFiltered.map((cert) => (
                  <CertificationGridCard
                    key={`${cert.title}-${page}`}
                    cert={cert}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
          {totalPages > 1 ? (
            <nav
              className="flex w-full flex-col items-center justify-center gap-4 border-t border-border/60 pt-8 sm:flex-row"
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
