"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User, Mail, Star } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  service: z.string().min(1, "Service requis"),
  message: z.string().optional(), 
  rating: z.number().min(1, "Note requise"),
})

export default function Avis() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { rating: 0 },
  })

  const rating = watch("rating")

  const onSubmit = (data) => {
    console.log("Form data:", data)
    alert("Avis soumis avec succès !")
  }

  return (
    <section className="py-16 px-6 md:px-20 bg-white text-[#1e1e1e]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Texte à gauche */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-semibold text-primary leading-tight">
            Remplissez le  <span> </span>
            <span className="relative inline-block">
                 formulaire
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
            </span>{" "}<br />
            <span className="">
              pour soumettre
              
            </span>{" "}
            votre avis
          </h2>
          <p className="mt-4 text-sm text-foreground">
            Lorem ipsum dolor sit amet consectetur adipiscing elit posuere vel
            venenatis eu et massa volutpat massa rhoncus odio feugiat tellus, elit massa sed.
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-md space-y-5"
        >
         
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full">
              <Input placeholder="John Carter" {...register("name")} />
              <User className="absolute right-3 top-3 text-gray-400 " size={18} />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="relative w-full">
              <Input placeholder="Email address" {...register("email")} />
              <Mail className="absolute right-3 top-3 text-gray-400" size={18} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

        
          <div>
            <select
              {...register("service")}
              className="w-full bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2"
            >
              <option value="">-- Sélectionnez un service --</option>
              <option value="BudgetLoc">BudgetLoc™</option>
              <option value="GarantieFacile">GarantieFacile™</option>
            </select>
            {errors.service && (
              <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <p className="mb-1 font-medium">Votre note de service</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={24}
                  className={`cursor-pointer ${
                    i <= rating ? "text-[#FFD029] fill-[#FFD029]" : "text-gray-300"
                  }`}
                  onClick={() => setValue("rating", i)}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <Textarea
              rows={4}
              placeholder="Si vous avez d'autres commentaires à formuler, veuillez les indiquer ici..."
              {...register("message")}
              className=" resize-none"
            />
          </div>

          {/* Bouton */}
          <Button type="submit" className="bg-primary hover:bg-sky-600 text-white">
            Soumettre
          </Button>
        </form>
      </div>
    </section>
  )
}
