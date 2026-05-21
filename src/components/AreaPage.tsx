import { BadgeCheck, BookOpen, Star, Trophy } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import type { LoggedRoute } from "@/lib/routes";

type AreaPageProps = {
  area: LoggedRoute;
  children?: React.ReactNode;
};

const steps = [
  "Explorar a área com calma",
  "Fazer uma missão curta",
  "Guardar uma conquista",
];

export function AreaPage({ area, children }: AreaPageProps) {
  return (
    <PageShell
      badge="Área da jornada"
      title={area.label}
      description={area.description}
      helperText={area.label}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.4rem] bg-yellow-100 p-5">
          <BookOpen aria-hidden="true" className="mb-4 text-amber-700" />
          <h2 className="text-xl font-black text-slate-950">Primeiro passo</h2>
          <p className="mt-2 font-bold leading-relaxed text-slate-700">
            Comece com uma explicação simples e uma atividade pequena.
          </p>
        </div>
        <div className="rounded-[1.4rem] bg-emerald-100 p-5">
          <Star aria-hidden="true" className="mb-4 text-emerald-700" />
          <h2 className="text-xl font-black text-slate-950">Estrelinhas</h2>
          <p className="mt-2 font-bold leading-relaxed text-slate-700">
            Cada avanço pode virar ponto, selo ou medalha da jornada.
          </p>
        </div>
        <div className="rounded-[1.4rem] bg-pink-100 p-5">
          <Trophy aria-hidden="true" className="mb-4 text-pink-700" />
          <h2 className="text-xl font-black text-slate-950">Conquista</h2>
          <p className="mt-2 font-bold leading-relaxed text-slate-700">
            Aprender tecnologia também é saber pedir ajuda quando precisar.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.4rem] bg-sky-50 p-5">
        <h2 className="text-2xl font-black text-slate-950">Roteiro da área</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 font-black text-slate-800"
            >
              <BadgeCheck aria-hidden="true" className="text-emerald-600" />
              {step}
            </div>
          ))}
        </div>
      </div>

      {children}
    </PageShell>
  );
}
