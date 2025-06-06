"use client";

import BudgetLocCalculator from "@/components/budgetLoc/calculator";
import FAQSection from "@/components/budgetLoc/FAQSection";
import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";
import OutilHero from "@/components/common/OutilsHero";

function BudgetLocPage() {
  return (
    <div className=" ">
      <FadeInWhenVisible delay={0.1}>
        <OutilHero outilName="BudgetLoc™" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <BudgetLocCalculator />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <FAQSection />
      </FadeInWhenVisible>
    </div>
  );
}

export default BudgetLocPage;
