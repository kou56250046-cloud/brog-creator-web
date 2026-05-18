# プロジェクト設定

## スタック

このプロジェクトは以下のスタックで構築します：

- **フレームワーク**: Next.js 15 (App Router)
- **データベース**: Supabase (PostgreSQL)
- **認証**: NextAuth.js v5 + Google OAuth
- **ストレージ**: Cloudflare R2
- **決済**: Stripe
- **デプロイ**: Vercel
- **バージョン管理**: GitHub

## 利用可能な MCP ツール

| サービス | MCP | 用途 |
|---------|-----|------|
| Supabase | `mcp__supabase__*` | DB操作・マイグレーション・Edge Functions |
| Cloudflare | `mcp__cloudflare__*` | R2ストレージ・Workers |
| Stripe | `mcp__stripe__*` | 商品・価格・サブスクリプション管理 |
| GitHub | `mcp__github__*` | リポジトリ・PR・Issue管理 |
| Vercel | `mcp__vercel__*` | デプロイ・環境変数管理 |
| Gemini | `mcp__gemini__*` | AI機能 |

## 自動セットアップ手順

このプロジェクトが空の場合、以下の手順で初期化を行います：

1. `npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"` を実行
2. 必要なパッケージをインストール:
   - `@supabase/supabase-js @supabase/ssr`
   - `next-auth@beta @auth/supabase-adapter`
   - `@aws-sdk/client-s3` (R2アクセス用)
   - `stripe @stripe/stripe-js`
3. Supabase プロジェクトをMCPで作成・設定
4. GitHub リポジトリをMCPで作成・接続
5. Vercel プロジェクトをMCPで作成・設定
6. 環境変数ファイル (`.env.local`) を生成
7. Stripe 商品・価格をMCPで設定

## 環境変数テンプレート

```.env.local
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth / Google OAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Gemini API
GEMINI_API_KEY=

# Vercel
VERCEL_TOKEN=
```

## 記事作成ルール

**記事を書く前に必ず `skills.md` を参照すること。**

| ルール | 内容 |
|--------|------|
| 文字数 | 5,000〜10,000字（本文のみ） |
| 参照ファイル | `skills.md`（タイトル設計・構成・学術照射・文体すべて記載） |
| 保存先 | `content/articles/YYYY-MM-DD-slug.md` |
| 記事作成フロー | skills.md の「記事作成フロー」セクション参照 |

記事作成を依頼されたら：
1. `skills.md` を Read ツールで参照する
2. カテゴリーを提案・確認する
3. タイトル候補を8本生成して最良を選ぶ
4. 学術分野（3〜5つ）を選定する
5. 執筆する（5,000〜10,000字）
6. `content/articles/YYYY-MM-DD-slug.md` として保存する

## コーディング規約

- TypeScript strict モード
- Tailwind CSS でスタイリング
- Server Components を優先、Client Components は最小限
- Supabase の RLS (Row Level Security) を必ず有効化
- API キーは環境変数で管理、コードに埋め込み禁止
- エラーハンドリングは Result 型パターンを推奨

## MCPを使った開発フロー

```
ユーザー要求
  → GitHub MCP でブランチ作成
  → コード実装
  → Supabase MCP でマイグレーション適用
  → GitHub MCP でPR作成
  → Vercel MCP でプレビューデプロイ確認
  → マージ → 本番デプロイ
```
