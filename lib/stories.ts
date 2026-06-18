import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

export type StoryFrontmatter = {
  title: string;
  description: string;
  date: string;
  related_article?: string;
  tags: string[];
  status: "draft" | "published";
};

export type Story = StoryFrontmatter & {
  slug: string;
  content: string;
};

export type StoryMeta = StoryFrontmatter & {
  slug: string;
};

function ensureDir() {
  if (!fs.existsSync(STORIES_DIR)) {
    fs.mkdirSync(STORIES_DIR, { recursive: true });
  }
}

export function getStorySlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(STORIES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getStoryBySlug(slug: string): Story | null {
  ensureDir();
  const filePath = path.join(STORIES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ? String(data.date) : "",
    related_article: data.related_article ?? undefined,
    tags: data.tags ?? [],
    status: data.status ?? "draft",
    content,
  };
}

export async function getStoryHtml(slug: string): Promise<{ story: Story; html: string } | null> {
  const story = getStoryBySlug(slug);
  if (!story) return null;
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(story.content);
  return { story, html: processed.toString() };
}

export function getAllStories(): StoryMeta[] {
  return getStorySlugs()
    .map((slug) => {
      const s = getStoryBySlug(slug);
      if (!s) return null;
      const { content: _content, ...meta } = s;
      return meta;
    })
    .filter((s): s is StoryMeta => s !== null && s.status === "published")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
