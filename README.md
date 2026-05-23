# Conecta Kids

Plataforma de inclusão digital infantil para ensinar crianças, responsáveis e professores a usar tecnologia de forma segura, correta, educativa e divertida.

Frase principal:

> Aprenda a usar celular, computador e internet com segurança, diversão e responsabilidade.

## Identidade do produto

O Conecta Kids deve ter linguagem simples, alegre, infantil, educativa, segura e acolhedora.

Use termos como jornada, aventuras, missões, desafios, estrelinhas, conquistas, turminha, Kids Digital, Meu Avatar, Minha Família e Meus Guias.

Evite linguagem técnica demais, visual corporativo, telas frias, excesso de texto, layout administrativo comum e cores escuras demais.

## Nomes visuais das áreas

Os nomes técnicos podem continuar claros no código, mas a interface deve usar nomes infantis:

| Área técnica | Nome visual |
| --- | --- |
| Dashboard | Minha Jornada |
| Trilhas | Aventuras Digitais |
| Aulas | Missões |
| Exercícios | Desafios |
| Ranking | Hall das Estrelinhas |
| Chat | Kids Digital |
| Turmas | Minha Turminha |
| Perfil | Meu Avatar |
| Responsáveis | Minha Família |
| Professores | Meus Guias |
| Privacidade | Segurança e Privacidade |
| Termos | Combinados de Uso |

## Estrutura de páginas

Páginas públicas:

- `/`: Home
- `/login`: Login
- `/cadastro`: Cadastro
- `/privacidade`: Segurança e Privacidade
- `/termos`: Combinados de Uso

Páginas logadas:

- `/dashboard`: Minha Jornada
- `/trilhas`: Aventuras Digitais
- `/aulas`: Missões
- `/exercicios`: Desafios
- `/ranking`: Hall das Estrelinhas
- `/chat`: Kids Digital
- `/turmas`: Minha Turminha
- `/perfil`: Meu Avatar
- `/responsaveis`: Minha Família
- `/professores`: Meus Guias

## Home

A Home (`/`) apresenta a proposta do Conecta Kids com:

- Header com logo, Entrar e Começar agora.
- Hero educativo com ilustração infantil.
- Seções para crianças, responsáveis e professores.
- Blocos de internet segura, aprender brincando, conquistas e estrelinhas.
- CTA final para cadastro.
- Footer com links de privacidade e termos.

## Login e cadastro

`/login` contém e-mail, senha, botão Entrar, botão Entrar com Google, link para cadastro e recuperação de senha.

`/cadastro` contém nome completo, e-mail, senha, confirmação de senha, tipo de perfil, aceite dos termos e botão Criar minha conta.

## Área logada e dashboard

As páginas logadas usam sidebar colorida com:

- Minha Jornada
- Aventuras Digitais
- Missões
- Desafios
- Hall das Estrelinhas
- Tutor Digital
- Minha Turminha
- Meu Avatar
- Minha Família
- Meus Guias

`/dashboard` apresenta a Minha Jornada com blocos para criança, responsável e professor.

## Aventuras Digitais

`/trilhas` apresenta cards de aventuras com título, descrição, emoji/ícone, nível, progresso, quantidade de missões e CTA para começar ou continuar.

## Missões

`/aulas` apresenta missões educativas com título, descrição, categoria, duração, dificuldade, status e botão Iniciar missão.

`/aulas/[slug]` apresenta o detalhe da missão com conteúdo textual simples, área visual para imagem/vídeo, dica de segurança e ações para concluir a missão ou ir para desafio.

## Desafios

`/exercicios` apresenta desafios educativos dos tipos múltipla escolha, verdadeiro ou falso, complete a frase e associação simples, com feedback imediato e explicação simples.

## Hall das Estrelinhas

`/ranking` apresenta um hall positivo com avatares, estrelinhas, níveis, medalhas, conquistas e progresso individual, reforçando que cada criança aprende no seu ritmo.

## Turminha, Família e Guias

`/turmas` apresenta a Minha Turminha com visão da criança, professor, missões da turma e painel para professores criarem turmas, listarem alunos e acompanharem progresso.

`/responsaveis` apresenta a Minha Família com responsáveis vinculados, crianças vinculadas, status do vínculo, acompanhamento de progresso e alertas de segurança.

