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
import { EmptyState } from "@/components/ui/EmptyState";
import { productAreas } from "@/lib/product-areas";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database } from "@/lib/supabase/types";

type AulasPageProps = {
  searchParams?: Promise<{
    adventure?: string;
  }>;
};

type MissionRow = Pick<
  Database["public"]["Tables"]["missions"]["Row"],
  | "id"
  | "adventure_id"
  | "title"
  | "description"
  | "category"
  | "duration_minutes"
  | "difficulty"
  | "safety_tip"
> & {
  digital_adventures?:
    | {
        title: string;
        icon: string | null;
      }
    | Array<{
        title: string;
        icon: string | null;
      }>
    | null;
};
type ProgressRow = Pick<
  Database["public"]["Tables"]["user_progress"]["Row"],
  "mission_id" | "status" | "progress_percent"
>;

const statusStyles = {
  "Não iniciada": "bg-slate-100 text-slate-700",
  "Em andamento": "bg-yellow-100 text-amber-900",
  Concluída: "bg-emerald-100 text-emerald-800",
} as const;

type MissionStatus = keyof typeof statusStyles;

function getMissionProgress(mission: MissionRow, progressRows: ProgressRow[]) {
  const progress = progressRows.find((item) => item.mission_id === mission.id);

  if (!progress) {
    return {
      label: "Não iniciada" as MissionStatus,
      percent: 0,
    };
  }

  if (progress.status === "completed" || progress.progress_percent >= 100) {
    return {
      label: "Concluída" as MissionStatus,
      percent: 100,
    };
  }

  return {
    label: "Em andamento" as MissionStatus,
    percent: progress.progress_percent,
  };
}

function getAdventureInfo(mission?: MissionRow) {
  const adventure = mission?.digital_adventures;

  if (Array.isArray(adventure)) {
    return adventure[0] ?? null;
  }

  return adventure ?? null;
}

export default async function AulasPage({ searchParams }: AulasPageProps) {
  const params = await searchParams;
  const adventureId = params?.adventure;
  const { supabase, profile } = await getCurrentUserProfile();

  let missionsQuery = supabase
    .from("missions")
    .select(
      "id, adventure_id, title, description, category, duration_minutes, difficulty, safety_tip, digital_adventures(title, icon)",
    )
    .order("created_at", { ascending: true });

  if (adventureId) {
    missionsQuery = missionsQuery.eq("adventure_id", adventureId);
  }

  const [missionsResult, progressResult] = await Promise.all([
    missionsQuery,
    supabase
      .from("user_progress")
      .select("mission_id, status, progress_percent")
      .eq("user_id", profile.id)
      .not("mission_id", "is", null),
  ]);

  if (missionsResult.error) {
    throw new Error("Não foi possível carregar as missões.");
  }

  if (progressResult.error) {
    throw new Error("Não foi possível carregar seu progresso nas missões.");
  }

  const missions = (missionsResult.data ?? []) as unknown as MissionRow[];
  const progressRows = (progressResult.data ?? []) as ProgressRow[];
  const pageTitle =
    adventureId && getAdventureInfo(missions[0])?.title
      ? `Missões de ${getAdventureInfo(missions[0])?.title}`
      : "Missões educativas";

  return (
    <LoggedLayout profile={profile}>
      <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-amber-900">
              {productAreas.lessons}
            </p>
            <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
              Aprenda tecnologia em pequenas missões com explicações simples,
              exemplos visuais e uma dica de segurança em cada passo.
            </p>
          </div>

          <div className="rounded-2xl bg-sky-100 px-5 py-4 text-sm font-black text-sky-900">
            {missions.length} missões reais
          </div>
        </div>

        {missions.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {missions.map((mission) => {
              const progress = getMissionProgress(mission, progressRows);

              return (
                <article
                  key={mission.id}
                  className="rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="grid size-14 place-items-center rounded-2xl bg-yellow-100 text-amber-700">
                      <BookOpen aria-hidden="true" size={28} />
                    </div>
                    <span className="text-3xl" aria-hidden="true">
                      {getAdventureInfo(mission)?.icon ?? "⭐"}
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <Pill icon={Layers} text={mission.category} />
                    <Pill icon={Clock} text={`${mission.duration_minutes} min`} />
                    <Pill icon={Gauge} text={mission.difficulty} />
                  </div>

                  <span
                    className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-black ${
                      statusStyles[progress.label]
                    }`}
                  >
                    {progress.label}
                    {progress.label === "Em andamento"
                      ? ` • ${progress.percent}%`
                      : ""}
                  </span>

                  <h2 className="text-2xl font-black leading-tight text-slate-950">
                    {mission.title}
                  </h2>
                  <p className="mt-2 min-h-20 font-bold leading-relaxed text-slate-600">
                    {mission.description}
                  </p>

                  <Link
                    href={`/aulas/${mission.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-black text-white transition hover:bg-sky-600"
                  >
                    <PlayCircle aria-hidden="true" size={20} />
                    {progress.label === "Não iniciada"
                      ? "Iniciar missão"
                      : "Continuar missão"}
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            emoji="⭐"
            title="Nenhuma missão real cadastrada ainda."
            description="Quando as missões forem criadas no Supabase, elas aparecerão aqui com seu progresso real."
          />
        )}
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
