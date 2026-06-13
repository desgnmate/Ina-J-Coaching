import type { Metadata } from "next";
import Image from "next/image";
import { Testimonials } from "@/components/home/Testimonials";
import { Accordion } from "@/components/shared/Accordion";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Workshop",
  description:
    "Pet Photography Marketing System Workshop, a three-session live workshop for photographers who want clearer positioning and a steadier marketing plan.",
};

const modules = [
  {
    number: "01",
    title: "Aligned Positioning",
    body: "Clarify who you are for, what your work does best, and how to explain the value without overcomplicating it.",
    details: [
      "Identify your premium client archetype",
      "Craft your core positioning hook",
      "Audit your current portfolio messaging",
    ],
  },
  {
    number: "02",
    title: "Magnetic Visibility",
    body: "Build a steadier plan for showing up, getting remembered, and turning attention into better enquiries.",
    details: [
      "Select your primary visibility loop",
      "Design an email lead capture hook",
      "Map a low-friction enquiry pathway",
    ],
  },
  {
    number: "03",
    title: "90-Day Marketing Plan",
    body: "Leave with a realistic plan for the next quarter, with actions you can keep up with in a real business.",
    details: [
      "Map your actual working calendar",
      "Create a task-by-task execution grid",
      "Build pricing and offer consistency boundaries",
    ],
  },
];

const faqs = [
  {
    title: "Is the Workshop a good fit if I am just starting out?",
    content:
      "It helps to already be shooting and charging something, even a small amount. The curriculum is built around refining what is already in motion, not building a business from zero.",
  },
  {
    title: "How are the sessions run?",
    content:
      "Three live group sessions, with space for questions and tailored feedback. Between sessions you have time to apply the work, then bring your questions back to the next call.",
  },
  {
    title: "What if I cannot make a session live?",
    content:
      "Replays are shared within 24 hours, so you can catch up on your own schedule and still bring questions to the next session.",
  },
  {
    title: "Is this useful for portrait or brand photographers too?",
    content:
      "Most of the principles translate. The marketing and client experience work applies broadly. We can talk through fit on the discovery call.",
  },
  {
    title: "What happens after the Workshop?",
    content:
      "You leave with a 90-day plan, a clearer message, and a more intentional offer. If you want deeper support, the Mastermind is the natural next step.",
  },
];

