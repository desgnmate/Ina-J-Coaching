"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { CountUp } from "@/components/shared/CountUp";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

const resultsData = [
  {
    name: "Yunet Solorzano",
    business: "Yunet Solorzano Photography",
    figure: 9000,
    figurePrefix: "$",
    figureSuffix: " sale",
    program: "Mastermind",
    summary:
      "Yunet refined her premium positioning and structured her sales presentation, converting a single lead into a record-breaking $9,000 package with absolute sales confidence.",
    tags: ["Sales Strategy", "Pricing", "Positioning"],
  },
  {
    name: "Sharon Canovas",
    business: "Sharon Canovas Studio",
    figure: 100,
    figurePrefix: "",
    figureSuffix: "% booked spring",
    program: "Mastermind",
    summary:
      "Sharon completely filled out her spring seasonal calendar, migrating away from discount-heavy ad spend into an organic, referral-driven visibility model.",
    tags: ["Marketing Roadmap", "Referral Loops"],
  },
  {
    name: "Stacey Sherman",
    business: "BarkHop Studio",
    figure: 2.2,
    figurePrefix: "",
    figureSuffix: "x revenue growth",
    program: "Workshop",
    summary:
      "Stacey audited her primary visibility channels during the Workshop, executing a 90-day blueprint that doubled her monthly studio revenue.",
    tags: ["90-Day Execution", "UX Review"],
  },
  {
    name: "Silvia Passeri",
    business: "Silvia Passeri Photography",
    figure: 2800,
    figurePrefix: "$",
    figureSuffix: " avg sale",
    program: "Workshop",
    summary:
      "Silvia redesigned her product collection packaging, raising her entry price and achieving an average booking sale of $2,800 within weeks.",
    tags: ["Packaging", "Pricing Tier"],
  },
  {
    name: "Kirstie McConnell",
    business: "Collective Member",
    figure: 40,
    figurePrefix: "",
    figureSuffix: " enquiries",
    program: "Mastermind",
    summary:
      "Relocating her studio to a brand new market, Kirstie designed third-party partnership loops that yielded 40 premium enquiries in 30 days.",
    tags: ["Visibility Loop", "Partnerships"],
  },
];

const resultsFilters = ["All", "Mastermind", "Workshop"];

export default function ResultsPage() {
  const [filter, setFilter] = useState("All");

  const filteredResults = resultsData.filter((r) => {
    if (filter === "All") return true;
    return r.program.toLowerCase() === filter.toLowerCase();
  });

  return (
    <>
      {/* ── 1 · Hero · Editorial split layout ── */}
      <section className="bg-ink relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-terracotta/8 blur-[100px]"
        />

        <div className="container-editorial relative z-10 grid gap-12 items-center lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-gold text-[0.75rem] font-medium uppercase tracking-[0.2em]">
              CLIENT OUTCOMES
            </span>
            <h1 className="display-1 mt-4 text-balance text-cream">
              Real photographers.{" "}
              <span className="italic text-terracotta font-display">
                Real shifts.
              </span>
            </h1>
            <p className="lead mt-6 max-w-xl text-cream/80">
              We measure success in cold metrics, and sustainable workloads.
              Explore named results and case studies from photographers who have
              implemented Ina&apos;s system.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href="/workshop"
                variant="primary"
                className="shadow-[0_4px_24px_-4px_rgba(212,104,88,0.4)]"
              >
                The Workshop <span aria-hidden>→</span>
              </Button>
              <Button
                href="/mastermind"
                variant="secondary"
                className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
              >
                The Mastermind
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-cream/10">
              <Image
                src={images.about.src}
                alt="Happy dog posing outdoors"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-grain pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Metrics count-up section ── */}
      <section className="border-b border-line bg-cream section-tight">
        <div className="container-editorial">
          <div className="grid gap-4 md:grid-cols-[1.15fr_1fr_1fr]">
            <div className="rounded-[1.9rem] border border-line bg-cream-warm/70 px-8 py-8 text-left">
              <Reveal from="up">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-ink-muted uppercase">
                  Studio Revenue
                </span>
                <p className="mt-3 font-display text-4xl text-ink md:text-5xl">
                  <CountUp to={305} prefix="$" suffix="K+" />
                </p>
                <p className="mt-2 text-xs text-ink-soft">
                  By year six of operation
                </p>
              </Reveal>
            </div>
            <div className="rounded-[1.9rem] border border-line bg-white/55 px-8 py-8 text-left">
              <Reveal from="up" delay={0.08}>
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-ink-muted uppercase">
                  Average Sale
                </span>
                <p className="mt-3 font-display text-4xl text-ink md:text-5xl">
                  <CountUp to={2600} prefix="$" suffix="–$2800" />
                </p>
                <p className="mt-2 text-xs text-ink-soft">
                  Per individual client booking
                </p>
              </Reveal>
            </div>
            <div className="rounded-[1.9rem] border border-terracotta/18 bg-gradient-to-br from-terracotta/10 to-transparent px-8 py-8 text-left">
              <Reveal from="up" delay={0.16}>
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-ink-muted uppercase">
                  Recognition
                </span>
                <p className="mt-3 font-display text-4xl text-ink md:text-5xl">
                  Sony
                </p>
                <p className="mt-2 text-xs text-ink-soft">
                  Digital Imaging Advocate
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · Case Studies Masonry Grid ── */}
      <section className="bg-cream-deep bg-dots section has-pattern py-20 md:py-28">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Proof"
              headline={
                <>
                  Outcomes with{" "}
                  <span className="italic text-terracotta font-display">
                    zero exaggeration.
                  </span>
                </>
              }
              body="Filter outcomes below by program container to trace the client journey."
              className="!mb-0"
            />
            {/* Filters */}
            <div className="flex gap-2">
              {resultsFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-5 py-2 text-xs font-medium tracking-[0.02em] transition-all cursor-pointer ${
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
            {filteredResults.map((r) => (
              <div
                key={r.name}
                className="group relative flex w-full flex-col justify-between rounded-[2rem] border border-line bg-cream p-8 shadow-[0_12px_30px_-15px_rgba(68,53,61,0.1)] transition-[border-color,box-shadow] duration-300 hover:border-terracotta/25 hover:shadow-[0_18px_40px_-20px_rgba(68,53,61,0.15)]"
              >
                <div>
                  <div className="flex justify-between items-start border-b border-line/40 pb-4">
                    <div>
                      <h4 className="font-display text-lg text-ink font-semibold">
                        {r.name}
                      </h4>
                      <p className="text-[0.65rem] font-bold tracking-[0.15em] text-gold uppercase mt-1">
                        {r.business}
                      </p>
                    </div>
                    <span className="text-[0.6rem] font-bold tracking-[0.2em] text-terracotta uppercase border border-line rounded-full px-3 py-1 shrink-0">
                      {r.program}
                    </span>
                  </div>

                  <p className="font-display text-3xl text-terracotta mt-6">
                    {r.figurePrefix}
                    {r.figure}
                    {r.figureSuffix}
                  </p>

                  <p className="mt-4 text-xs md:text-sm text-ink-soft leading-relaxed">
                    {r.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-line/30 flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.55rem] font-bold tracking-[0.1em] text-ink-muted bg-cream-warm/40 rounded px-2.5 py-1 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
              Ready to write your own success story?
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
