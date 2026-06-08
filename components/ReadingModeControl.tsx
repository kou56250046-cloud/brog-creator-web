"use client";

import { useEffect, useState } from "react";

type Size = "S" | "M" | "L";

const SIZE_MAP: Record<Size, string> = {
  S: "0.9rem",
  M: "1rem",
  L: "1.125rem",
};

const STORAGE_KEY = "reading-font-size";

export default function ReadingModeControl() {
  const [size, setSize] = useState<Size>("M");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Size) || "M";
    setSize(saved);
    document.documentElement.style.setProperty("--article-font-size", SIZE_MAP[saved]);
  }, []);

  function apply(s: Size) {
    setSize(s);
    localStorage.setItem(STORAGE_KEY, s);
    document.documentElement.style.setProperty("--article-font-size", SIZE_MAP[s]);
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full px-1.5 py-1"
      style={{ background: "var(--accent-light)", border: "1px solid var(--border)" }}
      title="文字サイズ"
    >
      {(["S", "M", "L"] as Size[]).map((s) => (
        <button
          key={s}
          onClick={() => apply(s)}
          className="w-6 h-6 rounded-full text-[11px] font-medium transition-all"
          style={{
            background: size === s ? "var(--accent)" : "transparent",
            color: size === s ? "#fff" : "var(--muted)",
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
