import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "執筆統計" };

function bar(count: number, max: number) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return { width: `${pct}%`, count };
}

export default function StatsPage() {
  const articles = getAllArticles();
  const total = articles.length;

  // カテゴリ別集計
  const catMap: Record<string, number> = {};
  for (const a of articles) {
    catMap[a.category] = (catMap[a.category] ?? 0) + 1;
  }
  const cats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const catMax = cats[0]?.[1] ?? 1;

  // 月別集計
  const monthMap: Record<string, number> = {};
  for (const a of articles) {
    const ym = a.date.slice(0, 7); // "YYYY-MM"
    monthMap[ym] = (monthMap[ym] ?? 0) + 1;
  }
  const months = Object.entries(monthMap).sort((a, b) => a[0].localeCompare(b[0]));
  const monthMax = Math.max(...months.map(([, v]) => v), 1);

  // タグ頻度
  const tagMap: Record<string, number> = {};
  for (const a of articles) {
    for (const t of a.tags) {
      tagMap[t] = (tagMap[t] ?? 0) + 1;
    }
  }
  const tags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]).slice(0, 20);
  const tagMax = tags[0]?.[1] ?? 1;

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-12"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <h1
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        執筆統計
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>
        公開記事 <strong style={{ color: "var(--accent)" }}>{total}</strong> 本
      </p>

      {/* カテゴリ別 */}
      <section className="mb-12">
        <h2 className="text-base font-semibold mb-5" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          カテゴリ別
        </h2>
        <ul className="space-y-3">
          {cats.map(([cat, count]) => {
            const { width } = bar(count, catMax);
            return (
              <li key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{cat}</span>
                  <span style={{ color: "var(--muted)" }}>{count} 本</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width, background: "var(--accent)" }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 月別投稿数 */}
      <section className="mb-12">
        <h2 className="text-base font-semibold mb-5" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          月別投稿数
        </h2>
        <div className="flex items-end gap-2 h-32">
          {months.map(([ym, count]) => {
            const heightPct = Math.round((count / monthMax) * 100);
            return (
              <div key={ym} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>{count}</span>
                <div
                  className="w-full rounded-t-sm"
                  style={{ height: `${heightPct}%`, background: "var(--accent)", opacity: 0.8 }}
                />
                <span
                  className="text-[9px] leading-tight text-center"
                  style={{ color: "var(--muted)", writingMode: "vertical-rl" }}
                >
                  {ym.replace("-", "/")}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* タグ頻度 */}
      <section>
        <h2 className="text-base font-semibold mb-5" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          よく使うタグ
        </h2>
        <ul className="space-y-2">
          {tags.map(([tag, count]) => {
            const { width } = bar(count, tagMax);
            return (
              <li key={tag} className="flex items-center gap-3">
                <span
                  className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent-light)", color: "var(--accent)", minWidth: "6rem" }}
                >
                  #{tag}
                </span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width, background: "var(--accent)", opacity: 0.6 }}
                  />
                </div>
                <span className="text-xs w-6 text-right" style={{ color: "var(--muted)" }}>{count}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
