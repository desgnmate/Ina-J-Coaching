"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

interface PageHeroProps {
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  imageLabel?: string;
  imageSublabel?: string;
  glassContent: ReactNode;
  mobileGlassContent: ReactNode;
}

export function PageHero({
  imageSrc,
  imageAlt,
  imageSizes = "(min-width: 1280px) 48vw, 45vw",
  imageLabel,
  imageSublabel,
  glassContent,
  mobileGlassContent,
}: PageHeroProps) {
  return (
    <section className="bg-grid bg-noise-cream relative h-auto overflow-hidden py-10 md:py-12 lg:min-h-screen lg:max-h-[950px] lg:py-[clamp(2rem,4vh,3.25rem)]">
      <div className="container-editorial relative z-10 h-full">
        <div className="flex min-h-0 flex-col justify-center lg:min-h-[calc(100svh-5rem)] lg:justify-center">
          {/* Desktop */}
          <div className="relative hidden items-center justify-center lg:flex lg:min-h-[60vh] xl:min-h-[66vh]">
            <div className="relative w-full lg:max-w-[64rem] xl:max-w-[70rem]">
              <motion.div
                className="absolute right-0 top-1/2 h-[60vh] w-[42%] -translate-y-1/2 overflow-hidden rounded-[2rem] bg-cream-deep shadow-[0_26px_70px_-28px_rgba(43,31,23,0.18)] xl:h-[68vh] xl:w-[46%] 2xl:h-[74vh] 2xl:w-[48%]"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes={imageSizes}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-grain pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/20 to-transparent pointer-events-none" />
                {(imageLabel || imageSublabel) && (
                  <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start pointer-events-none">
                    {imageLabel && (
                      <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-cream/90 bg-ink/30 px-3.5 py-1.5 rounded-full backdrop-blur-[2px] border border-white/10">
                        {imageLabel}
                      </span>
                    )}
                    {imageSublabel && (
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-cream/70">
                        {imageSublabel}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.div
                className="relative z-10 w-full max-w-[28rem] rounded-[1.75rem] border border-white/30 bg-cream/68 p-6 shadow-[0_20px_50px_-28px_rgba(43,31,23,0.18)] backdrop-blur-sm lg:translate-x-[12%] xl:max-w-[31rem] xl:p-8 xl:translate-x-[14%] 2xl:max-w-[33rem] 2xl:p-9 2xl:translate-x-[16%]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {glassContent}
              </motion.div>
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <motion.div
              className="w-full rounded-[1.5rem] border border-line/50 bg-cream/88 p-6 shadow-[0_25px_60px_-30px_rgba(43,31,23,0.22)] backdrop-blur-sm md:p-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {mobileGlassContent}
            </motion.div>

            <motion.div
              className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-cream-deep shadow-[0_20px_50px_-15px_rgba(43,31,23,0.12)] md:mt-10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-grain pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
