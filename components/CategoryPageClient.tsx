"use client";

import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  category: string;
  articles: ArticleMeta[];
};

export default function CategoryPageClient({ category, articles }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {category}
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {articles.length} 件の記事
        </p>
      </motion.div>

      {articles.length === 0 ? (
        <p className="text-center py-16" style={{ color: "var(--muted)" }}>
          このカテゴリーにはまだ記事がありません
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
