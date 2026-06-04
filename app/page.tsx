import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { LeadMagnet } from "@/components/home/LeadMagnet";
import { Offer } from "@/components/home/Offer";
import { Outcomes } from "@/components/home/Outcomes";
import { Pillars } from "@/components/home/Pillars";
import { Problem } from "@/components/home/Problem";
import { Testimonials } from "@/components/home/Testimonials";
import { WhoFor } from "@/components/home/WhoFor";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Pillars />
      <Offer />
      <WhoFor />
      <Outcomes />
      <Testimonials />
      <LeadMagnet />
      <FinalCta />
    </>
  );
}
