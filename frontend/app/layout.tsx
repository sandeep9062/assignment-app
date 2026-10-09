import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import ScrollReveal from "./components/ScrollReveal";
import BackToTop from "./components/BackToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StudySathi — Assignments & Handwritten Notes | IGNOU, DU, B.Tech & More",
  description:
    "Get plagiarism-free assignments and beautiful handwritten notes delivered fast. IGNOU, DU SOL, B.Tech, MBA, BCA, Class 11-12. WhatsApp us for instant quote.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {/* Enable scroll-reveal gating before paint to avoid any flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-reveal')`,
          }}
        />
        {children}
        <BackToTop />
        <ScrollReveal />
      </body>
    </html>
  );
}
