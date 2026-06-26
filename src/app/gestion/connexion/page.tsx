import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/school-admin/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connexion gestion scolaire",
  description:
    "Connexion sécurisée à l'espace de gestion scolaire du Lycée Privé International Berthe & Jean.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GestionConnexionPage() {
  return (
    <main className="school-login-page">
      <section className="school-login-visual">
        <Link className="school-login-back" href="/">
          Retour au site public
        </Link>
        <div>
          <span>Lycée Privé International Berthe & Jean</span>
          <h2>Une gestion scolaire claire, sécurisée et professionnelle.</h2>
          <p>
            Cet espace centralise les informations administratives, pédagogiques
            et financières de l&apos;établissement.
          </p>
        </div>
      </section>
      <section className="school-login-panel" aria-label="Connexion">
        <LoginForm />
      </section>
    </main>
  );
}
