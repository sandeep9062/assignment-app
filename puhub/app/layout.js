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
import { BRAND } from "@/data/mock";

export const metadata = {
  title: `${BRAND.name}: handwritten work and practical files in ${BRAND.city}`,
  description: `${BRAND.tagline} ${BRAND.sub}`,
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#1B2A9B" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
