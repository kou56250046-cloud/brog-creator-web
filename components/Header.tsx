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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50"
      style={{
        background: "rgba(13, 13, 15, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center gap-5">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <span
            className="text-base font-bold tracking-wide transition-opacity group-hover:opacity-70"
            style={{ fontFamily: "'Noto Serif JP', serif", color: "#f5f5f3" }}
          >
            あわいの手帖
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xs ml-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事を検索..."
            className="w-full px-4 py-1.5 text-sm rounded-full outline-none transition-all"
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#f5f5f3",
            }}
          />
        </form>

        {/* Nav */}
        <nav
          className="hidden sm:flex items-center gap-5 text-sm"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <Link href="/" className="hover:text-white transition-colors duration-200">
            記事一覧
          </Link>
          <Link href="/search" className="hover:text-white transition-colors duration-200">
            検索
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
