create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'crianca' check (role in ('crianca', 'responsavel', 'professor')),
  points integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_achievements (
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

alter table public.profiles enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

create policy "Usuarios podem ler o proprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuarios podem atualizar o proprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Conquistas sao publicas para leitura"
  on public.achievements for select
  using (true);

create policy "Usuarios podem ler as proprias conquistas"
  on public.user_achievements for select
  using (auth.uid() = user_id);

insert into public.achievements (title, description, icon)
values
  ('Estrela da Pesquisa', 'Pesquisou na internet com palavras-chave seguras.', '⭐'),
  ('Guardiao da Senha', 'Criou uma senha forte e nao compartilhou com ninguem.', '🛡️'),
  ('Mestre dos Apps', 'Aprendeu a abrir e fechar aplicativos com cuidado.', '🎮'),
  ('Clique Consciente', 'Identificou um link suspeito antes de clicar.', '🏅')
on conflict do nothing;
