import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.photobiz.com",
        pathname: "/**",
      },
    ],
  },

  // Cache static video assets aggressively — browser downloads once, plays from disk on every reload.
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            // public      → can be stored by the browser (and CDN if you add one later)
            // max-age     → keep for 1 year (seconds)
            // immutable   → browser skips the conditional revalidation request entirely
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default config;
