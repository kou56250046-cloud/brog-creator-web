"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  articles: ArticleMeta[];
};

function SearchInner({ articles }: Props) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ArticleMeta[]>([]);

  const fuse = new Fuse(articles, {
    keys: ["title", "description", "tags", "category"],
    threshold: 0.4,
    includeScore: true,
  });

  useEffect(() => {
    if (!query.trim()) {
      setResults(articles);
      return;
    }
    setResults(fuse.search(query).map((r) => r.item));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          記事を検索
        </h1>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードを入力..."
          autoFocus
          className="w-full px-4 py-3 text-base rounded-xl border outline-none transition-all"
          style={{
            borderColor: "var(--border)",
            background: "var(--card-bg)",
            color: "var(--fg)",
          }}
        />
        {query.trim() && (
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {results.length} 件の結果
          </p>
        )}
      </motion.div>

      {results.length === 0 ? (
        <p className="text-center py-16" style={{ color: "var(--muted)" }}>
          「{query}」に一致する記事が見つかりませんでした
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {results.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPageClient({ articles }: Props) {
  return (
    <Suspense fallback={<div className="py-24 text-center" style={{ color: "var(--muted)" }}>読み込み中...</div>}>
      <SearchInner articles={articles} />
    </Suspense>
  );
}
