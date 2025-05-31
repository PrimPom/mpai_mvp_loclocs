import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HistoireDetails from '@/components/about/HistoireDetails.jsx';
import VisionSection from '@/components/about/VisionSection.jsx';
import HeroAbout from '@/components/about/HeroAbout.jsx';
import Team from '@/components/about/Team.jsx';

import FadeInWhenVisible from '@/components/common/FadeInWhenVisible';

export default function Home() {
  return (
    <>
      <Navbar />
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
      
      
      
     
      
      <Footer />
    
    </>
  );
}
