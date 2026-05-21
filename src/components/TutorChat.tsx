"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bot, Loader2, Send, ShieldAlert, Stars } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "Como criar uma senha forte?",
  "O que faço se um estranho falar comigo online?",
  "Qual desafio posso fazer hoje?",
];

export function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Oi! Eu sou o Tutor Digital da turminha Conecta. Vamos aprender tecnologia com segurança?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canSend = input.trim().length > 0 && !isLoading;

  const visibleMessages = useMemo(() => messages.slice(-6), [messages]);

  async function sendMessage(content: string) {
    const cleanContent = content.trim();

    if (!cleanContent) {
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
            data.answer ??
            data.error ??
            "Nao consegui responder agora. Tente de novo em instantes.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "A conexao falhou. Peca ajuda a um adulto e tente novamente.",
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
    <section className="kid-shadow rounded-[2rem] border-4 border-white bg-white p-5 text-slate-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
            <Bot aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-sky-600">
              Tutor Digital
            </p>
            <h2 className="text-2xl font-black">Turminha Conecta</h2>
          </div>
        </div>
        <Stars aria-hidden="true" className="text-yellow-300 wiggle" />
      </div>

      <div className="mb-4 space-y-3 rounded-3xl bg-sky-50 p-3">
        {visibleMessages.map((message, index) => (
          <div
            key={`${message.role}-${index}-${message.content.slice(0, 12)}`}
            className={`pop-in max-w-[88%] rounded-3xl px-4 py-3 text-sm font-bold leading-relaxed ${
              message.role === "user"
                ? "ml-auto bg-yellow-300 text-slate-950"
                : "bg-white text-slate-900 shadow-sm"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading ? (
          <div className="flex max-w-max items-center gap-2 rounded-3xl bg-white px-4 py-3 text-sm font-bold text-slate-900">
            <Loader2 aria-hidden="true" className="animate-spin" size={18} />
            Pensando...
          </div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => void sendMessage(prompt)}
            className="rounded-full bg-pink-100 px-3 py-2 text-xs font-black text-pink-700 transition hover:bg-pink-200"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Digite sua pergunta..."
          className="min-w-0 flex-1 rounded-2xl border-2 border-sky-100 bg-sky-50 px-4 py-3 text-slate-950 outline-none transition focus:border-yellow-300 focus:bg-white"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-pink-500 text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          aria-label="Enviar pergunta"
        >
          <Send aria-hidden="true" size={21} />
        </button>
      </form>

      <p className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-xs font-bold leading-relaxed text-emerald-800">
        <ShieldAlert aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
        O tutor não pede senhas nem dados pessoais. Se algo parecer estranho,
        chame um adulto de confiança.
      </p>
    </section>
  );
}
