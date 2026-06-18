"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ArticleContent from "@/components/ArticleContent";
import type { Story } from "@/lib/stories";

type Props = {
  story: Story;
  html: string;
};

export default function StoryPageClient({ story, html }: Props) {
  return (
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
        <Link href="/" className="hover:text-[#7c3aed] transition-colors">
          トップ
        </Link>
        <span>/</span>
        <span>短編小説</span>
      </motion.nav>

      {/* Story header */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="mb-4">
          <span
            className="inline-block text-xs px-3 py-1 rounded-full font-medium"
            style={{ background: "#f3e8ff", color: "#7c3aed" }}
          >
            短編小説
          </span>
        </div>
        <h1
          className="text-2xl sm:text-3xl font-bold leading-snug mb-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {story.title}
        </h1>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          {story.description}
        </p>
        <div
          className="flex items-center gap-4 text-xs flex-wrap"
          style={{ color: "var(--muted)" }}
        >
          <time>{story.date}</time>
          <div className="flex flex-wrap gap-1">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full"
                style={{ background: "#f3f4f6" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 h-px" style={{ background: "var(--border)" }} />
      </motion.header>

      {/* Story body */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ArticleContent html={html} />
      </motion.div>

      {/* Related article link */}
      {story.related_article && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-5 rounded-2xl"
          style={{ background: "var(--accent-light)", border: "1px solid var(--border)" }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
            この小説のテーマ記事
          </p>
          <Link
            href={`/articles/${story.related_article}`}
            className="text-sm hover:text-[var(--accent)] transition-colors flex items-center gap-2"
            style={{ color: "var(--fg)" }}
          >
            <span style={{ color: "var(--muted)" }}>→</span>
            元記事を読む
          </Link>
        </motion.div>
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
          className="inline-block text-sm px-6 py-2.5 rounded-full border transition-all hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed]"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          ← トップへ戻る
        </Link>
      </motion.div>
    </div>
  );
}
