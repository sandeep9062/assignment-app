import { BRAND } from "@/data/mock";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name}: handwritten work and practical files in ${BRAND.city}`,
    short_name: BRAND.name,
    description: `${BRAND.tagline} ${BRAND.sub}`,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1B2A9B",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
