import type { Metadata } from "next";
import { Button } from "@/components/shared/Button";
import { ContactForm } from "@/components/shared/ContactForm";
import { LineDraw } from "@/components/shared/LineDraw";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SplitText } from "@/components/shared/SplitText";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ina J Coaching. Book a discovery call, send a written enquiry, or follow along on Instagram and Facebook.",
};

const faqs = [
  {
    q: "How quickly will I hear back?",
    a: "Every enquiry gets a personal reply within two business days. If you book a discovery call, you’ll get a calendar link straight away.",
  },
  {
    q: "Do you offer a free intro call?",
    a: "Yes. A short discovery call (15 minutes) is the best way to see if the program is the right fit before any commitment.",
  },
  {
    q: "Can I work with you from outside Australia?",
    a: "Absolutely. The program runs online and I currently work with photographers in multiple countries.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-blob has-pattern relative overflow-hidden pt-32 md:pt-40 lg:pt-48">
        <div className="container-editorial relative">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Contact</p>
            </Reveal>
            <div className="mt-5">
              <SplitText as="h1" className="display-1 text-balance">
                Let’s talk about
              </SplitText>
              <h1 className="display-1 -mt-2 text-balance italic text-terracotta">
                your business.
              </h1>
            </div>
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-2xl">
                Send a written enquiry, or jump straight on a short discovery
                call. Either way, you’ll hear from me personally — not a bot,
                not a VA.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7" from="left" amount={0.15}>
              <ContactForm source="contact-page" />
            </Reveal>

            <div className="lg:col-span-5">
              <Reveal from="right" delay={0.1}>
                <div className="bg-grain rounded-2xl border border-line bg-ink p-8 text-cream md:p-10">
                  <p className="eyebrow text-terracotta-soft">
                    Prefer to talk?
                  </p>
                  <h2 className="display-3 mt-3 text-cream">
                    Book a free 15-min discovery call.
                  </h2>
                  <p className="mt-4 text-cream/80">
                    The fastest way to see if coaching is a fit. Bring a
                    question and leave with a clear next step.
                  </p>
                  <div className="mt-8">
                    <Button href={site.bookingHref} variant="primary">
                      Book a call
                      <span aria-hidden>→</span>
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal from="right" delay={0.2}>
                <div className="mt-8 rounded-2xl border border-line bg-cream p-8 md:p-10">
                  <div className="flex items-center gap-4">
                    <p className="eyebrow">Reach out directly</p>
                    <LineDraw
                      width={48}
                      height={1}
                      color="var(--color-terracotta)"
                    />
                  </div>
                  <ul className="mt-5 space-y-4 text-ink">
                    <li>
                      <a
                        href={`mailto:${site.email}`}
                        className="link-underline group flex items-center justify-between gap-4 border-b border-line pb-4"
                      >
                        <span>
                          <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted">
                            Email
                          </span>
                          <span className="mt-1 block text-lg">
                            {site.email}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="text-terracotta transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${site.phone.replace(/\s/g, "")}`}
                        className="link-underline group flex items-center justify-between gap-4 border-b border-line pb-4"
                      >
                        <span>
                          <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted">
                            Phone
                          </span>
                          <span className="mt-1 block text-lg">
                            {site.phone}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="text-terracotta transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </li>
                    <li>
                      <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted">
                        Based in
                      </span>
                      <span className="mt-1 block text-lg">
                        {site.location}
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal from="right" delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={site.socials.instagram} className="btn-secondary">
                    Instagram
                    <span aria-hidden>↗</span>
                  </a>
                  <a href={site.socials.facebook} className="btn-secondary">
                    Facebook
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-noise-cream panel-cream section has-pattern relative">
        <div className="container-editorial relative">
          <SectionHeading
            eyebrow="Quick answers"
            headline="Things people ask before reaching out."
            as="h2"
          />
          <div className="mt-12 max-w-3xl">
            {faqs.map((f, i) => (
              <Reveal
                as="div"
                key={f.q}
                delay={i * 0.06}
                from="up"
                amount={0.2}
              >
                <div className="border-b border-line py-6">
                  <h3 className="font-display text-xl text-ink md:text-2xl">
                    {f.q}
                  </h3>
                  <p className="body-lg mt-3 max-w-2xl text-pretty text-ink-soft">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
