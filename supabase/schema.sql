-- Supabase schema for the Berthe & Jean school management platform.
-- Run this file once in the Supabase SQL editor for the target project.
-- The demo data is intentionally stored in supabase/seed-demo.sql.

create extension if not exists pgcrypto;

do $$
begin
  create type public.school_role as enum (
    'admin',
    'direction',
    'teacher',
    'student',
    'parent',
    'accountant'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.profile_status as enum (
    'active',
    'inactive',
    'pending',
    'suspended'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.student_status as enum (
    'active',
    'inactive',
    'pending',
    'suspended'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.attendance_status as enum (
    'present',
    'absent',
    'late',
    'excused'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.payment_status as enum (
    'paid',
    'partial',
    'unpaid'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.announcement_priority as enum (
    'normal',
    'important',
    'urgent'
  );
exception
  when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  role public.school_role not null default 'student',
  avatar_url text,
  status public.profile_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.parents (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  phone text,
  address text,
  profession text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  phone text,
  subject_speciality text,
  photo_url text,
  status public.profile_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text not null,
  academic_year text not null,
  main_teacher_id uuid references public.teachers(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, academic_year)
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  matricule text not null unique,
  first_name text not null,
  last_name text not null,
  gender text,
  date_of_birth date,
  place_of_birth text,
  address text,
  phone text,
  email text,
  class_id uuid references public.classes(id) on delete set null,
  parent_id uuid references public.parents(id) on delete set null,
  photo_url text,
  status public.student_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  coefficient numeric(5,2) not null default 1,
  class_id uuid not null references public.classes(id) on delete cascade,
  teacher_id uuid references public.teachers(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, class_id)
);

create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  teacher_id uuid references public.teachers(id) on delete set null,
  class_id uuid references public.classes(id) on delete set null,
  grade_value numeric(5,2) not null check (grade_value >= 0),
  max_grade numeric(5,2) not null default 20 check (max_grade > 0),
  coefficient numeric(5,2) not null default 1,
  term text not null,
  academic_year text not null,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,
  date date not null,
  status public.attendance_status not null default 'present',
  reason text,
  recorded_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (student_id, date)
);

create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  teacher_id uuid references public.teachers(id) on delete set null,
  day_of_week smallint not null check (day_of_week between 1 and 6),
  start_time time not null,
  end_time time not null,
  room text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_time < end_time)
);

create table if not exists public.homework (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  class_id uuid not null references public.classes(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  teacher_id uuid references public.teachers(id) on delete set null,
  due_date date,
  file_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  target_role text not null default 'all'
    check (target_role in ('all', 'admin', 'direction', 'teacher', 'student', 'parent', 'accountant')),
  target_class_id uuid references public.classes(id) on delete set null,
  priority public.announcement_priority not null default 'normal',
  created_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.school_fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  amount_due numeric(12,2) not null default 0 check (amount_due >= 0),
  amount_paid numeric(12,2) not null default 0 check (amount_paid >= 0),
  remaining_amount numeric(12,2) generated always as (greatest(amount_due - amount_paid, 0)) stored,
  payment_status public.payment_status not null default 'unpaid',
  due_date date,
  academic_year text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  payment_method text not null,
  payment_date date not null default current_date,
  receipt_number text not null unique,
  created_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,
  file_type text,
  student_id uuid references public.students(id) on delete cascade,
  uploaded_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.academic_years (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  start_date date not null,
  end_date date not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  check (start_date < end_date)
);

create index if not exists students_class_id_idx on public.students(class_id);
create index if not exists students_parent_id_idx on public.students(parent_id);
create index if not exists subjects_class_id_idx on public.subjects(class_id);
create index if not exists grades_student_id_idx on public.grades(student_id);
create index if not exists grades_class_id_idx on public.grades(class_id);
create index if not exists attendance_date_idx on public.attendance(date);
create index if not exists attendance_class_id_idx on public.attendance(class_id);
create index if not exists schedules_class_day_idx on public.schedules(class_id, day_of_week);
create index if not exists homework_class_id_idx on public.homework(class_id);
create index if not exists fees_student_id_idx on public.school_fees(student_id);
create index if not exists payments_student_id_idx on public.payments(student_id);
create index if not exists documents_student_id_idx on public.documents(student_id);

drop trigger if exists users_profiles_set_updated_at on public.users_profiles;
create trigger users_profiles_set_updated_at
before update on public.users_profiles
for each row execute function public.set_updated_at();

drop trigger if exists parents_set_updated_at on public.parents;
create trigger parents_set_updated_at
before update on public.parents
for each row execute function public.set_updated_at();

drop trigger if exists teachers_set_updated_at on public.teachers;
create trigger teachers_set_updated_at
before update on public.teachers
for each row execute function public.set_updated_at();

drop trigger if exists classes_set_updated_at on public.classes;
create trigger classes_set_updated_at
before update on public.classes
for each row execute function public.set_updated_at();

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists subjects_set_updated_at on public.subjects;
create trigger subjects_set_updated_at
before update on public.subjects
for each row execute function public.set_updated_at();

drop trigger if exists grades_set_updated_at on public.grades;
create trigger grades_set_updated_at
before update on public.grades
for each row execute function public.set_updated_at();

drop trigger if exists schedules_set_updated_at on public.schedules;
create trigger schedules_set_updated_at
before update on public.schedules
for each row execute function public.set_updated_at();

drop trigger if exists homework_set_updated_at on public.homework;
create trigger homework_set_updated_at
before update on public.homework
for each row execute function public.set_updated_at();

drop trigger if exists announcements_set_updated_at on public.announcements;
create trigger announcements_set_updated_at
before update on public.announcements
for each row execute function public.set_updated_at();

drop trigger if exists school_fees_set_updated_at on public.school_fees;
create trigger school_fees_set_updated_at
before update on public.school_fees
for each row execute function public.set_updated_at();

create or replace function public.current_profile_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select id
  from public.users_profiles
  where user_id = auth.uid()
    and status = 'active'
  limit 1;
$$;

create or replace function public.current_user_role()
returns public.school_role
language sql
security definer
set search_path = public
stable
as $$
  select role
  from public.users_profiles
  where user_id = auth.uid()
    and status = 'active'
  limit 1;
$$;

create or replace function public.is_school_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() in ('admin', 'direction', 'teacher', 'accountant');
$$;

create or replace function public.is_school_manager()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() in ('admin', 'direction');
$$;

create or replace function public.is_finance_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() in ('admin', 'direction', 'accountant');
$$;

create or replace function public.handle_new_school_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users_profiles (user_id, full_name, email, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    'student',
    'pending'
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_school_profile on auth.users;
create trigger on_auth_user_created_school_profile
after insert on auth.users
for each row execute function public.handle_new_school_user();

alter table public.users_profiles enable row level security;
alter table public.parents enable row level security;
alter table public.teachers enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.subjects enable row level security;
alter table public.grades enable row level security;
alter table public.attendance enable row level security;
alter table public.schedules enable row level security;
alter table public.homework enable row level security;
alter table public.announcements enable row level security;
alter table public.school_fees enable row level security;
alter table public.payments enable row level security;
alter table public.documents enable row level security;
alter table public.academic_years enable row level security;

drop policy if exists "profiles read own or managers" on public.users_profiles;
create policy "profiles read own or managers"
on public.users_profiles
for select
to authenticated
using (user_id = auth.uid() or public.is_school_manager() or public.is_finance_user());

drop policy if exists "profiles admin manage" on public.users_profiles;
create policy "profiles admin manage"
on public.users_profiles
for all
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

drop policy if exists "parents staff read" on public.parents;
create policy "parents staff read"
on public.parents
for select
to authenticated
using (public.is_school_staff());

drop policy if exists "parents managers manage" on public.parents;
create policy "parents managers manage"
on public.parents
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "teachers staff read" on public.teachers;
create policy "teachers staff read"
on public.teachers
for select
to authenticated
using (public.is_school_staff());

drop policy if exists "teachers managers manage" on public.teachers;
create policy "teachers managers manage"
on public.teachers
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "classes authenticated read" on public.classes;
create policy "classes authenticated read"
on public.classes
for select
to authenticated
using (true);

drop policy if exists "classes managers manage" on public.classes;
create policy "classes managers manage"
on public.classes
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "students staff read" on public.students;
create policy "students staff read"
on public.students
for select
to authenticated
using (public.is_school_staff());

drop policy if exists "students managers manage" on public.students;
create policy "students managers manage"
on public.students
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "subjects authenticated read" on public.subjects;
create policy "subjects authenticated read"
on public.subjects
for select
to authenticated
using (true);

drop policy if exists "subjects managers manage" on public.subjects;
create policy "subjects managers manage"
on public.subjects
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "grades staff read" on public.grades;
create policy "grades staff read"
on public.grades
for select
to authenticated
using (public.is_school_staff());

drop policy if exists "grades staff manage" on public.grades;
create policy "grades staff manage"
on public.grades
for all
to authenticated
using (public.current_user_role() in ('admin', 'direction', 'teacher'))
with check (public.current_user_role() in ('admin', 'direction', 'teacher'));

drop policy if exists "attendance staff read" on public.attendance;
create policy "attendance staff read"
on public.attendance
for select
to authenticated
using (public.is_school_staff());

drop policy if exists "attendance staff manage" on public.attendance;
create policy "attendance staff manage"
on public.attendance
for all
to authenticated
using (public.current_user_role() in ('admin', 'direction', 'teacher'))
with check (public.current_user_role() in ('admin', 'direction', 'teacher'));

drop policy if exists "schedules authenticated read" on public.schedules;
create policy "schedules authenticated read"
on public.schedules
for select
to authenticated
using (true);

drop policy if exists "schedules managers manage" on public.schedules;
create policy "schedules managers manage"
on public.schedules
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "homework authenticated read" on public.homework;
create policy "homework authenticated read"
on public.homework
for select
to authenticated
using (true);

drop policy if exists "homework staff manage" on public.homework;
create policy "homework staff manage"
on public.homework
for all
to authenticated
using (public.current_user_role() in ('admin', 'direction', 'teacher'))
with check (public.current_user_role() in ('admin', 'direction', 'teacher'));

drop policy if exists "announcements targeted read" on public.announcements;
create policy "announcements targeted read"
on public.announcements
for select
to authenticated
using (
  target_role = 'all'
  or target_role = public.current_user_role()::text
  or public.is_school_manager()
);

drop policy if exists "announcements staff manage" on public.announcements;
create policy "announcements staff manage"
on public.announcements
for all
to authenticated
using (public.current_user_role() in ('admin', 'direction', 'teacher'))
with check (public.current_user_role() in ('admin', 'direction', 'teacher'));

drop policy if exists "fees finance read" on public.school_fees;
create policy "fees finance read"
on public.school_fees
for select
to authenticated
using (public.is_finance_user());

drop policy if exists "fees finance manage" on public.school_fees;
create policy "fees finance manage"
on public.school_fees
for all
to authenticated
using (public.is_finance_user())
with check (public.is_finance_user());

drop policy if exists "payments finance read" on public.payments;
create policy "payments finance read"
on public.payments
for select
to authenticated
using (public.is_finance_user());

drop policy if exists "payments finance manage" on public.payments;
create policy "payments finance manage"
on public.payments
for all
to authenticated
using (public.is_finance_user())
with check (public.is_finance_user());

drop policy if exists "documents staff read" on public.documents;
create policy "documents staff read"
on public.documents
for select
to authenticated
using (public.is_school_staff());

drop policy if exists "documents staff manage" on public.documents;
create policy "documents staff manage"
on public.documents
for all
to authenticated
using (public.is_school_staff())
with check (public.is_school_staff());

drop policy if exists "academic years authenticated read" on public.academic_years;
create policy "academic years authenticated read"
on public.academic_years
for select
to authenticated
using (true);

drop policy if exists "academic years managers manage" on public.academic_years;
create policy "academic years managers manage"
on public.academic_years
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

-- TODO: tighten parent/student policies once parent and student auth accounts
-- are linked to their records. The current baseline intentionally favors
-- staff-managed access until Phase 2 creates the linking screens.
