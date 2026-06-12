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
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1450778869180-cfe0f6b5ad40?w=600&h=450&fit=crop",
];

function getFallbackImage(title: string) {
  const hash = title
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <article className="overflow-hidden transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={
              post.mainImage
                ? urlFor(post.mainImage).width(600).height(450).url()
                : getFallbackImage(post.title)
            }
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {post.categories?.[0] && (
            <span className="absolute top-4 left-4 text-xs font-medium uppercase tracking-wider text-cream bg-ink/40 backdrop-blur-sm rounded-full px-3 py-1">
              {post.categories[0].title}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-terracotta">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center gap-3 text-xs text-ink-muted">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(24).height(24).url()}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
            {post.estimatedReadingTime && (
              <ReadingTime minutes={post.estimatedReadingTime} />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
