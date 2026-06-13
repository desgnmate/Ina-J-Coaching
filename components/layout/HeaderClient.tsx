"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/content";

type Props = {
  bookingHref: string;
  links: NavItem[];
};

export function HeaderClient({ bookingHref, links }: Props) {
  const pathname = usePathname();
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isExternalBooking = bookingHref.startsWith("http");
  const usesDarkHero =
    pathname.startsWith("/mastermind") || pathname.startsWith("/results");
  const logoSrc =
    usesDarkHero && !scrolled
      ? "/brand/inajeducation-logo-dark.png"
      : "/brand/inajeducation-logo-light.png";

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      if (pathname !== "/") {
        setScrolled(scrollY > 50);
        setHeaderOpacity(1);
      }
    };

    // On homepage, header opacity is controlled by hero-content-opacity event
    if (pathname === "/") {
      const onHeroOpacity = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        setHeaderOpacity(detail.opacity);
        setScrolled(detail.opacity > 0.5);
      };
      window.addEventListener("hero-content-opacity", onHeroOpacity);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("hero-content-opacity", onHeroOpacity);
        window.removeEventListener("scroll", onScroll);
      };
    }

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
        <Link
          href="/"
          aria-label="Ina J Education home"
          className="relative block h-9 w-[13.5rem] shrink-0 md:h-11 md:w-[16rem]"
        >
          <Image
            src={logoSrc}
            alt="Ina J Education, pet photography coaching"
            fill
            priority
            sizes="(min-width: 768px) 256px, 216px"
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) =>
            l.children ? (
              <div key={l.href} className="group relative">
                <Link
                  href={l.href}
                  className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    usesDarkHero && !scrolled
                      ? "text-cream/70 hover:text-cream"
                      : "text-ink-soft hover:text-ink"
                  }`}
                  aria-haspopup="menu"
                >
                  {l.label}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:rotate-180"
                  >
                    ▾
                  </span>
                </Link>
                <div
                  role="menu"
                  className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                >
                  <div className="min-w-[14rem] rounded-2xl border border-line bg-cream/95 p-2 shadow-[0_18px_40px_-22px_rgba(68,53,61,0.32)] backdrop-blur-md">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        role="menuitem"
                        className="block rounded-xl px-4 py-3 text-sm text-ink-soft transition-colors hover:bg-cream-deep hover:text-ink"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium transition-colors ${
                  usesDarkHero && !scrolled
                    ? "text-cream/70 hover:text-cream"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isExternalBooking ? (
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden md:inline-flex"
            >
              Book a Call
            </a>
          ) : (
            <Link
              href={bookingHref}
              className="btn-primary hidden md:inline-flex"
            >
              Book a Call
            </Link>
          )}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden ${
              usesDarkHero && !scrolled
                ? "border-cream/30 text-cream hover:border-cream"
                : "border-line text-ink hover:border-ink"
            }`}
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
                      <span aria-hidden className="text-gold">
                        →
                      </span>
                    </Link>
                    {l.children && (
                      <ul className="pb-4 pl-2">
                        {l.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="block py-2 text-base text-ink-soft"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                {isExternalBooking ? (
                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    Book a Call
                  </a>
                ) : (
                  <Link
                    href={bookingHref}
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    Book a Call
                  </Link>
                )}
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
