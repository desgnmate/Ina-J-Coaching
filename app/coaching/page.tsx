import type { Metadata } from "next";
import Image from "next/image";
import { Testimonials } from "@/components/home/Testimonials";
import { Button } from "@/components/shared/Button";
import { CoachingQuiz } from "@/components/shared/CoachingQuiz";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Explore the ways to work with Ina J Education, including the Marketing Workshop and the Consistent Bookings Mastermind.",
};

const stats = [
  {
    figure: "$305K+",
    label: "Studio revenue by year six",
  },
  {
    figure: "$2,600–$2,800",
    label: "Average client sale",
  },
  {
    figure: "Sony Advocate",
    label: "Australia Brand Representative",
  },
];

const matrix = [
  {
    feature: "Best For",
    workshop:
      "Photographers needing a structural reset, clear message, and actionable 90-day map.",
    mastermind:
      "Photographers ready for deep implementation, personalized strategy, and live copy reviews.",
  },
  {
    feature: "Duration",
    workshop: "3 Live Sessions (approx. 2 weeks)",
    mastermind: "Full cohort container with recurring weekly calls",
  },
  {
    feature: "Support Level",
    workshop: "Interactive Live Q&A during curriculum sessions",
    mastermind:
      "Weekly group coaching, async Slack support, and direct reviews from Ina",
  },
  {
    feature: "Deliverable",
    workshop: "A tailored 90-Day Marketing Plan",
    mastermind:
      "Optimized sales journey, audited pricing, and messaging rollout",
  },
  {
    feature: "Investment",
    workshop: "$790 AUD / $559 USD",
    mastermind: "$2,500 USD",
  },
];

