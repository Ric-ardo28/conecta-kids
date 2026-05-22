-- Conecta Kids - Supabase schema
-- Rode este arquivo no SQL Editor do Supabase para preparar Auth + Postgres.
-- Importante:
-- 1. A chave service_role nunca deve ser usada no frontend.
-- 2. Todas as tabelas em public ficam com RLS habilitado.
-- 3. As políticas abaixo são um ponto de partida seguro para MVP.
-- 4. Antes de produção, revise as políticas com o modelo real de vínculos,
--    permissões escolares e consentimento dos responsáveis.

create extension if not exists "pgcrypto";

create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'crianca'
    check (role in ('crianca', 'responsavel', 'professor')),
  points integer not null default 0 check (points >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  nickname text not null,
  grade_label text,
  created_at timestamptz not null default now(),
  unique (profile_id)
);

create table if not exists public.responsible_children (
  id uuid primary key default gen_random_uuid(),
  responsible_id uuid not null references public.profiles(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'blocked')),
  created_at timestamptz not null default now(),
  unique (responsible_id, child_id)
);

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  area text not null,
  bio text,
  created_at timestamptz not null default now(),
  unique (profile_id)
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.class_students (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  status text not null default 'active'
    check (status in ('active', 'invited', 'removed')),
  created_at timestamptz not null default now(),
  unique (class_id, child_id)
);

