"use client";

import { cn } from "@/lib/utils";

type Category = { id: string; label: string };

type Props = {
  categories: readonly Category[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function CategoryCheckboxes({ categories, value, onChange }: Props) {
  function toggle(id: string) {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const checked = value.includes(cat.id);
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => toggle(cat.id)}
            className={cn(
              "rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase transition-colors",
              checked
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/50",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
