import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Autosa | AI-Powered Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoData = readFileSync(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Ambient glow behind logo */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(200,144,90,0.12)",
            top: 65,
            left: 350,
            display: "flex",
            filter: "blur(80px)",
          }}
        />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={96}
          height={96}
          alt="Autosa"
          style={{ objectFit: "contain" }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-3px",
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          AUTOSA
        </div>

        {/* Divider */}
        <div
          style={{
            width: 48,
            height: 3,
            background: "#c8905a",
            borderRadius: 4,
            marginTop: 24,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.45)",
            marginTop: 20,
            letterSpacing: "0.04em",
          }}
        >
          AI-Powered Solutions
        </div>

        {/* Service pills */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 36,
          }}
        >
          {["Nova", "Solvo", "Yard"].map((s) => (
            <div
              key={s}
              style={{
                padding: "9px 28px",
                border: "1px solid rgba(200,144,90,0.35)",
                borderRadius: 40,
                color: "#c8a070",
                fontSize: 20,
                display: "flex",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
