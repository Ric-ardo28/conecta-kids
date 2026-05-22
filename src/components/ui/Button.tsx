import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/classnames";

type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-sky-500 text-white hover:bg-sky-600",
  secondary: "bg-violet-100 text-violet-900 hover:bg-violet-200",
  success: "bg-emerald-500 text-white hover:bg-emerald-600",
  warning: "bg-yellow-300 text-slate-950 hover:bg-yellow-200",
  ghost: "bg-white text-slate-800 hover:bg-slate-50",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:hover:translate-y-0",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
