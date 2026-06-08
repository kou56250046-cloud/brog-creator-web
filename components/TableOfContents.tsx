"use client";

import { useEffect, useState, useRef } from "react";

type Heading = { id: string; text: string; level: number };

function extractHeadings(html: string): Heading[] {
  if (typeof window === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const nodes = doc.querySelectorAll("h2, h3");
  return Array.from(nodes).map((el, i) => {
    const id = el.id || `heading-${i}`;
    return { id, text: el.textContent ?? "", level: parseInt(el.tagName[1]) };
  });
}

type Props = { html: string };

export default function TableOfContents({ html }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setHeadings(extractHeadings(html));
  }, [html]);

  useEffect(() => {
    if (headings.length === 0) return;
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      className="hidden xl:block fixed left-[max(1rem,calc(50%-44rem))] top-32 w-56 text-xs"
      aria-label="目次"
    >
      <p
        className="mb-3 font-semibold text-[11px] tracking-widest uppercase"
        style={{ color: "var(--muted)" }}
      >
        目次
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.75rem" : 0 }}>
            <a
              href={`#${h.id}`}
              className="block leading-snug transition-colors duration-150 hover:text-[var(--accent)]"
              style={{
                color: active === h.id ? "var(--accent)" : "var(--muted)",
                fontWeight: active === h.id ? 600 : 400,
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