`/professores` apresenta Meus Guias com lista de professores, área/matéria, turmas vinculadas e perfil resumido.

## Design e componentes

Componentes reutilizáveis ficam em:

- `src/components/layout`: `Header`, `Footer`, `Sidebar` e `AppShell`.
- `src/components/ui`: `Button`, `Input`, `Card`, `Badge`, `Progress`, `Avatar`, `Modal`, `Mascot`, `Sticker` e `EmptyState`.
- `src/components/cards`: `AdventureCard`, `MissionCard`, `ChallengeCard`, `AchievementCard`, `RankingCard`, `ClassCard` e `SafetyTipCard`.

O visual usa cards arredondados, sombras suaves, cores alegres, botões grandes, ícones amigáveis, figurinhas, animações com Tailwind e layout responsivo para boa leitura no celular.

## Dados de demonstração

Dados de demonstração ficam em `src/data`:

- `mockUsers.ts`
- `mockAdventures.ts`
- `mockMissions.ts`
- `mockChallenges.ts`
- `mockRanking.ts`
- `mockClasses.ts`
- `mockChat.ts`
- `mockAchievements.ts`
- `mockSafetyTips.ts`

Esses arquivos servem apenas como referência/demo. As telas privadas principais
devem mostrar dados reais do Supabase ou estado vazio amigável quando ainda não
houver registros.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- OpenAI API em rota server-side
- Deploy na Vercel

## Primeiros passos

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Variaveis de ambiente local

Crie um arquivo `.env.local` seguindo o `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

Para rodar localmente com autenticação e Tutor Digital, preencha:

- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon/publishable key do Supabase.
- `NEXT_PUBLIC_SITE_URL`: `http://localhost:3000` no ambiente local.
- `OPENAI_API_KEY`: chave da OpenAI usada apenas no backend.

`SUPABASE_SERVICE_ROLE_KEY` não é necessária para o app atual. Se for usada futuramente, mantenha apenas em ambiente server-side.

Regras importantes:

- `OPENAI_API_KEY` nunca deve ser exposta no frontend.
- Nao crie `NEXT_PUBLIC_OPENAI_API_KEY`.
- A OpenAI e usada somente na rota `src/app/api/chat/route.ts`.
- `SUPABASE_SERVICE_ROLE_KEY` deve ficar somente em ambiente server-side.
- `NEXT_PUBLIC_SITE_URL` deve apontar para `http://localhost:3000` no ambiente local e para a URL da Vercel no deploy.

## Supabase

