import type { Metadata } from "next";
import PodcastExplorer from "@/components/podcast/PodcastExplorer";

export const metadata: Metadata = {
  title: "The Pet Photographers' Journal — Ina J Education",
  description:
    "A business podcast for pet photographers who want clearer positioning, stronger marketing, and more consistent bookings, from a photographer who is still actively in the business.",
  openGraph: {
    title: "The Pet Photographers' Journal — Ina J Education",
    description:
      "A business podcast for pet photographers who want clearer positioning, stronger marketing, and more consistent bookings, from a photographer who is still actively in the business.",
    type: "website",
  },
};

export default function PodcastPage() {
  return <PodcastExplorer />;
}
