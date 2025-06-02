"use client"
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
  
  
  export default function FAQSection() {
    return (
      <section className="py-16 px-6 md:px-20 bg-white text-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          {/* LEFT PART */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-semibold leading-tight text-primary">
              Questions <br />
              <span className="relative inline-block">
                fréquemment
                {/* Soulignement incurvé  */}
                <div className="h-5 w-28 mx-auto md:mx-0 md:ml-1 ">
                      <svg viewBox="0 0 100 10" className="w-full h-full text-primary">
                        <path
                          d="M 0 10 Q 50 0 100 10"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                  </div>
              </span>
              <br />
              <span className="text-foreground">posées</span>
            </h2>
            <p className="mt-4 text-sm">
              Vous avez encore besoin d’aide ?{" "}
              <Link href="/contact" className="text-primary underline">
                Contactez-nous
              </Link>
            </p>
          </div>
  
          {/* RIGHT PART */}
          <div className="w-full md:w-1/2">
            <Accordion type="single" collapsible className="space-y-3"  defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-muted px-4 py-3 rounded-md hover:no-underline">
                  <span className="font-medium text-left">
                    Lorem ipsum dolor sit amet consectetur. Faucibus hendrerit.
                  </span>
                </AccordionTrigger>
                <AccordionContent className="bg-muted px-4 pt-0 pb-3 rounded-md">
                  Lorem ipsum dolor sit amet consectetur. Nunc enim nibh elementum gravida
                  viverra tellus eget risus dapibus. Eget elementum duis egestas aliquam amet.
                </AccordionContent>
              </AccordionItem>
  
              {[2, 3, 4, 5].map((i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="hover:no-underline">
                    Lorem ipsum dolor sit amet consectetur. {
                      ["Auctor amet risus", "Arcu netus proin", "Nunc ultricies", "Sed neque eu"][i - 2]
                    }.
                  </AccordionTrigger>
                  <AccordionContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, expedita.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    )
  }
  