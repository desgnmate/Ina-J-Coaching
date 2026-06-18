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
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },

  // Cache static video assets for a moderate window so subsequent visits
  // are instant, BUT force the browser/CDN to revalidate when the file
  // changes. The previous `max-age=31536000, immutable` setting was too
  // aggressive — when a video file was replaced (e.g. 55MB → 30MB), the
  // browser kept using the cached old bytes even though the server was
  // serving new ones, causing a metadata/desync that broke autoplay.
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            // public          → can be stored by the browser and any CDN
            // max-age=86400   → reuse cached bytes for 24h on repeat visits
            // must-revalidate → when the 24h is up, re-check with the server
            //                   (server returns 304 if unchanged, new bytes if changed)
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default config;
