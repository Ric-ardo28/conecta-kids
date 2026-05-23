-- Conecta Kids - conteúdo educativo inicial
-- Rode no Supabase SQL Editor depois de executar supabase/schema.sql.
-- Este seed é idempotente: pode ser executado mais de uma vez.
-- Não cria usuários, ranking, progresso ou respostas falsas.

begin;

with adventure_seed(title, description, level, icon, sort_order) as (
  values
    ('Segurança na Internet', 'Aprenda a navegar com calma, atenção e ajuda de adultos quando necessário.', 'Iniciante', '🌎', 1),
    ('Senhas Seguras', 'Crie senhas fortes e cuide dos seus segredos digitais.', 'Iniciante', '🔐', 2),
    ('Golpes Online', 'Reconheça promessas falsas, mensagens urgentes e pedidos suspeitos.', 'Intermediário', '🛡️', 3),
    ('Cyberbullying', 'Entenda como agir com respeito e pedir ajuda em situações difíceis.', 'Intermediário', '💬', 4),
    ('Privacidade Digital', 'Proteja informações importantes e pense antes de compartilhar.', 'Iniciante', '🔒', 5),
    ('Dados Pessoais', 'Descubra quais dados não devem ser enviados em apps, jogos e sites.', 'Iniciante', '🧠', 6),
    ('Redes Sociais com Cuidado', 'Use curtidas, comentários e publicações com responsabilidade.', 'Intermediário', '⭐', 7),
    ('Jogos Online com Segurança', 'Jogue com respeito, limites e atenção aos chats.', 'Intermediário', '🎮', 8),
    ('Links Suspeitos', 'Aprenda a observar endereços, botões e mensagens antes de clicar.', 'Iniciante', '🔎', 9),
    ('Inteligência Artificial com Segurança', 'Use IA para aprender sem depender dela e sem enviar dados pessoais.', 'Avançado', '🤖', 10),
    ('Fake News', 'Compare fontes e descubra sinais de notícias falsas.', 'Intermediário', '📰', 11),
    ('Compras Online', 'Entenda que compras e pagamentos precisam de adultos responsáveis.', 'Avançado', '🛒', 12),
    ('Tempo de Tela', 'Organize pausas, estudos, brincadeiras e descanso.', 'Iniciante', '⏰', 13),
    ('Respeito Digital', 'Pratique gentileza em mensagens, jogos, comentários e chamadas.', 'Iniciante', '🤝', 14),
    ('Proteção contra Desconhecidos', 'Saiba o que fazer quando alguém desconhecido chama você online.', 'Intermediário', '🦉', 15),
    ('Downloads Seguros', 'Baixe arquivos e aplicativos somente com orientação de adultos.', 'Intermediário', '📥', 16),
    ('Fotos e Vídeos na Internet', 'Pense antes de publicar imagens e respeite a privacidade.', 'Intermediário', '📸', 17),
    ('Conversas em Aplicativos', 'Use chats com cuidado, educação e segurança.', 'Iniciante', '📱', 18),
    ('Cuidados com QR Code', 'Entenda como QR Codes funcionam e por que conferir antes de abrir.', 'Avançado', '⬛', 19),
    ('Boas Práticas Digitais', 'Construa hábitos seguros para estudar, brincar e criar online.', 'Iniciante', '🚀', 20)
)
insert into public.digital_adventures (title, description, level, icon, sort_order)
select title, description, level, icon, sort_order
from adventure_seed seed
where not exists (
  select 1
  from public.digital_adventures existing
  where lower(existing.title) = lower(seed.title)
);

