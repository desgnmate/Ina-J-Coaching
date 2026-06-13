import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { PostBody } from "@/components/blog/PostBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { OrganicShape } from "@/components/shared/OrganicShape";
import { Reveal } from "@/components/shared/Reveal";
import { getClient, urlFor } from "@/lib/sanity";
import {
  postBySlugQuery,
  postSlugsQuery,
  relatedPostsQuery,
} from "@/lib/sanity-queries";

export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const client = getClient(false);
  const slugs = await client.fetch(postSlugsQuery);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(false);
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  const imageUrl = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

  return {
    title: `${title} — Ina J Education`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const client = getClient(isDraft);

  let post: any = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch post from Sanity:", error);
  }

  if (!post) {
    notFound();
  }

  let relatedPosts: any[] = [];
  try {
    relatedPosts =
      post.categories?.length > 0
        ? await client.fetch(relatedPostsQuery, {
            postId: post._id,
            categoryIds: post.categories.map((cat: any) => cat._id),
          })
        : [];
  } catch (error) {
    console.error("Failed to fetch related posts:", error);
  }

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://inajeducation.com"}/blog/${slug}`;

  const heroFallbackImages = [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1450778869180-cfe0f6b5ad40?w=1600&h=900&fit=crop",
  ];
  const heroHash = post.title
    .split("")
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const heroFallback = heroFallbackImages[heroHash % heroFallbackImages.length];

  return (
    <main className="bg-cream">
      {/* ── 1 · Editorial Title Header ── */}
      <section className="relative overflow-hidden bg-watercolor bg-dots bg-grain border-b border-line pt-20 pb-12">
        <div className="container-editorial relative z-10">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-terracotta"
            >
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Back arrow</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Journal
            </Link>
          </div>

          <Reveal from="up">
            {post.categories?.[0] && (
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-terracotta">
                {post.categories[0].title}
              </span>
            )}
            <h1 className="display-1 mt-4 text-pretty text-ink max-w-4xl leading-tight">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-line/40 pt-6">
              <div className="flex items-center gap-3">
                {post.author?.image && (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-line">
                    <Image
                      src={urlFor(post.author.image).width(40).height(40).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  {post.author?.name && (
                    <p className="text-sm font-semibold text-ink">
                      By {post.author.name}
                    </p>
                  )}
                  {post.author?.role && (
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink-muted">
                      {post.author.role}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-muted">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                )}
                {post.publishedAt && post.estimatedReadingTime && (
                  <span aria-hidden>·</span>
                )}
                {post.estimatedReadingTime && (
                  <span>{post.estimatedReadingTime} min read</span>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2 · Cinematic Landscape Hero Image ── */}
      <section className="bg-cream pt-12 pb-6">
        <div className="container-editorial">
          <Reveal from="blur" duration={1}>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-line bg-cream-deep shadow-md">
              <Image
                src={
                  post.mainImage
                    ? urlFor(post.mainImage).width(1600).height(685).url()
                    : heroFallback
                }
                alt={post.mainImage?.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3 · Main Article Content & Sidebar ── */}
      <article className="bg-cream py-12">
        <div className="container-editorial">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row">
            {/* Body Text */}
            <div className="min-w-0 flex-1">
              <div className="mx-auto max-w-3xl">
                <PostBody content={post.body} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full shrink-0 lg:w-64">
              <div className="sticky top-28 space-y-10">
                <TableOfContents content={post.body} />

                {/* Coaching Spotlight Converting Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-line bg-cream-warm/15 p-6 shadow-[0_8px_30px_rgb(68,53,61,0.02)]">
                  {/* Subtle decorative paw element */}
                  <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-terracotta/5 pointer-events-none select-none">
                    <OrganicShape variant="paw" size={80} />
                  </div>

                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-terracotta">
                    Coaching Spotlight
                  </span>
                  <h4 className="font-display text-lg mt-3 text-ink leading-snug">
                    Want a photography business that actually books?
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                    Ina Jalil grew her studio from $40k to $305k+ while shooting
                    less. Explore workshops and mastermind support containers.
                  </p>
                  <Link
                    href="/coaching"
                    className="btn-secondary mt-5 w-full text-center text-xs py-2 bg-cream text-terracotta border-line hover:border-terracotta/30 flex justify-center items-center gap-1"
                  >
                    Learn with Ina
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ── 4 · Share Buttons ── */}
      <section className="border-t border-line bg-cream">
        <div className="container-editorial py-8">
          <div className="mx-auto max-w-3xl">
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </div>
      </section>

      {/* ── 5 · Author Bio Column ── */}
      {post.author && (
        <section className="border-t border-line bg-cream-warm/10">
          <div className="container-editorial">
            <div className="mx-auto max-w-3xl">
              <AuthorBio author={post.author} />
            </div>
          </div>
        </section>
      )}

      {/* ── 6 · Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="section panel-cream border-t border-line">
          <div className="container-editorial">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </section>
      )}

      {/* ── 7 · Converting Exit Panel ── */}
      <section className="section bg-cream-deep/20 pt-16">
        <div className="container-editorial">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-grain panel-ink p-12 text-center shadow-xl md:p-20">
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
