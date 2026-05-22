import Link from "next/link";
import { ArrowLeft, Sparkle, WandSparkles } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type PageShellProps = {
  badge: string;
  title: string;
  description: string;
  helperText?: string;
  children: React.ReactNode;
};

export function PageShell({
  badge,
  title,
  description,
  helperText = "Pronto para explorar",
  children,
}: PageShellProps) {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-4 md:px-8">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/86 px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-yellow-200"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Voltar para Home
        </Link>

        <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/90 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                <Sparkle aria-hidden="true" size={16} />
                {badge}
              </p>
              <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-lg font-bold leading-relaxed text-slate-700">
                {description}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-sky-100 px-4 py-3 text-sm font-black text-sky-800">
              <WandSparkles aria-hidden="true" size={18} />
              {helperText}
            </div>
          </div>

          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
}
