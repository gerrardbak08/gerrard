import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top left, #7c3aed 0%, #1f1147 45%, #06030f 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "92%",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: "999px",
              fontSize: 28,
              padding: "10px 24px",
              color: "#d8b4fe",
            }}
          >
            Microsoft Teams 링크 미리보기 지원
          </div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.03 }}>
            Dosomae Safety
          </div>
          <div
            style={{
              fontSize: 40,
              lineHeight: 1.35,
              color: "#d4d4d8",
            }}
          >
            Open Graph 메타 태그와 1200x630 PNG 썸네일을 제공합니다.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
