import { cn } from "@/lib/classnames";

type AvatarProps = {
  emoji?: string;
  name: string;
  className?: string;
};

export function Avatar({ emoji = "⭐", name, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "grid size-16 shrink-0 place-items-center rounded-full bg-white text-3xl shadow-sm",
        className,
      )}
      aria-label={name}
      title={name}
    >
      <span aria-hidden="true">{emoji}</span>
    </div>
  );
}
