export type MockMissionStatus = "Disponível" | "Em andamento" | "Concluída";

export type MockMission = {
  id: string;
  adventureId: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Fácil" | "Médio" | "Importante";
  status: MockMissionStatus;
  emoji: string;
  safetyTip: string;
};

export const mockMissions: MockMission[] = [
  {
    id: "mission-mouse",
    adventureId: "adv-computador",
    title: "Aprendendo a usar o mouse",
    description:
      "Movimente a setinha, clique em botões e leia antes de escolher qualquer coisa.",
    category: "Computador",
    duration: "5 min",
    difficulty: "Fácil",
    status: "Em andamento",
    emoji: "💻",
    safetyTip: "Não clique em avisos assustadores sem chamar um adulto.",
  },
  {
    id: "mission-senha-segura",
    adventureId: "adv-senhas",
    title: "Criando uma senha segura",
    description:
      "Monte uma senha com palavras, números e símbolos sem usar dados pessoais.",
    category: "Segurança",
    duration: "8 min",
    difficulty: "Importante",
    status: "Em andamento",
    emoji: "🔐",
    safetyTip: "Senha é segredo e só deve ser compartilhada com responsável.",
  },
  {
    id: "mission-link-perigoso",
    adventureId: "adv-links",
    title: "Não clicar em links perigosos",
    description:
      "Observe promessas estranhas, endereços confusos e mensagens com pressa.",
    category: "Internet segura",
    duration: "7 min",
    difficulty: "Importante",
    status: "Disponível",
    emoji: "🛡️",
    safetyTip: "Na dúvida, pare e pergunte para um adulto antes de clicar.",
  },
  {
    id: "mission-pesquisar",
    adventureId: "adv-pesquisa",
    title: "Pesquisando na internet",
    description:
      "Use palavras-chave simples, compare fontes e anote o que aprendeu.",
    category: "Estudos",
    duration: "8 min",
    difficulty: "Médio",
    status: "Disponível",
    emoji: "🌎",
    safetyTip: "Prefira sites indicados por professores ou responsáveis.",
  },
  {
    id: "mission-pedir-ajuda",
    adventureId: "adv-ajuda",
    title: "Pedir ajuda para um adulto",
    description:
      "Aprenda quando chamar família ou professores ao ver algo estranho online.",
    category: "Ajuda",
    duration: "5 min",
    difficulty: "Fácil",
    status: "Concluída",
    emoji: "⭐",
    safetyTip: "Pedir ajuda é uma atitude inteligente e segura.",
  },
];
