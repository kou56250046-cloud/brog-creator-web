"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

type Node = {
  id: string;
  label: string;
  type: "category" | "article";
  x: number;
  y: number;
  slug?: string;
};

type Edge = { from: string; to: string };

const CATEGORY_COLORS: Record<string, string> = {
  "心理・自己理解": "#6366f1",
  "人間関係": "#ec4899",
  "習慣・行動": "#f59e0b",
  "健康・睡眠": "#10b981",
  "お金・経済": "#3b82f6",
  "仕事・キャリア": "#8b5cf6",
  "社会・思想": "#ef4444",
  "祈り・神霊・生き方": "#a855f7",
  "自然共鳴": "#22c55e",
  "見えない現象の論理": "#06b6d4",
};

function getColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "#6b7280";
}

type Props = { articles: ArticleMeta[] };

export default function MapClient({ articles }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (el) setSize({ w: el.clientWidth, h: Math.max(500, el.clientWidth * 0.65) });
  }, []);

  useEffect(() => {
    const { w, h } = size;
    const categories = [...new Set(articles.map((a) => a.category))];
    const catCount = categories.length;

    // カテゴリノードを円周上に配置
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.32;

    const newNodes: Node[] = categories.map((cat, i) => {
      const angle = (i / catCount) * 2 * Math.PI - Math.PI / 2;
      return {
        id: `cat:${cat}`,
        label: cat,
        type: "category",
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });

    // 記事ノードをカテゴリの周囲に散布
    const catPositions: Record<string, { x: number; y: number }> = {};
    newNodes.forEach((n) => { catPositions[n.label] = { x: n.x, y: n.y }; });

    const articleNodes: Node[] = articles.map((a, i) => {
      const base = catPositions[a.category] ?? { x: cx, y: cy };
      const spread = 70;
      const angle = (i * 2.39996) % (2 * Math.PI); // 黄金角
      const r = spread * (0.4 + 0.6 * Math.random());
      return {
        id: `art:${a.slug}`,
        label: a.title.length > 20 ? a.title.slice(0, 18) + "…" : a.title,
        type: "article",
        x: base.x + r * Math.cos(angle),
        y: base.y + r * Math.sin(angle),
        slug: a.slug,
      };
    });

    const newEdges: Edge[] = articles.map((a) => ({
      from: `cat:${a.category}`,
      to: `art:${a.slug}`,
    }));

    setNodes([...newNodes, ...articleNodes]);
    setEdges(newEdges);
  }, [articles, size]);

  const { w, h } = size;

  return (
    <div className="w-full overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}>
      <svg ref={svgRef} width={w} height={h} style={{ display: "block" }}>
        {/* Edges */}
        {edges.map((e) => {
          const from = nodes.find((n) => n.id === e.from);
          const to = nodes.find((n) => n.id === e.to);
          if (!from || !to) return null;
          const isHov = hovered === e.from || hovered === e.to;
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={isHov ? getColor(from.label) : "var(--border)"}
              strokeWidth={isHov ? 1.5 : 0.8}
              strokeOpacity={isHov ? 0.7 : 0.4}
            />
          );
        })}

        {/* Article nodes */}
        {nodes.filter((n) => n.type === "article").map((n) => {
          const cat = edges.find((e) => e.to === n.id);
          const catNode = cat ? nodes.find((c) => c.id === cat.from) : null;
          const color = catNode ? getColor(catNode.label) : "#6b7280";
          const isHov = hovered === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              style={{ cursor: n.slug ? "pointer" : "default" }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => n.slug && window.location.assign(`/articles/${n.slug}`)}
            >
              <circle
                r={isHov ? 7 : 5}
                fill={color}
                opacity={isHov ? 1 : 0.6}
                style={{ transition: "r 0.15s, opacity 0.15s" }}
              />
              {isHov && (
                <text
                  y={-12}
                  textAnchor="middle"
                  fontSize={10}
                  fill="var(--fg)"
                  style={{ pointerEvents: "none" }}
                >
                  {n.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Category nodes */}
        {nodes.filter((n) => n.type === "category").map((n) => {
          const color = getColor(n.label);
          const isHov = hovered === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}
            >
              <circle
                r={isHov ? 22 : 18}
                fill={color}
                opacity={isHov ? 0.25 : 0.15}
                style={{ transition: "r 0.15s" }}
              />
              <circle r={5} fill={color} />
              <text
                y={isHov ? -26 : -22}
                textAnchor="middle"
                fontSize={isHov ? 11 : 10}
                fontWeight={isHov ? 600 : 400}
                fill={color}
                style={{ pointerEvents: "none", transition: "font-size 0.15s" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="px-4 pb-4 flex flex-wrap gap-3">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <span key={cat} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
            <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
