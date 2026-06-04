import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { whoFor } from "@/lib/content";
import { images } from "@/lib/images";

export function WhoFor() {
  // Mapping each point to a specific category and matching image asset
  const categories = [
    {
      title: "The Bookings",
      text: whoFor.yes?.[0] ?? "",
      image: images.heroAlt,
    },
    {
      title: "The Clarity",
      text: whoFor.yes?.[1] ?? "",
      image: images.about,
    },
    {
      title: "The Audience",
      text: whoFor.yes?.[2] ?? "",
      image: images.cta,
    },
    {
      title: "The Presence",
      text: whoFor.yes?.[3] ?? "",
      image: images.offer,
    },
    {
      title: "The Mentorship",
      text: whoFor.yes?.[4] ?? "",
      image: images.whoFor,
    },
  ].filter((item) => item.text && item.image);

  return (
    <section className="bg-blob panel-peach section has-pattern relative overflow-hidden">
      <div className="container-editorial relative">
        {/* Intro Header — Pillars-style two-column layout */}
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <SectionHeading
              eyebrow={whoFor.eyebrow}
              headline={
                <>
                  This is for you if you're ready to grow{" "}
                  <span className="italic text-terracotta">
                    with intention.
                  </span>
                </>
              }
              as="h2"
              className="!mt-0"
            />
          </div>
          <Reveal className="md:col-span-5">
            <p className="body-lg max-w-md md:ml-auto">{whoFor.subcopy}</p>
          </Reveal>
        </div>

        {/* Horizontal divider */}
        <div className="mt-10 md:mt-12 h-px bg-line/60" />

        {/* Interactive Content Rows */}
        <div className="flex flex-col border-b border-line/60">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08} from="up">
              <div className="group relative grid grid-cols-12 items-stretch border-t border-line/60 hover:bg-white/35 transition-all duration-700 ease-out">
                {/* Left Column: Text Content */}
                <div className="col-span-7 lg:col-span-8 py-6 md:py-8 lg:py-10 pl-4 sm:pl-6 pr-4 transition-all duration-700 ease-out group-hover:py-8 group-hover:md:py-10 group-hover:lg:py-13">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
                    {/* Category Title */}
                    <div className="md:col-span-4 lg:col-span-3">
                      <span className="font-display text-lg md:text-xl tracking-[0.01em] text-terracotta font-normal block">
                        {cat.title}
                      </span>
                    </div>
                    {/* Description Copy */}
                    <div className="md:col-span-8 lg:col-span-9">
                      <p className="font-display text-base md:text-lg lg:text-xl text-ink-soft leading-relaxed text-pretty transition-colors duration-300 group-hover:text-ink">
                        {cat.text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Image Container */}
                <div className="col-span-5 lg:col-span-4 relative overflow-hidden rounded-none">
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt}
                    fill
                    sizes="(min-width: 1024px) 35vw, 42vw"
                    className="object-cover grayscale rounded-none contrast-[1.02] brightness-[0.98] transition-all duration-700 ease-[0.215,0.61,0.355,1] group-hover:grayscale-0 group-hover:scale-[1.04] group-hover:contrast-100 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-grain pointer-events-none mix-blend-multiply opacity-5" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
