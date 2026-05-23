import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseServerConfig } from "@/lib/supabase/config";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type ChallengeAnswerRequest = {
  challengeId?: unknown;
  answer?: unknown;
};

type ChallengeAnswerResult = {
  already_completed: boolean;
  awarded: boolean;
  is_correct: boolean;
  explanation: string;
};

function getErrorStatus(message: string) {
  if (message.includes("Challenge not found")) {
    return 404;
  }

  return 500;
}

export async function POST(request: Request) {
  if (!hasSupabaseServerConfig()) {
    return NextResponse.json(
      { error: "Supabase não está configurado." },
      { status: 503 },
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: ChallengeAnswerRequest;

  try {
    body = (await request.json()) as ChallengeAnswerRequest;
  } catch {
    return NextResponse.json(
      { error: "Envie uma resposta válida." },
      { status: 400 },
    );
  }

  if (
    typeof body.challengeId !== "string" ||
    !UUID_REGEX.test(body.challengeId) ||
    typeof body.answer !== "string" ||
    body.answer.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "Desafio ou resposta inválidos." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .rpc("submit_challenge_answer", {
      p_answer: body.answer.trim(),
      p_challenge_id: body.challengeId,
    })
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Não foi possível salvar sua resposta." },
      { status: getErrorStatus(error.message) },
    );
  }

  const result = data as ChallengeAnswerResult;

  return NextResponse.json({
    alreadyCompleted: result.already_completed,
    awarded: result.awarded,
    isCorrect: result.is_correct,
    message: result.already_completed
      ? "Você já concluiu este desafio."
      : result.is_correct
        ? "Muito bem! Você ganhou uma estrelinha ⭐"
        : "Quase lá! Vamos tentar de novo com calma.",
    explanation: result.explanation,
  });
}
