import { LoginForm } from "@/components/LoginForm";
import { PageShell } from "@/components/PageShell";

export default function LoginPage() {
  return (
    <PageShell
      badge="Login"
      title="Entrar na jornada"
      description="Use o e-mail de um responsável ou professor para acessar suas missões com segurança."
      helperText="Entrada segura"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.4rem] bg-sky-50 p-5">
          <h2 className="text-2xl font-black text-slate-950">
            Entrada segura
          </h2>
          <p className="mt-3 font-bold leading-relaxed text-slate-700">
            Crianças devem entrar com ajuda de um adulto. O acesso com senha ou
            Google será ativado quando o ambiente estiver configurado.
          </p>
        </div>
        <LoginForm />
      </div>
    </PageShell>
  );
}
