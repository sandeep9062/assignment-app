import type { Metadata } from "next";
import TopBar from "./TopBar";
import ChdHeader from "./ChdHeader";
import ChdHero from "./ChdHero";
import ChdSteps from "./ChdSteps";
import ChdColleges from "./ChdColleges";
import ChdServices from "./ChdServices";
import ChdPricing from "./ChdPricing";
import ChdNotes from "./ChdNotes";
import ChdAreas from "./ChdAreas";
import ChdReviews from "./ChdReviews";
import ChdFaq from "./ChdFaq";
import ChdCta from "./ChdCta";

export const metadata: Metadata = {
  title: "Assignments & Handwritten Notes in Chandigarh | PU, DAV, PEC, CU, IGNOU",
  description:
    "Handwritten assignments & notes in Chandigarh — PU, DAV Sec-10, MCM DAV 36, SD 32, PEC, UIET, CU, Chitkara, IGNOU Sec-9. PDF in 24-48 hrs + same-day Tricity delivery. Free sample on WhatsApp.",
};

export default function ChandigarhRoute() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-zinc-900">
      <TopBar />
      <ChdHeader />
      <main>
        <ChdHero />
        <ChdSteps />
        <ChdColleges />
        <ChdServices />
        <ChdPricing />
        <ChdNotes />
        <ChdAreas />
        <ChdReviews />
        <ChdFaq />
      </main>
      <ChdCta />
    </div>
  );
}
