import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  headline: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  headlineClassName?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  headline,
  body,
  align = "left",
  className = "",
  eyebrowClassName = "",
  headlineClassName = "text-ink",
  as: Tag = "h2",
}: Props) {
  const isCenter = align === "center";
  return (
    <div
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""} ${className}`}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {eyebrow && (
        <p className={`eyebrow mb-5 ${eyebrowClassName}`}>{eyebrow}</p>
      )}
      <Tag
        className={`display-2 text-balance ${headlineClassName} ${
          Tag === "h1" ? "display-1" : ""
        }`}
      >
        {headline}
      </Tag>
      {body && (
        <p className={`lead mt-6 text-pretty ${isCenter ? "mx-auto" : ""}`}>
          {body}
        </p>
      )}
    </div>
  );
}