with mission_seed(adventure_title, mission_order, title, description, category, duration_minutes, difficulty, content, safety_tip) as (
  values
    ('Segurança na Internet', 1, 'Navegar com atenção', 'Aprenda a olhar a página antes de clicar.', 'Internet segura', 6, 'Fácil', 'Observe título, endereço e botões. Se algo parecer estranho, pare antes de clicar.', 'Na dúvida, chame um adulto de confiança.'),
    ('Segurança na Internet', 2, 'Pedir ajuda na hora certa', 'Entenda quando chamar família ou professor.', 'Internet segura', 5, 'Fácil', 'Pedir ajuda é uma atitude inteligente quando uma tela assusta ou pede informação pessoal.', 'Mostre a tela para um adulto antes de responder.'),
    ('Senhas Seguras', 1, 'Criar uma senha forte', 'Misture palavras, números e símbolos com cuidado.', 'Senhas', 8, 'Fácil', 'Uma senha forte é difícil de adivinhar e não usa nome, aniversário ou escola.', 'Senha é segredo e não deve ser contada a amigos.'),
    ('Senhas Seguras', 2, 'Guardar senhas com segurança', 'Aprenda onde a senha pode ou não pode ficar.', 'Senhas', 6, 'Fácil', 'Senhas devem ficar com a criança e seus responsáveis, não em chats ou comentários.', 'Compartilhe senhas apenas com responsável de confiança.'),
    ('Golpes Online', 1, 'Promessas boas demais', 'Reconheça prêmios, presentes e urgências falsas.', 'Golpes', 7, 'Médio', 'Golpes tentam fazer você clicar rápido usando medo, prêmio ou pressa.', 'Pare e converse com um adulto antes de acreditar em promessa online.'),
    ('Golpes Online', 2, 'Mensagens pedindo segredo', 'Saiba por que pedidos de segredo podem ser perigosos.', 'Golpes', 7, 'Médio', 'Quando alguém pede segredo sobre uma conversa online, isso pode ser sinal de risco.', 'Nunca esconda de um adulto uma conversa que deixou você confuso.'),
    ('Cyberbullying', 1, 'Respeito nas mensagens', 'Entenda como palavras podem machucar online.', 'Convivência', 6, 'Médio', 'Mensagens devem ser respeitosas. Brincadeiras que humilham não são legais.', 'Se alguém ofender você, salve a mensagem e peça ajuda.'),
    ('Cyberbullying', 2, 'Como pedir ajuda', 'Aprenda passos para agir sem revidar agressões.', 'Convivência', 6, 'Médio', 'Não responda com agressão. Faça uma pausa e mostre a situação para um adulto.', 'Você não precisa resolver bullying sozinho.'),
    ('Privacidade Digital', 1, 'O que é privacidade?', 'Aprenda que algumas informações devem ficar protegidas.', 'Privacidade', 5, 'Fácil', 'Privacidade é cuidar do que só você e sua família devem saber.', 'Não publique rotina, endereço, telefone ou escola.'),
    ('Privacidade Digital', 2, 'Configurações de privacidade', 'Entenda que apps têm ajustes de segurança.', 'Privacidade', 7, 'Médio', 'Alguns apps permitem escolher quem vê fotos, mensagens e perfil.', 'Peça ajuda para revisar configurações de privacidade.'),
    ('Dados Pessoais', 1, 'Quais dados são pessoais?', 'Identifique nome completo, endereço, escola e telefone.', 'Dados pessoais', 5, 'Fácil', 'Dados pessoais contam quem você é ou onde pode ser encontrado.', 'Não envie dados pessoais em jogos, chats ou sites.'),
    ('Dados Pessoais', 2, 'Formulários na internet', 'Aprenda a pausar antes de preencher campos online.', 'Dados pessoais', 6, 'Fácil', 'Formulários podem pedir informações importantes. Nem todo formulário é seguro.', 'Chame um adulto antes de preencher qualquer cadastro.'),
    ('Redes Sociais com Cuidado', 1, 'Pensar antes de postar', 'Veja por que publicações podem alcançar muita gente.', 'Redes sociais', 7, 'Médio', 'Depois de postar, outras pessoas podem salvar ou compartilhar.', 'Pergunte antes de publicar fotos de outras pessoas.'),
    ('Redes Sociais com Cuidado', 2, 'Comentários respeitosos', 'Pratique gentileza ao comentar online.', 'Redes sociais', 5, 'Fácil', 'Comentários devem ajudar, elogiar ou perguntar com respeito.', 'Se estiver irritado, respire antes de comentar.'),
    ('Jogos Online com Segurança', 1, 'Chats em jogos', 'Use o chat com respeito e sem dados pessoais.', 'Jogos online', 6, 'Médio', 'Chats de jogos podem ter pessoas desconhecidas. Fale apenas o necessário.', 'Não diga nome completo, idade, escola ou cidade no jogo.'),
    ('Jogos Online com Segurança', 2, 'Convites de desconhecidos', 'Saiba como agir quando alguém desconhecido chama para jogar.', 'Jogos online', 6, 'Médio', 'Convites podem parecer legais, mas é preciso cuidado com desconhecidos.', 'Peça ajuda antes de aceitar convite de quem você não conhece.'),
    ('Links Suspeitos', 1, 'Olhar o endereço', 'Aprenda a observar letras estranhas e domínios desconhecidos.', 'Links', 6, 'Fácil', 'Links perigosos podem trocar letras ou usar nomes parecidos com sites famosos.', 'Confira o endereço com calma antes de clicar.'),
    ('Links Suspeitos', 2, 'Botões chamativos', 'Entenda que nem todo botão colorido é seguro.', 'Links', 5, 'Fácil', 'Botões com prêmio, urgência ou ameaça podem tentar enganar.', 'Não clique em botões que assustam ou prometem prêmio fácil.'),
    ('Inteligência Artificial com Segurança', 1, 'Perguntar sem dados pessoais', 'Use IA para estudar sem enviar informações sensíveis.', 'IA segura', 8, 'Avançado', 'A IA pode ajudar a explicar assuntos, mas não precisa saber seus dados pessoais.', 'Não envie nome completo, endereço, escola, telefone ou localização.'),
    ('Inteligência Artificial com Segurança', 2, 'Pensar junto com a IA', 'Aprenda a usar respostas como pistas, não como dependência.', 'IA segura', 8, 'Avançado', 'A IA pode errar. Compare respostas e tente explicar com suas palavras.', 'Peça ajuda a professores e responsáveis para revisar respostas importantes.'),
    ('Fake News', 1, 'Comparar fontes', 'Veja por que uma notícia precisa ser conferida.', 'Informação', 7, 'Médio', 'Uma informação fica mais confiável quando aparece em fontes conhecidas e responsáveis.', 'Não compartilhe notícia antes de conferir.'),
    ('Fake News', 2, 'Sinais de notícia falsa', 'Reconheça títulos exagerados e imagens fora de contexto.', 'Informação', 7, 'Médio', 'Fake news costumam usar frases fortes, pressa e pouca explicação.', 'Na dúvida, pergunte a um adulto ou professor.'),
    ('Compras Online', 1, 'Compras precisam de adultos', 'Entenda que dinheiro e cartões são responsabilidade de adultos.', 'Compras online', 6, 'Avançado', 'Sites de compra pedem dados de pagamento e endereço, por isso precisam de adulto.', 'Nunca compre ou informe cartão sem responsável.'),
    ('Compras Online', 2, 'Ofertas suspeitas', 'Aprenda que preço muito baixo pode ser golpe.', 'Compras online', 6, 'Avançado', 'Ofertas impossíveis podem ser feitas para pegar dados ou dinheiro.', 'Mostre ofertas para um adulto antes de clicar.'),
    ('Tempo de Tela', 1, 'Pausas saudáveis', 'Organize descanso para olhos, corpo e mente.', 'Hábitos digitais', 5, 'Fácil', 'Pausas ajudam o corpo e deixam o estudo mais tranquilo.', 'Combine horários com sua família.'),
    ('Tempo de Tela', 2, 'Equilíbrio entre online e offline', 'Misture tecnologia, brincadeiras, leitura e descanso.', 'Hábitos digitais', 5, 'Fácil', 'A tecnologia ajuda, mas brincar, dormir e conversar também são importantes.', 'Se perder a noção do tempo, peça ajuda para organizar uma rotina.'),
    ('Respeito Digital', 1, 'Gentileza online', 'Pratique palavras educadas em mensagens e jogos.', 'Cidadania digital', 5, 'Fácil', 'Na internet também existem pessoas com sentimentos do outro lado da tela.', 'Escreva como você gostaria de ser tratado.'),
    ('Respeito Digital', 2, 'Discordar com cuidado', 'Aprenda a discordar sem ofender.', 'Cidadania digital', 6, 'Médio', 'Discordar é permitido, mas xingar e humilhar não é respeito.', 'Se a conversa esquentar, faça uma pausa.'),
    ('Proteção contra Desconhecidos', 1, 'Quem está do outro lado?', 'Entenda que nem todo perfil mostra a verdade.', 'Desconhecidos online', 7, 'Médio', 'Uma pessoa online pode fingir ser alguém diferente.', 'Não confie em desconhecidos sem falar com adulto.'),
    ('Proteção contra Desconhecidos', 2, 'Mensagens estranhas', 'Saiba agir quando alguém pede foto, segredo ou encontro.', 'Desconhecidos online', 7, 'Médio', 'Pedidos de foto, segredo ou encontro são sinais importantes de perigo.', 'Pare a conversa e chame um adulto imediatamente.'),
    ('Downloads Seguros', 1, 'Baixar com cuidado', 'Entenda que arquivos podem trazer riscos.', 'Downloads', 6, 'Médio', 'Downloads de lugares desconhecidos podem ter vírus ou programas ruins.', 'Baixe apenas com orientação de adulto.'),
    ('Downloads Seguros', 2, 'Permissões de aplicativos', 'Aprenda a observar o que o app pede para acessar.', 'Downloads', 7, 'Médio', 'Alguns apps pedem câmera, microfone, contatos ou localização.', 'Pergunte antes de aceitar permissões.'),
    ('Fotos e Vídeos na Internet', 1, 'Antes de publicar uma foto', 'Pense se a imagem pode expor alguém.', 'Fotos e vídeos', 6, 'Médio', 'Fotos mostram lugares, rostos e momentos pessoais.', 'Peça autorização antes de publicar fotos de outras pessoas.'),
    ('Fotos e Vídeos na Internet', 2, 'Vídeos seguros', 'Escolha vídeos adequados e educativos.', 'Fotos e vídeos', 6, 'Fácil', 'Nem todo vídeo é adequado para crianças, mesmo parecendo divertido.', 'Use canais combinados com adultos.'),
    ('Conversas em Aplicativos', 1, 'Mensagens com segurança', 'Converse sem enviar dados pessoais.', 'Aplicativos', 5, 'Fácil', 'Aplicativos de conversa devem ser usados com respeito e cuidado.', 'Não envie endereço, senha ou localização.'),
    ('Conversas em Aplicativos', 2, 'Grupos e convites', 'Entenda quando entrar ou sair de grupos.', 'Aplicativos', 6, 'Fácil', 'Grupos podem ter muitas pessoas e mensagens rápidas.', 'Peça ajuda se um grupo tiver conteúdo estranho.'),
    ('Cuidados com QR Code', 1, 'O que é QR Code?', 'Entenda que QR Code abre links e informações.', 'QR Code', 6, 'Avançado', 'QR Code é como uma porta rápida para um site ou conteúdo.', 'Confira com adulto antes de abrir QR Codes desconhecidos.'),
    ('Cuidados com QR Code', 2, 'QR Code em lugares públicos', 'Aprenda por que códigos em cartazes precisam de cuidado.', 'QR Code', 7, 'Avançado', 'Códigos em lugares públicos podem ser trocados ou levar a páginas suspeitas.', 'Não escaneie QR Code estranho sem orientação.'),
    ('Boas Práticas Digitais', 1, 'Checklist de segurança', 'Revise hábitos simples para usar tecnologia bem.', 'Boas práticas', 6, 'Fácil', 'Ler antes de clicar, proteger senhas e pedir ajuda são atitudes importantes.', 'Use um combinado familiar de segurança digital.'),
    ('Boas Práticas Digitais', 2, 'Aprender e ensinar', 'Compartilhe boas atitudes digitais com a turminha.', 'Boas práticas', 6, 'Fácil', 'Quando você aprende segurança digital, também pode ajudar colegas com gentileza.', 'Ensine sem expor ou envergonhar ninguém.')
)
insert into public.missions (
  adventure_id,
  title,
  description,
  category,
  duration_minutes,
  difficulty,
  content,
  safety_tip
)
select
  adventure.id,
  seed.title,
  seed.description,
  seed.category,
  seed.duration_minutes,
  seed.difficulty,
  seed.content,
  seed.safety_tip
