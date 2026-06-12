"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type Props = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className = "" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div
      className={`divide-y divide-line rounded-[2rem] border border-line bg-cream overflow-hidden ${className}`}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.title} className="overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left font-display text-lg text-ink md:text-xl md:px-8 md:py-6 hover:bg-cream-warm/20 transition-colors"
            >
              <span className="pr-4">{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-1 text-terracotta shrink-0 font-light text-2xl leading-none"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 pb-6 pt-0 text-sm md:text-base text-ink-soft leading-relaxed md:px-8 md:pb-7 border-t border-line/30 pt-4 bg-cream-warm/10">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
