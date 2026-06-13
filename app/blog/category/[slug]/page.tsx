import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { OrganicShape } from "@/components/shared/OrganicShape";
import { Reveal } from "@/components/shared/Reveal";
import { getClient } from "@/lib/sanity";
import {
  categoriesQuery,
  categoryBySlugQuery,
  postsQuery,
} from "@/lib/sanity-queries";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const client = getClient(false);
  const categories = await client.fetch(categoriesQuery);
  return categories.map((category: any) => ({ slug: category.slug.current }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(false);
  const category = await client.fetch(categoryBySlugQuery, { slug });

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.title} — Journal — Ina J Education`,
    description:
      category.description ||
      `Browse all journal entries in the ${category.title} category.`,
    openGraph: {
      title: `${category.title} — Journal — Ina J Education`,
      description:
        category.description ||
        `Browse all journal entries in the ${category.title} category.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const client = getClient(false);

  // Fetch the active category first to verify it exists
  const category = await client.fetch(categoryBySlugQuery, { slug });

  if (!category) {
    notFound();
  }

  // Fetch all posts and categories to power the full explorer
  const [categories, posts] = await Promise.all([
    client.fetch(categoriesQuery),
    client.fetch(postsQuery, { start: 0, end: 50 }),
  ]);

  return (
    <main className="bg-cream">
      {/* ── 1 · Hero / Header ── */}
      <section className="relative overflow-hidden bg-watercolor bg-dots bg-grain py-24 md:py-32 border-b border-line">
        <div className="container-editorial relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal from="up">
                <p className="eyebrow">Journal Topic</p>
                <h1 className="display-1 mt-6 text-balance text-ink">
                  Articles on{" "}
                  <span className="italic text-terracotta font-display font-light">
                    {category.title}
                  </span>
                </h1>
                {category.description ? (
                  <p className="lead mt-8 max-w-xl text-ink-soft">
                    {category.description}
                  </p>
                ) : (
                  <p className="lead mt-8 max-w-xl text-ink-soft">
                    Browse all of our articles, case studies, and advice in the{" "}
                    {category.title} space.
                  </p>
                )}
              </Reveal>
            </div>
            <div className="hidden lg:col-span-5 lg:flex lg:justify-center relative">
              <Reveal from="blur" delay={0.2}>
                <div className="relative h-64 w-64">
                  <OrganicShape
                    variant="blob-b"
                    className="absolute inset-0 text-cream-deep"
                    size={260}
                    opacity={0.85}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <OrganicShape
                      variant="paw"
                      className="text-terracotta/20 animate-pulse"
                      size={100}
                      opacity={0.35}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Main Blog Explorer ── */}
      <section className="section bg-cream">
        <div className="container-editorial">
          <Reveal from="up">
            <BlogExplorer
              posts={posts}
              categories={categories}
              initialCategorySlug={slug}
            />
          </Reveal>
        </div>
      </section>

      {/* ── 3 · Converting Exit Panel ── */}
      <section className="section bg-cream-deep/20 pt-0">
        <div className="container-editorial">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-grain panel-ink p-12 text-center shadow-xl md:p-20">
              {/* Background Paw Decorative Graphics */}
              <div className="absolute -left-12 -top-12 text-cream/3 opacity-[0.05] pointer-events-none select-none">
                <OrganicShape variant="paw" size={200} />
              </div>
              <div className="absolute -right-12 -bottom-12 text-cream/3 opacity-[0.05] pointer-events-none select-none">
                <OrganicShape variant="paw" size={240} />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="eyebrow text-terracotta">TRANSFORM YOUR STUDIO</p>
                <h2 className="display-2 mt-6 text-cream">
                  Ready to design a photography business that works?
                </h2>
                <p className="lead mt-6 text-cream/70">
                  Join the marketing and positioning workshop built for pet
                  photographers who want consistent bookings and higher average
                  sales.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link href="/coaching" className="btn-primary">
                    Explore Coaching containers
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-secondary border-cream/20 bg-transparent text-cream hover:bg-cream-warm hover:text-ink hover:border-cream-warm"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
