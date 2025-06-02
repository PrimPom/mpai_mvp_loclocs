import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Histoire() {
  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Titre + soulignement */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-primary mb-4">Notre histoire</h2>
          {/* Soulignement incurvé  */}
          <div className="h-5 w-28 mx-auto md:mx-0 md:ml-1 relative left-4 md:left-24">
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

        {/* ParagrapheS + bouton */}
        <div className="text-foreground space-y-6">
          <p>
            En 2020, confronté à la surchauffe immobilière, j’ai acheté une maison trop chère sans mesurer l’ampleur des rénovations, ce qui m’a conduit à une revente à perte en 2024.
          </p>
          <p>
            En pleine urgence pour reloger ma famille, j’ai découvert à quel point il était difficile de trouver un logement, même avec un bon dossier.
            Face à la méfiance des propriétaires noyés sous les demandes, j’ai compris qu’il ne suffisait pas d’être solvable : il fallait savoir rassurer avant même la première visite.
          </p>
          <p>
            C’est de cette expérience qu’est née l’idée de créer une solution pour redonner du pouvoir aux locataires.
          </p>

          {/* Bouton */}
          <Link href="/about" className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-sky-600 transition">
            En savoir plus <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
