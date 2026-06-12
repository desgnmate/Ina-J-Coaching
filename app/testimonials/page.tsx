"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Marquee } from "@/components/shared/Marquee";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StickyCta } from "@/components/shared/StickyCta";
import { clientResults, site } from "@/lib/content";
import { images } from "@/lib/images";

const tickerItems = [
  "Named client results",
  "Real numbers",
  "No composite quotes",
  "$9,000 sale",
  "Fully booked spring",
  "BarkHop Studio",
  "Clearer sales process",
  "Stronger studio direction",
];

const resultFilters = ["All", "Named client result", "BarkHop Studio"];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("All");

  const filteredResults = clientResults.filter((result) => {
    if (filter === "All") return true;
    return result.business.toLowerCase() === filter.toLowerCase();
  });

  return (
    <>
      {/* ── 1 · Hero ── */}
      <section className="bg-grid bg-noise-cream relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div className="container-editorial relative z-10 text-center">
          <Reveal from="up">
            <span className="eyebrow">CLIENT RESULTS</span>
            <h1 className="display-1 mt-4 text-balance text-ink">
              Real outcomes from the{" "}
              <span className="italic text-terracotta font-display">
                coaching.
              </span>
            </h1>
            <p className="lead mt-6 max-w-xl mx-auto text-ink-soft">
              This page uses the factual client-result points named in the
              website brief. It does not present unverified or composite
              testimonial quotes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2 · Ticker Marquee ── */}
      <div className="bg-cream-warm/30 border-y border-line py-6 overflow-hidden">
        <Marquee
          speed={25}
          className="flex gap-12 text-ink-muted text-xs font-semibold tracking-[0.2em] uppercase"
        >
          <div className="flex gap-16 shrink-0">
            {tickerItems.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      {/* ── 3 · Star Grid masonry ── */}
      <section className="bg-cream-deep bg-dots section has-pattern py-20 md:py-28">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Approved results"
              headline={
                <>
                  Outcomes from the{" "}
                  <span className="italic text-terracotta font-display">
                    coaching.
                  </span>
                </>
              }
              body="These are the named client results currently supported by the brief. No direct testimonial quotes are shown unless they are separately approved."
              className="!mb-0"
            />
            {/* Filters */}
            <div className="flex gap-2 shrink-0">
              {resultFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-xs font-medium tracking-[0.02em] transition-all cursor-pointer ${
                    filter === f
                      ? "bg-ink text-cream shadow-sm"
                      : "bg-cream border border-line text-ink-soft hover:bg-cream-warm/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredResults.map((result) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={result.name}
                  className="group relative w-full rounded-[2rem] border border-line bg-cream p-8 shadow-[0_12px_30px_-15px_rgba(68,53,61,0.1)] hover:border-terracotta/25 transition-[border-color,box-shadow] duration-300 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
                      {result.business}
                    </p>
                    <p className="mt-4 font-display text-3xl text-terracotta md:text-4xl">
                      {result.figure}
                    </p>
                    <p className="mt-5 text-sm md:text-base text-ink leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-line/45 pt-6">
                    <div>
                      <h4 className="font-display text-sm text-ink font-semibold">
                        {result.name}
                      </h4>
                      <span className="inline-block text-[0.55rem] font-bold tracking-[0.1em] text-terracotta uppercase mt-2 bg-cream-warm/40 px-2 py-0.5 rounded">
                        Client result
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 4 · Bottom CTA ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[480px] w-full md:h-[560px]">
          <Image
            src={images.cta.src}
            alt={images.cta.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grain"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink/85"
          />
        </div>

        <div className="container-editorial absolute inset-0 flex items-center">
          <Reveal className="mx-auto max-w-2xl text-center text-cream">
            <h2 className="display-2 text-balance text-cream">
              Ready to grow your photography studio?
            </h2>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              Book a call with Ina to map out where your business stands, choose
              the right support container, and outline your next 90 days.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={site.bookingHref} variant="primary">
                Book a call
                <span aria-hidden>→</span>
              </Button>
              <Button
                href="/coaching"
                variant="secondary"
                className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
              >
                Explore Coaching
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyCta href={site.bookingHref} label="Book a call" />
    </>
  );
}
