# Conecta Kids

Plataforma de inclusao digital infantil para ensinar criancas, responsaveis e professores a usar tecnologia com seguranca, clareza e diversao.

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
4. Configure Auth com magic link ou outro provedor permitido para o projeto.

## Tutor digital

O tutor fica em `POST /api/chat`. O frontend envia mensagens para essa rota, e a rota chama a OpenAI no servidor usando `OPENAI_API_KEY`.

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
