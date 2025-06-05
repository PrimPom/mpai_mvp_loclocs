import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

function FAQSection({ name }: { name?: string }) {
  return (
    <div className=" w-full grid grid-cols-1 lg:grid-cols-2 items-start justify-center space-x-16">
      {/** Know more text */}
      <div className="flex flex-col space-y-10 ">
        <div className="flex flex-col items-start w-fit">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary">
            En savoir plus{" "}
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary">
            sur {name ?? "AssurLoc™"}
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-bold hover:no-underline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-bold hover:no-underline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              repellat dolorem nobis similique, numquam mollitia adipisci
              distinctio iure est et sapiente quis, sed quam, quod expedita!
              Esse modi ex sequi.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FAQSection;
