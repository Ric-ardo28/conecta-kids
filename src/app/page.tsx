import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  Gamepad2,
  Globe,
  GraduationCap,
  HeartHandshake,
  KeyRound,
  Laptop,
  Medal,
  MousePointerClick,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { productAreas } from "@/lib/product-areas";

const learningCards = [
  {
    title: "Usar o computador",
    description: "Primeiros cliques, teclado, tela e cuidados com arquivos.",
    emoji: "💻",
    icon: Laptop,
    color: "bg-sky-100 text-sky-700",
  },
  {
    title: "Usar o celular com equilíbrio",
    description: "Aplicativos, notificações e tempo de tela com combinados.",
    emoji: "📱",
    icon: Smartphone,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Navegar na internet com segurança",
    description: "Sites, pesquisas, links e escolhas mais cuidadosas.",
    emoji: "🌎",
    icon: Globe,
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "Criar senhas fortes",
    description: "Segredos digitais que não devem ser compartilhados.",
    emoji: "🔐",
    icon: KeyRound,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Evitar golpes e links perigosos",
    description: "Sinais de alerta antes de clicar, baixar ou responder.",
    emoji: "🛡️",
    icon: ShieldCheck,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "Estudar usando tecnologia",
    description: "Pesquisa, leitura, organização e bons hábitos digitais.",
    emoji: "🚀",
    icon: Rocket,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Pedir ajuda para um adulto",
    description: "Quando algo assustar, confundir ou parecer estranho.",
    emoji: "🦉",
    icon: HeartHandshake,
    color: "bg-lime-100 text-lime-700",
  },
  {
    title: "Ter boas maneiras online",
    description: "Gentileza, respeito, privacidade e responsabilidade.",
    emoji: "⭐",
    icon: Star,
    color: "bg-violet-100 text-violet-700",
  },
];

const safeInternetSteps = [
  "Pare antes de clicar em links estranhos.",
  "Nunca compartilhe senha ou dados pessoais.",
  "Chame um adulto se algo parecer errado.",
];

const playfulSteps = [
  "Missões curtas com linguagem simples",
  "Desafios para praticar o que aprendeu",
  "Medalhas para celebrar cada avanço",
];

