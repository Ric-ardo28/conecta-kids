export type MockAdventure = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  progress: number;
  missionIds: string[];
};

export const mockAdventures: MockAdventure[] = [
  {
    id: "adv-computador",
    title: "Primeiros Passos no Computador",
    description:
      "Aprenda tela, mouse, teclado e cuidados para usar o computador com calma.",
    emoji: "💻",
    level: "Iniciante",
    progress: 45,
    missionIds: ["mission-mouse", "mission-teclado", "mission-desligar"],
  },
  {
    id: "adv-senhas",
    title: "Senhas Fortes e Proteção",
    description:
      "Entenda por que senha é segredo e como criar combinações mais seguras.",
    emoji: "🔐",
    level: "Intermediário",
    progress: 60,
    missionIds: ["mission-senha-segura", "mission-nao-compartilhar"],
  },
  {
    id: "adv-links",
    title: "Internet Segura para Crianças",
    description:
      "Pratique como reconhecer links perigosos, mensagens estranhas e golpes.",
    emoji: "🛡️",
    level: "Intermediário",
    progress: 35,
    missionIds: ["mission-link-perigoso", "mission-mensagem-estranha"],
  },
  {
    id: "adv-pesquisa",
    title: "Como Pesquisar na Internet",
    description:
      "Use palavras-chave, compare fontes e peça ajuda quando tiver dúvida.",
    emoji: "🌎",
    level: "Iniciante",
    progress: 25,
    missionIds: ["mission-pesquisar", "mission-videos-educativos"],
  },
  {
    id: "adv-ajuda",
    title: "Pedir Ajuda é Inteligente",
    description:
      "Saiba quando chamar família, responsáveis ou professores durante a jornada digital.",
    emoji: "🦉",
    level: "Iniciante",
    progress: 80,
    missionIds: ["mission-pedir-ajuda"],
  },
];
