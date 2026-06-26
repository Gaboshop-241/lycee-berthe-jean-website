import type { Metadata } from "next";
import { AdminDashboard } from "@/components/school-admin/AdminDashboard";
import { DashboardShell } from "@/components/school-admin/DashboardShell";
import { requireSchoolSession } from "@/lib/school/auth";
import { getSchoolDashboardData } from "@/lib/school/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard gestion scolaire",
  description:
    "Tableau de bord sécurisé du système de gestion scolaire Berthe & Jean.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function GestionDashboardPage() {
  const session = await requireSchoolSession();
  const data = await getSchoolDashboardData(session.accessToken, session.profile.role);

  return (
    <DashboardShell profile={session.profile}>
      <AdminDashboard profile={session.profile} data={data} />
    </DashboardShell>
  );
}
