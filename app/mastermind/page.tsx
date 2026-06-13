"use client";

import Image from "next/image";
import { useState } from "react";
import { Testimonials } from "@/components/home/Testimonials";
import { Accordion } from "@/components/shared/Accordion";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

const deliverableTabs = [
  {
    id: "calls",
    label: "Weekly Group Calls",
    eyebrow: "Live Interactive Strategy",
    title: "Deep, focused group problem solving",
    body: "Join recurring weekly coaching calls where we audit copy, troubleshoot booking bottlenecks, and strategize visibility campaigns in real time. Every call is recorded for your archives.",
    bullets: [
      "Direct 1-to-1 hot-seat time with Ina",
      "Peer learning from fellow high-end studios",
      "Actionable action steps for the week ahead",
    ],
  },
  {
    id: "slack",
    label: "Asynchronous Slack Feedback",
    eyebrow: "Continuous Support Container",
    title: "Never get stuck implementing alone",
    body: "Get daily async advice in our dedicated Slack channel. Submit draft copy, pricing spreadsheets, or email campaigns for review before pushing them live to your list.",
    bullets: [
      "24-48 hr direct feedback turnaround",
      "A private space for copy, layout, and client email reviews",
      "Daily accountability with peers",
    ],
  },
  {
    id: "audits",
    label: "Website & Pricing Audits",
    eyebrow: "Strategic Screencast Reviews",
    title: "Granular audits of your online assets",
    body: "Ina records high-density screencast reviews of your website, pricing sheets, and enquiry forms to expose leak points in your conversions.",
    bullets: [
      "UX, SEO, and copywriting assessment",
      "Pricing card structuring and tier alignment",
      "Enquiry capture funnel optimization",
    ],
  },
  {
    id: "collective",
    label: "The Collective Portal",
    eyebrow: "On-Demand Blueprint Vault",
    title: "Templates, tools, and visual guides",
    body: "Gain access to exclusive resources, including pricing calculators, response templates, and SEO setups that Ina has used to maintain a 6-figure photography business.",
    bullets: [
      "Ready-to-use email reply scripts",
      "Interactive photography pricing sheets",
      "Marquet/visibility blueprint frameworks",
    ],
  },
];

const faqs = [
  {
    title: "Is the Mastermind right if I have never worked with Ina before?",
    content:
      "Most Mastermind members have either done the Workshop first or booked a discovery call. That way the time inside the container is spent applying, not catching up.",
  },
  {
    title: "How much time does it take each week?",
    content:
      "Plan on around 3 to 4 hours a week, including the live group call, async feedback, and time to apply the work. The system is built for real studios, not endless homework.",
  },
  {
    title: "Is there a cap on members?",
    content:
      "Yes. The Mastermind is intentionally small so feedback stays personal. The next intake closes when the cohort fills.",
  },
  {
    title: "Do I keep access after the cohort ends?",
    content:
      "Yes. Alumni stay in the community, keep the templates and replays, and can rejoin future live calls at alumni rates.",
  },
  {
    title: "Can I pay in instalments?",
    content:
      "Payment plans are available. We work out the schedule on the discovery call.",
  },
];

