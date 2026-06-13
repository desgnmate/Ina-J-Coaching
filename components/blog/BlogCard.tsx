import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { ReadingTime } from "./ReadingTime";

interface BlogCardProps {
  post: {
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
      color?: string;
    }>;
  };
}

const FALLBACK_IMAGES = [
  "https://image12.photobiz.com/7732/7_20241118054934_13874038_xlarge.jpg",
  "https://image11.photobiz.com/8586/7_20230217021456_12724968_xlarge.jpg",
  "https://image14.photobiz.com/10152/7_20230217021420_12724964_large.jpg",
  "https://image5.photobiz.com/8905/7_20230217021529_12724976_xlarge.jpg",
];

function getFallbackImage(title: string) {
  const hash = title
    .split("")
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-cream p-5 shadow-[0_12px_30px_-15px_rgba(68,53,61,0.04)] transition-all duration-300 hover:border-terracotta/20 hover:shadow-[0_20px_40px_-15px_rgba(68,53,61,0.08)]">
        {/* Image wrapper */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-cream-deep">
          <Image
            src={
              post.mainImage
                ? urlFor(post.mainImage).width(600).height(375).url()
                : getFallbackImage(post.title)
            }
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Text details */}
        <div className="flex flex-1 flex-col pt-5">
          {post.categories?.[0] && (
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-terracotta">
              {post.categories[0].title}
            </span>
          )}

          <h3 className="mt-3 font-display text-xl leading-snug text-ink transition-colors duration-300 group-hover:text-terracotta md:text-2xl">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Metadata */}
          <div className="mt-6 flex items-center justify-between border-t border-line/45 pt-4 text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              {post.author && (
                <>
                  {post.author.image && (
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={urlFor(post.author.image)
                          .width(24)
                          .height(24)
                          .url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium text-ink/75">
                    {post.author.name}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              )}
              {post.publishedAt && post.estimatedReadingTime && (
                <span aria-hidden>·</span>
              )}
              {post.estimatedReadingTime && (
                <ReadingTime minutes={post.estimatedReadingTime} />
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