create table if not exists public.digital_adventures (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  level text not null,
  icon text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  adventure_id uuid references public.digital_adventures(id) on delete set null,
  title text not null,
  description text not null,
  category text not null,
  duration_minutes integer not null default 5 check (duration_minutes > 0),
  difficulty text not null,
  content text,
  safety_tip text,
  created_at timestamptz not null default now()
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id) on delete set null,
  title text not null,
  question text not null,
  challenge_type text not null
    check (challenge_type in ('multiple_choice', 'true_false', 'complete_phrase', 'simple_match')),
  options jsonb not null default '[]'::jsonb,
  correct_answer text not null,
  explanation text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.challenge_answers (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  answer text not null,
  is_correct boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  adventure_id uuid references public.digital_adventures(id) on delete cascade,
  mission_id uuid references public.missions(id) on delete cascade,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'completed')),
  progress_percent integer not null default 0
    check (progress_percent between 0 and 100),
  stars integer not null default 0 check (stars >= 0),
  updated_at timestamptz not null default now(),
  unique (user_id, adventure_id, mission_id)
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ranking (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stars integer not null default 0 check (stars >= 0),
  level text not null default 'Aprendiz Digital',
  medals jsonb not null default '[]'::jsonb,
  progress_percent integer not null default 0
    check (progress_percent between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  safety_flag text,
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists children_profile_id_idx on public.children(profile_id);
create index if not exists responsible_children_responsible_id_idx on public.responsible_children(responsible_id);
create index if not exists responsible_children_child_id_idx on public.responsible_children(child_id);
create index if not exists teachers_profile_id_idx on public.teachers(profile_id);
create index if not exists classes_teacher_id_idx on public.classes(teacher_id);
create index if not exists class_students_class_id_idx on public.class_students(class_id);
create index if not exists class_students_child_id_idx on public.class_students(child_id);
create index if not exists missions_adventure_id_idx on public.missions(adventure_id);
create index if not exists challenges_mission_id_idx on public.challenges(mission_id);
create index if not exists challenge_answers_user_id_idx on public.challenge_answers(user_id);
create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists ranking_user_id_idx on public.ranking(user_id);
create index if not exists chat_messages_user_id_created_at_idx on public.chat_messages(user_id, created_at desc);

-- Trigger de perfil inicial para Supabase Auth.
-- raw_user_meta_data pode preencher cadastro inicial, mas autorização deve
-- continuar baseada em tabelas e RLS, não em metadados editáveis pelo usuário.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'crianca')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

grant usage on schema public to anon, authenticated;
grant select on public.digital_adventures, public.missions, public.challenges, public.achievements to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.children to authenticated;
grant select, insert, update on public.responsible_children to authenticated;
grant select, insert, update on public.teachers to authenticated;
grant select, insert, update, delete on public.classes to authenticated;
grant select, insert, update, delete on public.class_students to authenticated;
grant select, insert, update on public.challenge_answers to authenticated;
grant select, insert, update on public.user_progress to authenticated;
grant select, insert, update on public.ranking to authenticated;
grant select, insert on public.chat_messages to authenticated;

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.responsible_children enable row level security;
alter table public.teachers enable row level security;
alter table public.classes enable row level security;
alter table public.class_students enable row level security;
alter table public.digital_adventures enable row level security;
alter table public.missions enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_answers enable row level security;
alter table public.user_progress enable row level security;
alter table public.achievements enable row level security;
alter table public.ranking enable row level security;
alter table public.chat_messages enable row level security;

-- RLS: perfis
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- RLS: criança, responsável e vínculo familiar.
drop policy if exists "children_select_visible_to_family" on public.children;
create policy "children_select_visible_to_family"
  on public.children for select
  to authenticated
  using (
    profile_id = (select auth.uid())
    or exists (
      select 1
      from public.responsible_children rc
      where rc.child_id = children.id
        and rc.responsible_id = (select auth.uid())
        and rc.status = 'active'
    )
  );

drop policy if exists "children_insert_own" on public.children;
create policy "children_insert_own"
  on public.children for insert
  to authenticated
  with check (profile_id = (select auth.uid()));

drop policy if exists "children_update_own" on public.children;
create policy "children_update_own"
  on public.children for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

drop policy if exists "responsible_children_select_own" on public.responsible_children;
create policy "responsible_children_select_own"
  on public.responsible_children for select
  to authenticated
  using (
    responsible_id = (select auth.uid())
    or exists (
      select 1
      from public.children c
      where c.id = responsible_children.child_id
        and c.profile_id = (select auth.uid())
    )
  );

drop policy if exists "responsible_children_insert_responsible" on public.responsible_children;
create policy "responsible_children_insert_responsible"
  on public.responsible_children for insert
  to authenticated
  with check (responsible_id = (select auth.uid()));

drop policy if exists "responsible_children_update_responsible" on public.responsible_children;
create policy "responsible_children_update_responsible"
  on public.responsible_children for update
  to authenticated
  using (responsible_id = (select auth.uid()))
  with check (responsible_id = (select auth.uid()));

-- RLS: professores, turmas e alunos.
drop policy if exists "teachers_select_authenticated" on public.teachers;
create policy "teachers_select_authenticated"
  on public.teachers for select
  to authenticated
  using (true);

drop policy if exists "teachers_insert_own" on public.teachers;
create policy "teachers_insert_own"
  on public.teachers for insert
  to authenticated
  with check (profile_id = (select auth.uid()));

drop policy if exists "teachers_update_own" on public.teachers;
create policy "teachers_update_own"
  on public.teachers for update
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

drop policy if exists "classes_select_authenticated" on public.classes;
create policy "classes_select_authenticated"
  on public.classes for select
  to authenticated
  using (true);

drop policy if exists "classes_insert_teacher" on public.classes;
create policy "classes_insert_teacher"
  on public.classes for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.teachers t
      where t.id = classes.teacher_id
        and t.profile_id = (select auth.uid())
    )
  );

drop policy if exists "classes_update_teacher" on public.classes;
create policy "classes_update_teacher"
  on public.classes for update
  to authenticated
  using (
    exists (
      select 1
      from public.teachers t
      where t.id = classes.teacher_id
        and t.profile_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.teachers t
      where t.id = classes.teacher_id
        and t.profile_id = (select auth.uid())
    )
  );

drop policy if exists "class_students_select_related" on public.class_students;
create policy "class_students_select_related"
  on public.class_students for select
  to authenticated
  using (
    exists (
      select 1
      from public.children c
      where c.id = class_students.child_id
        and c.profile_id = (select auth.uid())
    )
    or exists (
      select 1
      from public.classes cl
      join public.teachers t on t.id = cl.teacher_id
      where cl.id = class_students.class_id
        and t.profile_id = (select auth.uid())
    )
  );

drop policy if exists "class_students_insert_teacher" on public.class_students;
create policy "class_students_insert_teacher"
  on public.class_students for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.classes cl
      join public.teachers t on t.id = cl.teacher_id
      where cl.id = class_students.class_id
        and t.profile_id = (select auth.uid())
    )
  );

