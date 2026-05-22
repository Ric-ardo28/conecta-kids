export type MockUserRole = "crianca" | "responsavel" | "professor";

export type MockUser = {
  id: string;
  name: string;
  avatar: string;
  role: MockUserRole;
  age?: number;
  profileLabel: string;
  linkedChildrenIds?: string[];
  linkedClassIds?: string[];
};

export const mockUsers: MockUser[] = [
  {
    id: "user-lia",
    name: "Lia",
    avatar: "🧑‍🚀",
    role: "crianca",
    age: 9,
    profileLabel: "Aprendendo mouse, senha segura e pesquisa na internet",
    linkedClassIds: ["class-estrelinhas"],
  },
  {
    id: "user-davi",
    name: "Davi",
    avatar: "🧙",
    role: "crianca",
    age: 10,
    profileLabel: "Praticando links seguros e boas maneiras online",
    linkedClassIds: ["class-navegadores"],
  },
  {
    id: "user-maya",
    name: "Maya",
    avatar: "🦸",
    role: "crianca",
    age: 8,
    profileLabel: "Descobrindo computador, celular e ajuda de adultos",
    linkedClassIds: ["class-estrelinhas"],
  },
  {
    id: "user-marina",
    name: "Marina Souza",
    avatar: "👩‍👧",
    role: "responsavel",
    profileLabel: "Acompanha progresso, alertas e combinados digitais",
    linkedChildrenIds: ["user-lia", "user-maya"],
  },
  {
    id: "user-ana",
    name: "Ana Ribeiro",
    avatar: "👩‍🏫",
    role: "professor",
    profileLabel: "Guia de segurança digital e pesquisa escolar",
    linkedClassIds: ["class-estrelinhas", "class-navegadores"],
  },
];
