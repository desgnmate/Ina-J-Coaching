"use client";

import type { ReactNode } from "react";

type Props = {
  quote: ReactNode;
  attribution?: ReactNode;
  className?: string;
};

export function PullQuote({ quote, attribution, className = "" }: Props) {
  return (
    <div className={className}>
      <blockquote className="text-pretty font-display text-lg md:text-2xl leading-relaxed text-ink">
        {quote}
      </blockquote>
      {attribution && (
        <div className="mt-6 text-sm uppercase tracking-[0.18em] text-ink-soft">
          {attribution}
        </div>
      )}
    </div>
  );
}
