export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";
export const localeCookieName = "berthe-jean-locale";

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "fr" || value === "en";
}
