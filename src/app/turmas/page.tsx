import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  GraduationCap,
  PlusCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";

const childClassMissions = [
  {
    title: "Como saber se um link é seguro?",
    status: "Para fazer",
    progress: 20,
    color: "bg-sky-100 text-sky-900",
  },
  {
    title: "Criando uma senha forte",
    status: "Em andamento",
    progress: 55,
    color: "bg-yellow-100 text-amber-950",
  },
  {
    title: "Boas maneiras no chat",
    status: "Concluída",
    progress: 100,
    color: "bg-emerald-100 text-emerald-900",
  },
];

const teacherClasses = [
  {
    name: "Turma Estrelinhas",
    students: 24,
    progress: 72,
    nextActivity: "Desafio: link perigoso",
  },
  {
    name: "Turma Navegadores",
    students: 18,
    progress: 61,
    nextActivity: "Missão: teclado e mouse",
  },
  {
    name: "Turma Senhas Fortes",
    students: 21,
    progress: 84,
    nextActivity: "Revisão de segurança",
  },
];

const teacherActions = [
  { label: "Criar turma", value: "Nova", icon: PlusCircle },
  { label: "Listar alunos", value: "63", icon: Users },
  { label: "Ver progresso", value: "72%", icon: BarChart3 },
  { label: "Criar atividades futuramente", value: "Planejado", icon: Target },
];

export default function TurmasPage() {
  return (
    <LoggedLayout>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-lime-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-lime-800">
                {productAreas.classes}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Sua turminha digital reunida
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Veja sua turma, professor, missões combinadas e progresso de
                aprendizado com tecnologia segura.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-yellow-100 p-5 text-amber-950">
              <Sparkles aria-hidden="true" className="mb-3" />
              <h2 className="text-2xl font-black">Turma Estrelinhas</h2>
              <p className="mt-2 font-bold leading-relaxed">
                Aprendendo internet segura com a professora Ana.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.4rem] border-4 border-dashed border-lime-200 bg-lime-50 p-5 font-bold text-lime-950">
          Conteúdo de exemplo: esta área ainda não mostra turmas reais da sua
          conta. Quando houver dados no Supabase, eles substituirão estes
          exemplos.
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-800">
                <BookOpen aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-700">
                  Para criança
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Minha turma
                </h2>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-sky-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="grid size-20 place-items-center rounded-full bg-yellow-300 text-4xl">
                  👩‍🏫
                </div>
                <div>
                  <p className="font-black text-slate-950">
                    Professora Ana Ribeiro
                  </p>
                  <p className="mt-1 font-bold text-slate-700">
                    Guia da turma em segurança digital e estudos online.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <InfoPill icon={Users} label="Colegas" value="24" />
                <InfoPill icon={BadgeCheck} label="Missões da turma" value="8" />
                <InfoPill icon={ShieldCheck} label="Dicas seguras" value="5" />
              </div>
            </div>
          </div>

          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-100 p-3 text-amber-800">
                <Rocket aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">
                  Missões da turma
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Próximas atividades
                </h2>
              </div>
            </div>

            <div className="grid gap-3">
              {childClassMissions.map((mission) => (
                <MissionRow key={mission.title} mission={mission} />
              ))}
            </div>
          </div>
        </section>

        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-700">
                Para professor
              </p>
              <h2 className="text-3xl font-black text-slate-950">
                Painel da turminha
              </h2>
              <p className="mt-2 max-w-3xl font-bold leading-relaxed text-slate-700">
                Organize turmas, acompanhe alunos, veja progresso e prepare
                atividades para as próximas etapas.
              </p>
            </div>
            <button className="inline-flex w-fit items-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 font-black text-white transition hover:bg-violet-600">
              <PlusCircle aria-hidden="true" size={20} />
              Criar turma
            </button>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {teacherActions.map((action) => (
              <MetricCard key={action.label} {...action} />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {teacherClasses.map((classroom) => (
              <ClassroomCard key={classroom.name} classroom={classroom} />
            ))}
          </div>
        </section>
      </div>
    </LoggedLayout>
  );
}

type InfoPillProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function InfoPill({ icon: Icon, label, value }: InfoPillProps) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <Icon aria-hidden="true" className="mb-2 text-sky-700" />
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

type Mission = (typeof childClassMissions)[number];

function MissionRow({ mission }: { mission: Mission }) {
  return (
    <article className="rounded-[1.35rem] bg-slate-50 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-black text-slate-950">{mission.title}</h3>
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-black ${mission.color}`}
        >
          {mission.status}
        </span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${mission.progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm font-black text-slate-600">
        {mission.progress}% de progresso
      </p>
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
    <div className="rounded-2xl bg-violet-50 p-4">
      <Icon aria-hidden="true" className="mb-3 text-violet-700" />
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

type Classroom = (typeof teacherClasses)[number];

function ClassroomCard({ classroom }: { classroom: Classroom }) {
  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-slate-50 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-lime-100 p-3 text-lime-800">
          <GraduationCap aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-950">
            {classroom.name}
          </h3>
          <p className="font-bold text-slate-600">
            {classroom.students} alunos
          </p>
        </div>
      </div>
      <p className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700">
        Próxima atividade: {classroom.nextActivity}
      </p>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-700">
          <span>Progresso</span>
          <span>{classroom.progress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-sky-500"
            style={{ width: `${classroom.progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
