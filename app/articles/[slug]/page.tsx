import { getArticleHtml, getAllArticles, getArticleSlugs, getArticlesBySeries } from "@/lib/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticlePageClient from "@/components/ArticlePageClient";
import { injectHeadingIds } from "@/lib/html";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const result = await getArticleHtml(slug);
  if (!result) return {};
  return {
    title: result.article.title,
    description: result.article.description,
    openGraph: {
      title: result.article.title,
      description: result.article.description,
      type: "article",
      publishedTime: result.article.date,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const result = await getArticleHtml(slug);
  if (!result) notFound();

  const { article, html } = result;
  const htmlWithIds = injectHeadingIds(html);

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  const seriesArticles = article.series
    ? getArticlesBySeries(article.series).filter((a) => a.slug !== slug)
    : [];

  return (
    <ArticlePageClient
      article={article}
      html={htmlWithIds}
      related={related}
      seriesArticles={seriesArticles}
    />
  );
}
