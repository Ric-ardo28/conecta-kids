export type MockChallengeType =
  | "Múltipla escolha"
  | "Verdadeiro ou falso"
  | "Complete a frase"
  | "Associação simples";

export type MockChallenge = {
  id: string;
  missionId: string;
  type: MockChallengeType;
  title: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const mockChallenges: MockChallenge[] = [
  {
    id: "challenge-mouse-cuidado",
    missionId: "mission-mouse",
    type: "Verdadeiro ou falso",
    title: "Clique com atenção",
    question: "Posso clicar sem ler o que aparece na tela?",
    options: ["Verdadeiro", "Falso"],
    answer: "Falso",
    explanation:
      "Antes de clicar, leia com calma. Se parecer estranho, chame um adulto.",
  },
  {
    id: "challenge-senha-forte",
    missionId: "mission-senha-segura",
    type: "Múltipla escolha",
    title: "Qual senha é mais segura?",
    question: "Escolha a senha mais difícil de adivinhar.",
    options: ["123456", "meunome", "Sol!Livro7Casa", "senha"],
    answer: "Sol!Livro7Casa",
    explanation:
      "Senha forte mistura palavras, números e símbolos, sem dados pessoais.",
  },
  {
    id: "challenge-link-perigoso",
    missionId: "mission-link-perigoso",
    type: "Associação simples",
    title: "Site mais confiável",
    question: "Qual endereço parece mais seguro para estudar?",
    options: [
      "https://escola.edu.br",
      "premio-gratis-agora.biz",
      "clique-aqui-senha.net",
      "super-recompensa.ru",
    ],
    answer: "https://escola.edu.br",
    explanation:
      "Endereços claros e conhecidos costumam ser mais confiáveis que promessas de prêmio.",
  },
  {
    id: "challenge-pesquisa",
    missionId: "mission-pesquisar",
    type: "Complete a frase",
    title: "Pesquisa segura",
    question: "Antes de confiar em uma resposta, devo comparar mais de uma ______.",
    options: ["fonte", "senha", "propaganda", "mensagem"],
    answer: "fonte",
    explanation:
      "Comparar fontes ajuda a saber se a informação é verdadeira e segura.",
  },
  {
    id: "challenge-pedir-ajuda",
    missionId: "mission-pedir-ajuda",
    type: "Múltipla escolha",
    title: "Mensagem estranha",
    question: "O que fazer se uma pessoa desconhecida pedir segredo online?",
    options: [
      "Responder rapidamente",
      "Mandar uma foto",
      "Parar e chamar um adulto",
      "Compartilhar a senha",
    ],
    answer: "Parar e chamar um adulto",
    explanation:
      "Quando alguém desconhecido pede segredo, o melhor é pausar e pedir ajuda.",
  },
];
