import { BRAND } from "@/data/mock";

const SITE = `https://${BRAND.domain}`;

// Public pages are indexable; private, auth-gated and API routes are not.
const DISALLOW = ["/api/", "/account", "/admin", "/login", "/post-job", "/become-seller"];

export default function robots() {
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
