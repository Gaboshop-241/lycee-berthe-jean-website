import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Actualité introuvable | Lycée Privé International Berthe & Jean",
    };
  }

  return {
    title: `${article.title} | Lycée Privé International Berthe & Jean`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="site-shell">
      <PageHero
        active="actualites"
        title={article.title}
        text={article.excerpt}
        image={article.image}
        imageAlt={article.alt}
        actions={[
          { label: "Retour aux actualités", href: "/actualites", variant: "secondary" },
          { label: "Nous contacter", href: "/contact" },
        ]}
      />

      <article className="page-section article-layout">
        <div className="article-body">
          <Link className="text-action" href="/actualites">
            <ArrowLeft size={16} /> Toutes les actualités
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
          <h2>À lire aussi</h2>
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

      <SiteFooter />
    </main>
  );
}
