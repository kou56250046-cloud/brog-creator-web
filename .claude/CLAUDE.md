# あわいの手帖 — システム要件

## プロジェクト概要

チャットで記事を作成し、GitHub push → Vercel 自動デプロイで公開できる個人ブログシステム。
記事は Markdown ファイルとして `content/articles/` で管理する。DB・認証・課金は不使用。

---

## 技術スタック

| 要素 | 採用技術 | バージョン |
|------|----------|-----------|
| フレームワーク | Next.js (App Router + TypeScript) | 16.x |
| スタイリング | Tailwind CSS | v4 |
| アニメーション | Framer Motion | 最新 |
| MD パース | gray-matter + remark + remark-html + remark-gfm | 最新 |
| 全文検索 | Fuse.js（クライアントサイド） | 最新 |
| アクセス解析 | @next/third-parties（Google Analytics 対応済） | 最新 |
| デプロイ | Vercel（GitHub push で自動デプロイ） | — |
| リポジトリ | GitHub | — |

---

## ディレクトリ構造

```
brog-creator-web/
├── app/
│   ├── layout.tsx                  # ルートレイアウト・メタデータ・フォント設定
│   ├── page.tsx                    # トップページ（サーバーコンポーネント）
│   ├── globals.css                 # グローバルスタイル・CSS変数・記事本文スタイル
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx            # 記事詳細ページ（SSG）
│   ├── categories/
│   │   └── [cat]/
│   │       └── page.tsx            # カテゴリー絞り込みページ（SSG）
│   └── search/
│       └── page.tsx                # 全文検索ページ
├── components/
│   ├── Header.tsx                  # ヘッダー（検索バー内蔵・スティッキー）
│   ├── Footer.tsx                  # フッター
│   ├── HomeClient.tsx              # トップページのクライアント部分（Framer Motion）
│   ├── ArticleCard.tsx             # 記事カード（スクロール連動フェードイン）
│   ├── ArticleContent.tsx          # MD レンダリング（dangerouslySetInnerHTML）
│   ├── ArticlePageClient.tsx       # 記事詳細ページのクライアント部分
│   ├── CategoryFilter.tsx          # カテゴリー絞り込みタブ（AnimatePresence）
│   ├── CategoryPageClient.tsx      # カテゴリーページのクライアント部分
│   └── SearchPageClient.tsx        # 検索ページのクライアント部分（Fuse.js）
├── content/
│   └── articles/                   # 記事 Markdown ファイル置き場
│       └── YYYY-MM-DD-slug.md
├── lib/
│   ├── articles.ts                 # 記事読み込み・パース・一覧取得ユーティリティ
│   └── search.ts                   # Fuse.js 検索ロジック
├── public/                         # 静的ファイル
├── skills.md                       # 記事執筆ガイド（必ず参照すること）
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ページ構成

| URL | 機能 | レンダリング |
|-----|------|------------|
| `/` | 記事一覧・ヒーロー・カテゴリーフィルター | Static |
| `/articles/[slug]` | 記事詳細・関連記事 | SSG（generateStaticParams） |
| `/categories/[cat]` | カテゴリー別記事一覧 | SSG（generateStaticParams） |
| `/search` | Fuse.js 全文検索 | Static + Client |

---

## 記事ファイル仕様

### 保存先
```
content/articles/YYYY-MM-DD-slug.md
```

### Frontmatter フォーマット

```yaml
---
title: 記事タイトル（40字以内）
description: 記事の説明（OGP・一覧カード用・120字以内）
date: "YYYY-MM-DD"
category: カテゴリー名
tags: [タグ1, タグ2, タグ3]
status: published
---
```

`status: draft` にすると一覧に表示されない。

### カテゴリー一覧

| カテゴリー | 扱うテーマ例 |
|------------|-------------|
| 心理・自己理解 | 認知バイアス、自己認識、感情のメカニズム |
| 人間関係 | 同調圧力、境界線、HSP、孤独 |
| 習慣・行動 | 習慣化、先延ばし、意思決定 |
| 健康・睡眠 | 睡眠の質、疲労回復、神経科学 |
| お金・経済 | 行動経済学、消費心理、節約 |
| 仕事・キャリア | 生産性、働き方、スキル設計 |
| 社会・思想 | 社会構造、量子哲学、人類学的視点 |
| 祈り・神霊・生き方 | 祈りの構造、神霊とのつながり、霊的な生き方、信仰と日常 |
| 自然共鳴 | 自然との共鳴、季節・風・水の意味、土地と人のつながり |
| 見えない現象の論理 | 奇跡・シンクロニシティ・予知夢・臨死体験を科学・哲学・量子論で解説 |

---

## デザイン仕様

### CSS 変数（`app/globals.css`）

```css
--bg: #fafaf8          /* ページ背景（オフホワイト） */
--fg: #1a1a1a          /* 本文テキスト */
--muted: #6b7280       /* サブテキスト・日付・タグ */
--accent: #5c6bc0      /* アクセントカラー（インディゴ） */
--accent-light: #e8eaf6 /* アクセント薄色（バッジ背景） */
--border: #e5e7eb      /* ボーダー */
--card-bg: #ffffff     /* カード背景 */
```

### フォント

- 見出し: `Noto Serif JP`（Google Fonts）
- 本文: `Noto Sans JP`（Google Fonts）

### アニメーション（Framer Motion）

| 場所 | 動作 |
|------|------|
| ヘッダー | 上からフェードイン（初回のみ） |
| ヒーロー | 下からフェードイン（初回のみ） |
| 記事カード | スクロール連動で下からフェードイン（`whileInView`） |
| カテゴリーフィルター | `AnimatePresence` でスムーズ切り替え |
| 記事詳細 | ヘッダー・本文が順番にフェードイン |

---

## lib/articles.ts の主要関数

| 関数 | 説明 |
|------|------|
| `getAllArticles()` | `status: published` の記事を日付降順で全件取得 |
| `getArticleBySlug(slug)` | スラグで記事を1件取得（本文含む） |
| `getArticleHtml(slug)` | 記事を取得して本文を HTML に変換 |
| `getArticleSlugs()` | 全スラグ一覧（generateStaticParams 用） |
| `getCategories()` | カテゴリー一覧（重複なし） |
| `getAllTags()` | タグ一覧（重複なし） |
| `getArticlesByCategory(category)` | カテゴリーで絞り込み |

---

## 記事作成ルール

**記事を書く前に必ず `skills.md` を Read ツールで参照すること。**

| ルール | 内容 |
|--------|------|
| 文字数 | **5,000〜10,000字**（本文のみ、frontmatter 除く） |
| 参照ファイル | `skills.md`（タイトル設計・構成・学術照射・文体・カテゴリーすべて記載） |
| 保存先 | `content/articles/YYYY-MM-DD-slug.md` |

### 記事作成フロー

1. `skills.md` を Read ツールで参照する
2. カテゴリーを提案・確認する
3. 感情設計（冒頭・中盤・末尾）を決める
4. タイトル候補を4構造で各2本ずつ計8本生成して最良を選ぶ
5. 使用する学術分野（3〜5つ）を選定する
6. **WebSearch で関連論文・文献を検索する（最低3件）**
   - 検索先: Google Scholar, PubMed, ResearchGate
   - WebFetch でアブストラクトを取得して著者名・発表年を確認
7. **使用する実例・事例を選定する（最低1件）**
8. 執筆する（5,000〜10,000字）― 末尾に「参考文献」セクションを追加
9. `content/articles/YYYY-MM-DD-slug.md` として保存する

> context7 は技術ライブラリのドキュメント専用のため学術論文の検索には使用しない。論文検索は必ず WebSearch + WebFetch を使う。

---

## デプロイフロー

```
記事 .md ファイルを保存
  → git add content/articles/記事ファイル.md
  → git commit -m "新記事：タイトル"
  → git push
  → Vercel が自動デプロイ（数分で URL に反映）
```

---

## コーディング規約

- TypeScript strict モード
- Tailwind CSS v4 でスタイリング（CSS 変数を積極的に使う）
- **Server Components を優先**、クライアント操作が必要な部分だけ `"use client"` を付けた `*Client.tsx` に分離する
- API キーは `.env.local` で管理、コードに埋め込み禁止
- 記事コンテンツは `content/articles/` の MD ファイルで一元管理
- DB・認証・外部 API は現状不使用（追加する場合はこのファイルを更新する）
