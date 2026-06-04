"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { aboutTeaser } from "@/lib/content";
import { images } from "@/lib/images";

/* ---------------------------------------------------------------------------
 * Premium scroll-driven About section.
 *
 * Timeline (section height = 300vh, inner sticky = 100vh):
 *   scrollYProgress  0.00 → 0.55   image expands from a contained card
 *                                 into a full-screen 100vh sticky image
 *   scrollYProgress  0.55 → 0.72   image pinned at full-screen (dwell)
 *   scrollYProgress  0.72 → 0.95   terracotta gradient + copy fade in
 *   scrollYProgress  0.95 → 1.00   settled final state
 *
 * The image is the visual anchor; copy waits for it to land.
 *
 * On mobile (<md) the sticky expansion is disabled. The image is rendered
 * full-width as a hero with a strong gradient overlay, and the copy stacks
 * below in a terracotta card.
 * ------------------------------------------------------------------------- */
export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const widthPx = useMotionValue("62vw");
  const heightPx = useMotionValue("72vh");
  const radius = useMotionValue(28);
  const yLift = useMotionValue(48);
  const imageScale = useMotionValue(1);
  const copyOpacity = useMotionValue(0);
  const copyY = useMotionValue(28);
  const gradientOpacity = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const p = Math.max(0, Math.min(1, progress));

    const expandT = Math.max(0, Math.min(1, p / 0.55));
    const eased = 1 - (1 - expandT) ** 3;

    widthPx.set(`${62 + eased * 38}vw`);
    heightPx.set(`${72 + eased * 28}vh`);
    radius.set(28 - eased * 28);
    yLift.set(48 - eased * 48);

    const scaleT = Math.max(0, Math.min(1, (p - 0.35) / 0.2));
    const scaleEased = 1 - (1 - scaleT) ** 2;
    imageScale.set(1 + scaleEased * 0.05);

    const fadeT = Math.max(0, Math.min(1, (p - 0.72) / 0.23));
    const fadeEased = fadeT * fadeT * (3 - 2 * fadeT);

    copyOpacity.set(fadeEased);
    gradientOpacity.set(fadeEased);
    copyY.set(28 - fadeEased * 28);
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: "300vh" }}
        aria-label="Meet Ina"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl shadow-ink/25 will-change-transform"
            style={{
              width: widthPx,
              height: heightPx,
              borderRadius: radius,
              y: yLift,
            }}
            initial={false}
          >
            <motion.div
              className="relative h-full w-full will-change-transform"
              style={{ scale: imageScale }}
              initial={false}
            >
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-grain pointer-events-none" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: gradientOpacity,
                background:
                  "linear-gradient(90deg, rgba(202, 95, 60, 0) 0%, rgba(202, 95, 60, 0.55) 55%, rgba(202, 95, 60, 0.85) 100%)",
              }}
              initial={false}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center"
            style={{ opacity: copyOpacity }}
            initial={false}
          >
            <div className="container-editorial w-full">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="hidden lg:col-span-5 lg:block" />
                <motion.div
                  className="lg:col-span-7"
                  style={{ y: copyY }}
                  initial={false}
                >
                  <p className="eyebrow text-cream/90">{aboutTeaser.eyebrow}</p>
                  <h2 className="display-2 mt-5 text-balance text-cream">
                    {aboutTeaser.headline}
                  </h2>
                  <p className="lead mt-6 max-w-xl text-cream/95">
                    {aboutTeaser.body}
                  </p>
                  <p className="body-lg mt-5 max-w-xl italic text-cream/85">
                    {aboutTeaser.personal}
                  </p>
                  <div className="mt-10">
                    <a
                      href={aboutTeaser.cta.href}
                      className="inline-flex items-center gap-3 text-cream underline decoration-terracotta-soft decoration-2 underline-offset-[6px] transition-opacity hover:opacity-80"
                    >
                      <span className="text-sm uppercase tracking-[0.18em]">
                        {aboutTeaser.cta.label}
                      </span>
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative md:hidden bg-paw" aria-label="Meet Ina">
        <div className="relative h-[80vh] w-full overflow-hidden">
          <Image
            src={images.about.src}
            alt={images.about.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, rgba(42, 31, 23, 0) 40%, rgba(42, 31, 23, 0.55) 75%, rgba(42, 31, 23, 0.85) 100%)",
            }}
          />
        </div>

        <div className="container-editorial relative -mt-24 pb-24">
          <div className="rounded-3xl bg-terracotta p-8 shadow-xl shadow-ink/20">
            <p className="eyebrow text-cream/90">{aboutTeaser.eyebrow}</p>
            <h2 className="display-2 mt-4 text-balance text-cream">
              {aboutTeaser.headline}
            </h2>
            <p className="lead mt-5 text-cream/95">{aboutTeaser.body}</p>
            <p className="body-lg mt-4 italic text-cream/85">
              {aboutTeaser.personal}
            </p>
            <div className="mt-8">
              <a
                href={aboutTeaser.cta.href}
                className="inline-flex items-center gap-3 text-cream underline decoration-terracotta-soft decoration-2 underline-offset-[6px] transition-opacity hover:opacity-80"
              >
                <span className="text-sm uppercase tracking-[0.18em]">
                  {aboutTeaser.cta.label}
                </span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
