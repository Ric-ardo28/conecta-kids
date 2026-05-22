import { Target } from "lucide-react";
import { ChallengePlayer } from "@/components/ChallengePlayer";
import { LoggedLayout } from "@/components/LoggedLayout";
import { challenges } from "@/lib/challenges";
import { productAreas } from "@/lib/product-areas";

const challengeTypes = [
  "Múltipla escolha",
  "Verdadeiro ou falso",
  "Complete a frase",
  "Associação simples",
];

export default function ExerciciosPage() {
  return (
    <LoggedLayout>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                {productAreas.exercises}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Desafios educativos
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Responda com calma, receba feedback simples e ganhe estrelinhas
                quando acertar.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-4 text-amber-950">
              <div className="flex items-center gap-2 font-black">
                <Target aria-hidden="true" size={20} />
                {challenges.length} desafios
              </div>
              <p className="mt-1 text-sm font-bold">4 tipos de atividade</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {challengeTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-800"
              >
                {type}
              </span>
            ))}
          </div>
        </section>

        <ChallengePlayer challenges={challenges} />
      </div>
    </LoggedLayout>
  );
}
