"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Phase = {
  year: string;
  label: string;
  title: string;
  body: string;
};

type Props = {
  phases: Phase[];
  sectionRef: RefObject<HTMLElement | null>;
};

export function JourneyBody({ phases, sectionRef }: Props) {
  const pinRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=112",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });
    }, sectionRef);

    const observers: IntersectionObserver[] = [];
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(i);
          });
        },
        { threshold: 0.3, rootMargin: "-15% 0px -15% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      ctx.revert();
      for (const o of observers) o.disconnect();
    };
  }, [sectionRef]);

  return (
    <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
      {/* Pinned timeline — pinned to viewport for full section scroll */}
      <div ref={pinRef} className="hidden lg:block lg:col-span-3 self-start">
        <div className="relative pl-4 pt-2">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line/60" />
          <div
            className="absolute left-[7px] top-2 w-px bg-terracotta origin-top transition-[height] duration-500"
            style={{ height: `${(active / (phases.length - 1)) * 85}%` }}
          />
          <ol className="space-y-16">
            {phases.map((p, i) => (
              <li key={p.year} className="relative flex items-start gap-4">
                <span
                  className={`relative z-10 mt-1.5 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 transition-colors duration-500 ${
                    active === i
                      ? "border-terracotta bg-terracotta"
                      : "border-line bg-cream-deep"
                  }`}
                />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-terracotta">
                    {p.year}
                  </p>
                  <p className="mt-1 font-display text-sm italic text-ink">
                    {p.label}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Year rows — scroll normally */}
      <div className="md:col-span-12 lg:col-span-9 space-y-20">
        {phases.map((t, i) => (
          <div
            key={t.title}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
          >
            <div className="border-l-2 border-terracotta/30 pl-6 md:pl-10">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-terracotta">
                {t.year} · Act {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-display text-6xl italic leading-none text-ink md:text-7xl">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display-3 mt-6 max-w-xl text-balance">
                {t.title}
              </h3>
              <p
                className="mt-4 max-w-2xl text-pretty"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.65,
                  color: "var(--color-ink)",
                }}
              >
                {t.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
