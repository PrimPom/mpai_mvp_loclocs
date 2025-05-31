"use client";

import BudgetLocCalculator from "@/components/budgetLoc/calculator";
import FAQSection from "@/components/budgetLoc/FAQSection";
import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";
import React from "react";

function BudgetLocPage() {
  return (
    <div className=" ">
      <FadeInWhenVisible>
        <img
          src="./../budgetloc-hero.svg"
          alt="budgetloc-hero"
          className="mb-33"
        />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <BudgetLocCalculator />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <FAQSection />
      </FadeInWhenVisible>
    </div>
  );
}

export default BudgetLocPage;
