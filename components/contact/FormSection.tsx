import { useToast } from "@/hooks/useToast";
import { contactFormSchema } from "@/lib/schemas/contact.schema";
import { ContactFormValues } from "@/lib/types/contact.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
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

interface ContactFormSectionProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  onSubmit: (formValues: ContactFormValues) => void;
  onReset: () => void;
}

function ContactFormSection({
  isSubmitting,
  isSuccess,
  onSubmit,
  onReset,
}: ContactFormSectionProps) {
  const { toast } = useToast();

  const form = useForm({
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
    },
  });

  function handleSubmit(values: ContactFormValues) {
    onSubmit(values);
    toast({
      title: "Formulaire envoyé",
      description: "Nous vous contacterons dans les plus brefs délais.",
    });
  }

  if (isSuccess) {
    return <SuccessMessage onReset={onReset} />;
  }
  return (
    <section className="container w-full flex flex-col max-w-lg text-center ">
      <Card className="py-24">
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
                className="rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer maintenant"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default ContactFormSection;

function SuccessMessage({ onReset }: { onReset: VoidFunction }) {
  return (
    <Card className="p-8 text-center">
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
      <Button onClick={onReset}>Envoyer un autre message</Button>
    </Card>
  );
}
