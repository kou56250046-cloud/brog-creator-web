import { getArticleHtml, getAllArticles, getArticleSlugs } from "@/lib/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ArticleContent from "@/components/ArticleContent";
import ArticlePageClient from "@/components/ArticlePageClient";

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
  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  return (
    <ArticlePageClient article={article} html={html} related={related} />
  );
}
