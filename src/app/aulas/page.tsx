import Link from "next/link";
import {
  BookOpen,
  Clock,
  Gauge,
  Layers,
  PlayCircle,
  Star,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { missions, type MissionStatus } from "@/lib/missions";
import { productAreas } from "@/lib/product-areas";

const statusStyles: Record<MissionStatus, string> = {
  Disponível: "bg-sky-100 text-sky-800",
  "Em andamento": "bg-yellow-100 text-amber-900",
  Concluída: "bg-emerald-100 text-emerald-800",
};

export default function AulasPage() {
  return (
    <LoggedLayout>
      <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-amber-900">
              {productAreas.lessons}
            </p>
            <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
              Missões educativas
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
              Aprenda tecnologia em pequenas missões com explicações simples,
              exemplos visuais e uma dica de segurança em cada passo.
            </p>
          </div>

          <div className="rounded-2xl bg-sky-100 px-5 py-4 text-sm font-black text-sky-900">
            {missions.length} missões disponíveis
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {missions.map((mission) => (
            <article
              key={mission.slug}
              className="rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="grid size-14 place-items-center rounded-2xl bg-yellow-100 text-amber-700">
                  <BookOpen aria-hidden="true" size={28} />
                </div>
                <span className="text-3xl" aria-hidden="true">
                  {mission.emoji}
                </span>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                <Pill icon={Layers} text={mission.category} />
                <Pill icon={Clock} text={mission.duration} />
                <Pill icon={Gauge} text={mission.difficulty} />
              </div>

              <span
                className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-black ${statusStyles[mission.status]}`}
              >
                {mission.status}
              </span>

              <h2 className="text-2xl font-black leading-tight text-slate-950">
                {mission.title}
              </h2>
              <p className="mt-2 min-h-20 font-bold leading-relaxed text-slate-600">
                {mission.description}
              </p>

              <Link
                href={`/aulas/${mission.slug}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-black text-white transition hover:bg-sky-600"
              >
                <PlayCircle aria-hidden="true" size={20} />
                Iniciar missão
              </Link>
            </article>
          ))}
        </div>
      </div>
    </LoggedLayout>
  );
}

type PillProps = {
  icon: typeof Star;
  text: string;
};

function Pill({ icon: Icon, text }: PillProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
      <Icon aria-hidden="true" size={13} />
      {text}
    </span>
  );
}
