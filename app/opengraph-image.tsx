import { ImageResponse } from "next/og";

export const alt = "Michael Jogoh — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STACK = ["TypeScript", "Node.js", "Python", "React", "Next.js"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#14141a",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(143,212,79,0.22), transparent 45%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "-0.05em",
          }}
        >
          <span>M</span>
          <span style={{ color: "#8fd44f" }}>_</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              color: "#8fd44f",
              fontFamily: "monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Full Stack Engineer
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Michael Jogoh
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: "#a1a1aa",
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            Building secure, scalable web apps. Based in Lagos, Nigeria.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {STACK.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 20px",
                border: "2px solid #2a2a35",
                fontSize: 24,
                fontFamily: "monospace",
                color: "#d4d4d8",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
