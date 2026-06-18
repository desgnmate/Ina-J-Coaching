"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/shared/Button";
import { OrganicShape } from "@/components/shared/OrganicShape";
import { hero } from "@/lib/content";

const HERO_VIDEO_SRC = "/video/hero%20video.mp4";
const HERO_VIDEO_POSTER = "/video/video-poster.png";

const COLLAGE_IMAGES = [
  {
    src: "https://image3.photobiz.com/8929/7_20241118054934_13874037_xlarge.jpg",
    alt: "Dog enjoying outdoors - Ina J Photography",
    aspect: "aspect-[1.5]",
    height: "h-[12vh] md:h-[15vh]",
  },
  {
    src: "https://image9.photobiz.com/8584/7_20241118054932_13874036_xlarge.jpg",
    alt: "Fluffy white dog sitting on logs - Ina J Photography",
    aspect: "aspect-[0.67]",
    height: "h-[18vh] md:h-[22vh]",
  },
  {
    src: "https://image12.photobiz.com/7732/7_20241118054934_13874038_xlarge.jpg",
    alt: "Border collie posing in grass - Ina J Photography",
    aspect: "aspect-square",
    height: "h-[14vh] md:h-[17vh]",
  },
  {
    src: "https://image14.photobiz.com/10152/7_20241118054527_13874031_xlarge.jpg",
    alt: "Dog running happily at golden hour - Ina J Photography",
    aspect: "aspect-square",
    height: "h-[14vh] md:h-[17vh]",
  },
  {
    src: "https://image12.photobiz.com/7732/7_20230217021530_12724977_xlarge.jpg",
    alt: "Two dogs sitting together in Canberra - Ina J Photography",
    aspect: "aspect-[1.4]",
    height: "h-[12vh] md:h-[15vh]",
  },
  {
    src: "https://image14.photobiz.com/10152/7_20230217021420_12724964_large.jpg",
    alt: "Pug looking cute outdoors - Ina J Photography",
    aspect: "aspect-[1.1]",
    height: "h-[14vh] md:h-[17vh]",
  },
  {
    src: "https://image11.photobiz.com/8586/7_20230217021456_12724968_xlarge.jpg",
    alt: "Samoyed dog smiling in the leaves - Ina J Photography",
    aspect: "aspect-[0.75]",
    height: "h-[18vh] md:h-[22vh]",
  },
  {
    src: "https://image8.photobiz.com/8585/7_20241118054524_13874027_xlarge.jpg",
    alt: "Dog running and catching ball - Ina J Photography",
    aspect: "aspect-[0.55]",
    height: "h-[22vh] md:h-[27vh]",
  },
  {
    src: "https://image4.photobiz.com/8911/7_20230217021510_12724969_xlarge.jpg",
    alt: "Happy dog running in fields - Ina J Photography",
    aspect: "aspect-[1.5]",
    height: "h-[12vh] md:h-[15vh]",
  },
  {
    src: "https://image5.photobiz.com/8905/7_20230217021529_12724976_xlarge.jpg",
    alt: "Golden retriever smiling portrait - Ina J Photography",
    aspect: "aspect-[0.67]",
    height: "h-[18vh] md:h-[22vh]",
  },
  {
    src: "https://image9.photobiz.com/8584/7_20231220175136_13279533_xlarge.jpg",
    alt: "Fluffy puppy running in autumn woods - Ina J Photography",
    aspect: "aspect-square",
    height: "h-[14vh] md:h-[17vh]",
  },
  {
    src: "https://image8.photobiz.com/8585/7_20241118054524_13874026_xlarge.jpg",
    alt: "Corgi playing in Canberra park - Ina J Photography",
    aspect: "aspect-[0.55]",
    height: "h-[22vh] md:h-[27vh]",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Hero() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoPlaceholderRef = useRef<HTMLDivElement>(null);

  const mobileProgressBarRef = useRef<HTMLDivElement>(null);
  const desktopProgressBarRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const isInViewRef = useRef(true);
  isInViewRef.current = isInView;
  const [audioMode, setAudioMode] = useState<
    "auto" | "muted" | "forced-unmuted"
  >("auto");
  // Ref so event-handler closures always read the latest audioMode without re-binding.
  const audioModeRef = useRef<"auto" | "muted" | "forced-unmuted">("auto");
  audioModeRef.current = audioMode; // Keep in sync every render.
  const [, setAutoplayBlocked] = useState(false);
  const [browserMutedFallback, setBrowserMutedFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoMinimized, setVideoMinimized] = useState(false);
  // Browser autoplay policy requires a user gesture before unmuted playback.
  // We auto-play muted, then show a one-time prompt asking the user to enable sound.
  // Once dismissed (or unmuted), we never show it again for this page-load.
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [coords, setCoords] = useState<{
    centered: {
      left: number;
      top: number;
      width: number;
      height: number;
      radius: number;
    };
    settled: {
      left: number;
      top: number;
      width: number;
      height: number;
      radius: number;
    };
  } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Fades out as user starts scrolling, then fades back in once the video has settled small.
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.45, 0.57],
    [1, 0, 0, 1],
  );

  const animWidth = useMotionValue(0);
  const animHeight = useMotionValue(0);
  const animLeft = useMotionValue(0);
  const animTop = useMotionValue(0);
  const animRadius = useMotionValue(32);
  const contentOpacity = useMotionValue(0);
  const collageOpacity = useMotionValue(0);
  const collageY = useMotionValue(40);
  const bgPawOpacity = useMotionValue(0.18);
  const leftPawOpacity = useMotionValue(0);
  const rightPawOpacity = useMotionValue(0);

  function getVolumeFactor() {
    if (isMobile) return 1;
    const progress = scrollYProgress.get();
    const interpolate = (
      p: number,
      start: number,
      end: number,
      fromVal: number,
      toVal: number,
    ) => {
      if (p <= start) return fromVal;
      if (p >= end) return toVal;
      const ratio = (p - start) / (end - start);
      return fromVal + ratio * (toVal - fromVal);
    };
    return clamp(interpolate(progress, 0, 0.45, 1, 0), 0, 1);
  }

  function getActiveVideo() {
    return isMobile ? mobileVideoRef.current : desktopVideoRef.current;
  }

  function getEffectiveVolume() {
    if (audioMode === "muted") return 0;
    if (audioMode === "forced-unmuted") return 1;
    if (browserMutedFallback) return 0;
    return 1;
  }

  function applyAudioState() {
    const video = getActiveVideo();
    if (!video) return;

    const volume = clamp(getEffectiveVolume() * getVolumeFactor(), 0, 1);
    video.volume = volume;
    video.muted = volume <= 0.001;
  }

  const measure = () => {
    if (isMobile) return;
    const placeholderEl = videoPlaceholderRef.current;
    const stickyEl = stickyWrapperRef.current;
    if (!placeholderEl || !stickyEl) return;

    const placeholderRect = placeholderEl.getBoundingClientRect();
    const stickyRect = stickyEl.getBoundingClientRect();

    const settledLeft = placeholderRect.left - stickyRect.left;
    const settledTop = placeholderRect.top - stickyRect.top;
    const settledWidth = placeholderRect.width;
    const settledHeight = placeholderRect.height;

    const containerWidth = stickyRect.width;
    const containerHeight = stickyRect.height;

    const centeredHeight = containerHeight * 0.85;
    const centeredWidth = Math.min(
      containerWidth * 0.94,
      centeredHeight * 1.78,
    );
    const centeredLeft = (containerWidth - centeredWidth) / 2;
    const centeredTop = (containerHeight - centeredHeight) / 2;

    const newCoords = {
      centered: {
        left: centeredLeft,
        top: centeredTop,
        width: centeredWidth,
        height: centeredHeight,
        radius: 48,
      },
      settled: {
        left: settledLeft,
        top: settledTop,
        width: settledWidth,
        height: settledHeight,
        radius: 38,
      },
    };

    setCoords(newCoords);

    const progress = scrollYProgress.get();
    const interpolate = (
      p: number,
      start: number,
      end: number,
      fromVal: number,
      toVal: number,
    ) => {
      if (p <= start) return fromVal;
      if (p >= end) return toVal;
      const ratio = (p - start) / (end - start);
      return fromVal + ratio * (toVal - fromVal);
    };

    animWidth.set(
      interpolate(
        progress,
        0,
        0.45,
        newCoords.centered.width,
        newCoords.settled.width,
      ),
    );
    animHeight.set(
      interpolate(
        progress,
        0,
        0.45,
        newCoords.centered.height,
        newCoords.settled.height,
      ),
    );
    animLeft.set(
      interpolate(
        progress,
        0,
        0.45,
        newCoords.centered.left,
        newCoords.settled.left,
      ),
    );
    animTop.set(
      interpolate(
        progress,
        0,
        0.45,
        newCoords.centered.top,
        newCoords.settled.top,
      ),
    );
    animRadius.set(
      interpolate(
        progress,
        0,
        0.45,
        newCoords.centered.radius,
        newCoords.settled.radius,
      ),
    );
    bgPawOpacity.set(interpolate(progress, 0, 0.45, 0.08, 0));
    leftPawOpacity.set(interpolate(progress, 0, 0.45, 0, 0.48));
    rightPawOpacity.set(interpolate(progress, 0, 0.45, 0, 0.34));
    contentOpacity.set(interpolate(progress, 0.45, 0.75, 0, 1));
    collageOpacity.set(interpolate(progress, 0.55, 0.85, 0, 1));
    collageY.set(interpolate(progress, 0.55, 0.85, 40, 0));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncViewport = () => setIsMobile(window.innerWidth < 768);
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  // Track visibility to pause video when not in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Notify the header of the initial hero opacity on mount.
  // useMotionValueEvent("change", ...) does NOT fire for the initial value, so
  // without this the header would stay at its default opacity (1) on first paint
  // and only sync up after the first scroll. On the homepage the header should
  // start hidden (opacity 0) and fade in as the user scrolls past the hero.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally fires once on mount; subsequent updates flow through useMotionValueEvent.
  useEffect(() => {
    const p = Math.max(0, Math.min(1, scrollYProgress.get()));
    const opacity = Math.max(0, Math.min(1, (p - 0.45) / (0.75 - 0.45)));
    window.dispatchEvent(
      new CustomEvent("hero-content-opacity", {
        detail: { opacity },
      }),
    );
  }, []);

  // Manage video play/pause based on visibility state
  // biome-ignore lint/correctness/useExhaustiveDependencies: getActiveVideo depends on isMobile state.
  useEffect(() => {
    const video = getActiveVideo();
    if (!video) return;

    if (isInView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, isMobile]);

  // Synchronously set centered position before first paint so the video renders immediately.
  // biome-ignore lint/correctness/useExhaustiveDependencies: motion value setters are stable across renders.
  useLayoutEffect(() => {
    if (typeof window === "undefined" || isMobile) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const centeredHeight = h * 0.85;
    const centeredWidth = Math.min(w * 0.94, centeredHeight * 1.78);
    animWidth.set(centeredWidth);
    animHeight.set(centeredHeight);
    animLeft.set((w - centeredWidth) / 2);
    animTop.set((h - centeredHeight) / 2);
    animRadius.set(48);
  }, [isMobile]);

  // Force muted at the DOM attribute level synchronously — bypasses React's muted prop quirk.
  // This must happen before any browser autoplay attempt.
  useLayoutEffect(() => {
    const refs = [mobileVideoRef.current, desktopVideoRef.current];
    refs.forEach((el) => {
      if (el) {
        el.defaultMuted = true;
        el.muted = true;
      }
    });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: measure reads current refs and motion values directly.
  useEffect(() => {
    if (isMobile) return;
    const handleResize = () => measure();
    measure();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const interpolate = (
      p: number,
      start: number,
      end: number,
      fromVal: number,
      toVal: number,
    ) => {
      if (p <= start) return fromVal;
      if (p >= end) return toVal;
      const ratio = (p - start) / (end - start);
      return fromVal + ratio * (toVal - fromVal);
    };

    const p = Math.max(0, Math.min(1, progress));
    setVideoMinimized(p > 0.45);

    // Notify header of content opacity for synchronized fade-in.
    // Dispatched unconditionally (mobile or no coords yet) so the header gets
    // the right opacity from the first scroll change, not just after coords
    // are measured.
    window.dispatchEvent(
      new CustomEvent("hero-content-opacity", {
        detail: { opacity: interpolate(p, 0.45, 0.75, 0, 1) },
      }),
    );

    if (isMobile || !coords) return;

    animWidth.set(
      interpolate(p, 0, 0.45, coords.centered.width, coords.settled.width),
    );
    animHeight.set(
      interpolate(p, 0, 0.45, coords.centered.height, coords.settled.height),
    );
    animLeft.set(
      interpolate(p, 0, 0.45, coords.centered.left, coords.settled.left),
    );
    animTop.set(
      interpolate(p, 0, 0.45, coords.centered.top, coords.settled.top),
    );
    animRadius.set(
      interpolate(p, 0, 0.45, coords.centered.radius, coords.settled.radius),
    );

    bgPawOpacity.set(interpolate(p, 0, 0.45, 0.08, 0));
    leftPawOpacity.set(interpolate(p, 0, 0.45, 0, 0.48));
    rightPawOpacity.set(interpolate(p, 0, 0.45, 0, 0.34));
    contentOpacity.set(interpolate(p, 0.45, 0.75, 0, 1));
    collageOpacity.set(interpolate(p, 0.55, 0.85, 0, 1));
    collageY.set(interpolate(p, 0.55, 0.85, 40, 0));

    const volumeFactor = clamp(interpolate(p, 0, 0.45, 1, 0), 0, 1);
    const video = getActiveVideo();
    if (video) {
      if (audioMode === "muted" || browserMutedFallback) {
        video.volume = 0;
        video.muted = true;
      } else {
        const targetVolume = volumeFactor * getEffectiveVolume();
        video.volume = targetVolume;
        video.muted = targetVolume <= 0.001;
      }
    }
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: effect intentionally rebinds when the active mobile/desktop video switches.
  useEffect(() => {
    const video = getActiveVideo();
    if (!video) return;

    const syncProgress = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      if (!isInViewRef.current) return; // Skip updating styles if not in view
      const ratio = video.currentTime / video.duration;
      const percent = `${Math.max(0, Math.min(100, ratio * 100))}%`;
      if (isMobile) {
        if (mobileProgressBarRef.current) {
          mobileProgressBarRef.current.style.width = percent;
        }
      } else {
        if (desktopProgressBarRef.current) {
          desktopProgressBarRef.current.style.width = percent;
        }
      }
    };

    const tryStart = async () => {
      // defaultMuted is already set via useLayoutEffect — just call play().
      try {
        if (isInViewRef.current) {
          await video.play();
        }
        setAutoplayBlocked(false);
        setBrowserMutedFallback(true); // Playing muted — user can enable sound via prompt or button.
      } catch (err) {
        // play() rejects if the browser hasn't buffered enough data yet.
        // The readiness listeners below will retry once data is available.
        console.warn(
          "[Hero video] autoplay play() rejected, waiting for ready:",
          err,
        );
        setAutoplayBlocked(true);
        setBrowserMutedFallback(true);
      }
    };

    // Retry play() on every "ready" event the browser fires. On a cold cache
    // the first play() almost always rejects (the video hasn't buffered
    // enough yet); the video only starts once one of these fires AND
    // isInView is true. Listening to all three covers the timing
    // differences between browsers and between cache-cold vs warm loads.
    const tryPlayIfReady = () => {
      if (video.paused && isInViewRef.current) {
        video.play().then(
          () => {
            setAutoplayBlocked(false);
            setBrowserMutedFallback(true);
          },
          () => {
            // Still not ready — will retry on the next ready event
          },
        );
      }
    };
    const onCanPlay = tryPlayIfReady;
    const onLoadedData = tryPlayIfReady;
    const onCanPlayThrough = tryPlayIfReady;

    // Surface load errors so we can debug codec/network/404 issues.
    const onError = () => {
      console.error(
        "[Hero video] error:",
        video.error?.code,
        video.error?.message,
      );
      setAutoplayBlocked(true);
    };

    video.addEventListener("timeupdate", syncProgress);
    video.addEventListener("loadedmetadata", syncProgress);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.addEventListener("error", onError);
    void tryStart();

    return () => {
      video.removeEventListener("timeupdate", syncProgress);
      video.removeEventListener("loadedmetadata", syncProgress);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("error", onError);
    };
    // audioMode intentionally excluded — audio changes are handled by applyAudioState below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: applyAudioState reads the latest refs and audio state directly.
  useEffect(() => {
    applyAudioState();
  }, [audioMode, browserMutedFallback, isMobile]);

  const effectiveMuted =
    browserMutedFallback ||
    audioMode === "muted" ||
    getEffectiveVolume() <= 0.001;

  // Explicitly enable sound on a user gesture (browser policy requirement).
  // Called by both the one-time overlay and the speaker button.
  function enableSound() {
    const video = getActiveVideo();
    setAudioMode("forced-unmuted");
    setBrowserMutedFallback(false);
    setAutoplayBlocked(false);
    setShowSoundPrompt(false);
    setHasInteracted(true);
    if (video) {
      video.muted = false;
      video.volume = 1;
      void video.play().catch(() => {});
    }
  }

  function toggleAudio() {
    const video = getActiveVideo();
    setHasInteracted(true);

    if (audioMode === "muted") {
      setAudioMode("auto");
      setBrowserMutedFallback(false);
      if (video) {
        video.muted = false;
        video.volume = 1;
        void video.play().catch(() => {});
      }
      return;
    }

    if (audioMode === "forced-unmuted") {
      setAudioMode("muted");
      return;
    }

    if (browserMutedFallback || getEffectiveVolume() <= 0.001) {
      setAudioMode("forced-unmuted");
      setBrowserMutedFallback(false);
      setShowSoundPrompt(false);
      if (video) {
        video.muted = false;
        video.volume = 1;
        void video.play().catch(() => {});
      }
      return;
    }

    setAudioMode("muted");
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen md:h-[130vh] md:min-h-0 overflow-x-clip overflow-y-visible bg-cream pb-4 md:pb-6"
    >
      {/* Top-right/bottom-left background glow blobs clipped to section bounds */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-blob" />

      {/* Additional prominent top-right glow blob */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden md:block">
        <div
          aria-hidden
          className="absolute right-0"
          style={{
            top: "9.75rem",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "var(--color-terracotta-soft)",
            opacity: 0.6,
            filter: "blur(70px)",
          }}
        />
      </div>

      <div
        ref={stickyWrapperRef}
        className="hero-sticky-container sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between relative pt-20 md:pt-24 lg:pt-28 pb-4 md:pb-6"
      >
        {/* Top-right glow that stays pinned inside the sticky wrapper so it doesn't
              scroll away with the page. */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden md:block">
          <div
            aria-hidden
            className="absolute -right-40 -top-16"
            style={{
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "var(--color-terracotta-soft)",
              opacity: 0.3,
              filter: "blur(100px)",
            }}
          />
        </div>

        {/* Paw print background shapes */}
        <motion.div
          aria-hidden
          style={{ opacity: leftPawOpacity }}
          className="pointer-events-none absolute -left-20 top-[9.75rem] z-0 hidden md:block"
        >
          <OrganicShape
            variant="paw"
            size={260}
            color="var(--color-peach)"
            opacity={1}
            rotate={-16}
          />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ opacity: rightPawOpacity }}
          className="pointer-events-none absolute -right-10 bottom-[28rem] z-0 hidden md:block"
        >
          <OrganicShape
            variant="paw"
            size={200}
            color="var(--color-terracotta-soft)"
            opacity={1}
            rotate={14}
          />
        </motion.div>

        {/* Dense small paw print background pattern behind the intro card (desktop only) */}
        {!isMobile && (
          <motion.div
            style={{ opacity: bgPawOpacity }}
            className="pointer-events-none absolute inset-0 z-0 bg-paw-intro"
          />
        )}

        {/* Vertically centered content wrapper */}
        <div className="flex-grow flex items-center relative z-10 w-full py-4 md:py-6">
          <motion.div
            style={!isMobile ? { opacity: contentOpacity } : undefined}
            className="container-editorial w-full"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
              <div className="max-w-[34rem] lg:pt-2">
                <p className="eyebrow">{hero.eyebrow}</p>
                <h1 className="mt-4 font-display text-[2rem] leading-[1.08] text-ink sm:text-[2.25rem] sm:max-w-[18ch] lg:text-[2.75rem] lg:max-w-[20ch] xl:text-[3rem]">
                  {hero.primaryHeadline.map((line) => (
                    <span key={line} className="block text-balance">
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="body mt-4 max-w-[31rem] text-pretty text-ink-soft/95">
                  {hero.credibility}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                  </Button>
                  <Button href={hero.secondaryCta.href} variant="secondary">
                    {hero.secondaryCta.label}
                  </Button>
                </div>
              </div>

              <div className="relative lg:pl-2 xl:pl-0">
                {isMobile ? (
                  <div className="relative overflow-hidden rounded-[2.35rem] bg-black shadow-[0_28px_90px_rgba(43,31,23,0.16)] aspect-[1.28/1] min-h-[16rem]">
                    <video
                      ref={mobileVideoRef}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster={HERO_VIDEO_POSTER}
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen noremoteplayback"
                      className="cinematic-video absolute inset-0 h-full w-full object-cover scale-[1.15]"
                    >
                      <source src={HERO_VIDEO_SRC} type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.22)_58%,rgba(0,0,0,0.34)_100%)]" />

                    {showSoundPrompt && !hasInteracted && (
                      <button
                        type="button"
                        onClick={enableSound}
                        className="group absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[3px] transition hover:bg-black/20"
                        aria-label="Tap to enable sound"
                      >
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-cream shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:scale-[1.04] hover:border-white/60 hover:bg-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.15)]">
                          <svg
                            className="transition-transform duration-300 ease-out group-hover:translate-x-[1px]"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <title>Enable sound</title>
                            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                          </svg>
                          Tap to enable sound
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-black/32 text-cream backdrop-blur-sm transition hover:bg-black/44"
                      aria-label={
                        effectiveMuted
                          ? "Unmute intro video"
                          : "Mute intro video"
                      }
                      aria-pressed={!effectiveMuted}
                    >
                      {effectiveMuted ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <title>Muted</title>
                          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                          <path d="m16 9 5 6" />
                          <path d="m21 9-5 6" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <title>Sound on</title>
                          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                        </svg>
                      )}
                    </button>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[4px] bg-black/20">
                      <div
                        ref={mobileProgressBarRef}
                        className="h-full transition-[width] duration-150 ease-linear"
                        style={{
                          width: "0%",
                          backgroundColor: "var(--color-terracotta)",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    ref={videoPlaceholderRef}
                    className="hero-video-placeholder relative overflow-hidden rounded-[2.35rem] aspect-[1.28/1] min-h-[16rem] sm:aspect-[1.38/1] lg:min-h-[18rem] xl:aspect-[1.46/1] xl:min-h-[20rem]"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Morphing Video Player for Desktop */}
        {!isMobile && (
          <motion.div
            style={{
              position: "absolute",
              left: animLeft,
              top: animTop,
              width: animWidth,
              height: animHeight,
              borderRadius: animRadius,
            }}
            className="group z-20 overflow-hidden bg-black shadow-[0_28px_90px_rgba(43,31,23,0.16)]"
          >
            <div className="relative h-full w-full">
              <video
                ref={desktopVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={HERO_VIDEO_POSTER}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="cinematic-video absolute inset-0 h-full w-full object-cover scale-[1.15]"
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.22)_58%,rgba(0,0,0,0.34)_100%)]" />

              {/* "More about Ina" hover button — only visible on the minimized video preview. */}
              {videoMinimized && (
                <Link
                  href="/about"
                  className="group/more absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 hover:bg-black/40 group-hover:opacity-100"
                  aria-label="More about Ina"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cream shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group-hover/more:scale-[1.04] group-hover/more:border-white/60 group-hover/more:bg-white/20 group-hover/more:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.15)]">
                    More about Ina
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-out group-hover/more:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              )}

              {showSoundPrompt && !hasInteracted && !videoMinimized && (
                <button
                  type="button"
                  onClick={enableSound}
                  className="group absolute inset-0 z-30 flex items-center justify-center bg-black/10 backdrop-blur-[3px] transition hover:bg-black/20"
                  aria-label="Tap to enable sound"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-cream shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:scale-[1.04] hover:border-white/60 hover:bg-white/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.15)]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <title>Enable sound</title>
                      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                    </svg>
                    Tap to enable sound
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={toggleAudio}
                className="absolute right-4 top-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-black/32 text-cream backdrop-blur-sm transition hover:bg-black/44"
                aria-label={
                  effectiveMuted ? "Unmute intro video" : "Mute intro video"
                }
                aria-pressed={!effectiveMuted}
              >
                {effectiveMuted ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <title>Muted</title>
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                    <path d="m16 9 5 6" />
                    <path d="m21 9-5 6" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <title>Sound on</title>
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                  </svg>
                )}
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[4px] bg-black/20">
                <div
                  ref={desktopProgressBarRef}
                  className="h-full transition-[width] duration-150 ease-linear"
                  style={{
                    width: "0%",
                    backgroundColor: "var(--color-terracotta)",
                  }}
                />
              </div>

              {/* Single scroll indicator — text and direction switch when video is minimized */}
              <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none"
              >
                {videoMinimized ? (
                  <>
                    <div className="w-[1.15rem] h-[1.75rem] rounded-full border border-white/30 backdrop-blur-[1px] relative shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                      <motion.div
                        animate={{ y: [9, 2, 9] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-[2px] h-[4px] rounded-full bg-white absolute left-1/2 -translate-x-1/2 top-1"
                      />
                    </div>
                    <span className="font-sans text-[0.62rem] uppercase tracking-[0.25em] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      Scroll up to maximize
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-sans text-[0.62rem] uppercase tracking-[0.25em] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      Scroll to explore
                    </span>
                    <div className="w-[1.15rem] h-[1.75rem] rounded-full border border-white/30 backdrop-blur-[1px] relative shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                      <motion.div
                        animate={{ y: [2, 9, 2] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-[2px] h-[4px] rounded-full bg-white absolute left-1/2 -translate-x-1/2 top-1"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Full-width image collage inside the hero section, below the main content */}
        <motion.div
          style={
            !isMobile ? { opacity: collageOpacity, y: collageY } : undefined
          }
          className="w-full relative z-10 overflow-hidden pb-6 pt-4"
        >
          {/* Edge vignette gradients for a premium editorial blend */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-cream)] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-cream)] to-transparent z-20 pointer-events-none" />

          {/* Infinite Marquee Loop */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] gap-4 md:gap-6 px-4">
            {/* Loop 1 */}
            <div className="flex gap-4 md:gap-6 flex-shrink-0">
              {COLLAGE_IMAGES.map((image, i) => (
                <div
                  key={`loop-1-${image.src}`}
                  className={`relative flex-shrink-0 overflow-hidden rounded-[2rem] bg-cream-deep shadow-[0_12px_36px_rgba(43,31,23,0.05)] transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_20px_48px_rgba(43,31,23,0.12)] ${image.aspect} ${image.height}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 240px, 320px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.06]"
                    priority={i < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Loop 2 (seamless duplication) */}
            <div className="flex gap-4 md:gap-6 flex-shrink-0" aria-hidden>
              {COLLAGE_IMAGES.map((image, i) => (
                <div
                  key={`loop-2-${image.src}`}
                  className={`relative flex-shrink-0 overflow-hidden rounded-[2rem] bg-cream-deep shadow-[0_12px_36px_rgba(43,31,23,0.05)] transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_20px_48px_rgba(43,31,23,0.12)] ${image.aspect} ${image.height}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 240px, 320px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.06]"
                    priority={i < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade gradient for smooth transition into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 md:h-32 bg-gradient-to-b from-transparent to-[var(--color-cream)]"
        aria-hidden
      />
    </section>
  );
}
