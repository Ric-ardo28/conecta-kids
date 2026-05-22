import { GraduationCap, Users } from "lucide-react";
import { Progress } from "@/components/ui/Progress";

type ClassCardProps = {
  name: string;
  students: number;
  progress: number;
  nextActivity: string;
};

export function ClassCard({
  name,
  students,
  progress,
  nextActivity,
}: ClassCardProps) {
  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-slate-50 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-lime-100 p-3 text-lime-800">
          <GraduationCap aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-950">{name}</h3>
          <p className="inline-flex items-center gap-2 font-bold text-slate-600">
            <Users aria-hidden="true" size={17} />
            {students} alunos
          </p>
        </div>
      </div>
      <p className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700">
        Próxima atividade: {nextActivity}
      </p>
      <Progress value={progress} label="Progresso" className="mt-4" />
    </article>
  );
}
