import { productAreas } from "@/lib/product-areas";

export const publicRoutes = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/cadastro", label: "Cadastro" },
  { href: "/privacidade", label: productAreas.privacy },
  { href: "/termos", label: productAreas.terms },
] as const;

export const loggedRoutes = [
  {
    href: "/dashboard",
    technicalName: "Dashboard",
    label: productAreas.dashboard,
    description:
      "Veja suas aventuras, missões do dia, estrelinhas e próximos passos.",
  },
  {
    href: "/trilhas",
    technicalName: "Trilhas",
    label: productAreas.tracks,
    description:
      "Escolha caminhos divertidos para aprender computador, celular e internet.",
  },
  {
    href: "/aulas",
    technicalName: "Aulas",
    label: productAreas.lessons,
    description:
      "Aprenda em passos curtos com explicações simples, figuras e prática.",
  },
  {
    href: "/exercicios",
    technicalName: "Exercícios",
    label: productAreas.exercises,
    description:
      "Resolva atividades rápidas para treinar segurança digital com alegria.",
  },
  {
    href: "/ranking",
    technicalName: "Ranking",
    label: productAreas.ranking,
    description:
      "Celebre pontos, medalhas e conquistas sem pressão ou comparação ruim.",
  },
  {
    href: "/chat",
    technicalName: "Chat",
    label: productAreas.chat,
    description:
      "Converse com o Tutor Digital para tirar dúvidas sobre tecnologia segura.",
  },
  {
    href: "/turmas",
    technicalName: "Turmas",
    label: productAreas.classes,
    description:
      "Acompanhe sua turminha, combinados coletivos e aventuras em grupo.",
  },
  {
    href: "/perfil",
    technicalName: "Perfil",
    label: productAreas.profile,
    description:
      "Cuide do seu avatar, nome de exibição e conquistas da jornada.",
  },
  {
    href: "/responsaveis",
    technicalName: "Responsáveis",
    label: productAreas.guardians,
    description:
      "Espaço para adultos acompanharem progresso, segurança e combinados.",
  },
  {
    href: "/professores",
    technicalName: "Professores",
    label: productAreas.teachers,
    description:
      "Guias para organizar missões, turmas e aprendizagem digital.",
  },
] as const;

export type LoggedRoute = (typeof loggedRoutes)[number];
