export type MockAchievement = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedByUserIds: string[];
};

export const mockAchievements: MockAchievement[] = [
  {
    id: "ach-mouse-mestre",
    title: "Mouse Mestre",
    description: "Aprendeu a clicar, arrastar e ler antes de escolher.",
    emoji: "💻",
    unlockedByUserIds: ["user-lia"],
  },
  {
    id: "ach-senha-forte",
    title: "Senha Forte",
    description: "Criou uma senha segura sem usar dados pessoais.",
    emoji: "🔐",
    unlockedByUserIds: ["user-lia", "user-davi"],
  },
  {
    id: "ach-clique-seguro",
    title: "Clique Seguro",
    description: "Identificou um link suspeito antes de clicar.",
    emoji: "🛡️",
    unlockedByUserIds: ["user-lia"],
  },
  {
    id: "ach-pesquisa-esperta",
    title: "Pesquisa Esperta",
    description: "Comparou fontes para estudar melhor na internet.",
    emoji: "🌎",
    unlockedByUserIds: ["user-davi"],
  },
  {
    id: "ach-ajuda-certa",
    title: "Ajuda Certa",
    description: "Chamou um adulto ao ver uma mensagem estranha.",
    emoji: "🦉",
    unlockedByUserIds: ["user-maya"],
  },
];
