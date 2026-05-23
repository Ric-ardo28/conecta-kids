export type ChallengeType =
  | "Múltipla escolha"
  | "Verdadeiro ou falso"
  | "Complete a frase"
  | "Associação simples";

export type Challenge = {
  id: string;
  type: ChallengeType;
  title: string;
  question: string;
  options: string[];
  explanation: string;
};

export const challengeTypeLabels: Record<string, ChallengeType> = {
  multiple_choice: "Múltipla escolha",
  true_false: "Verdadeiro ou falso",
  complete_phrase: "Complete a frase",
  simple_match: "Associação simples",
};
