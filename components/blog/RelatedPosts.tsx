import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  posts: Array<{
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
  }>;
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <div className="py-6">
      <p className="eyebrow mb-4">Related Journal Entries</p>
      <h3 className="display-3 mb-10 text-ink">You might also read next</h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
