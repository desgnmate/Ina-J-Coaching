"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/shared/Button";

type Props = {
  cta: string;
  variant?: "primary" | "secondary";
  placeholder?: string;
  source?: string;
};

export function EmailCapture({
  cta,
  variant = "primary",
  placeholder = "hello@yourstudio.com",
  source,
}: Props) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    await new Promise((r) => setTimeout(r, 400));
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-terracotta/30 bg-cream p-6 text-left">
        <p className="eyebrow text-terracotta">Sent</p>
        <p className="mt-2 text-lg text-ink">
          Check your inbox in the next few minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        aria-label="Your email"
        className="w-full rounded-full border border-ink/20 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink-muted/70 focus:border-terracotta focus:outline-none"
      />
      <Button type="submit" variant={variant}>
        {cta}
        <span aria-hidden>→</span>
      </Button>
      {source && <input type="hidden" name="source" value={source} />}
    </form>
  );
}
