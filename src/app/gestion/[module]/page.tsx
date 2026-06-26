import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DashboardShell } from "@/components/school-admin/DashboardShell";
import { ModulePlaceholder } from "@/components/school-admin/ModulePlaceholder";
import { requireSchoolSession } from "@/lib/school/auth";
import {
  canAccessModule,
  getModuleByKey,
  moduleAliases,
} from "@/lib/school/permissions";

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
};

export default async function GestionModulePage({ params }: ModulePageProps) {
  const { module } = await params;
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

  return (
    <DashboardShell profile={session.profile}>
      <ModulePlaceholder module={moduleConfig} />
    </DashboardShell>
  );
}
