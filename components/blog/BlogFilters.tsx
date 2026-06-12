"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BlogFiltersProps {
  categories: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  activeCategory?: string;
}

export function BlogFilters({ categories, activeCategory }: BlogFiltersProps) {
  const searchParams = useSearchParams();

  return (
    <div>
      <p className="eyebrow mb-4">Browse by topic</p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            !activeCategory
              ? "bg-terracotta text-white"
              : "border border-line text-ink hover:border-terracotta/25 hover:text-terracotta"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/blog/category/${category.slug.current}`}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === category.slug.current
                ? "bg-terracotta text-white"
                : "border border-line text-ink hover:border-terracotta/25 hover:text-terracotta"
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
