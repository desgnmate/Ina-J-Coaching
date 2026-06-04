"use client";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
};

export function SplitChars({
  children,
  as: Tag = "h1",
  className = "",
}: Props) {
  return <Tag className={className}>{children}</Tag>;
}
