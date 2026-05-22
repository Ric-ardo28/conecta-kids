import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";

const guardians = [
  {
    name: "Marina Souza",
    relation: "Mãe",
    status: "Vínculo ativo",
    permission: "Acompanha progresso e alertas",
    color: "bg-emerald-100 text-emerald-900",
  },
  {
    name: "Paulo Souza",
    relation: "Pai",
    status: "Convite enviado",
    permission: "Aguardando confirmação",
    color: "bg-yellow-100 text-amber-950",
  },
];

const linkedChildren = [
  {
    name: "Lia",
    avatar: "🧑‍🚀",
    progress: 82,
    stars: 128,
    status: "Aprendendo com segurança",
  },
  {
    name: "Theo",
    avatar: "🧑‍🎨",
    progress: 47,
    stars: 61,
    status: "Precisa revisar links perigosos",
  },
];

const familyStats = [
  { label: "Crianças vinculadas", value: "2", icon: Users },
  { label: "Responsáveis", value: "2", icon: HeartHandshake },
  { label: "Progresso médio", value: "64%", icon: BarChart3 },
  { label: "Tempo de uso hoje", value: "32 min", icon: Clock },
];

const safetyAlerts = [
  {
    title: "Tentativa de link suspeito",
    description: "A criança marcou dúvida antes de clicar. Ótima pausa!",
    level: "Atenção",
    color: "bg-yellow-100 text-amber-950",
  },
  {
    title: "Pedido de ajuda registrado",
    description: "Lia pediu ajuda sobre mensagem de pessoa desconhecida.",
    level: "Acompanhar",
    color: "bg-pink-100 text-pink-900",
  },
  {
    title: "Rotina equilibrada",
    description: "Tempo de uso dentro do combinado da família.",
    level: "Tudo certo",
    color: "bg-emerald-100 text-emerald-900",
  },
];

export default function ResponsaveisPage() {
  return (
    <LoggedLayout>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-rose-800">
                {productAreas.guardians}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Família acompanhando de pertinho
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Responsáveis acompanham vínculos, progresso, alertas de
                segurança e combinados digitais das crianças.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-emerald-100 p-5 text-emerald-950">
              <ShieldCheck aria-hidden="true" className="mb-3" />
              <h2 className="text-2xl font-black">Cuidado compartilhado</h2>
              <p className="mt-2 font-bold leading-relaxed">
                A jornada digital fica melhor quando família e escola caminham
                junto com a criança.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-rose-100 p-3 text-rose-800">
                <HeartHandshake aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-rose-700">
                  Responsáveis vinculados
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Minha rede de cuidado
                </h2>
              </div>
            </div>

            <div className="grid gap-3">
              {guardians.map((guardian) => (
                <GuardianCard key={guardian.name} guardian={guardian} />
              ))}
            </div>
          </div>

          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-800">
                <Users aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-700">
                  Crianças vinculadas
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Acompanhamento
                </h2>
              </div>
            </div>

            <div className="grid gap-3">
              {linkedChildren.map((child) => (
                <ChildProgressCard key={child.name} child={child} />
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-100 p-3 text-amber-800">
                <Sparkles aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black text-slate-950">
                Resumo da família
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {familyStats.map((stat) => (
                <MetricCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-pink-100 p-3 text-pink-800">
                <AlertTriangle aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                  Alertas de segurança
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Pontos para conversar
                </h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {safetyAlerts.map((alert) => (
                <SafetyAlertCard key={alert.title} alert={alert} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </LoggedLayout>
  );
}

type Guardian = (typeof guardians)[number];

function GuardianCard({ guardian }: { guardian: Guardian }) {
  return (
    <article className="rounded-[1.5rem] bg-slate-50 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white p-3 text-rose-700">
            <UserRound aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-950">
              {guardian.name}
            </h3>
            <p className="font-bold text-slate-600">{guardian.relation}</p>
          </div>
        </div>
        <span
          className={`w-fit rounded-full px-3 py-2 text-xs font-black ${guardian.color}`}
        >
          {guardian.status}
        </span>
      </div>
      <p className="mt-4 rounded-2xl bg-white px-4 py-3 font-bold text-slate-700">
        {guardian.permission}
      </p>
    </article>
  );
}

type LinkedChild = (typeof linkedChildren)[number];

function ChildProgressCard({ child }: { child: LinkedChild }) {
  return (
    <article className="rounded-[1.5rem] bg-sky-50 p-5">
      <div className="flex items-center gap-3">
        <div className="grid size-16 place-items-center rounded-full bg-white text-3xl">
          {child.avatar}
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-950">{child.name}</h3>
          <p className="font-bold text-slate-600">{child.status}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-700">
            <span>Progresso</span>
            <span>{child.progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${child.progress}%` }}
            />
          </div>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-100 px-3 py-2 text-sm font-black text-amber-950">
          <Star aria-hidden="true" size={16} />
          {child.stars} estrelinhas
        </div>
      </div>
    </article>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-2xl bg-yellow-50 p-4">
      <Icon aria-hidden="true" className="mb-3 text-amber-700" />
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

type SafetyAlert = (typeof safetyAlerts)[number];

function SafetyAlertCard({ alert }: { alert: SafetyAlert }) {
  return (
    <article className={`rounded-[1.35rem] p-4 ${alert.color}`}>
      <BadgeCheck aria-hidden="true" className="mb-3" />
      <span className="text-xs font-black uppercase tracking-[0.14em]">
        {alert.level}
      </span>
      <h3 className="mt-2 text-xl font-black">{alert.title}</h3>
      <p className="mt-2 text-sm font-bold leading-relaxed">
        {alert.description}
      </p>
    </article>
  );
}
