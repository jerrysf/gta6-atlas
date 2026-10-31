import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogCard(input: {
  kicker: string;
  kickerColor: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          background: "#0B0F14",
          color: "#F4F6F8",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(90deg, #B6F34A, #35C7D9)`,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#B6F34A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B0F14",
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            A
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2 }}>
            GTA6 <span style={{ color: "#B6F34A" }}>ATLAS</span>
          </span>
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: input.kickerColor,
            }}
          >
            {input.kicker}
          </span>
          <span
            style={{
              marginTop: 14,
              fontSize: input.title.length > 55 ? 46 : 60,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {input.title}
          </span>
          {input.subtitle && (
            <span
              style={{
                marginTop: 18,
                fontSize: 26,
                color: "#9AA6B2",
                lineHeight: 1.3,
              }}
            >
              {input.subtitle.length > 105
                ? `${input.subtitle.slice(0, 105).trimEnd()}…`
                : input.subtitle}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 36,
            paddingTop: 24,
            borderTop: "1px solid #273342",
            fontSize: 20,
            color: "#6B7885",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Independent fan guide</span>
          <span style={{ color: "#B6F34A" }}>November 19, 2026</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
