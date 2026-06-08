import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#14141a",
          border: "4px solid #2a2a35",
          fontFamily: "monospace",
          fontWeight: 700,
          gap: 4,
        }}
      >
        <div style={{ display: "flex", fontSize: 72, letterSpacing: "-0.05em" }}>
          <span style={{ color: "#f4f4f5" }}>M</span>
          <span style={{ color: "#8fd44f" }}>_</span>
          <span style={{ color: "#f4f4f5" }}>J</span>
        </div>
        <div
          style={{
            width: 48,
            height: 4,
            background: "#8fd44f",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