export default function CoachingPage() {
  return (
    <>
      {/* ── 1 · Redesigned Bespoke Hero ── */}
      <section className="bg-grid bg-noise-cream relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div className="container-editorial relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-6">
              <Reveal from="right">
                <span className="eyebrow">WORK WITH ME</span>
                <h1 className="display-1 mt-4 text-balance text-ink">
                  Support built for your{" "}
                  <span className="italic text-terracotta font-display">
                    next season.
                  </span>
                </h1>
                <p className="lead mt-6 max-w-xl text-ink-soft">
                  We don't do generic coaching formulas. Choose a short-term
                  strategic reset through the Workshop, or step into the
                  Mastermind container for hands-on, direct implementation
                  feedback.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#compare" className="btn-primary">
                    Compare Programs <span aria-hidden>↓</span>
                  </a>
                  <a href="#quiz" className="btn-secondary">
                    Take the Quiz
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column - Editorial Dual-Card Visual */}
            <div className="lg:col-span-6 relative flex flex-col md:flex-row gap-5">
              {/* Card 1: Workshop */}
              <Reveal from="up" className="flex-1">
                <div className="group relative h-full rounded-[2rem] border border-line bg-cream p-7 shadow-[0_12px_35px_-18px_rgba(68,53,61,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/25 hover:shadow-[0_18px_45px_-20px_rgba(68,53,61,0.18)]">
                  <span className="text-[0.65rem] font-bold tracking-[0.2em] text-gold uppercase">
                    01 / Curated Reset
                  </span>
                  <h3 className="font-display text-xl text-ink mt-3 leading-snug">
                    The Workshop
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-3">
                    Build a clearer foundation and audit your visibility. Exit
                    with a 90-day plan you'll actually implement.
                  </p>
                  <div className="mt-6">
                    <Button
                      href="/workshop"
                      variant="secondary"
                      className="w-full"
                    >
                      View Workshop Details
                    </Button>
                  </div>
                </div>
              </Reveal>

              {/* Card 2: Mastermind */}
              <Reveal from="up" delay={0.1} className="flex-1">
                <div className="group relative h-full rounded-[2rem] border border-cream/10 bg-ink p-7 text-cream shadow-[0_12px_35px_-18px_rgba(68,53,61,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-[0_18px_45px_-20px_rgba(68,53,61,0.35)]">
                  <span className="text-[0.65rem] font-bold tracking-[0.2em] text-terracotta-soft uppercase">
                    02 / Deep Container
                  </span>
                  <h3 className="font-display text-xl text-cream mt-3 leading-snug">
                    The Mastermind
                  </h3>
                  <p className="mt-3 text-sm text-cream/70 leading-relaxed line-clamp-3">
                    A high-touch mentorship container for photographers ready to
                    optimize pricing, convert enquiries, and scale.
                  </p>
                  <div className="mt-6">
                    <Button
                      href="/mastermind"
                      variant="primary"
                      className="w-full"
                    >
                      View Mastermind Details
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Quiz Section ── */}
      <section
        id="quiz"
        className="bg-cream-deep section relative overflow-hidden py-20 md:py-28"
      >
        <div className="container-editorial relative">
          <SectionHeading
            eyebrow="Pathfinder"
            headline={
              <>
                Unsure which container fits your{" "}
                <span className="italic text-terracotta font-display">
                  business current?
                </span>
              </>
            }
            body="Use our interactive tool below to weigh your business challenges, available hours, and coaching needs."
            align="center"
          />
          <div className="mt-12">
            <Reveal from="scale" delay={0.1}>
              <CoachingQuiz />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3 · Redesigned Comparison Matrix ── */}
      <section id="compare" className="bg-cream section py-20 md:py-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="At a Glance"
            headline={
              <>
                Side-by-side{" "}
                <span className="italic text-terracotta font-display">
                  comparison.
                </span>
              </>
            }
            body="Review the differences between our curriculum-based workshop and our implementation-focused container."
          />

          <div className="mt-12 overflow-x-auto rounded-[2rem] border border-line bg-cream shadow-sm">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-line bg-cream-warm/40">
                  <th className="p-6 font-display text-lg text-ink font-semibold w-1/4">
                    Criteria
                  </th>
                  <th className="p-6 font-display text-lg text-terracotta font-semibold w-3/8">
                    The Workshop
                  </th>
                  <th className="p-6 font-display text-lg text-gold font-semibold w-3/8">
                    The Mastermind
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {matrix.map((row) => (
                  <tr
                    key={row.feature}
                    className="transition-colors hover:bg-cream-warm/10"
                  >
                    <td className="p-6 font-medium text-ink">{row.feature}</td>
                    <td className="p-6 text-ink-soft leading-relaxed">
                      {row.workshop}
                    </td>
                    <td className="p-6 text-ink-soft leading-relaxed">
                      {row.mastermind}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="p-6"></td>
                  <td className="p-6">
                    <Button
                      href="/workshop"
                      variant="secondary"
                      className="w-full justify-center"
                    >
                      Explore Workshop
                    </Button>
                  </td>
                  <td className="p-6">
                    <Button
                      href="/mastermind"
                      variant="primary"
                      className="w-full justify-center"
                    >
                      Apply to Mastermind
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4 · Stats · Dark section ── */}
      <section className="bg-ink section relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-gold/12 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-terracotta/8 blur-3xl"
        />

        <div className="container-editorial relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <span className="text-gold text-[0.75rem] font-medium uppercase tracking-[0.18em]">
                Why this is different
              </span>
              <h2 className="display-2 mt-5 text-balance text-cream">
                Still photographing, still refining, still{" "}
                <span className="italic text-gold font-display">
                  paying attention.
                </span>
              </h2>
            </div>
            <Reveal className="md:col-span-5">
              <p className="body-lg max-w-md md:ml-auto text-cream/90">
                Ina is not teaching from a business she used to run. The studio
                is active, the market feedback is current, and the coaching
                stays grounded in what is working now.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="rounded-[2rem] border border-cream/10 bg-ink-soft/30 p-8 md:p-10">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
                {stats[0].label}
              </p>
              <p className="mt-6 font-sans font-light text-[3.6rem] leading-none text-cream md:text-[4.4rem]">
                {stats[0].figure}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
                The studio is still active, profitable, and close enough to the
                current market to keep the coaching practical.
              </p>
            </div>
            <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
              {stats.map((stat, index) =>
                index === 0 ? null : (
                  <Reveal key={stat.label} delay={index * 0.08} from="up">
                    <div className="h-full rounded-[2rem] border border-cream/10 bg-ink-soft/18 px-8 py-8 text-left">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
                        {stat.label}
                      </p>
                      <p className="mt-5 font-sans font-light text-[2.6rem] leading-none text-cream md:text-[3rem]">
                        {stat.figure}
                      </p>
                    </div>
                  </Reveal>
                ),
              )}
              <div className="rounded-[2rem] border border-terracotta/18 bg-gradient-to-br from-terracotta/10 to-transparent px-8 py-8 text-left md:col-span-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-terracotta-soft">
                  Why it matters
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/82">
                  This is not legacy advice repackaged as coaching. The message,
                  pricing, and visibility guidance are informed by a studio that
                  is still selling now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Spotlight ── */}
      <Testimonials />

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
              Not sure which path is the right fit?
            </h2>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              A short call is the best place to work out whether the Workshop or
              the Mastermind matches where you are right now.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={site.bookingHref} variant="primary">
                Book a call
                <span aria-hidden>→</span>
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
              >
                Send a message
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyCta href={site.bookingHref} label="Book a call" />
    </>
  );
}
