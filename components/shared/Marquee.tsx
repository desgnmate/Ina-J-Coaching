"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
};

export function Marquee({
  children,
  speed = 30,
  className = "",
  pauseOnHover = false,
  reverse = false,
}: Props) {
  const reduce = useReducedMotion();
  const duration = 100 / speed;

  return (
    <div
      className={`group relative flex w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        className="flex shrink-0 gap-12 pr-12"
        animate={
          reduce ? undefined : { x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }
        }
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
        style={pauseOnHover ? { willChange: "transform" } : undefined}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
