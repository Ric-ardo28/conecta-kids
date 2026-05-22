import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

type SafetyTipCardProps = {
  title?: string;
  children: React.ReactNode;
};

export function SafetyTipCard({
  title = "Dica de segurança digital",
  children,
}: SafetyTipCardProps) {
  return (
    <Card tone="green">
      <div className="flex items-center gap-3">
        <ShieldCheck aria-hidden="true" className="text-emerald-700" />
        <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      </div>
      <div className="mt-3 font-bold leading-relaxed text-emerald-950">
        {children}
      </div>
    </Card>
  );
}
