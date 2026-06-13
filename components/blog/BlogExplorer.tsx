"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BlogCard } from "./BlogCard";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage: any;
  publishedAt: string;
  estimatedReadingTime?: number;
  author?: {
    name: string;
    image?: any;
  };
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
}

interface BlogExplorerProps {
  posts: Post[];
  categories: Category[];
  initialCategorySlug?: string;
}

export function BlogExplorer({
  posts,
  categories,
  initialCategorySlug = "",
}: BlogExplorerProps) {
  const [activeCategory, setActiveCategory] =
    useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const matchesCategory =
        !activeCategory ||
        post.categories?.some((cat) => cat.slug.current === activeCategory);

      // Search filter
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories?.some((cat) =>
          cat.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-line pb-8">
        {/* Categories tag list */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("")}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              !activeCategory
                ? "bg-ink text-cream shadow-sm"
                : "bg-cream border border-line text-ink-soft hover:bg-ink hover:text-cream"
            }`}
          >
            All Topics
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              onClick={() => setActiveCategory(category.slug.current)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === category.slug.current
                  ? "bg-ink text-cream shadow-sm"
                  : "bg-cream border border-line text-ink-soft hover:bg-ink hover:text-cream"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm shrink-0">
          <span className="absolute inset-y-0 left-4 flex items-center text-ink-muted">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Search icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search journal..."
            aria-label="Search articles"
            className="w-full rounded-full border border-line bg-cream py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-muted/60 focus:border-terracotta focus:outline-none transition-all duration-300 shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-4 flex items-center text-ink-muted hover:text-terracotta cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Clear search</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Blog Grid with animations */}
      <div>
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-dashed border-line p-16 text-center"
          >
            <p className="font-display text-xl text-ink-soft">
              No journal entries found
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              We couldn't find anything matching your search. Try resetting the
              filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("");
                setSearchQuery("");
              }}
              className="btn-secondary mt-6 cursor-pointer"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  key={post._id}
                  className="h-full"
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
