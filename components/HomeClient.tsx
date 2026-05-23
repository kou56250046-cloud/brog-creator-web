"use client";

import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  articles: ArticleMeta[];
};

/* ── マスクで下からスライドして現れるテキスト ── */
function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <motion.span
        className={className}
        style={{ display: "inline-block" }}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const CATEGORIES = [
  "心理・自己理解",
  "人間関係",
  "習慣・行動",
  "健康・睡眠",
  "お金・経済",
  "仕事・キャリア",
  "社会・思想",
  "祈り・神霊・生き方",
  "自然共鳴",
  "見えない現象の論理",
];

const CONCEPTS = [
  {
    num: "01",
    title: "科学で読み解く",
    desc: "心理学・神経科学・人類学など複数の学術視点から、日常の現象を解析する",
  },
  {
    num: "02",
    title: "感性で味わう",
    desc: "論文の言葉を、日常の言葉に変換する。知ることを、体験することに近づける",
  },
  {
    num: "03",
    title: "問いを持つ",
    desc: "答えを与えるより、良い問いを持てるよう設計する。読後の余韻を大切にする",
  },
];

export default function HomeClient({ articles }: Props) {
  return (
    <div>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — ダーク・フルビューポート
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6"
        style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
      >
        {/* 背景グラデーション */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 60%, rgba(99,102,241,0.07) 0%, transparent 70%)," +
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 60%)",
          }}
        />

        {/* ノイズテクスチャ（疑似エレメント代わり） */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />

        {/* コンテンツ */}
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* ラベル */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 text-xs tracking-[0.35em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Journal of the In-Between
          </motion.p>

          {/* メインタイトル */}
          <h1
            className="font-bold mb-6 leading-[1.15]"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: "clamp(3rem, 10vw, 7rem)",
            }}
          >
            <RevealText delay={0.3}>あわいの</RevealText>
            <RevealText delay={0.45}>手帖</RevealText>
          </h1>

          {/* 区切り線（左から伸びる） */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-8 h-px w-24 origin-left"
            style={{
              background:
                "linear-gradient(to right, var(--accent), transparent)",
            }}
          />

          {/* サブタイトル */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl leading-loose"
            style={{ color: "var(--dark-muted)" }}
          >
            心理・神霊・自然・見えない現象を
            <br className="hidden sm:block" />
            論理と感性の両方で読み解く
          </motion.p>

          {/* スクロールインジケーター */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-20 flex flex-col items-center gap-3"
          >
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-14"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MARQUEE — アクセントカラーのバンド
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="overflow-hidden py-4 select-none"
        style={{ background: "var(--accent)" }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((copy) => (
            <span key={copy} className="flex">
              {CATEGORIES.map((cat) => (
                <span
                  key={`${copy}-${cat}`}
                  className="mx-6 text-sm font-medium tracking-widest"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {cat}
                  <span className="mx-6 opacity-40">◇</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ARTICLES — ライトセクション
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-4" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto">
          {/* セクションヘッダー */}
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="text-xs tracking-[0.35em] uppercase font-medium"
                style={{ color: "var(--accent)" }}
              >
                Latest Articles
              </span>
              <h2
                className="mt-2 text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                最新の記事
              </h2>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 h-px origin-left"
              style={{ background: "var(--border)" }}
            />
          </div>

          {/* 記事グリッド */}
          {articles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center py-24"
              style={{ color: "var(--muted)" }}
            >
              <p className="text-lg mb-2">まだ記事がありません</p>
              <p className="text-sm">チャットで最初の記事を作成しましょう</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CONCEPT — ダークセクション
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="py-28 px-4"
        style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* ヘッダー */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <span
              className="text-xs tracking-[0.35em] uppercase font-medium"
              style={{ color: "var(--accent)" }}
            >
              Concept
            </span>
            <h2
              className="mt-4 text-2xl sm:text-4xl font-bold leading-relaxed"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              読むことは、
              <br />
              自分を知ること。
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 text-sm sm:text-base max-w-lg mx-auto leading-loose"
              style={{ color: "var(--dark-muted)" }}
            >
              「あわい」とは、二つのものの間にある、名前のない空間のこと。
              <br />
              科学と感性、論理と神秘、現実と夢——
              <br />
              その狭間にある問いを、静かに掘り下げる場所。
            </motion.p>
          </motion.div>

          {/* 3つのコンセプト */}
          <div className="grid sm:grid-cols-3 gap-10">
            {CONCEPTS.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="mb-5 text-5xl font-bold font-mono leading-none select-none"
                  style={{ color: "rgba(99,102,241,0.25)" }}
                >
                  {item.num}
                </div>
                <div
                  className="mb-3 h-px w-8"
                  style={{ background: "var(--accent)", opacity: 0.6 }}
                />
                <h3
                  className="mb-3 text-lg font-bold"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-loose"
                  style={{ color: "var(--dark-muted)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
