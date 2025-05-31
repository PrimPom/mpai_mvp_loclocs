import { ChevronLeft, ChevronRight, HelpCircle, Mail } from "lucide-react";
import React, { act, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import {
  analyzeDebtRatio,
  calculateMonthlyDebts,
  PersonalFinances,
  RatioIndicator,
  sumObjectValues,
} from "@/lib/financial";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function BudgetLocCalculator() {
  const [activeTab, setActiveTab] = useState("revenus");
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const tabs = [
    { id: "revenus", label: "Revenus", active: true },
    { id: "depenses", label: "Dépenses auto", active: false },
    { id: "credits", label: "Crédits & Dettes", active: false },
    { id: "simulation", label: "Simulation", active: false },
    { id: "ratio", label: "Ratio", active: false },
  ];

  // state for personal finance
  const [personalFinances, setPersonalFinances] = useState<PersonalFinances>({
    monthlyIncomes: {
      preTaxSalary: 0,
      alimonyReceived: 0,
      familyBenefits: 0,
      others: 0,
    },
    autoExpenses: {
      car: 0,
      other: 0,
    },
    credits: {
      card: 0,
      line: 0,
    },
    monthlyLoans: {
      personal: 0,
      student: 0,
      other: 0,
    },
  });

  const [proposedRent, setProposedRent] = useState<number>(0);

  // memorized calcul
  const debtCalculation = useMemo(
    () => calculateMonthlyDebts(personalFinances),
    [personalFinances]
  );

  const ratioAnalysis = useMemo(
    () =>
      analyzeDebtRatio(
        sumObjectValues(personalFinances.monthlyIncomes),
        debtCalculation.totalMonthlyDebts,
        proposedRent || undefined
      ),
    [
      personalFinances.monthlyIncomes,
      debtCalculation.totalMonthlyDebts,
      proposedRent,
    ]
  );

  return (
    <div className=" max-w-7xl mx-auto  flex justify-center items-center">
      <div className="container grid grid-cols-1 justify-center items-start lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <CalculatorSidebar />
        {/* Main Content */}
        <div className="lg:col-span-9">
          <Card className="">
            {/* Tab Navigation */}
            <div className="border-gray-200">
              <nav className=" grid grid-cols-5 gap-2 overflow-x-scroll justify-between border-none ">
                {tabs.map((tab, index) => (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={` px-6 py-4 flex text-sm justify-start font-semibold border-b-5 rounded-none transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary font-bold bg-background hover:bg-transparent"
                        : "bg-background hover:bg-transparent text-gray-300 hover:text-primary/70 border-gray-300 hover:border-primary/70"
                    }`}
                  >
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </div>
            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {activeTab === "revenus" && (
                <div>
                  <div className="pb-16 space-y-1">
                    <h2 className="text-2xl font-bold">Revenus</h2>
                    <p>Tous vos revenus avant impôts</p>
                  </div>
                  <div className="space-y-8">
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="preTaxSalary"
                      label="Salaire avant impôts"
                      value={personalFinances.monthlyIncomes.preTaxSalary || ""}
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          monthlyIncomes: {
                            ...prev.monthlyIncomes,
                            preTaxSalary: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="4000"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="alimonyReceived"
                      label="Pension reçue"
                      value={
                        personalFinances.monthlyIncomes.alimonyReceived || ""
                      }
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          monthlyIncomes: {
                            ...prev.monthlyIncomes,
                            alimonyReceived: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="2000"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="familyBenefits"
                      label="Prestations familiales"
                      value={
                        personalFinances.monthlyIncomes.familyBenefits || ""
                      }
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          monthlyIncomes: {
                            ...prev.monthlyIncomes,
                            familyBenefits: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="400"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="others"
                      label="Prestations familiales"
                      value={personalFinances.monthlyIncomes.others || ""}
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          monthlyIncomes: {
                            ...prev.monthlyIncomes,
                            others: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="500"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                  </div>
                </div>
              )}
              {activeTab === "depenses" && (
                <div>
                  <div className="pb-16 space-y-1">
                    <h2 className="text-2xl font-bold">Dépenses Automobiles</h2>
                    <p>Paiements mensuels pour vos véhicules</p>
                  </div>
                  <div className="space-y-8">
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="carPayment"
                      label="Paiement auto principal"
                      value={personalFinances.autoExpenses.car || ""}
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          autoExpenses: {
                            ...prev.autoExpenses,
                            car: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="500"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="otherPayment"
                      label="Paiement pour autre véhicule"
                      value={personalFinances.autoExpenses.other || ""}
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          autoExpenses: {
                            ...prev.autoExpenses,
                            other: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="300"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                  </div>
                </div>
              )}
              {activeTab === "credits" && (
                <div>
                  <div className="pb-16 space-y-1">
                    <h2 className="text-2xl font-bold">Crédits & Dettes</h2>
                    <p>Soldes actuels de vos crédits</p>
                  </div>
                  <div className="space-y-8">
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="creditCard"
                      label="Solde carte de crédit"
                      value={personalFinances.credits.card || ""}
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          credits: {
                            ...prev.credits,
                            card: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="100"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="creditLine"
                      label="Solde marge de crédit"
                      value={personalFinances.credits.line || ""}
                      onValueChange={(value) =>
                        setPersonalFinances((prev: PersonalFinances) => ({
                          ...prev,
                          credits: {
                            ...prev.credits,
                            line: parseFloat(value) || 0,
                          },
                        }))
                      }
                      placeholder="50"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                  </div>
                </div>
              )}
              {activeTab === "simulation" && (
                <div>
                  <div className="pb-16 space-y-1">
                    <h2 className="text-2xl font-bold">Simulation</h2>
                    <p>Testez un montant de loyer spécifique</p>
                  </div>
                  <div className="space-y-8">
                    <CalculatorField
                      showTooltip={showTooltip}
                      setShowTooltip={setShowTooltip}
                      fieldKey="proposedRent"
                      label="Loyer envisagé"
                      value={proposedRent || ""}
                      onValueChange={(value) =>
                        setProposedRent(parseFloat(value) || 0)
                      }
                      placeholder="500"
                      // hasTooltip={true}
                      // tooltipContent=""
                    />
                  </div>
                </div>
              )}
              {activeTab === "ratio" && (
                <div>
                  <div className="pb-16 space-y-1">
                    <h2 className="text-2xl font-bold">Résultats</h2>
                    <p>Félicitation voici votre résultat !</p>
                  </div>
                  {/* Résultats - unchanged */}
                  <div className="space-y-6">
                    {/* Calcul des dettes */}
                    <Card className="border-0 bg-white/80 backdrop-blur">
                      <CardHeader>
                        <CardTitle className="text-green-700">
                          Calcul des Dettes Mensuelles
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Paiement auto:</div>
                          <div className="font-semibold">
                            {debtCalculation.autoPayment.toFixed(2)} $
                          </div>
                          <div>Carte de crédit (3%):</div>
                          <div className="font-semibold">
                            {debtCalculation.creditCardPayment.toFixed(2)} $
                          </div>
                          <div>Marge de crédit (3%):</div>
                          <div className="font-semibold">
                            {debtCalculation.creditLinePayment.toFixed(2)} $
                          </div>
                          <div className="font-bold text-lg pt-2 border-t">
                            Total:
                          </div>
                          <div className="font-bold text-lg pt-2 border-t text-green-700">
                            {debtCalculation.totalMonthlyDebts.toFixed(2)} $
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Loyer maximal */}
                    <Card className=" border-0 bg-white/80 backdrop-blur">
                      <CardHeader>
                        <CardTitle className="text-primary">
                          Loyer Maximal Recommandé
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-2">
                            {ratioAnalysis.maxAffordableRent.toFixed(2)} $
                          </div>
                          <p className="text-sm text-gray-600">
                            Pour maintenir un ratio ≤ 44%
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Analyse du ratio */}
                    {!Number.isNaN(ratioAnalysis.ratio) && (
                      <Card className="border-0 bg-white/80 backdrop-blur">
                        <CardHeader>
                          <CardTitle>Analyse du Ratio d'Endettement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RatioIndicator analysis={ratioAnalysis} />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Navigation */}
            <div className="flex justify-between items-center  pt-6">
              {activeTab !== "revenus" ? (
                <Button
                  variant={"destructive"}
                  className={`flex items-center gap-2 px-6 py-3 transition-colors text-foreground bg-gray-300 hover:cursor-pointer
      
                } `}
                  onClick={() => {
                    const currentTabIndex = tabs.findIndex(
                      (tab) => tab.id === activeTab
                    );
                    if (currentTabIndex > 0) {
                      setActiveTab(tabs[currentTabIndex - 1].id);
                    }
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
              ) : (
                <br />
              )}
              {activeTab !== "ratio" ? (
                <Button
                  onClick={() => {
                    const currentTabIndex = tabs.findIndex(
                      (tab) => tab.id === activeTab
                    );
                    if (currentTabIndex >= 0) {
                      setActiveTab(tabs[currentTabIndex + 1].id);
                    }
                  }}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-white  font-medium"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <br />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BudgetLocCalculator;

export function CalculatorSidebar() {
  return (
    <div className="lg:col-span-3 h-full ">
      <div className="bg-primary rounded-2xl px-6 text-white sticky top-6 py-42 md:px-12">
        <h1 className="text-2xl font-bold mb-4">BudgetLoc™</h1>
        <div className="space-y-4 mb-6">
          <p className="text-blue-100">
            Combien pouvez-vous réellement payer ?
          </p>
          <p className="text-blue-100">
            C'est la première question à se poser avant de chercher un logement.
          </p>
          <p className="text-blue-100">
            BudgetLoc™ est une calculatrice financière simple, intuitive et
            conçue pour les locataires.
          </p>
          <p className="text-blue-100">
            En quelques clics, vous saurez exactement quel loyer correspond à
            votre budget.
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
  );
}

export function CalculatorField({
  label,
  value,
  showTooltip,
  onValueChange,
  setShowTooltip,
  hasTooltip = false,
  placeholder,
  tooltipContent = "",
  fieldKey = "",
}: {
  label: string;
  value: string | number;
  showTooltip: string | null;
  onValueChange: (value: string) => void;
  setShowTooltip: (value: string | null) => void;
  placeholder: string;
  hasTooltip?: boolean;
  tooltipContent?: string;
  fieldKey?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="preTaxSalary">{label}</Label>
        {hasTooltip && (
          <div className="relative">
            <Button
              onMouseEnter={() => setShowTooltip(fieldKey)}
              onMouseLeave={() => setShowTooltip(null)}
              className="text-primary/70 hover:text-primary transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            {showTooltip === fieldKey && tooltipContent && (
              <div className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-primary rounded-lg shadow-lg whitespace-nowrap">
                {tooltipContent}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-blue-600"></div>
              </div>
            )}
          </div>
        )}
      </div>
      <Input
        id={fieldKey ?? placeholder}
        type="number"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="text-lg"
      />
    </div>
  );
}
