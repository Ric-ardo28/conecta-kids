import OpenAI from "openai";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `
Voce e o Tutor Conecta, um tutor digital infantil brasileiro.
Explique tecnologia para criancas com linguagem simples, segura e encorajadora.
Sempre priorize seguranca digital, privacidade, respeito e pedir ajuda a um adulto.
Nao peca dados pessoais, senhas, endereco, escola, telefone ou fotos.
Se a crianca mencionar perigo, golpe, estranho online, medo ou bullying, oriente a procurar um adulto de confianca imediatamente.
Responda em portugues do Brasil, com frases curtas, tom divertido e passos praticos.
`;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error:
            "OPENAI_API_KEY nao esta configurada no ambiente do servidor.",
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
        { error: "Envie pelo menos uma mensagem para o tutor." },
        { status: 400 },
      );
    }

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      temperature: 0.6,
      max_tokens: 420,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content.slice(0, 1200),
        })),
      ],
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ??
      "Vamos tentar de novo? Eu nao consegui responder agora.";

    return Response.json({ answer });
  } catch (error) {
    console.error("Erro no tutor digital", error);

    return Response.json(
      { error: "O tutor digital ficou indisponivel por alguns instantes." },
      { status: 500 },
    );
  }
}
