import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Company Name — Software engineering, platform, and security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default OG image for every route that doesn't define its own. Generated
 * at request time via next/og rather than a static asset — no design file
 * to keep in sync, and it automatically follows the same accent color as
 * the rest of the site if that token ever changes.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0a0a0a",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 32,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          <span>Company</span>
          <span style={{ color: "#6366f1" }}>.</span>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, maxWidth: 900, lineHeight: 1.15 }}>
          Software engineering, platform, and security for ambitious teams
        </div>
      </div>
    ),
    { ...size }
  );
}
