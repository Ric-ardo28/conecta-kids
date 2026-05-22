import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Image as ImageIcon,
  PlayCircle,
  ShieldCheck,
  Target,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { getMissionBySlug, missions } from "@/lib/missions";

type MissionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return missions.map((mission) => ({
    slug: mission.slug,
  }));
}

export default async function MissionDetailPage({
  params,
}: MissionDetailPageProps) {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);

  if (!mission) {
    notFound();
  }

  return (
    <LoggedLayout>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <Link
            href="/aulas"
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
                <InfoPill text={mission.duration} />
                <InfoPill text={mission.difficulty} />
                <InfoPill text={mission.status} />
              </div>
            </div>

            <div className="rounded-[1.6rem] bg-sky-100 p-5 text-center">
              <div className="mx-auto grid aspect-video place-items-center rounded-[1.3rem] bg-white text-7xl">
                <span aria-hidden="true">{mission.emoji}</span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 font-black text-sky-900">
                <ImageIcon aria-hidden="true" size={18} />
                Área visual para imagem ou vídeo
              </div>
              <p className="mt-2 text-sm font-bold text-slate-700">
                {mission.visualTitle}
              </p>
            </div>
          </div>
        </section>

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
              {mission.content.map((paragraph, index) => (
                <div
                  key={paragraph}
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
                {mission.safetyTip}
              </p>
            </div>

            <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
              <h2 className="text-2xl font-black text-slate-950">
                Próximo passo
              </h2>
              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-black text-white transition hover:bg-emerald-600"
                >
                  <BadgeCheck aria-hidden="true" size={20} />
                  Concluir missão
                </button>
                <Link
                  href="/exercicios"
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
