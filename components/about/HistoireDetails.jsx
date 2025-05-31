"use client"
import Image from "next/image";

export default function HistoireDetails() {
  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
        {/* Colonne gauche - Intro + texteee */}
        <div className="space-y-6 md:col-span-1">
          <div>
            <h4 className="text-sm uppercase tracking-wide text-primary font-semibold">
              Notre histoire
              {/* soulignement*/}
              <div className="h-5 w-28  md:mx-0 md:ml-1  ">
                      <svg viewBox="0 0 100 10" className="w-full h-full text-primary">
                        <path
                          d="M 0 10 Q 50 0 100 10"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                </div>
            </h4>
            <h2 className="text-3xl font-bold text-primary leading-snug mt-2">
              Une leçon vécue,
              <br />
              un besoin devenu
              <br />
              solution
            </h2>
          </div>
          <p className="text-secondary-foreground">
            En 2020, je me suis retrouvé pris au piège de la surchauffe
            immobilière. Comme beaucoup de familles, j’ai acheté une maison trop
            chère, en sous-estimant complètement l’ampleur et le coût des
            rénovations.
          </p>
          <p className="text-secondary-foreground">
            Pendant quatre longues années, les défis se sont accumulés...
            jusqu’à ce qu’en 2024, je doive vendre à perte. Les nouveaux
            acheteurs me laissent trois semaines pour quitter les lieux.
          </p>
          <p className="text-secondary-foreground">
            En panique, je cherche d’urgence un appartement pour ma conjointe,
            nos trois jeunes enfants… et moi.
          </p>
        </div>

        {/* Colonne centrale - Image */}
        <div className="md:col-span-1">
          <Image
            src="/about/famille.png" // Assure-toi d’avoir cette image dans `/public`
            alt="Famille devant ordinateur"
            width={500}
            height={600}
            className="rounded-3xl w-full h-auto object-cover shadow-md"
          />
        </div>

        {/* Colonne droite - Texte complémentaire */}
        <div className="space-y-6 md:col-span-1 text-secondary-foreground">
          <div>
            <h3 className="text-primary font-semibold text-lg mb-2">
              Une réalité trop fréquente
            </h3>
            <p>
              Mais ce qui aurait dû être simple s’est vite transformé en
              parcours du combattant.
            </p>
            <p>
              Chaque logement visité attirait des dizaines de candidats. Les
              propriétaires, submergés de demandes, devenaient méfiants. Et dans
              le doute, ils suivaient leur instinct. Résultat ?
            </p>
            <p>
              Malgré un bon revenu et un dossier sérieux, je me retrouvais mis
              de côté sans même pouvoir me présenter. C’est dans ce climat tendu
              qu’une question m’a frappé :
            </p>
          </div>

          {/* Citation finale */}
          <blockquote className="text-primary font-semibold italic  pl-4 text-lg">
            “Comment rassurer un propriétaire, avant même la première visite ?”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
