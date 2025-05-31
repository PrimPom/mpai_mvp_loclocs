"use client";

import BudgetLocCalculator from "@/components/budgetLoc/calculator";
import FAQSection from "@/components/budgetLoc/FAQSection";
import React from "react";

function BudgetLocPage() {
  return (
    <div className=" ">
      <img
        src="./../budgetloc-hero.svg"
        alt="budgetloc-hero"
        className="mb-33"
      />
      <BudgetLocCalculator />

      <FAQSection />
    </div>
  );
}

export default BudgetLocPage;
