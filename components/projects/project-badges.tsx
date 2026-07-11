import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/portfolio-types";
import {
  PROJECT_CATEGORIES,
  type ProjectCategoryId,
  getProjectCategoryLabel,
} from "@/lib/project-categories";
import { cn } from "@/lib/utils";

const VALID_CATEGORY_IDS = new Set(
  PROJECT_CATEGORIES.map((c) => c.id),
) as Set<ProjectCategoryId>;

function isProjectCategoryId(id: string): id is ProjectCategoryId {
  return VALID_CATEGORY_IDS.has(id as ProjectCategoryId);
}

type BadgeProps = {
  project: Project;
  className?: string;
};

export function ProjectCategoryBadges({ project, className }: BadgeProps) {
  const categories = project.categories.filter(isProjectCategoryId);
  if (categories.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5 sm:gap-2", className)}>
      {categories.map((cid) => (
        <Badge
          key={cid}
          variant="outline"
          className="border-primary/30 font-mono text-[10px] uppercase tracking-tight text-muted-foreground"
        >
          {getProjectCategoryLabel(cid)}
        </Badge>
      ))}
    </div>
  );
}

export function ProjectSkillBadges({ project, className }: BadgeProps) {
  if (project.tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5 sm:gap-2", className)}>
      {project.tags.map((tag) => (
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
