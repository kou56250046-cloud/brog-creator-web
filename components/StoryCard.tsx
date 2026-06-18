"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { StoryMeta } from "@/lib/stories";

type Props = {
  story: StoryMeta;
  index: number;
};

export default function StoryCard({ story, index }: Props) {
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
      <Link href={`/stories/${story.slug}`} className="block group h-full">
        <div
          className="relative h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{
              background: "linear-gradient(to right, #9c6bc0, transparent)",
            }}
          />

          <div className="flex flex-col flex-1 p-6">
            {/* 小説バッジ */}
            <div className="mb-4">
              <span
                className="inline-block text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "#f3e8ff",
                  color: "#7c3aed",
                }}
              >
                短編小説
              </span>
            </div>

            {/* タイトル */}
            <h2
              className="text-base font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-[#7c3aed]"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {story.title}
            </h2>

            {/* あらすじ */}
            <p
              className="text-sm line-clamp-3 mb-5 leading-relaxed flex-1"
              style={{ color: "var(--muted)" }}
            >
              {story.description}
            </p>

            {/* タグ + 日付 */}
            <div
              className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex flex-wrap gap-1">
                {story.tags.slice(0, 3).map((tag) => (
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
                {story.date}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
