import HomeTop from "./home/HomeTop";
import HomeHeader from "./home/HomeHeader";
import HomeHero from "./home/HomeHero";
import HomeSteps from "./home/HomeSteps";
import HomeServices from "./home/HomeServices";
import HomeNotes from "./home/HomeNotes";
import HomePricing from "./home/HomePricing";
import HomeProof from "./home/HomeProof";
import HomeFaq from "./home/HomeFaq";
import HomeCta from "./home/HomeCta";

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <HomeTop />
      <HomeHeader />
      <main>
        <HomeHero />
        <HomeSteps />
        <HomeServices />
        <HomeNotes />
        <HomePricing />
        <HomeProof />
        <HomeFaq />
      </main>
      <HomeCta />
    </div>
  );
}

