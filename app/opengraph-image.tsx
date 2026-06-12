import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ina J Education — Business coaching for pet photographers";
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
        background: "linear-gradient(135deg, #FFF8F3 0%, #EFDFD6 100%)",
        fontFamily: "Georgia, serif",
        color: "#44353D",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontSize: "20px",
          letterSpacing: "0.22em",
          color: "#B08180",
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
            background: "#D46858",
            color: "#FFF8F3",
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
        <span>Ina J Education</span>
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
          Business coaching for pet photographers still in the work.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            lineHeight: 1.5,
            color: "#715860",
            maxWidth: 820,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Practical guidance for photographers who want clearer positioning,
          steadier bookings, and a business that feels simpler to run.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 18,
          color: "#B08180",
          fontFamily: "Helvetica, Arial, sans-serif",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        <span>inajeducation.com</span>
        <span style={{ color: "#D46858" }}>Ina J Education</span>
      </div>
    </div>,
    { ...size },
  );
}
