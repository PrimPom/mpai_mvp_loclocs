import { Check, Mail } from "lucide-react";
import Link from "next/link";
import ContactFormSection from "../common/FormSection";

function AssurLocForm() {
  return (
    <div className=" max-w-7xl mx-auto my-20 flex justify-center items-center">
      <div className="container grid grid-cols-1 justify-center items-start lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4 h-full ">
          <AssurLocSidebar />
        </div>
        {/* Main Content */}
        <div className="lg:col-span-8">
          <ContactFormSection subject="Demande de AssurLoc" isContact={false} />
        </div>
      </div>
    </div>
  );
}

export default AssurLocForm;

export function AssurLocSidebar() {
  return (
    <div className="bg-primary rounded-2xl px-6 text-white sticky top-6 py-42 md:px-12">
      <h1 className="text-2xl font-bold mb-4">AssurLoc™</h1>
      <div className="space-y-4 mb-6">
        <p className="text-blue-100">Une bonne assurance. Moins de stress.</p>
        <p className="text-blue-100">
          Votre propriétaire exige une assurance ? C’est normal.
        </p>
        <p className="text-blue-100">
          Mais trouver la bonne couverture au bon prix, c’est souvent un
          casse-tête.
        </p>
        <p className="text-blue-100">
          Avec AssurLoc™, Marcello Stephan — courtier certifié en assurance —
          s’en occupe pour vous, gratuitement.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Ce que vous gagnez :</h3>
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
          <span className="text-blue-100">
            Une assurance simple, adaptée à vos besoins
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
          <span className="text-blue-100">
            Un propriétaire automatiquement notifié lors de la prise ou
            l’annulation d’assurance{" "}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
          <span className="text-blue-100">
            Une preuve de sérieux dans votre dossier
          </span>
        </div>
      </div>

      <p className="my-2">👀 Et si vous êtes propriétaire ?</p>

      <div className="space-y-5 text-blue-100">
        <p>
          Vous recevez des dizaines de candidatures… mais difficile de faire le
          tri.
        </p>

        <div className="my-2">
          <p>
            LocLoc’s vous aide à repérer les locataires fiables dès le départ,
            sans tracas ni frais supplémentaires.
          </p>
          <p>AssurLoc™ vous permet de :</p>
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li>Éviter les enquêtes multiples</li>
          <li>Réduire les risques d’impayés</li>
          <li>Gagner du temps avec des dossiers solides et vérifiés</li>
        </ul>

        <p>
          Pour vos vérifications complémentaires (ex : antécédents TAL ou
          judiciaires), vous pouvez consulter gratuitement des bases officielles
          comme
          <Link
            target="blank"
            href={"www.soquij.qc.ca"}
            className="ml-1 underline"
          >
            ce service
          </Link>
          .
        </p>
      </div>

      <div className=" pt-6">
        <h3 className="font-semibold mb-3">QUESTION?</h3>
        <p className="text-sm text-blue-100 mb-4">
          Si vous avez encore des questions au sujet de votre ratio
          d'endettement, vous pouvez nous écrire à
        </p>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4" />
          <span>Nos contacts</span>
        </div>
        <p className="text-sm text-blue-100 mt-1">Nous sommes à votre écoute</p>
        <p className="text-sm font-medium mt-2">contact@loclocs.com</p>
      </div>
    </div>
  );
}
