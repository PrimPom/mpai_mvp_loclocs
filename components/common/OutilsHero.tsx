import React from "react";
import Outil from "./Outil";

function OutilHero({ outilName }: { outilName: string }) {
  const outilsGifs: Record<string, string> = {
    "BudgetLoc™": "./../gifts/budgetloc.gif",
    "PreLoc™": "./../gifts/preloc.gif",
    "AssurLoc™": "./../gifts/assurloc.gif",
  };

  return (
    <div className="w-full relative min-h-100 md:min-h-150 flex justify-center items-center  overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src="./../home-for-sale.svg"
          alt="home-for-sale"
          className="h-full w-auto max-w-none object-contain "
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-12">
          <div className="flex-1 max-w-md md:max-w-lg">
            <Outil name={outilName} />
          </div>

          <div className="flex-shrink-0 flex justify-center md:justify-end">
            <img
              src={outilsGifs[outilName]}
              alt={outilName}
              className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutilHero;
/*
import React from "react";
import Outil from "./Outil";

function OutilHero({ outilName }: { outilName: string }) {
  const outilsGifs: Record<string, string> = {
    "BudgetLoc™": "./../gifts/budgetloc.gif",
    "PreLoc™": "./../gifts/preloc.gif",
    "AssurLoc™": "./../gifts/assurloc.gif",
  };
  return (
    <div className="w-full relative h-120 flex justify-center items-center  mb-20 bg-green-200">
      <img
        src="./../home-for-sale.svg"
        alt="home-for-sale"
        className=" h-fit scale-x-120"
      />
      <div className="absolute top-1/3 ">
        <div className="px-5 md:px-25 w-fill flex justify-between items-center">
          <Outil name={outilName} />
          <img
            src={outilsGifs[outilName]}
            alt={outilsGifs[outilName]}
            className="h-10 max-h-10 w-min object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default OutilHero;

*/
