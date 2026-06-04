"use client";

import { Compass, Quotes, ShareNetwork, Target } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";

type ValueItem = {
  title: string;
  body: string;
  statement?: string;
};

type Props = {
  values: ValueItem[];
};

const manifesto = [
  {
    title: "Storytelling",
    body: "The best businesses aren't built on tactics—they're built on stories people remember. We uncover what makes your voice unique and build a brand narrative that connects instantly.",
  },
  {
    title: "Clarity",
    body: "Vague offers get vague results. We make your messaging, offer, and client experience crystal clear so you can speak directly to the right parents.",
  },
  {
    title: "Connection",
    body: "Photography and coaching are human work. We build a premium client experience that turns inquiries into booked clients who trust your creative authority.",
  },
  {
    title: "Intention",
    body: "Strategy isn't about doing more—it's about focus. We replace overwhelm with a custom plan built to protect your lifestyle and creative energy.",
  },
];

function ValueIcon({ index, active }: { index: number; active: boolean }) {
  const stroke = active ? "#CA5F3C" : "#5A463A";
  const weight = "light";

  return (
    <div
      className="h-12 w-12 flex items-center justify-center transition-colors duration-500"
      style={{ color: stroke }}
    >
      {index === 0 && <Quotes size={36} weight={weight} />}
      {index === 1 && <Compass size={36} weight={weight} />}
      {index === 2 && <ShareNetwork size={36} weight={weight} />}
      {index === 3 && <Target size={36} weight={weight} />}
    </div>
  );
}

export function AboutValues({ values }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Use custom manifesto values with the statements, fallback to prop if empty
  const items =
    manifesto.length === (values?.length ?? 0) ? manifesto : (values ?? []);

  // Monitor viewport center to highlight active card on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -45% 0px", // Isolates vertical middle area of viewport
      threshold: 0.15,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(
            entry.target as HTMLDivElement,
          );
          if (index !== -1) {
            setActiveStep(index);
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-dots panel-cream section has-pattern relative overflow-x-clip py-24 md:py-32">
      {/* Ambient Terracotta Glow Accents */}
      <div className="absolute top-1/4 right-12 -z-10 h-80 w-80 rounded-full bg-terracotta/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 -z-10 h-80 w-80 rounded-full bg-terracotta/4 blur-[120px] pointer-events-none" />

      <div className="container-editorial relative">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Sticky Left Column - Headline & Copy */}
          <div className="md:col-span-5 md:sticky md:top-28 h-fit">
            <Reveal from="left">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-terracotta/90">
                The philosophy
              </span>
              <h2 className="display-2 mt-4 text-balance text-ink font-display leading-tight">
                What coaching with Ina{" "}
                <span className="italic text-terracotta font-display">
                  feels like.
                </span>
              </h2>
              <p className="lead mt-6 max-w-sm text-ink-soft leading-relaxed">
                Four principles guide every conversation, every strategy, and
                every piece of feedback. They&rsquo;re the same things that
                built the photography brand.
              </p>
            </Reveal>
          </div>

          {/* Right Column - Stacking Premium Cards */}
          <div className="md:col-span-7 relative flex flex-col gap-8 md:gap-12 pb-12 md:pb-20 sticky-manifesto-cards">
            {items.map((item, i) => {
              const isActive = i === activeStep;

              return (
                <div
                  key={item.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="sticky transition-transform duration-500 will-change-transform"
                  style={{
                    top: `calc(var(--sticky-top) + ${i * 36}px)`,
                    zIndex: i + 1,
                    transform: isActive ? "scale(1.015)" : "scale(0.985)",
                  }}
                >
                  {/* Softened Terracotta Ambient Glow Layer behind card (sibling to avoid nested backdrop-filter blur rendering) */}
                  <div
                    className="absolute inset-0 -z-10 rounded-[2rem] bg-terracotta/8 transition-opacity duration-[800ms] pointer-events-none"
                    style={{
                      filter: "blur(32px)",
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  {/* Card Container - Stacked with a premium multi-directional shadow for physical depth */}
                  <div
                    className={`group relative rounded-[2rem] border transition-all duration-500 p-8 md:p-10 select-none will-change-[transform,box-shadow] ${
                      isActive
                        ? "border-terracotta/25 bg-white/95 shadow-[0_-8px_30px_-10px_rgba(43,31,23,0.03),_0_20px_50px_-16px_rgba(202,95,60,0.12)]"
                        : "border-white/60 bg-[#faf6f0]/90 shadow-[0_-4px_16px_-12px_rgba(43,31,23,0.02),_0_10px_24px_-20px_rgba(43,31,23,0.04)]"
                    }`}
                    style={{
                      WebkitBackdropFilter: isActive
                        ? "blur(24px)"
                        : "blur(16px)",
                      backdropFilter: isActive ? "blur(24px)" : "blur(16px)",
                    }}
                  >
                    {/* Gloss border reflect highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                    <div
                      className={`flex flex-col relative overflow-hidden transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {/* Top Header Row: Icon, Title & Step Identifier */}
                      <div className="flex justify-between items-start w-full">
                        <div className="flex gap-4 items-center z-10">
                          <div className="flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                            <ValueIcon index={i} active={isActive} />
                          </div>

                          <div className="flex flex-col">
                            <span
                              className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                                isActive
                                  ? "text-terracotta"
                                  : "text-ink-soft/75"
                              }`}
                            >
                              Principle {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-display text-xl md:text-2xl text-ink mt-1 transition-colors duration-300 group-hover:text-terracotta">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Description Block */}
                      <div className="mt-4 md:pl-16 z-10">
                        <p className="text-pretty text-ink-soft leading-relaxed text-base">
                          {item.body}
                        </p>
                      </div>
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
