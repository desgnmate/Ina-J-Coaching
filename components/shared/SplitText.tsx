"use client";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
  mode?: "word" | "line";
};

export function SplitText({ children, as: Tag = "h2", className = "" }: Props) {
  return <Tag className={className}>{children}</Tag>;
}
