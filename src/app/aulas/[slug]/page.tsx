import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Image as ImageIcon,
  PlayCircle,
  ShieldCheck,
  Target,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database } from "@/lib/supabase/types";

type MissionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    status?: string;
  }>;
};

type MissionRow = Database["public"]["Tables"]["missions"]["Row"] & {
  digital_adventures?:
    | {
        title: string;
        icon: string | null;
      }
    | Array<{
        title: string;
        icon: string | null;
      }>
    | null;
};
type ProgressRow = Pick<
  Database["public"]["Tables"]["user_progress"]["Row"],
  "id" | "status" | "progress_percent"
>;

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function completeMission(formData: FormData) {
  "use server";

  const missionId = String(formData.get("mission_id") ?? "");

  if (!UUID_REGEX.test(missionId)) {
    redirect("/aulas");
  }

  const { supabase, profile } = await getCurrentUserProfile();
  const { data: progress } = await supabase
    .from("user_progress")
    .select("id")
    .eq("user_id", profile.id)
    .eq("mission_id", missionId)
    .is("adventure_id", null)
    .maybeSingle();

  if (progress) {
    await supabase
      .from("user_progress")
      .update({
        status: "completed",
        progress_percent: 100,
        updated_at: new Date().toISOString(),
      })
      .eq("id", progress.id);
  } else {
    await supabase.from("user_progress").insert({
      user_id: profile.id,
      mission_id: missionId,
      status: "completed",
      progress_percent: 100,
      stars: 0,
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/trilhas");
  revalidatePath("/aulas");
  revalidatePath(`/aulas/${missionId}`);
  redirect(`/aulas/${missionId}?status=completed`);
}

function getContentParagraphs(mission: MissionRow) {
  const content = mission.content?.trim();

  if (!content) {
    return [mission.description];
  }

  return content.split(/\n+/).filter(Boolean);
}

function getAdventureInfo(mission: MissionRow) {
  const adventure = mission.digital_adventures;

  if (Array.isArray(adventure)) {
    return adventure[0] ?? null;
  }

  return adventure ?? null;
}

export default async function MissionDetailPage({
  params,
  searchParams,
}: MissionDetailPageProps) {
  const { slug } = await params;
  const statusParams = await searchParams;

  if (!UUID_REGEX.test(slug)) {
    notFound();
  }

  const { supabase, profile } = await getCurrentUserProfile();
  const [missionResult, progressResult] = await Promise.all([
    supabase
      .from("missions")
      .select("*, digital_adventures(title, icon)")
      .eq("id", slug)
      .maybeSingle(),
    supabase
      .from("user_progress")
      .select("id, status, progress_percent")
      .eq("user_id", profile.id)
      .eq("mission_id", slug)
      .is("adventure_id", null)
      .maybeSingle(),
  ]);

  if (missionResult.error || !missionResult.data) {
    notFound();
  }

  const mission = missionResult.data as unknown as MissionRow;
  const progress = progressResult.data as ProgressRow | null;
  const adventure = getAdventureInfo(mission);
  const isCompleted =
    progress?.status === "completed" || progress?.progress_percent === 100;
  const paragraphs = getContentParagraphs(mission);
  const backHref = mission.adventure_id
    ? `/aulas?adventure=${mission.adventure_id}`
    : "/aulas";

  return (
    <LoggedLayout profile={profile}>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <Link
            href={backHref}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-yellow-100"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Voltar para missões
          </Link>

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-amber-900">
                {mission.category}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                {mission.title}
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                {mission.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <InfoPill text={`${mission.duration_minutes} min`} />
                <InfoPill text={mission.difficulty} />
                <InfoPill
                  text={isCompleted ? "Concluída" : "Não iniciada"}
                />
              </div>
            </div>

            <div className="rounded-[1.6rem] bg-sky-100 p-5 text-center">
              <div className="mx-auto grid aspect-video place-items-center rounded-[1.3rem] bg-white text-7xl">
                <span aria-hidden="true">
                  {adventure?.icon ?? "⭐"}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 font-black text-sky-900">
                <ImageIcon aria-hidden="true" size={18} />
                Área visual para imagem ou vídeo
              </div>
              <p className="mt-2 text-sm font-bold text-slate-700">
                {adventure?.title ?? "Missão digital"}
              </p>
            </div>
          </div>
        </section>

        {statusParams?.status === "completed" ? (
          <p className="rounded-2xl bg-emerald-100 px-5 py-4 font-black text-emerald-900">
            Missão concluída com sucesso.
          </p>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-100 p-3 text-amber-700">
                <PlayCircle aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black text-slate-950">
                Conteúdo da missão
              </h2>
            </div>

            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <div
                  key={`${mission.id}-${index}`}
                  className="rounded-[1.4rem] bg-slate-50 p-5 font-bold leading-relaxed text-slate-700"
                >
                  <span className="mb-2 inline-grid size-8 place-items-center rounded-full bg-sky-500 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="kid-shadow rounded-[2rem] border-4 border-white bg-emerald-100 p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden="true" className="text-emerald-700" />
                <h2 className="text-2xl font-black text-slate-950">
                  Dica de segurança
                </h2>
              </div>
              <p className="mt-3 font-bold leading-relaxed text-emerald-950">
                {mission.safety_tip ?? "Na dúvida, peça ajuda a um adulto."}
              </p>
            </div>

            <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
              <h2 className="text-2xl font-black text-slate-950">
                Próximo passo
              </h2>
              <div className="mt-4 grid gap-3">
                <form action={completeMission}>
                  <input type="hidden" name="mission_id" value={mission.id} />
                  <button
                    type="submit"
                    disabled={isCompleted}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-black text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    <BadgeCheck aria-hidden="true" size={20} />
                    {isCompleted ? "Missão concluída" : "Concluir missão"}
                  </button>
                </form>
                <Link
                  href={`/exercicios?mission=${mission.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-300 px-5 py-4 font-black text-slate-950 transition hover:bg-yellow-200"
                >
                  <Target aria-hidden="true" size={20} />
                  Ir para desafio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LoggedLayout>
  );
}

function InfoPill({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
      {text}
    </span>
  );
}
