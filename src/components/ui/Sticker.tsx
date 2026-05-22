import { cn } from "@/lib/classnames";

type StickerProps = {
  emoji: string;
  label?: string;
  className?: string;
};

export function Sticker({ emoji, label, className }: StickerProps) {
  return (
    <span
      className={cn(
        "inline-grid size-12 place-items-center rounded-2xl bg-yellow-100 text-2xl shadow-sm transition hover:-rotate-3 hover:scale-105",
        className,
      )}
      aria-label={label}
      title={label}
    >
      <span aria-hidden={Boolean(label)}>{emoji}</span>
    </span>
  );
}
