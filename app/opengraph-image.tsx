import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 55%, #10b981 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.10)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {siteConfig.shortName}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            color: "rgba(255,255,255,0.88)",
            maxWidth: 800,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
