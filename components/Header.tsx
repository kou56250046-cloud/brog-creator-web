"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(250,250,248,0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="flex-shrink-0">
          <span
            className="text-lg font-bold tracking-wide"
            style={{ fontFamily: "'Noto Serif JP', serif", color: "var(--fg)" }}
          >
            あわいの手帖
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-xs ml-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事を検索..."
            className="w-full px-3 py-1.5 text-sm rounded-full border outline-none transition-all"
            style={{
              borderColor: "var(--border)",
              background: "var(--card-bg)",
              color: "var(--fg)",
            }}
          />
        </form>

        <nav className="hidden sm:flex items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">記事一覧</Link>
          <Link href="/search" className="hover:text-[var(--accent)] transition-colors">検索</Link>
        </nav>
      </div>
    </motion.header>
  );
}
