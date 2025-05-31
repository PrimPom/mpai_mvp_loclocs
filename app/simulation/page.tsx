"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface FormData {
  salary: string;
  salaryPeriod: string;
  pension: string;
  pensionPeriod: string;
  familyBenefits: string;
  familyBenefitsPeriod: string;
  otherIncome: string;
  otherIncomePeriod: string;
}

const BudgetLocationCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("revenus");
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    salary: "",
    salaryPeriod: "par an",
    pension: "",
    pensionPeriod: "chaque 2 semaine",
    familyBenefits: "",
    familyBenefitsPeriod: "chaque 2 semaine",
    otherIncome: "",
    otherIncomePeriod: "chaque 2 semaine",
  });

  const tabs = [
    { id: "revenus", label: "Revenus", active: true },
    { id: "depenses", label: "Dépenses auto", active: false },
    { id: "credits", label: "Crédits & Dettes", active: false },
    { id: "simulation", label: "Simulation", active: false },
  ];

  const periodOptions = [
    "par an",
    "par mois",
    "chaque 2 semaine",
    "par semaine",
    "par jour",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors flex items-center justify-between"
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const FormField = ({
    label,
    value,
    period,
    onValueChange,
    onPeriodChange,
    hasTooltip = false,
    tooltipContent = "",
    fieldKey = "",
  }: {
    label: string;
    value: string;
    period: string;
    onValueChange: (value: string) => void;
    onPeriodChange: (value: string) => void;
    hasTooltip?: boolean;
    tooltipContent?: string;
    fieldKey?: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {hasTooltip && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(fieldKey)}
              onMouseLeave={() => setShowTooltip(null)}
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            {showTooltip === fieldKey && tooltipContent && (
              <div className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg shadow-lg whitespace-nowrap">
                {tooltipContent}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-blue-600"></div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-300 transition-colors"
          placeholder="Montant"
        />
        <CustomSelect
          value={period}
          onChange={onPeriodChange}
          options={periodOptions}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-blue-400 rounded-2xl p-6 text-white sticky top-6">
              <h1 className="text-2xl font-bold mb-4">BudgetLoc™</h1>

              <div className="space-y-4 mb-6">
                <p className="text-blue-100">
                  Combien pouvez-vous réellement payer ?
                </p>
                <p className="text-blue-100">
                  C'est la première question à se poser avant de chercher un
                  logement.
                </p>
                <p className="text-blue-100">
                  BudgetLoc™ est une calculatrice financière simple, intuitive
                  et conçue pour les locataires.
                </p>
                <p className="text-blue-100">
                  En quelques clics, vous saurez exactement quel loyer
                  correspond à votre budget.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Ce que ça vous apporte :</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-100">
                      Louer un logement adapté à votre réalité financière
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-100">
                      Éviter de vivre au-dessus de vos moyens
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-100">
                      Épargner pour un futur achat immobilier
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-blue-300 pt-6">
                <h3 className="font-semibold mb-3">QUESTION?</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Si vous avez encore des questions au sujet de votre ratio
                  d'endettement, vous pouvez nous écrire à
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>Nos contacts</span>
                </div>
                <p className="text-sm text-blue-100 mt-1">
                  Nous sommes à votre écoute
                </p>
                <p className="text-sm font-medium mt-2">contact@loclocs.com</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8">
                {activeTab === "revenus" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                      Revenus
                    </h2>

                    <div className="space-y-8">
                      <FormField
                        label="Votre salaire avant impôts"
                        value={formData.salary}
                        period={formData.salaryPeriod}
                        onValueChange={(value) =>
                          handleInputChange("salary", value)
                        }
                        onPeriodChange={(value) =>
                          handleInputChange("salaryPeriod", value)
                        }
                        hasTooltip={true}
                        tooltipContent="Salaire brut avant déduction des impôts"
                        fieldKey="salary"
                      />

                      <FormField
                        label="Pension alimentaire (perçue)"
                        value={formData.pension}
                        period={formData.pensionPeriod}
                        onValueChange={(value) =>
                          handleInputChange("pension", value)
                        }
                        onPeriodChange={(value) =>
                          handleInputChange("pensionPeriod", value)
                        }
                        hasTooltip={true}
                        tooltipContent="Montant de pension alimentaire que vous recevez"
                        fieldKey="pension"
                      />

                      <FormField
                        label="Prestations familiales"
                        value={formData.familyBenefits}
                        period={formData.familyBenefitsPeriod}
                        onValueChange={(value) =>
                          handleInputChange("familyBenefits", value)
                        }
                        onPeriodChange={(value) =>
                          handleInputChange("familyBenefitsPeriod", value)
                        }
                        hasTooltip={true}
                        tooltipContent="Exemples : travailleur autonome, pensions, assurance-emploi, prestations gouvernementales, etc."
                        fieldKey="familyBenefits"
                      />

                      <FormField
                        label="Autres revenus"
                        value={formData.otherIncome}
                        period={formData.otherIncomePeriod}
                        onValueChange={(value) =>
                          handleInputChange("otherIncome", value)
                        }
                        onPeriodChange={(value) =>
                          handleInputChange("otherIncomePeriod", value)
                        }
                      />
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                      <button className="flex items-center gap-2 px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        Précédent
                      </button>
                      <button
                        onClick={() => setActiveTab("depenses")}
                        className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        Suivant
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab !== "revenus" && (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {tabs.find((tab) => tab.id === activeTab)?.label}
                    </h2>
                    <p className="text-gray-500">
                      Cette section sera implémentée prochainement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetLocationCalculator;
