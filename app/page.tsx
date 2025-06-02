import Avis from "@/components/home/Avis";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/HeroSection";
import Histoire from "@/components/home/Histoire";
import ToolsSection from "@/components/home/ToolsSection";

import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";

export default function Home() {
  return (
    <main className=" space-y-4">
      <FadeInWhenVisible>
        <HeroSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <Histoire />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <ToolsSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <FAQSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.4}>
        <Avis />
      </FadeInWhenVisible>
    </main>
  );
}
