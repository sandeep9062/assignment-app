import { BRAND } from "@/data/mock";
import type { MetadataRoute } from "next";

const SITE = `https://${BRAND.domain}`;

// Public pages are indexable; private, auth-gated and API routes are not.
const DISALLOW = ["/api/", "/account", "/admin", "/login", "/post-job", "/become-seller"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
