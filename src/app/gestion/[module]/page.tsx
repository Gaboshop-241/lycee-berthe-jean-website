import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ClassesManagement } from "@/components/school-admin/ClassesManagement";
import { DashboardShell } from "@/components/school-admin/DashboardShell";
import { ModulePlaceholder } from "@/components/school-admin/ModulePlaceholder";
import { ParentsManagement } from "@/components/school-admin/ParentsManagement";
import { StudentsManagement } from "@/components/school-admin/StudentsManagement";
import { SubjectsManagement } from "@/components/school-admin/SubjectsManagement";
import { TeachersManagement } from "@/components/school-admin/TeachersManagement";
import { requireSchoolSession } from "@/lib/school/auth";
import {
  getClassesPageData,
  getParentsPageData,
  getStudentsPageData,
  getSubjectsPageData,
  getTeachersPageData,
  type StudentsPageFilters,
  type StudentStatus,
  type TeachersPageFilters,
} from "@/lib/school/data";
import {
  canAccessModule,
  getModuleByKey,
  moduleAliases,
} from "@/lib/school/permissions";
import type { ProfileStatus } from "@/lib/school/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Module gestion scolaire",
  robots: {
    index: false,
    follow: false,
  },
};

type ModulePageProps = {
  params: Promise<{ module: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function searchParamValue(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function searchParamsToPath(module: string, params: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const item = Array.isArray(value) ? value[0] : value;

    if (item) {
      query.set(key, item);
    }
  });

  const suffix = query.toString();
  return `/gestion/${module}${suffix ? `?${suffix}` : ""}`;
}

function isStudentStatus(value: string | undefined): value is StudentStatus {
  return (
    value === "active" ||
    value === "inactive" ||
    value === "pending" ||
    value === "suspended"
  );
}

function isProfileStatus(value: string | undefined): value is ProfileStatus {
  return (
    value === "active" ||
    value === "inactive" ||
    value === "pending" ||
    value === "suspended"
  );
}

export default async function GestionModulePage({ params, searchParams }: ModulePageProps) {
  const { module } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const moduleKey = moduleAliases[module];

  if (!moduleKey) {
    notFound();
  }

  const session = await requireSchoolSession();

  if (!canAccessModule(session.profile.role, moduleKey)) {
    redirect("/gestion");
  }

  const moduleConfig = getModuleByKey(moduleKey);

  if (!moduleConfig) {
    notFound();
  }

  if (moduleKey === "students") {
    const status = searchParamValue(resolvedSearchParams, "status");
    const filters: StudentsPageFilters = {
      q: searchParamValue(resolvedSearchParams, "q"),
      classId: searchParamValue(resolvedSearchParams, "classId"),
      status: isStudentStatus(status) ? status : "",
    };
    const data = await getStudentsPageData(session.accessToken, filters);

    return (
      <DashboardShell profile={session.profile}>
        <StudentsManagement
          profile={session.profile}
          data={data}
          filters={filters}
          returnTo={searchParamsToPath(module, resolvedSearchParams)}
        />
      </DashboardShell>
    );
  }

  if (moduleKey === "parents") {
    const filters = {
      q: searchParamValue(resolvedSearchParams, "q"),
    };
    const data = await getParentsPageData(session.accessToken, filters);

    return (
      <DashboardShell profile={session.profile}>
        <ParentsManagement
          profile={session.profile}
          data={data}
          filters={filters}
          returnTo={searchParamsToPath(module, resolvedSearchParams)}
        />
      </DashboardShell>
    );
  }

  if (moduleKey === "teachers") {
    const status = searchParamValue(resolvedSearchParams, "status");
    const filters: TeachersPageFilters = {
      q: searchParamValue(resolvedSearchParams, "q"),
      status: isProfileStatus(status) ? status : "",
    };
    const data = await getTeachersPageData(session.accessToken, filters);

    return (
      <DashboardShell profile={session.profile}>
        <TeachersManagement
          profile={session.profile}
          data={data}
          filters={filters}
          returnTo={searchParamsToPath(module, resolvedSearchParams)}
        />
      </DashboardShell>
    );
  }

  if (moduleKey === "classes") {
    const filters = {
      q: searchParamValue(resolvedSearchParams, "q"),
      academicYear: searchParamValue(resolvedSearchParams, "academicYear"),
    };
    const data = await getClassesPageData(session.accessToken, filters);

    return (
      <DashboardShell profile={session.profile}>
        <ClassesManagement
          profile={session.profile}
          data={data}
          filters={filters}
          returnTo={searchParamsToPath(module, resolvedSearchParams)}
        />
      </DashboardShell>
    );
  }

  if (moduleKey === "subjects") {
    const filters = {
      q: searchParamValue(resolvedSearchParams, "q"),
      classId: searchParamValue(resolvedSearchParams, "classId"),
      teacherId: searchParamValue(resolvedSearchParams, "teacherId"),
    };
    const data = await getSubjectsPageData(session.accessToken, filters);

    return (
      <DashboardShell profile={session.profile}>
        <SubjectsManagement
          profile={session.profile}
          data={data}
          filters={filters}
          returnTo={searchParamsToPath(module, resolvedSearchParams)}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell profile={session.profile}>
      <ModulePlaceholder module={moduleConfig} />
    </DashboardShell>
  );
}
