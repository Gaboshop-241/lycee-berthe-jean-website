import type { MetadataRoute } from "next";
import { SITE_URL, getSiteUrl } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: getSiteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
