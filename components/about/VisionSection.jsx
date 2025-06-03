// components/VisionSection.tsx

import Image from "next/image";
import { Check } from "lucide-react";


export default function VisionSection() {
  return (
    <section className="bg-primary py-12  px-6 md:px-16 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10  mx-auto">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="rounded-xl overflow-hidden ">
            <img
              src="/about/vision.png"
              alt="Vision"
              width={600}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-start ">Our Vision
            {/* Soulignement */}
          <div className="h-5 w-28 mx-auto md:mx-0 md:ml-1 ">
                      <svg viewBox="0 0 100 10" className="w-full h-full text-white">
                        <path
                          d="M 0 10 Q 50 0 100 10"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
            </div>
          </h2>
          <p className="mb-6 text-lg leading-relaxed">
            LociLocs est né de cette volonté : aider les locataires à mieux se présenter, à gagner en crédibilité et à inspirer confiance dès le départ. <br />
            Nos outils ont été pensés pour :
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Check className="text-white mt-1" />
              <span>Estimer votre capacité de paiement réelle</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-white mt-1" />
              <span>Obtenir une préapprobation locative officielle</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-white mt-1" />
              <span>Accéder à une assurance locataire simple, abordable, et parfaitement adaptée</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
