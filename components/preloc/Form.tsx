import { Check, Mail } from "lucide-react";
import ContactFormSection from "../common/FormSection";

function PreLocForm() {
  return (
    <div className=" max-w-7xl mx-auto my-20 flex justify-center items-center">
      <div className="container grid grid-cols-1 justify-center items-start lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4 h-full ">
          <PreLocSidebar />
        </div>
        {/* Main Content */}
        <div className="lg:col-span-8">
          <ContactFormSection subject="Demande de PreLoc" isContact={false} />
        </div>
      </div>
    </div>
  );
}

export default PreLocForm;

export function PreLocSidebar() {
  return (
    <div className="bg-primary rounded-2xl px-6 text-white sticky top-6 py-42 md:px-12">
      <h1 className="text-2xl font-bold mb-4">PreLoc™</h1>
      <div className="space-y-4 mb-6">
        <p className="text-blue-100">
          La préapprobation locataire qui change la donne.
        </p>
        <p className="text-blue-100">
          Dans un marché concurrentiel, il ne suffit plus de dire qu’on est un
          bon locataire.
        </p>
        <p className="text-blue-100">
          Il faut le prouver, rapidement et clairement.
        </p>
        <p className="text-blue-100">
          C’est pourquoi nous avons créé PréLoc™, un document officiel de
          préapprobation inspiré des pratiques hypothécaires.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-3">PréLoc™, c’est :</h3>
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
          <span className="text-blue-100">
            Une cote de crédit supérieure à 650 (Equifax)
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
          <span className="text-blue-100">
            Une évaluation réelle de votre capacité à payer le loyer (revenus et
            dettes)
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
          <span className="text-blue-100">
            Un document émis par Marcello Stephan, courtier hypothécaire
            certifié
          </span>
        </div>
      </div>

      <div className="space-y-5 text-blue-100">
        <p>
          Vous pouvez choisir d'afficher votre score exact… ou simplement
          indiquer qu'il dépasse le seuil de confiance
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>🛡️ Vous rassurez le propriétaire avant même la visite</li>
          <li>🚀 Vous vous démarquez face aux autres candidats</li>
          <li>📄 Vous réduisez les vérifications coûteuses et répétitives</li>
        </ul>

        <p>Vous créez un climat de confiance dès le premier contact</p>
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
