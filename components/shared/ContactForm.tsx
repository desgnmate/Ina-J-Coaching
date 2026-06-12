"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/shared/Button";

type Props = {
  buttonLabel?: string;
  embedded?: boolean;
  source?: string;
};

export function ContactForm({
  buttonLabel = "Send my enquiry",
  embedded = false,
  source,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45 }}
            className="rounded-[2rem] border border-terracotta/20 bg-cream p-8 md:p-12 shadow-[0_15px_40px_-20px_rgba(212,104,88,0.18)] text-center md:text-left"
          >
            <div className="mx-auto md:mx-0 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Success checkmark</title>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="eyebrow mt-6 block">Enquiry Received</span>
            <h2 className="display-3 mt-3 text-balance text-ink font-semibold">
              Thank you. I'll be in touch.
            </h2>
            <p className="body-lg mt-4 text-ink-soft text-sm md:text-base leading-relaxed">
              I've received your business profile details. You'll hear back from
              me personally within two business days, directly from{" "}
              <span className="text-ink font-medium">
                ina@inajphotography.com
              </span>
              .
            </p>
            <div className="mt-8">
              <Button href="/resources" variant="ghost">
                Browse Free Resources <span aria-hidden>→</span>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              embedded
                ? "rounded-none border-0 bg-transparent p-8 shadow-none md:p-10 lg:p-12"
                : "rounded-[2.5rem] border border-line bg-cream p-8 shadow-[0_22px_50px_-25px_rgba(68,53,61,0.15)] md:p-10 lg:p-12"
            }
          >
            <span className="eyebrow">Send a message</span>
            <h2 className="display-3 mt-3 text-ink">
              Tell me about your business.
            </h2>
            <p className="text-xs md:text-sm text-ink-soft mt-3 leading-relaxed">
              Provide a few details below and Ina will get back to you with
              custom, actionable feedback rather than a boilerplate response.
            </p>

            <div className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-[0.65rem] font-bold tracking-[0.15em] text-ink-soft uppercase">
                    Your Name
                  </span>
                  <input
                    type="text"
                    required
                    name="name"
                    className="mt-2 w-full rounded-full border border-line bg-cream-warm/10 px-5 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-terracotta focus:bg-cream-warm/30 focus:outline-none transition-all duration-300"
                  />
                </label>
                <label className="block">
                  <span className="text-[0.65rem] font-bold tracking-[0.15em] text-ink-soft uppercase">
                    Email Address
                  </span>
                  <input
                    type="email"
                    required
                    name="email"
                    className="mt-2 w-full rounded-full border border-line bg-cream-warm/10 px-5 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-terracotta focus:bg-cream-warm/30 focus:outline-none transition-all duration-300"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-[0.65rem] font-bold tracking-[0.15em] text-ink-soft uppercase">
                    Business Name
                  </span>
                  <input
                    type="text"
                    name="business"
                    className="mt-2 w-full rounded-full border border-line bg-cream-warm/10 px-5 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-terracotta focus:bg-cream-warm/30 focus:outline-none transition-all duration-300"
                  />
                </label>
                <label className="block">
                  <span className="text-[0.65rem] font-bold tracking-[0.15em] text-ink-soft uppercase">
                    Photography Type
                  </span>
                  <select
                    name="type"
                    className="mt-2 w-full appearance-none rounded-full border border-line bg-cream-warm/10 px-5 py-3 text-sm text-ink focus:border-terracotta focus:bg-cream-warm/30 focus:outline-none transition-all duration-300 cursor-pointer"
                  >
                    <option>Pet photographer</option>
                    <option>Portrait photographer</option>
                    <option>Pet + portrait</option>
                    <option>Brand / commercial</option>
                    <option>Other / multi-specialty</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-[0.65rem] font-bold tracking-[0.15em] text-ink-soft uppercase">
                  What are you struggling with most?
                </span>
                <textarea
                  rows={4}
                  required
                  name="message"
                  className="mt-2 w-full rounded-3xl border border-line bg-cream-warm/10 px-5 py-3.5 text-sm text-ink placeholder:text-ink-muted/50 focus:border-terracotta focus:bg-cream-warm/30 focus:outline-none transition-all duration-300"
                  placeholder="Tell me a bit about your current bookings, marketing loops, or sales hurdles..."
                />
              </label>

              {source && <input type="hidden" name="source" value={source} />}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line/40 pt-6">
              <Button
                type="submit"
                variant="primary"
                className="justify-center"
              >
                {submitting ? "Sending..." : buttonLabel}
                <span aria-hidden>→</span>
              </Button>
              <span className="text-xs text-ink-muted text-center sm:text-right">
                Replies directly within 2 business days.
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
