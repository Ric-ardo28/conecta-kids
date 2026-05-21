import {
  BadgeCheck,
  BookOpen,
  Brain,
  Gamepad2,
  Globe,
  KeyRound,
  Laptop,
  Medal,
  MousePointerClick,
  Smartphone,
  Star,
  Wifi,
} from "lucide-react";
import { AuthPanel } from "@/components/AuthPanel";
import { TutorChat } from "@/components/TutorChat";
import { productAreas } from "@/lib/product-areas";

const lessons = [
  {
    title: "Aventura dos cliques",
    description: "Mouse, teclado, tela e combinados para cuidar do computador.",
    icon: Laptop,
    color: "bg-sky-100 text-sky-700",
    badge: "Meu Guia",
  },
  {
    title: "Celular esperto",
    description: "Aplicativos, notificações, fotos e tempo de tela com equilíbrio.",
    icon: Smartphone,
    color: "bg-emerald-100 text-emerald-700",
    badge: "Desafio",
  },
  {
    title: "Internet segura",
    description: "Links perigosos, golpes, estranhos online e ajuda de adultos.",
    icon: Globe,
    color: "bg-pink-100 text-pink-700",
    badge: "Missão",
  },
  {
    title: "Senha campeã",
    description: "Senhas fortes, segredos digitais e cuidado com dados pessoais.",
    icon: KeyRound,
    color: "bg-amber-100 text-amber-700",
    badge: "Conquista",
  },
];

const quests = [
  "Abrir o navegador com calma",
  "Pesquisar usando palavras-chave",
  "Reconhecer um link suspeito",
  "Pausar e chamar um adulto",
];

const achievements = [
  ["⭐", "Estrela da Pesquisa"],
  ["🛡️", "Guardião da Senha"],
  ["🎮", "Mestre dos Apps"],
  ["🏅", "Clique Consciente"],
];

const areaHighlights = [
  productAreas.dashboard,
  productAreas.profile,
  productAreas.guardians,
  productAreas.teachers,
  productAreas.classes,
];

const supportAreas = [
  productAreas.privacy,
  productAreas.terms,
  productAreas.ranking,
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="mx-auto grid min-h-[92vh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 py-8 md:grid-cols-[1.08fr_0.92fr] md:px-8 lg:py-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/82 px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
            <Wifi aria-hidden="true" size={18} className="text-emerald-600" />
            Inclusão digital infantil
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] text-slate-950 sm:text-6xl lg:text-7xl">
              Conecta Kids
            </h1>
            <p className="max-w-2xl text-xl font-bold leading-relaxed text-slate-700">
              Aprenda a usar celular, computador e internet com segurança,
              diversão e responsabilidade.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-sky-600"
            >
              <BookOpen aria-hidden="true" size={20} />
              {productAreas.dashboard}
            </a>
            <a
              href="/chat"
              className="inline-flex items-center gap-2 rounded-2xl bg-yellow-300 px-5 py-4 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-yellow-200"
            >
              <Brain aria-hidden="true" size={20} />
              {productAreas.chat}
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {areaHighlights.map((guide) => (
              <span
                key={guide}
                className="rounded-full bg-white/82 px-4 py-2 text-sm font-black text-slate-700 shadow-sm"
              >
                {guide}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <div className="kid-shadow floaty absolute left-1/2 top-8 w-[min(360px,90vw)] -translate-x-1/2 rounded-[2rem] border-4 border-white bg-white p-5">
            <div className="rounded-[1.6rem] bg-sky-100 p-5">
              <div className="mx-auto grid size-52 place-items-center rounded-full bg-yellow-300 text-8xl shadow-inner">
                🤖
              </div>
              <div className="mt-5 rounded-3xl bg-white p-4 text-center">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-pink-600">
                  {productAreas.profile}
                </p>
                <p className="text-3xl font-black text-slate-950">Bit</p>
                <p className="mt-1 font-bold text-slate-600">
                  Seu amigo nas aventuras digitais.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-3xl bg-emerald-500 px-5 py-4 font-black text-white kid-shadow md:bottom-10 md:-left-16 md:translate-x-0">
            🏆 4 {productAreas.lessons.toLowerCase()} hoje
          </div>
          <div className="absolute right-4 top-0 rounded-3xl bg-pink-500 px-5 py-4 font-black text-white kid-shadow">
            ✨ +120 pontos
          </div>
        </div>
      </section>

      <section id="aventuras" className="bg-white/72 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-pink-600">
                {productAreas.tracks}
              </p>
              <h2 className="text-4xl font-black text-slate-950">
                {productAreas.lessons} curtas, coloridas e práticas
              </h2>
            </div>
            <div className="inline-flex max-w-max items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white">
              <Gamepad2 aria-hidden="true" size={18} />
              Aprender brincando
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lessons.map((lesson) => (
              <article
                key={lesson.title}
                className="pop-in rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-5 grid size-14 place-items-center rounded-2xl ${lesson.color}`}
                >
                  <lesson.icon aria-hidden="true" size={28} />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                  {lesson.badge}
                </span>
                <h3 className="mt-4 text-2xl font-black text-slate-950">
                  {lesson.title}
                </h3>
                <p className="mt-2 font-bold leading-relaxed text-slate-600">
                  {lesson.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-yellow-300 p-6 kid-shadow">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-3 text-amber-700">
                <MousePointerClick aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-900">
                  {productAreas.lessons}
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  {productAreas.exercises} do dia
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              {quests.map((quest) => (
                <div
                  key={quest}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 font-black text-slate-800"
                >
                  <BadgeCheck aria-hidden="true" className="text-emerald-600" />
                  {quest}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AuthPanel />
            <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-pink-100 p-3 text-pink-700">
                  <Medal aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">
                    {productAreas.ranking}
                  </p>
                  <h2 className="text-2xl font-black text-slate-900">
                    Medalhas e estrelinhas
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map(([icon, title]) => (
                  <div
                    key={title}
                    className="rounded-2xl bg-slate-50 p-4 text-center font-black text-slate-800"
                  >
                    <div className="text-4xl">{icon}</div>
                    <p className="mt-2 text-sm">{title}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section id="kids-digital" className="bg-sky-50 px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700">
              <Star aria-hidden="true" className="text-yellow-500" size={18} />
              {productAreas.chat}
            </div>
            <h2 className="text-4xl font-black text-slate-950">
              Pergunte, pratique e avance na jornada
            </h2>
            <p className="text-lg font-bold leading-relaxed text-slate-700">
              Uma conversa simples, alegre e segura para tirar dúvidas, vencer
              desafios e chamar um adulto quando precisar.
            </p>
          </div>
          <TutorChat />
        </div>
      </section>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {supportAreas.map((area) => (
            <div
              key={area}
              className="rounded-full border-2 border-white bg-white/86 px-4 py-2 text-sm font-black text-slate-700 shadow-sm"
            >
              {area}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