1. Crie um projeto no Supabase.
2. Copie `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Rode o SQL de `supabase/schema.sql` no SQL Editor do Supabase.
4. Configure Auth com e-mail/senha e Google OAuth.
5. Enquanto o Supabase não estiver configurado, `/login` e `/cadastro` usam mock visual.

### Banco de dados

O arquivo `supabase/schema.sql` precisa ser executado manualmente:

1. Abra o Supabase Dashboard.
2. Entre no projeto.
3. Acesse `SQL Editor`.
4. Crie uma nova query.
5. Cole todo o conteúdo de `supabase/schema.sql`.
6. Execute a query.

Esse passo cria tabelas, índices, trigger de perfil inicial, grants, policies de RLS, função de pontuação dos desafios e configuração do bucket de avatar para o MVP.

### Pontuação dos desafios

A pontuação real dos desafios usa:

- `public.challenge_answers`: registra tentativas por usuário.
- `public.profiles.points`: total de pontos do perfil.
- `public.ranking.stars`: estrelinhas do Hall das Estrelinhas.
- `public.user_progress.stars`: progresso por missão.
- `public.submit_challenge_answer(...)`: função transacional chamada por `POST /api/challenges/answer`.

O schema cria o índice parcial `challenge_answers_one_correct_per_user_challenge_idx`, que impede que o mesmo `user_id` pontue duas vezes o mesmo `challenge_id` correto.

Depois de atualizar o projeto em produção, rode novamente `supabase/schema.sql` no SQL Editor para garantir que a função e o índice estejam aplicados.

### Avatar com Supabase Storage

O upload de avatar usa o bucket `avatars` no Supabase Storage.

O arquivo `supabase/schema.sql` inclui SQL idempotente para:

- Criar ou atualizar o bucket `avatars`.
- Marcar o bucket como público.
- Limitar uploads a 2MB.
- Permitir `image/png`, `image/jpeg` e `image/webp`.
- Criar policies para que cada usuário autenticado envie, leia, atualize e remova apenas arquivos dentro da própria pasta `{user_id}/`.

Na tela `/perfil`, o upload salva a imagem no caminho:

```text
{user_id}/avatar.ext
```

Depois do upload, `profiles.avatar_url` recebe a URL pública do arquivo. O avatar aparece no perfil, sidebar e dashboard. Se não houver avatar, a interface mostra as iniciais do nome.

Checklist manual no Supabase:

1. Rode `supabase/schema.sql` atualizado no SQL Editor.
2. Confirme em `Storage` que o bucket `avatars` existe.
3. Confirme que o bucket permite os formatos `png`, `jpg/jpeg` e `webp`.
4. Faça login no app.
5. Acesse `/perfil`.
6. Envie uma imagem de até 2MB.
7. Verifique se o avatar aparece em `/perfil`, sidebar e `/dashboard`.

### Google Auth

No Supabase Dashboard:

1. Acesse `Authentication > Providers`.
2. Ative o provider Google.
3. Preencha Client ID e Client Secret do Google.
4. Confirme que e-mail/senha também está habilitado se quiser login tradicional.

Em `Authentication > URL Configuration`, cadastre as Redirect URLs:

```text
http://localhost:3000/auth/callback
https://sua-url-final-da-vercel.vercel.app/auth/callback
```

Se usar domínio próprio, adicione também:

```text
https://seu-dominio.com/auth/callback
```

Arquivos principais:

- `src/lib/supabase/client.ts`: client de browser com `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `src/lib/supabase/server.ts`: client server-side com cookies via `@supabase/ssr`.
- `middleware.ts`: protege rotas privadas quando Supabase URL e Anon Key estiverem configuradas.
- `src/app/auth/callback/route.ts`: troca o code OAuth por sessão Supabase e redireciona para `/dashboard`.
- `src/app/auth/logout/route.ts`: encerra a sessão e redireciona para `/login`.
- `supabase/schema.sql`: tabelas de perfis, crianças, responsáveis, professores, turmas, aventuras, missões, desafios, progresso, ranking e chat futuro.

Rotas públicas:

- `/`
- `/login`
- `/cadastro`
- `/privacidade`
- `/termos`

Rotas privadas:

- `/dashboard`
- `/trilhas`
- `/aulas`
- `/exercicios`
- `/ranking`
- `/chat`
- `/turmas`
- `/perfil`
- `/responsaveis`
- `/professores`

Segurança Supabase:

- RLS deve ficar habilitado nas tabelas do schema `public`.
- As políticas em `supabase/schema.sql` são ponto de partida para o MVP e devem ser revisadas antes de produção.
- `SUPABASE_SERVICE_ROLE_KEY` não é usada no frontend e não deve ser enviada para componentes client-side.

## Kids Digital

O Tutor Digital fica em `POST /api/chat`. O frontend envia mensagens para essa rota, e a rota chama a OpenAI no servidor usando `OPENAI_API_KEY`.

Regras do Tutor Digital:

- Responder em português do Brasil com linguagem simples, curta e educativa.
- Não pedir nome completo, endereço, escola, telefone, localização, senha ou fotos.
- Orientar a criança a procurar responsável ou professor em situações de medo, perigo, contato com estranho ou insegurança.
- Estimular raciocínio e não incentivar dependência da IA.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Configure as variaveis de ambiente no projeto.
3. Garanta que `NEXT_PUBLIC_SITE_URL` aponte para a URL final do deploy.
4. Cadastre a URL final em `Authentication > URL Configuration` no Supabase.
5. Use o comando de build padrao:

Variaveis obrigatórias na Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://sua-url-final-da-vercel.vercel.app
OPENAI_API_KEY=
```

Não cadastre chaves reais no código. Use o painel da Vercel para segredos.

```bash
npm run build
```

## Scripts

- `npm run dev`: inicia o ambiente local.
- `npm run build`: valida o build de producao.
- `npm run start`: executa a build gerada.
- `npm run lint`: roda ESLint.
