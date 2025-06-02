'use client';

import { ArrowRight } from 'lucide-react';
import Link from "next/link";

export default function ToolsSection() {
  const tools = [
    {
      id: "01",
      title: "BudgetLoc™",
      description:
        "Avant même de chercher un logement, la vraie question à se poser est : « Combien puis-je réellement me permettre de payer ? » C’est pour répondre à ce besoin essentiel qu’a été créée BudgetLoc™, une calculatrice financière simple et intuitive pensée spécialement pour les locataires.",
        lien:"/outils/budgetloc"
    },
    {
      id: "02",
      title: "PréLoc™",
      description:
        "Dans un marché locatif ultra concurrentiel, il ne suffit plus d’affirmer qu’on est un bon locataire. C’est ce constat qui a donné naissance à PréLoc™, un document officiel de préapprobation inspiré des pratiques hypothécaires, conçu pour renforcer la crédibilité des locataires dès le premier contact.",
        lien:"/outils/budgetloc"
    },
    {
      id: "03",
      title: "AssurLoc™",
      description:
        "Lorsque les propriétaires exigent une assurance, c’est compréhensible — mais trouver la bonne couverture au bon prix peut vite devenir une casse-tête. C’est pour simplifier cette étape stressante qu’a été créée AssurLoc™, un service gratuit où Marcello Stephan, courtier certifié, s’occupe de tout pour les locataires.",
        lien:"/outils/budgetloc"
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
     <div >
      <h2 className="text-3xl md:text-4xl font-semibold text-primary text-center md:text-end mb-14">
          Nos outils
        </h2>
       {/* Soulignement incurvé  */}
       <div className="h-5 w-28 mx-auto md:mx-0 md:ml-1 float-none md:float-end relative -top-12">
            <svg viewBox="0 0 100 10" className="w-full h-full text-primary">
              <path
                d="M 0 10 Q 50 0 100 10"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
        </div>
     </div>
      

      <div className="grid md:grid-cols-3 gap-10">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            className={`group relative  space-y-4 flex flex-col  gap-10 rounded-xl p-6 transition-all duration-300 border border-transparent hover:bg-primary hover:text-white ${
              index === 0 ? 'bg-primary text-white' : 'bg-transparent text-black hover:text-white'
            }`}
          >
            <span className=" text-5xl font-semibold text-end ">
              {tool.id}
            </span>
           <div>
              <h3 className={`text-2xl font-bold mb-3 `}>{tool.title}</h3>
                <p className="text-sm leading-relaxed mb-6">{tool.description}</p>

                <Link href={tool.lien} className="flex items-center gap-2 text-sm font-medium group-hover:underline">
                  Découvrir <ArrowRight className="w-4 h-4" />
                </Link>
           </div>
           
          </div>
        ))}
      </div>
    </section>
  );
}
