import {
  BookOpen,
  Gamepad2,
  Globe,
  KeyRound,
  Laptop,
  Search,
  ShieldAlert,
  Smartphone,
  Star,
  Video,
  type LucideIcon,
} from "lucide-react";
import { AdventureCard } from "@/components/cards";
import { LoggedLayout } from "@/components/LoggedLayout";
import { EmptyState } from "@/components/ui/EmptyState";
import { productAreas } from "@/lib/product-areas";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database } from "@/lib/supabase/types";

type AdventureRow = Database["public"]["Tables"]["digital_adventures"]["Row"];
type MissionRow = Pick<
  Database["public"]["Tables"]["missions"]["Row"],
  "id" | "adventure_id"
>;
type ProgressRow = Pick<
  Database["public"]["Tables"]["user_progress"]["Row"],
  "adventure_id" | "mission_id" | "progress_percent"
>;

const iconByKeyword: Array<[string, LucideIcon]> = [
  ["computador", Laptop],
  ["celular", Smartphone],
  ["internet", Globe],
  ["senha", KeyRound],
  ["estranho", ShieldAlert],
  ["pesquis", Search],
  ["video", Video],
  ["vídeo", Video],
  ["jogo", Gamepad2],
  ["estudo", BookOpen],
  ["maneira", Star],
];

function getAdventureIcon(adventure: AdventureRow) {
  const label = `${adventure.icon ?? ""} ${adventure.title}`.toLowerCase();
  const match = iconByKeyword.find(([keyword]) => label.includes(keyword));

  return match?.[1] ?? Globe;
}

function getAdventureEmoji(adventure: AdventureRow) {
  return adventure.icon?.trim() || "🚀";
}

function getAdventureProgress(
  adventure: AdventureRow,
  missions: MissionRow[],
  progressRows: ProgressRow[],
) {
  const directProgress = progressRows.find(
    (progress) => progress.adventure_id === adventure.id && !progress.mission_id,
  );

  if (directProgress) {
    return directProgress.progress_percent;
  }

  const missionIds = new Set(
    missions
      .filter((mission) => mission.adventure_id === adventure.id)
      .map((mission) => mission.id),
  );
  const missionProgress = progressRows.filter(
    (progress) => progress.mission_id && missionIds.has(progress.mission_id),
  );

  if (missionProgress.length === 0) {
    return 0;
  }

  const total = missionProgress.reduce(
    (sum, progress) => sum + progress.progress_percent,
    0,
  );

  return Math.round(total / missionProgress.length);
}

export default async function TrilhasPage() {
  const { supabase, profile } = await getCurrentUserProfile();

  const [adventuresResult, missionsResult, progressResult] = await Promise.all([
    supabase
      .from("digital_adventures")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase.from("missions").select("id, adventure_id"),
    supabase
      .from("user_progress")
      .select("adventure_id, mission_id, progress_percent")
      .eq("user_id", profile.id),
  ]);

  if (adventuresResult.error) {
    throw new Error("Não foi possível carregar as aventuras digitais.");
  }

  if (missionsResult.error || progressResult.error) {
    throw new Error("Não foi possível carregar seu progresso nas aventuras.");
  }

  const adventures = (adventuresResult.data ?? []) as AdventureRow[];
  const missions = (missionsResult.data ?? []) as MissionRow[];
  const progressRows = (progressResult.data ?? []) as ProgressRow[];

  return (
    <LoggedLayout profile={profile}>
      <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-emerald-800">
              {productAreas.tracks}
            </p>
            <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
              Escolha sua próxima aventura
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
              Cada card tem missões curtas para aprender computador, celular,
              internet e segurança digital com diversão.
            </p>
          </div>

          <div className="rounded-2xl bg-sky-100 px-5 py-4 text-sm font-black text-sky-900">
            {adventures.length} aventuras reais
          </div>
        </div>

        {adventures.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adventures.map((adventure) => {
              const adventureMissions = missions.filter(
                (mission) => mission.adventure_id === adventure.id,
              );

              return (
                <AdventureCard
                  key={adventure.id}
                  title={adventure.title}
                  description={adventure.description}
                  emoji={getAdventureEmoji(adventure)}
                  icon={getAdventureIcon(adventure)}
                  level={adventure.level}
                  progress={getAdventureProgress(
                    adventure,
                    adventureMissions,
                    progressRows,
                  )}
                  missions={adventureMissions.length}
                  href={`/aulas?adventure=${adventure.id}`}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            emoji="🚀"
            title="Nenhuma aventura cadastrada ainda."
            description="Quando as Aventuras Digitais forem criadas no Supabase, elas aparecerão aqui com seu progresso real."
          />
        )}
      </div>
    </LoggedLayout>
  );
}
