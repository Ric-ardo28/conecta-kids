import OpenAI from "openai";
import { hasSupabaseServerConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt =
  "Você é o Tutor Digital do Conecta Kids, uma plataforma de inclusão digital infantil. Responda em português do Brasil com linguagem simples, segura, acolhedora e adequada para crianças. Ajude a criança a aprender sobre celular, computador, internet, aplicativos, senhas, segurança online e estudos com tecnologia. Não peça dados pessoais. Não colete informações sensíveis. Não incentive conversas impróprias. Se a criança relatar perigo, medo, contato com estranho ou situação insegura, oriente a procurar imediatamente um responsável ou professor. Explique passo a passo e incentive a criança a pensar.";

const safetyReminder =
  "Mantenha a resposta curta e educativa, com no máximo 5 frases curtas ou 4 passos simples. Não peça nome completo, endereço, escola, telefone, localização, senha, foto ou dados da família. Se o assunto não for adequado para crianças, responda com cuidado e oriente a conversar com um responsável ou professor.";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request, userId?: string) {
  if (userId) {
    return `user:${userId}`;
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();

  return `ip:${ip || request.headers.get("x-real-ip") || "local"}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function cleanMessage(message: ChatMessage) {
  return {
    role: message.role,
    content: message.content.replace(/\s+/g, " ").trim().slice(0, 900),
  };
}

export async function POST(request: Request) {
  try {
    let userId: string | undefined;
    const hasSupabaseConfig = hasSupabaseServerConfig();

    if (hasSupabaseConfig) {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      userId = user.id;
    } else if (process.env.NODE_ENV === "production") {
      return Response.json(
        { error: "Supabase não está configurado no servidor." },
        { status: 503 },
      );
    }

    const rateLimitKey = getClientKey(request, userId);

    if (isRateLimited(rateLimitKey)) {
      return Response.json(
        { error: "Muitas perguntas em pouco tempo. Tente novamente em instantes." },
        { status: 429 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error:
            "OPENAI_API_KEY não está configurada no ambiente do servidor.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = (body.messages ?? [])
      .filter(
        (message) =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string",
      )
      .slice(-8);

    if (messages.length === 0) {
      return Response.json(
        { error: "Envie pelo menos uma pergunta para o Tutor Digital." },
        { status: 400 },
      );
    }

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      temperature: 0.5,
      max_tokens: 180,
      messages: [
        { role: "system", content: `${systemPrompt}\n\n${safetyReminder}` },
        ...messages.map(cleanMessage),
      ],
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ||
      "Vamos tentar de novo? Eu não consegui responder agora. Tente fazer a pergunta com outras palavras ou peça ajuda a um adulto de confiança.";

    return Response.json({ answer });
  } catch (error) {
    console.error("Erro no Tutor Digital", error);

    return Response.json(
      { error: "O Tutor Digital ficou indisponível por alguns instantes." },
      { status: 500 },
    );
  }
}
