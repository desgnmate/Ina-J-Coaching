import type { Metadata } from "next";
import { Maintenance } from "@/components/shared/Maintenance";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ina J Coaching. Book a discovery call, send a written enquiry, or follow along on Instagram and Facebook.",
};

export default function ContactPage() {
  return (
    <Maintenance
      pageName="contact"
      description="Our contact form is undergoing a quick update. In the meantime, you can reach out directly via email at the address below, or book a free discovery call instantly."
    />
  );
}
