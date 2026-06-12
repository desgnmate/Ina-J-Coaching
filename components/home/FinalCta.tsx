import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SplitText } from "@/components/shared/SplitText";
import { finalCta } from "@/lib/content";
import { images } from "@/lib/images";

export function FinalCta() {
  return (
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
          style={{ position: "absolute" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink/85"
          style={{ position: "absolute" }}
        />
      </div>

      <div className="container-editorial absolute inset-0 flex items-center">
        <Reveal className="mx-auto max-w-2xl text-center text-cream">
          <SplitText
            as="h2"
            className="display-2 text-balance text-cream"
            stagger={0.05}
          >
            {finalCta.headline}
          </SplitText>
          <p className="mt-6 text-pretty text-cream/85 md:text-lg">
            {finalCta.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={finalCta.cta.href} variant="primary">
              {finalCta.cta.label}
              <span aria-hidden>→</span>
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="border-cream bg-transparent text-cream hover:bg-transparent hover:text-cream"
            >
              Ask a question
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
