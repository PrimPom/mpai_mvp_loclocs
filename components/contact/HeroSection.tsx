import React from "react";

function ContactHeroSection() {
  return (
    <section className=" container flex flex-col mt-30 md:mt-45 items-center space-y-5 ">
      <p className="text-sm text-primary">
        Toujours à votre écoute pour vous aidez !
      </p>
      <h1 className=" text-3xl sm:text-4xl md:text-6xl text-primary font-semibold">
        CONTACTEZ-NOUS
      </h1>
      <img
        src="contactez-nous-underline.svg"
        alt="contactez-nous-underline"
        className=" scale-40 sm:scale-75 md:scale-100"
      />
    </section>
  );
}

export default ContactHeroSection;
