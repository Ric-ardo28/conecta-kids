import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Sticker } from "@/components/ui/Sticker";

type AdventureCardProps = {
  title: string;
  description: string;
  emoji?: string;
  icon: LucideIcon;
  level: string;
  progress: number;
  missions: number;
  href?: string;
};

export function AdventureCard({
  title,
  description,
  emoji = "🚀",
  icon: Icon,
  level,
  progress,
  missions,
  href = "/aulas",
}: AdventureCardProps) {
  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="grid size-14 place-items-center rounded-2xl bg-sky-100 text-sky-700">
          <Icon aria-hidden="true" size={28} />
        </div>
        <Sticker emoji={emoji} label={title} />
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <Badge tone="green">{level}</Badge>
        <Badge tone="sky">{missions} missões</Badge>
      </div>

      <h2 className="text-2xl font-black leading-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-2 min-h-20 font-bold leading-relaxed text-slate-600">
        {description}
      </p>

      <Progress value={progress} label="Progresso" className="mt-4" />

      <Link
        href={href}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-black text-white transition hover:bg-sky-600"
      >
        <PlayCircle aria-hidden="true" size={20} />
        {progress > 0 ? "Continuar" : "Começar aventura"}
      </Link>
    </article>
  );
}
