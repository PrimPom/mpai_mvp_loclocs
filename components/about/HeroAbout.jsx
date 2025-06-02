"use client";


export default function HeroAbout() {
  return (
    <section className="relative bg-cover bg-center w-full h-[80vh] flex flex-col items-center justify-center px-4 py-20" style={{ backgroundImage: "url('/about/about-image.jpg')" }}>
      {/* Titre principal */}
      <div className="text-center mb-32">
        <p className="text-sm text-primary">Notre Histoire, Notre mission, et notre équipe</p>
        <h1 className="text-4xl font-bold flex flex-col justify-center items-center text-primary mt-2">
          QUI SOMMES-NOUS
          {/* soulignement */}
          <div className="h-5 w-28 md:mx-0 md:ml-1 ">
                      <svg viewBox="0 0 100 10" className="w-full h-full text-primary">
                        <path
                          d="M 0 10 Q 50 0 100 10"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
            </div>
        </h1>
        
      </div>

     
    </section>
  );
}
