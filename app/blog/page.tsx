import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { OrganicShape } from "@/components/shared/OrganicShape";
import { Reveal } from "@/components/shared/Reveal";
import { images } from "@/lib/images";
import { getClient, urlFor } from "@/lib/sanity";
import {
  categoriesQuery,
  featuredPostsQuery,
  postsQuery,
} from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Journal — Ina J Education",
  description:
    "Insights and strategies for pet photographers who want to build a profitable business they love.",
  openGraph: {
    title: "Journal — Ina J Education",
    description:
      "Insights and strategies for pet photographers who want to build a profitable business they love.",
    type: "website",
  },
};

export const revalidate = 60;

const FEATURED_FALLBACK =
  "https://image12.photobiz.com/7732/7_20241118054934_13874038_xlarge.jpg";

export default async function BlogPage() {
  const client = getClient(false);

  let posts: any[] = [];
  let categories: any[] = [];
  let featuredPosts: any[] = [];

  try {
    [posts, categories, featuredPosts] = await Promise.all([
      client.fetch(postsQuery, { start: 0, end: 50 }),
      client.fetch(categoriesQuery),
      client.fetch(featuredPostsQuery),
    ]);
  } catch (error) {
    console.error("Failed to fetch blog data from Sanity:", error);
  }

  const featuredPost = featuredPosts[0];
  // Filter out the featured post from the general list passed to the explorer so there's no duplication
  const remainingPosts = featuredPost
    ? posts.filter((post) => post._id !== featuredPost._id)
    : posts;

  return (
    <main className="bg-cream">
      {/* ── 1 · Hero / Header ── */}
      <section className="relative overflow-hidden bg-watercolor bg-dots bg-grain py-24 md:py-32 border-b border-line">
        <div className="container-editorial relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal from="up">
                <p className="eyebrow">From the Journal</p>
                <h1 className="display-1 mt-6 text-balance text-ink">
                  Insights for pet photographers who want{" "}
                  <span className="italic text-terracotta font-display">
                    more.
                  </span>
                </h1>
                <p className="lead mt-8 max-w-xl text-ink-soft">
                  Strategies, stories, and soulful business advice to help you
                  build a profitable photography business that lights you up.
                </p>
              </Reveal>
            </div>
            <div className="hidden lg:col-span-5 lg:block relative">
              <Reveal from="blur" delay={0.2}>
                <div className="relative">
                  {/* Main Image Card */}
                  <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-[0_20px_50px_-20px_rgba(68,53,61,0.12)]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={images.about.src}
                        alt="Two dogs sitting together under autumn trees"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <span className="inline-block rounded-full bg-terracotta/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-cream backdrop-blur-sm">
                          The Journal
                        </span>
                        <h3 className="mt-3 font-display text-xl text-cream leading-snug">
                          Stories from the studio floor
                        </h3>
                        <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                          Real strategies, real results, real dogs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Featured Post Banner ── */}
      {featuredPost && (
        <section className="section-tight bg-cream-deep/20 border-b border-line">
          <div className="container-editorial">
            <Reveal from="up">
              <p className="eyebrow mb-8">Featured Entry</p>
            </Reveal>

            <Reveal from="scale" duration={0.9} delay={0.1}>
              <Link
                href={`/blog/${featuredPost.slug.current}`}
                className="group block overflow-hidden rounded-[2.5rem] border border-line bg-cream shadow-[0_12px_40px_-15px_rgba(68,53,61,0.04)] transition-all duration-500 hover:border-terracotta/20 hover:shadow-[0_24px_50px_-15px_rgba(68,53,61,0.08)]"
              >
                <div className="flex flex-col lg:flex-row min-h-[460px]">
                  {/* Image Area */}
                  <div className="relative min-h-[280px] w-full overflow-hidden bg-cream-deep lg:w-[58%]">
                    <Image
                      src={
                        featuredPost.mainImage
                          ? urlFor(featuredPost.mainImage)
                              .width(1200)
                              .height(675)
                              .url()
                          : FEATURED_FALLBACK
                      }
                      alt={featuredPost.mainImage?.alt || featuredPost.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>

                  {/* Copy Area */}
                  <div className="flex flex-col justify-between p-8 md:p-12 lg:w-[42%]">
                    <div>
                      {featuredPost.categories?.[0] && (
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-terracotta">
                          {featuredPost.categories[0].title}
                        </span>
                      )}

                      <h2 className="mt-4 font-display text-2xl leading-snug text-ink transition-colors duration-300 group-hover:text-terracotta md:text-3xl lg:text-4xl">
                        {featuredPost.title}
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
                          {featuredPost.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between border-t border-line/45 pt-6 text-xs text-ink-muted">
                      <div className="flex items-center gap-3">
                        {featuredPost.author && (
                          <>
                            {featuredPost.author.image && (
                              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-line">
                                <Image
                                  src={urlFor(featuredPost.author.image)
                                    .width(32)
                                    .height(32)
                                    .url()}
                                  alt={featuredPost.author.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <span className="font-semibold text-ink/80 text-sm">
                              {featuredPost.author.name}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {featuredPost.publishedAt && (
                          <time dateTime={featuredPost.publishedAt}>
                            {new Date(
                              featuredPost.publishedAt,
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        )}
                        {featuredPost.publishedAt &&
                          featuredPost.estimatedReadingTime && (
                            <span aria-hidden>·</span>
                          )}
                        {featuredPost.estimatedReadingTime && (
                          <span>
                            {featuredPost.estimatedReadingTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── 3 · Main Blog Explorer ── */}
      <section className="section bg-cream">
        <div className="container-editorial">
          <Reveal from="up">
            <BlogExplorer posts={remainingPosts} categories={categories} />
          </Reveal>
        </div>
      </section>

      {/* ── 4 · Converting Exit Panel ── */}
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
