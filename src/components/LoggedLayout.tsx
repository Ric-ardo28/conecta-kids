import Link from "next/link";
import {
  BookOpen,
  Bot,
  GraduationCap,
  Home,
  Medal,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { loggedRoutes } from "@/lib/routes";

type LoggedLayoutProps = {
  children: React.ReactNode;
};

const routeIcons = {
  "/dashboard": Home,
  "/trilhas": Route,
  "/aulas": BookOpen,
  "/exercicios": Target,
  "/ranking": Trophy,
  "/chat": Bot,
  "/turmas": Users,
  "/perfil": UserRound,
  "/responsaveis": ShieldCheck,
  "/professores": GraduationCap,
} as const;

const routeColors = [
  "bg-sky-100 text-sky-800",
  "bg-emerald-100 text-emerald-800",
  "bg-yellow-100 text-amber-900",
  "bg-pink-100 text-pink-800",
  "bg-indigo-100 text-indigo-800",
  "bg-cyan-100 text-cyan-800",
  "bg-lime-100 text-lime-800",
  "bg-orange-100 text-orange-800",
  "bg-rose-100 text-rose-800",
  "bg-violet-100 text-violet-800",
];

export function LoggedLayout({ children }: LoggedLayoutProps) {
  return (
    <main className="min-h-screen px-4 py-4 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="kid-shadow rounded-[2rem] border-4 border-white bg-white/94 p-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <div className="mb-5 flex items-center gap-3 rounded-[1.4rem] bg-slate-950 p-4 text-white">
            <div className="grid size-12 place-items-center rounded-2xl bg-yellow-300 text-slate-950">
              <Sparkles aria-hidden="true" />
            </div>
            <div>
              <Link href="/" className="text-xl font-black">
                Conecta Kids
              </Link>
              <p className="text-sm font-bold text-sky-100">Área logada</p>
            </div>
          </div>

          <nav aria-label="Menu da área logada" className="grid gap-2">
            {loggedRoutes.map((route, index) => {
              const Icon = routeIcons[route.href];
              const color = routeColors[index % routeColors.length];

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition hover:-translate-y-0.5 ${color}`}
                >
                  <Icon aria-hidden="true" size={19} />
                  {route.href === "/chat" ? "Tutor Digital" : route.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 rounded-[1.4rem] bg-yellow-100 p-4">
            <div className="flex items-center gap-2 text-amber-900">
              <Medal aria-hidden="true" size={19} />
              <p className="font-black">Dica do Bit</p>
            </div>
            <p className="mt-2 text-sm font-bold leading-relaxed text-amber-950">
              Se algo parecer estranho online, pare e chame um adulto de
              confiança.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-[1.4rem] bg-emerald-100 p-4 text-emerald-900">
            <Star aria-hidden="true" size={19} />
            <span className="font-black">128 estrelinhas</span>
          </div>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
