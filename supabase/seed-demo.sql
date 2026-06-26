-- Optional demo data for local/staging tests only.
-- Do not run this seed on production unless the administration explicitly wants demo records.

insert into public.academic_years (id, name, start_date, end_date, is_active)
values
  ('11111111-1111-4111-8111-111111111111', '2026-2027', '2026-09-01', '2027-07-31', true)
on conflict (name) do update
set is_active = excluded.is_active;

insert into public.teachers (id, full_name, email, phone, subject_speciality, status)
values
  ('22222222-2222-4222-8222-222222222201', 'Mme Akanda Sandrine', 'akanda.sandrine@example.com', '+24166000001', 'Français', 'active'),
  ('22222222-2222-4222-8222-222222222202', 'M. Ondo Patrice', 'ondo.patrice@example.com', '+24166000002', 'Mathématiques', 'active'),
  ('22222222-2222-4222-8222-222222222203', 'Mme Nguema Carine', 'nguema.carine@example.com', '+24166000003', 'Sciences physiques', 'active'),
  ('22222222-2222-4222-8222-222222222204', 'M. Mba Rodrigue', 'mba.rodrigue@example.com', '+24166000004', 'Histoire-Géographie', 'active'),
  ('22222222-2222-4222-8222-222222222205', 'Mme Essone Laura', 'essone.laura@example.com', '+24166000005', 'Anglais', 'active')
on conflict (email) do update
set full_name = excluded.full_name,
    phone = excluded.phone,
    subject_speciality = excluded.subject_speciality,
    status = excluded.status;

insert into public.parents (id, full_name, email, phone, address, profession)
values
  ('33333333-3333-4333-8333-333333333301', 'Mme MBOUMBA Diane', 'diane.mboumba@example.com', '+24166100001', 'Essassa, Gabon', 'Commerçante'),
  ('33333333-3333-4333-8333-333333333302', 'M. NDOUMOU Serge', 'serge.ndoumou@example.com', '+24166100002', 'Ntoum, Gabon', 'Technicien'),
  ('33333333-3333-4333-8333-333333333303', 'Mme EYI Carine', 'carine.eyi@example.com', '+24166100003', 'Libreville, Gabon', 'Infirmière'),
  ('33333333-3333-4333-8333-333333333304', 'M. NZE Bruno', 'bruno.nze@example.com', '+24166100004', 'Essassa, Gabon', 'Entrepreneur'),
  ('33333333-3333-4333-8333-333333333305', 'Mme OBIANG Mireille', 'mireille.obiang@example.com', '+24166100005', 'Owendo, Gabon', 'Cadre administrative')
on conflict (email) do update
set full_name = excluded.full_name,
    phone = excluded.phone,
    address = excluded.address,
    profession = excluded.profession;

insert into public.classes (id, name, level, academic_year, main_teacher_id)
values
  ('44444444-4444-4444-8444-444444444401', '6e A', 'Collège', '2026-2027', '22222222-2222-4222-8222-222222222201'),
  ('44444444-4444-4444-8444-444444444402', '3e B', 'Collège', '2026-2027', '22222222-2222-4222-8222-222222222202'),
  ('44444444-4444-4444-8444-444444444403', 'Terminale D', 'Lycée', '2026-2027', '22222222-2222-4222-8222-222222222203')
on conflict (name, academic_year) do update
set level = excluded.level,
    main_teacher_id = excluded.main_teacher_id;

