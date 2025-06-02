"use client";

import FAQSection from "@/components/budgetLoc/FAQSection";
import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";
import OutilHero from "@/components/common/OutilsHero";
import PreLocForm from "@/components/preloc/Form";
import React from "react";

function PreLocPage() {
  return (
    <div className=" ">
      <FadeInWhenVisible delay={0.1}>
        <OutilHero outilName="PreLoc™" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <PreLocForm />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <FAQSection />
      </FadeInWhenVisible>
    </div>
  );
}

export default PreLocPage;
