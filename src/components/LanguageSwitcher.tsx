"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  defaultLocale,
  localeCookieName,
  localeLabels,
  locales,
  type Locale,
} from "@/app/i18n-config";

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

const maxAge = 60 * 60 * 24 * 365;

function persistLocale(locale: Locale) {
  globalThis.document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
  globalThis.localStorage.setItem(localeCookieName, locale);
  globalThis.document.documentElement.lang = locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const [optimisticLocale, setOptimisticLocale] = useState<Locale | null>(null);
  const activeLocale = optimisticLocale ?? currentLocale;

  function chooseLocale(locale: Locale) {
    if (locale === activeLocale) {
      return;
    }

    setOptimisticLocale(locale);
    persistLocale(locale);
    router.refresh();
  }

  return (
    <div
      className="language-switcher"
      aria-label={activeLocale === "fr" ? "Choisir la langue" : "Choose language"}
    >
      {locales.map((locale) => (
        <button
          type="button"
          key={locale}
          className={locale === activeLocale ? "active" : ""}
          aria-pressed={locale === activeLocale}
          onClick={() => chooseLocale(locale)}
        >
          {localeLabels[locale]}
        </button>
      ))}
      <span className="sr-only">
        {activeLocale === defaultLocale ? "Français actif" : "English active"}
      </span>
    </div>
  );
}
