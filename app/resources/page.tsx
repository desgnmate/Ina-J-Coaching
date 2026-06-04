import type { Metadata } from "next";
import { Maintenance } from "@/components/shared/Maintenance";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free tools, podcast, and community for pet photographers who want clearer marketing, intentional content, and consistent bookings.",
};

export default function ResourcesPage() {
  return (
    <Maintenance
      pageName="resources"
      description="A new, curated library of marketing checklists, guides, and tools is currently in the works. We are redesigning this space to make it as actionable and valuable as possible."
    />
  );
}
