import {
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Medal,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database } from "@/lib/supabase/types";

type TeacherRow = Pick<
  Database["public"]["Tables"]["teachers"]["Row"],
  "id" | "area" | "bio"
>;

export default async function ProfessoresPage() {
  const { supabase, profile } = await getCurrentUserProfile();

  const teacherResult =
    profile.role === "professor"
      ? await supabase
          .from("teachers")
          .select("id, area, bio")
          .eq("profile_id", profile.id)
          .maybeSingle()
      : { data: null, error: null };

  if (teacherResult.error) {
    throw new Error("Não foi possível carregar seus dados de guia.");
  }

  const teacher = teacherResult.data as TeacherRow | null;
  const classesResult = teacher
    ? await supabase.from("classes").select("id").eq("teacher_id", teacher.id)
    : { data: [], error: null };

  if (classesResult.error) {
    throw new Error("Não foi possível carregar turmas do guia.");
  }

  const guideStats = [
    { label: "Meu perfil de guia", value: teacher ? "1" : "0", icon: GraduationCap },
    {
      label: "Turmas vinculadas",
      value: String(classesResult.data?.length ?? 0),
      icon: Users,
    },
    { label: "Área/matéria", value: teacher?.area ? "1" : "0", icon: BookOpen },
    { label: "Guias vinculados", value: "0", icon: ShieldCheck },
  ];

  return (
    <LoggedLayout profile={profile}>
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
                perfil resumido quando esses vínculos existirem no Supabase.
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
              <FocusCard
                title="Tecnologia segura"
                description="Guias ensinam privacidade, senhas e sinais de alerta."
                icon={ShieldCheck}
                color="bg-emerald-100 text-emerald-900"
              />
              <FocusCard
                title="Estudos com calma"
                description="Atividades curtas ajudam a criança a aprender no ritmo dela."
                icon={Lightbulb}
                color="bg-yellow-100 text-amber-950"
              />
              <FocusCard
                title="Turmas acompanhadas"
                description="Os vínculos reais aparecerão quando houver turmas cadastradas."
                icon={School}
                color="bg-sky-100 text-sky-900"
              />
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
                Esta área exibirá guias vinculados à criança ou às turmas reais.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-100 px-5 py-4 text-sm font-black text-emerald-900">
              Todos os guias serão apresentados de forma segura
            </div>
          </div>

          {teacher ? (
            <article className="rounded-[1.6rem] border-4 border-white bg-slate-50 p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-16 place-items-center rounded-full bg-white text-3xl">
                    <GraduationCap aria-hidden="true" className="text-violet-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-950">
                      Meu perfil de guia
                    </h3>
                    <p className="font-bold text-slate-600">
                      Área/matéria: {teacher.area}
                    </p>
                  </div>
                </div>
              </div>

              <p className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-relaxed text-slate-700">
                Perfil resumido: {teacher.bio || "Sem resumo cadastrado ainda."}
              </p>
            </article>
          ) : (
            <EmptyPanel
              title="Área de professores em preparação."
              description="Nenhum guia real está vinculado à sua conta ainda."
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
      <Icon aria-hidden="true" className="mb-3 text-violet-700" />
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 font-bold leading-relaxed text-slate-700">
        {description}
      </p>
    </div>
  );
}
