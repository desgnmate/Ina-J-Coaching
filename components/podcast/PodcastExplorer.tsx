"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/shared/Button";
import { OrganicShape } from "@/components/shared/OrganicShape";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { podcastEpisodes, podcastLinks } from "@/lib/content";
import { images } from "@/lib/images";
import podcastDetails from "@/lib/podcast-details.json";

function SoundVisualizer() {
  const bars = [1, 2, 3, 4, 5, 6];
  return (
    <div
      className="flex items-end gap-1.5 h-6 w-12 justify-center"
      aria-hidden="true"
    >
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

export default function PodcastExplorer() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [activeModalEpisode, setActiveModalEpisode] = useState<
    (typeof podcastEpisodes)[0] | null
  >(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalEpisode(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock background scroll and pause Lenis when modal is open
  useEffect(() => {
    const lenis = (
      window as Window & { __lenis?: { stop: () => void; start: () => void } }
    ).__lenis;
    if (activeModalEpisode) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [activeModalEpisode]);

  const episodes = podcastEpisodes ?? [];
  const details = podcastDetails as Record<string, string>;

  if (episodes.length === 0) {
    return (
      <div className="container-editorial py-20 text-center">
        <p className="lead text-ink-soft">
          No episodes found. Please check back later!
        </p>
      </div>
    );
  }

  // Dynamically build topic filters from the episodes list
  const rawTopics = episodes.map((ep) => ep.topic);
  const topics = ["All", ...Array.from(new Set(rawTopics))];

  // Logic:
  // If "All" topic is selected:
  // - Show Episode 24 (the first one in our list) in a featured block with its player pre-loaded.
  // - Show the remaining episodes (EP 20-23) in the filtered list.
  // If a specific topic is selected:
  // - Hide the featured block.
  // - Show all episodes matching that topic in the list.
  const isAllSelected = selectedTopic === "All";
  const featuredEpisode = episodes[0];
  const listEpisodes = isAllSelected
    ? episodes.slice(1)
    : episodes.filter(
        (ep) => ep.topic.toLowerCase() === selectedTopic.toLowerCase(),
      );

  return (
    <>
      {/* ── 1 · Hero Section ── */}
      <section className="bg-grid bg-noise-cream relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div className="container-editorial relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-7">
              <Reveal from="left">
                <div className="flex items-center gap-3">
                  <span className="eyebrow text-terracotta">PODCAST</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta/40" />
                  <span className="text-xs uppercase tracking-[0.15em] text-ink-muted">
                    New Episodes Regularly
                  </span>
                </div>
                <h1 className="display-1 mt-4 text-balance text-ink">
                  The Pet Photographers'{" "}
                  <span className="italic text-terracotta font-display">
                    Journal
                  </span>
                </h1>
                <p className="lead mt-6 max-w-xl text-ink-soft">
                  A warm, practical podcast for pet photographers who want
                  clearer positioning, stronger marketing, and more consistent
                  bookings, without the fluff. Hosted by Ina Jalil.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 items-center">
                  <Button
                    href={podcastLinks.apple}
                    external
                    variant="primary"
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Apple Podcasts Icon</title>
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.29 2.7 7.95 6.48 9.32.4-.1.8-.25 1.19-.45v-1.78c-2.48-.96-4.22-3.37-4.22-6.19 0-3.67 2.97-6.66 6.6-6.66s6.6 2.99 6.6 6.66c0 2.82-1.74 5.23-4.22 6.19v1.78c.39.2.79.35 1.19.45C19.3 19.95 22 16.29 22 12c0-5.52-4.48-10-10-10zm0 7.55c-2.44 0-4.43 2-4.43 4.45 0 2.45 2 4.45 4.43 4.45s4.43-2 4.43-4.45c0-2.45-2-4.45-4.43-4.45zm0 2.45c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                    </svg>
                    Apple Podcasts
                  </Button>
                  <Button
                    href={podcastLinks.spotify}
                    external
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Spotify Icon</title>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.42c-.2.32-.62.42-.94.22-2.58-1.58-5.83-1.94-9.66-1.07-.36.08-.72-.14-.8-.5-.08-.36.14-.72.5-.8 4.19-.96 7.78-.54 10.68 1.23.32.2.42.62.22.94zm1.22-2.73c-.26.4-.78.53-1.18.27-2.95-1.81-7.46-2.34-10.96-1.28-.45.14-.92-.12-1.05-.57-.14-.45.12-.92.57-1.05 4-1.21 8.97-.62 12.35 1.45.4.26.53.78.27 1.18zm.1-2.81C14.52 8.78 8.87 8.59 5.6 9.58c-.62.19-1.28-.16-1.47-.78-.19-.62.16-1.28.78-1.47 3.75-1.14 9.98-.92 14.9 2.01.56.33.74 1.05.41 1.61-.33.56-1.05.74-1.61.41z" />
                    </svg>
                    Spotify
                  </Button>
                  <Button
                    href={podcastLinks.website}
                    external
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-terracotta"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>RSS Icon</title>
                      <circle cx="6.18" cy="17.82" r="2.18" />
                      <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56z" />
                      <path d="M4 10.1v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
                    </svg>
                    Web Player
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Premium Polaroid Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal from="scale" delay={0.15}>
                <div className="relative rotate-3 bg-cream p-4 pb-12 shadow-[0_20px_50px_rgba(68,53,61,0.15)] border border-line rounded-sm transition-transform hover:rotate-0 duration-500 max-w-[340px]">
                  <div className="relative aspect-square w-[280px] overflow-hidden bg-cream-deep border border-line/40 rounded-sm">
                    <Image
                      src={images.podcastHero.src}
                      alt={images.podcastHero.alt}
                      fill
                      sizes="280px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-grain pointer-events-none" />
                  </div>
                  <div className="mt-6 text-center">
                    <span className="font-display italic text-lg text-ink font-semibold tracking-wide block">
                      The Pet Photographers' Journal
                    </span>
                    <span className="text-[0.65rem] tracking-[0.2em] text-ink-muted uppercase block mt-1">
                      Est. 2025 &middot; Hosted by Ina Jalil
                    </span>
                  </div>
                  <div className="absolute top-6 right-6 z-20">
                    <SoundVisualizer />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Featured / Latest Episode Section ── */}
      {isAllSelected && featuredEpisode && (
        <section className="section bg-cream relative overflow-hidden">
          {/* Decorative organic shapes */}
          <div className="absolute -left-8 top-8 pointer-events-none select-none opacity-[0.07]">
            <OrganicShape
              variant="spark"
              size={180}
              color="var(--color-terracotta)"
              rotate={-15}
            />
          </div>
          <div className="absolute -right-12 bottom-12 pointer-events-none select-none opacity-[0.04]">
            <OrganicShape
              variant="paw"
              size={140}
              color="var(--color-gold)"
              rotate={22}
            />
          </div>

          <div className="container-editorial relative z-10">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-line/60 bg-cream bg-grain shadow-[0_25px_60px_-20px_rgba(68,53,61,0.12),0_8px_20px_-8px_rgba(68,53,61,0.06)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-25px_rgba(68,53,61,0.18)]">
              <div className="relative z-10 p-6 md:p-10 lg:p-14">
                {/* ── Script "Now Playing" Header ── */}
                <Reveal from="up">
                  <div className="flex items-center gap-4 mb-8 lg:mb-10">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-terracotta">
                      Latest Episode
                    </span>
                    <span className="h-px flex-1 bg-line/50" />
                    <span className="font-sans text-base font-medium text-terracotta/40 leading-none">
                      EP {featuredEpisode.number}
                    </span>
                  </div>
                </Reveal>

                {/* ── Two-Column Content ── */}
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* Left: Editorial Content */}
                  <Reveal from="left" delay={0.1} className="lg:col-span-7">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h2 className="mt-3 font-display text-2xl md:text-3xl lg:text-[2.25rem] font-medium leading-snug text-ink tracking-tight text-pretty">
                          {featuredEpisode.title}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-ink-soft max-w-lg">
                          {featuredEpisode.excerpt}
                        </p>
                      </div>

                      <div className="mt-8">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className="rounded-full bg-terracotta/10 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-terracotta border border-terracotta/15">
                            {featuredEpisode.topic}
                          </span>
                          <span className="text-xs text-ink-muted">
                            {featuredEpisode.date}
                          </span>
                          <span className="text-ink-muted/40">&middot;</span>
                          <span className="text-xs text-ink-muted">
                            {featuredEpisode.duration}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveModalEpisode(featuredEpisode)}
                          className="btn-ghost group inline-flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <span>Show Details</span>
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Reveal>

                  {/* Right: Listening Stage */}
                  <Reveal
                    from="right"
                    delay={0.2}
                    className="lg:col-span-5 flex items-center"
                  >
                    <div className="relative w-full rounded-[1.5rem] overflow-hidden">
                      <div className="absolute inset-0 bg-ink rounded-[1.5rem]" />
                      <div className="absolute inset-0 bg-grain rounded-[1.5rem]" />

                      <div className="relative z-10 p-5 md:p-7 lg:p-8">
                        <div className="flex items-center gap-2.5 mb-5">
                          <SoundVisualizer />
                          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-cream/50">
                            Listen Now
                          </span>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                          <iframe
                            src={`https://player.captivate.fm/episode/${featuredEpisode.embedId}`}
                            style={{
                              width: "100%",
                              height: "200px",
                              border: "none",
                            }}
                            allow="clipboard-write"
                            title={`Featured Episode: ${featuredEpisode.title}`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3 · Filter and Episode Grid ── */}
      <section className="bg-cream-deep bg-dots section py-20">
        <div className="container-editorial">
          <SectionHeading
            align="center"
            eyebrow="EPISODES ARCHIVE"
            headline={
              <>
                Conversations that help you{" "}
                <span className="italic text-terracotta font-display">
                  build bookings.
                </span>
              </>
            }
            body="Filter the show by topic to find practical ideas for your business."
          />

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-2.5 justify-center">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setSelectedTopic(topic);
                  setActiveModalEpisode(null); // close details modal on filter change
                }}
                className={`rounded-full px-5 py-2 text-sm font-medium tracking-[0.02em] transition-all cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-ink text-cream shadow-sm"
                    : "bg-cream border border-line text-ink-soft hover:bg-ink hover:text-cream"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Grid list of episodes - Masonry columns layout */}
          {listEpisodes.length === 0 ? (
            <div className="mt-12 text-center py-12 bg-cream rounded-[2rem] border border-line">
              <p className="text-ink-soft">
                No episodes found matching this topic.
              </p>
            </div>
          ) : (
            (() => {
              const leftColEpisodes = listEpisodes.filter(
                (_, idx) => idx % 2 === 0,
              );
              const rightColEpisodes = listEpisodes.filter(
                (_, idx) => idx % 2 === 1,
              );

              const renderEpisodeCard = (ep: (typeof episodes)[0]) => {
                return (
                  <div
                    key={ep.number}
                    className="group relative flex w-full flex-col justify-between rounded-[2rem] border border-line bg-cream p-8 shadow-[0_12px_30px_-15px_rgba(68,53,61,0.1)] transition-[border-color,box-shadow] duration-300 hover:border-terracotta/25 hover:shadow-[0_18px_40px_-20px_rgba(68,53,61,0.15)]"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="font-sans text-base font-medium text-terracotta/40 transition-colors group-hover:text-terracotta/60">
                          EP {ep.number}
                        </span>
                        <span className="rounded-full border border-line px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">
                          {ep.topic}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-terracotta md:text-xl">
                        {ep.title}
                      </h3>
                      <div className="rounded-xl overflow-hidden border border-line shadow-inner bg-cream-deep/40 mt-6">
                        <iframe
                          src={`https://player.captivate.fm/episode/${ep.embedId}`}
                          style={{
                            width: "100%",
                            height: "200px",
                            border: "none",
                          }}
                          allow="clipboard-write"
                          title={`Play Episode: ${ep.title}`}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-line/45 pt-4">
                      <span className="text-xs text-ink-muted">
                        {ep.date} &bull; {ep.duration}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveModalEpisode(ep)}
                        className="text-xs font-semibold text-terracotta hover:underline cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Show Details</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                );
              };

              return (
                <div className="mt-12 grid gap-6 md:grid-cols-2 items-start">
                  {/* Left Column */}
                  <div className="flex flex-col gap-6 h-fit">
                    {leftColEpisodes.map(renderEpisodeCard)}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-6 h-fit">
                    {rightColEpisodes.map(renderEpisodeCard)}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </section>

      {/* ── 4 · Converting Exit Panel ── */}
      <section className="section bg-cream-deep/20">
        <div className="container-editorial">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-grain panel-ink p-12 text-center shadow-xl md:p-20">
              {/* Background Paw Decorative Graphics */}
              <div className="absolute -left-12 -top-12 text-cream/3 opacity-[0.05] pointer-events-none select-none">
                <OrganicShape variant="paw" size={200} />
              </div>
              <div className="absolute -right-12 -bottom-12 text-cream/3 opacity-[0.05] pointer-events-none select-none">
                <OrganicShape variant="paw" size={240} />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <p className="eyebrow text-terracotta">GO DEEPER WITH INA</p>
                <h2 className="display-2 mt-6 text-cream">
                  Ready for a clearer path to consistent bookings?
                </h2>
                <p className="lead mt-6 text-cream/70">
                  The podcast is a starting point. If you want hands-on support
                  to build a photography business that books out and runs
                  smoothly, let's work together.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link href="/coaching" className="btn-primary">
                    Explore Coaching
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-secondary border-cream/20 bg-transparent text-cream hover:bg-cream-warm hover:text-ink hover:border-cream-warm"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5 · Centered Modal Overlay for Show Notes ── */}
      <AnimatePresence>
        {activeModalEpisode && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveModalEpisode(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Card container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-cream max-w-3xl w-full max-h-[85vh] rounded-[2.5rem] border border-line shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-line/45 p-6 md:p-8 bg-cream/90 backdrop-blur-sm sticky top-0 z-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-terracotta">
                    <span>EP {activeModalEpisode.number}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta/40" />
                    <span className="uppercase tracking-[0.1em] text-ink-muted">
                      {activeModalEpisode.topic}
                    </span>
                  </div>
                  <h2
                    id="modal-title"
                    className="font-display text-xl md:text-2xl font-semibold leading-tight text-ink mt-2"
                  >
                    {activeModalEpisode.title}
                  </h2>
                  <div className="mt-1.5 text-xs text-ink-muted">
                    {activeModalEpisode.date} &bull;{" "}
                    {activeModalEpisode.duration}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalEpisode(null)}
                  className="rounded-full p-2 border border-line hover:border-terracotta/40 hover:text-terracotta transition-colors cursor-pointer group relative flex items-center justify-center shrink-0 ml-4"
                  aria-label="Close details"
                >
                  <svg
                    className="w-4.5 h-4.5 transition-transform group-hover:rotate-90 duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <title>Close Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable Show Notes Content */}
              <div
                className="overflow-y-auto p-6 md:p-10 flex-1"
                data-lenis-prevent
              >
                <div
                  className="prose-custom text-xs md:text-sm text-ink-soft"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: static HTML show notes from Captivate
                  dangerouslySetInnerHTML={{
                    __html:
                      details[activeModalEpisode.number] ??
                      activeModalEpisode.excerpt,
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