export default function MastermindPage() {
  const [activeTab, setActiveTab] = useState("calls");
  const activeData =
    deliverableTabs.find((t) => t.id === activeTab) || deliverableTabs[0];

  const faqAccordionItems = faqs.map((faq) => ({
    title: faq.title,
    content: <p>{faq.content}</p>,
  }));

  return (
    <>
      {/* ── 1 · Luxury Dark Hero ── */}
      <section className="bg-ink relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-terracotta/8 blur-[100px]"
        />

        <div className="container-editorial relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <span className="text-gold text-[0.75rem] font-medium uppercase tracking-[0.2em]">
                FLAGSHIP CONTAINER
              </span>
              <h1 className="display-1 mt-4 text-balance text-cream">
                Consistent Bookings{" "}
                <span className="italic text-terracotta font-display">
                  Mastermind
                </span>
              </h1>
              <p className="lead mt-6 max-w-xl text-cream/80">
                A premium, high-density implementation container for pet
                photographers ready to transition from unpredictable enquiries
                into steadier demand, higher average sales, and structured
                execution.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href={site.bookingHref}
                  variant="primary"
                  className="shadow-[0_4px_24px_-4px_rgba(212,104,88,0.4)]"
                >
                  Apply to Cohort <span aria-hidden>→</span>
                </Button>
                <Button
                  href="/results"
                  variant="secondary"
                  className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
                >
                  See client results
                </Button>
              </div>
            </div>

            {/* Right Graphic/Details Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[2rem] border border-cream/10 bg-ink-soft/40 p-8 text-cream backdrop-blur-sm">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-terracotta-soft uppercase">
                  Inclusions
                </span>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between border-b border-cream/10 pb-3 text-sm">
                    <span className="text-cream/60">Weekly Calls</span>
                    <span className="text-cream font-medium">
                      Group Troubleshooting
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-cream/10 pb-3 text-sm">
                    <span className="text-cream/60">Slack Channel</span>
                    <span className="text-cream font-medium">
                      Asynchronous Copy Auditing
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-cream/10 pb-3 text-sm">
                    <span className="text-cream/60">Asset Audits</span>
                    <span className="text-cream font-medium">
                      Website + Pricing Review
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 text-sm">
                    <span className="text-cream/60">Investment</span>
                    <span className="text-terracotta font-medium">
                      $2,500 USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Interactive Pillars (Tabs) ── */}
      <section className="bg-cream-deep bg-dots section has-pattern py-20 md:py-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Inside the Mastermind"
            headline={
              <>
                Comprehensive strategy,{" "}
                <span className="italic text-terracotta font-display">
                  grounded support.
                </span>
              </>
            }
            body="The Mastermind is built for implementation. Choose a tab below to explore the four active support pillars of the container."
          />

          {/* Tabs header */}
          <div className="mt-10 flex flex-wrap gap-2.5 justify-center">
            {deliverableTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium tracking-[0.02em] transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-ink text-cream shadow-sm"
                    : "bg-cream border border-line text-ink-soft hover:bg-ink hover:text-cream"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="mt-8">
            <div className="grid gap-8 rounded-[2.5rem] border border-line bg-cream p-8 shadow-[0_15px_40px_-20px_rgba(68,53,61,0.14)] md:p-12 lg:grid-cols-12 lg:items-center">
              {/* Panel Info */}
              <div className="lg:col-span-7">
                <span className="eyebrow text-gold text-xs">
                  {activeData.eyebrow}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-ink mt-3">
                  {activeData.title}
                </h3>
                <p className="mt-4 text-sm md:text-base text-ink-soft leading-relaxed">
                  {activeData.body}
                </p>
              </div>

              {/* Panel Checklist */}
              <div className="lg:col-span-5 bg-cream-warm/30 rounded-2xl p-6 md:p-8 border border-line/60">
                <p className="text-[0.65rem] font-bold tracking-[0.2em] text-ink-muted uppercase mb-4">
                  What you get
                </p>
                <ul className="space-y-3">
                  {activeData.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm text-ink-soft"
                    >
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                        <svg
                          className="h-2.5 w-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <title>Included item checkmark</title>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Spotlight ── */}
      <Testimonials
        eyebrow="Mastermind client results"
        headline={
          <>
            What deeper support can{" "}
            <span className="italic text-terracotta font-display">shift.</span>
          </>
        }
        body="A closer look at the kinds of sales, visibility, and business-structure changes photographers worked through with ongoing feedback inside the Mastermind."
        ctaLabel="See all client results"
      />

      {/* ── 4 · FAQ Accordions ── */}
      <section className="panel-cream section py-20 md:py-28">
        <div className="container-editorial">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 md:sticky md:top-28 h-fit">
              <Reveal from="left">
                <span className="eyebrow">FAQ</span>
                <h2 className="display-3 mt-4 text-balance text-ink">
                  Common questions,{" "}
                  <span className="italic text-terracotta font-display">
                    answered.
                  </span>
                </h2>
                <p className="lead mt-5 text-ink-soft">
                  If you want to talk it through first, booking a discovery call
                  is the easiest place to start.
                </p>
                <div className="mt-8">
                  <Button href={site.bookingHref}>Book a call</Button>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal from="right">
                <Accordion items={faqAccordionItems} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 · Final CTA · Full-bleed image ── */}
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
              Ready for deeper support?
            </h2>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              The Mastermind is intentionally small to preserve direct feedback
              time. Apply to reserve your place in the next cohort.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={site.bookingHref} variant="primary">
                Apply now
                <span aria-hidden>→</span>
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
              >
                Ask a question
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyCta href={site.bookingHref} label="Apply now" />
    </>
  );
}
