import { cn } from "@/lib/utils";

export function FormField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
