"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StickyCta } from "@/components/shared/StickyCta";
import { podcastLinks, site } from "@/lib/content";
import { images } from "@/lib/images";

const topics = [
  "All",
  "Visibility",
  "Pricing",
  "Website Strategy",
  "Mindset",
  "Business Reality",
];

const episodes = [
  {
    number: "042",
    topic: "Pricing",
    title: "How to handle price objections without discounting your work",
    excerpt:
      "A practical look at what happens when your sales conversations hit a price barrier, and how to stay behind your value.",
    duration: "38 min",
  },
  {
    number: "041",
    topic: "Client Experience",
    title: "What a real sales conversation sounds like with a pet photographer",
    excerpt:
      "Ina breaks down a full sales call transcript to illustrate how to navigate price cards and client desires.",
    duration: "44 min",
  },
  {
    number: "040",
    topic: "Visibility",
    title: "Third Party Marketing for Pet Photographers, relocation strategy",
    excerpt:
      "Kirstie McConnell joins the show to discuss relocating a premium studio and rebuilding local bookings without social media ad spend.",
    duration: "31 min",
  },
  {
    number: "039",
    topic: "Pricing",
    title: "When to raise your prices and how to communicate it online",
    excerpt:
      "A direct roadmap to increasing average client sales and shifting messaging without triggering client backlash.",
    duration: "42 min",
  },
  {
    number: "038",
    topic: "Website Strategy",
    title: "SEO, UX, and AI, what pet photographers need to know",
    excerpt:
      "Stop cluttering your landing pages. Ina and guests cover simple guidelines to rank on search and guide enquiry flow.",
    duration: "36 min",
  },
  {
    number: "037",
    topic: "Mindset",
    title: "From cheap digitals to profitable artwork, key mindset shifts",
    excerpt:
      "Michelle Crandall shares her journey from running a $100 shoot-and-burn model to booking consistent $2,000+ artwork sales.",
    duration: "45 min",
  },
  {
    number: "036",
    topic: "Business Reality",
    title: "The truth about what is holding photographers back in 2026",
    excerpt:
      "An honest conversation about business momentum, resisting the urge to buy more gear, and focusing on actual conversion systems.",
    duration: "49 min",
  },
];

function SoundVisualizer() {
  const bars = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex items-end gap-1.5 h-6 w-12 justify-center">
      {bars.map((bar, idx) => (
        <motion.div
          key={bar}
          className="w-1 bg-terracotta rounded-full"
          animate={{
            height: ["15%", "100%", "15%"],
          }}
          transition={{
            duration: 0.7 + idx * 0.12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function PodcastPage() {
  const [selectedTopic, setSelectedTopic] = useState("All");

  const filteredEpisodes = episodes.filter((ep) => {
    if (selectedTopic === "All") return true;
    return ep.topic.toLowerCase() === selectedTopic.toLowerCase();
  });

  return (
    <>
      {/* ── 1 · Player Dashboard Hero ── */}
      <section className="bg-grid bg-noise-cream relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div className="container-editorial relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column - Details */}
            <div className="lg:col-span-7">
              <Reveal from="left">
                <div className="flex items-center gap-3">
                  <span className="eyebrow">PODCAST</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  <span className="text-xs uppercase tracking-[0.15em] text-ink-muted">
                    New Episodes Biweekly
                  </span>
                </div>
                <h1 className="display-1 mt-4 text-balance text-ink">
                  The Pet Photographers'{" "}
                  <span className="italic text-terracotta font-display">
                    Journal
                  </span>
                </h1>
                <p className="lead mt-6 max-w-xl text-ink-soft">
                  A warm, practical podcast for photographers who want better
                  positioning, steadier bookings, and honest conversations about
                  how the business really works. No motivational fluff. Just
                  actual systems.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <Button href={podcastLinks.apple} external variant="primary">
                    Apple Podcasts
                  </Button>
                  <Button
                    href={podcastLinks.spotify}
                    external
                    variant="secondary"
                  >
                    Spotify
                  </Button>
                  <Button href={podcastLinks.website} external variant="ghost">
                    Show Web player
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right Column - Premium Player Cover Mock */}
            <div className="lg:col-span-5">
              <Reveal from="scale" delay={0.15}>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-cream p-8 shadow-[0_22px_50px_-25px_rgba(68,53,61,0.2)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream-deep">
                    <Image
                      src={images.podcastHero.src}
                      alt="The Pet Photographers' Journal Cover"
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-grain pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] text-cream/90 uppercase bg-black/30 backdrop-blur-[2px] px-3 py-1 rounded-full">
                        NOW PLAYING
                      </span>
                      <SoundVisualizer />
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <h3 className="font-display text-xl text-ink font-semibold truncate">
                      Price Objections & Pricing Boundaries
                    </h3>
                    <p className="text-xs text-ink-soft mt-1">
                      Episode 42 &middot; 38 minutes
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-6 border-t border-line/60 pt-6">
                    <button
                      type="button"
                      className="text-ink-muted hover:text-ink transition-colors cursor-pointer"
                      aria-label="Skip backward 15 seconds"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <title>Skip backward</title>
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta text-cream shadow-sm hover:scale-[1.05] transition-transform cursor-pointer"
                      aria-label="Play Featured Episode"
                    >
                      <svg
                        className="ml-1"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Play Featured Episode</title>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="text-ink-muted hover:text-ink transition-colors cursor-pointer"
                      aria-label="Skip forward 15 seconds"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <title>Skip forward</title>
                        <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Browse and Filter Section ── */}
      <section className="bg-cream-deep bg-dots section has-pattern py-20 md:py-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Browse episodes"
            headline={
              <>
                Conversations that help you{" "}
                <span className="italic text-terracotta font-display">
                  build bookings.
                </span>
              </>
            }
            body="Use the topic controls below to instantly filter the episodes by business area."
          />

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-2.5 justify-center">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full px-5 py-2 text-sm font-medium tracking-[0.02em] transition-all cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-ink text-cream shadow-sm"
                    : "bg-cream border border-line text-ink-soft hover:bg-cream-warm/40"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Episode Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {filteredEpisodes.map((ep) => (
              <div
                key={ep.number}
                className="group relative flex w-full flex-col justify-between rounded-[2rem] border border-line bg-cream p-8 shadow-[0_12px_30px_-15px_rgba(68,53,61,0.1)] transition-[border-color,box-shadow] duration-300 hover:border-terracotta/25 hover:shadow-[0_18px_40px_-20px_rgba(68,53,61,0.15)]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-4xl text-terracotta/20">
                      {ep.number}
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">
                      {ep.topic}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-terracotta md:text-xl">
                    {ep.title}
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-ink-soft md:text-sm">
                    {ep.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line/45 pt-4">
                  <span className="text-xs text-ink-muted">{ep.duration}</span>
                  <Button
                    href={podcastLinks.website}
                    external
                    variant="ghost"
                    className="text-xs"
                  >
                    Listen Episode →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · Final CTA · Full-bleed image ── */}
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
              Want to work together?
            </h2>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              The podcast is free. If you want hands-on support, explore the
              Workshop or Apply for the Mastermind.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/coaching" variant="primary">
                Explore Coaching
                <span aria-hidden>→</span>
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
              >
                Send message
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyCta href={site.bookingHref} label="Book a call" />
    </>
  );
}
