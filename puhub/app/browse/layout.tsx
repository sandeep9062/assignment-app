import { BRAND } from "@/data/mock";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const SITE = `https://${BRAND.domain}`;

export const metadata: Metadata = {
  title: "Browse sellers",
  description: `Browse student sellers in ${BRAND.city} for fair copies, practical files, notes, projects, presentations, typing and printing. Compare handwriting samples, prices and ratings.`,
  alternates: { canonical: "/browse" },
  openGraph: {
    title: `Browse sellers | ${BRAND.name}`,
    description: `Browse student sellers in ${BRAND.city} for fair copies, practical files, notes and more. Compare handwriting samples, prices and ratings.`,
    url: `${SITE}/browse`,
    type: "website",
  },
};

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return children;
}
