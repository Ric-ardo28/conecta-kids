import {
  AlertTriangle,
  BarChart3,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LoggedLayout } from "@/components/LoggedLayout";
import { productAreas } from "@/lib/product-areas";
import { getCurrentUserProfile } from "@/lib/supabase/current-user";
import type { Database } from "@/lib/supabase/types";

type ResponsibleChildRow = Pick<
  Database["public"]["Tables"]["responsible_children"]["Row"],
  "id" | "status"
>;

export default async function ResponsaveisPage() {
  const { supabase, profile } = await getCurrentUserProfile();

  const linksResult = await supabase
    .from("responsible_children")
    .select("id, status")
    .eq("responsible_id", profile.id);

  if (linksResult.error) {
    throw new Error("Não foi possível carregar vínculos familiares.");
  }

  const links = (linksResult.data ?? []) as ResponsibleChildRow[];
  const activeLinks = links.filter((link) => link.status === "active");
  const familyStats = [
    { label: "Crianças vinculadas", value: String(links.length), icon: Users },
    {
      label: "Vínculos ativos",
      value: String(activeLinks.length),
      icon: HeartHandshake,
    },
    { label: "Progresso médio", value: "0%", icon: BarChart3 },
    { label: "Tempo de uso hoje", value: "0 min", icon: Clock },
  ];

  return (
    <LoggedLayout profile={profile}>
      <div className="space-y-6">
        <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-rose-800">
                {productAreas.guardians}
              </p>
              <h1 className="text-4xl font-black text-slate-950 md:text-5xl">
                Família acompanhando de pertinho
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-bold leading-relaxed text-slate-700">
                Responsáveis acompanham vínculos, progresso, alertas de
                segurança e combinados digitais quando houver dados reais.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-emerald-100 p-5 text-emerald-950">
              <ShieldCheck aria-hidden="true" className="mb-3" />
              <h2 className="text-2xl font-black">Cuidado compartilhado</h2>
              <p className="mt-2 font-bold leading-relaxed">
                A jornada digital fica melhor quando família e escola caminham
                junto com a criança.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-rose-100 p-3 text-rose-800">
                <HeartHandshake aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-rose-700">
                  Responsáveis vinculados
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Minha rede de cuidado
                </h2>
              </div>
            </div>

            <EmptyPanel
              title="Nenhum responsável vinculado ainda."
              description="Quando vínculos reais forem cadastrados no Supabase, eles aparecerão aqui."
              icon={UserRound}
            />
          </div>

          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-800">
                <Users aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-sky-700">
                  Crianças vinculadas
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Acompanhamento
                </h2>
              </div>
            </div>

            {links.length > 0 ? (
              <div className="grid gap-3">
                {links.map((link) => (
                  <article key={link.id} className="rounded-[1.5rem] bg-sky-50 p-5">
                    <h3 className="text-xl font-black text-slate-950">
                      Vínculo familiar
                    </h3>
                    <p className="mt-2 font-bold text-slate-700">
                      Status: {link.status}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyPanel
                title="Nenhuma criança vinculada ainda."
                description="Quando uma criança real for vinculada, o acompanhamento aparecerá aqui."
                icon={Users}
              />
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-yellow-100 p-3 text-amber-800">
                <Sparkles aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black text-slate-950">
                Resumo da família
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {familyStats.map((stat) => (
                <MetricCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/92 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-pink-100 p-3 text-pink-800">
                <AlertTriangle aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-pink-700">
                  Alertas de segurança
                </p>
                <h2 className="text-3xl font-black text-slate-950">
                  Pontos para conversar
                </h2>
              </div>
            </div>
            <EmptyPanel
              title="Nenhum alerta de segurança registrado."
              description="Alertas reais aparecerão aqui quando forem cadastrados."
              icon={ShieldCheck}
            />
          </div>
        </section>
      </div>
    </LoggedLayout>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-2xl bg-yellow-50 p-4">
      <Icon aria-hidden="true" className="mb-3 text-amber-700" />
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-600">{label}</p>
    </div>
  );
}

function EmptyPanel({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 p-5">
      <Icon aria-hidden="true" className="mb-3 text-rose-700" />
      <h3 className="text-2xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 font-bold leading-relaxed text-slate-700">
        {description}
      </p>
    </div>
  );
}
