"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { outcomes } from "@/lib/content";

export function Outcomes() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [spotlight, setSpotlight] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const outcomesData = [
    { title: "Clarity", text: outcomes.items?.[0] ?? "" },
    { title: "Positioning", text: outcomes.items?.[1] ?? "" },
    { title: "Confidence", text: outcomes.items?.[2] ?? "" },
    { title: "Experience", text: outcomes.items?.[3] ?? "" },
    { title: "Strategy", text: outcomes.items?.[4] ?? "" },
    { title: "Presence", text: outcomes.items?.[5] ?? "" },
  ].filter((item) => item.text);

  const total = outcomesData.length;

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hovered !== null || !isInView) return;
    const id = setInterval(advance, 3400);
    return () => clearInterval(id);
  }, [advance, hovered, isInView]);

  useEffect(() => {
    const index = hovered ?? active;
    const grid = gridRef.current;
    const card = cardRefs.current[index];
    if (!grid || !card) return;

    const updateSpotlight = () => {
      const gridRect = grid.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      setSpotlight({
        x: cardRect.left - gridRect.left + cardRect.width * 0.06,
        y: cardRect.top - gridRect.top + cardRect.height * 0.12,
        width: cardRect.width * 0.88,
        height: cardRect.height * 0.76,
        opacity: 1,
      });
    };

    updateSpotlight();

    const resizeObserver = new ResizeObserver(updateSpotlight);
    resizeObserver.observe(grid);
    resizeObserver.observe(card);
    window.addEventListener("resize", updateSpotlight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSpotlight);
    };
  }, [active, hovered]);

  return (
    <section className="bg-cream section relative overflow-hidden">
      <div className="container-editorial relative">
        <div className="grid grid-cols-1 border-t border-b border-line/60 lg:grid-cols-12">
          <div className="border-b border-line/60 py-10 pr-4 md:py-12 lg:col-span-4 lg:border-r lg:border-b-0 lg:py-16 lg:pr-12">
            <SectionHeading
              eyebrow={outcomes.eyebrow}
              headline={outcomes.headline}
              as="h2"
              className="!mt-0"
            />
            <p className="lead mt-6 max-w-sm text-ink-soft">
              These outcomes represent the foundational shifts you&apos;ll build
              inside your photography business. Turning chaotic guesswork into
              clear systems.
            </p>
          </div>

          <div className="relative lg:col-span-8 lg:-mt-px">
            <div
              ref={gridRef}
              className="relative grid grid-cols-1 gap-x-3 gap-y-3 p-4 md:grid-cols-2 lg:gap-x-3 lg:gap-y-3 lg:p-4"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute rounded-full bg-terracotta/45 blur-[80px] transition-all duration-[1000ms] ease-out"
                style={{
                  left: spotlight.x,
                  top: spotlight.y,
                  width: spotlight.width,
                  height: spotlight.height,
                  opacity: spotlight.opacity,
                }}
              />

              {outcomesData.map((item, i) => {
                const isActive =
                  hovered === i || (hovered === null && active === i);

                return (
                  <button
                    key={item.title}
                    type="button"
                    ref={(element) => {
                      cardRefs.current[i] = element;
                    }}
                    className={`group relative flex h-full min-h-[128px] w-full flex-col justify-center overflow-hidden rounded-[24px] p-6 text-left transition-[transform,background-color,border-color,box-shadow] duration-[1000ms] lg:min-h-[136px] ${
                      isActive
                        ? "-translate-y-2.5 scale-[1.01] border border-terracotta/14 bg-cream shadow-[0_30px_72px_rgba(0,0,0,0.1)]"
                        : "border border-line/70 bg-cream-deep shadow-none"
                    }`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-[1000ms] ${
                        isActive
                          ? "bg-white/35 opacity-100"
                          : "bg-white/15 opacity-0"
                      }`}
                    />
                    <span
                      className={`mb-2 block font-sans text-[0.68rem] font-bold uppercase tracking-[0.2em] transition-colors duration-[900ms] ${
                        isActive ? "text-terracotta" : "text-terracotta/80"
                      }`}
                    >
                      {item.title}
                    </span>
                    <p className="relative z-10 text-pretty font-display text-[1.16rem] leading-relaxed text-ink md:text-[1.24rem]">
                      {item.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
