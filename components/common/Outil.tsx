import React from "react";

function Outil({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-start space-y-3 md:space-y-5 w-full text-primary">
      <p className="text-xs md:text-sm font-medium tracking-wide">Nos outils</p>

      <div className="relative w-fit ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
          {name}
        </h1>

        <div className=" absolute -bottom-5 right-3 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[210px]">
          <svg
            viewBox="0 0 210 16"
            className="scale-50 sm:scale-75 md:scale-70 lg:scale-100"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M0.5 14.9594C50.2241 0.621553 139 -5.04063 209.5 9.4594"
              stroke="#62A8D5"
              fill="transparent"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Outil;

/*

import React from "react";

function Outil({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-start space-y-2 lg:space-y-5 w-min max-w-min bg-amber-300">
      <p className="text-xs md:text-sm font-medium text-primary">Nos outils</p>
      <h1 className="text-2xl sm:text-3xl md:text-7xl text-primary font-semibold">
        {name}
      </h1>
      <svg
        // xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 210 16"
        className="w-1/3 md:w-1/2 flex self-center font-medium fill-primary"
        // fill="none"
      >
        <path
          d="M0.5 14.9594C50.2241 0.621553 139 -5.04063 209.5 9.4594"
          stroke="#62A8D5"
          fill="transparent"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default Outil;

*/