insert into public.students (
  id,
  matricule,
  first_name,
  last_name,
  gender,
  date_of_birth,
  place_of_birth,
  address,
  phone,
  email,
  class_id,
  parent_id,
  status
)
values
  ('55555555-5555-4555-8555-555555555501', 'BJ-26-001', 'Inès', 'MBOUMBA', 'F', '2010-03-04', 'Libreville', 'Essassa', null, 'ines.mboumba@example.com', '44444444-4444-4444-8444-444444444403', '33333333-3333-4333-8333-333333333301', 'active'),
  ('55555555-5555-4555-8555-555555555502', 'BJ-26-002', 'Lucas', 'NDOUMOU', 'M', '2012-07-12', 'Ntoum', 'Ntoum', null, 'lucas.ndoumou@example.com', '44444444-4444-4444-8444-444444444402', '33333333-3333-4333-8333-333333333302', 'active'),
  ('55555555-5555-4555-8555-555555555503', 'BJ-26-003', 'Rose', 'EYI', 'F', '2008-10-18', 'Libreville', 'Libreville', null, 'rose.eyi@example.com', '44444444-4444-4444-8444-444444444403', '33333333-3333-4333-8333-333333333303', 'pending'),
  ('55555555-5555-4555-8555-555555555504', 'BJ-26-004', 'Kevin', 'NZE', 'M', '2013-01-22', 'Essassa', 'Essassa', null, 'kevin.nze@example.com', '44444444-4444-4444-8444-444444444402', '33333333-3333-4333-8333-333333333304', 'active'),
  ('55555555-5555-4555-8555-555555555505', 'BJ-26-005', 'Sarah', 'OBIANG', 'F', '2014-05-09', 'Owendo', 'Owendo', null, 'sarah.obiang@example.com', '44444444-4444-4444-8444-444444444401', '33333333-3333-4333-8333-333333333305', 'active'),
  ('55555555-5555-4555-8555-555555555506', 'BJ-26-006', 'Marc', 'MBOUMBA', 'M', '2015-02-15', 'Libreville', 'Essassa', null, 'marc.mboumba@example.com', '44444444-4444-4444-8444-444444444401', '33333333-3333-4333-8333-333333333301', 'active'),
  ('55555555-5555-4555-8555-555555555507', 'BJ-26-007', 'Audrey', 'NDOUMOU', 'F', '2011-12-01', 'Ntoum', 'Ntoum', null, 'audrey.ndoumou@example.com', '44444444-4444-4444-8444-444444444402', '33333333-3333-4333-8333-333333333302', 'active'),
  ('55555555-5555-4555-8555-555555555508', 'BJ-26-008', 'Daniel', 'EYI', 'M', '2016-04-06', 'Libreville', 'Libreville', null, 'daniel.eyi@example.com', '44444444-4444-4444-8444-444444444401', '33333333-3333-4333-8333-333333333303', 'active'),
  ('55555555-5555-4555-8555-555555555509', 'BJ-26-009', 'Grâce', 'NZE', 'F', '2009-09-28', 'Essassa', 'Essassa', null, 'grace.nze@example.com', '44444444-4444-4444-8444-444444444403', '33333333-3333-4333-8333-333333333304', 'active'),
  ('55555555-5555-4555-8555-555555555510', 'BJ-26-010', 'Junior', 'OBIANG', 'M', '2013-11-11', 'Owendo', 'Owendo', null, 'junior.obiang@example.com', '44444444-4444-4444-8444-444444444402', '33333333-3333-4333-8333-333333333305', 'active')
on conflict (matricule) do update
set first_name = excluded.first_name,
    last_name = excluded.last_name,
    class_id = excluded.class_id,
    parent_id = excluded.parent_id,
    status = excluded.status;

insert into public.subjects (id, name, coefficient, class_id, teacher_id)
values
  ('66666666-6666-4666-8666-666666666601', 'Français', 3, '44444444-4444-4444-8444-444444444401', '22222222-2222-4222-8222-222222222201'),
  ('66666666-6666-4666-8666-666666666602', 'Mathématiques', 4, '44444444-4444-4444-8444-444444444402', '22222222-2222-4222-8222-222222222202'),
  ('66666666-6666-4666-8666-666666666603', 'Sciences physiques', 4, '44444444-4444-4444-8444-444444444403', '22222222-2222-4222-8222-222222222203'),
  ('66666666-6666-4666-8666-666666666604', 'Histoire-Géographie', 2, '44444444-4444-4444-8444-444444444402', '22222222-2222-4222-8222-222222222204'),
  ('66666666-6666-4666-8666-666666666605', 'Anglais', 2, '44444444-4444-4444-8444-444444444403', '22222222-2222-4222-8222-222222222205')
on conflict (name, class_id) do update
set coefficient = excluded.coefficient,
    teacher_id = excluded.teacher_id;

insert into public.grades (id, student_id, subject_id, teacher_id, class_id, grade_value, max_grade, coefficient, term, academic_year, comment)
values
  ('88888888-8888-4888-8888-888888888801', '55555555-5555-4555-8555-555555555501', '66666666-6666-4666-8666-666666666603', '22222222-2222-4222-8222-222222222203', '44444444-4444-4444-8444-444444444403', 15.5, 20, 4, 'Trimestre 1', '2026-2027', 'Bon travail, à consolider.'),
  ('88888888-8888-4888-8888-888888888802', '55555555-5555-4555-8555-555555555502', '66666666-6666-4666-8666-666666666602', '22222222-2222-4222-8222-222222222202', '44444444-4444-4444-8444-444444444402', 13.75, 20, 4, 'Trimestre 1', '2026-2027', 'Progression encourageante.'),
  ('88888888-8888-4888-8888-888888888803', '55555555-5555-4555-8555-555555555505', '66666666-6666-4666-8666-666666666601', '22222222-2222-4222-8222-222222222201', '44444444-4444-4444-8444-444444444401', 16.25, 20, 3, 'Trimestre 1', '2026-2027', 'Très bonne participation.')
