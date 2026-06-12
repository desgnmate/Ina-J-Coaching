"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type Phase = {
  year: string;
  label: string;
  title: string;
  body: string;
  image: {
    src: string;
    alt: string;
  };
};

type Props = {
  phases: Phase[];
};

export function JourneySection({ phases }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      Math.floor(v * phases.length + 0.18),
      phases.length - 1,
    );
    setActive(idx);
  });

  return (
    <section className="bg-watercolor panel-cream has-pattern relative">
      {/* ─── 1. Static Journey Header ─── */}
      <div
        className="container-editorial"
        style={{
          paddingTop: "clamp(5rem, 10vw, 8rem)",
          paddingBottom: "clamp(1rem, 2vw, 1.5rem)",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="grid items-end gap-6 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="eyebrow">The journey</p>
            <h2 className="display-2 mt-4 text-balance text-ink">
              From a heart dog to a{" "}
              <span className="italic text-terracotta">coaching practice.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="body-lg text-ink-soft">
              A four-act story &mdash; scroll through each phase of the journey
              that took Ina from photographing her heart dog to coaching
              photographers around the world.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 2. Pinned Story Experience ─── */}
      <div ref={scrollRef} style={{ height: `${phases.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-editorial relative w-full">
            <div className="grid items-center gap-8 lg:grid-cols-[46%_64px_minmax(0,1fr)] lg:gap-8">
              {/* Left · Image column */}
              <div className="col-span-12 lg:col-span-1">
                <div className="relative aspect-[16/10] sm:aspect-[4/5] w-full max-h-[65vh] overflow-hidden rounded-2xl bg-cream-deep shadow-[0_15px_50px_-15px_rgba(43,31,23,0.12)]">
                  <AnimatePresence initial={false} mode="sync">
                    <motion.div
                      key={phases[active].title}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        visibility: "visible",
                        pointerEvents: "auto",
                      }}
                    >
                      <Image
                        src={phases[active].image.src}
                        alt={phases[active].image.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="object-cover object-center"
                        priority={active === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Center · Timeline column (desktop only) */}
              <div
                className="hidden lg:block lg:col-span-1 relative w-16 h-[190px]"
                aria-hidden="true"
              >
                {/* Track line spanning first-dot → last-dot */}
                <div className="absolute left-6 top-[5px] bottom-[5px] w-px -translate-x-1/2 bg-line/25">
                  {/* Filled progress */}
                  <motion.div
                    className="absolute top-0 w-full bg-terracotta origin-top"
                    animate={{
                      height: `${(active / (phases.length - 1)) * 100}%`,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  />
                </div>

                {/* Markers */}
                <div className="absolute left-[19px] top-0 bottom-0 flex flex-col justify-between items-center">
                  {phases.map((p, idx) => (
                    <motion.div
                      key={p.title}
                      className="relative z-10 h-2.5 w-2.5 rounded-full border bg-cream-deep"
                      animate={{
                        borderColor:
                          idx <= active ? "#D46858" : "var(--color-line)",
                        backgroundColor: idx <= active ? "#D46858" : "#FFF8F3",
                        scale: active === idx ? 1.25 : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right · Content column */}
              <div
                className="relative col-span-12 flex min-h-[360px] items-center lg:col-span-1 lg:min-h-[420px]"
                style={{
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute left-0 right-0"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-terracotta font-medium">
                      {phases[active].year} &middot; Act{" "}
                      {String(active + 1).padStart(2, "0")}
                    </p>
                    <h3 className="display-3 mt-3 max-w-lg text-balance">
                      {phases[active].title}
                    </h3>
                    <p
                      className="mt-4 max-w-lg text-pretty"
                      style={{
                        fontSize: "1.0625rem",
                        lineHeight: 1.65,
                        color: "var(--color-ink)",
                      }}
                    >
                      {phases[active].body}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Mobile: scroll indicator dots */}
                <div className="mt-auto pt-8 flex items-center justify-center gap-2 lg:hidden w-full">
                  {phases.map((p, i) => (
                    <span
                      key={p.title}
                      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                        active === i ? "bg-terracotta" : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
