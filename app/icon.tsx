import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14141a",
          border: "2px solid #2a2a35",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: "-0.05em",
        }}
      >
        <span style={{ color: "#f4f4f5" }}>M</span>
        <span style={{ color: "#8fd44f" }}>_</span>
      </div>
    ),
    { ...size },
  );
}
