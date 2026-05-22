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

## Variaveis de ambiente

Crie um arquivo `.env.local` seguindo o `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

Regras importantes:

- `OPENAI_API_KEY` nunca deve ser exposta no frontend.
- Nao crie `NEXT_PUBLIC_OPENAI_API_KEY`.
- A OpenAI e usada somente na rota `src/app/api/chat/route.ts`.
- `SUPABASE_SERVICE_ROLE_KEY` deve ficar somente em ambiente server-side.

## Supabase

1. Crie um projeto no Supabase.
2. Copie `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Rode o SQL de `supabase/schema.sql` no SQL Editor do Supabase.
4. Configure Auth com e-mail/senha e Google OAuth.
5. Enquanto o Supabase não estiver configurado, `/login` e `/cadastro` usam mock visual.

## Kids Digital

O Kids Digital fica em `POST /api/chat`. O frontend envia mensagens para essa rota, e a rota chama a OpenAI no servidor usando `OPENAI_API_KEY`.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Configure as variaveis de ambiente no projeto.
3. Use o comando de build padrao:

```bash
npm run build
```

## Scripts

- `npm run dev`: inicia o ambiente local.
- `npm run build`: valida o build de producao.
- `npm run start`: executa a build gerada.
- `npm run lint`: roda ESLint.
