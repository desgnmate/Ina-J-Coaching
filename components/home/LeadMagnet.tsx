"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { leadMagnet } from "@/lib/content";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-ink section relative overflow-hidden">
      <div className="container-editorial relative z-10">
        <div className="relative mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-cream/10 bg-gradient-to-br from-ink via-ink-soft/95 to-ink shadow-[0_28px_70px_-34px_rgba(0,0,0,0.48)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-[48%] hidden w-px bg-gradient-to-b from-transparent via-cream/12 to-transparent md:block"
            />
            <div className="grid items-stretch md:grid-cols-12">
              <div className="flex flex-col justify-center bg-cream-deep p-8 text-ink sm:p-10 md:col-span-6 md:p-12 lg:p-14">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-terracotta">
                  {leadMagnet.eyebrow}
                </p>

                <h2 className="display-3 mt-5 text-balance text-ink">
                  {leadMagnet.headline}
                </h2>

                <div className="mt-8">
                  <div className="flex gap-4">
                    <div className="mt-1.5 h-12 w-px flex-shrink-0 bg-gradient-to-b from-terracotta/50 to-transparent" />
                    <div>
                      <p className="font-display text-lg leading-snug text-terracotta md:text-xl">
                        {leadMagnet.leadTitle}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {leadMagnet.body}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.15em] text-ink-muted">
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-terracotta"
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
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-3.5 w-3.5 text-terracotta"
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
                  <span className="rounded-full border border-line/60 bg-cream px-3 py-1 text-[0.62rem] tracking-[0.18em] text-ink-muted">
                    Built for working studios
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-gold p-8 text-cream sm:p-10 md:col-span-6 md:p-12 lg:p-14">
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cream/12">
                      <svg
                        className="h-7 w-7 text-cream"
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
                    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/72">
                      Sent with care
                    </p>
                    <h3 className="display-3 mt-3 text-balance text-cream">
                      Check your inbox.
                    </h3>
                    <p className="body mt-3 text-cream/75">
                      Your checklist is heading to{" "}
                      <span className="text-cream">{email}</span>.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email.trim()) setSubmitted(true);
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <p className="font-display text-lg leading-snug text-cream md:text-xl">
                        Get the free checklist
                      </p>
                      <p className="mt-1 text-sm text-cream/78">
                        Enter your email and we&rsquo;ll send it straight over.
                      </p>
                    </div>

                    <label className="block">
                      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cream/78">
                        Email address
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@yourstudio.com"
                        className="mt-2.5 w-full rounded-xl border border-cream/18 bg-cream/8 px-5 py-4 text-base text-cream placeholder:text-cream/42 transition-all duration-300 focus:border-cream/40 focus:bg-cream/12 focus:outline-none"
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

                    <p className="text-center text-[0.7rem] text-cream/70">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
