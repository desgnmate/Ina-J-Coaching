"use client";

import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { offer } from "@/lib/content";
import { images } from "@/lib/images";

const coachingPillars = [
  {
    label: "Clarity",
    body: "Uncover your voice and define your ideal client.",
  },
  {
    label: "Positioning",
    body: "Structure pricing to reflect your creative authority.",
  },
  {
    label: "Marketing",
    body: "Create a repeatable plan for consistent inquiries.",
  },
  {
    label: "Experience",
    body: "Refine the client journey to drive repeat referrals.",
  },
] as const;

export function Offer() {
  return (
    <section className="section relative overflow-hidden py-20 md:py-28">
      <div className="container-editorial relative">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-0 relative">
          {/* Image Column - Visual cover occupying ~55% section width */}
          <div className="relative z-0 md:col-span-7">
            <Reveal from="left" duration={0.8}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-[#e3d6bf]/20 shadow-[0_30px_70px_-20px_rgba(43,31,23,0.22)] md:aspect-[3/4] lg:aspect-[4/5] md:-my-12 md:-ml-8">
                <Image
                  src={images.offer.src}
                  alt={images.offer.alt}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                  priority
                />

                {/* Premium film grain and shadow gradients */}
                <div className="absolute inset-0 bg-grain pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/20 to-transparent pointer-events-none" />

                {/* Magazine-style caption overlays */}
                <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start pointer-events-none">
                  <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-cream/90 bg-ink/30 px-3.5 py-1.5 rounded-full backdrop-blur-[2px] border border-white/10">
                    INA J. COACHING
                  </span>
                  <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-cream/70">
                    EDITION № 01
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                  <p className="eyebrow text-terracotta-soft tracking-[0.22em] mb-2">
                    {offer.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl italic text-cream md:text-3xl lg:text-4xl leading-tight max-w-sm text-balance">
                    {offer.program}
                  </h3>
                  <p className="text-[0.6rem] tracking-[0.18em] uppercase text-cream/50 mt-4">
                    EST. 2024 / CANBERRA, AU
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Frosted Glass Content Column - Overlapping the cover image */}
          <div className="relative z-10 md:col-span-5 md:-ml-20">
            {/* Ambient Terracotta Glow */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-terracotta/12 blur-[100px] pointer-events-none" />

            <Reveal from="right" duration={0.8} delay={0.15}>
              <div className="relative rounded-[2rem] border border-white/40 bg-cream/72 p-8 md:p-10 lg:p-12 shadow-[0_30px_70px_-30px_rgba(43,31,23,0.25)] backdrop-blur-md">
                {/* Gloss/Reflect top edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                <h2 className="display-3 text-balance text-ink leading-tight">
                  Practical coaching for clearer, more{" "}
                  <em className="italic text-terracotta">
                    consistent bookings
                  </em>
                  .
                </h2>

                {/* Strategic Coaching Pillars */}
                <ul className="mt-7 space-y-3">
                  {coachingPillars.map((pillar) => (
                    <li
                      key={pillar.label}
                      className="flex items-baseline gap-3"
                    >
                      <span className="shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-terracotta border border-terracotta/30 rounded-full px-3 py-1">
                        {pillar.label}
                      </span>
                      <span className="text-[0.8rem] leading-relaxed text-ink-soft">
                        {pillar.body}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Call To Action Action Bar */}
                <div className="mt-10 pt-6 border-t border-line/30">
                  <Button
                    href={offer.cta.href}
                    variant="primary"
                    className="shadow-[0_4px_20px_-4px_rgba(202,95,60,0.35)]"
                  >
                    {offer.cta.label}
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
