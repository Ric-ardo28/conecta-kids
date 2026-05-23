import {
  BarChart3,
  BookOpen,
  GraduationCap,
  PlusCircle,
  Rocket,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database } from "@/lib/supabase/types";

type TeacherRow = Pick<
  Database["public"]["Tables"]["teachers"]["Row"],
  "id" | "area"
>;
type ClassRow = Pick<
  Database["public"]["Tables"]["classes"]["Row"],
  "id" | "name" | "description"
>;

export default async function TurmasPage() {
  const { supabase, profile } = await getCurrentUserProfile();

  const teacherResult =
    profile.role === "professor"
      ? await supabase
          .from("teachers")
          .select("id, area")
          .eq("profile_id", profile.id)
          .maybeSingle()
      : { data: null, error: null };

  if (teacherResult.error) {
    throw new Error("Não foi possível carregar seu guia professor.");
  }

  const teacher = teacherResult.data as TeacherRow | null;
  const classesResult = teacher
    ? await supabase
        .from("classes")
        .select("id, name, description")
        .eq("teacher_id", teacher.id)
    : { data: [], error: null };

  if (classesResult.error) {
    throw new Error("Não foi possível carregar suas turmas.");
  }

  const classes = (classesResult.data ?? []) as ClassRow[];
  const classIds = classes.map((classroom) => classroom.id);
  const studentsResult =
    classIds.length > 0
      ? await supabase
          .from("class_students")
          .select("id", { count: "exact", head: true })
          .in("class_id", classIds)
      : { count: 0, error: null };

  if (studentsResult.error) {
    throw new Error("Não foi possível contar alunos vinculados.");
  }

  const teacherActions = [
    { label: "Turmas criadas", value: String(classes.length), icon: Users },
    {
      label: "Alunos vinculados",
      value: String(studentsResult.count ?? 0),
      icon: BarChart3,
    },
    { label: "Área/matéria", value: teacher?.area ? "1" : "0", icon: BookOpen },
    { label: "Atividades", value: "0", icon: Target },
  ];

  return (
    <LoggedLayout profile={profile}>
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
                Veja turmas, guias e missões vinculadas quando esses dados
                estiverem cadastrados no Supabase.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-yellow-100 p-5 text-amber-950">
              <Sparkles aria-hidden="true" className="mb-3" />
              <h2 className="text-2xl font-black">
                {classes.length > 0 ? "Turmas reais" : "Turmas em preparação"}
              </h2>
              <p className="mt-2 font-bold leading-relaxed">
                {classes.length > 0
                  ? "As informações abaixo vêm do Supabase."
                  : "Nenhuma turma vinculada ainda."}
              </p>
            </div>
          </div>
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

            <EmptyPanel
              title="Nenhuma turma vinculada ainda."
              description="Quando uma turma real for vinculada à sua conta, professor e missões aparecerão aqui."
              icon={Users}
            />
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

            <EmptyPanel
              title="Nenhuma missão de turma enviada ainda."
              description="As atividades reais da turma aparecerão aqui quando forem cadastradas."
              icon={Target}
            />
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
                Organize turmas, acompanhe alunos e prepare atividades quando
                essas funções estiverem completas.
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

          {classes.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-3">
              {classes.map((classroom) => (
                <ClassroomCard key={classroom.id} classroom={classroom} />
              ))}
            </div>
          ) : (
            <EmptyPanel
              title="Nenhuma turma criada ainda."
              description="Quando você criar turmas reais no Supabase, elas aparecerão neste painel."
              icon={GraduationCap}
            />
          )}
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

function EmptyPanel({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 p-5">
      <Icon aria-hidden="true" className="mb-3 text-sky-700" />
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 font-bold leading-relaxed text-slate-700">
        {description}
      </p>
    </div>
  );
}

function ClassroomCard({ classroom }: { classroom: ClassRow }) {
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
          <p className="font-bold text-slate-600">Turma cadastrada</p>
        </div>
      </div>
      <p className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700">
        {classroom.description || "Sem descrição cadastrada ainda."}
      </p>
    </article>
  );
}
