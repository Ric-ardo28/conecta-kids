"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Bot,
  HelpCircle,
  Lightbulb,
  Loader2,
  Send,
  ShieldAlert,
  Sparkles,
  Stars,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "Como criar uma senha segura?",
  "O que é um link perigoso?",
  "Como usar o computador?",
  "O que fazer se um estranho falar comigo online?",
];

const welcomeMessage =
  "Oi! Eu sou o Tutor Digital. Posso ajudar com celular, computador, internet, estudos e segurança online. Vamos pensar juntos?";

export function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: welcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canSend = input.trim().length > 0 && !isLoading;

  const visibleMessages = useMemo(() => messages.slice(-8), [messages]);

  async function sendMessage(content: string) {
    const cleanContent = content.trim();

    if (!cleanContent || isLoading) {
      return;
    }

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: cleanContent },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.answer?.trim() ||
            data.error ||
            "Não consegui responder agora. Respire, tente de novo e chame um adulto se precisar.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "A conexão falhou. Peça ajuda a um adulto de confiança e tente novamente em instantes.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/94 p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid size-20 place-items-center rounded-full bg-yellow-300 text-4xl shadow-sm">
              🤖
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-sky-700">
                Tutor Digital
              </p>
              <h2 className="text-3xl font-black text-slate-950">
                Pergunte com calma
              </h2>
              <p className="mt-1 font-bold text-slate-600">
                Respostas curtas, educativas e seguras.
              </p>
            </div>
          </div>
          <Stars aria-hidden="true" className="text-yellow-300 wiggle" />
        </div>

        <div className="mb-5 min-h-[380px] space-y-3 rounded-[1.6rem] bg-sky-50 p-3 md:p-4">
          {visibleMessages.map((message, index) => (
            <div
              key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
              className={`pop-in max-w-[90%] rounded-[1.35rem] px-4 py-3 text-sm font-bold leading-relaxed md:text-base ${
                message.role === "user"
                  ? "ml-auto bg-yellow-300 text-slate-950"
                  : "bg-white text-slate-900 shadow-sm"
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading ? (
            <div className="flex max-w-max items-center gap-2 rounded-[1.35rem] bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-sm">
              <Loader2 aria-hidden="true" className="animate-spin" size={18} />
              Pensando em uma resposta segura...
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-pink-700">
            <Lightbulb aria-hidden="true" size={18} />
            Sugestões rápidas
          </div>
          <div className="flex flex-wrap gap-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                disabled={isLoading}
                className="rounded-2xl bg-pink-100 px-3 py-2 text-sm font-black text-pink-800 transition hover:-translate-y-0.5 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="tutor-message" className="sr-only">
            Pergunta para o Tutor Digital
          </label>
          <input
            id="tutor-message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite sua dúvida..."
            className="min-w-0 flex-1 rounded-2xl border-2 border-sky-100 bg-sky-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-yellow-300 focus:bg-white"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="grid size-12 shrink-0 place-items-center rounded-2xl bg-pink-500 text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            aria-label="Enviar pergunta"
          >
            {isLoading ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={21} />
            ) : (
              <Send aria-hidden="true" size={21} />
            )}
          </button>
        </form>

        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-sm font-bold leading-relaxed text-emerald-900">
          <ShieldAlert aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
          O Tutor Digital ajuda nos estudos, mas um adulto de confiança também
          deve acompanhar sua jornada.
        </p>
      </div>

      <aside className="space-y-4">
        <div className="kid-shadow rounded-[2rem] border-4 border-white bg-yellow-100 p-5 text-amber-950">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-yellow-300 p-3 text-slate-950">
              <Bot aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em]">
                Mascote
              </p>
              <h3 className="text-2xl font-black">Bit</h3>
            </div>
          </div>
          <p className="mt-3 font-bold leading-relaxed">
            Eu ajudo a aprender tecnologia, mas não substituo sua família nem
            seus professores.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white/94 p-5">
          <div className="flex items-center gap-3 text-sky-800">
            <HelpCircle aria-hidden="true" />
            <h3 className="text-2xl font-black text-slate-950">
              Como perguntar melhor?
            </h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm font-bold leading-relaxed text-slate-700">
            <li className="rounded-2xl bg-sky-50 p-3">
              Conte só a dúvida, sem dados pessoais.
            </li>
            <li className="rounded-2xl bg-pink-50 p-3">
              Peça passos simples para tentar entender.
            </li>
            <li className="rounded-2xl bg-emerald-50 p-3">
              Se algo der medo, chame um responsável ou professor.
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] bg-indigo-100 p-5 text-indigo-950">
          <Sparkles aria-hidden="true" className="mb-3" />
          <h3 className="text-2xl font-black">Pense junto</h3>
          <p className="mt-2 font-bold leading-relaxed">
            O Tutor Digital dá pistas e exemplos para você aprender, não para
            depender da IA.
          </p>
        </div>
      </aside>
    </section>
  );
}
