import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";
import MapClient from "./MapClient";

export const metadata: Metadata = { title: "思考地図" };

export default function MapPage() {
  const articles = getAllArticles();

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-12"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <h1
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        思考地図
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        記事の関連性をカテゴリ単位でマップ化しています。ノードにカーソルを当てると記事タイトルが表示されます。
      </p>
      <MapClient articles={articles} />
    </div>
  );
}
