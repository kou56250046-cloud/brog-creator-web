import Fuse from "fuse.js";
import type { ArticleMeta } from "./articles";

let fuse: Fuse<ArticleMeta> | null = null;

export function initSearch(articles: ArticleMeta[]) {
  fuse = new Fuse(articles, {
    keys: ["title", "description", "tags", "category"],
    threshold: 0.4,
    includeScore: true,
  });
}

export function searchArticles(query: string, articles: ArticleMeta[]): ArticleMeta[] {
  if (!query.trim()) return articles;
  if (!fuse) initSearch(articles);
  const results = fuse!.search(query);
  return results.map((r) => r.item);
}
