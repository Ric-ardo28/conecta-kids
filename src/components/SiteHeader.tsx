import Link from "next/link";
import { Sparkles } from "lucide-react";
import { loggedRoutes, publicRoutes } from "@/lib/routes";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-lg font-black text-slate-950 shadow-sm"
        >
          <Sparkles aria-hidden="true" className="text-pink-500" size={20} />
          Conecta Kids
        </Link>

        <nav aria-label="Páginas públicas" className="flex flex-wrap gap-2">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-full bg-white/82 px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-yellow-200"
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <nav aria-label="Páginas logadas" className="flex flex-wrap gap-2 pb-1">
        {loggedRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="shrink-0 rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-800 transition hover:bg-sky-200"
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
