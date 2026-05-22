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
  answer: string;
  explanation: string;
};

export const challenges: Challenge[] = [
  {
    id: "senha-mais-segura",
    type: "Múltipla escolha",
    title: "Qual senha é mais segura?",
    question: "Escolha a senha mais difícil de adivinhar.",
    options: ["123456", "meunome", "Sol!Livro7Casa", "senha"],
    answer: "Sol!Livro7Casa",
    explanation:
      "Uma senha forte mistura palavras, números e símbolos. Evite senhas muito fáceis.",
  },
  {
    id: "mensagem-de-estranho",
    type: "Múltipla escolha",
    title: "Mensagem de um estranho",
    question: "O que você deve fazer ao receber uma mensagem de um estranho?",
    options: [
      "Responder e contar onde mora",
      "Enviar uma foto",
      "Parar e chamar um adulto",
      "Clicar no link enviado",
    ],
    answer: "Parar e chamar um adulto",
    explanation:
      "Quando uma pessoa desconhecida chama você online, o melhor é pausar e pedir ajuda.",
  },
  {
    id: "clicar-em-qualquer-link",
    type: "Verdadeiro ou falso",
    title: "Posso clicar em qualquer link?",
    question: "Verdadeiro ou falso: posso clicar em qualquer link?",
    options: ["Verdadeiro", "Falso"],
    answer: "Falso",
    explanation:
      "Links podem levar a páginas perigosas. Antes de clicar, confira e peça ajuda se tiver dúvida.",
  },
  {
    id: "nunca-compartilhar-senha",
    type: "Complete a frase",
    title: "Complete a frase",
    question: "Nunca devo compartilhar minha ______.",
    options: ["senha", "lanche", "caneta", "mochila"],
    answer: "senha",
    explanation:
      "Senha é um segredo digital. Ela protege contas, jogos, estudos e informações pessoais.",
  },
  {
    id: "mensagem-assustadora",
    type: "Múltipla escolha",
    title: "Mensagem assustadora na tela",
    question: "O que fazer se aparecer uma mensagem assustadora na tela?",
    options: [
      "Clicar rápido para sumir",
      "Fechar os olhos e ignorar",
      "Chamar um adulto de confiança",
      "Digitar sua senha",
    ],
    answer: "Chamar um adulto de confiança",
    explanation:
      "Mensagens assustadoras podem tentar enganar. Chamar um adulto ajuda a resolver com calma.",
  },
  {
    id: "site-mais-seguro",
    type: "Associação simples",
    title: "Qual site parece mais seguro?",
    question: "Associe a escolha segura: qual endereço parece mais confiável?",
    options: [
      "https://escola.edu.br",
      "premio-gratis-agora.biz",
      "clique-aqui-senha.net",
      "jogos-super-premio.ru",
    ],
    answer: "https://escola.edu.br",
    explanation:
      "Um site seguro costuma ter endereço claro, conhecido e sem promessas estranhas.",
  },
  {
    id: "jogos-online",
    type: "Múltipla escolha",
    title: "Boa atitude em jogos online",
    question: "Qual é uma boa atitude ao usar jogos online?",
    options: [
      "Falar com respeito",
      "Compartilhar senha com o time",
      "Aceitar convite de qualquer pessoa",
      "Jogar escondido a madrugada toda",
    ],
    answer: "Falar com respeito",
    explanation:
      "Jogos online também precisam de gentileza, respeito, limites e cuidado com dados pessoais.",
  },
];
