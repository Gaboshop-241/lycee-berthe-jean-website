-- Supabase schema for the Berthe & Jean school management platform.
-- Run this file once in the Supabase SQL editor for the target project.
-- The demo data is intentionally stored in supabase/seed-demo.sql.

create extension if not exists pgcrypto;

do $$
begin
  create type public.school_role as enum (
    'super_admin',
    'admin',
    'direction',
    'secretary',
    'teacher',
    'student',
    'parent',
    'accountant',
    'staff'
  );
exception
  when duplicate_object then null;
end $$;

alter type public.school_role add value if not exists 'super_admin';
alter type public.school_role add value if not exists 'secretary';
alter type public.school_role add value if not exists 'staff';

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

create table if not exists public.class_subjects (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  teacher_id uuid references public.teachers(id) on delete set null,
  coefficient numeric(5,2) not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (class_id, subject_id)
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
    check (
      target_role in (
        'all',
        'super_admin',
        'admin',
        'direction',
        'secretary',
        'teacher',
        'student',
        'parent',
        'accountant',
        'staff'
      )
    ),
  target_class_id uuid references public.classes(id) on delete set null,
  priority public.announcement_priority not null default 'normal',
  created_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.announcements
drop constraint if exists announcements_target_role_check;

alter table public.announcements
add constraint announcements_target_role_check
check (
  target_role in (
    'all',
    'super_admin',
    'admin',
    'direction',
    'secretary',
    'teacher',
    'student',
    'parent',
    'accountant',
    'staff'
  )
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

create table if not exists public.terms (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid references public.academic_years(id) on delete cascade,
  name text not null,
  start_date date not null,
  end_date date not null,
  order_index smallint not null default 1,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_date < end_date),
  unique (academic_year_id, name)
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  academic_year text not null,
  status public.student_status not null default 'active',
  enrolled_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, academic_year)
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  invoice_number text not null unique,
  amount_due numeric(12,2) not null default 0 check (amount_due >= 0),
  amount_paid numeric(12,2) not null default 0 check (amount_paid >= 0),
  payment_status public.payment_status not null default 'unpaid',
  due_date date,
  academic_year text not null,
  created_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  target_profile_id uuid references public.users_profiles(id) on delete cascade,
  target_role public.school_role,
  title text not null,
  content text not null,
  channel text not null default 'internal'
    check (channel in ('internal', 'email', 'sms', 'whatsapp')),
  status text not null default 'unread'
    check (status in ('unread', 'read', 'archived')),
  read_at timestamptz,
  created_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (target_profile_id is not null or target_role is not null)
);

create table if not exists public.report_exports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  report_type text not null,
  filters jsonb not null default '{}'::jsonb,
  format text not null default 'csv' check (format in ('pdf', 'xlsx', 'csv')),
  file_url text,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'ready', 'failed')),
  created_by uuid references public.users_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.users_profiles(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists students_class_id_idx on public.students(class_id);
create index if not exists students_parent_id_idx on public.students(parent_id);
create index if not exists subjects_class_id_idx on public.subjects(class_id);
create index if not exists class_subjects_class_id_idx on public.class_subjects(class_id);
create index if not exists class_subjects_subject_id_idx on public.class_subjects(subject_id);
create index if not exists grades_student_id_idx on public.grades(student_id);
create index if not exists grades_class_id_idx on public.grades(class_id);
create index if not exists attendance_date_idx on public.attendance(date);
create index if not exists attendance_class_id_idx on public.attendance(class_id);
create index if not exists schedules_class_day_idx on public.schedules(class_id, day_of_week);
create index if not exists homework_class_id_idx on public.homework(class_id);
create index if not exists fees_student_id_idx on public.school_fees(student_id);
create index if not exists payments_student_id_idx on public.payments(student_id);
create index if not exists documents_student_id_idx on public.documents(student_id);
create index if not exists terms_academic_year_id_idx on public.terms(academic_year_id);
create index if not exists enrollments_student_id_idx on public.enrollments(student_id);
create index if not exists enrollments_class_id_idx on public.enrollments(class_id);
create index if not exists invoices_student_id_idx on public.invoices(student_id);
create index if not exists notifications_target_profile_idx on public.notifications(target_profile_id);
create index if not exists notifications_target_role_idx on public.notifications(target_role);
create index if not exists report_exports_created_by_idx on public.report_exports(created_by);
create index if not exists audit_logs_table_record_idx on public.audit_logs(table_name, record_id);
create index if not exists audit_logs_actor_idx on public.audit_logs(actor_profile_id);

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

drop trigger if exists class_subjects_set_updated_at on public.class_subjects;
create trigger class_subjects_set_updated_at
before update on public.class_subjects
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

drop trigger if exists terms_set_updated_at on public.terms;
create trigger terms_set_updated_at
before update on public.terms
for each row execute function public.set_updated_at();

drop trigger if exists enrollments_set_updated_at on public.enrollments;
create trigger enrollments_set_updated_at
before update on public.enrollments
for each row execute function public.set_updated_at();

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at
before update on public.invoices
for each row execute function public.set_updated_at();

drop trigger if exists notifications_set_updated_at on public.notifications;
create trigger notifications_set_updated_at
before update on public.notifications
for each row execute function public.set_updated_at();

drop trigger if exists report_exports_set_updated_at on public.report_exports;
create trigger report_exports_set_updated_at
before update on public.report_exports
for each row execute function public.set_updated_at();

create or replace function public.write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  record_uuid uuid;
begin
  record_uuid := case
    when TG_OP = 'DELETE' then old.id
    else new.id
  end;

  insert into public.audit_logs (
    actor_profile_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data
  )
  values (
    public.current_profile_id(),
    lower(TG_OP),
    TG_TABLE_NAME,
    record_uuid,
    case when TG_OP in ('UPDATE', 'DELETE') then to_jsonb(old) else null end,
    case when TG_OP in ('INSERT', 'UPDATE') then to_jsonb(new) else null end
  );

  if TG_OP = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

drop trigger if exists students_audit_log on public.students;
create trigger students_audit_log
after insert or update or delete on public.students
for each row execute function public.write_audit_log();

drop trigger if exists enrollments_audit_log on public.enrollments;
create trigger enrollments_audit_log
after insert or update or delete on public.enrollments
for each row execute function public.write_audit_log();

drop trigger if exists grades_audit_log on public.grades;
create trigger grades_audit_log
after insert or update or delete on public.grades
for each row execute function public.write_audit_log();

drop trigger if exists attendance_audit_log on public.attendance;
create trigger attendance_audit_log
after insert or update or delete on public.attendance
for each row execute function public.write_audit_log();

drop trigger if exists school_fees_audit_log on public.school_fees;
create trigger school_fees_audit_log
after insert or update or delete on public.school_fees
for each row execute function public.write_audit_log();

drop trigger if exists payments_audit_log on public.payments;
create trigger payments_audit_log
after insert or update or delete on public.payments
for each row execute function public.write_audit_log();

drop trigger if exists announcements_audit_log on public.announcements;
create trigger announcements_audit_log
after insert or update or delete on public.announcements
for each row execute function public.write_audit_log();

drop trigger if exists documents_audit_log on public.documents;
create trigger documents_audit_log
after insert or update or delete on public.documents
for each row execute function public.write_audit_log();

drop trigger if exists invoices_audit_log on public.invoices;
create trigger invoices_audit_log
after insert or update or delete on public.invoices
for each row execute function public.write_audit_log();

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
  select public.current_user_role()::text in (
    'super_admin',
    'admin',
    'direction',
    'secretary',
    'teacher',
    'accountant',
    'staff'
  );
$$;

create or replace function public.is_school_manager()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role()::text in ('super_admin', 'admin', 'direction');
$$;

create or replace function public.is_finance_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'accountant');
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
alter table public.class_subjects enable row level security;
alter table public.grades enable row level security;
alter table public.attendance enable row level security;
alter table public.schedules enable row level security;
alter table public.homework enable row level security;
alter table public.announcements enable row level security;
alter table public.school_fees enable row level security;
alter table public.payments enable row level security;
alter table public.documents enable row level security;
alter table public.academic_years enable row level security;
alter table public.terms enable row level security;
alter table public.enrollments enable row level security;
alter table public.invoices enable row level security;
alter table public.notifications enable row level security;
alter table public.report_exports enable row level security;
alter table public.audit_logs enable row level security;

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
using (public.current_user_role()::text in ('super_admin', 'admin'))
with check (public.current_user_role()::text in ('super_admin', 'admin'));

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

