import { BlogCard } from "./BlogCard";

interface BlogGridProps {
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

export function BlogGrid({ posts }: BlogGridProps) {
	if (!posts.length) {
		return (
			<div className="py-12 text-center">
				<p className="text-lg text-ink/50">No posts found</p>
			</div>
		);
	}

	return (
		<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<BlogCard key={post._id} post={post} />
			))}
		</div>
	);
}
