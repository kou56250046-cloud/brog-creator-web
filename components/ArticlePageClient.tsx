"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ArticleContent from "@/components/ArticleContent";
import ArticleCard from "@/components/ArticleCard";
import type { Article, ArticleMeta } from "@/lib/articles";

type Props = {
  article: Article;
  html: string;
  related: ArticleMeta[];
};

export default function ArticlePageClient({ article, html, related }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-sm flex items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <Link href="/" className="hover:text-[var(--accent)] transition-colors">
          トップ
        </Link>
        <span>/</span>
        <Link
          href={`/categories/${encodeURIComponent(article.category)}`}
          className="hover:text-[var(--accent)] transition-colors"
        >
          {article.category}
        </Link>
      </motion.nav>

      {/* Article header */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="mb-4">
          <span
            className="inline-block text-xs px-3 py-1 rounded-full font-medium"
            style={{ background: "var(--accent-light)", color: "var(--accent)" }}
          >
            {article.category}
          </span>
        </div>
        <h1
          className="text-2xl sm:text-3xl font-bold leading-snug mb-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {article.title}
        </h1>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          {article.description}
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
          <time>{article.date}</time>
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full" style={{ background: "#f3f4f6" }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 h-px" style={{ background: "var(--border)" }} />
      </motion.header>

      {/* Article body */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ArticleContent html={html} />
      </motion.div>

      {/* Related articles */}
      {related.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="h-px mb-8" style={{ background: "var(--border)" }} />
          <h2
            className="text-lg font-bold mb-6"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            同じカテゴリーの記事
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Link
          href="/"
          className="inline-block text-sm px-6 py-2.5 rounded-full border transition-all hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          ← 記事一覧へ戻る
        </Link>
      </motion.div>
    </div>
  );
}
