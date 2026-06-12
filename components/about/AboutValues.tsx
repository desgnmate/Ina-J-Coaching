"use client";

import { Compass, Quotes, ShareNetwork, Target } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

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
    body: "The best businesses aren't built on tactics. They're built on stories people remember. We uncover what makes your voice unique and build a brand narrative that connects instantly.",
  },
  {
    title: "Clarity",
    body: "Vague offers get vague results. We make your messaging, offer, and client experience crystal clear so you can speak directly to the right parents.",
  },
  {
    title: "Connection",
    body: "Photography and coaching are human work. We build a premium client experience that turns enquiries into booked clients who trust your creative authority.",
  },
  {
    title: "Intention",
    body: "Strategy isn't about doing more. It's about focus. We replace overwhelm with a custom plan built to protect your lifestyle and creative energy.",
  },
];

function ValueIcon({ index, active }: { index: number; active: boolean }) {
  const stroke = active ? "#D46858" : "#715860";
  const weight = "light";

  return (
    <div
      className="flex h-12 w-12 items-center justify-center transition-colors duration-500"
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

  const items =
    manifesto.length === (values?.length ?? 0) ? manifesto : (values ?? []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = cardRefs.current.indexOf(
            entry.target as HTMLDivElement,
          );
          if (index !== -1) {
            setActiveStep(index);
          }
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.15,
      },
    );

    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-dots panel-cream section has-pattern relative overflow-x-clip py-24 md:py-32">
      <div className="pointer-events-none absolute right-12 top-1/4 -z-10 h-80 w-80 rounded-full bg-terracotta/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/3 -z-10 h-80 w-80 rounded-full bg-gold/8 blur-[120px]" />

      <div className="container-editorial relative">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="h-fit md:sticky md:top-28 md:col-span-5">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-terracotta/90">
              The philosophy
            </span>
            <h2 className="display-2 mt-4 text-balance font-display leading-tight text-ink">
              What coaching with Ina{" "}
              <span className="font-display italic text-terracotta">
                feels like.
              </span>
            </h2>
            <p className="lead mt-6 max-w-sm leading-relaxed text-ink-soft">
              Four principles guide every conversation, every strategy, and
              every piece of feedback. They&apos;re the same things that built
              the photography brand.
            </p>
          </div>

          <div className="sticky-manifesto-cards relative flex flex-col gap-8 pb-12 md:col-span-7 md:gap-12 md:pb-20">
            {items.map((item, i) => {
              const isActive = i === activeStep;

              return (
                <div
                  key={item.title}
                  ref={(element) => {
                    cardRefs.current[i] = element;
                  }}
                  className="sticky transition-transform duration-500 will-change-transform"
                  style={{
                    top: `calc(var(--sticky-top) + ${i * 36}px)`,
                    zIndex: i + 1,
                    transform: isActive ? "scale(1.015)" : "scale(0.985)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-terracotta/10 transition-opacity duration-[800ms]"
                    style={{
                      filter: "blur(32px)",
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <div
                    className={`group relative rounded-[2rem] border p-8 transition-all duration-500 select-none will-change-[transform,box-shadow] md:p-10 ${
                      isActive
                        ? "border-terracotta/25 bg-cream shadow-[0_-8px_30px_-10px_rgba(43,31,23,0.03),_0_20px_50px_-16px_rgba(212,104,88,0.12)]"
                        : "border-white/60 bg-cream-warm/90 shadow-[0_-4px_16px_-12px_rgba(43,31,23,0.02),_0_10px_24px_-20px_rgba(43,31,23,0.04)]"
                    }`}
                    style={{
                      WebkitBackdropFilter: isActive
                        ? "blur(24px)"
                        : "blur(16px)",
                      backdropFilter: isActive ? "blur(24px)" : "blur(16px)",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                    <div
                      className={`relative flex flex-col overflow-hidden transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      <div className="flex w-full items-start justify-between">
                        <div className="z-10 flex items-center gap-4">
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
                            <h3 className="mt-1 font-display text-xl text-ink transition-colors duration-300 group-hover:text-terracotta md:text-2xl">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="z-10 mt-4 md:pl-16">
                        <p className="text-pretty text-base leading-relaxed text-ink-soft">
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
