import type { MetadataRoute } from "next";
import { newsArticles } from "./site-data";
import { SEO_ROUTES, buildSitemapEntry, getSiteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = SEO_ROUTES.map((route) =>
    buildSitemapEntry(
      route.path,
      route.lastModified,
      route.changeFrequency,
      route.priority,
      route.images,
    ),
  );

  const articleRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: getSiteUrl(`/actualites/${article.slug}`),
    lastModified: new Date(article.dateTime),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: [getSiteUrl(article.image)],
  }));

  return [...staticRoutes, ...articleRoutes];
}
