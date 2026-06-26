import type { ProfileStatus, SchoolRole } from "./types";

export type StudentStatus = "active" | "inactive" | "pending" | "suspended";

export type ParentRecord = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  profession: string | null;
  created_at: string;
  updated_at: string;
};

export type TeacherRecord = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  subject_speciality: string | null;
  photo_url: string | null;
  status: ProfileStatus;
  created_at: string;
  updated_at: string;
};

export type ClassRecord = {
  id: string;
  name: string;
  level: string;
  academic_year: string;
  main_teacher_id: string | null;
  teachers?: Pick<TeacherRecord, "id" | "full_name" | "email"> | Pick<TeacherRecord, "id" | "full_name" | "email">[] | null;
  created_at: string;
  updated_at: string;
};

export type SubjectRecord = {
  id: string;
  name: string;
  coefficient: number | string;
  class_id: string;
  teacher_id: string | null;
  created_at: string;
  updated_at: string;
  classes?: Pick<ClassRecord, "id" | "name" | "level" | "academic_year"> | null;
  teachers?: Pick<TeacherRecord, "id" | "full_name" | "email"> | null;
};

export type StudentRecord = {
  id: string;
  matricule: string;
  first_name: string;
  last_name: string;
  gender: string | null;
  date_of_birth: string | null;
  place_of_birth: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  class_id: string | null;
  parent_id: string | null;
  photo_url: string | null;
  status: StudentStatus;
  created_at: string;
  updated_at: string;
  classes?: Pick<ClassRecord, "id" | "name" | "level" | "academic_year"> | null;
  parents?: Pick<ParentRecord, "id" | "full_name" | "email" | "phone"> | null;
};

export type AnnouncementRecord = {
  id: string;
  title: string;
  target_role: string;
  priority: "normal" | "important" | "urgent";
  created_at: string;
};

export type PaymentRecord = {
  amount: number | string;
  payment_date: string;
};

export type SchoolDashboardData = {
  metrics: {
    label: string;
    value: string;
    detail: string;
    tone: "green" | "gold" | "blue" | "red";
  }[];
  latestStudents: StudentRecord[];
  latestParents: (ParentRecord & { studentCount: number })[];
  announcements: AnnouncementRecord[];
  classes: (ClassRecord & { studentCount: number })[];
};

export type StudentsPageFilters = {
  q?: string;
  classId?: string;
  status?: StudentStatus | "";
};

export type StudentsPageData = {
  students: StudentRecord[];
  classes: ClassRecord[];
  parents: ParentRecord[];
  total: number;
};

export type ParentsPageFilters = {
  q?: string;
};

export type ParentsPageData = {
  parents: (ParentRecord & { studentCount: number })[];
  total: number;
};

export type TeachersPageFilters = {
  q?: string;
  status?: ProfileStatus | "";
};

export type TeachersPageData = {
  teachers: (TeacherRecord & { subjectCount: number; mainClassCount: number })[];
  total: number;
};

export type ClassesPageFilters = {
  q?: string;
  academicYear?: string;
};

export type ClassesPageData = {
  classes: (ClassRecord & { studentCount: number; subjectCount: number })[];
  teachers: TeacherRecord[];
  academicYears: string[];
  total: number;
};

export type SubjectsPageFilters = {
  q?: string;
  classId?: string;
  teacherId?: string;
};

export type SubjectsPageData = {
  subjects: SubjectRecord[];
  classes: ClassRecord[];
  teachers: TeacherRecord[];
  total: number;
};

type SchoolFetchResult<T> = {
  data: T;
  response: Response;
};

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  }

  return url.replace(/\/$/, "");
}

function getSupabaseAnonKey() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured.");
  }

  return key;
}

function cleanSearch(value: string | undefined) {
  return value?.trim().replace(/[(),]/g, " ").slice(0, 80) ?? "";
}

