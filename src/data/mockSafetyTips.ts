export type MockSafetyTip = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: "senha" | "mouse" | "links" | "pesquisa" | "ajuda" | "celular";
};

export const mockSafetyTips: MockSafetyTip[] = [
  {
    id: "tip-mouse",
    title: "Leia antes de clicar",
    description:
      "Ao usar o mouse, pare um segundo e leia o botão antes de clicar.",
    emoji: "💻",
    category: "mouse",
  },
  {
    id: "tip-senha",
    title: "Senha é segredo",
    description:
      "Não compartilhe senha com amigos, desconhecidos ou mensagens online.",
    emoji: "🔐",
    category: "senha",
  },
  {
    id: "tip-links",
    title: "Desconfie de prêmios fáceis",
    description:
      "Links que prometem prêmio, urgência ou presentes podem ser perigosos.",
    emoji: "🛡️",
    category: "links",
  },
  {
    id: "tip-pesquisa",
    title: "Compare fontes",
    description:
      "Para estudar na internet, compare mais de uma fonte antes de confiar.",
    emoji: "🌎",
    category: "pesquisa",
  },
  {
    id: "tip-ajuda",
    title: "Chame um adulto",
    description:
      "Se algo der medo, pedir ajuda para responsável ou professor é a melhor escolha.",
    emoji: "🦉",
    category: "ajuda",
  },
  {
    id: "tip-celular",
    title: "Use com equilíbrio",
    description:
      "Combine tempo de tela com sua família e faça pausas para descansar.",
    emoji: "📱",
    category: "celular",
  },
];
