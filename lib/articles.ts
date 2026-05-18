import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
};

export type ArticleMeta = ArticleFrontmatter & {
  slug: string;
};

function ensureDir() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

export function getArticleSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  ensureDir();
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ? String(data.date) : "",
    category: data.category ?? "",
    tags: data.tags ?? [],
    status: data.status ?? "draft",
    content,
  };
}

export async function getArticleHtml(slug: string): Promise<{ article: Article; html: string } | null> {
  const article = getArticleBySlug(slug);
  if (!article) return null;
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(article.content);
  return { article, html: processed.toString() };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const a = getArticleBySlug(slug);
      if (!a) return null;
      const { content: _content, ...meta } = a;
      return meta;
    })
    .filter((a): a is ArticleMeta => a !== null && a.status === "published")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCategories(): string[] {
  const cats = getAllArticles().map((a) => a.category);
  return [...new Set(cats)].filter(Boolean);
}

export function getAllTags(): string[] {
  const tags = getAllArticles().flatMap((a) => a.tags);
  return [...new Set(tags)].filter(Boolean);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}
