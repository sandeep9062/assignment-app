import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/data/mock";

export const runtime = "nodejs";
export const alt = `${BRAND.name}: handwritten work and practical files in ${BRAND.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Load the app's own fonts so the share card matches the site typography.
async function font(weight: number, file: string): Promise<Buffer> {
  const buf = await readFile(join(process.cwd(), "node_modules", "@fontsource", file, "files", `${file}-latin-${weight}-normal.woff`));
  return buf;
}

export default async function Image() {
  const [hind, kalam] = await Promise.all([
    font(700, "hind"),
    font(700, "kalam"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0F1B6B",
          backgroundImage: "radial-gradient(circle at 85% 15%, #1B2A9B 0%, #0F1B6B 60%)",
          padding: "72px 80px",
          fontFamily: "Hind",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="62" height="7" viewBox="0 0 62 7">
            <path d="M1 4.5C9 1.5 15 6 23 3.5S39 1.5 47 4s9 0 14-1.5" fill="none" stroke="#D93A4A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div style={{ fontFamily: "Kalam", fontSize: 44, fontWeight: 700 }}>{BRAND.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Kalam", fontSize: 82, fontWeight: 700, lineHeight: 1.05 }}>
            <span>Handwritten work,</span>
            <span>delivered in {BRAND.city}.</span>
          </div>
          <div style={{ fontSize: 34, color: "#C7CEEA", maxWidth: 900 }}>
            Fair copies, practical files, notes and presentations. See the handwriting first, pay safely.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#FFE14D" }}>
          <span>Fair copy</span>
          <span style={{ color: "#6f7bb5" }}>•</span>
          <span>Practical files</span>
          <span style={{ color: "#6f7bb5" }}>•</span>
          <span>Notes</span>
          <span style={{ color: "#6f7bb5" }}>•</span>
          <span>Printing &amp; binding</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Hind", data: hind, style: "normal", weight: 700 },
        { name: "Kalam", data: kalam, style: "normal", weight: 700 },
      ],
    }
  );
}
