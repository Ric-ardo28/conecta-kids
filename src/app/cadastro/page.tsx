import { AuthPanel } from "@/components/AuthPanel";
import { PageShell } from "@/components/PageShell";

export default function CadastroPage() {
  return (
    <PageShell
      badge="Cadastro"
      title="Criar minha jornada"
      description="Comece uma conta para guardar estrelinhas, medalhas, missões e combinados digitais."
      helperText="Começo da aventura"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[1.4rem] bg-yellow-100 p-5">
          <h2 className="text-2xl font-black text-slate-950">
            Primeiro combinado
          </h2>
          <p className="mt-3 font-bold leading-relaxed text-slate-700">
            O cadastro deve ser feito com um adulto por perto. Assim a criança
            aprende tecnologia com cuidado desde o começo.
          </p>
        </div>
        <AuthPanel />
      </div>
    </PageShell>
  );
}
