import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Phone } from "lucide-react";
import React, { useState } from "react";

const countryCodes = [
  { code: "+1", country: "Canada", flag: "🇨🇦", id: "ca" },
  { code: "+1", country: "États-Unis", flag: "🇺🇸", id: "us" },
  { code: "+33", country: "France", flag: "🇫🇷", id: "fr" },
  { code: "+52", country: "Mexique", flag: "🇲🇽", id: "mx" },
  { code: "+55", country: "Brésil", flag: "🇧🇷", id: "br" },
  { code: "+54", country: "Argentine", flag: "🇦🇷", id: "ar" },
  { code: "+57", country: "Colombie", flag: "🇨🇴", id: "co" },
  { code: "+51", country: "Pérou", flag: "🇵🇪", id: "pe" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪", id: "ve" },
  { code: "+56", country: "Chili", flag: "🇨🇱", id: "cl" },
  { code: "+593", country: "Équateur", flag: "🇪🇨", id: "ec" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹", id: "gt" },
  { code: "+503", country: "Salvador", flag: "🇸🇻", id: "sv" },
  { code: "+504", country: "Honduras", flag: "🇭🇳", id: "hn" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮", id: "ni" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷", id: "cr" },
  { code: "+507", country: "Panama", flag: "🇵🇦", id: "pa" },
  { code: "+1", country: "République Dominicaine", flag: "🇩🇴", id: "do" },
  { code: "+1", country: "Porto Rico", flag: "🇵🇷", id: "pr" },
  { code: "+1", country: "Jamaïque", flag: "🇯🇲", id: "jm" },
  { code: "+44", country: "Royaume-Uni", flag: "🇬🇧", id: "gb" },
  { code: "+49", country: "Allemagne", flag: "🇩🇪", id: "de" },
  { code: "+39", country: "Italie", flag: "🇮🇹", id: "it" },
  { code: "+34", country: "Espagne", flag: "🇪🇸", id: "es" },
  { code: "+32", country: "Belgique", flag: "🇧🇪", id: "be" },
  { code: "+41", country: "Suisse", flag: "🇨🇭", id: "ch" },
  { code: "+212", country: "Maroc", flag: "🇲🇦", id: "ma" },
  { code: "+229", country: "Bénin", flag: "🇧🇯", id: "bj" },
];

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CountryCodeSelector({
  value,
  onChange,
  disabled = false,
}: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry =
    countryCodes.find((c) => c.id === value) || countryCodes[0];

  const handleCountrySelect = (country: (typeof countryCodes)[0]) => {
    onChange(country.id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 min-w-[120px] rounded-2xl justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm font-medium">{selectedCountry.code}</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {countryCodes.map((country) => (
            <button
              key={country.id}
              type="button"
              onClick={() => handleCountrySelect(country)}
              className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-accent focus:bg-accent focus:outline-none transition-colors"
            >
              <span className="text-lg">{country.flag}</span>
              <div className="flex-1">
                <div className="text-sm font-medium">{country.country}</div>
                <div className="text-xs text-muted-foreground">
                  {country.code}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function PhoneNumberInput({
  value,
  onChange,
  placeholder = "Numéro de téléphone",
  disabled = false,
}: PhoneNumberInputProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value.replace(/[^\d\s\-\(\)]/g, "");
    onChange(phoneValue);
  };

  return (
    <div className="relative">
      <Input
        type="tel"
        value={value}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        disabled={disabled}
        className=""
      />
    </div>
  );
}