on conflict (id) do update
set grade_value = excluded.grade_value,
    comment = excluded.comment;

insert into public.attendance (student_id, class_id, date, status, reason)
values
  ('55555555-5555-4555-8555-555555555501', '44444444-4444-4444-8444-444444444403', current_date, 'present', null),
  ('55555555-5555-4555-8555-555555555502', '44444444-4444-4444-8444-444444444402', current_date, 'late', 'Transport'),
  ('55555555-5555-4555-8555-555555555503', '44444444-4444-4444-8444-444444444403', current_date, 'excused', 'Certificat médical')
on conflict (student_id, date) do update
set status = excluded.status,
    reason = excluded.reason;

insert into public.schedules (id, class_id, subject_id, teacher_id, day_of_week, start_time, end_time, room)
values
  ('99999999-9999-4999-8999-999999999901', '44444444-4444-4444-8444-444444444401', '66666666-6666-4666-8666-666666666601', '22222222-2222-4222-8222-222222222201', 1, '08:00', '10:00', 'Salle 6A'),
  ('99999999-9999-4999-8999-999999999902', '44444444-4444-4444-8444-444444444402', '66666666-6666-4666-8666-666666666602', '22222222-2222-4222-8222-222222222202', 2, '10:15', '12:15', 'Salle 3B'),
  ('99999999-9999-4999-8999-999999999903', '44444444-4444-4444-8444-444444444403', '66666666-6666-4666-8666-666666666603', '22222222-2222-4222-8222-222222222203', 3, '14:00', '16:00', 'Laboratoire')
on conflict (id) do update
set day_of_week = excluded.day_of_week,
    start_time = excluded.start_time,
    end_time = excluded.end_time,
    room = excluded.room;

insert into public.homework (id, title, description, class_id, subject_id, teacher_id, due_date)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1', 'Exercices de grammaire', 'Préparer les exercices 4 à 8 du manuel.', '44444444-4444-4444-8444-444444444401', '66666666-6666-4666-8666-666666666601', '22222222-2222-4222-8222-222222222201', current_date + 7),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2', 'Devoir de mathématiques', 'Réviser les équations du premier degré.', '44444444-4444-4444-8444-444444444402', '66666666-6666-4666-8666-666666666602', '22222222-2222-4222-8222-222222222202', current_date + 5)
on conflict (id) do update
set title = excluded.title,
    description = excluded.description,
    due_date = excluded.due_date;

insert into public.announcements (id, title, content, target_role, priority)
values
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1', 'Réunion pédagogique', 'Réunion de coordination des enseignants vendredi à 14h00.', 'teacher', 'important'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2', 'Rappel admissions', 'Les familles peuvent compléter les dossiers d''admission auprès de l''administration.', 'parent', 'normal'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3', 'Contrôle de présence', 'La vie scolaire poursuit le contrôle quotidien des présences.', 'all', 'urgent')
on conflict (id) do update
set title = excluded.title,
    content = excluded.content,
    target_role = excluded.target_role,
    priority = excluded.priority;

insert into public.school_fees (id, student_id, amount_due, amount_paid, payment_status, due_date, academic_year)
values
  ('77777777-7777-4777-8777-777777777701', '55555555-5555-4555-8555-555555555501', 650000, 350000, 'partial', current_date + 30, '2026-2027'),
  ('77777777-7777-4777-8777-777777777702', '55555555-5555-4555-8555-555555555502', 500000, 500000, 'paid', current_date + 30, '2026-2027'),
  ('77777777-7777-4777-8777-777777777703', '55555555-5555-4555-8555-555555555505', 450000, 0, 'unpaid', current_date + 30, '2026-2027')
on conflict (id) do update
set amount_due = excluded.amount_due,
    amount_paid = excluded.amount_paid,
    payment_status = excluded.payment_status,
    due_date = excluded.due_date;

insert into public.payments (student_id, amount, payment_method, payment_date, receipt_number)
values
  ('55555555-5555-4555-8555-555555555501', 350000, 'Espèces', current_date, 'BJ-2026-0001'),
  ('55555555-5555-4555-8555-555555555502', 500000, 'Virement', current_date, 'BJ-2026-0002')
on conflict (receipt_number) do update
set amount = excluded.amount,
    payment_method = excluded.payment_method,
    payment_date = excluded.payment_date;
