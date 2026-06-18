import { getStoryHtml, getStorySlugs } from "@/lib/stories";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StoryPageClient from "@/components/StoryPageClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const result = await getStoryHtml(slug);
  if (!result) return {};
  return {
    title: result.story.title,
    description: result.story.description,
    openGraph: {
      title: result.story.title,
      description: result.story.description,
      type: "article",
      publishedTime: result.story.date,
    },
  };
}

export default async function StoryPage({ params }: Params) {
  const { slug } = await params;
  const result = await getStoryHtml(slug);
  if (!result) notFound();

  const { story, html } = result;

  return <StoryPageClient story={story} html={html} />;
}