const achievements = [
  ["⭐", "Estrela da Pesquisa"],
  ["🔐", "Senha Campeã"],
  ["🏆", "Clique Consciente"],
  ["🎮", "Mestre dos Apps"],
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-lg font-black text-slate-950 shadow-sm"
        >
          <Sparkles aria-hidden="true" className="text-pink-500" size={20} />
          Conecta Kids
        </Link>

        <nav aria-label="Acesso principal" className="flex flex-wrap gap-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:bg-sky-100"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-sky-600"
          >
            Começar agora
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[82vh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-12 pt-5 md:grid-cols-[1.06fr_0.94fr] md:px-8 lg:pb-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/82 px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
            <Globe aria-hidden="true" size={18} className="text-emerald-600" />
            Inclusão digital infantil
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-slate-950 sm:text-6xl lg:text-7xl">
              Aprenda tecnologia do jeito certo desde pequeno
            </h1>
            <p className="max-w-2xl text-xl font-bold leading-relaxed text-slate-700">
              O Conecta Kids ajuda crianças a usarem celular, computador e
              internet com segurança, diversão e responsabilidade.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-sky-600"
            >
              <Rocket aria-hidden="true" size={20} />
              Começar agora
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-yellow-300 px-5 py-4 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-yellow-200"
            >
              <BookOpen aria-hidden="true" size={20} />
              Entrar
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {[productAreas.dashboard, productAreas.chat, productAreas.profile].map(
              (area) => (
                <span
                  key={area}
                  className="rounded-full bg-white/82 px-4 py-2 text-sm font-black text-slate-700 shadow-sm"
                >
                  {area}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative min-h-[450px]">
          <div className="kid-shadow floaty absolute left-1/2 top-8 w-[min(390px,90vw)] -translate-x-1/2 rounded-[2rem] border-4 border-white bg-white p-5">
            <div className="rounded-[1.6rem] bg-sky-100 p-5">
              <div className="mx-auto grid size-56 place-items-center rounded-full bg-yellow-300 text-8xl shadow-inner">
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
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-3xl bg-emerald-500 px-5 py-4 font-black text-white kid-shadow md:bottom-12 md:-left-12 md:translate-x-0">
            🏆 Missão segura
          </div>
          <div className="absolute right-4 top-0 rounded-3xl bg-pink-500 px-5 py-4 font-black text-white kid-shadow">
            ⭐ +120 estrelinhas
          </div>
        </div>
      </section>

      <section className="bg-white/72 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="O que a criança aprende?"
            title="Habilidades digitais para a vida real"
            description="Cada card vira uma aventura curta, visual e prática para aprender sem medo."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {learningCards.map((card) => (
              <article
                key={card.title}
                className="pop-in rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`grid size-14 place-items-center rounded-2xl ${card.color}`}
                  >
                    <card.icon aria-hidden="true" size={28} />
                  </div>
                  <span className="text-3xl" aria-hidden="true">
                    {card.emoji}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-2 font-bold leading-relaxed text-slate-600">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <AudiencePanel
            eyebrow="Para responsáveis"
            title={productAreas.guardians}
            description="Acompanhe a jornada da criança, combine limites saudáveis e reforce segurança sem transformar tecnologia em susto."
            icon={Users}
            color="bg-emerald-100 text-emerald-700"
            items={[
              "Combinados de uso simples",
              "Orientações para senhas e privacidade",
              "Apoio para conversar sobre riscos online",
            ]}
          />
          <AudiencePanel
            eyebrow="Para professores"
            title={productAreas.teachers}
            description="Organize missões educativas para turma, conecte tecnologia ao estudo e ajude crianças a pesquisarem melhor."
            icon={GraduationCap}
            color="bg-sky-100 text-sky-700"
            items={[
              "Aventuras Digitais por tema",
              "Desafios curtos para sala de aula",
              "Linguagem simples para inclusão digital",
            ]}
          />
        </div>
      </section>

      <section className="bg-sky-50 px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Internet segura"
              title="Segurança antes do clique"
              description="A criança aprende a reconhecer sinais de perigo e pedir ajuda para adultos de confiança."
            />
            <Link
              href="/privacidade"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-base font-black text-white transition hover:bg-emerald-600"
            >
              <ShieldCheck aria-hidden="true" size={20} />
              Ver segurança e privacidade
            </Link>
          </div>

          <div className="grid gap-3">
            {safeInternetSteps.map((step) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-[1.4rem] border-4 border-white bg-white p-5 font-black text-slate-800 shadow-sm"
              >
                <BadgeCheck aria-hidden="true" className="text-emerald-600" />
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="kid-shadow rounded-[2rem] bg-yellow-300 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-3 text-amber-700">
                <Gamepad2 aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-900">
                  Aprenda brincando
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Missões, desafios e prática
                </h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {playfulSteps.map((step) => (
                <div
                  key={step}
                  className="rounded-2xl bg-white p-4 font-black text-slate-800"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-pink-100 p-3 text-pink-700">
                <Medal aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">
                  Conquistas e estrelinhas
                </p>
                <h2 className="text-2xl font-black text-slate-900">
                  {productAreas.ranking}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map(([icon, title]) => (
                <div
                  key={title}
                  className="rounded-2xl bg-slate-50 p-4 text-center font-black text-slate-800"
                >
                  <div className="text-4xl" aria-hidden="true">
                    {icon}
                  </div>
                  <p className="mt-2 text-sm">{title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="bg-white/76 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border-4 border-white bg-sky-100 p-8 text-center kid-shadow">
          <Trophy aria-hidden="true" className="mx-auto mb-4 text-pink-500" />
          <h2 className="text-4xl font-black text-slate-950">
            Comece a jornada digital com segurança
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-bold leading-relaxed text-slate-700">
            Crie uma conta para acessar missões, desafios, Kids Digital e
            conquistas feitas para crianças aprenderem do jeito certo.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/cadastro"
              className="rounded-2xl bg-yellow-300 px-6 py-4 font-black text-slate-950 transition hover:bg-yellow-200"
            >
              Começar agora
            </Link>
            <Link
              href="/login"
              className="rounded-2xl bg-white px-6 py-4 font-black text-slate-950 transition hover:bg-yellow-100"
            >
              Entrar
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t-4 border-white pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-black text-slate-950">Conecta Kids</p>
            <p className="font-bold text-slate-600">
              Inclusão digital infantil com cuidado e alegria.
            </p>
          </div>
          <nav aria-label="Links do rodapé" className="flex flex-wrap gap-2">
            <Link
              href="/privacidade"
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm hover:bg-emerald-100"
            >
              Privacidade
            </Link>
            <Link
              href="/termos"
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm hover:bg-yellow-100"
            >
              Termos
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-pink-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-4xl font-black text-slate-950">{title}</h2>
      <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
        {description}
      </p>
    </div>
  );
}

type AudiencePanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  items: string[];
};

function AudiencePanel({
  eyebrow,
  title,
  description,
  icon: Icon,
  color,
  items,
}: AudiencePanelProps) {
  return (
    <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-2xl p-3 ${color}`}>
          <Icon aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-600">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-black text-slate-950">{title}</h2>
        </div>
      </div>
      <p className="font-bold leading-relaxed text-slate-700">{description}</p>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-black text-slate-800"
          >
            <MousePointerClick
              aria-hidden="true"
              className="text-emerald-600"
              size={18}
            />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