from mission_seed seed
join public.digital_adventures adventure
  on lower(adventure.title) = lower(seed.adventure_title)
where not exists (
  select 1
  from public.missions existing
  where existing.adventure_id = adventure.id
    and lower(existing.title) = lower(seed.title)
);

with mission_seed(adventure_title, mission_order, mission_title) as (
  values
    ('Segurança na Internet', 1, 'Navegar com atenção'),
    ('Segurança na Internet', 2, 'Pedir ajuda na hora certa'),
    ('Senhas Seguras', 1, 'Criar uma senha forte'),
    ('Senhas Seguras', 2, 'Guardar senhas com segurança'),
    ('Golpes Online', 1, 'Promessas boas demais'),
    ('Golpes Online', 2, 'Mensagens pedindo segredo'),
    ('Cyberbullying', 1, 'Respeito nas mensagens'),
    ('Cyberbullying', 2, 'Como pedir ajuda'),
    ('Privacidade Digital', 1, 'O que é privacidade?'),
    ('Privacidade Digital', 2, 'Configurações de privacidade'),
    ('Dados Pessoais', 1, 'Quais dados são pessoais?'),
    ('Dados Pessoais', 2, 'Formulários na internet'),
    ('Redes Sociais com Cuidado', 1, 'Pensar antes de postar'),
    ('Redes Sociais com Cuidado', 2, 'Comentários respeitosos'),
    ('Jogos Online com Segurança', 1, 'Chats em jogos'),
    ('Jogos Online com Segurança', 2, 'Convites de desconhecidos'),
    ('Links Suspeitos', 1, 'Olhar o endereço'),
    ('Links Suspeitos', 2, 'Botões chamativos'),
    ('Inteligência Artificial com Segurança', 1, 'Perguntar sem dados pessoais'),
    ('Inteligência Artificial com Segurança', 2, 'Pensar junto com a IA'),
    ('Fake News', 1, 'Comparar fontes'),
    ('Fake News', 2, 'Sinais de notícia falsa'),
    ('Compras Online', 1, 'Compras precisam de adultos'),
    ('Compras Online', 2, 'Ofertas suspeitas'),
    ('Tempo de Tela', 1, 'Pausas saudáveis'),
    ('Tempo de Tela', 2, 'Equilíbrio entre online e offline'),
    ('Respeito Digital', 1, 'Gentileza online'),
    ('Respeito Digital', 2, 'Discordar com cuidado'),
    ('Proteção contra Desconhecidos', 1, 'Quem está do outro lado?'),
    ('Proteção contra Desconhecidos', 2, 'Mensagens estranhas'),
    ('Downloads Seguros', 1, 'Baixar com cuidado'),
    ('Downloads Seguros', 2, 'Permissões de aplicativos'),
    ('Fotos e Vídeos na Internet', 1, 'Antes de publicar uma foto'),
    ('Fotos e Vídeos na Internet', 2, 'Vídeos seguros'),
    ('Conversas em Aplicativos', 1, 'Mensagens com segurança'),
    ('Conversas em Aplicativos', 2, 'Grupos e convites'),
    ('Cuidados com QR Code', 1, 'O que é QR Code?'),
    ('Cuidados com QR Code', 2, 'QR Code em lugares públicos'),
    ('Boas Práticas Digitais', 1, 'Checklist de segurança'),
    ('Boas Práticas Digitais', 2, 'Aprender e ensinar')
),
mission_scope as (
  select
    mission.id,
    mission.title,
    adventure.title as adventure_title,
    row_number() over (order by adventure.sort_order, seed.mission_order) as mission_position
  from mission_seed seed
  join public.digital_adventures adventure
    on lower(adventure.title) = lower(seed.adventure_title)
  join public.missions mission
    on mission.adventure_id = adventure.id
   and lower(mission.title) = lower(seed.mission_title)
),
challenge_seed as (
  select
    id as mission_id,
    title || ' - atitude segura' as title,
    'Qual atitude combina com a missão "' || title || '"?' as question,
    'multiple_choice' as challenge_type,
    '["Pedir ajuda a um adulto de confiança", "Clicar rápido sem ler", "Enviar meus dados pessoais", "Esconder o que aconteceu"]'::jsonb as options,
    'Pedir ajuda a um adulto de confiança' as correct_answer,
    'Pedir ajuda é uma atitude segura quando aparece dúvida, medo ou pedido de informação pessoal.' as explanation
  from mission_scope

  union all

  select
    id as mission_id,
    title || ' - verdadeiro ou falso' as title,
    'Verdadeiro ou falso: na missão "' || title || '", posso compartilhar dados pessoais sem pedir ajuda.' as question,
    'true_false' as challenge_type,
    '["Verdadeiro", "Falso"]'::jsonb as options,
    'Falso' as correct_answer,
    'Dados pessoais devem ficar protegidos. Antes de compartilhar qualquer informação, chame um adulto.' as explanation
  from mission_scope
  where mission_position % 3 = 1

  union all

  select
    id as mission_id,
    title || ' - complete a frase' as title,
    'Complete: Se algo parecer estranho online, eu chamo um ______ de confiança.' as question,
    'complete_phrase' as challenge_type,
    '["adulto", "desconhecido", "jogo", "prêmio"]'::jsonb as options,
    'adulto' as correct_answer,
    'Um adulto de confiança pode ajudar a entender a situação e proteger você.' as explanation
  from mission_scope
  where mission_position % 3 = 2

  union all

  select
    id as mission_id,
    title || ' - associação segura' as title,
    'Escolha a combinação mais segura para a missão "' || title || '".' as question,
    'simple_match' as challenge_type,
    '["Link estranho + pedir ajuda", "Senha + compartilhar no chat", "Desconhecido + enviar foto", "Prêmio grátis + clicar rápido"]'::jsonb as options,
    'Link estranho + pedir ajuda' as correct_answer,
    'Quando algo parece estranho, a combinação segura é pausar e pedir ajuda.' as explanation
  from mission_scope
  where mission_position % 3 = 0
)
insert into public.challenges (
  mission_id,
  title,
  question,
  challenge_type,
  options,
  correct_answer,
  explanation
)
select
  mission_id,
  title,
  question,
  challenge_type,
  options,
  correct_answer,
  explanation
from challenge_seed seed
where not exists (
  select 1
  from public.challenges existing
  where existing.mission_id = seed.mission_id
    and lower(existing.title) = lower(seed.title)
);

commit;
