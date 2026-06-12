"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/shared/Button";

type Props = {
  href: string;
  label?: string;
  showAfter?: number;
};

export function StickyCta({
  href,
  label = "Apply now",
  showAfter = 320,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-30 transition-all duration-500 ease-out md:bottom-8 md:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Button
        href={href}
        variant="primary"
        className="shadow-[0_18px_44px_-18px_rgba(212,104,88,0.5)]"
      >
        {label}
        <span aria-hidden>→</span>
      </Button>
    </div>
  );
}
