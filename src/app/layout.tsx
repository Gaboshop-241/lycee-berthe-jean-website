import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Chatbot } from "@/components/Chatbot";
import { getCurrentLocale } from "./i18n-server";
import { pageCopy } from "./i18n-content";
import { JsonLd } from "./JsonLd";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  buildSiteJsonLd,
} from "./seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const { homeTitle, homeDescription } = pageCopy[locale].metadata;
  const metadata = buildPageMetadata({
    title: homeTitle,
    description: homeDescription,
    path: "/",
    locale,
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Entrée et bâtiment du Lycée Privé International Berthe & Jean à Essassa",
    keywords: ["Institution Internationale Berthe et Jean", "école privée Essassa"],
  });

  return {
    ...metadata,
    metadataBase: new URL(SITE_URL),
    title: {
      default: homeTitle,
      template: `%s | ${SITE_NAME}`,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Chatbot key={locale} locale={locale} />
        <JsonLd data={buildSiteJsonLd(locale)} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
