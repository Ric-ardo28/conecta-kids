import { PageShell } from "@/components/PageShell";
import { productAreas } from "@/lib/product-areas";

const privacyItems = [
  "Não compartilhar senhas, endereço, telefone ou escola.",
  "Pedir ajuda a um adulto quando algo parecer estranho.",
  "Usar o Kids Digital para aprender, não para enviar dados pessoais.",
];

export default function PrivacidadePage() {
  return (
    <PageShell
      badge="Privacidade"
      title={productAreas.privacy}
      description="Combinados simples para proteger crianças, famílias e professores durante a jornada digital."
      helperText="Cuidado primeiro"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {privacyItems.map((item) => (
          <div
            key={item}
            className="rounded-[1.4rem] bg-emerald-50 p-5 font-bold leading-relaxed text-emerald-900"
          >
            {item}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
