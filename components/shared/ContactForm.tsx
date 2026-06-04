"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/shared/Button";

type Props = {
  buttonLabel?: string;
  source?: string;
};

export function ContactForm({
  buttonLabel = "Send my enquiry",
  source,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-terracotta/30 bg-cream p-10 md:p-14">
        <p className="eyebrow text-terracotta">Received</p>
        <h2 className="display-3 mt-3 text-balance">
          Thanks — your enquiry is in.
        </h2>
        <p className="body-lg mt-4 max-w-md text-ink-soft">
          You’ll hear back from me within two business days, directly from{" "}
          <span className="text-ink">ina@inajphotography.com</span>. In the
          meantime, the free Marketing Clarity Checklist is a useful place to
          start.
        </p>
        <div className="mt-8">
          <Button href="/resources" variant="ghost">
            Get the free checklist
            <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-cream-deep p-8 md:p-12"
    >
      <p className="eyebrow">Send a message</p>
      <h2 className="display-3 mt-3">Tell me about your business.</h2>
      <p className="body mt-3">
        A few details so I can reply with something useful, not a templated
        response.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
            Your name
          </span>
          <input
            type="text"
            required
            name="name"
            className="mt-2 w-full rounded-full border border-ink/15 bg-cream px-5 py-3.5 text-base text-ink placeholder:text-ink-muted/70 focus:border-terracotta focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
            Email
          </span>
          <input
            type="email"
            required
            name="email"
            className="mt-2 w-full rounded-full border border-ink/15 bg-cream px-5 py-3.5 text-base text-ink placeholder:text-ink-muted/70 focus:border-terracotta focus:outline-none"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
            Business name (or working name)
          </span>
          <input
            type="text"
            name="business"
            className="mt-2 w-full rounded-full border border-ink/15 bg-cream px-5 py-3.5 text-base text-ink placeholder:text-ink-muted/70 focus:border-terracotta focus:outline-none"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
            What kind of photographer are you?
          </span>
          <select
            name="type"
            className="mt-2 w-full appearance-none rounded-full border border-ink/15 bg-cream px-5 py-3.5 text-base text-ink focus:border-terracotta focus:outline-none"
          >
            <option>Pet photographer</option>
            <option>Portrait photographer</option>
            <option>Pet + portrait</option>
            <option>Brand / commercial</option>
            <option>Other / multi-specialty</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
            What’s the biggest thing you’d like help with?
          </span>
          <textarea
            rows={5}
            name="message"
            className="mt-2 w-full rounded-3xl border border-ink/15 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink-muted/70 focus:border-terracotta focus:outline-none"
            placeholder="A line or two is plenty…"
          />
        </label>
        {source && <input type="hidden" name="source" value={source} />}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary">
          {submitting ? "Sending…" : buttonLabel}
          <span aria-hidden>→</span>
        </Button>
        <p className="text-xs text-ink-muted">
          Replies within 2 business days.
        </p>
      </div>
    </form>
  );
}
