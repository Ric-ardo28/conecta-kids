import { Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type ChallengeCardProps = {
  title: string;
  type: string;
  question: string;
  status?: string;
};

export function ChallengeCard({
  title,
  type,
  question,
  status = "Pronto para responder",
}: ChallengeCardProps) {
  return (
    <article className="rounded-[1.6rem] border-4 border-white bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-pink-100 p-3 text-pink-700">
          <Target aria-hidden="true" />
        </div>
        <div>
          <Badge tone="pink">{type}</Badge>
          <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
        </div>
      </div>
      <p className="font-bold leading-relaxed text-slate-700">{question}</p>
      <p className="mt-4 rounded-2xl bg-yellow-100 px-4 py-3 text-sm font-black text-amber-950">
        {status}
      </p>
    </article>
  );
}
