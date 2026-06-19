"use client";

import { FormEvent, useId, useState } from "react";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
};

type ContactFormProps = {
  email: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  subject: "",
  message: "",
};

const serviceOptions = [
  "Service admissions",
  "Vie scolaire",
  "Administration",
  "Visite du campus",
  "Autre demande",
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm({ email, phone }: ContactFormProps) {
  const formId = useId();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    { type: "success" | "error"; message: string } | null
  >(null);

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Veuillez renseigner votre nom.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Veuillez renseigner votre adresse e-mail.";
    } else if (!validateEmail(values.email.trim())) {
      nextErrors.email = "Veuillez entrer une adresse e-mail valide.";
    }

    if (!values.service.trim()) {
      nextErrors.service = "Veuillez choisir le service concerné.";
    }

    if (!values.subject.trim()) {
      nextErrors.subject = "Veuillez indiquer le sujet de votre message.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Veuillez écrire votre message.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        type: "error",
        message: "Veuillez compléter les champs obligatoires avant l'envoi.",
      });
      return;
    }

    const subject = `[${values.service}] ${values.subject}`;
    const body = [
      `Nom : ${values.name}`,
      `E-mail : ${values.email}`,
      values.phone ? `Téléphone : ${values.phone}` : null,
      `Service concerné : ${values.service}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus({
      type: "success",
      message:
        "Merci. Votre message est prêt à être envoyé : votre application e-mail va s'ouvrir.",
    });

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="form-card" noValidate onSubmit={handleSubmit}>
      <div className="section-copy page-heading">
        <span className="eyebrow">Contact direct</span>
        <h2>Envoyez-nous un message</h2>
        <p className="required-hint">
          Les champs marqués d&apos;un astérisque sont obligatoires.
        </p>
      </div>

      <div
        id={`${formId}-status`}
        className={status ? `form-status ${status.type}` : "form-status"}
        aria-live="polite"
      >
        {status?.message}
      </div>

      <div className="form-grid">
        <label className="form-field" htmlFor={`${formId}-name`}>
          <span>Nom *</span>
          <input
            id={`${formId}-name`}
            name="nom"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Votre nom complet"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          />
          {errors.name ? (
            <small className="field-error" id={`${formId}-name-error`}>
              {errors.name}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor={`${formId}-email`}>
          <span>Adresse e-mail *</span>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="exemple@email.com"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          />
          {errors.email ? (
            <small className="field-error" id={`${formId}-email-error`}>
              {errors.email}
            </small>
          ) : null}
        </label>

        <label className="form-field" htmlFor={`${formId}-phone`}>
          <span>Téléphone</span>
          <input
            id={`${formId}-phone`}
            name="telephone"
            type="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder={phone}
            autoComplete="tel"
          />
        </label>

        <label className="form-field" htmlFor={`${formId}-service`}>
          <span>Service concerné *</span>
          <select
            id={`${formId}-service`}
            name="service"
            value={values.service}
            onChange={(event) => updateField("service", event.target.value)}
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${formId}-service-error` : undefined}
          >
            <option value="">Choisir un service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service ? (
            <small className="field-error" id={`${formId}-service-error`}>
              {errors.service}
            </small>
          ) : null}
        </label>

        <label className="form-field full" htmlFor={`${formId}-subject`}>
          <span>Sujet *</span>
          <input
            id={`${formId}-subject`}
            name="sujet"
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            placeholder="Objet de votre message"
            required
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
          />
          {errors.subject ? (
            <small className="field-error" id={`${formId}-subject-error`}>
              {errors.subject}
            </small>
          ) : null}
        </label>

        <label className="form-field full" htmlFor={`${formId}-message`}>
          <span>Votre message *</span>
          <textarea
            id={`${formId}-message`}
            name="message"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Écrivez votre message ici..."
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          />
          {errors.message ? (
            <small className="field-error" id={`${formId}-message-error`}>
              {errors.message}
            </small>
          ) : null}
        </label>
      </div>

      <button className="primary-button form-button" type="submit">
        Envoyer le message
      </button>
    </form>
  );
}
