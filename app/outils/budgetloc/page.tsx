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

      <div className="container w-full max-w-7xl mx-auto flex flex-col items-center">
        <FadeInWhenVisible delay={0.2}>
          <BudgetLocCalculator />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.3}>
          <FAQSection />
        </FadeInWhenVisible>
      </div>
    </div>
  );
}

export default BudgetLocPage;
