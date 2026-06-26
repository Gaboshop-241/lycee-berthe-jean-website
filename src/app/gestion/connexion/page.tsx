import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";
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
        <div className="school-login-visual-top">
          <Link className="school-login-brand" href="/">
            <Image
              src="/assets/logo-berthe-jean.png"
              alt="Logo du Lycée Privé International Berthe & Jean"
              width={74}
              height={74}
              priority
            />
            <span>
              <strong>Lycée Privé International Berthe & Jean</strong>
              <small>Savoir-être - Savoir-faire</small>
            </span>
          </Link>
          <Link className="school-login-back" href="/">
            <ArrowLeft size={16} />
            Retour au site public
          </Link>
        </div>

        <div className="school-login-copy">
          <span className="school-login-kicker">Espace sécurisé</span>
          <h2>Espace de gestion scolaire</h2>
          <p>
            Une plateforme professionnelle pour suivre les élèves, les enseignants,
            les présences, les notes, les documents et les paiements du lycée.
          </p>
          <div className="school-login-feature-grid" aria-label="Garanties de sécurité">
            <article>
              <ShieldCheck size={20} />
              <strong>Accès sécurisé</strong>
              <small>Connexion contrôlée par compte personnel.</small>
            </article>
            <article>
              <UsersRound size={20} />
              <strong>Rôles personnalisés</strong>
              <small>Direction, enseignant, parent, élève ou comptabilité.</small>
            </article>
            <article>
              <LockKeyhole size={20} />
              <strong>Données confidentielles</strong>
              <small>Chaque utilisateur voit uniquement son espace autorisé.</small>
            </article>
          </div>
        </div>
      </section>
      <section className="school-login-panel" aria-label="Connexion">
        <LoginForm />
      </section>
    </main>
  );
}
