import { Star, Trophy } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";

type RankingCardProps = {
  name: string;
  avatar?: string;
  stars: number;
  level: string;
  medals: string[];
  progress: number;
};

export function RankingCard({
  name,
  avatar,
  stars,
  level,
  medals,
  progress,
}: RankingCardProps) {
  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-slate-50 p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar emoji={avatar} name={name} className="size-20 text-4xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-950">{name}</h3>
              <p className="font-bold text-slate-600">Nível: {level}</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-100 px-3 py-2 text-sm font-black text-amber-950">
              <Star aria-hidden="true" size={17} />
              {stars} estrelinhas
            </div>
          </div>
          <Progress value={progress} label="Progresso" className="mt-4" />
          <div className="mt-4 flex flex-wrap gap-2">
            {medals.map((medal) => (
              <span
                key={medal}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700"
              >
                <Trophy aria-hidden="true" size={15} />
                {medal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
