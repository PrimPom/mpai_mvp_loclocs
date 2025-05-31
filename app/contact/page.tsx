"use client";

import FadeInWhenVisible from "@/components/common/FadeInWhenVisible";
import ContactDetailsSection from "@/components/contact/ContactDetailsSection";
import ContactFormSection from "@/components/contact/FormSection";
import ContactHeroSection from "@/components/contact/HeroSection";
import { useToast } from "@/hooks/useToast";
import { ContactFormValues } from "@/lib/types/contact.type";
import emailjs from "@emailjs/browser";
import React, { useState } from "react";

function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitForm = (values: ContactFormValues) => {
    setIsSubmitting(true);

    // EmailJS configuration
    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY ?? "";

    // Prepare template parameters
    const templateParams = {
      name: values.name,
      firstname: values.firstname,
      email: values.email,

      message: values.message,
    };

    // Send email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        setIsSubmitting(false);
        setIsSuccess(true);
        toast({
          title: "Email envoyé avec succès",
          description: "Nous vous contacterons dans les plus brefs délais.",
        });
      })
      .catch((error) => {
        console.error("Erreur d'envoie d'email:", error.message);
        setIsSubmitting(false);
        toast({
          title: "Erreur",
          description: "Erreur d'envoie d'email",
          variant: "destructive",
        });
      });
  };

  const resetForm = () => {
    setIsSuccess(false);
  };
  return (
    <div className="flex flex-col max-w-7xl mx-auto items-center">
      <FadeInWhenVisible>
        <ContactHeroSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <ContactDetailsSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <ContactFormSection
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
          onSubmit={handleSubmitForm}
          onReset={resetForm}
        />
      </FadeInWhenVisible>
    </div>
  );
}

export default ContactPage;
