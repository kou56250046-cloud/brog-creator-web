"use client";

import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  articles: ArticleMeta[];
  categories: string[];
};

export default function HomeClient({ articles, categories }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <h1
          className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "'Noto Serif JP', serif", color: "var(--fg)" }}
        >
          あわいの手帖
        </h1>
        <p className="text-base sm:text-lg" style={{ color: "var(--muted)" }}>
          心理・神霊・自然・見えない現象を、論理と感性の両方で読み解く
        </p>
        <div
          className="mt-6 mx-auto h-px w-16"
          style={{ background: "var(--accent)" }}
        />
      </motion.div>

      {/* Category filter */}
      <CategoryFilter categories={categories} />

      {/* Articles */}
      {articles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-24"
          style={{ color: "var(--muted)" }}
        >
          <p className="text-lg mb-2">まだ記事がありません</p>
          <p className="text-sm">チャットで最初の記事を作成しましょう</p>
        </motion.div>
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
