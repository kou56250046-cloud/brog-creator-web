import { getAllArticles } from "@/lib/articles";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  const articles = getAllArticles();
  return <HomeClient articles={articles} />;
}
