"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  overlayColor?: string;
};

export function ImageReveal({ children, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>{children}</div>
  );
}
