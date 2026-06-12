"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  overlayColor?: string;
};

export function ImageReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.1,
  direction = "right",
  overlayColor = "var(--color-cream-deep)",
}: Props) {
  const getOverlayInitial = () => {
    switch (direction) {
      case "up":
        return { top: "100%", bottom: 0, left: 0, right: 0 };
      case "down":
        return { top: 0, bottom: "100%", left: 0, right: 0 };
      case "left":
        return { left: "100%", right: 0, top: 0, bottom: 0 };
      default:
        return { left: 0, right: "100%", top: 0, bottom: 0 };
    }
  };

  const getOverlayAnimate = () => {
    switch (direction) {
      case "up":
        return { top: ["100%", "0%", "0%"], bottom: ["0%", "0%", "100%"] };
      case "down":
        return { top: ["0%", "0%", "100%"], bottom: ["100%", "0%", "0%"] };
      case "left":
        return { left: ["100%", "0%", "0%"], right: ["0%", "0%", "100%"] };
      default:
        return { left: ["0%", "0%", "100%"], right: ["100%", "0%", "0%"] };
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Sweep overlay overlay */}
      <motion.div
        initial={getOverlayInitial()}
        whileInView={getOverlayAnimate()}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration,
          delay,
          ease: [0.76, 0, 0.24, 1], // Custom editorial clip curve
        }}
        style={{
          position: "absolute",
          zIndex: 10,
          backgroundColor: overlayColor,
        }}
        aria-hidden="true"
      />
      {/* Zoom and opacity content fade */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: duration * 0.9,
          delay: delay + duration * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
