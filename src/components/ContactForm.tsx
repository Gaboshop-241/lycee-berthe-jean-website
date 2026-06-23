"use client";

import { FormEvent, useId, useState } from "react";
import type { Locale } from "@/app/i18n-config";

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
  locale: Locale;
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

const contactFormCopy = {
  fr: {
    eyebrow: "Contact direct",
    title: "Envoyez-nous un message",
    requiredHint: "Les champs marqués d'un astérisque sont obligatoires.",
    statusRequired: "Veuillez compléter les champs obligatoires avant l'envoi.",
    success:
      "Merci. Votre message est prêt à être envoyé : votre application e-mail va s'ouvrir.",
    errors: {
      name: "Veuillez renseigner votre nom.",
      emailRequired: "Veuillez renseigner votre adresse e-mail.",
      emailInvalid: "Veuillez entrer une adresse e-mail valide.",
      service: "Veuillez choisir le service concerné.",
      subject: "Veuillez indiquer le sujet de votre message.",
      message: "Veuillez écrire votre message.",
    },
    fields: {
      name: "Nom *",
      email: "Adresse e-mail *",
      phone: "Téléphone",
      service: "Service concerné *",
      subject: "Sujet *",
      message: "Votre message *",
    },
    placeholders: {
      name: "Votre nom complet",
      email: "exemple@email.com",
      service: "Choisir un service",
      subject: "Objet de votre message",
      message: "Écrivez votre message ici...",
    },
    services: [
      "Service admissions",
      "Vie scolaire",
      "Administration",
      "Visite du campus",
      "Autre demande",
    ],
    bodyLabels: {
      name: "Nom",
      email: "E-mail",
      phone: "Téléphone",
      service: "Service concerné",
    },
    submit: "Envoyer le message",
  },
  en: {
    eyebrow: "Direct contact",
    title: "Send us a message",
    requiredHint: "Fields marked with an asterisk are required.",
    statusRequired: "Please complete the required fields before sending.",
    success: "Thank you. Your message is ready: your email app will open.",
    errors: {
      name: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      service: "Please choose the relevant service.",
      subject: "Please enter the subject of your message.",
      message: "Please write your message.",
    },
    fields: {
      name: "Name *",
      email: "Email address *",
      phone: "Phone",
      service: "Relevant service *",
      subject: "Subject *",
      message: "Your message *",
    },
    placeholders: {
      name: "Your full name",
      email: "example@email.com",
      service: "Choose a service",
      subject: "Subject of your message",
      message: "Write your message here...",
    },
    services: [
      "Admissions office",
      "School life",
      "Administration",
      "Campus visit",
      "Other request",
    ],
    bodyLabels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      service: "Relevant service",
    },
    submit: "Send message",
  },
} as const;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm({ email, phone, locale }: ContactFormProps) {
  const copy = contactFormCopy[locale];
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
      nextErrors.name = copy.errors.name;
    }

    if (!values.email.trim()) {
      nextErrors.email = copy.errors.emailRequired;
    } else if (!validateEmail(values.email.trim())) {
      nextErrors.email = copy.errors.emailInvalid;
    }

    if (!values.service.trim()) {
      nextErrors.service = copy.errors.service;
    }

    if (!values.subject.trim()) {
      nextErrors.subject = copy.errors.subject;
    }

    if (!values.message.trim()) {
      nextErrors.message = copy.errors.message;
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
        message: copy.statusRequired,
      });
      return;
    }

    const subject = `[${values.service}] ${values.subject}`;
    const body = [
      `${copy.bodyLabels.name} : ${values.name}`,
      `${copy.bodyLabels.email} : ${values.email}`,
      values.phone ? `${copy.bodyLabels.phone} : ${values.phone}` : null,
      `${copy.bodyLabels.service} : ${values.service}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus({
      type: "success",
      message: copy.success,
    });
    setValues(initialValues);

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="form-card" noValidate onSubmit={handleSubmit}>
      <div className="section-copy page-heading">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p className="required-hint">{copy.requiredHint}</p>
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
          <span>{copy.fields.name}</span>
          <input
            id={`${formId}-name`}
            name="nom"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={copy.placeholders.name}
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
          <span>{copy.fields.email}</span>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder={copy.placeholders.email}
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
          <span>{copy.fields.phone}</span>
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
          <span>{copy.fields.service}</span>
          <select
            id={`${formId}-service`}
            name="service"
            value={values.service}
            onChange={(event) => updateField("service", event.target.value)}
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${formId}-service-error` : undefined}
          >
            <option value="">{copy.placeholders.service}</option>
            {copy.services.map((service) => (
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
          <span>{copy.fields.subject}</span>
          <input
            id={`${formId}-subject`}
            name="sujet"
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            placeholder={copy.placeholders.subject}
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
          <span>{copy.fields.message}</span>
          <textarea
            id={`${formId}-message`}
            name="message"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={copy.placeholders.message}
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
        {copy.submit}
      </button>
    </form>
  );
}
