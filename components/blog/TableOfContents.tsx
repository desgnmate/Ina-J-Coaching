"use client";

import { useEffect, useRef, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: any[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const extractedHeadings: TOCItem[] = [];

    for (const block of content) {
      if (block._type === "block" && ["h2", "h3"].includes(block.style)) {
        const text = block.children
          ?.filter((child: any) => child._type === "span")
          .map((span: any) => span.text)
          .join("");

        if (text) {
          extractedHeadings.push({
            id: text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, ""),
            text,
            level: block.style === "h2" ? 2 : 3,
          });
        }
      }
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) {
        observerRef.current.observe(element);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-24">
      <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-ink-muted">
        On this page
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : 0 }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm transition-colors ${
                activeId === heading.id
                  ? "border-l-2 border-terracotta pl-3 text-terracotta"
                  : "border-l-2 border-transparent pl-3 text-ink-muted hover:text-ink"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
