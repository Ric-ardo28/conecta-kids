import { Target } from "lucide-react";
import { ChallengePlayer } from "@/components/ChallengePlayer";
import { LoggedLayout } from "@/components/LoggedLayout";
import { EmptyState } from "@/components/ui/EmptyState";
import { challengeTypeLabels, type Challenge } from "@/lib/challenges";
import { productAreas } from "@/lib/product-areas";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database, Json } from "@/lib/supabase/types";

type ChallengeRow = Pick<
  Database["public"]["Tables"]["challenges"]["Row"],
  | "id"
  | "mission_id"
  | "title"
  | "question"
  | "challenge_type"
  | "options"
  | "explanation"
>;
type ExerciciosPageProps = {
  searchParams?: Promise<{
    mission?: string;
  }>;
};

const challengeTypes = [
  "Múltipla escolha",
  "Verdadeiro ou falso",
  "Complete a frase",
  "Associação simples",
];

function getOptions(options: Json): string[] {
  if (!Array.isArray(options)) {
    return [];
  }

  return options.filter((option): option is string => typeof option === "string");
}

function mapChallenge(row: ChallengeRow): Challenge {
  return {
    id: row.id,
    type: challengeTypeLabels[row.challenge_type] ?? "Múltipla escolha",
    title: row.title,
    question: row.question,
    options: getOptions(row.options),
    explanation: row.explanation,
  };
}

export default async function ExerciciosPage({ searchParams }: ExerciciosPageProps) {
  const params = await searchParams;
  const missionId = params?.mission;
  const { supabase, profile } = await getCurrentUserProfile();

  let challengesQuery = supabase
    .from("challenges")
    .select("id, mission_id, title, question, challenge_type, options, explanation")
    .order("created_at", { ascending: true });

  if (missionId) {
    challengesQuery = challengesQuery.eq("mission_id", missionId);
  }

  const [challengesResult, completedResult, rankingResult] = await Promise.all([
    challengesQuery,
    supabase
      .from("challenge_answers")
      .select("challenge_id")
      .eq("user_id", profile.id)
      .eq("is_correct", true),
    supabase.from("ranking").select("stars").eq("user_id", profile.id).maybeSingle(),
  ]);

  const challenges = challengesResult.error
    ? []
    : (challengesResult.data as ChallengeRow[]).map(mapChallenge);
  const completedChallengeIds = completedResult.error
    ? []
    : completedResult.data.map((answer) => answer.challenge_id);
  const initialStars = rankingResult.data?.stars ?? profile.points ?? 0;

  return (
    <LoggedLayout profile={profile}>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                {productAreas.exercises}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                {missionId ? "Desafios da missão" : "Desafios educativos"}
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Responda com calma, receba feedback simples e ganhe estrelinhas
                quando acertar.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-4 text-amber-950">
              <div className="flex items-center gap-2 font-black">
                <Target aria-hidden="true" size={20} />
                {challenges.length} desafios
              </div>
              <p className="mt-1 text-sm font-bold">4 tipos de atividade</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {challengeTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-800"
              >
                {type}
              </span>
            ))}
          </div>
        </section>

        {challenges.length > 0 ? (
          <ChallengePlayer
            challenges={challenges}
            completedChallengeIds={completedChallengeIds}
            initialStars={initialStars}
          />
        ) : (
          <EmptyState
            emoji="⭐"
            title="Nenhum desafio real cadastrado ainda."
            description="Quando os desafios forem criados no Supabase, eles aparecerão aqui para a criança responder com segurança."
          />
        )}
      </div>
    </LoggedLayout>
  );
}
