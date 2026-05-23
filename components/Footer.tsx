import Link from "next/link";

const FOOTER_CATEGORIES = [
  "心理・自己理解",
  "人間関係",
  "習慣・行動",
  "健康・睡眠",
  "祈り・神霊・生き方",
  "見えない現象の論理",
];

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
    >
      <div className="max-w-5xl mx-auto px-5 py-20">
        {/* グリッド */}
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          {/* ブランド */}
          <div className="max-w-xs">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              あわいの手帖
            </h2>
            <p
              className="text-sm leading-loose"
              style={{ color: "var(--dark-muted)" }}
            >
              心理・神霊・自然・見えない現象を、
              <br />
              論理と感性の両方で読み解く
            </p>
            {/* アクセントライン */}
            <div
              className="mt-6 h-px w-12"
              style={{
                background:
                  "linear-gradient(to right, var(--accent), transparent)",
              }}
            />
          </div>

          {/* カテゴリーリンク */}
          <div>
            <p
              className="mb-5 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: "var(--accent)" }}
            >
              Categories
            </p>
            <ul className="space-y-3">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${encodeURIComponent(cat)}`}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "var(--dark-muted)" }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイトリンク */}
          <div>
            <p
              className="mb-5 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: "var(--accent)" }}
            >
              Site
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "var(--dark-muted)" }}
                >
                  記事一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "var(--dark-muted)" }}
                >
                  検索
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ボトムバー */}
        <div
          className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs"
          style={{
            borderColor: "var(--dark-border)",
            color: "var(--dark-muted)",
          }}
        >
          <p>© {new Date().getFullYear()} あわいの手帖</p>
          <p style={{ opacity: 0.5 }}>
            論理と感性の狭間で
          </p>
        </div>
      </div>
    </footer>
  );
}
