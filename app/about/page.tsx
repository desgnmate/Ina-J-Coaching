import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutValues } from "@/components/about/AboutValues";
import { JourneySection } from "@/components/about/JourneySection";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SplitText } from "@/components/shared/SplitText";
import { StickyCta } from "@/components/shared/StickyCta";
import { site } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Ina",
  description:
    "The story behind Ina J Education, from Ina's public service background to a $305K+ pet photography studio and a coaching business built alongside it.",
};

const timeline = [
  {
    year: "2009",
    label: "Where it started",
    title: "Public service and photography side by side",
    body: "While working in the Australian Public Service, Ina picked up a camera and never put it down. The early years built both craft and business discipline, long before photography became full-time.",
    image: images.about,
  },
  {
    year: "2019",
    label: "Mac, my heart dog",
    title: "Mac changed everything",
    body: "Mac was Ina's heart dog. Photographing him through illness made the work feel personal in a new way, and sharpened the conviction that pet owners deserve images with real emotional weight.",
    image: images.heroAlt,
  },
  {
    year: "2019",
    label: "The studio begins",
    title: "Ina J Photography begins",
    body: "Ina launched a full-service pet photography studio built around emotional storytelling, bespoke artwork, and a thoughtful client experience. The studio grew into an award-winning Canberra business with stronger average sales and fewer, higher-value sessions.",
    image: images.hero,
  },
  {
    year: "Today",
    label: "Still in the business",
    title: "Photography and coaching, together",
    body: "Today the studio is still active, generating $305K+ a year while Ina coaches pet photographers around the world. The advice stays practical because the business is still in motion.",
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
      {/* ── 1 · Hero · Editorial Founder Story ── */}
      <AboutHero />

      {/* ── 2 · Journey · Pinned timeline + scrolling acts ── */}
      <JourneySection phases={timeline} />

      {/* ── 4 · Values · Manifesto Style Rows ── */}
      <AboutValues values={values} />

      {/* ── 5 · Recognition · Dark stat bar ── */}
      <section className="bg-ink section relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-gold/12 blur-3xl"
        />

        <div className="container-editorial relative">
          {/* Header · two-column */}
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="text-gold text-[0.75rem] font-medium uppercase tracking-[0.18em]">
                Recognition
              </p>
              <h2 className="display-2 mt-5 text-balance text-cream">
                Trusted by clients,{" "}
                <span className="italic text-gold">
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
                  className="group relative flex h-32 items-center justify-center rounded-2xl border border-cream/5 bg-ink-soft/30 p-5 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-gold/30 hover:bg-ink-soft/50 hover:shadow-[0_8px_24px_rgba(176,129,128,0.12)]"
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

      {/* ── 6 · Final CTA · Homepage FinalCta match ── */}
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
                Book a call
                <span aria-hidden>→</span>
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
              >
                Send a message
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
      <StickyCta href={site.bookingHref} label="Book a call" />
    </>
  );
}
