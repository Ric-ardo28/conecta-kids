import type { HTMLAttributes } from "react";
import { cn } from "@/lib/classnames";

type BadgeTone = "sky" | "green" | "yellow" | "purple" | "pink" | "orange";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  sky: "bg-sky-100 text-sky-800",
  green: "bg-emerald-100 text-emerald-800",
  yellow: "bg-yellow-100 text-amber-900",
  purple: "bg-violet-100 text-violet-800",
  pink: "bg-pink-100 text-pink-800",
  orange: "bg-orange-100 text-orange-800",
};

export function Badge({ className, tone = "sky", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
