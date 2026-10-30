import { ImageResponse } from "next/og";

export const alt = "GTA6 Atlas — The Ultimate GTA 6 Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0B0F14",
          color: "#F4F6F8",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 64,
            fontWeight: 800,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#B6F34A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B0F14",
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            A
          </div>
          GTA6 <span style={{ color: "#B6F34A" }}>Atlas</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#9AA6B2",
            lineHeight: 1.4,
          }}
        >
          The Ultimate GTA 6 Guide, Interactive Map &amp; Game Database
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#35C7D9",
          }}
        >
          Walkthroughs · Interactive Map · Completion Tracker · Database
        </div>
      </div>
    ),
    size,
  );
}
