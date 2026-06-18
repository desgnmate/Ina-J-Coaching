"use client";

import { ChatCenteredText, Compass, Sparkle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pillars } from "@/lib/content";

const methodology = [
  {
    number: "01",
    title: "Clear Messaging",
    description:
      "Get specific about who you serve, what you stand for, and why a client should choose you. No more vague captions or generic offers.",
  },
  {
    number: "02",
    title: "Intentional Marketing",
    description:
      "Replace guesswork with a simple, repeatable marketing plan that attracts enquiries from the right people, even when you're not posting every day.",
  },
  {
    number: "03",
    title: "Better Client Experience",
    description:
      "Design a client journey from first enquiry to final artwork that builds trust, creates desire, and turns one session into repeat and referred bookings.",
  },
] as const;

function MethodologyIcon({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  const stroke = active ? "#D46858" : "#715860";
  const weight = "light";

  return (
    <div
      className="h-12 w-12 flex items-center justify-center transition-colors duration-500"
      style={{ color: stroke }}
    >
      {index === 0 && <ChatCenteredText size={36} weight={weight} />}
      {index === 1 && <Compass size={36} weight={weight} />}
      {index === 2 && <Sparkle size={36} weight={weight} />}
    </div>
  );
}

const PillarsIntro = memo(function PillarsIntro() {
  return (
    <Reveal from="left">
      <SectionHeading
        eyebrow={pillars.eyebrow}
        headline={
          <>
            Practical coaching from someone who&apos;s{" "}
            <span className="italic text-terracotta">built it.</span>{" "}
          </>
        }
        as="h2"
        className="!mt-0"
      />
      <p className="lead mt-6 max-w-sm text-ink-soft leading-relaxed">
        Posting more isn&rsquo;t the solution. Ina&apos;s methodology directly
        solves the friction points in your client journey, transforming creative
        talent into a strategic, repeatable business model.
      </p>
    </Reveal>
  );
});

export function Pillars() {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  // Tracks the last committed active step without triggering re-renders.
  // Used by the scroll handler to skip no-op setState calls.
  const activeStepRef = useRef(0);

  // Active-card detection: on every scroll, find the card whose vertical
  // center is closest to the viewport center and mark it active.
  //
  // Why not IntersectionObserver: IO only fires when an element's
  // intersection state *changes*. During a fast scroll a card can be
  // skipped (its state never meaningfully intersects the trigger zone,
  // or two state changes arrive in a single batch and the intermediate
  // card is never seen). Tracking the closest-to-center card from a
  // scroll listener is deterministic — every scroll tick re-evaluates
  // all three cards against the current viewport, so going 3 → 1 has to
  // pass through 2. requestAnimationFrame coalesces the work to one
  // update per frame.
  useEffect(() => {
    let raf: number | null = null;

    const recompute = () => {
      raf = null;
      if (typeof window === "undefined") return;

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < cardRefs.current.length; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== activeStepRef.current) {
        activeStepRef.current = closestIndex;
        setActiveStep(closestIndex);
      }
    };

    const schedule = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(recompute);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Compute once on mount so the initial render is in sync with the
    // current scroll position (covers the case where the page is loaded
    // already scrolled past the section).
    recompute();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf !== null) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Calculate heights of active dots on mount and resize
  const [heights, setHeights] = useState<number[]>([6, 6, 6]);

  useEffect(() => {
    const handleResize = () => {
      const h0 = 6;
      const h1 = cardRefs.current[1] ? cardRefs.current[1].offsetTop + 6 : 280;
      const h2 = cardRefs.current[2] ? cardRefs.current[2].offsetTop + 6 : 560;
      setHeights([h0, h1, h2]);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const activeCircles = [activeStep >= 0, activeStep >= 1, activeStep >= 2];

  return (
    <section
      ref={containerRef}
      className="bg-cream-deep bg-dots section has-pattern relative overflow-hidden py-24 md:py-32"
    >
      <div className="container-editorial relative">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Sticky Left Column - Headline & Copy */}
          <div className="h-fit md:sticky md:top-28 md:col-span-5">
            <PillarsIntro />
          </div>

          {/* Right Column - Vertically Aligned Cards & Interactive Connector System */}
          <div
            style={
              {
                "--timeline-left": "12px",
                "--pad-left": "36px",
                "--dot-offset": "-5px",
                paddingLeft: "var(--pad-left)",
              } as React.CSSProperties
            }
            className="md:col-span-7 relative md:[--pad-left:54px] md:[--timeline-left:16px] flex flex-col gap-5 md:gap-6"
          >
            {/* Visual vertical timeline connectors - closer to left edge */}
            <div
              style={{ left: "var(--timeline-left)" }}
              className="absolute top-[46px] bottom-0 w-[2px] bg-line/70"
            />

            {/* Animated Progress Line */}
            <motion.div
              style={{ left: "var(--timeline-left)" }}
              animate={{ height: heights[activeStep] }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="absolute top-[46px] w-[2px] bg-terracotta origin-top z-10"
            />

            {methodology.map((item, i) => {
              const isActive = i === activeStep;
              const isCircleActive = activeCircles[i];

              return (
                <div
                  key={item.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="relative"
                >
                  {/* Static Milestone Marker along the vertical timeline - geometrically centered to align with the timeline path */}
                  <div
                    style={{
                      left: "calc(var(--timeline-left) - var(--pad-left) + var(--dot-offset))",
                    }}
                    className={`absolute top-[46px] h-3 w-3 rounded-full border-2 transition-all duration-500 z-20 ${
                      isCircleActive
                        ? "border-terracotta bg-terracotta shadow-[0_0_8px_2px_rgba(212,104,88,0.2)]"
                        : "border-line bg-cream"
                    }`}
                  />

                  {/* Card Container - No horizontal or vertical staggered offsets */}
                  <div
                    className={`group relative rounded-[2rem] border p-8 select-none transition-[border-color,background-color,box-shadow,opacity,transform] duration-500 ease-out md:p-10 overflow-hidden ${
                      isActive
                        ? "border-terracotta/40 bg-cream opacity-100 scale-100 shadow-[0_20px_40px_-20px_rgba(212,104,88,0.18)]"
                        : "border-line/60 bg-cream/70 opacity-55 scale-[0.97] shadow-[0_4px_12px_-18px_rgba(68,53,61,0.04)]"
                    }`}
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    {/* Gloss border reflect highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                    <div className="flex flex-col relative overflow-hidden">
                      {/* Top Header Row: Icon, Title & Step Identifier */}
                      <div className="flex justify-between items-start w-full">
                        <div className="flex gap-4 items-center z-10">
                          <div className="flex-shrink-0">
                            <MethodologyIcon index={i} active={isActive} />
                          </div>

                          <div className="flex flex-col">
                            <span
                              className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                                isActive
                                  ? "text-terracotta"
                                  : "text-ink-soft/75"
                              }`}
                            >
                              Step {item.number}
                            </span>
                            <h3 className="mt-1 font-display text-xl text-ink transition-colors duration-300 md:text-2xl">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Description Block */}
                      <p className="mt-4 text-pretty text-ink-soft leading-relaxed text-sm md:text-base md:pl-16 z-10">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
