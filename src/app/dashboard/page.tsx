import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Bot,
  Clock,
  GraduationCap,
  HeartHandshake,
  Medal,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";

const childStats = [
  { label: "Progresso nas aventuras", value: "64%", icon: BarChart3 },
  { label: "Estrelinhas conquistadas", value: "128", icon: Star },
  { label: "Medalhas", value: "6", icon: Medal },
];

const guardianStats = [
  { label: "Progresso da criança", value: "64%", icon: BarChart3 },
  { label: "Tempo de uso", value: "32 min", icon: Clock },
  { label: "Missões concluídas", value: "12", icon: BadgeCheck },
  { label: "Desafios respondidos", value: "18", icon: Target },
  { label: "Alertas de segurança", value: "2", icon: AlertTriangle },
  { label: "Crianças vinculadas", value: "3", icon: Users },
];

const teacherStats = [
  { label: "Turmas", value: "4", icon: Users },
  { label: "Alunos", value: "86", icon: GraduationCap },
  { label: "Progresso geral", value: "72%", icon: BarChart3 },
  { label: "Missões criadas", value: "15", icon: Rocket },
  { label: "Desafios enviados", value: "28", icon: Target },
  { label: "Indicadores da turma", value: "8", icon: Trophy },
];

const medals = ["Senha Campeã", "Clique Consciente", "Pesquisa Segura"];

export default function DashboardPage() {
  return (
    <LoggedLayout>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                {productAreas.dashboard}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Oi! Vamos continuar sua jornada?
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Hoje o Bit separou uma missão curta, uma dica de segurança e
                atalhos para aprender tecnologia com calma.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-2xl bg-yellow-300 px-5 py-3 font-black text-slate-950 transition hover:bg-yellow-200"
                >
                  <Bot aria-hidden="true" size={20} />
                  Tutor Digital
                </Link>
                <Link
                  href="/aulas"
                  className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 font-black text-white transition hover:bg-sky-600"
                >
                  <Rocket aria-hidden="true" size={20} />
                  Próxima missão
                </Link>
              </div>
            </div>

            <div className="rounded-[1.6rem] bg-sky-100 p-5 text-center">
              <div className="mx-auto grid size-36 place-items-center rounded-full bg-yellow-300 text-6xl">
                🤖
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-pink-600">
                Mascote
              </p>
              <h2 className="text-3xl font-black text-slate-950">Bit</h2>
              <p className="mt-1 font-bold text-slate-700">
                Seu guia de segurança digital.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-100 p-3 text-amber-700">
                <Target aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">
                  Para criança
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Missão do dia
                </h2>
              </div>
            </div>

            <div className="rounded-[1.4rem] bg-yellow-100 p-5">
              <h3 className="text-2xl font-black text-slate-950">
                Descubra se um link é seguro
              </h3>
              <p className="mt-2 font-bold leading-relaxed text-slate-700">
                Olhe o endereço, desconfie de promessas mágicas e chame um
                adulto antes de clicar.
              </p>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-white">
                <div className="h-full w-[64%] rounded-full bg-emerald-500" />
              </div>
              <p className="mt-2 text-sm font-black text-emerald-800">
                64% das aventuras concluídas
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {childStats.map((stat) => (
                <MetricCard key={stat.label} {...stat} />
              ))}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {medals.map((medal) => (
                <div
                  key={medal}
                  className="rounded-2xl bg-pink-50 p-4 text-center font-black text-pink-900"
                >
                  <Trophy aria-hidden="true" className="mx-auto mb-2" />
                  {medal}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="kid-shadow rounded-[2rem] border-4 border-white bg-emerald-100 p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden="true" className="text-emerald-700" />
                <h2 className="text-2xl font-black text-slate-950">
                  Dica de segurança digital
                </h2>
              </div>
              <p className="mt-3 font-bold leading-relaxed text-emerald-950">
                Senha é segredo. Se alguém pedir sua senha, pare a conversa e
                chame sua família ou seus guias.
              </p>
            </div>

            <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
              <div className="flex items-center gap-3">
                <Sparkles aria-hidden="true" className="text-pink-600" />
                <h2 className="text-2xl font-black text-slate-950">
                  Atalhos rápidos
                </h2>
              </div>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/chat"
                  className="rounded-2xl bg-yellow-100 px-4 py-3 font-black text-amber-950"
                >
                  Conversar com Tutor Digital
                </Link>
                <Link
                  href="/exercicios"
                  className="rounded-2xl bg-sky-100 px-4 py-3 font-black text-sky-900"
                >
                  Fazer próximo desafio
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ProfilePanel
            eyebrow="Para responsável"
            title={productAreas.guardians}
            description="Acompanhe progresso, tempo de uso e alertas de segurança da criança."
            color="bg-sky-100 text-sky-800"
            icon={HeartHandshake}
            stats={guardianStats}
          />
          <ProfilePanel
            eyebrow="Para professor"
            title={productAreas.teachers}
            description="Veja turmas, alunos e indicadores para planejar missões educativas."
            color="bg-violet-100 text-violet-800"
            icon={GraduationCap}
            stats={teacherStats}
          />
        </section>
      </div>
    </LoggedLayout>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <Icon aria-hidden="true" className="mb-3 text-sky-700" />
      <p className="text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

type ProfilePanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
  stats: Array<{
    label: string;
    value: string;
    icon: LucideIcon;
  }>;
};

function ProfilePanel({
  eyebrow,
  title,
  description,
  color,
  icon: Icon,
  stats,
}: ProfilePanelProps) {
  return (
    <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className={`rounded-2xl p-3 ${color}`}>
          <Icon aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-pink-600">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-black text-slate-950">{title}</h2>
          <p className="mt-2 font-bold leading-relaxed text-slate-700">
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
