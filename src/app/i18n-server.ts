import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "./i18n-config";
import { getSiteDictionary } from "./i18n-content";

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale;
}

export async function getSiteContent() {
  const locale = await getCurrentLocale();

  return {
    locale,
    ...getSiteDictionary(locale),
  };
}
