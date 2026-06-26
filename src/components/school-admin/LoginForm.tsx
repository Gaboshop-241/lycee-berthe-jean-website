"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type LoginState = {
  type: "idle" | "error" | "success";
  message: string;
};

const rolePills = ["Admin", "Direction", "Enseignant", "Parent", "Élève"];

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/gestion";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [state, setState] = useState<LoginState>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setState({
        type: "error",
        message: "Veuillez renseigner votre e-mail et votre mot de passe.",
      });
      return;
    }

    setIsSubmitting(true);
    setState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as {
        message?: string;
        redirectTo?: string;
      };

      if (!response.ok) {
        throw new Error(data.message || "Connexion impossible.");
      }

      setState({
        type: "success",
        message: "Connexion réussie. Ouverture du tableau de bord...",
      });
      router.push(nextPath.startsWith("/gestion") ? nextPath : data.redirectTo || "/gestion");
      router.refresh();
    } catch (error) {
      setState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Connexion impossible pour le moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordReset() {
    if (!email.trim()) {
      setState({
        type: "error",
        message: "Saisissez d'abord votre adresse e-mail.",
      });
      return;
    }

    setIsResetting(true);
    setState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Demande impossible.");
      }

      setState({
        type: "success",
        message:
          data.message ||
          "Si ce compte existe, un lien de réinitialisation vient d'être envoyé.",
      });
    } catch (error) {
      setState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible d'envoyer la demande.",
      });
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <form className="school-login-card" onSubmit={handleSubmit} noValidate>
      <div className="school-login-heading">
        <span>Gestion scolaire</span>
        <h1>Connexion sécurisée</h1>
        <p>
          Connectez-vous avec le compte fourni par l&apos;administration du lycée.
        </p>
      </div>

      <div
        className={`school-form-status ${state.type}`}
        aria-live="polite"
        role={state.type === "error" ? "alert" : "status"}
      >
        {state.message}
      </div>

      <label className="school-field">
        <span>Adresse e-mail</span>
        <div className="school-input-shell">
          <Mail size={18} />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            autoComplete="email"
            placeholder="nom@bertheetjean.ga"
            required
          />
        </div>
      </label>

      <label className="school-field">
        <span>Mot de passe</span>
        <div className="school-input-shell">
          <LockKeyhole size={18} />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      <button className="school-submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="school-spin" size={18} /> : null}
        Se connecter
      </button>

      <button
        className="school-link-button"
        type="button"
        onClick={() => void handlePasswordReset()}
        disabled={isResetting}
      >
        {isResetting ? "Envoi en cours..." : "Mot de passe oublié ?"}
      </button>

      <div className="school-login-security-note">
        <ShieldCheck size={16} />
        <p>
          Les accès sont attribués selon le rôle : direction, enseignant,
          parent, élève ou comptabilité.
        </p>
      </div>

      <div className="school-login-role-pills" aria-label="Rôles disponibles">
        {rolePills.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>
    </form>
  );
}
