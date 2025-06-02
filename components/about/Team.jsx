"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Stephane Marcello",
    role: "CEO",
    image: "/about/stephane.jpg", // place cette image dans /public
  },
  {
    name: "Thomas Powell",
    role: "Marketing",
    image: "/about/thomas.jpg", // place cette image dans /public
  },
];

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Titre à gauche */}
          <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
            Notre équipe <br />
            <span className="relative inline-block">
               d'experts
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
            </span>{" "}
           
          </h2>
           
            <p className="mt-4 text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Cartes des membres */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className=" rounded-lg   text-center"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-auto  rounded-xl object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
