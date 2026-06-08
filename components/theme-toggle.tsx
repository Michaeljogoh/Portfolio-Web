"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative shrink-0", className)}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        className={cn(
          "size-5 transition-all duration-300",
          mounted && isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute size-5 transition-all duration-300",
          mounted && !isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
        aria-hidden
      />
    </Button>
  );
}
