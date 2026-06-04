"use client";

type Props = {
  className?: string;
  width?: number | string;
  height?: number;
  delay?: number;
  direction?: "left" | "right";
  color?: string;
};

export function LineDraw({
  className = "",
  width = "100%",
  height = 1,
  color = "currentColor",
}: Props) {
  return (
    <span
      aria-hidden
      className={`block ${className}`}
      style={{ width, height, background: color }}
    />
  );
}
