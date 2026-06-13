import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const getSlug = (value: any) => {
  if (!value?.children) return "";
  const text = value.children
    .filter((child: any) => child._type === "span")
    .map((span: any) => span.text)
    .join("");
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

interface PostBodyProps {
  content: any[];
}

export function PostBody({ content }: PostBodyProps) {
  const firstNormalIndex = content.findIndex(
    (block) => block._type === "block" && block.style === "normal",
  );

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value }) => {
        const id = getSlug(value);
        return (
          <h2 id={id} className="display-3 mt-12 mb-4">
            {children}
          </h2>
        );
      },
      h3: ({ children, value }) => {
        const id = getSlug(value);
        return (
          <h3 id={id} className="font-display mt-10 mb-3 text-2xl">
            {children}
          </h3>
        );
      },
      h4: ({ children }) => (
        <h4 className="font-display mt-8 mb-2 text-xl">{children}</h4>
      ),
      normal: ({ children, value }) => {
        const blockIndex = content.indexOf(value);
        const isFirstParagraph = blockIndex === firstNormalIndex;
        return (
          <p
            className={`body-lg mb-6 ${
              isFirstParagraph ? "editorial-drop-cap" : ""
            }`}
          >
            {children}
          </p>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-terracotta pl-6 italic text-ink/80">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="body-lg mb-6 list-disc pl-6">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="body-lg mb-6 list-decimal pl-6">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-2">{children}</li>,
      number: ({ children }) => <li className="mb-2">{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="rounded bg-cream-deep px-1.5 py-0.5 font-mono text-sm">
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const target = value?.blank ? "_blank" : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target ? "noopener noreferrer" : undefined}
            className="text-terracotta underline decoration-terracotta/30 transition-colors hover:decoration-terracotta"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      imageBlock: ({ value }) => {
        if (!value?.image) return null;
        return (
          <figure className="my-10 -mx-6 md:mx-0 md:rounded-2xl overflow-hidden">
            <Image
              src={urlFor(value.image).width(1200).url()}
              alt={value.image.alt || ""}
              width={1200}
              height={675}
              className="w-full object-cover"
            />
            {value.caption && (
              <figcaption className="mt-3 text-center text-xs text-ink/50">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      pullQuote: ({ value }) => (
        <figure className="my-12 border-l-4 border-terracotta pl-8">
          <blockquote className="font-display text-2xl italic leading-relaxed text-ink">
            "{value.text}"
          </blockquote>
          {value.attribution && (
            <figcaption className="mt-4 text-sm text-ink/60">
              — {value.attribution}
            </figcaption>
          )}
        </figure>
      ),
      callout: ({ value }) => {
        const borderColor =
          value.type === "warning"
            ? "border-l-amber-500"
            : value.type === "important"
              ? "border-l-red-500"
              : value.type === "note"
                ? "border-l-gold"
                : "border-l-terracotta";
        return (
          <div
            className={`my-8 rounded-2xl border-l-4 ${borderColor} bg-cream-warm/30 p-6`}
          >
            {value.title && (
              <h4 className="font-display mb-2 text-lg">{value.title}</h4>
            )}
            <p className="body">{value.text}</p>
          </div>
        );
      },
      codeBlock: ({ value }) => (
        <div className="my-8 overflow-hidden rounded-2xl">
          {value.filename && (
            <div className="border-b border-line bg-cream-deep px-4 py-2 font-mono text-xs text-ink/60">
              {value.filename}
            </div>
          )}
          <pre className="overflow-x-auto bg-cream-deep p-6">
            <code className="font-mono text-sm text-ink">{value.code}</code>
          </pre>
        </div>
      ),
      embedBlock: ({ value }) => (
        <div className="my-8 aspect-video overflow-hidden rounded-2xl">
          <iframe
            src={value.url}
            className="h-full w-full"
            allowFullScreen
            title="Embedded content"
          />
        </div>
      ),
      ctaBlock: ({ value }) => (
        <div className="my-8 rounded-2xl border border-line bg-cream-warm/30 p-8 text-center">
          <h3 className="font-display text-2xl">{value.title}</h3>
          {value.description && (
            <p className="mt-2 text-ink/70">{value.description}</p>
          )}
          <a
            href={value.buttonUrl}
            className={`mt-6 inline-block rounded-full px-8 py-3 font-medium transition-colors ${
              value.buttonVariant === "primary"
                ? "bg-terracotta text-white hover:bg-terracotta/90"
                : value.buttonVariant === "secondary"
                  ? "border border-line bg-cream text-ink hover:border-terracotta/25"
                  : "text-terracotta hover:text-terracotta/80"
            }`}
          >
            {value.buttonText}
          </a>
        </div>
      ),
    },
  };

  return (
    <div className="prose-custom">
      <PortableText value={content} components={components} />
    </div>
  );
}
