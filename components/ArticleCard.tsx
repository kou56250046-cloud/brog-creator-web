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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link href={`/articles/${article.slug}`} className="block group h-full">
        <div
          className="relative h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          {/* ホバー時に現れるトップアクセントバー（CSSトランジション） */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{
              background:
                "linear-gradient(to right, var(--accent), transparent)",
            }}
          />

          <div className="flex flex-col flex-1 p-6">
            {/* カテゴリバッジ */}
            <div className="mb-4">
              <Link
                href={`/categories/${encodeURIComponent(article.category)}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-block text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 hover:opacity-80"
                style={{
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                }}
              >
                {article.category}
              </Link>
            </div>

            {/* タイトル */}
            <h2
              className="text-base font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-[var(--accent)]"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {article.title}
            </h2>

            {/* 説明文 */}
            <p
              className="text-sm line-clamp-3 mb-5 leading-relaxed flex-1"
              style={{ color: "var(--muted)" }}
            >
              {article.description}
            </p>

            {/* タグ + 日付 */}
            <div
              className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t"
              style={{ borderColor: "var(--border)" }}
            >
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
              <time
                className="text-xs font-mono tabular-nums"
                style={{ color: "var(--muted)" }}
              >
                {article.date}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
