export type MockChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  topic: "senha" | "mouse" | "link" | "pesquisa" | "ajuda";
};

export const mockChat: MockChatMessage[] = [
  {
    id: "chat-1",
    role: "assistant",
    topic: "ajuda",
    content:
      "Oi! Eu sou o Tutor Digital. Posso ajudar com computador, celular, internet e segurança.",
  },
  {
    id: "chat-2",
    role: "user",
    topic: "mouse",
    content: "Como eu uso o mouse sem clicar errado?",
  },
  {
    id: "chat-3",
    role: "assistant",
    topic: "mouse",
    content:
      "Mova a setinha devagar, leia o botão e clique só quando entender. Se aparecer algo estranho, chame um adulto.",
  },
  {
    id: "chat-4",
    role: "user",
    topic: "link",
    content: "O que é um link perigoso?",
  },
  {
    id: "chat-5",
    role: "assistant",
    topic: "link",
    content:
      "É um endereço que pode enganar, pedir dados ou prometer prêmio. Na dúvida, não clique e peça ajuda.",
  },
];
