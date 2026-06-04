import type { Metadata } from "next";
import { Maintenance } from "@/components/shared/Maintenance";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "The Pet Photography Business Coaching Experience — a complete coaching program for pet photographers who want clearer messaging, intentional marketing, and consistent bookings.",
};

export default function CoachingPage() {
  return (
    <Maintenance
      pageName="coaching"
      description="We are currently redesigning the coaching page to bring you a more refined and focused coaching experience. In the meantime, you can still book a direct discovery call to discuss your photography business goals."
    />
  );
}
