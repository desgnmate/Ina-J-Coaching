"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { leadMagnet } from "@/lib/content";

const ease = [0.215, 0.61, 0.355, 1] as const;

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-cream-deep bg-grain section relative overflow-hidden">
      <div className="container-editorial relative z-10">
        {/* ── Floating Monolith Card ── */}
        <div className="relative mx-auto max-w-5xl">
          {/* Shadow panel behind */}
          <div
            className="absolute inset-x-4 top-4 bottom-0 rounded-3xl bg-terracotta/8 sm:inset-x-6 sm:top-6"
            aria-hidden="true"
          />

          {/* Main card */}
          <div className="relative rounded-3xl bg-ink overflow-hidden">
            {/* Inner decorative elements */}
            <div
              className="absolute top-0 right-0 h-64 w-64 rounded-full bg-terracotta/[0.04] blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gold/[0.03] blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Corner accents on the card */}
            <div
              className="absolute top-5 left-5 h-10 w-10 border-l border-t border-terracotta/20 pointer-events-none hidden sm:block"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-5 right-5 h-10 w-10 border-r border-b border-terracotta/20 pointer-events-none hidden sm:block"
              aria-hidden="true"
            />

            <div className="grid items-stretch md:grid-cols-12">
              {/* Left — Copy */}
              <div className="md:col-span-6 p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease }}
                  className="text-[0.7rem] uppercase tracking-[0.2em] font-medium text-terracotta-soft"
                >
                  {leadMagnet.eyebrow}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="display-3 mt-5 text-balance text-cream"
                >
                  {leadMagnet.headline}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                  className="mt-8"
                >
                  <div className="flex gap-4">
                    <div className="mt-1.5 h-12 w-px flex-shrink-0 bg-gradient-to-b from-terracotta/50 to-transparent" />
                    <div>
                      <p className="font-display text-lg md:text-xl italic text-terracotta-soft leading-snug">
                        {leadMagnet.leadTitle}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-cream/50">
                        {leadMagnet.body}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-10 flex items-center gap-5 text-[0.65rem] uppercase tracking-[0.15em] text-cream/30"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-terracotta/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Privacy-first
                  </span>
                  <span className="h-3 w-px bg-cream/10" />
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-terracotta/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Instant access
                  </span>
                </motion.div>
              </div>

              {/* Right — Form */}
              <div className="md:col-span-6 bg-cream/[0.03] border-l border-cream/[0.06] p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="thanks"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="text-center py-8"
                    >
                      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/15">
                        <svg
                          className="h-7 w-7 text-terracotta-soft"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-terracotta-soft">
                        Sent with care
                      </p>
                      <h3 className="display-3 mt-3 text-balance text-cream">
                        Check your inbox.
                      </h3>
                      <p className="body mt-3 text-cream/50">
                        Your checklist is heading to{" "}
                        <span className="text-cream">{email}</span>.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (email.trim()) setSubmitted(true);
                      }}
                      className="space-y-5"
                    >
                      <div>
                        <p className="font-display text-lg md:text-xl italic text-terracotta-soft leading-snug">
                          Get the free checklist
                        </p>
                        <p className="mt-1 text-sm text-cream/40">
                          Enter your email and we&rsquo;ll send it straight
                          over.
                        </p>
                      </div>

                      <label className="block">
                        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cream/40">
                          Email address
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hello@yourstudio.com"
                          className="mt-2.5 w-full rounded-xl border border-cream/10 bg-cream/[0.04] px-5 py-4 text-base text-cream placeholder:text-cream/25 focus:border-terracotta/40 focus:bg-cream/[0.06] focus:outline-none transition-all duration-300"
                        />
                      </label>

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full rounded-xl"
                      >
                        {leadMagnet.cta}
                        <span aria-hidden>→</span>
                      </Button>

                      <p className="text-center text-[0.7rem] text-cream/25">
                        No spam. Unsubscribe anytime.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
