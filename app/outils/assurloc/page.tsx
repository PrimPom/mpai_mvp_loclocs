"use client";

import AssurLocForm from "@/components/assurloc/Form";
import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";
import OutilHero from "@/components/common/OutilsHero";
import FAQSection from "@/components/budgetLoc/FAQSection";
import React from "react";

function AssurLocPage() {
  return (
    <div className=" ">
      <FadeInWhenVisible delay={0.1}>
        <OutilHero outilName="AssurLoc™" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <AssurLocForm />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <FAQSection />
      </FadeInWhenVisible>
    </div>
  );
}

export default AssurLocPage;
