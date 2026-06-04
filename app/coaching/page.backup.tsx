import type { Metadata } from "next";
import { Button } from "@/components/shared/Button";
import { LineDraw } from "@/components/shared/LineDraw";
import { Marquee } from "@/components/shared/Marquee";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SplitText } from "@/components/shared/SplitText";
import { offer, outcomes, pillars, site, whoFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "The Pet Photography Business Coaching Experience — a complete coaching program for pet photographers who want clearer messaging, intentional marketing, and consistent bookings.",
};

const inclusions = [
  {
    title: "Brand and offer clarity",
    body: "We define who you serve, what you stand for, and the offer that actually makes sense to that person. You leave with a message you can repeat without hesitation.",
  },
  {
    title: "Website and messaging review",
    body: "A line-by-line look at your homepage, your about page, your enquiry form, and the words scattered across your site. We rewrite the parts that are quietly costing you bookings.",
  },
  {
    title: "Marketing strategy",
    body: "A simple, repeatable plan that brings the right enquiries to your inbox. Not a 40-tab spreadsheet — a real plan that fits the way you actually work.",
  },
  {
    title: "Client journey improvement",
    body: "From the first enquiry to the final delivery, we map and improve the moments that turn a session into a high-value, refer-worthy client relationship.",
  },
  {
    title: "Content direction",
    body: "Stop wondering what to post. You’ll leave with themes, formats, and a small library of post ideas built around your offer and your dream client.",
  },
  {
    title: "Pricing and positioning guidance",
    body: "Pricing that reflects the work, packaging that sells itself, and the language to talk about money without apologising or over-explaining.",
  },
  {
    title: "Action plan for consistent bookings",
    body: "A 90-day plan you can actually run. Priorities, weekly actions, and the small handful of metrics that tell you whether things are working.",
  },
];

const process = [
  {
    step: "01",
    title: "Apply",
    body: "Tell me about your business, your goals, and what’s been getting in the way. I read every application personally.",
  },
  {
    step: "02",
    title: "Match",
    body: "We jump on a 30-minute call to make sure the program is a fit, and to answer every question you have before we start.",
  },
  {
    step: "03",
    title: "Coach",
    body: "We work through the framework together — live sessions, async support, and a clear plan between calls. You build, I review, we refine.",
  },
];

const faqs = [
  {
    q: "How long is the program?",
    a: "Most photographers work through the core coaching experience over 8–12 weeks, depending on the pace that suits their business. The plan and the call schedule are built around you.",
  },
  {
    q: "Is the coaching online?",
    a: "Yes. Sessions are run over Zoom and supported by async voice-note feedback and a shared workspace, so you always know what to focus on between calls.",
  },
  {
    q: "I’m just starting out — is this for me?",
    a: "The program works best for photographers who are already shooting and have at least a few clients under their belt. If you’re pre-launch, the Consistent Bookings Audit is a better first step.",
  },
  {
    q: "I’m an established photographer but I’m not pet-specific.",
    a: "Most of the work translates to portrait and brand photographers too — the marketing and client-experience principles are the same. We’ll cover this in the discovery call.",
  },
  {
    q: "What if I’m not sure I need coaching?",
    a: "Start with the free Consistent Bookings Audit. It takes a few minutes and tells you exactly where your marketing system is breaking down. From there you’ll know whether coaching is the right next step.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. Payment plans are available — we’ll work out the schedule on the discovery call.",
  },
];

