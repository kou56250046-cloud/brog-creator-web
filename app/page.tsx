import { getAllArticles, getCategories } from "@/lib/articles";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  const articles = getAllArticles();
  const categories = getCategories();
  return <HomeClient articles={articles} categories={categories} />;
}
