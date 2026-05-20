import { getSkillIconUrlSync } from "@/lib/skill-icon-resolver";

type Props = {
  skill: string;
  iconUrl?: string | null;
};

export function SkillStackIcon({ skill, iconUrl }: Props) {
  const src = iconUrl ?? getSkillIconUrlSync(skill);
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
