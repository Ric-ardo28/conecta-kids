import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/classnames";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, id, ...props }: InputProps) {
  const input = (
    <input
      id={id}
      className={cn(
        "w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white",
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    return input;
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>
      {input}
    </label>
  );
}
