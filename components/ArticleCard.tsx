"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  article: ArticleMeta;
  index: number;
};

export default function ArticleCard({ article, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
    >
      <Link href={`/articles/${article.slug}`} className="block group">
        <div
          className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          {/* Category badge */}
          <div className="mb-3">
            <Link
              href={`/categories/${encodeURIComponent(article.category)}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-block text-xs px-3 py-1 rounded-full font-medium transition-colors hover:opacity-80"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}
            >
              {article.category}
            </Link>
          </div>

          {/* Title */}
          <h2
            className="text-lg font-bold mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {article.title}
          </h2>

          {/* Description */}
          <p className="text-sm line-clamp-2 mb-4" style={{ color: "var(--muted)" }}>
            {article.description}
          </p>

          {/* Tags + Date */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#f3f4f6", color: "var(--muted)" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <time className="text-xs" style={{ color: "var(--muted)" }}>
              {article.date}
            </time>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
