"use client";

import FAQSection from "@/components/assurloc/FAQSection";
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

      <div className="container w-full max-w-7xl mx-auto flex flex-col items-center">
        <FadeInWhenVisible delay={0.2}>
          <PreLocForm />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.3}>
          <FAQSection name="PreLoc™" />
        </FadeInWhenVisible>
      </div>
    </div>
  );
}

export default PreLocPage;
