"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { getAuthCallbackUrl } from "@/lib/auth-redirect";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseBrowserConfig } from "@/lib/supabase/config";

const profileTypes = [
  { value: "crianca", label: "Criança" },
  { value: "responsavel", label: "Responsável" },
  { value: "professor", label: "Professor" },
] as const;

type ProfileType = (typeof profileTypes)[number]["value"];

export function SignupForm() {
  const hasSupabaseConfig = hasSupabaseBrowserConfig();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileType, setProfileType] = useState<ProfileType>("crianca");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(
    hasSupabaseConfig
      ? "Crie sua conta com um adulto por perto."
      : "Modo demonstração ativo: o cadastro real será ligado ao Supabase.",
  );

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setStatus("Preencha todos os campos para criar a conta.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("As senhas precisam ser iguais.");
      return;
    }

    if (!acceptedTerms) {
      setStatus("Aceite os combinados de uso para continuar.");
      return;
    }

    if (!hasSupabaseConfig) {
      setStatus("Modo demonstração: conta simulada criada para a jornada.");
      return;
    }

    setIsLoading(true);
    setStatus("Criando sua conta...");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getAuthCallbackUrl("/dashboard"),
          data: {
            full_name: fullName,
            role: profileType,
          },
        },
      });

      setStatus(
        error
          ? "Não consegui criar a conta agora. Confira os dados."
          : "Conta criada! Confira seu e-mail com um adulto.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/94 p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
          <UserRound aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
            Cadastro
          </p>
          <h2 className="text-2xl font-black text-slate-950">
            Criar minha conta
          </h2>
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
            <UserRound aria-hidden="true" size={17} />
            Nome completo
          </span>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        </label>

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
            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400 focus:bg-white"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
              <KeyRound aria-hidden="true" size={17} />
              Senha
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Crie uma senha"
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
              <ShieldCheck aria-hidden="true" size={17} />
              Confirmar senha
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repita a senha"
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-400 focus:bg-white"
            />
          </label>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-black text-slate-700">
            Tipo de perfil
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {profileTypes.map((type) => (
              <label
                key={type.value}
                className={`cursor-pointer rounded-2xl border-2 px-4 py-3 text-center font-black transition ${
                  profileType === type.value
                    ? "border-emerald-400 bg-emerald-100 text-emerald-900"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="profileType"
                  value={type.value}
                  checked={profileType === type.value}
                  onChange={() => setProfileType(type.value)}
                  className="sr-only"
                />
                {type.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 rounded-2xl bg-sky-50 p-4 text-sm font-bold leading-relaxed text-slate-700">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-1 size-5 accent-emerald-500"
          />
          <span>
            Aceito os{" "}
            <Link href="/termos" className="font-black text-sky-700">
              Combinados de Uso
            </Link>{" "}
            e a{" "}
            <Link href="/privacidade" className="font-black text-sky-700">
              Segurança e Privacidade
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <CheckCircle2 aria-hidden="true" size={20} />
          {isLoading ? "Criando..." : "Criar minha conta"}
        </button>
      </form>

      <p className="mt-4 flex items-start gap-2 rounded-2xl bg-yellow-50 p-3 text-sm font-bold leading-relaxed text-amber-900">
        <Sparkles aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
        {status}
      </p>
    </section>
  );
}
