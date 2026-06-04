import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ina J Coaching — Coaching for pet photographers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #FAF5EC 0%, #F1E8D8 100%)",
        fontFamily: "Georgia, serif",
        color: "#2B1F17",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontSize: "20px",
          letterSpacing: "0.22em",
          color: "#CA5F3C",
          textTransform: "uppercase",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#CA5F3C",
            color: "#FAF5EC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
          }}
        >
          ij
        </div>
        <span>Ina J · Coaching</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 78,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            maxWidth: 920,
            fontWeight: 400,
          }}
        >
          Build a pet photography business that books consistently.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            lineHeight: 1.5,
            color: "#5A463A",
            maxWidth: 820,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Marketing and business coaching from an award-winning pet photographer
          and Sony Digital Imaging Advocate.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 18,
          color: "#7A6759",
          fontFamily: "Helvetica, Arial, sans-serif",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        <span>coaching.inajphotography.com</span>
        <span style={{ color: "#CA5F3C" }}>Ina J Photography</span>
      </div>
    </div>,
    { ...size },
  );
}
