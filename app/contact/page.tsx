import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/shared/Reveal";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery call, send an email, or connect with Ina J Education on Instagram.",
};

const bookingSlots = [
  { day: "Monday", time: "10:00 AM AEST" },
  { day: "Tuesday", time: "2:00 PM AEST" },
  { day: "Thursday", time: "11:30 AM AEST" },
  { day: "Friday", time: "1:00 PM AEST" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── 1 · Hero Layout ── */}
      <section className="bg-grid bg-noise-cream relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-36">
        <div className="container-editorial relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left Column - Headline */}
            <div className="lg:col-span-7">
              <Reveal from="left">
                <span className="eyebrow">CONTACT</span>
                <h1 className="display-1 mt-4 text-balance text-ink">
                  Reach out when you are ready for the{" "}
                  <span className="italic text-terracotta font-display">
                    next step.
                  </span>
                </h1>
                <p className="lead mt-6 max-w-xl text-ink-soft">
                  Whether you have questions about the Workshop curriculum, want
                  to verify if the Mastermind matches your studio revenue level,
                  or simply want to chat, we are here.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-6 border-t border-line/60 pt-6">
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.2em] text-ink-muted uppercase">
                      Direct Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-2 block text-base font-semibold text-terracotta hover:text-terracotta-deep transition-colors"
                    >
                      {site.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.2em] text-ink-muted uppercase">
                      Social Channel
                    </p>
                    <a
                      href={site.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-base font-semibold text-ink hover:text-terracotta transition-colors"
                    >
                      @inaj.thepetphotoceo
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column - Booking Scheduler Widget */}
            <div className="lg:col-span-5">
              <Reveal from="scale" delay={0.15}>
                <div className="relative rounded-[2.5rem] border border-line bg-cream p-8 shadow-[0_22px_50px_-25px_rgba(68,53,61,0.18)]">
                  <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] text-terracotta uppercase">
                      Book a Call
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>

                  <h3 className="font-display text-xl text-ink font-semibold">
                    15-Min Discovery Call
                  </h3>
                  <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                    Select a simulated slot below to jump directly to our
                    calendar booking application.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {bookingSlots.map((slot) => (
                      <a
                        key={`${slot.day}-${slot.time}`}
                        href={site.bookingHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-line bg-cream-warm/30 p-3 text-center transition-all duration-300 hover:border-terracotta/40 hover:bg-cream-warm/70 group"
                      >
                        <span className="block text-[0.65rem] font-bold tracking-[0.1em] text-ink group-hover:text-terracotta transition-colors">
                          {slot.day}
                        </span>
                        <span className="block text-[0.6rem] text-ink-soft mt-1">
                          {slot.time}
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-line/60 pt-4 text-center">
                    <a
                      href={site.bookingHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-terracotta hover:underline"
                    >
                      See full calendar availability →
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · Split Form Section ── */}
      <section className="bg-cream-deep bg-dots section has-pattern py-20 md:py-28">
        <div className="container-editorial">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-cream shadow-[0_22px_50px_-25px_rgba(68,53,61,0.14)]">
            <div className="grid items-stretch lg:grid-cols-12">
              <div className="border-b border-line lg:col-span-5 lg:border-b-0 lg:border-r">
                <div className="flex h-full flex-col">
                  <div className="relative aspect-[5/4] w-full overflow-hidden">
                    <Image
                      src={images.contactFeature.src}
                      alt="Golden retriever smiling"
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-grain pointer-events-none" />
                  </div>

                  <div className="flex flex-1 flex-col bg-cream p-6 md:p-8">
                    <h4 className="font-display text-lg text-ink font-semibold">
                      Have a quick question?
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                      You can always drop Ina a direct message on Instagram. It
                      is the easiest place to get a feel for her voice, daily
                      studio operations, and upcoming student highlights.
                    </p>
                    <div className="mt-auto pt-6">
                      <Button
                        href={site.socials.instagram}
                        external
                        variant="secondary"
                        className="w-full justify-center"
                      >
                        DM on Instagram
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ContactForm source="contact-page" embedded />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · CTA Banner ── */}
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
              Ready to build a steadier photography business?
            </h2>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              The first conversation is the best way to work out whether the
              Workshop or the Mastermind is the right fit for where you are now.
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
                Explore coaching
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <StickyCta href={site.bookingHref} label="Book a call" />
    </>
  );
}
