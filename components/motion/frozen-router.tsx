"use client";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext, useEffect, useRef, type ReactNode } from "react";

function usePreviousValue<T>(value: T): T | undefined {
  const previous = useRef<T>();

  useEffect(() => {
    previous.current = value;
    return () => {
      previous.current = undefined;
    };
  });

  return previous.current;
}

/**
 * Keeps the previous route tree mounted while Framer Motion runs exit animations.
 * Required for AnimatePresence page transitions with the Next.js App Router.
 */
export function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const previousContext = usePreviousValue(context) ?? null;

  const segment = useSelectedLayoutSegment();
  const previousSegment = usePreviousValue(segment);

  const segmentChanged =
    segment !== previousSegment &&
    segment !== undefined &&
    previousSegment !== undefined;

  return (
    <LayoutRouterContext.Provider
      value={segmentChanged ? previousContext : context}
    >
      {children}
    </LayoutRouterContext.Provider>
  );
}
