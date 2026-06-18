import { getAllArticles } from "@/lib/articles";
import { getAllStories } from "@/lib/stories";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  const articles = getAllArticles();
  const stories = getAllStories();
  return <HomeClient articles={articles} stories={stories} />;
}
