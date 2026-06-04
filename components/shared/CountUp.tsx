"use client";

import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: (n: number) => string;
};

export function CountUp({
  to,
  duration = 1.8,
  prefix = "",
  suffix = "",
  className = "",
  format,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motion = useMotionValue(0);
  const spring = useSpring(motion, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) =>
    format ? format(v) : Math.round(v).toString(),
  );
  const [text, setText] = useState(format ? format(0) : "0");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      motion.set(to);
      return;
    }
    motion.set(to);
  }, [inView, to, motion, reduce]);

  useEffect(() => {
    return display.on("change", (v) => setText(v));
  }, [display]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
