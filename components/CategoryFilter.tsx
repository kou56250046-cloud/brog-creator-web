"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Props = {
  categories: string[];
  active?: string;
};

export default function CategoryFilter({ categories, active }: Props) {
  return (
    <div className="flex flex-wrap gap-2 my-6">
      <Link href="/">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
          style={
            !active
              ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
              : { background: "transparent", color: "var(--muted)", borderColor: "var(--border)" }
          }
        >
          すべて
        </motion.button>
      </Link>

      <AnimatePresence>
        {categories.map((cat) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/categories/${encodeURIComponent(cat)}`}>
              <button
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={
                  active === cat
                    ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }
                    : { background: "transparent", color: "var(--muted)", borderColor: "var(--border)" }
                }
              >
                {cat}
              </button>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
