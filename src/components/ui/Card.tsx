import type { HTMLAttributes } from "react";
import { cn } from "@/lib/classnames";

type CardTone = "white" | "sky" | "green" | "yellow" | "purple" | "orange";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CardTone;
};

const tones: Record<CardTone, string> = {
  white: "border-white bg-white/94",
  sky: "border-white bg-sky-100",
  green: "border-white bg-emerald-100",
  yellow: "border-white bg-yellow-100",
  purple: "border-white bg-violet-100",
  orange: "border-white bg-orange-100",
};

export function Card({ className, tone = "white", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "kid-shadow rounded-[2rem] border-4 p-5 md:p-6",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
