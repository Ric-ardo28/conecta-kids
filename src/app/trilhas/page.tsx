import Link from "next/link";
import {
  BookOpen,
  Gamepad2,
  Globe,
  KeyRound,
  Laptop,
  PlayCircle,
  Search,
  ShieldAlert,
  Smartphone,
  Star,
  Video,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";

const adventures = [
  {
    title: "Primeiros Passos no Computador",
    description: "Aprenda mouse, teclado, janelas, arquivos e cuidados básicos.",
    emoji: "💻",
    icon: Laptop,
    level: "Iniciante",
    progress: 35,
    missions: 6,
  },
  {
    title: "Usando o Celular com Segurança",
    description: "Use aplicativos, notificações e tempo de tela com equilíbrio.",
    emoji: "📱",
    icon: Smartphone,
    level: "Iniciante",
    progress: 20,
    missions: 5,
  },
  {
    title: "Internet Segura para Crianças",
    description: "Entenda sites, navegação, privacidade e ajuda de adultos.",
    emoji: "🌎",
    icon: Globe,
    level: "Iniciante",
    progress: 60,
    missions: 7,
  },
  {
    title: "Senhas Fortes e Proteção",
    description: "Crie senhas melhores e proteja seus segredos digitais.",
    emoji: "🔐",
    icon: KeyRound,
    level: "Intermediário",
    progress: 45,
    missions: 4,
  },
  {
    title: "Cuidado com Estranhos Online",
    description: "Aprenda sinais de alerta e quando chamar um adulto.",
    emoji: "🦉",
    icon: ShieldAlert,
    level: "Intermediário",
    progress: 10,
    missions: 5,
  },
  {
    title: "Como Pesquisar na Internet",
    description: "Use palavras-chave, compare fontes e encontre boas respostas.",
    emoji: "🔎",
    icon: Search,
    level: "Intermediário",
    progress: 0,
    missions: 6,
  },
  {
    title: "Vídeos Educativos sem Perigo",
    description: "Escolha vídeos seguros, educativos e adequados para sua idade.",
    emoji: "🎬",
    icon: Video,
    level: "Iniciante",
    progress: 0,
    missions: 4,
  },
  {
    title: "Jogos Online com Segurança",
    description: "Jogue com respeito, cuidado com chats e limites de tempo.",
    emoji: "🎮",
    icon: Gamepad2,
    level: "Intermediário",
    progress: 80,
    missions: 6,
  },
  {
    title: "Organização dos Estudos Digitais",
    description: "Organize tarefas, pesquisas, arquivos e rotina de estudo.",
    emoji: "🚀",
    icon: BookOpen,
    level: "Avançado",
    progress: 0,
    missions: 5,
  },
  {
    title: "Boas Maneiras na Internet",
    description: "Pratique gentileza, respeito e responsabilidade online.",
    emoji: "⭐",
    icon: Star,
    level: "Iniciante",
    progress: 25,
    missions: 5,
  },
];

const levelStyles: Record<string, string> = {
  Iniciante: "bg-emerald-100 text-emerald-800",
  Intermediário: "bg-yellow-100 text-amber-900",
  Avançado: "bg-pink-100 text-pink-800",
} as const;

export default function TrilhasPage() {
  return (
    <LoggedLayout>
      <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-emerald-800">
              {productAreas.tracks}
            </p>
            <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
              Escolha sua próxima aventura
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
              Cada card tem missões curtas para aprender computador, celular,
              internet e segurança digital com diversão.
            </p>
          </div>

          <div className="rounded-2xl bg-sky-100 px-5 py-4 text-sm font-black text-sky-900">
            10 aventuras iniciais
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {adventures.map((adventure) => (
            <AdventureCard key={adventure.title} adventure={adventure} />
          ))}
        </div>
      </div>
    </LoggedLayout>
  );
}

type Adventure = (typeof adventures)[number];

function AdventureCard({ adventure }: { adventure: Adventure }) {
  const Icon = adventure.icon;
  const buttonLabel = adventure.progress > 0 ? "Continuar" : "Começar aventura";

  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="grid size-14 place-items-center rounded-2xl bg-sky-100 text-sky-700">
          <Icon aria-hidden="true" size={28} />
        </div>
        <span className="text-3xl" aria-hidden="true">
          {adventure.emoji}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            levelStyles[adventure.level]
          }`}
        >
          {adventure.level}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
          {adventure.missions} missões
        </span>
      </div>

      <h2 className="text-2xl font-black leading-tight text-slate-950">
        {adventure.title}
      </h2>
      <p className="mt-2 min-h-20 font-bold leading-relaxed text-slate-600">
        {adventure.description}
      </p>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm font-black text-slate-700">
          <span>Progresso</span>
          <span>{adventure.progress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${adventure.progress}%` }}
          />
        </div>
      </div>

      <Link
        href="/aulas"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-black text-white transition hover:bg-sky-600"
      >
        <PlayCircle aria-hidden="true" size={20} />
        {buttonLabel}
      </Link>
    </article>
  );
}
