import { getAllArticles } from "@/lib/articles";
import SearchPageClient from "@/components/SearchPageClient";

export const metadata = {
  title: "記事を検索",
};

export default function SearchPage() {
  const articles = getAllArticles();
  return <SearchPageClient articles={articles} />;
}
