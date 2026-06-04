"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

type Props = {
  bookingHref: string;
  links: NavLink[];
};

export function HeaderClient({ bookingHref, links }: Props) {
  const pathname = usePathname();
  const [headerOpacity, setHeaderOpacity] = useState(pathname === "/" ? 0 : 1);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      if (pathname === "/") {
        // Fade in between 50px and 100px of scroll.
        const startFade = 50;
        const endFade = 100;

        if (scrollY <= startFade) {
          setHeaderOpacity(0);
        } else if (scrollY >= endFade) {
          setHeaderOpacity(1);
        } else {
          const fraction = (scrollY - startFade) / (endFade - startFade);
          setHeaderOpacity(fraction);
        }

        // Delay background color until the bottom of the viewport enters the next section (with 80px allowance)
        const heroEl = document.getElementById("hero");
        const heroHeight = heroEl
          ? heroEl.offsetHeight
          : window.innerHeight * 1.3;
        const triggerPoint = heroHeight - window.innerHeight + 80;
        setScrolled(scrollY > triggerPoint);
      } else {
        setScrolled(scrollY > 50);
        setHeaderOpacity(1);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      style={{ opacity: headerOpacity }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-in-out ${
        headerOpacity === 0 ? "pointer-events-none" : ""
      } ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-[0_1px_0_rgba(43,31,23,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl text-ink md:text-2xl">
            <span className="italic">Ina J</span>
            <span className="ml-2 text-[0.7rem] uppercase tracking-[0.22em] text-terracotta">
              Coaching
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={bookingHref}
            className="btn-primary hidden md:inline-flex"
          >
            Book a Coaching Call
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden"
          >
            <div className="container-editorial border-t border-line bg-cream pb-8 pt-6">
              <ul className="flex flex-col divide-y divide-line">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-2xl text-ink"
                    >
                      {l.label}
                      <span aria-hidden className="text-terracotta">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={bookingHref}
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Book a Coaching Call
                </Link>
                <Link
                  href={siteParentHref()}
                  onClick={() => setOpen(false)}
                  className="btn-secondary w-full"
                >
                  Ina J Photography
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function siteParentHref() {
  return "https://www.inajphotography.com/";
}
