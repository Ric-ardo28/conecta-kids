import Link from "next/link";
import {
  BarChart3,
  Bot,
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
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database, Json } from "@/lib/supabase/types";

type ProgressRow = Database["public"]["Tables"]["user_progress"]["Row"];
type RankingRow = Database["public"]["Tables"]["ranking"]["Row"];
type FamilyLinkRow = Pick<
  Database["public"]["Tables"]["responsible_children"]["Row"],
  "id" | "status"
>;
type TeacherRow = Pick<
  Database["public"]["Tables"]["teachers"]["Row"],
  "id" | "area"
>;
type ClassRow = Pick<Database["public"]["Tables"]["classes"]["Row"], "id" | "name">;

function getRoleLabel(role: string) {
  if (role === "responsavel") {
    return "Responsável";
  }

  if (role === "professor") {
    return "Professor";
  }

  return "Criança";
}

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

function getAverageProgress(rows: ProgressRow[]) {
  if (rows.length === 0) {
    return 0;
  }

  const total = rows.reduce((sum, item) => sum + item.progress_percent, 0);
  return Math.round(total / rows.length);
}

function getMedals(value: Json | undefined) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export default async function DashboardPage() {
  const { supabase, profile } = await getCurrentUserProfile();
  const displayName = getDisplayName(profile.full_name);

  const [progressResult, rankingResult, linksResult, teacherResult] =
    await Promise.all([
      supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", profile.id)
        .order("updated_at", { ascending: false }),
      supabase.from("ranking").select("*").eq("user_id", profile.id).maybeSingle(),
      supabase
        .from("responsible_children")
        .select("id,status")
        .eq("responsible_id", profile.id),
      supabase.from("teachers").select("id,area").eq("profile_id", profile.id).maybeSingle(),
    ]);

  if (progressResult.error) {
    throw new Error("Não foi possível carregar seu progresso.");
  }

  const progressRows = (progressResult.data ?? []) as ProgressRow[];
  const ranking = rankingResult.data as RankingRow | null;
  const completedMissions = progressRows.filter(
    (item) => item.status === "completed" && item.mission_id,
  ).length;
  const startedMissions = progressRows.filter((item) => item.mission_id).length;
  const averageProgress = getAverageProgress(progressRows);
  const stars =
    ranking?.stars ??
    progressRows.reduce((sum, item) => sum + item.stars, 0) ??
    0;
  const medals = getMedals(ranking?.medals);
  const familyLinks = (linksResult.data ?? []) as FamilyLinkRow[];
  const teacher = teacherResult.data as TeacherRow | null;

  const classesResult = teacher
    ? await supabase.from("classes").select("id,name").eq("teacher_id", teacher.id)
    : { data: [], error: null };
  const classes = (classesResult.data ?? []) as ClassRow[];
  const classIds = classes.map((item) => item.id);
  const studentsResult =
    classIds.length > 0
      ? await supabase
          .from("class_students")
          .select("id", { count: "exact", head: true })
          .in("class_id", classIds)
      : { count: 0, error: null };

  const childStats = [
    {
      label: "Progresso nas aventuras",
      value: `${averageProgress}%`,
      icon: BarChart3,
    },
    { label: "Estrelinhas reais", value: String(stars), icon: Star },
    { label: "Missões concluídas", value: String(completedMissions), icon: Trophy },
  ];

  const guardianStats = [
    {
      label: "Crianças vinculadas",
      value: String(familyLinks.length),
      icon: Users,
    },
    {
      label: "Vínculos ativos",
      value: String(familyLinks.filter((item) => item.status === "active").length),
      icon: HeartHandshake,
    },
    { label: "Tempo de uso", value: "0 min", icon: ShieldCheck },
  ];

  const teacherStats = [
    { label: "Turmas criadas", value: String(classes.length), icon: Users },
    { label: "Alunos vinculados", value: String(studentsResult.count ?? 0), icon: GraduationCap },
    { label: "Área/matéria", value: teacher?.area ? "1" : "0", icon: Medal },
  ];

  return (
    <LoggedLayout profile={profile}>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                {productAreas.dashboard}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Oi, {displayName}! Vamos continuar sua jornada?
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Seus dados abaixo vêm da sua conta Conecta Kids. Quando ainda
                não houver progresso registrado, mostramos um começo zerado.
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
                  Ver missões
                </Link>
              </div>
            </div>

            <div className="rounded-[1.6rem] bg-sky-100 p-5 text-center">
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar_url}
                  alt=""
                  className="mx-auto size-36 rounded-full object-cover"
                />
              ) : (
                <div className="mx-auto grid size-36 place-items-center rounded-full bg-yellow-300 text-4xl font-black text-slate-950">
                  {getInitials(displayName)}
                </div>
              )}
              <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-pink-600">
                Meu Avatar
              </p>
              <h2 className="text-3xl font-black text-slate-950">
                {getRoleLabel(profile.role)}
              </h2>
              <p className="mt-1 font-bold text-slate-700">
                {profile.points} pontos reais na plataforma.
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
                  Dados reais
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Progresso da jornada
                </h2>
              </div>
            </div>

            {progressRows.length > 0 ? (
              <div className="rounded-[1.4rem] bg-yellow-100 p-5">
                <h3 className="text-2xl font-black text-slate-950">
                  Você já começou {startedMissions} missão
                  {startedMissions === 1 ? "" : "ões"}.
                </h3>
                <p className="mt-2 font-bold leading-relaxed text-slate-700">
                  Continue no seu ritmo. O importante é evoluir com segurança.
                </p>
                <div className="mt-4 h-4 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${averageProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-black text-emerald-800">
                  {averageProgress}% de progresso médio registrado
                </p>
              </div>
            ) : (
              <EmptyState
                title="Você ainda não iniciou nenhuma missão."
                description="Escolha uma missão quando estiver pronto. Seu progresso real aparecerá aqui."
              />
            )}

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {childStats.map((stat) => (
                <MetricCard key={stat.label} {...stat} />
              ))}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {medals.length > 0 ? (
                medals.map((medal) => (
                  <div
                    key={medal}
                    className="rounded-2xl bg-pink-50 p-4 text-center font-black text-pink-900"
                  >
                    <Trophy aria-hidden="true" className="mx-auto mb-2" />
                    {medal}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-pink-50 p-4 text-center font-black text-pink-900 md:col-span-3">
                  Suas medalhas reais aparecerão aqui quando você conquistar.
                </div>
              )}
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
                  href="/perfil"
                  className="rounded-2xl bg-sky-100 px-4 py-3 font-black text-sky-900"
                >
                  Atualizar Meu Avatar
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ProfilePanel
            eyebrow="Para responsável"
            title={productAreas.guardians}
            description={
              familyLinks.length > 0
                ? "Acompanhe vínculos reais da sua família."
                : "Nenhuma criança vinculada ainda."
            }
            color="bg-sky-100 text-sky-800"
            icon={HeartHandshake}
            stats={guardianStats}
          />
          <ProfilePanel
            eyebrow="Para professor"
            title={productAreas.teachers}
            description={
              classes.length > 0
                ? "Veja suas turmas criadas no Supabase."
                : "Nenhuma turma criada ainda."
            }
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

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.4rem] bg-yellow-50 p-5">
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 font-bold leading-relaxed text-slate-700">
        {description}
      </p>
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

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