export default function CoachingPage() {
  return (
    <>
      <section className="bg-noise-cream has-pattern relative overflow-hidden pt-28 md:pt-32 lg:pt-36">
        <div className="container-editorial relative">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-4">
                  <p className="eyebrow">{offer.eyebrow}</p>
                  <LineDraw
                    width={48}
                    height={1}
                    color="var(--color-terracotta)"
                  />
                </div>
              </Reveal>
              <div className="mt-5">
                <SplitText as="h1" className="display-1 text-balance">
                  {offer.program}
                </SplitText>
              </div>
              <Reveal>
                <p className="lead mt-6 max-w-2xl">{offer.intro}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#apply" variant="primary">
                    Apply for Coaching
                    <span aria-hidden>→</span>
                  </Button>
                  <Button href={site.bookingHref} variant="secondary">
                    Book a discovery call
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal className="self-end lg:col-span-5" from="right" delay={0.2}>
              <div className="rounded-2xl border border-line bg-cream-deep p-8">
                <p className="eyebrow">Program at a glance</p>
                <dl className="mt-5 space-y-4 text-sm text-ink-soft">
                  <div className="flex justify-between gap-6 border-b border-line pb-3">
                    <dt>Format</dt>
                    <dd className="text-right text-ink">Live + async</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-line pb-3">
                    <dt>Duration</dt>
                    <dd className="text-right text-ink">8–12 weeks</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-line pb-3">
                    <dt>Investment</dt>
                    <dd className="text-right text-ink">Discussed on call</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Outcome</dt>
                    <dd className="text-right text-ink">90-day plan</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <section className="overflow-hidden border-y border-line bg-cream-deep py-6">
        <Marquee
          speed={0.25}
          className="text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft"
        >
          <span>Clarity</span>
          <span className="text-terracotta">·</span>
          <span>Strategy</span>
          <span className="text-terracotta">·</span>
          <span>Confidence</span>
          <span className="text-terracotta">·</span>
          <span>Bookings</span>
          <span className="text-terracotta">·</span>
          <span>Storytelling</span>
          <span className="text-terracotta">·</span>
          <span>Connection</span>
          <span className="text-terracotta">·</span>
          <span>Intention</span>
          <span className="text-terracotta">·</span>
        </Marquee>
      </section>

      <section className="section">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="The framework"
            headline="Three pillars that hold the whole business up."
            as="h2"
          />
          <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
            {pillars.items.map((p, i) => (
              <Reveal
                key={p.title}
                className="group bg-cream p-8 md:p-10"
                delay={i * 0.1}
                from="up"
                amount={0.3}
              >
                <span className="font-display text-5xl italic text-terracotta transition-transform duration-500 group-hover:-translate-y-1 md:text-6xl">
                  {p.number}
                </span>
                <h3 className="display-3 mt-5">{p.title}</h3>
                <p className="mt-4 text-pretty text-ink-soft">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="who"
        className="bg-blob panel-peach section has-pattern relative overflow-hidden"
      >
        <div className="container-editorial relative">
          <SectionHeading
            eyebrow="Who this is for"
            headline={whoFor.headline}
            as="h2"
          />
          <div className="mt-16 grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ul className="space-y-px">
                {whoFor.yes.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={i * 0.06}
                    from="left"
                    amount={0.3}
                  >
                    <div className="group grid grid-cols-[auto_1fr] items-start gap-4 border-t border-line py-5">
                      <span
                        aria-hidden
                        className="mt-1 inline-grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-terracotta text-cream transition-transform duration-500 group-hover:scale-110"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <title>Check</title>
                          <path
                            d="M4 12l5 5L20 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="text-pretty text-ink md:text-lg">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal className="lg:col-span-5" from="right" delay={0.2}>
              <div className="rounded-2xl border border-ink/10 bg-cream p-8">
                <p className="eyebrow text-ink-muted">A small note</p>
                <p className="body-lg mt-4 italic text-ink-soft">{whoFor.no}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-grid section has-pattern relative">
        <div className="container-editorial relative">
          <SectionHeading
            eyebrow="What’s inside"
            headline="Everything that goes into a clearer, more bookable business."
            as="h2"
          />
          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {inclusions.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 4) * 0.06}
                from="up"
                amount={0.3}
              >
                <div className="group">
                  <div className="grid grid-cols-[auto_1fr] items-start gap-5">
                    <span className="font-display text-3xl italic text-terracotta transition-transform duration-500 group-hover:-translate-y-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-ink md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-pretty text-ink-soft">
                        {item.body}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 h-px w-8 bg-line transition-all duration-700 group-hover:w-16 group-hover:bg-terracotta" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lines panel-cream section has-pattern relative">
        <div className="container-editorial relative">
          <SectionHeading
            eyebrow="What you’ll walk away with"
            headline={outcomes.headline}
            as="h2"
          />
          <div className="mt-16 grid gap-px bg-terracotta/15 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.items.map((item, i) => (
              <Reveal
                key={item}
                className="group bg-cream p-8"
                delay={(i % 3) * 0.1}
                from="up"
                amount={0.3}
              >
                <span className="font-display text-4xl italic text-terracotta transition-transform duration-500 group-hover:-translate-y-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-lg text-ink">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="How it works"
            headline="A simple path from application to action plan."
            as="h2"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1} from="up" amount={0.3}>
                <div className="group relative h-full rounded-2xl border border-line p-8 transition-colors hover:border-terracotta/40">
                  <span className="font-display text-6xl italic text-terracotta transition-transform duration-500 group-hover:-translate-y-1">
                    {p.step}
                  </span>
                  <h3 className="display-3 mt-4">{p.title}</h3>
                  <p className="mt-4 text-pretty text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-cream section">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="A real promise"
            headline="Built around the work, not the hype."
            as="h2"
            body="Coaching should be useful, honest, and grounded in real practice. The same expectation I hold for my own photography is the one I hold for every coaching relationship."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal from="left">
              <div className="rounded-2xl border border-line bg-cream p-8">
                <p className="eyebrow">My commitment</p>
                <p className="body-lg mt-4">
                  You’ll get direct, specific, usable feedback. Not generic
                  advice, not motivational noise — real strategy for the
                  business you actually run.
                </p>
              </div>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <div className="rounded-2xl border border-line bg-cream p-8">
                <p className="eyebrow">Your commitment</p>
                <p className="body-lg mt-4">
                  You show up, do the work between calls, and treat this like
                  the business investment it is. That’s the deal, and it’s why
                  the results hold long after the program ends.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Common questions"
            headline="Everything you might be wondering."
            as="h2"
          />
          <div className="mt-16 max-w-3xl">
            {faqs.map((f, i) => (
              <Reveal
                as="div"
                key={f.q}
                delay={i * 0.04}
                from="up"
                amount={0.2}
              >
                <details
                  className="group border-b border-line py-6"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                    <h3 className="font-display text-xl text-ink md:text-2xl">
                      {f.q}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-1 inline-grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-line text-terracotta transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="body-lg mt-4 max-w-2xl text-pretty text-ink-soft">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section">
        <div className="container-editorial">
          <Reveal>
            <div className="rounded-[28px] bg-ink px-6 py-16 text-cream md:px-16 md:py-24">
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow text-terracotta-soft">
                  Apply for coaching
                </p>
                <SplitText
                  as="h2"
                  className="display-2 mt-5 text-balance text-cream"
                  mode="word"
                >
                  Ready to build a more bookable business?
                </SplitText>
                <p className="mt-6 text-pretty text-cream/80 md:text-lg">
                  Tell me a little about your business and where you’d like to
                  be in 90 days. I read every application and reply personally
                  within two business days.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <Button href={site.bookingHref} variant="primary">
                    Book a discovery call
                    <span aria-hidden>→</span>
                  </Button>
                  <Button
                    href="/contact"
                    variant="secondary"
                    className="border-cream text-cream hover:bg-cream hover:text-ink"
                  >
                    Send a written enquiry
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
