"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

const recognition = [
  {
    src: "https://image12.photobiz.com/7732/7_20241003235111_13761207_large.png",
    alt: "Sony Digital Imaging Advocate",
  },
  {
    src: "https://image11.photobiz.com/8586/7_20241219161945_13951845_large.png",
    alt: "2024 International Pet Photography Awards - Silver Winner",
  },
  {
    src: "https://image6.photobiz.com/8933/7_20241219162120_13951847_large.png",
    alt: "2024 International Pet Photography Awards - Bronze Distinction Winner",
  },
  {
    src: "https://image10.photobiz.com/8495/7_20241219162119_13951846_large.png",
    alt: "2024 International Pet Photography Awards - Bronze Winner",
  },
  {
    src: "https://image4.photobiz.com/8911/7_20250210174632_14017005_large.png",
    alt: "AI Photo Editing Partnership with Imagen",
  },
  {
    src: "https://image6.photobiz.com/8933/7_20230214064819_12722126_large.png",
    alt: "2022 Asia Pacific Photography Awards People's Choice Winner",
  },
  {
    src: "https://image7.photobiz.com/8912/7_20230214064819_12722127_large.png",
    alt: "2022 Asia Pacific Photography Awards Finalist",
  },
];

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

      {/* ── 2 · Recognition · Light section ── */}
      <section className="bg-grid bg-noise-cream section relative overflow-hidden">
        <div className="container-editorial relative">
          {/* Header · two-column */}
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="text-terracotta text-[0.75rem] font-medium uppercase tracking-[0.18em]">
                Recognition
              </p>
              <h2 className="display-2 mt-5 text-balance text-ink">
                Trusted by clients,{" "}
                <span className="italic text-terracotta">
                  recognised by the industry.
                </span>
              </h2>
            </div>
            <Reveal className="md:col-span-5">
              <p className="body-lg max-w-md md:ml-auto text-ink-soft">
                A handful of the awards, partnerships, and recognitions that
                have shaped the studio and the coaching practice.
              </p>
            </Reveal>
          </div>

          {/* Awards grid */}
          <Reveal>
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
              {recognition.map((r, i) => (
                <div
                  key={r.alt}
                  className="group relative flex h-32 items-center justify-center rounded-2xl border border-line bg-cream p-5 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-terracotta/20 hover:bg-cream-warm/40 hover:shadow-[0_8px_24px_rgba(68,53,61,0.08)]"
                >
                  {/* biome-ignore lint/performance/noImgElement: using standard img to render live website assets */}
                  <img
                    src={r.src}
                    alt={r.alt}
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 ${i === 0 ? "brightness-0 opacity-80" : ""}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10 flex justify-center">
            <a
              href={site.parentSite}
              className="btn-ghost text-ink-muted hover:text-ink"
            >
              See the photography portfolio
              <span aria-hidden>→</span>
            </a>
          </Reveal>
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
                      : "bg-cream border border-line text-ink-soft hover:bg-ink hover:text-cream"
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
