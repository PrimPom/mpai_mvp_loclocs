"use client";

import AssurLocForm from "@/components/assurloc/Form";
import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";
import OutilHero from "@/components/common/OutilsHero";
import FAQSection from "@/components/assurloc/FAQSection";
import React from "react";

function AssurLocPage() {
  return (
    <div className=" ">
      <FadeInWhenVisible delay={0.1}>
        <OutilHero outilName="AssurLoc™" />
      </FadeInWhenVisible>

      <div className="container w-full max-w-7xl mx-auto flex flex-col items-center">
        <FadeInWhenVisible delay={0.2}>
          <AssurLocForm />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.3}>
          <FAQSection />
        </FadeInWhenVisible>
      </div>
    </div>
  );
}

export default AssurLocPage;
