export type MockClass = {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
  studentIds: string[];
  currentMissionIds: string[];
  progress: number;
  nextActivity: string;
};

export const mockClasses: MockClass[] = [
  {
    id: "class-estrelinhas",
    name: "Turma Estrelinhas",
    teacherId: "user-ana",
    teacherName: "Ana Ribeiro",
    studentIds: ["user-lia", "user-maya"],
    currentMissionIds: ["mission-mouse", "mission-senha-segura"],
    progress: 72,
    nextActivity: "Desafio: senha segura",
  },
  {
    id: "class-navegadores",
    name: "Turma Navegadores",
    teacherId: "user-ana",
    teacherName: "Ana Ribeiro",
    studentIds: ["user-davi"],
    currentMissionIds: ["mission-link-perigoso", "mission-pesquisar"],
    progress: 61,
    nextActivity: "Missão: não clicar em links perigosos",
  },
];
