"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { KeyRound, LogIn, Mail, Search, Sparkles } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseBrowserConfig } from "@/lib/supabase/config";

export function LoginForm() {
  const hasSupabaseConfig = hasSupabaseBrowserConfig();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(
    hasSupabaseConfig
      ? "Entre com seu e-mail e senha para continuar a jornada."
      : "Modo demonstração ativo: o login real será ligado ao Supabase.",
  );

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setStatus("Preencha e-mail e senha para entrar.");
      return;
    }

    if (!hasSupabaseConfig) {
      setStatus("Modo demonstração: entrada simulada com segurança.");
      return;
    }

    setIsLoading(true);
    setStatus("Conferindo seus dados...");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setStatus(
        error
          ? "Não consegui entrar. Confira e-mail e senha."
          : "Entrada feita! Sua jornada está pronta.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    if (!hasSupabaseConfig) {
      setStatus("Modo demonstração: botão do Google preparado.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
        }/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setStatus("Não consegui abrir o login com Google agora.");
    }
  }

  async function handlePasswordReset() {
    if (!email) {
      setStatus("Digite seu e-mail para receber ajuda com a senha.");
      return;
    }

    if (!hasSupabaseConfig) {
      setStatus("Modo demonstração: recuperação de senha preparada.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    setStatus(
      error
        ? "Não consegui enviar a recuperação agora."
        : "Enviamos um e-mail para ajudar com sua senha.",
    );
  }

  return (
    <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/94 p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
          <LogIn aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-sky-700">
            Login
          </p>
          <h2 className="text-2xl font-black text-slate-950">
            Entrar na jornada
          </h2>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
            <Mail aria-hidden="true" size={17} />
            E-mail
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="familia@exemplo.com"
            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
            <KeyRound aria-hidden="true" size={17} />
            Senha
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Sua senha"
            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 font-black text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <LogIn aria-hidden="true" size={20} />
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => void handleGoogleLogin()}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 font-black text-slate-800 transition hover:bg-slate-50"
      >
        <Search aria-hidden="true" size={20} />
        Entrar com Google
      </button>

      <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm font-black">
        <Link href="/cadastro" className="text-sky-700 hover:text-sky-900">
          Criar cadastro
        </Link>
        <button
          type="button"
          onClick={() => void handlePasswordReset()}
          className="text-pink-600 hover:text-pink-800"
        >
          Esqueci minha senha
        </button>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-2xl bg-yellow-50 p-3 text-sm font-bold leading-relaxed text-amber-900">
        <Sparkles aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
        {status}
      </p>
    </section>
  );
}
