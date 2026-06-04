"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/lib/content";

const ease = [0.215, 0.61, 0.355, 1] as const;
const CYCLE_MS = 5000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const featured = testimonials.slice(0, 3);
  const total = featured.length;

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  // Viewport tracking to pause intervals when not in view
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

  // Auto-advance (paused when out of viewport)
  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(advance, CYCLE_MS);
    return () => clearInterval(id);
  }, [advance, isInView]);

  // Progress ticker (paused when out of viewport)
  // biome-ignore lint/correctness/useExhaustiveDependencies: active and isInView trigger interval reset
  useEffect(() => {
    setProgress(0);
    if (!isInView) return;

    const tick = 50;
    const id = setInterval(() => {
      setProgress((prev) => Math.min(prev + (tick / CYCLE_MS) * 100, 100));
    }, tick);
    return () => clearInterval(id);
  }, [active, isInView]);

  const goTo = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-cream-deep bg-grid section relative overflow-hidden"
    >
      {/* Decorative corner accents */}
      <div
        className="absolute top-12 left-12 h-20 w-20 border-l border-t border-terracotta/10 pointer-events-none hidden lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-12 h-20 w-20 border-r border-b border-terracotta/10 pointer-events-none hidden lg:block"
        aria-hidden="true"
      />

      <div className="container-editorial relative z-10">
        {/* ── Header ── */}
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionHeading
              eyebrow="Kind words from coaching clients"
              headline={
                <>
                  Real photographers.{" "}
                  <span className="italic text-terracotta">Real shifts.</span>
                </>
              }
              as="h2"
            />
          </div>
          <Reveal className="md:col-span-5">
            <p className="body-lg max-w-md md:ml-auto">
              Stories from pet photographers who wanted clearer marketing,
              better clients, and a business that felt more like their own.
            </p>
            <Link
              href="/testimonials"
              className="btn-ghost mt-6 inline-flex md:ml-auto"
            >
              Read all stories
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        {/* ── Featured Testimonial Spotlight ── */}
        <div className="relative mt-16 md:mt-24">
          {/* Index counter */}
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <span className="font-display text-sm text-terracotta tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-line/50 relative overflow-hidden">
              <motion.div
                key={`bar-${active}`}
                className="absolute inset-y-0 left-0 bg-terracotta/50"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
            <span className="font-display text-sm text-ink-muted tabular-nums">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            {/* Portrait */}
            <div className="md:col-span-4 flex justify-center md:justify-end order-2 md:order-1">
              <div className="relative h-56 w-56 md:h-72 md:w-72 lg:h-80 lg:w-80">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
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
                      className="object-cover rounded-[1.25rem] shadow-[0_20px_60px_-20px_rgba(43,31,23,0.2)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Quote */}
            <div className="md:col-span-8 order-1 md:order-2">
              <div className="relative">
                {/* Large decorative quote mark */}
                <span
                  className="absolute -top-8 -left-4 md:-top-14 md:-left-10 font-display text-[7rem] md:text-[10rem] leading-none text-terracotta/8 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={active}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                    transition={{ duration: 0.6, ease }}
                    className="relative z-10"
                  >
                    {featured[active].headline && (
                      <p className="font-display italic text-2xl md:text-3xl lg:text-[2.5rem] leading-snug text-terracotta text-balance mb-3">
                        {featured[active].headline}
                      </p>
                    )}
                    <p className="font-display text-xl md:text-2xl lg:text-[1.85rem] leading-snug text-ink/70 text-balance">
                      {featured[active].quote}
                    </p>
                  </motion.blockquote>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.figcaption
                    key={active}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-10 flex items-center gap-5"
                  >
                    <div className="h-px w-8 bg-terracotta/30" />
                    <div>
                      <span className="block text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-ink">
                        {featured[active].name}
                      </span>
                      <span className="block text-[0.65rem] uppercase tracking-[0.15em] text-ink-muted mt-0.5 font-[var(--font-script)] italic normal-case">
                        {featured[active].studio}
                      </span>
                    </div>
                  </motion.figcaption>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── Thumbnail Navigation ── */}
        <div className="mt-14 flex items-center justify-center gap-5 md:mt-20">
          {featured.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              className={`group relative flex flex-col items-center gap-3 transition-all duration-500 ${
                active === i ? "scale-105" : "scale-100 hover:scale-[1.03]"
              }`}
            >
              <div
                className={`relative h-12 w-12 overflow-hidden rounded-full transition-all duration-500 ${
                  active === i
                    ? "ring-2 ring-terracotta/40 shadow-[0_4px_16px_-4px_rgba(202,95,60,0.25)]"
                    : "ring-1 ring-line/40 opacity-55 group-hover:opacity-80"
                }`}
              >
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span
                className={`text-[0.6rem] uppercase tracking-[0.15em] transition-colors duration-400 ${
                  active === i ? "text-ink font-medium" : "text-ink-muted"
                }`}
              >
                {t.name.split(" ")[0]}
              </span>
              {/* Active dot */}
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
      </div>
    </section>
  );
}
