import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Chatbot } from "@/components/Chatbot";
import { getCurrentLocale } from "./i18n-server";
import { pageCopy } from "./i18n-content";
import { JsonLd } from "./JsonLd";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lycee-berthe-jean-website.vercel.app";

const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "Lycée Privé International Berthe & Jean",
  alternateName: "Berthe & Jean",
  url: BASE_URL,
  logo: `${BASE_URL}/assets/logo-berthe-jean.png`,
  image: `${BASE_URL}/assets/real/campus-building.jpg`,
  description:
    "Lycée privé laïc international à Essassa, Gabon. Enseignement du collège à la terminale avec les séries A1, B, C et D. Reconnaissance d'utilité publique depuis 2009.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Route Nationale 1, PK 23 Essassa",
    addressLocality: "Ntoum",
    addressRegion: "Estuaire",
    addressCountry: "GA",
  },
  telephone: "+24166763289",
  email: "contact@bertheetjean.ga",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "12:00",
    },
  ],
  sameAs: ["https://www.facebook.com/share/1FusHDJrWv/"],
} as const;

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

  return {
    metadataBase: new URL(BASE_URL),
    title: homeTitle,
    description: homeDescription,
    openGraph: {
      title: homeTitle,
      description: homeDescription,
      url: BASE_URL,
      siteName: "Lycée Privé International Berthe & Jean",
      locale: locale === "en" ? "en_US" : "fr_GA",
      type: "website",
      images: [
        {
          url: "/assets/real/campus-building.jpg",
          width: 1200,
          height: 630,
          alt: "Lycée Privé International Berthe & Jean — Essassa, Gabon",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: homeDescription,
      images: ["/assets/real/campus-building.jpg"],
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
        <JsonLd data={schoolJsonLd as Record<string, unknown>} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
