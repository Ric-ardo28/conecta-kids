import {
  BadgeCheck,
  HeartHandshake,
  Medal,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";

const learners = [
  {
    name: "Lia",
    avatar: "🧑‍🚀",
    stars: 128,
    level: "Guardiã dos Links",
    medals: ["Senha Forte", "Clique Seguro", "Pesquisa Esperta"],
    progress: 82,
    highlight: "Você está brilhando na sua jornada digital",
    color: "bg-sky-100 text-sky-900",
  },
  {
    name: "Davi",
    avatar: "🧙",
    stars: 96,
    level: "Explorador da Internet",
    medals: ["Adulto Chamado", "Boas Maneiras"],
    progress: 68,
    highlight: "O importante é continuar evoluindo",
    color: "bg-emerald-100 text-emerald-900",
  },
  {
    name: "Maya",
    avatar: "🦸",
    stars: 74,
    level: "Aprendiz Digital",
    medals: ["Mouse Mestre", "App Seguro"],
    progress: 54,
    highlight: "Cada criança aprende no seu ritmo",
    color: "bg-pink-100 text-pink-900",
  },
  {
    name: "Theo",
    avatar: "🧑‍🎨",
    stars: 61,
    level: "Criador Cuidadoso",
    medals: ["Vídeo Educativo", "Respeito Online"],
    progress: 47,
    highlight: "Todo passo pequeno também conta",
    color: "bg-yellow-100 text-amber-950",
  },
];

const achievements = [
  {
    title: "Senha Forte",
    description: "Criou uma senha difícil de adivinhar.",
    icon: ShieldCheck,
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Clique Seguro",
    description: "Parou antes de abrir um link desconhecido.",
    icon: BadgeCheck,
    color: "bg-sky-100 text-sky-800",
  },
  {
    title: "Ajuda Certa",
    description: "Chamou um adulto quando algo pareceu estranho.",
    icon: HeartHandshake,
    color: "bg-pink-100 text-pink-800",
  },
];

const journeyStats = [
  { label: "Estrelinhas", value: "128", icon: Star },
  { label: "Medalhas", value: "6", icon: Medal },
  { label: "Nível atual", value: "Guardiã", icon: Trophy },
];

export default function RankingPage() {
  return (
    <LoggedLayout>
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

        <section className="rounded-[1.4rem] border-4 border-dashed border-indigo-200 bg-indigo-50 p-5 font-bold text-indigo-950">
          Conteúdo de exemplo: este hall ainda não mostra ranking real da sua
          conta. Quando houver dados no Supabase, eles substituirão estes
          exemplos.
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-sky-100 p-6">
            <div className="flex items-center gap-4">
              <div className="grid size-24 place-items-center rounded-full bg-white text-5xl">
                🧑‍🚀
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-800">
                  Progresso individual
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Jornada da Lia
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
                <span>Progresso da semana</span>
                <span>82%</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-emerald-500" />
              </div>
              <p className="mt-3 font-bold leading-relaxed text-slate-700">
                Continue praticando pequenos desafios. Cada estrelinha mostra
                uma habilidade nova ficando mais forte.
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
                  Conquistas positivas
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Medalhas da turminha
                </h2>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.title} {...achievement} />
              ))}
            </div>
          </div>
        </section>

        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-indigo-700">
                Hall acolhedor
              </p>
              <h2 className="text-3xl font-black text-slate-950">
                Brilhos da jornada digital
              </h2>
              <p className="mt-2 max-w-3xl font-bold leading-relaxed text-slate-700">
                Aqui não existe humilhação nem pressa. O hall mostra conquistas
                para celebrar aprendizado, cuidado e responsabilidade.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm font-black text-emerald-900">
              O importante é continuar evoluindo
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {learners.map((learner) => (
              <article
                key={learner.name}
                className="rounded-[1.6rem] border-4 border-white bg-slate-50 p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="grid size-20 shrink-0 place-items-center rounded-full bg-white text-4xl">
                    {learner.avatar}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-slate-950">
                          {learner.name}
                        </h3>
                        <p className="font-bold text-slate-600">
                          Nível: {learner.level}
                        </p>
                      </div>
                      <div
                        className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-black ${learner.color}`}
                      >
                        <Star aria-hidden="true" size={17} />
                        {learner.stars} estrelinhas
                      </div>
                    </div>

                    <p className="mt-3 rounded-2xl bg-white px-4 py-3 font-black text-slate-800">
                      {learner.highlight}
                    </p>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm font-black text-slate-700">
                        <span>Progresso</span>
                        <span>{learner.progress}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-sky-500"
                          style={{ width: `${learner.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {learner.medals.map((medal) => (
                        <span
                          key={medal}
                          className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-2 text-xs font-black text-amber-950"
                        >
                          <Trophy aria-hidden="true" size={15} />
                          {medal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
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
