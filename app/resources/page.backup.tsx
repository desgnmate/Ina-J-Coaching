import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { EmailCapture } from "@/components/shared/EmailCapture";
import { ImageReveal } from "@/components/shared/ImageReveal";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SplitText } from "@/components/shared/SplitText";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free tools, podcast, and community for pet photographers who want clearer marketing, intentional content, and consistent bookings.",
};

const resources = [
  {
    kind: "Free download",
    title: "Pet Photographer’s Marketing Clarity Checklist",
    body: "A simple, practical guide to reviewing your messaging, offers, and client journey — so your marketing starts to feel intentional.",
    cta: "Send Me the Checklist",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  },
  {
    kind: "Podcast",
    title: "The Pet Photographers’ Journal",
    body: "Real conversations about running a pet photography business. Marketing, pricing, client experience, and mindset — practical and honest.",
    cta: "Listen to the podcast",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1000&q=80",
  },
  {
    kind: "Free community",
    title: "Pet Photographers Collective on Skool",
    body: "A free Skool community for pet photographers who want to grow without doing it alone. Ask questions, share wins, and get real, practical feedback.",
    cta: "Join the community",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    kind: "Live events",
    title: "Sony Scene workshops & webinars",
    body: "As a Sony Digital Imaging Advocate, I run regular pet photography workshops, gear sessions, and creative webinars through Sony Scene.",
    cta: "See upcoming events",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80",
  },
];

const journal = [
  {
    tag: "Marketing",
    title: "Why posting more won’t fix your bookings",
    excerpt:
      "Activity isn’t strategy. Here’s how to spot the difference and what to do about it.",
  },
  {
    tag: "Offers",
    title: "How to talk about pricing without apologising",
    excerpt:
      "The exact language to use when clients ask ‘why so much?’ — and how to package so the value is obvious.",
  },
  {
    tag: "Client experience",
    title: "The 90-second enquiry reply that changes everything",
    excerpt:
      "A small tweak to the first reply that lifts enquiry-to-booking rates almost immediately.",
  },
  {
    tag: "Mindset",
    title: "From busy to booked: the shift that took me two years",
    excerpt:
      "How I stopped confusing effort for progress — and what I changed in the calendar.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-noise-cream has-pattern relative overflow-hidden pt-32 md:pt-40 lg:pt-48">
        <div className="container-editorial relative">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Resources</p>
            </Reveal>
            <div className="mt-5">
              <SplitText as="h1" className="display-1 text-balance">
                Tools to help you build a clearer
              </SplitText>
              <h1 className="display-1 -mt-2 text-balance italic text-terracotta">
                pet photography business.
              </h1>
            </div>
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-2xl">
                A small library of free and low-cost resources — checklists,
                podcast, community, and live sessions — built to help you grow
                with more clarity and less guesswork.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-editorial">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5" from="left">
              <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                <Image
                  src={resources[0].image}
                  alt="A planning notebook on a wooden table with a coffee"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageReveal>
            </Reveal>
            <div className="md:col-span-7 md:pl-8">
              <Reveal>
                <p className="eyebrow">Featured</p>
              </Reveal>
              <SplitText as="h2" className="display-2 mt-4 text-balance">
                {resources[0].title}
              </SplitText>
              <Reveal>
                <p className="lead mt-5 max-w-xl">{resources[0].body}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <EmailCapture
                    cta={resources[0].cta}
                    source="resources-checklist"
                  />
                </div>
                <p className="mt-4 text-xs text-ink-muted">
                  No spam. Unsubscribe anytime.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dots panel-cream section has-pattern relative">
        <div className="container-editorial relative">
          <SectionHeading
            eyebrow="More resources"
            headline="Listen, learn, and connect with other photographers."
            as="h2"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {resources.slice(1).map((r, i) => (
              <Reveal
                key={r.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream"
                delay={i * 0.1}
                from="up"
                amount={0.3}
              >
                <ImageReveal className="relative aspect-[4/3] w-full">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </ImageReveal>
                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow">{r.kind}</p>
                  <h3 className="display-3 mt-3">{r.title}</h3>
                  <p className="mt-4 flex-1 text-pretty text-ink-soft">
                    {r.body}
                  </p>
                  <Button
                    href={site.bookingHref}
                    variant="ghost"
                    className="mt-6"
                  >
                    {r.cta}
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="journal" className="bg-lines section has-pattern relative">
        <div className="container-editorial relative">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeading
                eyebrow="From the journal"
                headline="Short reads on marketing, offers, and mindset."
                as="h2"
              />
            </div>
            <Reveal className="md:col-span-5">
              <p className="body-lg max-w-md md:ml-auto">
                A growing collection of practical notes from working with pet
                photographers every week. No fluff, no clickbait.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px bg-line md:grid-cols-2">
            {journal.map((j, i) => (
              <Reveal
                key={j.title}
                className="group bg-cream-deep p-8 md:p-10"
                delay={i * 0.07}
                from="up"
                amount={0.3}
              >
                <p className="eyebrow">{j.tag}</p>
                <h3 className="display-3 mt-3 max-w-md transition-colors group-hover:text-terracotta">
                  {j.title}
                </h3>
                <p className="mt-4 max-w-md text-pretty text-ink-soft">
                  {j.excerpt}
                </p>
                <Button href="/contact" variant="ghost" className="mt-6">
                  Read more
                  <span aria-hidden>→</span>
                </Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-watercolor panel-cream section has-pattern relative">
        <div className="container-editorial text-center">
          <Reveal>
            <SplitText
              as="h2"
              className="display-2 mx-auto max-w-2xl text-balance"
              mode="word"
            >
              Want these delivered to your inbox?
            </SplitText>
            <p className="lead mx-auto mt-6 max-w-xl">
              Join the photographer list for occasional, useful emails — no
              noise, no pressure, just things that help.
            </p>
            <div className="mx-auto mt-10 max-w-md">
              <EmailCapture cta="Subscribe" source="resources-newsletter" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
