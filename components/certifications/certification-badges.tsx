import { Badge } from "@/components/ui/badge";
import type { Certification } from "@/lib/portfolio-types";
import {
  CERTIFICATION_CATEGORIES,
  type CertificationCategoryId,
  getCertificationCategoryLabel,
} from "@/lib/cert-categories";
import { cn } from "@/lib/utils";

const VALID_CATEGORY_IDS = new Set(
  CERTIFICATION_CATEGORIES.map((c) => c.id),
) as Set<CertificationCategoryId>;

function isCertificationCategoryId(id: string): id is CertificationCategoryId {
  return VALID_CATEGORY_IDS.has(id as CertificationCategoryId);
}

type BadgeProps = {
  cert: Certification;
  className?: string;
};

export function CertificationCategoryBadges({ cert, className }: BadgeProps) {
  const categories = cert.categories.filter(isCertificationCategoryId);
  if (categories.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5 sm:gap-2", className)}>
      {categories.map((cid) => (
        <Badge
          key={cid}
          variant="outline"
          className="border-primary/30 font-mono text-[10px] uppercase tracking-tight text-muted-foreground"
        >
          {getCertificationCategoryLabel(cid)}
        </Badge>
      ))}
    </div>
  );
}

export function CertificationSkillBadges({ cert, className }: BadgeProps) {
  if (cert.tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5 sm:gap-2", className)}>
      {cert.tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="border border-border/60 bg-muted/50 font-mono text-[11px] text-foreground/90 sm:text-xs"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
