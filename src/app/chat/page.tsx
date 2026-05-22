import { Bot, ShieldCheck, Sparkles } from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { TutorChat } from "@/components/TutorChat";

export default function ChatPage() {
  return (
    <LoggedLayout>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-cyan-800">
                Tutor Digital
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Tire dúvidas sobre tecnologia com segurança
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                O Tutor Digital ajuda a aprender sobre celular, computador,
                internet, aplicativos, senhas e estudos com tecnologia usando
                linguagem simples.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-yellow-100 p-5 text-amber-950">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-yellow-300 text-slate-950">
                  <Bot aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.14em]">
                    Ajuda segura
                  </p>
                  <h2 className="text-2xl font-black">Pergunte, pense e aprenda</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TutorChat />

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] bg-emerald-100 p-5 text-emerald-950">
            <ShieldCheck aria-hidden="true" className="mb-3" />
            <h2 className="text-2xl font-black">Segurança em primeiro lugar</h2>
            <p className="mt-2 font-bold leading-relaxed">
              Não envie nome completo, endereço, escola, telefone, localização,
              senha ou fotos. Se algo parecer estranho, chame um adulto.
            </p>
          </div>

          <div className="rounded-[2rem] bg-pink-100 p-5 text-pink-950">
            <Sparkles aria-hidden="true" className="mb-3" />
            <h2 className="text-2xl font-black">Aprender sem depender</h2>
            <p className="mt-2 font-bold leading-relaxed">
              Use as respostas como pistas para raciocinar, testar com calma e
              pedir ajuda para sua família ou seus guias.
            </p>
          </div>
        </section>
      </div>
    </LoggedLayout>
  );
}
