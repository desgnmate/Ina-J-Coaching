"use client";

import {
  Article,
  Compass,
  Quotes,
  SealCheck,
  ShareNetwork,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { problem } from "@/lib/content";

const ease = [0.215, 0.61, 0.355, 1] as const;

const framework = [
  {
    label: "Message",
    body: "Your content may be reaching people, but your value isn't immediately clear.",
    icon: "message",
  },
  {
    label: "Offer",
    body: "Potential clients don't fully understand why they should choose you.",
    icon: "offer",
  },
  {
    label: "Website",
    body: "Visitors are interested but not confident enough to enquire.",
    icon: "website",
  },
  {
    label: "Client Experience",
    body: "Small friction points reduce trust and booking confidence.",
    icon: "experience",
  },
  {
    label: "Bookings",
    body: "Without clear positioning, enquiries become inconsistent.",
    icon: "bookings",
  },
] as const;

type IconName = (typeof framework)[number]["icon"];

function FrameworkIcon({ name, active }: { name: IconName; active: boolean }) {
  const stroke = active ? "#D46858" : "#715860";
  const weight = "light";
  const iconClass =
    "h-12 w-12 md:h-14 md:w-14 transition-colors duration-[900ms]";

  return (
    <>
      {name === "message" && (
        <Quotes className={iconClass} color={stroke} weight={weight} />
      )}
      {name === "offer" && (
        <Compass className={iconClass} color={stroke} weight={weight} />
      )}
      {name === "website" && (
        <Article className={iconClass} color={stroke} weight={weight} />
      )}
      {name === "experience" && (
        <ShareNetwork className={iconClass} color={stroke} weight={weight} />
      )}
      {name === "bookings" && (
        <SealCheck className={iconClass} color={stroke} weight={weight} />
      )}
    </>
  );
}

type ConnectorState = {
  lineY: number;
  lineStartX: number;
  lineEndX: number;
  dotX: number;
  activeBottomX: number;
  activeBottomY: number;
  panelTopX: number;
  panelTopY: number;
  glowX: number;
  glowY: number;
  glowW: number;
  glowH: number;
  ready: boolean;
};

export function Problem() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [connector, setConnector] = useState<ConnectorState>({
    lineY: 0,
    lineStartX: 0,
    lineEndX: 0,
    dotX: 0,
    activeBottomX: 0,
    activeBottomY: 0,
    panelTopX: 0,
    panelTopY: 0,
    glowX: 0,
    glowY: 0,
    glowW: 0,
    glowH: 0,
    ready: false,
  });

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % framework.length);
  }, []);

  // Viewport tracking to pause intervals when not in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    if (shellRef.current) {
      observer.observe(shellRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance (paused when out of viewport)
  useEffect(() => {
    if (hovered !== null || !isInView) return;
    const id = setInterval(advance, 3600);
    return () => clearInterval(id);
  }, [advance, hovered, isInView]);

  const current = hovered ?? active;

  useEffect(() => {
    const shell = shellRef.current;
    const panel = panelRef.current;
    const first = nodeRefs.current[0];
    const last = nodeRefs.current[framework.length - 1];
    const currentNode = nodeRefs.current[current];

    if (!shell || !panel || !first || !last || !currentNode) return;

    const updateConnector = () => {
      const shellRect = shell.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const currentRect = currentNode.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();

      setConnector({
        lineY: firstRect.top - shellRect.top + firstRect.height / 2,
        lineStartX: firstRect.left - shellRect.left + firstRect.width / 2,
        lineEndX: lastRect.left - shellRect.left + lastRect.width / 2,
        dotX: currentRect.left - shellRect.left + currentRect.width / 2,
        activeBottomX:
          currentRect.left - shellRect.left + currentRect.width / 2,
        activeBottomY: currentRect.bottom - shellRect.top,
        panelTopX: panelRect.left - shellRect.left + panelRect.width / 2,
        panelTopY: panelRect.top - shellRect.top,
        glowX: currentRect.left - shellRect.left + currentRect.width * 0.14,
        glowY: currentRect.top - shellRect.top + currentRect.height * 0.14,
        glowW: currentRect.width * 0.72,
        glowH: currentRect.height * 0.72,
        ready: true,
      });
    };

    updateConnector();

    const observer = new ResizeObserver(updateConnector);
    observer.observe(shell);
    observer.observe(panel);
    for (const node of nodeRefs.current) {
      if (node) observer.observe(node);
    }
    window.addEventListener("resize", updateConnector);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateConnector);
    };
  }, [current]);

  return (
    <section className="bg-grid section pt-12 md:pt-20 pb-24 md:pb-32 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cream/35"
      />
      <div className="container-editorial relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow mb-6"
          >
            {problem.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="display-1 text-balance text-ink"
          >
            Posting more isn&rsquo;t the same as{" "}
            <span className="italic text-terracotta">having a strategy.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="lead mx-auto mt-6 max-w-2xl"
          >
            {problem.body}
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mx-auto mt-10 h-px w-24 origin-center bg-terracotta/40 md:mt-12"
          aria-hidden="true"
        />

        <div ref={shellRef} className="mx-auto mt-9 max-w-6xl md:mt-10">
          <div className="relative">
            {connector.ready ? (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
              >
                <motion.line
                  x1={connector.lineStartX}
                  y1={connector.lineY}
                  x2={connector.lineEndX}
                  y2={connector.lineY}
                  stroke="rgba(201,183,156,0.9)"
                  strokeWidth="1.35"
                />
                <motion.line
                  x1={connector.lineStartX}
                  y1={connector.lineY}
                  x2={connector.dotX}
                  y2={connector.lineY}
                  stroke="rgba(202,95,60,0.58)"
                  strokeWidth="1.8"
                  transition={{ duration: 0.85, ease: "easeOut" }}
                />
                <motion.circle
                  cx={connector.dotX}
                  cy={connector.lineY}
                  r="5.5"
                  fill="rgba(202,95,60,0.82)"
                  transition={{ duration: 0.85, ease: "easeOut" }}
                />
                <motion.line
                  x1={connector.activeBottomX}
                  y1={connector.activeBottomY}
                  x2={connector.panelTopX}
                  y2={connector.panelTopY}
                  stroke="rgba(202,95,60,0.4)"
                  strokeWidth="1.4"
                  transition={{ duration: 0.85, ease: "easeOut" }}
                />
              </svg>
            ) : null}

            <div className="grid gap-3 md:grid-cols-5 md:items-center md:gap-3">
              {framework.map((item, i) => {
                const isActive = i === current;

                return (
                  <motion.button
                    key={item.label}
                    type="button"
                    ref={(node) => {
                      nodeRefs.current[i] = node;
                    }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.12 + i * 0.08,
                      ease,
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className={`group relative z-10 flex min-h-[116px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] border px-5 py-5 text-center transition-all duration-[900ms] md:min-h-[126px] md:px-6 md:py-5 ${
                      isActive
                        ? "-translate-y-1 scale-[1.02] border-terracotta/20 bg-[#FFF8F3]"
                        : "border-line bg-[#EFDFD6] hover:border-line/80"
                    }`}
                    style={{ backdropFilter: "blur(18px)" }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" />
                    <div
                      className={`flex justify-center transition-transform duration-[900ms] ${
                        isActive ? "scale-[1.08]" : "scale-100"
                      }`}
                    >
                      <FrameworkIcon name={item.icon} active={isActive} />
                    </div>
                    <span
                      className={`mt-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-colors duration-[900ms] ${
                        isActive ? "text-terracotta" : "text-ink-soft"
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div ref={panelRef} className="mx-auto mt-4 max-w-3xl md:mt-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={framework[current].label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="rounded-[28px] border border-white/32 bg-[rgba(250,245,236,0.28)] px-7 py-6 text-center shadow-[0_12px_28px_-22px_rgba(43,31,23,0.08)]"
                style={{ backdropFilter: "blur(15px)" }}
              >
                <p className="eyebrow text-terracotta">
                  {framework[current].label}
                </p>
                <p className="mx-auto mt-4 max-w-2xl font-display text-2xl leading-snug text-ink md:text-[2rem]">
                  {framework[current].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
