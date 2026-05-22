export type MockRankingItem = {
  userId: string;
  name: string;
  avatar: string;
  stars: number;
  level: string;
  medals: string[];
  progress: number;
  encouragement: string;
};

export const mockRanking: MockRankingItem[] = [
  {
    userId: "user-lia",
    name: "Lia",
    avatar: "🧑‍🚀",
    stars: 128,
    level: "Guardiã dos Links",
    medals: ["Senha Forte", "Clique Seguro", "Mouse Mestre"],
    progress: 82,
    encouragement: "Você está brilhando na sua jornada digital.",
  },
  {
    userId: "user-davi",
    name: "Davi",
    avatar: "🧙",
    stars: 96,
    level: "Explorador da Internet",
    medals: ["Pesquisa Esperta", "Boas Maneiras"],
    progress: 68,
    encouragement: "O importante é continuar evoluindo no seu ritmo.",
  },
  {
    userId: "user-maya",
    name: "Maya",
    avatar: "🦸",
    stars: 74,
    level: "Aprendiz Digital",
    medals: ["Ajuda Certa", "Celular com Equilíbrio"],
    progress: 54,
    encouragement: "Todo passo pequeno também conta.",
  },
];
