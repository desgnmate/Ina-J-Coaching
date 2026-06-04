import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Ina J Coaching",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF5EC",
    theme_color: "#CA5F3C",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
