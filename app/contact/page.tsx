"use client";

import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";
import ContactDetailsSection from "@/components/contact/ContactDetailsSection";
import ContactFormSection from "@/components/common/FormSection";
import ContactHeroSection from "@/components/contact/HeroSection";

function ContactPage() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto items-center">
      <FadeInWhenVisible delay={0.1}>
        <ContactHeroSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <ContactDetailsSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <ContactFormSection subject="Contact" />
      </FadeInWhenVisible>
    </div>
  );
}

export default ContactPage;
