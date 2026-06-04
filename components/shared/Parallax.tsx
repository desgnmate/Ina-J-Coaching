"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
  axis?: "y" | "x";
  range?: [number, number];
};

export function Parallax({
  children,
  speed = 0.2,
  className = "",
  axis = "y",
  range,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = 120 * speed;
  const output = useTransform(
    scrollYProgress,
    [0, 1],
    range ?? (axis === "y" ? [distance, -distance] : [-distance, distance]),
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { [axis]: output }}>
        {children}
      </motion.div>
    </div>
  );
}
