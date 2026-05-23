import {
  BadgeCheck,
  Medal,
  Sparkles,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { EmptyState } from "@/components/ui/EmptyState";
import { productAreas } from "@/lib/product-areas";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database, Json } from "@/lib/supabase/types";

type RankingRow = Database["public"]["Tables"]["ranking"]["Row"];

function getDisplayName(fullName: string | null) {
  return fullName?.trim() || "Explorador digital";
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getMedals(value: Json | undefined) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export default async function RankingPage() {
  const { supabase, profile } = await getCurrentUserProfile();
  const displayName = getDisplayName(profile.full_name);

  const { data, error } = await supabase
    .from("ranking")
    .select("*")
    .eq("user_id", profile.id)
    .maybeSingle();

  if (error) {
    throw new Error("Não foi possível carregar seu Hall das Estrelinhas.");
  }

  const ranking = data as RankingRow | null;
  const medals = getMedals(ranking?.medals);
  const journeyStats = [
    { label: "Estrelinhas", value: String(ranking?.stars ?? 0), icon: Star },
    { label: "Medalhas", value: String(medals.length), icon: Medal },
    { label: "Nível atual", value: ranking?.level ?? "Inicial", icon: Trophy },
  ];

  return (
    <LoggedLayout profile={profile}>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-indigo-800">
                {productAreas.ranking}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Cada brilho conta na jornada
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Cada criança aprende no seu ritmo. O importante é continuar
                evoluindo, juntar conquistas e praticar tecnologia com cuidado.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-yellow-100 p-5 text-amber-950">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-yellow-300 text-slate-950">
                  <Sparkles aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em]">
                    Mensagem do Bit
                  </p>
                  <h2 className="text-2xl font-black">
                    Você está brilhando na sua jornada digital
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {ranking ? (
          <>
            <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="kid-shadow rounded-[2rem] border-4 border-white bg-sky-100 p-6">
                <div className="flex items-center gap-4">
                  {profile.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatar_url}
                      alt=""
                      className="size-24 rounded-full bg-white object-cover"
                    />
                  ) : (
                    <div className="grid size-24 place-items-center rounded-full bg-white text-3xl font-black text-sky-900">
                      {getInitials(displayName)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-800">
                      Progresso individual
                    </p>
                    <h2 className="text-3xl font-black text-slate-950">
                      Jornada de {displayName}
                    </h2>
                    <p className="mt-1 font-bold text-slate-700">
                      Evoluindo com calma, curiosidade e segurança.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {journeyStats.map((stat) => (
                    <JourneyStatCard key={stat.label} {...stat} />
                  ))}
                </div>

                <div className="mt-6 rounded-[1.4rem] bg-white p-5">
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm font-black text-slate-700">
                    <span>Progresso registrado</span>
                    <span>{ranking.progress_percent}%</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${ranking.progress_percent}%` }}
                    />
                  </div>
                  <p className="mt-3 font-bold leading-relaxed text-slate-700">
                    Continue praticando pequenos desafios. Cada estrelinha
                    mostra uma habilidade nova ficando mais forte.
                  </p>
                </div>
              </div>

              <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-pink-100 p-3 text-pink-700">
                    <Medal aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                      Conquistas reais
                    </p>
                    <h2 className="text-3xl font-black text-slate-950">
                      Medalhas da jornada
                    </h2>
                  </div>
                </div>

                {medals.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-3">
                    {medals.map((medal) => (
                      <AchievementCard
                        key={medal}
                        title={medal}
                        description="Conquista registrada na sua jornada digital."
                        icon={BadgeCheck}
                        color="bg-emerald-100 text-emerald-800"
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    emoji="🏆"
                    title="Nenhuma medalha conquistada ainda."
                    description="Quando você ganhar medalhas reais, elas aparecerão aqui."
                  />
                )}
              </div>
            </section>

            <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
              <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-indigo-700">
                    Hall acolhedor
                  </p>
                  <h2 className="text-3xl font-black text-slate-950">
                    Seu brilho na jornada digital
                  </h2>
                  <p className="mt-2 max-w-3xl font-bold leading-relaxed text-slate-700">
                    Aqui não existe humilhação nem pressa. O hall celebra o seu
                    aprendizado, cuidado e responsabilidade.
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm font-black text-emerald-900">
                  O importante é continuar evoluindo
                </div>
              </div>

              <article className="rounded-[1.6rem] border-4 border-white bg-slate-50 p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {profile.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatar_url}
                      alt=""
                      className="size-20 rounded-full bg-white object-cover"
                    />
                  ) : (
                    <div className="grid size-20 shrink-0 place-items-center rounded-full bg-white text-2xl font-black text-indigo-900">
                      {getInitials(displayName)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-slate-950">
                          {displayName}
                        </h3>
                        <p className="font-bold text-slate-600">
                          Nível: {ranking.level}
                        </p>
                      </div>
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-100 px-3 py-2 text-sm font-black text-amber-950">
                        <Star aria-hidden="true" size={17} />
                        {ranking.stars} estrelinhas
                      </div>
                    </div>

                    <p className="mt-3 rounded-2xl bg-white px-4 py-3 font-black text-slate-800">
                      Você está brilhando na sua jornada digital
                    </p>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm font-black text-slate-700">
                        <span>Progresso</span>
                        <span>{ranking.progress_percent}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-sky-500"
                          style={{ width: `${ranking.progress_percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </>
        ) : (
          <EmptyState
            emoji="⭐"
            title="Você ainda não ganhou estrelinhas."
            description="Responda desafios e conclua missões para começar seu Hall das Estrelinhas com dados reais."
          />
        )}
      </div>
    </LoggedLayout>
  );
}

type JourneyStatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

function JourneyStatCard({ label, value, icon: Icon }: JourneyStatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <Icon aria-hidden="true" className="mb-3 text-sky-700" />
      <p className="text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

type AchievementCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

function AchievementCard({
  title,
  description,
  icon: Icon,
  color,
}: AchievementCardProps) {
  return (
    <article className={`rounded-[1.3rem] p-4 ${color}`}>
      <Icon aria-hidden="true" className="mb-3" />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm font-bold leading-relaxed">{description}</p>
    </article>
  );
}
