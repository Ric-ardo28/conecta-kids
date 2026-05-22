import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
      <div className="flex flex-col gap-3 rounded-[1.6rem] bg-white/80 p-5 text-sm font-bold text-slate-700 shadow-sm md:flex-row md:items-center md:justify-between">
        <p className="inline-flex items-center gap-2">
          <Sparkles aria-hidden="true" className="text-pink-500" size={18} />
          Conecta Kids: tecnologia com segurança, diversão e responsabilidade.
        </p>
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-3">
          <Link href="/privacidade" className="font-black text-sky-700">
            Segurança e Privacidade
          </Link>
          <Link href="/termos" className="font-black text-sky-700">
            Combinados de Uso
          </Link>
        </nav>
      </div>
    </footer>
  );
}
