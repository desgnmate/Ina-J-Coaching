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
  height?: string;
  className?: string;
};

/**
 * A scroll-driven sticky reveal: the left column pins while the right
 * column scrolls past, fading each child in as it aligns.
 */
export function StickyScroll({
  children,
  height = "300vh",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div ref={ref} style={{ height }} className={`relative ${className}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-editorial w-full">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <motion.div
                style={reduce ? undefined : { y, scale }}
                className="will-change-transform"
              >
                {children}
              </motion.div>
            </div>
            <div className="lg:col-span-7" />
          </div>
        </div>
      </div>
    </div>
  );
}
