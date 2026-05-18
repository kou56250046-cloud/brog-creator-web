import { getArticlesByCategory, getCategories } from "@/lib/articles";
import type { Metadata } from "next";
import CategoryPageClient from "@/components/CategoryPageClient";

type Params = { params: Promise<{ cat: string }> };

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { cat } = await params;
  return {
    title: cat,
    description: `「${cat}」カテゴリーの記事一覧`,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { cat } = await params;
  const articles = getArticlesByCategory(cat);
  const categories = getCategories();

  return (
    <CategoryPageClient
      category={cat}
      articles={articles}
      categories={categories}
    />
  );
}
