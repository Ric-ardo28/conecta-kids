import Link from "next/link";
import { Clock, PlayCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type MissionCardProps = {
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  status: string;
  href: string;
};

export function MissionCard({
  title,
  description,
  category,
  duration,
  difficulty,
  status,
  href,
}: MissionCardProps) {
  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge tone="yellow">{category}</Badge>
        <Badge tone="purple">{difficulty}</Badge>
        <Badge tone="green">{status}</Badge>
      </div>
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 min-h-20 font-bold leading-relaxed text-slate-600">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-2 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-black text-sky-900">
        <Clock aria-hidden="true" size={18} />
        {duration}
      </div>
      <Link
        href={href}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 font-black text-white transition hover:bg-emerald-600"
      >
        <PlayCircle aria-hidden="true" size={20} />
        Iniciar missão
      </Link>
      <p className="mt-3 flex items-start gap-2 text-sm font-bold text-slate-600">
        <ShieldCheck aria-hidden="true" size={17} />
        Aprenda com calma e peça ajuda se algo parecer estranho.
      </p>
    </article>
  );
}
