"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSchoolSession } from "./auth";
import { schoolDataRequest, type StudentStatus } from "./data";
import type { ProfileStatus, SchoolRole } from "./types";

const managerRoles: SchoolRole[] = ["super_admin", "admin", "direction"];
const validStudentStatuses: StudentStatus[] = [
  "active",
  "inactive",
  "pending",
  "suspended",
];
const validProfileStatuses: ProfileStatus[] = [
  "active",
  "inactive",
  "pending",
  "suspended",
];

function ensureManager(role: SchoolRole) {
  if (!managerRoles.includes(role)) {
    throw new Error("Vous n'avez pas l'autorisation de modifier ces données.");
  }
}

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(formData: FormData, key: string) {
  const value = textValue(formData, key);
  return value || null;
}

function requiredText(formData: FormData, key: string, label: string) {
  const value = textValue(formData, key);

  if (!value) {
    throw new Error(`${label} est obligatoire.`);
  }

  return value;
}

function returnTo(formData: FormData, fallback: string) {
  const value = textValue(formData, "returnTo");
  return value.startsWith("/gestion") ? value : fallback;
}

function recordId(formData: FormData) {
  return requiredText(formData, "id", "Identifiant");
}

function studentPayload(formData: FormData) {
  const status = textValue(formData, "status") as StudentStatus;

  return {
    matricule: requiredText(formData, "matricule", "Le matricule"),
    first_name: requiredText(formData, "first_name", "Le prénom"),
    last_name: requiredText(formData, "last_name", "Le nom"),
    gender: nullableText(formData, "gender"),
    date_of_birth: nullableText(formData, "date_of_birth"),
    place_of_birth: nullableText(formData, "place_of_birth"),
    address: nullableText(formData, "address"),
    phone: nullableText(formData, "phone"),
    email: nullableText(formData, "email"),
    class_id: nullableText(formData, "class_id"),
    parent_id: nullableText(formData, "parent_id"),
    status: validStudentStatuses.includes(status) ? status : "active",
  };
}

function parentPayload(formData: FormData) {
  return {
    full_name: requiredText(formData, "full_name", "Le nom du parent"),
    email: nullableText(formData, "email"),
    phone: nullableText(formData, "phone"),
    address: nullableText(formData, "address"),
    profession: nullableText(formData, "profession"),
  };
}

function teacherPayload(formData: FormData) {
  const status = textValue(formData, "status") as ProfileStatus;

  return {
    full_name: requiredText(formData, "full_name", "Le nom de l'enseignant"),
    email: nullableText(formData, "email"),
    phone: nullableText(formData, "phone"),
    subject_speciality: nullableText(formData, "subject_speciality"),
    photo_url: nullableText(formData, "photo_url"),
    status: validProfileStatuses.includes(status) ? status : "active",
  };
}

function classPayload(formData: FormData) {
  return {
    name: requiredText(formData, "name", "Le nom de la classe"),
    level: requiredText(formData, "level", "Le niveau"),
    academic_year: requiredText(formData, "academic_year", "L'année scolaire"),
    main_teacher_id: nullableText(formData, "main_teacher_id"),
  };
}

function subjectPayload(formData: FormData) {
  const coefficient = Number.parseFloat(textValue(formData, "coefficient"));

  return {
    name: requiredText(formData, "name", "Le nom de la matière"),
    coefficient: Number.isFinite(coefficient) && coefficient > 0 ? coefficient : 1,
    class_id: requiredText(formData, "class_id", "La classe"),
    teacher_id: nullableText(formData, "teacher_id"),
  };
}

export async function createParentAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);

  await schoolDataRequest(session.accessToken, "/rest/v1/parents", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(parentPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/parents");
  redirect(returnTo(formData, "/gestion/parents"));
}

export async function updateParentAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);
  const id = encodeURIComponent(recordId(formData));

  await schoolDataRequest(session.accessToken, `/rest/v1/parents?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(parentPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/parents");
  redirect(returnTo(formData, "/gestion/parents"));
}

export async function createStudentAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);

  await schoolDataRequest(session.accessToken, "/rest/v1/students", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(studentPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/eleves");
  redirect(returnTo(formData, "/gestion/eleves"));
}

export async function updateStudentAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);
  const id = encodeURIComponent(recordId(formData));

  await schoolDataRequest(session.accessToken, `/rest/v1/students?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(studentPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/eleves");
  redirect(returnTo(formData, "/gestion/eleves"));
}

export async function createTeacherAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);

  await schoolDataRequest(session.accessToken, "/rest/v1/teachers", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(teacherPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/enseignants");
  revalidatePath("/gestion/classes");
  revalidatePath("/gestion/matieres");
  redirect(returnTo(formData, "/gestion/enseignants"));
}

export async function updateTeacherAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);
  const id = encodeURIComponent(recordId(formData));

  await schoolDataRequest(session.accessToken, `/rest/v1/teachers?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(teacherPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/enseignants");
  revalidatePath("/gestion/classes");
  revalidatePath("/gestion/matieres");
  redirect(returnTo(formData, "/gestion/enseignants"));
}

export async function createClassAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);

  await schoolDataRequest(session.accessToken, "/rest/v1/classes", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(classPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/classes");
  revalidatePath("/gestion/eleves");
  revalidatePath("/gestion/matieres");
  redirect(returnTo(formData, "/gestion/classes"));
}

export async function updateClassAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);
  const id = encodeURIComponent(recordId(formData));

  await schoolDataRequest(session.accessToken, `/rest/v1/classes?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(classPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/classes");
  revalidatePath("/gestion/eleves");
  revalidatePath("/gestion/matieres");
  redirect(returnTo(formData, "/gestion/classes"));
}

export async function createSubjectAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);

  await schoolDataRequest(session.accessToken, "/rest/v1/subjects", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(subjectPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/matieres");
  revalidatePath("/gestion/classes");
  redirect(returnTo(formData, "/gestion/matieres"));
}

export async function updateSubjectAction(formData: FormData) {
  const session = await requireSchoolSession();
  ensureManager(session.profile.role);
  const id = encodeURIComponent(recordId(formData));

  await schoolDataRequest(session.accessToken, `/rest/v1/subjects?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(subjectPayload(formData)),
  });

  revalidatePath("/gestion");
  revalidatePath("/gestion/matieres");
  revalidatePath("/gestion/classes");
  redirect(returnTo(formData, "/gestion/matieres"));
}
