import "@fontsource/kalam/400.css";
import "@fontsource/kalam/700.css";
import "@fontsource/hind/400.css";
import "@fontsource/hind/500.css";
import "@fontsource/hind/600.css";
import "@fontsource/hind/700.css";
import "@fontsource/caveat/500.css";
import "@fontsource/patrick-hand/400.css";
import "@fontsource/shadows-into-light/400.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toaster";
import { BRAND } from "@/data/mock";

const SITE = `https://${BRAND.domain}`;

const description = `${BRAND.tagline} Hire students in ${BRAND.city} for fair copies, practical files, notes, projects, presentations, typing and printing. See the handwriting sample first, pay safely, get it at your door.`;

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${BRAND.name}: handwritten work and practical files in ${BRAND.city}`,
    template: `%s | ${BRAND.name}`,
  },
  description,
  applicationName: BRAND.name,
  keywords: [
    "handwritten assignment",
    "practical file",
    "lab file",
    "fair copy",
    "notes",
    `${BRAND.city}`,
    "Panjab University",
    "student marketplace",
    "printing and binding",
    BRAND.name,
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "Education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: "en_IN",
    url: SITE,
    title: `${BRAND.name}: handwritten work and practical files in ${BRAND.city}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name}: handwritten work and practical files in ${BRAND.city}`,
    description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#1B2A9B" };

// Site-wide structured data: the organisation plus an internal site-search box.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: SITE,
  logo: `${SITE}/icon.svg`,
  slogan: BRAND.tagline,
  description,
  areaServed: { "@type": "City", name: BRAND.city },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND.name,
  url: SITE,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/browse?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

