import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Phone } from "lucide-react";
import React, { useState } from "react";

const countryCodes = [
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+1", country: "États-Unis", flag: "🇺🇸" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+52", country: "Mexique", flag: "🇲🇽" },
  { code: "+55", country: "Brésil", flag: "🇧🇷" },
  { code: "+54", country: "Argentine", flag: "🇦🇷" },
  { code: "+57", country: "Colombie", flag: "🇨🇴" },
  { code: "+51", country: "Pérou", flag: "🇵🇪" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+56", country: "Chili", flag: "🇨🇱" },
  { code: "+593", country: "Équateur", flag: "🇪🇨" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { code: "+503", country: "Salvador", flag: "🇸🇻" },
  { code: "+504", country: "Honduras", flag: "🇭🇳" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+507", country: "Panama", flag: "🇵🇦" },
  { code: "+1", country: "République Dominicaine", flag: "🇩🇴" },
  { code: "+1", country: "Porto Rico", flag: "🇵🇷" },
  { code: "+1", country: "Jamaïque", flag: "🇯🇲" },
  { code: "+44", country: "Royaume-Uni", flag: "🇬🇧" },
  { code: "+49", country: "Allemagne", flag: "🇩🇪" },
  { code: "+39", country: "Italie", flag: "🇮🇹" },
  { code: "+34", country: "Espagne", flag: "🇪🇸" },
  { code: "+32", country: "Belgique", flag: "🇧🇪" },
  { code: "+41", country: "Suisse", flag: "🇨🇭" },
  { code: "+212", country: "Maroc", flag: "🇲🇦" },
  { code: "+229", country: "Bénin", flag: "🇧🇯" },
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
    countryCodes.find((c) => c.code === value) || countryCodes[0];

  const handleCountrySelect = (country: (typeof countryCodes)[0]) => {
    onChange(country.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 min-w-[120px] justify-between"
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
              key={`${country.code}-${country.country}`}
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