function parseCount(contentRange: string | null) {
  if (!contentRange) return null;
  const total = contentRange.split("/").at(-1);
  const parsed = total ? Number.parseInt(total, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatSchoolDate(value: string | null | undefined) {
  if (!value) return "Non renseigné";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatMoney(value: number) {
  return `${Math.round(value).toLocaleString("fr-FR")} FCFA`;
}

export async function schoolDataFetch<T>(
  accessToken: string,
  path: string,
  init: RequestInit = {},
): Promise<SchoolFetchResult<T>> {
  const headers = new Headers(init.headers);
  headers.set("apikey", getSupabaseAnonKey());
  headers.set("Authorization", `Bearer ${accessToken}`);

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getSupabaseUrl()}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : (null as T);

  if (!response.ok) {
    const message =
      typeof data === "object" && data && "message" in data
        ? String((data as { message?: string }).message)
        : "La requête Supabase a échoué.";

    throw new Error(message);
  }

  return { data, response };
}

export async function schoolDataRequest<T>(
  accessToken: string,
  path: string,
  init: RequestInit = {},
) {
  const result = await schoolDataFetch<T>(accessToken, path, init);
  return result.data;
}

async function countRows(
  accessToken: string,
  table: string,
  filters: [string, string][] = [],
) {
  const query = new URLSearchParams({
    select: "id",
    limit: "1",
  });

  filters.forEach(([key, value]) => query.append(key, value));

  const result = await schoolDataFetch<unknown[]>(
    accessToken,
    `/rest/v1/${table}?${query.toString()}`,
    {
      headers: {
        Prefer: "count=exact",
        Range: "0-0",
      },
    },
  );

  return parseCount(result.response.headers.get("content-range")) ?? result.data.length;
}

async function safeRead<T>(reader: () => Promise<T>, fallback: T) {
  try {
    return await reader();
  } catch {
    return fallback;
  }
}

async function getStudentCountByParent(accessToken: string, parentIds: string[]) {
  if (parentIds.length === 0) return new Map<string, number>();

  const query = new URLSearchParams({
    select: "parent_id",
    parent_id: `in.(${parentIds.join(",")})`,
    limit: "10000",
  });

  const rows = await schoolDataRequest<{ parent_id: string | null }[]>(
    accessToken,
    `/rest/v1/students?${query.toString()}`,
  );

  return rows.reduce((counts, row) => {
    if (row.parent_id) {
      counts.set(row.parent_id, (counts.get(row.parent_id) ?? 0) + 1);
    }

    return counts;
  }, new Map<string, number>());
}

async function getStudentCountByClass(accessToken: string, classIds: string[]) {
  if (classIds.length === 0) return new Map<string, number>();

  const query = new URLSearchParams({
    select: "class_id",
    class_id: `in.(${classIds.join(",")})`,
    limit: "10000",
  });

  const rows = await schoolDataRequest<{ class_id: string | null }[]>(
    accessToken,
    `/rest/v1/students?${query.toString()}`,
  );

  return rows.reduce((counts, row) => {
    if (row.class_id) {
      counts.set(row.class_id, (counts.get(row.class_id) ?? 0) + 1);
    }

    return counts;
  }, new Map<string, number>());
}

async function getSubjectCountByTeacher(accessToken: string, teacherIds: string[]) {
  if (teacherIds.length === 0) return new Map<string, number>();

  const query = new URLSearchParams({
    select: "teacher_id",
    teacher_id: `in.(${teacherIds.join(",")})`,
    limit: "10000",
  });

  const rows = await schoolDataRequest<{ teacher_id: string | null }[]>(
    accessToken,
    `/rest/v1/subjects?${query.toString()}`,
  );

  return rows.reduce((counts, row) => {
    if (row.teacher_id) {
      counts.set(row.teacher_id, (counts.get(row.teacher_id) ?? 0) + 1);
    }

    return counts;
  }, new Map<string, number>());
}

async function getMainClassCountByTeacher(accessToken: string, teacherIds: string[]) {
  if (teacherIds.length === 0) return new Map<string, number>();

  const query = new URLSearchParams({
    select: "main_teacher_id",
    main_teacher_id: `in.(${teacherIds.join(",")})`,
    limit: "10000",
  });

  const rows = await schoolDataRequest<{ main_teacher_id: string | null }[]>(
    accessToken,
    `/rest/v1/classes?${query.toString()}`,
  );

  return rows.reduce((counts, row) => {
    if (row.main_teacher_id) {
      counts.set(row.main_teacher_id, (counts.get(row.main_teacher_id) ?? 0) + 1);
    }

    return counts;
  }, new Map<string, number>());
}

async function getSubjectCountByClass(accessToken: string, classIds: string[]) {
  if (classIds.length === 0) return new Map<string, number>();

  const query = new URLSearchParams({
    select: "class_id",
    class_id: `in.(${classIds.join(",")})`,
    limit: "10000",
  });

  const rows = await schoolDataRequest<{ class_id: string | null }[]>(
    accessToken,
    `/rest/v1/subjects?${query.toString()}`,
  );

  return rows.reduce((counts, row) => {
    if (row.class_id) {
      counts.set(row.class_id, (counts.get(row.class_id) ?? 0) + 1);
    }

    return counts;
  }, new Map<string, number>());
}

export async function getTeachersForSelect(accessToken: string) {
  const query = new URLSearchParams({
    select:
      "id,full_name,email,phone,subject_speciality,photo_url,status,created_at,updated_at",
    order: "full_name.asc",
    limit: "500",
  });

  return schoolDataRequest<TeacherRecord[]>(
    accessToken,
    `/rest/v1/teachers?${query.toString()}`,
  );
}

export async function getClasses(accessToken: string) {
  const query = new URLSearchParams({
    select: "id,name,level,academic_year,main_teacher_id,created_at,updated_at,teachers(id,full_name,email)",
    order: "name.asc",
    limit: "200",
  });

  return schoolDataRequest<ClassRecord[]>(
    accessToken,
    `/rest/v1/classes?${query.toString()}`,
  );
}

export async function getParentsForSelect(accessToken: string) {
  const query = new URLSearchParams({
    select: "id,full_name,email,phone,address,profession,created_at,updated_at",
    order: "full_name.asc",
    limit: "500",
  });

  return schoolDataRequest<ParentRecord[]>(
    accessToken,
    `/rest/v1/parents?${query.toString()}`,
  );
}

export async function getStudentsPageData(
  accessToken: string,
  filters: StudentsPageFilters,
): Promise<StudentsPageData> {
  const query = new URLSearchParams({
    select:
      "id,matricule,first_name,last_name,gender,date_of_birth,place_of_birth,address,phone,email,class_id,parent_id,photo_url,status,created_at,updated_at,classes(id,name,level,academic_year),parents(id,full_name,email,phone)",
    order: "created_at.desc",
    limit: "120",
  });

  const search = cleanSearch(filters.q);

  if (search) {
    query.set(
      "or",
      `(matricule.ilike.*${search}*,first_name.ilike.*${search}*,last_name.ilike.*${search}*,email.ilike.*${search}*)`,
    );
  }

  if (filters.classId) {
    query.set("class_id", `eq.${filters.classId}`);
  }

  if (filters.status) {
    query.set("status", `eq.${filters.status}`);
  }

  const [students, classes, parents, total] = await Promise.all([
    schoolDataRequest<StudentRecord[]>(
      accessToken,
      `/rest/v1/students?${query.toString()}`,
    ),
    getClasses(accessToken),
    getParentsForSelect(accessToken),
    countRows(accessToken, "students"),
  ]);

  return { students, classes, parents, total };
}

export async function getParentsPageData(
  accessToken: string,
  filters: ParentsPageFilters,
): Promise<ParentsPageData> {
  const query = new URLSearchParams({
    select: "id,full_name,email,phone,address,profession,created_at,updated_at",
    order: "created_at.desc",
    limit: "120",
  });

  const search = cleanSearch(filters.q);

  if (search) {
    query.set(
      "or",
      `(full_name.ilike.*${search}*,email.ilike.*${search}*,phone.ilike.*${search}*)`,
    );
  }

  const [parents, total] = await Promise.all([
    schoolDataRequest<ParentRecord[]>(
      accessToken,
      `/rest/v1/parents?${query.toString()}`,
    ),
    countRows(accessToken, "parents"),
  ]);
  const studentCounts = await getStudentCountByParent(
    accessToken,
    parents.map((parent) => parent.id),
  );

  return {
    total,
    parents: parents.map((parent) => ({
      ...parent,
      studentCount: studentCounts.get(parent.id) ?? 0,
    })),
  };
}

export async function getTeachersPageData(
  accessToken: string,
  filters: TeachersPageFilters,
): Promise<TeachersPageData> {
  const query = new URLSearchParams({
    select:
      "id,full_name,email,phone,subject_speciality,photo_url,status,created_at,updated_at",
    order: "created_at.desc",
    limit: "120",
  });

  const search = cleanSearch(filters.q);

  if (search) {
    query.set(
      "or",
      `(full_name.ilike.*${search}*,email.ilike.*${search}*,phone.ilike.*${search}*,subject_speciality.ilike.*${search}*)`,
    );
  }

  if (filters.status) {
    query.set("status", `eq.${filters.status}`);
  }

  const [teachers, total] = await Promise.all([
    schoolDataRequest<TeacherRecord[]>(
      accessToken,
      `/rest/v1/teachers?${query.toString()}`,
    ),
    countRows(accessToken, "teachers"),
  ]);
  const teacherIds = teachers.map((teacher) => teacher.id);
  const [subjectCounts, mainClassCounts] = await Promise.all([
    getSubjectCountByTeacher(accessToken, teacherIds),
    getMainClassCountByTeacher(accessToken, teacherIds),
  ]);

  return {
    total,
    teachers: teachers.map((teacher) => ({
      ...teacher,
      subjectCount: subjectCounts.get(teacher.id) ?? 0,
      mainClassCount: mainClassCounts.get(teacher.id) ?? 0,
    })),
  };
}

export async function getClassesPageData(
  accessToken: string,
  filters: ClassesPageFilters,
): Promise<ClassesPageData> {
  const query = new URLSearchParams({
    select:
      "id,name,level,academic_year,main_teacher_id,created_at,updated_at,teachers(id,full_name,email)",
    order: "created_at.desc",
    limit: "120",
  });

  const search = cleanSearch(filters.q);

  if (search) {
    query.set(
      "or",
      `(name.ilike.*${search}*,level.ilike.*${search}*,academic_year.ilike.*${search}*)`,
    );
  }

  if (filters.academicYear) {
    query.set("academic_year", `eq.${filters.academicYear}`);
  }

  const [classes, teachers, total] = await Promise.all([
    schoolDataRequest<ClassRecord[]>(
      accessToken,
      `/rest/v1/classes?${query.toString()}`,
    ),
    getTeachersForSelect(accessToken),
    countRows(accessToken, "classes"),
  ]);
  const classIds = classes.map((item) => item.id);
  const [studentCounts, subjectCounts] = await Promise.all([
    getStudentCountByClass(accessToken, classIds),
    getSubjectCountByClass(accessToken, classIds),
  ]);
  const academicYears = Array.from(
    new Set(classes.map((item) => item.academic_year).filter(Boolean)),
  ).sort((a, b) => b.localeCompare(a));

  return {
    total,
    teachers,
    academicYears,
    classes: classes.map((item) => ({
      ...item,
      studentCount: studentCounts.get(item.id) ?? 0,
      subjectCount: subjectCounts.get(item.id) ?? 0,
    })),
  };
}

export async function getSubjectsPageData(
  accessToken: string,
  filters: SubjectsPageFilters,
): Promise<SubjectsPageData> {
  const query = new URLSearchParams({
    select:
      "id,name,coefficient,class_id,teacher_id,created_at,updated_at,classes(id,name,level,academic_year),teachers(id,full_name,email)",
    order: "created_at.desc",
    limit: "160",
  });

  const search = cleanSearch(filters.q);

  if (search) {
    query.set("name", `ilike.*${search}*`);
  }

  if (filters.classId) {
    query.set("class_id", `eq.${filters.classId}`);
  }

  if (filters.teacherId) {
    query.set("teacher_id", `eq.${filters.teacherId}`);
  }

  const [subjects, classes, teachers, total] = await Promise.all([
    schoolDataRequest<SubjectRecord[]>(
      accessToken,
      `/rest/v1/subjects?${query.toString()}`,
    ),
    getClasses(accessToken),
    getTeachersForSelect(accessToken),
    countRows(accessToken, "subjects"),
  ]);

  return { subjects, classes, teachers, total };
}

export async function getSchoolDashboardData(
  accessToken: string,
  role: SchoolRole,
): Promise<SchoolDashboardData> {
  const today = formatDate(new Date());

  const [
    studentCount,
    parentCount,
    teacherCount,
    classCount,
    absenceTodayCount,
    latestStudents,
    latestParentsData,
    classes,
    announcements,
    payments,
  ] = await Promise.all([
    safeRead(() => countRows(accessToken, "students"), 0),
    safeRead(() => countRows(accessToken, "parents"), 0),
    safeRead(() => countRows(accessToken, "teachers"), 0),
    safeRead(() => countRows(accessToken, "classes"), 0),
    safeRead(
      () =>
        countRows(accessToken, "attendance", [
          ["date", `eq.${today}`],
          ["status", "in.(absent,late,excused)"],
        ]),
      0,
    ),
    safeRead(
      () =>
        schoolDataRequest<StudentRecord[]>(
          accessToken,
          `/rest/v1/students?${new URLSearchParams({
            select:
              "id,matricule,first_name,last_name,status,created_at,class_id,parent_id,classes(id,name,level,academic_year),parents(id,full_name,email,phone)",
            order: "created_at.desc",
            limit: "6",
          }).toString()}`,
        ),
      [],
    ),
    safeRead(() => getParentsPageData(accessToken, {}), { parents: [], total: 0 }),
    safeRead(() => getClasses(accessToken), []),
    safeRead(
      () =>
        schoolDataRequest<AnnouncementRecord[]>(
          accessToken,
          `/rest/v1/announcements?${new URLSearchParams({
            select: "id,title,target_role,priority,created_at",
            order: "created_at.desc",
            limit: "4",
          }).toString()}`,
        ),
      [],
    ),
    role === "admin" || role === "direction" || role === "accountant"
      ? safeRead(
          () =>
            schoolDataRequest<PaymentRecord[]>(
              accessToken,
              `/rest/v1/payments?${new URLSearchParams({
                select: "amount,payment_date",
                order: "payment_date.desc",
                limit: "1000",
              }).toString()}`,
            ),
          [],
        )
      : Promise.resolve([]),
  ]);

  const classCounts = await safeRead(
    () =>
      getStudentCountByClass(
        accessToken,
        classes.map((item) => item.id),
      ),
    new Map<string, number>(),
  );
  const paidAmount = payments.reduce((sum, payment) => {
    const value =
      typeof payment.amount === "number"
        ? payment.amount
        : Number.parseFloat(payment.amount);
    return Number.isFinite(value) ? sum + value : sum;
  }, 0);

  return {
    metrics: [
      {
        label: "Élèves",
        value: String(studentCount),
        detail: "Dossiers enregistrés dans Supabase",
        tone: "green",
      },
      {
        label: "Parents",
        value: String(parentCount),
        detail: "Contacts responsables enregistrés",
        tone: "gold",
      },
      {
        label: "Enseignants",
        value: String(teacherCount),
        detail: "Membres pédagogiques enregistrés",
        tone: "blue",
      },
      {
        label: "Classes",
        value: String(classCount),
        detail: "Classes ouvertes dans le système",
        tone: "green",
      },
      {
        label: "Absences aujourd'hui",
        value: String(absenceTodayCount),
        detail: "Absences, retards ou excusés du jour",
        tone: absenceTodayCount > 0 ? "red" : "green",
      },
      {
        label: "Paiements reçus",
        value: formatMoney(paidAmount),
        detail: "Somme réelle des paiements enregistrés",
        tone: "gold",
      },
    ],
    latestStudents,
    latestParents: latestParentsData.parents.slice(0, 5),
    announcements,
    classes: classes.slice(0, 8).map((item) => ({
      ...item,
      studentCount: classCounts.get(item.id) ?? 0,
    })),
  };
}
