import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { PostBody } from "@/components/blog/PostBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
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
    <main>
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={
            post.mainImage
              ? urlFor(post.mainImage).width(1600).height(900).url()
              : heroFallback
          }
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent" />
        <div className="absolute top-6 left-6">
          <a
            href="/blog"
            className="flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
          >
            <svg
              className="h-4 w-4"
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
          </a>
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="container-editorial pb-12">
            {post.categories?.[0] && (
              <p className="eyebrow text-cream/80">
                {post.categories[0].title}
              </p>
            )}
            <h1 className="display-1 mt-4 text-cream">{post.title}</h1>
            <div className="mt-6 flex items-center gap-4">
              {post.author?.image && (
                <Image
                  src={urlFor(post.author.image).width(40).height(40).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex items-center gap-3 text-sm text-cream/70">
                {post.author?.name && (
                  <span className="font-medium text-cream">
                    {post.author.name}
                  </span>
                )}
                {post.publishedAt && (
                  <>
                    <span>·</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container-editorial">
          <div className="mx-auto flex max-w-6xl gap-12">
            <div className="min-w-0 flex-1">
              <div className="mx-auto max-w-3xl">
                <PostBody content={post.body} />
              </div>
            </div>
            <aside className="hidden w-64 flex-shrink-0 lg:block">
              <TableOfContents content={post.body} />
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-line">
        <div className="container-editorial py-8">
          <div className="mx-auto max-w-3xl">
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </div>
      </section>

      {post.author && (
        <section className="border-t border-line">
          <div className="container-editorial">
            <div className="mx-auto max-w-3xl">
              <AuthorBio author={post.author} />
            </div>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="section panel-cream">
          <div className="container-editorial">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </section>
      )}

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
