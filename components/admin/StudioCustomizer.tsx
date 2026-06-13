"use client";

import { useEffect } from "react";

export function StudioCustomizer() {
  useEffect(() => {
    const applyStyles = () => {
      const style = document.createElement("style");
      style.id = "studio-custom-styles";
      style.textContent = `
        /* Hide Sanity Studio left navigation */
        [data-ui="Navbar"] {
          display: none !important;
        }

        /* Ensure studio fills viewport */
        [data-ui="StudioLayout"] {
          height: 100vh !important;
          max-height: 100vh !important;
        }

        /* Allow studio to scroll internally */
        [data-ui="Root"] {
          overflow: auto !important;
        }
      `;

      const existing = document.getElementById("studio-custom-styles");
      if (existing) existing.remove();
      document.head.appendChild(style);
    };

    applyStyles();
    const timer = setTimeout(applyStyles, 1000);

    return () => {
      clearTimeout(timer);
      const existing = document.getElementById("studio-custom-styles");
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
