export type MissionStatus = "Disponível" | "Em andamento" | "Concluída";
export type MissionDifficulty = "Fácil" | "Médio" | "Importante";

export type Mission = {
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  emoji: string;
  visualTitle: string;
  content: string[];
  safetyTip: string;
};

export const missions: Mission[] = [
  {
    slug: "o-que-e-um-computador",
    title: "O que é um computador?",
    description:
      "Conheça as partes do computador e entenda para que ele ajuda no dia a dia.",
    category: "Computador",
    duration: "6 min",
    difficulty: "Fácil",
    status: "Disponível",
    emoji: "💻",
    visualTitle: "Computador por dentro da aventura",
    content: [
      "Um computador é uma máquina que ajuda pessoas a escrever, estudar, desenhar, jogar, pesquisar e conversar.",
      "Ele tem partes importantes, como tela, teclado, mouse e gabinete ou notebook.",
      "Para usar bem, precisamos cuidar dos equipamentos, fechar programas com calma e pedir ajuda quando algo travar.",
    ],
    safetyTip:
      "Use o computador em um lugar combinado com sua família ou seus guias.",
  },
  {
    slug: "para-que-serve-o-mouse",
    title: "Para que serve o mouse?",
    description:
      "Aprenda a apontar, clicar, arrastar e escolher itens na tela com cuidado.",
    category: "Computador",
    duration: "5 min",
    difficulty: "Fácil",
    status: "Em andamento",
    emoji: "🖱️",
    visualTitle: "Clique consciente",
    content: [
      "O mouse ajuda a mover a setinha na tela.",
      "Com ele, você pode clicar em botões, abrir programas, escolher imagens e arrastar objetos.",
      "Antes de clicar, leia com calma o que aparece na tela.",
    ],
    safetyTip: "Nunca clique em avisos assustadores sem chamar um adulto.",
  },
  {
    slug: "para-que-serve-o-teclado",
    title: "Para que serve o teclado?",
    description:
      "Descubra como digitar letras, números, símbolos e usar atalhos simples.",
    category: "Computador",
    duration: "5 min",
    difficulty: "Fácil",
    status: "Disponível",
    emoji: "⌨️",
    visualTitle: "Teclas amigas",
    content: [
      "O teclado serve para escrever palavras, números e comandos.",
      "A tecla espaço separa palavras, Enter confirma algumas ações e Backspace apaga.",
      "Digitar devagar e conferir o texto ajuda a evitar erros.",
    ],
    safetyTip: "Não digite senhas quando alguém desconhecido estiver olhando.",
  },
  {
    slug: "como-ligar-e-desligar-com-seguranca",
    title: "Como ligar e desligar com segurança?",
    description:
      "Veja os cuidados para começar e encerrar o uso de aparelhos sem sustos.",
    category: "Cuidados",
    duration: "7 min",
    difficulty: "Fácil",
    status: "Disponível",
    emoji: "🔌",
    visualTitle: "Começar e terminar com calma",
    content: [
      "Ligar um aparelho deve ser feito com cuidado, usando o botão correto.",
      "Para desligar, feche o que estiver usando e escolha a opção de desligar no sistema.",
      "Tirar da tomada de repente pode causar problemas no aparelho.",
    ],
    safetyTip: "Peça ajuda para mexer em tomadas, cabos ou carregadores.",
  },
  {
    slug: "o-que-e-um-celular",
    title: "O que é um celular?",
    description:
      "Entenda como o celular ajuda a comunicar, estudar, fotografar e brincar.",
    category: "Celular",
    duration: "6 min",
    difficulty: "Fácil",
    status: "Disponível",
    emoji: "📱",
    visualTitle: "Celular esperto",
    content: [
      "O celular é um aparelho pequeno que pode fazer chamadas, mandar mensagens, tirar fotos e acessar a internet.",
      "Ele também pode ter aplicativos para estudar, desenhar, ouvir histórias e organizar tarefas.",
      "Mesmo sendo útil, precisa de combinados de tempo e segurança.",
    ],
    safetyTip: "Não envie fotos ou informações pessoais sem autorização de um adulto.",
  },
  {
    slug: "o-que-e-um-aplicativo",
    title: "O que é um aplicativo?",
    description:
      "Aprenda o que são apps e por que é importante instalar com segurança.",
    category: "Celular",
    duration: "6 min",
    difficulty: "Fácil",
    status: "Em andamento",
    emoji: "🎮",
    visualTitle: "Apps com cuidado",
    content: [
      "Aplicativo, ou app, é um programa que fica no celular, tablet ou computador.",
      "Existem apps para estudar, conversar, jogar, assistir vídeos e criar desenhos.",
      "Alguns apps pedem permissões. É importante entender antes de aceitar.",
    ],
    safetyTip: "Instale aplicativos somente com ajuda da sua família ou seus guias.",
  },
  {
    slug: "o-que-e-um-navegador",
    title: "O que é um navegador?",
    description:
      "Conheça a ferramenta usada para visitar sites e pesquisar na internet.",
    category: "Internet",
    duration: "5 min",
    difficulty: "Fácil",
    status: "Disponível",
    emoji: "🌎",
    visualTitle: "Porta da internet",
    content: [
      "Navegador é o aplicativo usado para abrir páginas da internet.",
      "Ele tem uma barra de endereço, botões de voltar e avançar, e abas para organizar páginas.",
      "Você pode pesquisar assuntos, abrir sites e assistir conteúdos educativos.",
    ],
    safetyTip: "Confira o endereço do site antes de confiar em uma página.",
  },
  {
    slug: "o-que-e-um-site",
    title: "O que é um site?",
    description:
      "Entenda o que são páginas da internet e como reconhecer sites confiáveis.",
    category: "Internet",
    duration: "6 min",
    difficulty: "Fácil",
    status: "Disponível",
    emoji: "🧭",
    visualTitle: "Páginas para visitar",
    content: [
      "Um site é um lugar na internet com páginas, textos, imagens, vídeos ou serviços.",
      "Alguns sites ajudam a estudar, outros vendem produtos, e outros são apenas para diversão.",
      "Sites confiáveis costumam ter informações claras e endereço correto.",
    ],
    safetyTip: "Se um site pedir dados pessoais, chame um adulto antes de preencher.",
  },
  {
    slug: "como-criar-uma-senha-segura",
    title: "Como criar uma senha segura?",
    description:
      "Monte senhas mais fortes e aprenda por que elas são segredos digitais.",
    category: "Segurança",
    duration: "8 min",
    difficulty: "Importante",
    status: "Em andamento",
    emoji: "🔐",
    visualTitle: "Senha campeã",
    content: [
      "Uma senha segura mistura palavras, números e símbolos de um jeito difícil de adivinhar.",
      "Evite usar nome, aniversário, escola ou palavras muito fáceis.",
      "Senha é como uma chave: não deve ser compartilhada com amigos ou desconhecidos.",
    ],
    safetyTip: "Compartilhe senhas somente com um responsável de confiança.",
  },
  {
    slug: "por-que-nao-falar-com-estranhos-online",
    title: "Por que não falar com estranhos online?",
    description:
      "Aprenda a reconhecer conversas perigosas e proteger sua privacidade.",
    category: "Segurança",
    duration: "8 min",
    difficulty: "Importante",
    status: "Disponível",
    emoji: "🦉",
    visualTitle: "Conversas com cuidado",
    content: [
      "Na internet, nem sempre sabemos quem está do outro lado da conversa.",
      "Uma pessoa desconhecida pode fingir ser criança, amigo ou alguém confiável.",
      "Se alguém pedir segredo, foto, endereço ou senha, pare e chame um adulto.",
    ],
    safetyTip:
      "Não responda mensagens de estranhos sem conversar com sua família ou seus guias.",
  },
  {
    slug: "o-que-fazer-ao-receber-mensagem-estranha",
    title: "O que fazer ao receber mensagem estranha?",
    description:
      "Pratique o passo a passo para pausar, não responder e pedir ajuda.",
    category: "Segurança",
    duration: "7 min",
    difficulty: "Importante",
    status: "Disponível",
    emoji: "🚨",
    visualTitle: "Pare, respire e peça ajuda",
    content: [
      "Mensagem estranha pode ter ameaça, pedido de segredo, link suspeito ou promessa boa demais.",
      "Você não precisa responder rápido. Pode pausar e mostrar para um adulto.",
      "Guardar a mensagem pode ajudar o adulto a entender o que aconteceu.",
    ],
    safetyTip: "Não apague nem responda antes de pedir ajuda a um adulto.",
  },
  {
    slug: "como-saber-se-um-link-e-perigoso",
    title: "Como saber se um link é perigoso?",
    description:
      "Veja sinais de links suspeitos antes de clicar em mensagens ou sites.",
    category: "Segurança",
    duration: "7 min",
    difficulty: "Médio",
    status: "Disponível",
    emoji: "⚠️",
    visualTitle: "Olhos atentos no link",
    content: [
      "Links perigosos podem ter letras trocadas, promessas de prêmio ou pedidos urgentes.",
      "Antes de clicar, observe se o endereço parece correto e se veio de uma pessoa confiável.",
      "Se não tiver certeza, não clique.",
    ],
    safetyTip: "Na dúvida, pare e pergunte para um adulto.",
  },
  {
    slug: "como-estudar-usando-a-internet",
    title: "Como estudar usando a internet?",
    description:
      "Use pesquisas, vídeos e sites educativos para aprender melhor.",
    category: "Estudos",
    duration: "8 min",
    difficulty: "Médio",
    status: "Disponível",
    emoji: "🚀",
    visualTitle: "Pesquisa que ajuda",
    content: [
      "A internet pode ajudar a encontrar explicações, imagens, mapas, vídeos e exercícios.",
      "Use palavras-chave curtas e confira mais de uma fonte.",
      "Anote o que aprendeu com suas próprias palavras.",
    ],
    safetyTip: "Prefira sites indicados por professores, família ou fontes conhecidas.",
  },
  {
    slug: "como-usar-videos-para-aprender",
    title: "Como usar vídeos para aprender?",
    description:
      "Escolha vídeos educativos e use pausas para entender melhor o conteúdo.",
    category: "Estudos",
    duration: "6 min",
    difficulty: "Fácil",
    status: "Disponível",
    emoji: "🎬",
    visualTitle: "Vídeos que ensinam",
    content: [
      "Vídeos podem explicar assuntos com imagens, som e exemplos.",
      "Pausar, voltar e anotar ajuda a aprender com mais calma.",
      "Nem todo vídeo é adequado para crianças, então escolha com cuidado.",
    ],
    safetyTip: "Assista vídeos educativos em canais combinados com adultos.",
  },
  {
    slug: "como-pedir-ajuda-para-um-adulto",
    title: "Como pedir ajuda para um adulto?",
    description:
      "Aprenda quando chamar sua família ou seus guias durante o uso da tecnologia.",
    category: "Ajuda",
    duration: "5 min",
    difficulty: "Fácil",
    status: "Concluída",
    emoji: "⭐",
    visualTitle: "Ajuda é atitude inteligente",
    content: [
      "Pedir ajuda não é vergonha. É uma forma de se proteger e aprender melhor.",
      "Chame um adulto quando aparecer mensagem estranha, erro, cobrança, link suspeito ou pedido de dados.",
      "Explique o que aconteceu e mostre a tela com calma.",
    ],
    safetyTip: "Escolha adultos de confiança para ajudar na sua jornada digital.",
  },
];

export function getMissionBySlug(slug: string) {
  return missions.find((mission) => mission.slug === slug);
}
