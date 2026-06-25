import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getSiteContent } from "../../i18n-server";
import { JsonLd } from "../../JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildNewsArticleJsonLd,
  buildPageMetadata,
} from "../../seo";
import { PageHero, SiteFooter } from "../../site-components";
import { newsArticles } from "../../site-data";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data, locale, pages } = await getSiteContent();
  const article = data.newsArticles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: pages.metadata.newsNotFound,
    };
  }

  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/actualites/${slug}`,
    locale,
    image: article.image,
    imageAlt: article.alt,
    type: "article",
    publishedTime: article.dateTime,
    modifiedTime: article.dateTime,
    keywords: [article.tag, "actualités lycée Berthe et Jean"],
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { common, data, locale, pages } = await getSiteContent();
  const copy = pages.news;
  const article = data.newsArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = data.newsArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: locale === "en" ? "Home" : "Accueil", path: "/" },
    { name: locale === "en" ? "News" : "Actualités", path: "/actualites" },
    { name: article.title, path: `/actualites/${slug}` },
  ]);

  const newsArticleJsonLd = buildNewsArticleJsonLd(article, `/actualites/${slug}`);

  return (
    <main className="site-shell">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={newsArticleJsonLd} />
      <PageHero
        active="actualites"
        title={article.title}
        text={article.excerpt}
        image={article.image}
        imageAlt={article.alt}
        common={common}
        currentLocale={locale}
        items={data.navItems}
        actions={[
          { label: copy.backToNews, href: "/actualites", variant: "secondary" },
          { label: copy.contact, href: "/contact" },
        ]}
      />

      <article className="page-section article-layout">
        <div className="article-body">
          <Link className="text-action" href="/actualites">
            <ArrowLeft size={16} /> {copy.allArticles}
          </Link>
          <div className="news-meta-row article-meta">
            <span>{article.tag}</span>
            <time dateTime={article.dateTime}>{article.date}</time>
          </div>
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="article-aside">
          <div className="image-frame">
            <Image
              src={article.image}
              alt={article.alt}
              fill
              sizes="(max-width: 900px) 100vw, 32vw"
            />
          </div>
          <h2>{copy.alsoRead}</h2>
          <div className="related-list">
            {relatedArticles.map((item) => (
              <Link href={`/actualites/${item.slug}`} key={item.slug}>
                <span>{item.tag}</span>
                <strong>{item.title}</strong>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </aside>
      </article>

      <SiteFooter common={common} info={data.contactInfo} items={data.navItems} />
    </main>
  );
}
