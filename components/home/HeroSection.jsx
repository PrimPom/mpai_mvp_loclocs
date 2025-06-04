"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [selected, setSelected] = useState("budgetloc");

  const tools = {
    budgetloc: {
      label: "BudgetLoc™",
      link: "/outils/budgetloc",
      icon:"/wallet.png",
      button:"Essayez maintenant !"
    },
    preloc: {
      label: "PréLoc™",
      link: "/outils/preloc",
      icon:"/contrat.png",
      button:"Lancer une demande"
    },
    assurloc: {
      label: "AssurLoc™",
      link: "/outils/assurloc",
      icon:"/assuc.png",
      button:"Faire une demande"
    },
  };
  return (
    <section className="relative w-full px-4 md:px-0 py-20 md:py-30">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-t-[30px] ">
        {/* Background image */}
        <img
          src="/hero2.png"
          alt="Maison moderne"
          width={1600}
          height={900}
          className="w-full h-[90vh] object-cover"
          
        />

        {/* contenus */}
        <div className="absolute inset-0 flex flex-col justify-between md:justify-start">
          {/* Text top-left */}
          <div className="px-6 md:px-16 pt-12 md:pt-16 text-white max-w-5xl space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Prenez le contrôle de votre parcours locatif avec LocLoc’s
            </h1>
            <p className="text-base md:text-lg font-light">
              Une histoire de locataire à locataire
            </p>
          </div>

          {/* Glass box  */}
          <div className="flex justify-end px-6 md:px-16 pb-10 md:pb-16 pt-4">
            <div className="bg-white/20 backdrop-blur-[24px] border border-white text-white shadow-xl rounded-[40px] p-6 md:p-8 w-full max-w-sm space-y-8">
              <h3 className="text-xl font-semibold">
                Trouvez des informations sûr !
              </h3>

              <div>
                {/* Boutons de sélection */}
                <div className="flex flex-wrap gap-3 text-sm font-medium text-white">
                  {Object.entries(tools).map(([key, { label }]) => (
                    <button
                      key={key}
                      className={`px-3 py-1.5 rounded-full transition border ${
                        selected === key
                          ? "bg-white text-primary border-white"
                          : "bg-transparent border-white/30 hover:bg-white/10"
                      }`}
                      onClick={() => setSelected(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* CTA dynamique */}
                <Link href={tools[selected].link}>
                  <button className="flex items-center justify-center cursor-pointer gap-2 mt-3 w-full py-2 bg-primary  transition text-white font-semibold rounded-full text-lg">
                    {tools[selected].button}{" "}
                    <img className="w-6 h-6 " src={tools[selected].icon} alt="icon" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
