import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { CountUp } from "@/components/shared/CountUp";
import { ImageReveal } from "@/components/shared/ImageReveal";
import { PullQuote } from "@/components/shared/PullQuote";
import { Reveal } from "@/components/shared/Reveal";
import { SplitText } from "@/components/shared/SplitText";
import { site, testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Stories from pet photographers who have worked with Ina through coaching, mentoring, and the Pet Photographers Collective.",
};

const stats = [
  { figure: 120, suffix: "+", label: "Photographers coached" },
  { figure: 6, prefix: "", suffix: "-fig", label: "Ina’s own studio revenue" },
  { figure: 30, suffix: "+", label: "Awards & features" },
  { figure: 12, suffix: " yrs", label: "In the pet photography industry" },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-noise-cream has-pattern relative overflow-hidden pt-32 md:pt-40 lg:pt-48">
        <div className="container-editorial relative">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Testimonials</p>
            </Reveal>
            <div className="mt-5">
              <SplitText as="h1" className="display-1 text-balance">
                Real photographers.
              </SplitText>
              <h1 className="display-1 -mt-2 text-balance italic text-terracotta">
                Real shifts.
              </h1>
            </div>
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-2xl">
                Stories from pet photographers who wanted clearer marketing,
                better clients, and a business that felt more like their own —
                and who took the next step.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-editorial">
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                className="bg-cream-deep p-8 text-center"
                delay={i * 0.08}
                from="scale"
                amount={0.5}
              >
                <p className="font-display text-5xl italic text-terracotta md:text-6xl">
                  {s.prefix}
                  <CountUp to={s.figure} />
                  {s.suffix}
                </p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-ink-soft">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grain section has-pattern relative">
        <div className="container-editorial relative">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                className={`flex flex-col ${
                  i % 3 === 1 ? "lg:translate-y-8" : ""
                }`}
                delay={(i % 3) * 0.1}
                from="up"
                amount={0.25}
              >
                <figure className="flex h-full flex-col">
                  <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </ImageReveal>
                  <div className="mt-8">
                    <PullQuote quote={t.quote} />
                  </div>
                  <figcaption className="mt-6 text-[0.7rem] uppercase tracking-[0.22em] text-ink-soft">
                    <span className="text-ink">{t.name}</span>
                    <span className="mx-2 text-line">·</span>
                    {t.studio}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blob panel-cream section has-pattern relative overflow-hidden">
        <div className="container-editorial text-center">
          <Reveal>
            <SplitText
              as="h2"
              className="display-2 mx-auto max-w-2xl text-balance"
              mode="word"
            >
              Could your story be the next one here?
            </SplitText>
            <p className="lead mx-auto mt-6 max-w-xl">
              If you’re ready to make the next 90 days the most intentional your
              business has had, the conversation starts with a single call.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={site.bookingHref} variant="primary">
                Book a Coaching Call
                <span aria-hidden>→</span>
              </Button>
              <Button href="/coaching" variant="secondary">
                See the program
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
