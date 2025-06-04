import { useToast } from "@/hooks/useToast";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CountryCodeSelector, PhoneNumberInput } from "../ui/PhoneInput";
import { Textarea } from "../ui/textarea";
import { ContactFormValues } from "@/lib/types/contact.type";
import { contactFormSchema } from "@/lib/schemas/contact.schema";

function ContactFormSection({
  subject,
  isContact = true,
}: {
  subject: string;
  isContact?: boolean;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(values: ContactFormValues) {
    try {
      setIsSubmitting(true);

      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID ?? "";
      const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID ?? "";
      const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY ?? "";

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Check your environment variables."
        );
      }

      const templateParams = {
        subject: subject,
        name: values.name,
        firstname: values.firstname,
        email: values.email,
        phone: `+${values.phone.countryCode} ${values.phone.phoneNumber}`,
        message: values.message,
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setIsSuccess(true);

      form.reset();

      toast({
        title: "Email envoyé avec succès",
        description: "Nous vous contacterons dans les plus brefs délais.",
      });
    } catch (error) {
      console.error("Erreur d'envoi d'email:", error);

      toast({
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Erreur d'envoi d'email",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const onReset = () => {
    setIsSuccess(false);
    form.reset();
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      firstname: "",
      email: "",
      phone: {
        countryCode: "",
        phoneNumber: "",
      },
      message: "",
      agreesToConfidentialityPolicy: false,
    },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    await onSubmit(values);
  };

  if (isSuccess) {
    return <SuccessMessage isContact={isContact} onReset={onReset} />;
  }

  return (
    <section className="container max-w-xl mx-auto pb-20 ">
      <Card className="w-full text-center ">
        <CardHeader className="space-y-5">
          <h3 className="text-lg text-primary font-bold">Contactez-nous</h3>
          <p className="text-4xl font-bold test-destructive">Prendre contact</p>
          <p className="text-sm">
            Nous aimerions avoir de vos nouvelles. Veuillez remplir ce
            formulaire.
          </p>
        </CardHeader>

        <CardContent className="p-0 mt-16">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Carter" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Téléphone</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="phone.countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CountryCodeSelector
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone.phoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <PhoneNumberInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Laissez-nous un message..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreesToConfidentialityPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Vous acceptez notre politique de confidentialité.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded-full font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Envoi en cours..."
                  : isContact
                  ? "Envoyer maintenant"
                  : "Soumettre ma demande"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default ContactFormSection;

function SuccessMessage({
  isContact = true,
  onReset,
}: {
  isContact: boolean;
  onReset: VoidFunction;
}) {
  return isContact ? (
    <Card className="max-w-md p-8 text-center flex flex-col items-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
      <p className="text-muted-foreground mb-6">
        Merci de nous avoir contactés. Notre équipe vous répondra dans les plus
        brefs délais.
      </p>
      <Button className="rounded-2xl" onClick={onReset}>
        Envoyer un autre message
      </Button>
    </Card>
  ) : (
    <Card className="flex items-center justify-center p-6 max-w-lg mx-auto">
      <div className=" mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <CheckCircle className="w-12 h-12 text-green-700" />
        </div>

        <h1 className="text-lg md:text-2xl font-bold text-green-700 uppercase tracking-wide">
          VOTRE DEMANDE À BIEN ÉTÉ REÇU !
        </h1>

        <p className="text-md font-medium">
          Nous vous remercions de votre demande.
        </p>

        <p className="text-sm leading-relaxed mx-auto">
          Nous vous contacterons sous 48h pour collecter les informations
          nécessaires et finaliser votre dossier en toute simplicité.
        </p>

        <p className="text-sm">
          Vous recevrez bientôt une confirmation par courrier électronique.
        </p>

        <div className="pt-4">
          <Button className="rounded-2xl" onClick={onReset}>
            Faire une nouvelle demande
          </Button>
        </div>
      </div>
    </Card>
  );
}
