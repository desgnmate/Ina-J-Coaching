"use client";

import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

export function AboutHero() {
  return (
    <section className="bg-grid bg-noise-cream relative h-auto overflow-hidden pt-20 pb-10 md:pt-12 md:pb-12 lg:min-h-screen lg:max-h-[950px] lg:py-[clamp(2rem,4vh,3.25rem)]">
      <div className="container-editorial relative z-10 h-full">
        <div className="flex min-h-0 flex-col justify-center lg:min-h-[calc(100svh-5rem)] lg:justify-center">
          <div className="relative hidden items-center justify-center lg:flex lg:min-h-[60vh] xl:min-h-[66vh]">
            <div className="relative w-full lg:max-w-[64rem] xl:max-w-[70rem]">
              <div className="absolute right-0 top-1/2 h-[60vh] w-[42%] -translate-y-1/2 overflow-hidden rounded-[2rem] bg-cream-deep shadow-[0_26px_70px_-28px_rgba(43,31,23,0.18)] xl:h-[68vh] xl:w-[46%] 2xl:h-[74vh] 2xl:w-[48%]">
                <Image
                  src={images.aboutHero.src}
                  alt={images.aboutHero.alt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 48vw, 45vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="relative z-10 w-full max-w-[28rem] rounded-[1.75rem] border border-white/30 bg-cream/68 p-6 shadow-[0_20px_50px_-28px_rgba(43,31,23,0.18)] backdrop-blur-sm lg:translate-x-[12%] xl:max-w-[31rem] xl:p-8 xl:translate-x-[14%] 2xl:max-w-[33rem] 2xl:p-9 2xl:translate-x-[16%]">
                <p className="eyebrow text-xs font-semibold tracking-[0.2em] text-terracotta">
                  ABOUT INA
                </p>

                <h1 className="display-1 mt-4 max-w-xl text-balance text-ink lg:text-[2.85rem] xl:text-[3.45rem] 2xl:text-[4rem]">
                  A photographer who became a{" "}
                  <span className="italic text-terracotta">mentor.</span>
                </h1>

                <p className="mt-5 max-w-md text-base leading-relaxed text-ink md:text-lg">
                  What began with Mac became a six-figure photography brand and
                  a coaching practice for photographers who want clearer,
                  more-booked businesses.
                </p>

                <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:gap-4">
                  <Button href={site.bookingHref} variant="primary">
                    Work with Ina <span aria-hidden>→</span>
                  </Button>
                  <Button href="/coaching" variant="secondary">
                    Explore coaching
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="w-full rounded-[1.5rem] border border-line/50 bg-cream/88 p-6 shadow-[0_25px_60px_-30px_rgba(43,31,23,0.22)] backdrop-blur-sm md:p-8">
              <p className="eyebrow text-xs font-semibold tracking-[0.2em] text-terracotta">
                ABOUT INA
              </p>

              <h1 className="display-1 mt-4 max-w-xl text-balance text-[2.8rem] text-ink md:text-[3.2rem]">
                A photographer who became a{" "}
                <span className="italic text-terracotta">mentor.</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-ink md:text-lg">
                What began with Mac became a six-figure photography brand and a
                coaching practice for photographers who want clearer,
                more-booked businesses.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button href={site.bookingHref} variant="primary">
                  Work with Ina <span aria-hidden>→</span>
                </Button>
                <Button href="/coaching" variant="secondary">
                  Explore coaching
                </Button>
              </div>
            </div>

            <div className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-cream-deep shadow-[0_20px_50px_-15px_rgba(43,31,23,0.12)] md:mt-10">
              <Image
                src={images.aboutHero.src}
                alt={images.aboutHero.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
