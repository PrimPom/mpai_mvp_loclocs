import { Instagram, Mail, Phone, Send } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-muted text-foreground px-6 md:px-20 pt-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Gauche */}
        <div className="space-y-4">
          <h2 className="text-primary font-bold text-xl">LOCLOC'S</h2>
          <p>
            Chez LocLoc’s, nous croyons que chaque locataire mérite de louer en toute confiance, d’être informé et protégé
          </p>
          <Link href='/contact' className="mt-4 px-5 py-2 bg-primary text-white rounded-full hover:bg-sky-700 transition">
            Contactez-nous
          </Link>
        </div>

        {/* Droite */}
        <div className="rounded-tl-[60px] border-t border-l border-sky-200 pl-8 pt-6 pb-2 flex flex-col justify-between">
          {/* Contact */}
          <div className="mb-4">
            <p className="text-xs text-sky-600 uppercase font-semibold mb-1">Contact</p>
            <p className="font-medium">+1 (323) 275-1718</p>
            <p className="font-semibold">contact@loclocs.com</p>
          </div>

          {/* Réseaux sociaux */}
          <div className="mb-6">
            <p className="text-xs text-sky-600 uppercase font-semibold mb-2">Suivez-nous</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full border border-sky-200 hover:bg-sky-100 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-sky-200 hover:bg-sky-100 transition">
                <Mail size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-sky-200 hover:bg-sky-100 transition">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Bas */}
          <div className="text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t pt-4 border-gray-200">
            <p>© 2024 — Copyright | Tous droits réservés.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">CGV</a>
              <a href="#" className="hover:underline">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