drop policy if exists "class subjects authenticated read" on public.class_subjects;
create policy "class subjects authenticated read"
on public.class_subjects
for select
to authenticated
using (true);

drop policy if exists "class subjects managers manage" on public.class_subjects;
create policy "class subjects managers manage"
on public.class_subjects
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
using (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'))
with check (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'));

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
using (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'))
with check (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'));

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
using (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'))
with check (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'));

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
using (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'))
with check (public.current_user_role()::text in ('super_admin', 'admin', 'direction', 'teacher'));

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

drop policy if exists "terms authenticated read" on public.terms;
create policy "terms authenticated read"
on public.terms
for select
to authenticated
using (true);

drop policy if exists "terms managers manage" on public.terms;
create policy "terms managers manage"
on public.terms
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "enrollments staff read" on public.enrollments;
create policy "enrollments staff read"
on public.enrollments
for select
to authenticated
using (public.is_school_staff());

drop policy if exists "enrollments managers manage" on public.enrollments;
create policy "enrollments managers manage"
on public.enrollments
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "invoices finance read" on public.invoices;
create policy "invoices finance read"
on public.invoices
for select
to authenticated
using (public.is_finance_user());

drop policy if exists "invoices finance manage" on public.invoices;
create policy "invoices finance manage"
on public.invoices
for all
to authenticated
using (public.is_finance_user())
with check (public.is_finance_user());

drop policy if exists "notifications targeted read" on public.notifications;
create policy "notifications targeted read"
on public.notifications
for select
to authenticated
using (
  target_profile_id = public.current_profile_id()
  or target_role::text = public.current_user_role()::text
  or public.is_school_manager()
);

drop policy if exists "notifications managers manage" on public.notifications;
create policy "notifications managers manage"
on public.notifications
for all
to authenticated
using (public.is_school_manager())
with check (public.is_school_manager());

drop policy if exists "report exports read own or finance" on public.report_exports;
create policy "report exports read own or finance"
on public.report_exports
for select
to authenticated
using (
  created_by = public.current_profile_id()
  or public.is_school_manager()
  or public.is_finance_user()
);

drop policy if exists "report exports managers create" on public.report_exports;
create policy "report exports managers create"
on public.report_exports
for all
to authenticated
using (public.is_school_manager() or public.is_finance_user())
with check (public.is_school_manager() or public.is_finance_user());

drop policy if exists "audit logs managers read" on public.audit_logs;
create policy "audit logs managers read"
on public.audit_logs
for select
to authenticated
using (public.is_school_manager());

-- TODO: tighten parent/student policies once parent and student auth accounts
-- are linked to their records. The current baseline intentionally favors
-- staff-managed access until Phase 2 creates the linking screens.
