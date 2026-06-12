"use client";

import { motion } from "framer-motion";
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

export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  from = "up",
  duration = 0.8,
  once = true,
  amount = 0.05,
}: Props) {
  const Tag = motion(as as ElementType);

  const getVariants = () => {
    switch (from) {
      case "up":
        return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return {
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
        return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        };
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(8px)" },
          visible: { opacity: 1, filter: "blur(0px)" },
        };
      default:
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom warm cubic-bezier transition
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
