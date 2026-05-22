"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, HelpCircle, RotateCcw, Sparkles, Star } from "lucide-react";
import type { Challenge } from "@/lib/challenges";

type AnswerState = "idle" | "correct" | "incorrect";

type ChallengePlayerProps = {
  challenges: Challenge[];
};

const feedbackText = {
  correct: "Muito bem! Você ganhou uma estrelinha ⭐",
  incorrect: "Quase lá! Vamos tentar de novo com calma.",
};

export function ChallengePlayer({ challenges }: ChallengePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [stars, setStars] = useState(0);

  const challenge = challenges[currentIndex];
  const isLast = currentIndex === challenges.length - 1;

  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / challenges.length) * 100),
    [currentIndex, challenges.length],
  );

  function chooseAnswer(answer: string) {
    setSelectedAnswer(answer);
    setAnswerState("idle");
  }

  function checkAnswer() {
    if (!selectedAnswer) {
      return;
    }

    const isCorrect =
      selectedAnswer.trim().toLowerCase() ===
      challenge.answer.trim().toLowerCase();

    setAnswerState(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setStars((currentStars) => currentStars + 1);
    }
  }

  function nextChallenge() {
    setCurrentIndex((index) => (isLast ? 0 : index + 1));
    setSelectedAnswer("");
    setAnswerState("idle");
  }

  function retryChallenge() {
    setSelectedAnswer("");
    setAnswerState("idle");
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/94 p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-pink-700">
              {challenge.type}
            </p>
            <h2 className="text-3xl font-black text-slate-950">
              {challenge.title}
            </h2>
            <p className="mt-2 text-lg font-bold leading-relaxed text-slate-700">
              {challenge.question}
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-100 px-4 py-3 text-sm font-black text-amber-900">
            Desafio {currentIndex + 1} de {challenges.length}
          </div>
        </div>

        {challenge.type === "Complete a frase" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700">
              Digite a palavra que completa a frase
            </span>
            <input
              value={selectedAnswer}
              onChange={(event) => chooseAnswer(event.target.value)}
              placeholder="Escreva sua resposta"
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:bg-white"
            />
          </label>
        ) : (
          <div className="grid gap-3">
            {challenge.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => chooseAnswer(option)}
                className={`rounded-2xl border-2 px-4 py-3 text-left font-black transition ${
                  selectedAnswer === option
                    ? "border-sky-500 bg-sky-100 text-sky-950"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={checkAnswer}
            disabled={!selectedAnswer}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <BadgeCheck aria-hidden="true" size={20} />
            Conferir resposta
          </button>
          <button
            type="button"
            onClick={retryChallenge}
            className="inline-flex items-center gap-2 rounded-2xl bg-yellow-300 px-5 py-3 font-black text-slate-950 transition hover:bg-yellow-200"
          >
            <RotateCcw aria-hidden="true" size={20} />
            Tentar de novo
          </button>
        </div>

        {answerState !== "idle" ? (
          <div
            className={`mt-5 rounded-[1.4rem] p-5 ${
              answerState === "correct"
                ? "bg-emerald-100 text-emerald-950"
                : "bg-yellow-100 text-amber-950"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden="true" />
              <p className="text-xl font-black">{feedbackText[answerState]}</p>
            </div>
            <p className="mt-2 font-bold leading-relaxed">
              {challenge.explanation}
            </p>
            <button
              type="button"
              onClick={nextChallenge}
              className="mt-4 rounded-2xl bg-white px-5 py-3 font-black text-slate-950 transition hover:bg-sky-50"
            >
              {isLast ? "Recomeçar desafios" : "Próximo desafio"}
            </button>
          </div>
        ) : null}
      </div>

      <aside className="space-y-6">
        <div className="kid-shadow rounded-[2rem] border-4 border-white bg-sky-100 p-6">
          <div className="flex items-center gap-3 text-sky-900">
            <Star aria-hidden="true" />
            <h2 className="text-2xl font-black">Estrelinhas</h2>
          </div>
          <p className="mt-3 text-5xl font-black text-slate-950">{stars}</p>
          <p className="mt-2 font-bold leading-relaxed text-slate-700">
            Cada resposta correta vale uma estrelinha para sua jornada.
          </p>
        </div>

        <div className="kid-shadow rounded-[2rem] border-4 border-white bg-white/94 p-6">
          <div className="flex items-center gap-3">
            <HelpCircle aria-hidden="true" className="text-pink-600" />
            <h2 className="text-2xl font-black text-slate-950">
              Progresso dos desafios
            </h2>
          </div>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-black text-sky-900">
            {progress}% da sequência explorada
          </p>
        </div>

        <div className="rounded-[2rem] bg-emerald-100 p-6">
          <h2 className="text-2xl font-black text-slate-950">
            Explicação simples
          </h2>
          <p className="mt-3 font-bold leading-relaxed text-emerald-950">
            Não tem problema errar. O importante é ler a explicação, respirar e
            tentar de novo com calma.
          </p>
        </div>
      </aside>
    </section>
  );
}
