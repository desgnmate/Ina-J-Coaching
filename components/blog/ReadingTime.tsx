"use client";

interface ReadingTimeProps {
  minutes: number;
}

export function ReadingTime({ minutes }: ReadingTimeProps) {
  return <span className="text-xs text-ink/50">{minutes} min read</span>;
}
