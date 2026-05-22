import type { LucideIcon } from "lucide-react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/classnames";

type AchievementCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  tone?: string;
};

export function AchievementCard({
  title,
  description,
  icon: Icon = Trophy,
  tone = "bg-yellow-100 text-amber-950",
}: AchievementCardProps) {
  return (
    <article className={cn("rounded-[1.35rem] p-4 shadow-sm", tone)}>
      <Icon aria-hidden="true" className="mb-3" />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm font-bold leading-relaxed">{description}</p>
    </article>
  );
}
