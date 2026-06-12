import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getClient } from "@/lib/sanity";
import {
  categoriesQuery,
  featuredPostsQuery,
  postsQuery,
} from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Blog — Ina J Education",
  description:
    "Insights and strategies for pet photographers who want to build a profitable business they love.",
  openGraph: {
    title: "Blog — Ina J Education",
    description:
      "Insights and strategies for pet photographers who want to build a profitable business they love.",
    type: "website",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const client = getClient(false);

  const [posts, categories, featuredPosts] = await Promise.all([
    client.fetch(postsQuery, { start: 0, end: 20 }),
    client.fetch(categoriesQuery),
    client.fetch(featuredPostsQuery),
  ]);

  return (
    <main>
      <section className="section bg-grain bg-noise-cream">
        <div className="container-editorial">
          <p className="eyebrow">From the Journal</p>
          <h1 className="display-1 mt-6">
            Insights for pet photographers who want more
          </h1>
          <p className="lead mt-8 max-w-2xl">
            Strategies, stories, and soulful business advice to help you build a
            photography business that lights you up.
          </p>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="section-tight">
          <div className="container-editorial">
            <p className="eyebrow mb-6">Featured</p>
            <BlogCard post={featuredPosts[0]} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-editorial">
          <Suspense fallback={null}>
            <BlogFilters categories={categories} />
          </Suspense>
          <div className="mt-10">
            <BlogGrid posts={posts} />
          </div>
        </div>
      </section>

      <section className="section bg-grain panel-ink">
        <div className="container-editorial text-center">
          <h2 className="display-2 text-cream">
            Ready to transform your photography business?
          </h2>
          <p className="lead mx-auto mt-6 max-w-xl text-cream/60">
            Join the workshop that's helped hundreds of pet photographers build
            businesses they love.
          </p>
          <a href="/coaching" className="btn-primary mt-10 inline-block">
            Explore Coaching
          </a>
        </div>
      </section>
    </main>
  );
}
