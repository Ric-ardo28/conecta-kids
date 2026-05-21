"use client";

import { FormEvent, useEffect, useState } from "react";
import { LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { productAreas } from "@/lib/product-areas";

export function AuthPanel() {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(
    hasSupabaseConfig
      ? "Entre para guardar estrelinhas e conquistas."
      : "Peça para um adulto configurar a entrada segura.",
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      return;
    }

    const supabase = createSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user.email) {
        setStatus(
          `Olá, ${data.session.user.email}! Sua jornada está pronta.`,
        );
      }
    });
  }, [hasSupabaseConfig]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !hasSupabaseConfig) {
      return;
    }

    setIsLoading(true);
    setStatus("Enviando link mágico para a família...");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      setStatus(
        error
          ? "Não consegui enviar agora. Confira o e-mail e tente novamente."
          : "Link enviado! Abra o e-mail com um adulto por perto.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
          <ShieldCheck aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
            {productAreas.guardians}
          </p>
          <h2 className="text-2xl font-black text-slate-900">
            Entrar com cuidado
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm font-bold text-slate-700" htmlFor="email">
          E-mail do responsável ou professor
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="adulto@exemplo.com"
          className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
        />
        <button
          type="submit"
          disabled={!hasSupabaseConfig || isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <LogIn aria-hidden="true" size={20} />
          {isLoading ? "Enviando..." : "Receber link mágico"}
        </button>
      </form>

      <p className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-50 p-3 text-sm font-bold text-amber-900">
        <Sparkles aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
        {status}
      </p>
    </section>
  );
}
