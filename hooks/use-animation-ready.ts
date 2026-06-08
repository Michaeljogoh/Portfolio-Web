"use client";

import { useLayoutEffect, useState } from "react";

/**
 * Returns true after the component has mounted on the client.
 * Gating Framer Motion on this avoids React 19 Strict Mode and SSR
 * hydration from skipping enter transitions in development.
 */
export function useAnimationReady() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setReady(true);
  }, []);

  return ready;
}