export default function WorkshopPage() {
  const faqAccordionItems = faqs.map((faq) => ({
    title: faq.title,
    content: <p>{faq.content}</p>,
  }));

  return (
    <>
      {/* ── 1 · Redesigned Custom Hero ── */}
      <section className="bg-grid bg-noise-cream relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div className="container-editorial relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Info Column */}
            <div className="lg:col-span-6">
              <Reveal from="left">
                <span className="eyebrow">WORKSHOP / 3 LIVE SESSIONS</span>
                <h1 className="display-1 mt-4 text-balance text-ink">
                  Build a marketing system you can{" "}
                  <span className="italic text-terracotta font-display">
                    actually maintain.
                  </span>
                </h1>
                <p className="lead mt-6 max-w-xl text-ink-soft">
                  Stop improvising your visibility. Join a live three-session
                  sprint to clarify your message, establish pricing boundaries,
                  and outline a realistic 90-day roadmap.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href={site.bookingHref} variant="primary">
                    Apply for Next Cohort <span aria-hidden>→</span>
                  </Button>
                  <Button href="#curriculum" variant="secondary">
                    View Syllabus
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right Interactive Schedule Column */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-ink bg-grain border border-cream/8 shadow-[0_30px_60px_-20px_rgba(68,53,61,0.25)]">
                {/* Header */}
                <div className="px-8 pt-8 pb-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-terracotta-soft">
                      Upcoming syllabus
                    </span>
                    <span className="h-px flex-1 bg-cream/10" />
                    <span className="text-[0.6rem] uppercase tracking-[0.15em] text-cream/40">
                      3 sessions
                    </span>
                  </div>
                  <h3 className="font-display text-[1.5rem] text-cream leading-snug max-w-md">
                    Three live sessions with a clear 90-day outcome.
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    <span className="text-xs text-cream/50">
                      <span className="text-cream/30">Format</span>{" "}
                      <span className="text-cream/70">Live online</span>
                    </span>
                    <span className="text-xs text-cream/50">
                      <span className="text-cream/30">Investment</span>{" "}
                      <span className="text-cream/70">$790 AUD / $559 USD</span>
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-8 h-px bg-cream/8" />

                {/* Module List - Timeline Style */}
                <div className="px-8 py-6">
                  <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-4 top-3 bottom-3 w-px bg-cream/8" />

                    <div className="space-y-6">
                      {modules.map((m, i) => (
                        <div
                          key={m.title}
                          className="relative flex gap-4 group"
                        >
                          {/* Number dot */}
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-medium text-cream transition-colors group-hover:bg-terracotta-deep">
                            {m.number}
                          </div>
                          <div className="pt-0.5">
                            <h4 className="font-display text-[0.95rem] font-medium text-cream/90 transition-colors group-hover:text-cream">
                              {m.title}
                            </h4>
                            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-cream/45 max-w-sm">
                              {m.body}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mx-8 h-px bg-cream/8" />
                <div className="px-8 py-4 flex items-center justify-between text-[0.65rem] text-cream/35 uppercase tracking-[0.12em]">
                  <span>Includes session replays</span>
                  <span>Built for a practical 90-day plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Curriculum Timeline ── */}
      <section
        id="curriculum"
        className="bg-cream-deep bg-dots section has-pattern relative py-20 md:py-28"
      >
        <div className="container-editorial">
          <SectionHeading
            eyebrow="The curriculum"
            headline={
              <>
                Three sessions. One{" "}
                <span className="italic text-terracotta font-display">
                  practical system.
                </span>
              </>
            }
            body="Each module builds on the last, helping you strip away excess noise and focus on what actually triggers bookings."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {modules.map((module, i) => (
              <Reveal key={module.title} delay={i * 0.1} from="up">
                <div className="group relative h-full rounded-[2rem] border border-line bg-cream p-8 transition-all duration-300 hover:border-terracotta/25 hover:shadow-[0_15px_40px_-20px_rgba(68,53,61,0.12)] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-display text-5xl text-terracotta/25 transition-colors group-hover:text-terracotta/50">
                        {module.number}
                      </span>
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] text-ink-muted uppercase border border-line rounded-full px-3 py-1">
                        Session {module.number}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-ink mt-6">
                      {module.title}
                    </h3>
                    <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                      {module.body}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-line/45 pt-6">
                    <p className="text-[0.65rem] font-bold tracking-[0.15em] text-gold uppercase mb-3">
                      Key Focus areas
                    </p>
                    <ul className="space-y-2 text-xs text-ink-soft">
                      {module.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-terracotta shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Who It's For · Image + content overlap ── */}
      <section className="section relative overflow-hidden py-20 md:py-28">
        <div className="container-editorial relative">
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-0 relative">
            {/* Image Column */}
            <div className="relative z-0 md:col-span-7">
              <Reveal from="left" duration={0.8}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-[#e3d6bf]/20 shadow-[0_30px_70px_-20px_rgba(43,31,23,0.22)] md:aspect-[3/4] lg:aspect-[4/5] md:-my-12 md:-ml-8">
                  <Image
                    src={images.whoFor.src}
                    alt={images.whoFor.alt}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-grain pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/20 to-transparent pointer-events-none" />

                  <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start pointer-events-none">
                    <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-cream/90 bg-ink/30 px-3.5 py-1.5 rounded-full backdrop-blur-[2px] border border-white/10">
                      WHO IT IS FOR
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                    <p className="eyebrow text-terracotta-soft tracking-[0.22em] mb-2">
                      THE WORKSHOP
                    </p>
                    <h3 className="font-display text-2xl text-cream md:text-3xl lg:text-4xl leading-tight max-w-sm text-balance">
                      For photographers already{" "}
                      <span className="italic font-display">in motion.</span>
                    </h3>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Frosted Glass Content Column */}
            <div className="relative z-10 md:col-span-5 md:-ml-20">
              <div className="absolute -inset-10 -z-10 rounded-full bg-terracotta/12 blur-[100px] pointer-events-none" />

              <div className="relative rounded-[2rem] border border-white/40 bg-cream/72 p-8 shadow-[0_30px_70px_-30px_rgba(43,31,23,0.25)] backdrop-blur-md md:p-10 lg:p-12">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                <h2 className="display-3 text-balance text-ink leading-tight">
                  A strong fit if the business is{" "}
                  <em className="italic text-terracotta font-display">
                    moving
                  </em>
                  , but the system still feels fuzzy.
                </h2>

                <p className="mt-6 text-pretty text-sm leading-relaxed text-ink-soft">
                  This workshop is best for photographers who are already
                  shooting and charging something, and want a clearer structure
                  around positioning, visibility, and planning.
                </p>

                <div className="mt-8 rounded-2xl border border-line bg-cream-warm/60 p-6">
                  <p className="eyebrow mb-4 text-gold">At a glance</p>
                  <dl className="space-y-3 text-sm text-ink-soft">
                    <div className="flex justify-between gap-6 border-b border-line pb-3">
                      <dt>Format</dt>
                      <dd className="text-right text-ink">3 live sessions</dd>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-line pb-3">
                      <dt>Investment</dt>
                      <dd className="text-right text-ink">
                        $790 AUD / $559 USD
                      </dd>
                    </div>
                    <div className="flex justify-between gap-6">
                      <dt>Outcome</dt>
                      <dd className="text-right text-ink">
                        A practical 90-day plan
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 border-t border-line/30 pt-6">
                  <Button
                    href={site.bookingHref}
                    variant="primary"
                    className="w-full justify-center"
                  >
                    Apply now
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ── 5 · FAQ Accordions ── */}
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
                  If your question is not here, the discovery call is the
                  easiest way to talk it through.
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

      {/* ── 6 · Final CTA · Full-bleed image ── */}
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
              Ready for a clearer marketing system?
            </h2>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              Apply for the next Workshop cohort. Spaces are limited so the
              sessions stay interactive and tailored.
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
