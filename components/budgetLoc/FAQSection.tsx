import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQSection() {
  return (
    <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-start space-x-16">
      {/** Know more text */}
      <div className="flex flex-col space-y-10 ">
        <div className="flex flex-col items-start w-fit">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary">
            En savoir plus{" "}
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary">
            sur BudgetLoc™
          </h2>
          <img
            src={`./../contactez-nous-underline.svg`}
            alt="contactez-nous-underline"
            className="scale-50 sm:scale-65 md:scale-90 xl:scale-100 mt-5 self-end"
          />
        </div>

        <div className=" sm:flex space-y-1 sm:space-x-2 md">
          <p className="text-sm">Vous avez encore besoin d'aide ?</p>
          <Link href={"/contact"} className="text-sm text-primary font-bold">
            Contactez-nous
          </Link>
        </div>
      </div>
      {/** Know more FAQ */}
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-bold hover:no-underline">
            Pourquoi calculer son ratio d'endettement?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Le ratio d'endettement est un nombre qui est calculé en divisant
              vos paiements sur vos dettes et obligations financières par votre
              revenu total. Ce nombre est exprimé en pourcentage.
            </p>
            <p>
              Plus votre ratio est élevé, plus votre dette est importante par
              rapport à votre revenu. Il est important de tenir compte de cette
              information avant de décider de contracter ou non des dettes
              supplémentaires.
            </p>
            <p>
              Calculez régulièrement votre ratio d'endettement pour vous assurer
              que vous gérez vos finances de façon responsable. Si votre ratio
              est élevé, cela peut être un signe que vous devez apporter des
              changements afin de réduire vos dettes.
            </p>
            <p>
              D'autre part, un ratio faible pourrait indiquer que vous êtes en
              bonne position pour contracter des dettes supplémentaires si
              nécessaire.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-bold hover:no-underline">
            Comment le ratio d'endettement est-il calculé?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Le ratio d'endettement est un nombre qui est calculé en divisant
              vos paiements sur vos dettes et obligations financières par votre
              revenu total. Ce nombre est exprimé en pourcentage.
            </p>
            <p>
              Plus votre ratio est élevé, plus votre dette est importante par
              rapport à votre revenu. Il est important de tenir compte de cette
              information avant de décider de contracter ou non des dettes
              supplémentaires.
            </p>
            <p>
              Calculez régulièrement votre ratio d'endettement pour vous assurer
              que vous gérez vos finances de façon responsable. Si votre ratio
              est élevé, cela peut être un signe que vous devez apporter des
              changements afin de réduire vos dettes.
            </p>
            <p>
              D'autre part, un ratio faible pourrait indiquer que vous êtes en
              bonne position pour contracter des dettes supplémentaires si
              nécessaire.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-bold hover:no-underline">
            Quelle est la différence entre la cote de crédit et le ratio
            d'endettement?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Le ratio d'endettement est un nombre qui est calculé en divisant
              vos paiements sur vos dettes et obligations financières par votre
              revenu total. Ce nombre est exprimé en pourcentage.
            </p>
            <p>
              Plus votre ratio est élevé, plus votre dette est importante par
              rapport à votre revenu. Il est important de tenir compte de cette
              information avant de décider de contracter ou non des dettes
              supplémentaires.
            </p>
            <p>
              Calculez régulièrement votre ratio d'endettement pour vous assurer
              que vous gérez vos finances de façon responsable. Si votre ratio
              est élevé, cela peut être un signe que vous devez apporter des
              changements afin de réduire vos dettes.
            </p>
            <p>
              D'autre part, un ratio faible pourrait indiquer que vous êtes en
              bonne position pour contracter des dettes supplémentaires si
              nécessaire.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FAQSection;
