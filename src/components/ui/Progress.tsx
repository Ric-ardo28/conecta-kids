import { cn } from "@/lib/classnames";

type ProgressProps = {
  value: number;
  label?: string;
  className?: string;
};

export function Progress({ value, label, className }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-700">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}
      <div
        className="h-3 overflow-hidden rounded-full bg-white"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
