"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    void pathname;

    const scroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      const lenis = (
        window as Window & {
          __lenis?: {
            scrollTo: (target: number | HTMLElement, opts?: object) => void;
          };
        }
      ).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    };
    scroll();
  }, [pathname]);

  return null;
}
