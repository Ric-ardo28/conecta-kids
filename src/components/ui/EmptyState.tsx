import { Sparkles } from "lucide-react";
import { Button } from "./Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  emoji?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  emoji = "🧠",
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border-4 border-dashed border-sky-100 bg-white/80 p-6 text-center">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-yellow-100 text-4xl">
        <span aria-hidden="true">{emoji}</span>
      </div>
      <h2 className="mt-4 text-2xl font-black text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md font-bold leading-relaxed text-slate-600">
        {description}
      </p>
      {actionLabel && onAction ? (
        <Button onClick={onAction} className="mt-4">
          <Sparkles aria-hidden="true" size={19} />
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
