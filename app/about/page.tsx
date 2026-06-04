import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutValues } from "@/components/about/AboutValues";
import { JourneySection } from "@/components/about/JourneySection";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SplitText } from "@/components/shared/SplitText";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Ina",
  description:
    "Canberra pet photographer, dog mum, and business mentor. The story behind Ina J Photography and the move into coaching other pet photographers.",
};

const timeline = [
  {
    year: "2009",
    label: "Where it started",
    title: "Photography as a side hustle",
    body: "While working in the public service, Ina picked up a camera and never put it down. She spent the early years shooting families, newborns, and events — building her eye, her craft, and her love for the work alongside her day job.",
    image: images.about,
  },
  {
    year: "2019",
    label: "Mac, my heart dog",
    title: "Mac changed everything",
    body: "Mac was Ina's heart dog. When he was diagnosed with heart failure, she poured herself into photographing him — wanting to hold onto every moment. Losing him in 2019 made one thing clear: pet owners deserve professional, timeless images of the animals who mean everything to them.",
    image: images.heroAlt,
  },
  {
    year: "2019",
    label: "The studio begins",
    title: "Ina J Photography begins",
    body: "Ina launched her pet photography business the same year she lost Mac — a full-service studio built around emotional storytelling, bespoke artwork, and a deeply personal client experience. It has since grown into an award-winning brand serving dog families across Canberra.",
    image: images.hero,
  },
  {
    year: "Today",
    label: "Coaching others",
    title: "Coaching other photographers",
    body: "After building her own business, earning a Sony Digital Imaging Advocate partnership, and winning recognition including the 2021 Local Business Award and the 2022 Asia Pacific Photography Awards People's Choice, Ina now coaches other pet photographers — helping them find clarity in their marketing, confidence in their offer, and a business that actually feels like theirs.",
    image: images.whoFor,
  },
];

const values = [
  {
    title: "Storytelling",
    body: "Every session, every brand, every business has a story worth telling well. Coaching starts there.",
  },
  {
    title: "Clarity",
    body: "Vague offers get vague results. We make the message, the offer, and the experience specific.",
  },
  {
    title: "Connection",
    body: "Photography and coaching are both human work. Real connection is what turns enquiries into clients.",
  },
  {
    title: "Intention",
    body: "Strategy isn't about doing more. It's about doing the right things, in the right order, for the right people.",
  },
];

const recognition = [
  {
    src: "https://image12.photobiz.com/7732/7_20241003235111_13761207_large.png",
    alt: "Sony Digital Imaging Advocate",
  },
  {
    src: "https://image11.photobiz.com/8586/7_20241219161945_13951845_large.png",
    alt: "2024 International Pet Photography Awards - Silver Winner",
  },
  {
    src: "https://image6.photobiz.com/8933/7_20241219162120_13951847_large.png",
    alt: "2024 International Pet Photography Awards - Bronze Distinction Winner",
  },
  {
    src: "https://image10.photobiz.com/8495/7_20241219162119_13951846_large.png",
    alt: "2024 International Pet Photography Awards - Bronze Winner",
  },
  {
    src: "https://image4.photobiz.com/8911/7_20250210174632_14017005_large.png",
    alt: "AI Photo Editing Partnership with Imagen",
  },
  {
    src: "https://image6.photobiz.com/8933/7_20230214064819_12722126_large.png",
    alt: "2022 Asia Pacific Photography Awards People's Choice Winner",
  },
  {
    src: "https://image7.photobiz.com/8912/7_20230214064819_12722127_large.png",
    alt: "2022 Asia Pacific Photography Awards Runner Up in Advertising and Editorial",
  },
  {
    src: "https://image7.photobiz.com/8912/7_20230214064726_12722122_large.png",
    alt: "2021 Local Business Award Winner - Canberra and surrounding region",
  },
  {
    src: "https://image12.photobiz.com/7732/7_20230529162904_12871791_large.png",
    alt: "2023 Australian Small Business Champions Award Winner - Photography",
  },
  {
    src: "https://image9.photobiz.com/8584/7_20230214064743_12722123_large.jpg",
    alt: "Top 25 Action Category - 2021 International Pet Photographer of the Year Awards",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 1 · Hero — Editorial Founder Story ── */}
      <AboutHero />

      {/* ── 2 · Journey — Pinned timeline + scrolling acts ── */}
      <JourneySection phases={timeline} />

      {/* ── 4 · Values — Manifesto Style Rows ── */}
      <AboutValues values={values} />

      {/* ── 5 · Recognition — Dark stat bar ── */}
      <section className="bg-ink section relative overflow-hidden">
        {/* Decorative terracotta glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl"
        />

        <div className="container-editorial relative">
          {/* Header — two-column */}
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="text-[0.75rem] uppercase tracking-[0.18em] text-terracotta-soft font-medium">
                Recognition
              </p>
              <h2 className="display-2 mt-5 text-balance text-cream">
                Trusted by clients,{" "}
                <span className="italic text-terracotta-soft">
                  recognised by the industry.
                </span>
              </h2>
            </div>
            <Reveal className="md:col-span-5">
              <p className="body-lg max-w-md md:ml-auto text-cream/90">
                A handful of the awards, partnerships, and recognitions that
                have shaped the studio and the coaching practice.
              </p>
            </Reveal>
          </div>

          {/* Awards grid */}
          <Reveal>
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
              {recognition.map((r) => (
                <div
                  key={r.alt}
                  className="group relative flex h-32 items-center justify-center rounded-2xl border border-cream/5 bg-ink-soft/30 p-5 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-terracotta/30 hover:bg-ink-soft/50 hover:shadow-[0_8px_24px_rgba(202,95,60,0.1)]"
                >
                  {/* biome-ignore lint/performance/noImgElement: using standard img to render live website assets */}
                  <img
                    src={r.src}
                    alt={r.alt}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10 flex justify-center">
            <a
              href={site.parentSite}
              className="btn-ghost text-cream/70 hover:text-cream"
            >
              See the photography portfolio
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── 6 · Final CTA — Homepage FinalCta match ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[480px] w-full md:h-[560px]">
          <Image
            src={images.cta.src}
            alt={images.cta.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grain"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink/85"
          />
        </div>

        <div className="container-editorial absolute inset-0 flex items-center">
          <Reveal className="mx-auto max-w-2xl text-center text-cream">
            <SplitText
              as="h2"
              className="display-2 text-balance text-cream"
              stagger={0.05}
            >
              Ready to build a photography business with more clarity and
              confidence?
            </SplitText>
            <p className="mt-6 text-pretty text-cream/85 md:text-lg">
              If you&rsquo;re a photographer who wants clearer marketing, better
              clients, and a more intentional business, the first conversation
              starts with you.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href={site.bookingHref} variant="primary">
                Book a Coaching Call
                <span aria-hidden>→</span>
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-cream text-cream hover:bg-cream hover:text-ink"
              >
                Send a message
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
