import { getArticlesByCategory, getCategories } from "@/lib/articles";
import type { Metadata } from "next";
import CategoryPageClient from "@/components/CategoryPageClient";

type Params = { params: Promise<{ cat: string }> };

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ cat: encodeURIComponent(cat) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { cat } = await params;
  const decoded = decodeURIComponent(cat);
  return {
    title: decoded,
    description: `「${decoded}」カテゴリーの記事一覧`,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { cat } = await params;
  const decoded = decodeURIComponent(cat);
  const articles = getArticlesByCategory(decoded);
  const categories = getCategories();

  return (
    <CategoryPageClient
      category={decoded}
      articles={articles}
      categories={categories}
    />
  );
}
