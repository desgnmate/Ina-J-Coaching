import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  headline: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  headline,
  body,
  align = "left",
  className = "",
  eyebrowClassName = "",
  as: Tag = "h2",
}: Props) {
  const isCenter = align === "center";
  return (
    <div
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow mb-5 ${eyebrowClassName}`}>{eyebrow}</p>
      )}
      <Tag
        className={`display-2 text-balance text-ink ${
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
