'use client';

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full px-4 md:px-0 py-20 md:py-30">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-t-[30px] ">
        {/* Background image */}
        <Image
          src="/hero2.png"
          alt="Maison moderne"
          width={1600}
          height={900}
          className="w-full h-[90vh] object-cover"
          priority
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
          <div className="flex justify-end px-6 md:px-16 pb-10 md:pb-16 pt-4 ">
            <div className="bg-white/20 backdrop-blur-[24px] border border-white text-white shadow-xl  rounded-[40px] p-6 md:p-8 w-full max-w-sm space-y-8">
              <h3 className="text-xl font-semibold">Trouvez des informations sûr !</h3>
             <div>
             
              <div className="flex flex-wrap gap-3 text-sm font-medium text-white">
                <button className="px-2 py-1.5 transition">
                   BudgetLoc™
                </button>
                <button className="px-2 py-1.5 transition">
                   PréLoc™
                </button>
                <button className="px-2 py-1.5 transition">
                  AssurLoc™
                </button>
              </div>

              {/* CTA button */}
              <button className="flex items-center justify-center cursor-pointer gap-2 mt-3 w-full py-2 bg-primary hover:bg-sky-600 transition text-white font-semibold rounded-full text-sm">
                 Essayer maintenant <img src="/wallet.png" />
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
