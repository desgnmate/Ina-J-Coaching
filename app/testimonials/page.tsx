import type { Metadata } from "next";
import { Maintenance } from "@/components/shared/Maintenance";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Stories from pet photographers who have worked with Ina through coaching, mentoring, and the Pet Photographers Collective.",
};

export default function TestimonialsPage() {
  return (
    <Maintenance
      pageName="testimonials"
      description="Our success stories are being updated with new award-winning photographer case studies and detailed results. We are redesigning this page to highlight the journey and shifts of our community."
    />
  );
}
