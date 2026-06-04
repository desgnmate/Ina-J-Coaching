"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/shared/Button";
import { LineDraw } from "@/components/shared/LineDraw";
import { OrganicShape } from "@/components/shared/OrganicShape";

type Props = {
  pageName: string;
  description: string;
  bookingHref?: string;
  email?: string;
};

export function Maintenance({
  pageName,
  description,
  bookingHref = "#book",
  email = "ina@inajphotography.com",
}: Props) {
  return (
    <section className="bg-noise-cream has-pattern relative flex min-h-[70vh] items-center overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -right-24 -top-24 text-terracotta"
        >
          <OrganicShape
            variant="blob-a"
            size={480}
            color="currentColor"
            opacity={1}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          className="absolute -left-20 -bottom-20 text-peach"
        >
          <OrganicShape
            variant="blob-b"
            size={420}
            color="currentColor"
            opacity={1}
          />
        </motion.div>
      </div>

      <div className="container-editorial relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Main content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="eyebrow">Redesign in Progress</span>
              <LineDraw width={48} height={1} color="var(--color-terracotta)" />
            </div>

            <h1 className="display-1 mt-5 text-balance">
              The {pageName} page is{" "}
              <span className="italic text-terracotta font-display">
                under maintenance
              </span>
            </h1>

            <p className="lead mt-6 max-w-xl text-pretty">{description}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/" variant="secondary">
                ← Back to Home
              </Button>
              <Button href={bookingHref} variant="primary">
                Book a discovery call
              </Button>
            </div>
          </div>

          {/* Visual card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-[24px] border border-line bg-cream-deep p-8 md:p-10 shadow-[0_12px_40px_-12px_rgba(43,31,23,0.08)] overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-gold/30">
                <OrganicShape
                  variant="spark"
                  size={32}
                  color="currentColor"
                  opacity={1}
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="mb-8 text-terracotta"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-peach-soft text-terracotta">
                    <OrganicShape
                      variant="paw"
                      size={44}
                      color="currentColor"
                      opacity={1}
                    />
                  </div>
                </motion.div>

                <h3 className="display-3 text-ink">We'll be right back</h3>
                <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                  We are updating this section with a fresh new look, improved
                  structure, and updated content to help you build your
                  photography business.
                </p>

                <div className="mt-8 w-full border-t border-line pt-6">
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted">
                    Need to reach Ina directly?
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-2 block text-base font-medium text-terracotta hover:text-terracotta-deep transition-colors duration-200"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
