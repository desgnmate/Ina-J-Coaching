import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";

const bioComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => <p className="text-sm text-ink/70">{children}</p>,
	},
};

interface AuthorBioProps {
	author: {
		name: string;
		image?: any;
		role?: string;
		bio?: any[];
		socialLinks?: {
			instagram?: string;
			website?: string;
			linkedin?: string;
		};
	};
}

export function AuthorBio({ author }: AuthorBioProps) {
	return (
		<div className="py-8">
			<div className="flex flex-col gap-6 sm:flex-row sm:items-start">
				{author.image && (
					<div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
						<Image
							src={urlFor(author.image).width(80).height(80).url()}
							alt={author.name}
							fill
							className="object-cover"
						/>
					</div>
				)}
				<div>
					<h3 className="font-display text-xl">{author.name}</h3>
					{author.role && (
						<p className="mt-1 text-sm text-terracotta">{author.role}</p>
					)}
					{author.bio && (
						<div className="mt-4">
							<PortableText value={author.bio} components={bioComponents} />
						</div>
					)}
					{author.socialLinks && (
						<div className="mt-4 flex gap-3">
							{author.socialLinks.instagram && (
								<a
									href={author.socialLinks.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className="text-ink/40 transition-colors hover:text-terracotta"
								>
									Instagram
								</a>
							)}
							{author.socialLinks.website && (
								<a
									href={author.socialLinks.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-ink/40 transition-colors hover:text-terracotta"
								>
									Website
								</a>
							)}
							{author.socialLinks.linkedin && (
								<a
									href={author.socialLinks.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-ink/40 transition-colors hover:text-terracotta"
								>
									LinkedIn
								</a>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
