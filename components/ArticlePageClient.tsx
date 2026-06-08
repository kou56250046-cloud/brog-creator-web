"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ArticleContent from "@/components/ArticleContent";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import ReadingModeControl from "@/components/ReadingModeControl";
import type { Article, ArticleMeta } from "@/lib/articles";
import { getMoodConfig } from "@/lib/moods";

type Props = {
  article: Article;
  html: string;
  related: ArticleMeta[];
  seriesArticles: ArticleMeta[];
};

export default function ArticlePageClient({ article, html, related, seriesArticles }: Props) {
  const mood = getMoodConfig(article.mood);

  return (
    <>
      <ReadingProgress />
      <TableOfContents html={html} />

      <div
        className="max-w-2xl mx-auto px-4 py-12"
        style={{ background: "var(--bg)", color: "var(--fg)" }}
      >
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
          className="mb-10 rounded-2xl overflow-hidden"
          style={
            mood
              ? { background: mood.gradient, padding: "2rem", marginLeft: "-1rem", marginRight: "-1rem" }
              : {}
          }
        >
          <div className="mb-4 flex items-center justify-between">
            <span
              className="inline-block text-xs px-3 py-1 rounded-full font-medium"
              style={
                mood
                  ? { background: "rgba(255,255,255,0.15)", color: mood.textColor }
                  : { background: "var(--accent-light)", color: "var(--accent)" }
              }
            >
              {article.category}
            </span>
            <ReadingModeControl />
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold leading-snug mb-4"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: mood ? mood.textColor : "var(--fg)",
            }}
          >
            {article.title}
          </h1>
          <p
            className="text-sm mb-4"
            style={{ color: mood ? "rgba(255,255,255,0.55)" : "var(--muted)" }}
          >
            {article.description}
          </p>
          <div
            className="flex items-center gap-4 text-xs flex-wrap"
            style={{ color: mood ? "rgba(255,255,255,0.4)" : "var(--muted)" }}
          >
            <time>{article.date}</time>
            {article.series && (
              <span
                className="px-2 py-0.5 rounded-full text-[11px]"
                style={{ background: mood ? "rgba(255,255,255,0.12)" : "var(--accent-light)", color: mood ? mood.textColor : "var(--accent)" }}
              >
                シリーズ: {article.series}
              </span>
            )}
            <div className="flex flex-wrap gap-1">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full"
                  style={{ background: mood ? "rgba(255,255,255,0.1)" : "#f3f4f6", color: mood ? "rgba(255,255,255,0.5)" : undefined }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          {!mood && <div className="mt-6 h-px" style={{ background: "var(--border)" }} />}
        </motion.header>

        {/* Epigraph */}
        {article.epigraph && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <blockquote className="epigraph">
              {article.epigraph}
            </blockquote>
          </motion.div>
        )}

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ArticleContent html={html} />
        </motion.div>

        {/* Series navigation */}
        {seriesArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-6 rounded-2xl"
            style={{ background: "var(--accent-light)", border: "1px solid var(--border)" }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
              シリーズ「{article.series}」の他の記事
            </p>
            <ul className="space-y-2">
              {seriesArticles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="text-sm hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                    style={{ color: "var(--fg)" }}
                  >
                    <span style={{ color: "var(--muted)" }}>→</span>
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

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
    </>
  );
}
