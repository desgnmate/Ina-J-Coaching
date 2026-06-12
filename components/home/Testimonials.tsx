"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clientResults } from "@/lib/content";

const ease = [0.215, 0.61, 0.355, 1] as const;
const CYCLE_MS = 5000;
const fallbackPhotos = [
  "/images/testimonials/silvia.jpg",
  "/images/testimonials/lisa.jpg",
  "/images/testimonials/julia.jpg",
];

const DEFAULT_HEADLINE = (
  <>
    Real photographers.{" "}
    <span className="italic text-terracotta">Real shifts.</span>
  </>
);

type TestimonialsProps = {
  eyebrow?: string;
  headline?: ReactNode;
  body?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const TestimonialsHeader = memo(function TestimonialsHeader({
  eyebrow,
  headline,
  body,
  ctaHref,
  ctaLabel,
}: Required<TestimonialsProps>) {
  return (
    <div className="grid items-end gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-cream">
          {eyebrow}
        </span>
        <h2 className="display-2 mt-4 text-balance text-cream">{headline}</h2>
      </div>
      <div className="md:col-span-5">
        <div className="flex flex-col items-start md:ml-auto md:max-w-md">
          <p className="body-lg text-cream/82">{body}</p>
          <Link
            href={ctaHref}
            className="btn-ghost mt-6 inline-flex border-b-cream text-cream hover:border-b-terracotta hover:text-terracotta"
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
});

type SpotlightProps = {
  active: number;
  featured: Array<{
    name: string;
    business: string;
    figure: string;
    summary: string;
    photo: string;
  }>;
  total: number;
  isInView: boolean;
  onSelect: (index: number) => void;
};

const TestimonialsSpotlight = memo(function TestimonialsSpotlight({
  active,
  featured,
  total,
  isInView,
  onSelect,
}: SpotlightProps) {
  return (
    <>
      <div className="relative mt-16 md:mt-24">
        <div className="mb-8 flex items-center gap-3 md:mb-12">
          <span className="font-display text-sm text-cream tabular-nums">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-cream/20">
            <motion.div
              key={`bar-${active}`}
              className="absolute inset-y-0 left-0 bg-terracotta"
              initial={{ width: "0%" }}
              animate={{ width: isInView ? "100%" : "0%" }}
              transition={{
                duration: isInView ? CYCLE_MS / 1000 : 0,
                ease: "linear",
              }}
            />
          </div>
          <span className="font-display text-sm text-cream/65 tabular-nums">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="order-2 flex justify-center md:order-1 md:col-span-4 md:justify-end">
            <div className="relative h-56 w-56 md:h-72 md:w-72 lg:h-80 lg:w-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`portrait-${active}`}
                  initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.04, rotate: 2 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={featured[active].photo}
                    alt={featured[active].name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="rounded-[1.25rem] object-cover shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-8">
            <div className="relative">
              <span
                className="pointer-events-none absolute -top-8 -left-4 select-none font-display text-[7rem] leading-none text-cream/12 md:-top-14 md:-left-10 md:text-[10rem]"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`quote-${active}`}
                  initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                  transition={{ duration: 0.65, ease }}
                  className="relative z-10"
                >
                  <p className="mb-3 text-balance font-display text-2xl italic leading-snug text-terracotta md:text-3xl lg:text-[2.5rem]">
                    {featured[active].figure}
                  </p>
                  <p className="text-balance font-display text-xl leading-snug text-cream/88 md:text-2xl lg:text-[1.85rem]">
                    {featured[active].summary}
                  </p>
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.figcaption
                  key={`caption-${active}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.45, delay: 0.15, ease }}
                  className="mt-10 flex items-center gap-5"
                >
                  <div className="h-px w-8 bg-cream/25" />
                  <div>
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream">
                      {featured[active].name}
                    </span>
                    <span className="mt-0.5 block font-[var(--font-script)] text-[0.65rem] italic tracking-[0.15em] text-cream/65 normal-case">
                      {featured[active].business}
                    </span>
                  </div>
                </motion.figcaption>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-center gap-5 md:mt-20">
        {featured.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelect(i)}
            className={`group relative flex flex-col items-center gap-3 transition-all duration-500 ${
              active === i ? "scale-105" : "scale-100 hover:scale-[1.03]"
            }`}
          >
            <div
              className={`relative h-12 w-12 overflow-hidden rounded-full transition-all duration-500 ${
                active === i
                  ? "ring-2 ring-terracotta shadow-[0_4px_16px_-4px_rgba(212,104,88,0.3)]"
                  : "ring-1 ring-cream/25 opacity-65 group-hover:opacity-85"
              }`}
            >
              <Image
                src={item.photo}
                alt={item.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <span
              className={`text-[0.6rem] uppercase tracking-[0.15em] transition-colors duration-400 ${
                active === i ? "font-medium text-cream" : "text-cream/60"
              }`}
            >
              {item.name.split(" ")[0]}
            </span>
            {active === i && (
              <motion.div
                layoutId="activeDot"
                className="absolute -bottom-2 h-1 w-1 rounded-full bg-terracotta"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </>
  );
});

export function Testimonials({
  eyebrow = "Client results",
  headline = DEFAULT_HEADLINE,
  body = "Named client outcomes from the coaching brief, using factual business shifts rather than unrelated photography testimonials.",
  ctaHref = "/results",
  ctaLabel = "Read all results",
}: TestimonialsProps) {
  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const featured = useMemo(
    () =>
      clientResults.slice(0, 3).map((item, index) => ({
        ...item,
        photo: fallbackPhotos[index],
      })),
    [],
  );
  const total = featured.length;

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(advance, CYCLE_MS);
    return () => clearInterval(id);
  }, [advance, isInView]);

  return (
    <section
      ref={sectionRef}
      className="bg-ink bg-grid section relative overflow-hidden text-cream"
    >
      <div
        className="pointer-events-none absolute top-12 left-12 hidden h-20 w-20 border-l border-t border-cream/12 lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-12 bottom-12 hidden h-20 w-20 border-r border-b border-cream/12 lg:block"
        aria-hidden="true"
      />

      <div className="container-editorial relative z-10">
        <TestimonialsHeader
          eyebrow={eyebrow}
          headline={headline}
          body={body}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
        />

        <TestimonialsSpotlight
          active={active}
          featured={featured}
          total={total}
          isInView={isInView}
          onSelect={setActive}
        />
      </div>
    </section>
  );
}