drop policy if exists "class_students_update_teacher" on public.class_students;
create policy "class_students_update_teacher"
  on public.class_students for update
  to authenticated
  using (
    exists (
      select 1
      from public.classes cl
      join public.teachers t on t.id = cl.teacher_id
      where cl.id = class_students.class_id
        and t.profile_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.classes cl
      join public.teachers t on t.id = cl.teacher_id
      where cl.id = class_students.class_id
        and t.profile_id = (select auth.uid())
    )
  );

-- RLS: conteúdo educativo lido por usuários autenticados.
drop policy if exists "digital_adventures_select_authenticated" on public.digital_adventures;
create policy "digital_adventures_select_authenticated"
  on public.digital_adventures for select
  to authenticated
  using (true);

drop policy if exists "missions_select_authenticated" on public.missions;
create policy "missions_select_authenticated"
  on public.missions for select
  to authenticated
  using (true);

drop policy if exists "challenges_select_authenticated" on public.challenges;
create policy "challenges_select_authenticated"
  on public.challenges for select
  to authenticated
  using (true);

drop policy if exists "achievements_select_authenticated" on public.achievements;
create policy "achievements_select_authenticated"
  on public.achievements for select
  to authenticated
  using (true);

-- RLS: respostas, progresso, ranking e chat por usuário.
drop policy if exists "challenge_answers_select_own" on public.challenge_answers;
create policy "challenge_answers_select_own"
  on public.challenge_answers for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "challenge_answers_insert_own" on public.challenge_answers;
create policy "challenge_answers_insert_own"
  on public.challenge_answers for insert
  to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own"
  on public.user_progress for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "user_progress_upsert_own" on public.user_progress;
create policy "user_progress_upsert_own"
  on public.user_progress for all
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "ranking_select_authenticated" on public.ranking;
create policy "ranking_select_authenticated"
  on public.ranking for select
  to authenticated
  using (true);

drop policy if exists "ranking_update_own" on public.ranking;
create policy "ranking_update_own"
  on public.ranking for all
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "chat_messages_select_own" on public.chat_messages;
create policy "chat_messages_select_own"
  on public.chat_messages for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "chat_messages_insert_own" on public.chat_messages;
create policy "chat_messages_insert_own"
  on public.chat_messages for insert
  to authenticated
  with check (user_id = (select auth.uid()));

comment on table public.profiles is 'Perfil do usuário autenticado. RLS: cada usuário acessa o próprio perfil.';
comment on table public.children is 'Perfis infantis vinculados a auth.users. RLS: criança e responsáveis ativos podem visualizar.';
comment on table public.responsible_children is 'Vínculo entre responsáveis e crianças. RLS: responsável e criança vinculada enxergam o vínculo.';
comment on table public.teachers is 'Perfil resumido de professor/guia. RLS: leitura autenticada e edição do próprio guia.';
comment on table public.classes is 'Turmas criadas por professores. RLS: leitura autenticada e escrita pelo professor dono.';
comment on table public.class_students is 'Alunos vinculados a turmas. RLS: professor da turma e criança vinculada podem visualizar.';
comment on table public.digital_adventures is 'Aventuras Digitais. RLS: conteúdo educativo lido por usuários autenticados.';
comment on table public.missions is 'Missões educativas. RLS: conteúdo educativo lido por usuários autenticados.';
comment on table public.challenges is 'Desafios educativos. RLS: conteúdo educativo lido por usuários autenticados.';
comment on table public.challenge_answers is 'Respostas dos desafios. RLS: cada usuário acessa as próprias respostas.';
comment on table public.user_progress is 'Progresso por aventura/missão. RLS: cada usuário acessa o próprio progresso.';
comment on table public.achievements is 'Conquistas e medalhas. RLS: leitura autenticada.';
comment on table public.ranking is 'Hall das Estrelinhas positivo. RLS: leitura autenticada e escrita do próprio registro.';
comment on table public.chat_messages is 'Histórico futuro do Tutor Digital. RLS: cada usuário acessa as próprias mensagens.';
