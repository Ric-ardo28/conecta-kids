import { Bot } from "lucide-react";
import { cn } from "@/lib/classnames";

type MascotProps = {
  name?: string;
  message?: string;
  className?: string;
};

export function Mascot({
  name = "Bit",
  message = "Seu guia de segurança digital.",
  className,
}: MascotProps) {
  return (
    <div
      className={cn(
        "rounded-[1.6rem] bg-sky-100 p-5 text-center text-slate-950",
        className,
      )}
    >
      <div className="mx-auto grid size-28 place-items-center rounded-full bg-yellow-300 text-5xl wiggle">
        🤖
      </div>
      <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-pink-600">
        Mascote
      </p>
      <h2 className="inline-flex items-center justify-center gap-2 text-3xl font-black">
        <Bot aria-hidden="true" size={24} />
        {name}
      </h2>
      <p className="mt-1 font-bold text-slate-700">{message}</p>
    </div>
  );
}
