import { SKILL_ICON_SRC } from "@/lib/skill-icon-src";

type Props = {
  skill: string;
};

export function SkillStackIcon({ skill }: Props) {
  const src = SKILL_ICON_SRC[skill];
  if (!src) return null;

  return (
    <img    
      src={src}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      decoding="async"
      className="h-5 w-5 shrink-0 object-contain opacity-90 group-hover:opacity-100"
    />
  );
}
