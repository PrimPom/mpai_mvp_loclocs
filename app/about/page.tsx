import HeroAbout from "@/components/about/HeroAbout.jsx";
import HistoireDetails from "@/components/about/HistoireDetails.jsx";
import Team from "@/components/about/Team.jsx";
import VisionSection from "@/components/about/VisionSection.jsx";

import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";

export default function Home() {
  return (
    <main className="space-y-4">
      <FadeInWhenVisible delay={0.1}>
        <HeroAbout />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <HistoireDetails />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <VisionSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.4}>
        <Team />
      </FadeInWhenVisible>
    </main>
  );
}
