"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

const resources = [
  {
    id: "bookings-audit",
    title: "Consistent Bookings Audit Scorecard",
    description:
      "A comprehensive 12-page rubric to evaluate your visibility channels, enquiry rates, and sales conversions, exposing the exact gap in your bookings system.",
    format: "PDF Document (12 Pages)",
    file: "bookings_audit_scorecard.pdf",
    tag: "Audit",
  },
  {
    id: "marketing-roadmap",
    title: "90-Day Studio Marketing Roadmap",
    description:
      "The actual calendar layout Ina uses to plan seasonal campaigns, coordinate local business partnerships, and run database referral campaigns.",
    format: "Excel Worksheet Template",
    file: "90_day_marketing_roadmap.xlsx",
    tag: "Roadmap",
  },
  {
    id: "pricing-calculator",
    title: "Studio Pricing & Markup Calculator",
    description:
      "An automated spreadsheet to input your costs, determine your digital collection values, and calculate markups to support $2,600+ average client sales.",
    format: "Calculated Sheet (Google / Excel)",
    file: "studio_pricing_calculator.xlsx",
    tag: "Pricing Tools",
  },
  {
    id: "dm-scripts",
    title: "Instagram DM to Email List Scripts",
    description:
      "Bespoke copywriting templates and chat flows to migrate casual social comments into warm, private email subscribers who book discovery calls.",
    format: "PDF Script Guide (8 Pages)",
    file: "dm_to_email_scripts.pdf",
    tag: "Scripts",
  },
];

export default function ResourcesPage() {
  const [activeResource, setActiveResource] = useState<
    (typeof resources)[0] | null
  >(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [downloadStep, setDownloadStep] = useState<
    "form" | "progress" | "success"
  >("form");
  const [progress, setProgress] = useState(0);

  const handleOpenModal = (resource: (typeof resources)[0]) => {
    setActiveResource(resource);
    setDownloadStep("form");
    setEmail("");
    setName("");
    setProgress(0);
  };

  const handleCloseModal = () => {
    setActiveResource(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setDownloadStep("progress");

    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setDownloadStep("success");
        // Simulate file trigger
        const link = document.createElement("a");
        link.href = "#"; // simulated download
        link.setAttribute("download", activeResource?.file || "guide.pdf");
        document.body.appendChild(link);
        // Link click logic is skipped for safe browser execution
        document.body.removeChild(link);
      }
    }, 150);
  };

  return (
    <>
      {/* ── 1 · Hero ── */}
      <section className="bg-grid bg-noise-cream relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div className="container-editorial relative z-10 text-center">
          <Reveal from="up">
            <span className="eyebrow">FREE TOOLS & ROADMAPS</span>
            <h1 className="display-1 mt-4 text-balance text-ink">
              Marketing toolkits for{" "}
              <span className="italic text-terracotta font-display">
                serious studios.
              </span>
            </h1>
            <p className="lead mt-6 max-w-xl mx-auto text-ink-soft">
              No superficial checklists. Get direct access to calculators,
              planners, and templates Ina has tested inside active Canberra
              photography studios.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2 · Grid Section ── */}
      <section className="bg-cream-deep bg-dots section has-pattern py-20 md:py-28">
        <div className="container-editorial">
          <div className="grid gap-8 md:grid-cols-2">
            {resources.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.1} from="up">
                <div className="group relative h-full rounded-[2.5rem] border border-line bg-cream p-8 shadow-[0_12px_30px_-15px_rgba(68,53,61,0.12)] transition-all duration-300 hover:border-terracotta/25 hover:shadow-[0_18px_40px_-20px_rgba(68,53,61,0.18)] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[0.6rem] font-bold tracking-[0.2em] text-gold uppercase border border-line rounded-full px-3 py-1">
                        {item.tag}
                      </span>
                      <span className="text-xs text-ink-muted">
                        {item.format}
                      </span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-ink font-semibold mt-6 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-xs md:text-sm text-ink-soft leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-line/45 pt-6 flex justify-between items-center">
                    <span className="text-[0.65rem] font-bold tracking-[0.1em] text-ink uppercase">
                      Free Download
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenModal(item)}
                      className="btn-primary py-2 px-5 text-xs font-semibold rounded-full cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                      Get Resource
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Modal Overlay for capture ── */}
      <AnimatePresence>
        {activeResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-line bg-cream p-8 md:p-10 shadow-[0_30px_70px_rgba(43,31,23,0.3)] z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                aria-label="Close download modal"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <title>Close</title>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <AnimatePresence mode="wait">
                {downloadStep === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] text-terracotta uppercase">
                      {activeResource.tag} download
                    </span>
                    <h3 className="font-display text-2xl text-ink font-semibold mt-3">
                      {activeResource.title}
                    </h3>
                    <p className="text-xs text-ink-soft mt-2 leading-relaxed">
                      Enter your details below to instantly download the file
                      and receive strategic business emails from Ina J.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <label className="block text-left">
                        <span className="text-[0.65rem] font-bold tracking-[0.15em] text-ink-soft uppercase">
                          Your Name
                        </span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-2 w-full rounded-full border border-line bg-cream-warm/10 px-5 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-terracotta focus:bg-cream-warm/30 focus:outline-none transition-all"
                          placeholder="e.g. John Doe"
                        />
                      </label>
                      <label className="block text-left">
                        <span className="text-[0.65rem] font-bold tracking-[0.15em] text-ink-soft uppercase">
                          Email Address
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-2 w-full rounded-full border border-line bg-cream-warm/10 px-5 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-terracotta focus:bg-cream-warm/30 focus:outline-none transition-all"
                          placeholder="hello@yourstudio.com"
                        />
                      </label>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full justify-center mt-4"
                      >
                        Download File <span aria-hidden>→</span>
                      </Button>
                    </form>
                  </motion.div>
                )}

                {downloadStep === "progress" && (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream-warm text-terracotta animate-pulse mb-6">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <title>Preparing download</title>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                    <h4 className="font-display text-xl text-ink font-semibold">
                      Preparing Download...
                    </h4>
                    <p className="text-xs text-ink-soft mt-2">
                      Bundling templates and calculators for your studio.
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-8 h-2 w-full rounded-full bg-cream-deep overflow-hidden">
                      <motion.div
                        className="h-full bg-terracotta"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="block text-[0.65rem] font-bold tracking-[0.1em] text-ink-muted uppercase mt-3">
                      {progress}% complete
                    </span>
                  </motion.div>
                )}

                {downloadStep === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10 text-terracotta mb-6">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <title>Download started</title>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h4 className="font-display text-xl text-ink font-semibold">
                      Download Started!
                    </h4>
                    <p className="text-xs text-ink-soft mt-2 leading-relaxed">
                      Your file download has been initiated. If it did not
                      launch automatically, check your downloads folder or check
                      the link sent to{" "}
                      <span className="text-ink font-medium">{email}</span>.
                    </p>
                    <div className="mt-8">
                      <Button
                        onClick={handleCloseModal}
                        variant="secondary"
                        className="w-full justify-center"
                      >
                        Done
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              Ready for deeper business support?
            </h2>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              Explore the ways to work together directly. A focused curriculum
              sprint in the Workshop or the flagship accountability container in
              the Mastermind.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/coaching" variant="primary">
                Explore Coaching
                <span aria-hidden>→</span>
              </Button>
              <Button
                href={site.bookingHref}
                variant="secondary"
                className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
              >
                Book a call
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyCta href={site.bookingHref} label="Book a call" />
    </>
  );
}
