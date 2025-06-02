import z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  firstname: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.object({
    countryCode: z.string().min(1, "Le code pays est requis"),
    phoneNumber: z
      .string()
      .min(1, "Le numéro de téléphone est requis")
      .refine(
        (val) => val.replace(/[^\d]/g, "").length >= 8,
        "Le numéro doit contenir au moins 8 chiffres"
      ),
  }),

  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),

  agreesToConfidentialityPolicy: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
