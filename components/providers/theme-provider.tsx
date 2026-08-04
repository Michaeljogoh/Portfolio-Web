"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

/**
 * Storage key is versioned deliberately. Bumping it off next-themes' default
 * ("theme") orphans the dark preference persisted by earlier visits, so
 * returning visitors land on the current default instead of their old choice.
 */
const THEME_STORAGE_KEY = "theme-v2";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      storageKey={THEME_STORAGE_KEY}
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
