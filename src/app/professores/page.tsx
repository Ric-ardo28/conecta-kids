import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Mail,
  Medal,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";

const teachers = [
  {
    name: "Ana Ribeiro",
    avatar: "👩‍🏫",
    area: "Segurança Digital",
    classes: ["Turma Estrelinhas", "Turma Navegadores"],
    summary:
      "Ajuda crianças a reconhecer links perigosos, criar senhas fortes e pedir ajuda.",
    badge: "Guia principal",
    color: "bg-sky-100 text-sky-900",
  },
  {
    name: "Bruno Lima",
    avatar: "👨‍💻",
    area: "Informática Básica",
    classes: ["Primeiros Passos", "Mouse e Teclado"],
    summary:
      "Ensina computador, teclado, mouse, arquivos e cuidados ao ligar e desligar.",
    badge: "Guia técnico",
    color: "bg-emerald-100 text-emerald-900",
  },
  {
    name: "Clara Mendes",
    avatar: "👩‍🔬",
    area: "Pesquisa e Estudos",
    classes: ["Pesquisadores Kids", "Estudos Digitais"],
    summary:
      "Mostra como pesquisar, comparar fontes e usar vídeos educativos com segurança.",
    badge: "Guia de estudos",
    color: "bg-pink-100 text-pink-900",
  },
];

const guideStats = [
  { label: "Professores", value: "3", icon: GraduationCap },
  { label: "Turmas ativas", value: "6", icon: Users },
  { label: "Área/matéria", value: "3", icon: BookOpen },
  { label: "Guias verificados", value: "100%", icon: ShieldCheck },
];

const guideFocus = [
  {
    title: "Tecnologia segura",
    description: "Guias ensinam privacidade, senhas e sinais de alerta.",
    icon: ShieldCheck,
    color: "bg-emerald-100 text-emerald-900",
  },
  {
    title: "Estudos com calma",
    description: "Atividades curtas ajudam a criança a aprender no ritmo dela.",
    icon: Lightbulb,
    color: "bg-yellow-100 text-amber-950",
  },
  {
    title: "Turmas acompanhadas",
    description: "Cada guia acompanha grupos, missões e progresso.",
    icon: School,
    color: "bg-sky-100 text-sky-900",
  },
];

export default function ProfessoresPage() {
  return (
    <LoggedLayout>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-violet-800">
                {productAreas.teachers}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Guias que acompanham a jornada
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Veja professores, área/matéria, turmas acompanhadas e um
                perfil resumido de cada guia.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-violet-100 p-5 text-violet-950">
              <Sparkles aria-hidden="true" className="mb-3" />
              <h2 className="text-2xl font-black">Aprender com apoio</h2>
              <p className="mt-2 font-bold leading-relaxed">
                Professores ajudam a criança a praticar tecnologia com
                segurança, respeito e curiosidade.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.4rem] border-4 border-dashed border-violet-200 bg-violet-50 p-5 font-bold text-violet-950">
          Conteúdo de exemplo: esta área ainda não mostra guias reais da sua
          conta. Quando houver dados no Supabase, eles substituirão estes
          exemplos.
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-800">
                <Medal aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black text-slate-950">
                Resumo dos guias
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {guideStats.map((stat) => (
                <MetricCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-100 p-3 text-amber-800">
                <BadgeCheck aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">
                  Como os guias ajudam
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Focos de acompanhamento
                </h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {guideFocus.map((item) => (
                <FocusCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-700">
                Lista de professores
              </p>
              <h2 className="text-3xl font-black text-slate-950">
                Meus guias da plataforma
              </h2>
              <p className="mt-2 max-w-3xl font-bold leading-relaxed text-slate-700">
                Cada guia tem uma área/matéria, turmas vinculadas e um resumo
                para a família e a criança conhecerem melhor.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm font-black text-emerald-900">
              Todos os guias são apresentados de forma segura
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.name} teacher={teacher} />
            ))}
          </div>
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
    <div className="rounded-2xl bg-violet-50 p-4">
      <Icon aria-hidden="true" className="mb-3 text-violet-700" />
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

type FocusCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

function FocusCard({ title, description, icon: Icon, color }: FocusCardProps) {
  return (
    <article className={`rounded-[1.35rem] p-4 ${color}`}>
      <Icon aria-hidden="true" className="mb-3" />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm font-bold leading-relaxed">{description}</p>
    </article>
  );
}

type Teacher = (typeof teachers)[number];

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-slate-50 p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-16 place-items-center rounded-full bg-white text-3xl">
            {teacher.avatar}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-950">
              {teacher.name}
            </h3>
            <p className="font-bold text-slate-600">
              Área/matéria: {teacher.area}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-2 text-xs font-black ${teacher.color}`}
        >
          {teacher.badge}
        </span>
      </div>

      <p className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-relaxed text-slate-700">
        Perfil resumido: {teacher.summary}
      </p>

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-violet-700">
          <Users aria-hidden="true" size={16} />
          Turmas
        </div>
        <div className="flex flex-wrap gap-2">
          {teacher.classes.map((classroom) => (
            <span
              key={classroom}
              className="rounded-full bg-yellow-100 px-3 py-2 text-xs font-black text-amber-950"
            >
              {classroom}
            </span>
          ))}
        </div>
      </div>

      <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-4 py-3 font-black text-white transition hover:bg-violet-600">
        <Mail aria-hidden="true" size={19} />
        Ver perfil resumido
      </button>
    </article>
  );
}
