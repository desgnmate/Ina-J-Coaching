import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Ina J Education",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F3",
    theme_color: "#D46858",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
