"use client";

import type { ElementType, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  from?: Direction;
  duration?: number;
  amount?: number;
  className?: string;
  as?:
    | "div"
    | "section"
    | "article"
    | "li"
    | "span"
    | "p"
    | "header"
    | "footer"
    | "ul"
    | "figure";
  once?: boolean;
};

export function Reveal({ children, className = "", as = "div" }: Props) {
  const Tag = as as ElementType;
  return <Tag className={className}>{children}</Tag>;
}
