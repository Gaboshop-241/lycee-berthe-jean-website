"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { getNavItemsForRole, roleLabels } from "@/lib/school/permissions";
import type { UserProfile } from "@/lib/school/types";

type DashboardShellProps = {
  profile: UserProfile;
  children: React.ReactNode;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function DashboardShell({ profile, children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = getNavItemsForRole(profile.role);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/gestion/connexion");
    router.refresh();
  }

  return (
    <div className="school-admin-shell">
      <aside className={sidebarOpen ? "school-sidebar open" : "school-sidebar"}>
        <div className="school-sidebar-brand">
          <span className="school-sidebar-logo">BJ</span>
          <div>
            <strong>Berthe & Jean</strong>
            <small>Gestion scolaire</small>
          </div>
          <button
            className="school-sidebar-close"
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="school-sidebar-nav" aria-label="Navigation de gestion">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/gestion" ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.key}
                className={active ? "active" : ""}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                <small>{item.phase}</small>
              </Link>
            );
          })}
        </nav>
      </aside>

      {sidebarOpen ? (
        <button
          className="school-sidebar-backdrop"
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="school-admin-main">
        <header className="school-topbar">
          <button
            className="school-menu-button"
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>
          <div>
            <span>Espace sécurisé</span>
            <strong>Lycée Privé International Berthe & Jean</strong>
          </div>
          <div className="school-user-chip">
            <span>{getInitials(profile.full_name)}</span>
            <div>
              <strong>{profile.full_name}</strong>
              <small>{roleLabels[profile.role]}</small>
            </div>
          </div>
          <button className="school-logout-button" type="button" onClick={() => void logout()}>
            <LogOut size={18} />
            Déconnexion
          </button>
        </header>

        <main className="school-admin-content">{children}</main>
      </div>
    </div>
  );
}
