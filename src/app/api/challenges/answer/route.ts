import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseServerConfig } from "@/lib/supabase/config";

const STAR_AWARD = 1;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type ChallengeAnswerRequest = {
  challengeId?: unknown;
  answer?: unknown;
};

type ChallengeForCheck = {
  id: string;
  mission_id: string | null;
  correct_answer: string;
  explanation: string;
};

function normalizeAnswer(answer: string) {
  return answer
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isUniqueViolation(error: { code?: string } | null) {
  return error?.code === "23505";
}

async function awardUserStar(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string,
  missionId: string | null,
) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("points")
    .eq("id", userId)
    .maybeSingle();

  const { error: profileUpdateError } = await supabase
    .from("profiles")
    .update({
      points: (profile?.points ?? 0) + STAR_AWARD,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (profileUpdateError) {
    throw new Error("Não foi possível atualizar os pontos do perfil.");
  }

  const { data: ranking } = await supabase
    .from("ranking")
    .select("id, stars")
    .eq("user_id", userId)
    .maybeSingle();

  if (ranking) {
    const { error: rankingUpdateError } = await supabase
      .from("ranking")
      .update({
        stars: (ranking.stars ?? 0) + STAR_AWARD,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ranking.id);

    if (rankingUpdateError) {
      throw new Error("Não foi possível atualizar o Hall das Estrelinhas.");
    }
  } else {
    const { error: rankingInsertError } = await supabase.from("ranking").insert({
      user_id: userId,
      stars: STAR_AWARD,
      level: "Aprendiz Digital",
      medals: [],
      progress_percent: 0,
    });

    if (rankingInsertError) {
      throw new Error("Não foi possível criar o Hall das Estrelinhas.");
    }
  }

  if (!missionId) {
    return;
  }

  const { data: progress } = await supabase
    .from("user_progress")
    .select("id, stars")
    .eq("user_id", userId)
    .eq("mission_id", missionId)
    .is("adventure_id", null)
    .maybeSingle();

  if (progress) {
    const { error: progressUpdateError } = await supabase
      .from("user_progress")
      .update({
        status: "completed",
        progress_percent: 100,
        stars: (progress.stars ?? 0) + STAR_AWARD,
        updated_at: new Date().toISOString(),
      })
      .eq("id", progress.id);

    if (progressUpdateError) {
      throw new Error("Não foi possível atualizar o progresso.");
    }
  } else {
    const { error: progressInsertError } = await supabase.from("user_progress").insert({
      user_id: userId,
      mission_id: missionId,
      status: "completed",
      progress_percent: 100,
      stars: STAR_AWARD,
    });

    if (progressInsertError) {
      throw new Error("Não foi possível criar o progresso.");
    }
  }
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

  const { data: challenge, error: challengeError } = await supabase
    .from("challenges")
    .select("id, mission_id, correct_answer, explanation")
    .eq("id", body.challengeId)
    .maybeSingle();

  if (challengeError) {
    return NextResponse.json(
      { error: "Não foi possível carregar o desafio." },
      { status: 500 },
    );
  }

  if (!challenge) {
    return NextResponse.json(
      { error: "Desafio não encontrado." },
      { status: 404 },
    );
  }

  const checkedChallenge = challenge as ChallengeForCheck;

  const { data: previousCorrectAnswer, error: previousAnswerError } =
    await supabase
      .from("challenge_answers")
      .select("id")
      .eq("user_id", user.id)
      .eq("challenge_id", checkedChallenge.id)
      .eq("is_correct", true)
      .maybeSingle();

  if (previousAnswerError) {
    return NextResponse.json(
      { error: "Não foi possível verificar sua resposta anterior." },
      { status: 500 },
    );
  }

  if (previousCorrectAnswer) {
    return NextResponse.json({
      alreadyCompleted: true,
      awarded: false,
      isCorrect: true,
      message: "Você já concluiu este desafio.",
      explanation: checkedChallenge.explanation,
    });
  }

  const isCorrect =
    normalizeAnswer(body.answer) === normalizeAnswer(checkedChallenge.correct_answer);

  const { error: answerError } = await supabase.from("challenge_answers").insert({
    challenge_id: checkedChallenge.id,
    user_id: user.id,
    answer: body.answer.trim(),
    is_correct: isCorrect,
  });

  if (isUniqueViolation(answerError)) {
    return NextResponse.json({
      alreadyCompleted: true,
      awarded: false,
      isCorrect: true,
      message: "Você já concluiu este desafio.",
      explanation: checkedChallenge.explanation,
    });
  }

  if (answerError) {
    return NextResponse.json(
      { error: "Não foi possível salvar sua resposta." },
      { status: 500 },
    );
  }

  if (isCorrect) {
    try {
      await awardUserStar(supabase, user.id, checkedChallenge.mission_id);
    } catch {
      return NextResponse.json(
        { error: "Resposta salva, mas não consegui atualizar as estrelinhas." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({
    alreadyCompleted: false,
    awarded: isCorrect,
    isCorrect,
    message: isCorrect
      ? "Muito bem! Você ganhou uma estrelinha ⭐"
      : "Quase lá! Vamos tentar de novo com calma.",
    explanation: checkedChallenge.explanation,
  });
}
