import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

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
    <div className="py-12 md:py-16">
      <div className="flex flex-col gap-8 rounded-[2rem] border border-line bg-cream p-8 shadow-[0_12px_35px_-15px_rgba(68,53,61,0.03)] sm:flex-row sm:items-start md:p-12">
        {author.image && (
          <div className="relative h-28 w-28 md:h-32 md:w-32 flex-shrink-0 mx-auto sm:mx-0 sm:mt-1.5">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-cream shadow-sm">
              <Image
                src={urlFor(author.image).width(128).height(128).url()}
                alt={author.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 128px"
              />
            </div>
          </div>
        )}

        <div className="flex-1 text-center sm:text-left">
          <span className="eyebrow text-[0.65rem] tracking-[0.2em] text-terracotta">
            About the Author
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-ink mt-2 leading-tight">
            {author.name}
          </h3>
          {author.role && (
            <p className="text-xs font-semibold text-ink-muted mt-1 uppercase tracking-wider">
              {author.role}
            </p>
          )}
          {author.bio && (
            <div className="mt-5 text-sm md:text-[0.9375rem] leading-relaxed text-ink-soft max-w-2xl">
              <PortableText value={author.bio} components={bioComponents} />
            </div>
          )}
          {author.socialLinks && (
            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 border-t border-line/45 pt-4 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              <span className="text-[0.65rem] text-ink-muted uppercase tracking-[0.15em]">
                Connect:
              </span>
              {author.socialLinks.instagram && (
                <a
                  href={author.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-terracotta link-underline pb-0.5"
                >
                  Instagram
                </a>
              )}
              {author.socialLinks.website && (
                <a
                  href={author.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-terracotta link-underline pb-0.5"
                >
                  Website
                </a>
              )}
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-terracotta link-underline pb-0.5"
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
