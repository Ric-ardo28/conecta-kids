import { PageShell } from "@/components/PageShell";
import { productAreas } from "@/lib/product-areas";

const terms = [
  "Aprender brincando, com respeito e gentileza.",
  "Usar tecnologia com equilíbrio e responsabilidade.",
  "Chamar Minha Família ou Meus Guias sempre que precisar.",
];

export default function TermosPage() {
  return (
    <PageShell
      badge="Termos"
      title={productAreas.terms}
      description="Regras simples para usar o Conecta Kids de um jeito divertido, correto e seguro."
      helperText="Combinados claros"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {terms.map((term) => (
          <div
            key={term}
            className="rounded-[1.4rem] bg-yellow-100 p-5 font-bold leading-relaxed text-amber-950"
          >
            {term}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
