"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Calculator,
  Home,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  analyzeDebtRatio,
  calculateAverageUnitValue,
  calculateMonthlyDebts,
  calculateRentalEstimation,
  DebtCalculation,
  PersonalFinances,
  PropertyData,
  PropertyFeatures,
  RatioAnalysis,
  RatioIndicator,
  RentalEstimation,
  sumObjectValues,
} from "@/lib/financial";

export default function RentalEvaluationApp() {
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

  // state for property evaluation
  const [propertyData, setPropertyData] = useState<PropertyData>({
    municipalValue: 0,
    totalUnits: 0,
    annualTaxes: 0,
    interestRateMin: 3,
    interestRateMax: 6,
  });

  const [propertyFeatures, setPropertyFeatures] = useState<PropertyFeatures>({
    furnished: false,
    appliances: false,
    heatingIncluded: false,
    gymAccess: false,
    indoorParking: false,
    viewBalcony: false,
    recentRenovations: false,
    poorCondition: false,
  });

  const [insuranceAmount, setInsuranceAmount] = useState<number>(250);

  const [activeTab, setActiveTab] = useState<"budget" | "estimation">("budget");

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

  const rentalEstimation = useMemo(
    () =>
      calculateRentalEstimation(
        propertyData,
        propertyFeatures,
        insuranceAmount
      ),
    [propertyData, propertyFeatures, insuranceAmount]
  );

  const handleFeatureChange = useCallback(
    (feature: keyof PropertyFeatures, checked: boolean) => {
      setPropertyFeatures((prev) => ({ ...prev, [feature]: checked }));
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Home className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">LocLoc's</h1>
          </div>
          <p className="text-xl text-gray-600">
            Évaluateur Financier de Logement
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Analysez votre capacité financière et estimez la valeur locative
            d'un logement avec nos outils basés sur les données municipales
            officielles.
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="flex justify-center space-x-4">
          <Button
            variant={activeTab === "budget" ? "default" : "outline"}
            onClick={() => setActiveTab("budget")}
            className="flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Analyse Budget</span>
          </Button>
          <Button
            variant={activeTab === "estimation" ? "default" : "outline"}
            onClick={() => setActiveTab("estimation")}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Estimation Locative</span>
          </Button>
        </div>

        {/* Section Analyse Budget */}
        {activeTab === "budget" && (
          <div className="grid md:grid-cols-2 gap-8 justify-center items-center">
            {/* Formulaire données personnelles */}
            <Card className="shadow-lg border-0 backdrop-blur pt-0">
              <CardHeader className="bg-gradient-to-r h-full from-blue-600 to-blue-700 text-white py-10 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Vos Données Financières</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Entrez vos informations pour calculer votre capacité de
                  paiement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-6">
                {/* Section Revenus Mensuels */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Revenus Mensuels
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tous vos revenus avant impôts
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preTaxSalary">
                        Salaire avant impôts ($)
                      </Label>
                      <Input
                        id="preTaxSalary"
                        type="number"
                        value={
                          personalFinances.monthlyIncomes.preTaxSalary || ""
                        }
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            monthlyIncomes: {
                              ...prev.monthlyIncomes,
                              preTaxSalary: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="4000"
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alimonyReceived">Pension reçue ($)</Label>
                      <Input
                        id="alimonyReceived"
                        type="number"
                        value={
                          personalFinances.monthlyIncomes.alimonyReceived || ""
                        }
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            monthlyIncomes: {
                              ...prev.monthlyIncomes,
                              alimonyReceived: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="2000"
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="familyBenefits">
                        Prestations familiales ($)
                      </Label>
                      <Input
                        id="familyBenefits"
                        type="number"
                        value={
                          personalFinances.monthlyIncomes.familyBenefits || ""
                        }
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            monthlyIncomes: {
                              ...prev.monthlyIncomes,
                              familyBenefits: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="400"
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="others">Autres revenus ($)</Label>
                      <Input
                        id="others"
                        type="number"
                        value={personalFinances.monthlyIncomes.others || ""}
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            monthlyIncomes: {
                              ...prev.monthlyIncomes,
                              others: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="500"
                        className="text-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Dépenses Automobiles */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Dépenses Automobiles
                    </h3>
                    <p className="text-sm text-gray-600">
                      Paiements mensuels pour vos véhicules
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="carPayment">
                        Paiement auto principal ($)
                      </Label>
                      <Input
                        id="carPayment"
                        type="number"
                        value={personalFinances.autoExpenses.car || ""}
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            autoExpenses: {
                              ...prev.autoExpenses,
                              car: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="500"
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherPayment">
                        Paiement autre véhicule ($)
                      </Label>
                      <Input
                        id="otherPayment"
                        type="number"
                        value={personalFinances.autoExpenses.other || ""}
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            autoExpenses: {
                              ...prev.autoExpenses,
                              other: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="300"
                        className="text-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Crédits */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Crédits & Dettes
                    </h3>
                    <p className="text-sm text-gray-600">
                      Soldes actuels de vos crédits
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creditCard">
                        Solde carte de crédit ($)
                      </Label>
                      <Input
                        id="creditCard"
                        type="number"
                        value={personalFinances.credits.card || ""}
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            credits: {
                              ...prev.credits,
                              card: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="1000"
                        className="text-lg"
                      />
                      <p className="text-xs text-gray-500">
                        Paiement calculé à 3% du solde
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="creditLine">
                        Solde marge de crédit ($)
                      </Label>
                      <Input
                        id="creditLine"
                        type="number"
                        value={personalFinances.credits.line || ""}
                        onChange={(e) =>
                          setPersonalFinances((prev) => ({
                            ...prev,
                            credits: {
                              ...prev.credits,
                              line: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder="5000"
                        className="text-lg"
                      />
                      <p className="text-xs text-gray-500">
                        Paiement calculé à 3% du solde
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Loyer Proposé */}
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Simulation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Testez un montant de loyer spécifique
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposedRent">
                      Loyer envisagé ($ - optionnel)
                    </Label>
                    <Input
                      id="proposedRent"
                      type="number"
                      value={proposedRent || ""}
                      onChange={(e) =>
                        setProposedRent(parseFloat(e.target.value) || 0)
                      }
                      placeholder="1000"
                      className="text-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Résultats - unchanged */}
            <div className="space-y-6">
              {/* Calcul des dettes */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
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
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-blue-700">
                    Loyer Maximal Recommandé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">
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
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
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

        {/* Section Estimation Locative */}
        {activeTab === "estimation" && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Formulaire données propriété */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur pt-0">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg py-10">
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="w-5 h-5" />
                    <span>Données de la Propriété</span>
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Informations tirées du rôle d'évaluation municipale
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2">
                    <Label htmlFor="municipalValue">
                      Valeur municipale totale ($)
                    </Label>
                    <Input
                      id="municipalValue"
                      type="number"
                      value={propertyData.municipalValue || ""}
                      onChange={(e) =>
                        setPropertyData((prev) => ({
                          ...prev,
                          municipalValue: parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="9525200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalUnits">Nombre de logements</Label>
                    <Input
                      id="totalUnits"
                      type="number"
                      value={propertyData.totalUnits || ""}
                      onChange={(e) =>
                        setPropertyData((prev) => ({
                          ...prev,
                          totalUnits: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="46"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annualTaxes">
                      Taxes annuelles totales ($)
                    </Label>
                    <Input
                      id="annualTaxes"
                      type="number"
                      value={propertyData.annualTaxes || ""}
                      onChange={(e) =>
                        setPropertyData((prev) => ({
                          ...prev,
                          annualTaxes: parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="60704"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insurance">Assurance Mensuelle ($)</Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={insuranceAmount || "250"}
                      onChange={(e) =>
                        setInsuranceAmount(parseFloat(e.target.value) || 250)
                      }
                      placeholder="250"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interestMin">Taux min (%)</Label>
                      <Input
                        id="interestMin"
                        type="number"
                        step="0.1"
                        value={propertyData.interestRateMin || ""}
                        onChange={(e) =>
                          setPropertyData((prev) => ({
                            ...prev,
                            interestRateMin: parseFloat(e.target.value) || 0,
                          }))
                        }
                        placeholder="3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestMax">Taux max (%)</Label>
                      <Input
                        id="interestMax"
                        type="number"
                        step="0.1"
                        value={propertyData.interestRateMax || ""}
                        onChange={(e) =>
                          setPropertyData((prev) => ({
                            ...prev,
                            interestRateMax: parseFloat(e.target.value) || 0,
                          }))
                        }
                        placeholder="6"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Caractéristiques du logement */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle>Caractéristiques du Logement</CardTitle>
                  <CardDescription>
                    Sélectionnez les options incluses pour ajuster l'estimation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      key: "furnished" as keyof PropertyFeatures,
                      label: "Meublé",
                      adjustment: "+150 à +300$",
                    },
                    {
                      key: "appliances" as keyof PropertyFeatures,
                      label: "Électroménagers inclus",
                      adjustment: "+50 à +100$",
                    },
                    {
                      key: "heatingIncluded" as keyof PropertyFeatures,
                      label: "Chauffage inclus",
                      adjustment: "+50 à +100$",
                    },
                    {
                      key: "gymAccess" as keyof PropertyFeatures,
                      label: "Accès gym/spa",
                      adjustment: "+100$",
                    },
                    {
                      key: "indoorParking" as keyof PropertyFeatures,
                      label: "Stationnement intérieur",
                      adjustment: "+100 à +150$",
                    },
                    {
                      key: "viewBalcony" as keyof PropertyFeatures,
                      label: "Vue/balcon/terrasse",
                      adjustment: "+50 à +100$",
                    },
                    {
                      key: "recentRenovations" as keyof PropertyFeatures,
                      label: "Rénovations récentes",
                      adjustment: "+Variable",
                    },
                    {
                      key: "poorCondition" as keyof PropertyFeatures,
                      label: "Vieil état/mal isolé",
                      adjustment: "-100 à -150$",
                    },
                  ].map((feature) => (
                    <div
                      key={feature.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={feature.key}
                          checked={propertyFeatures[feature.key]}
                          onCheckedChange={(checked) =>
                            handleFeatureChange(feature.key, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={feature.key}
                          className="text-sm font-medium"
                        >
                          {feature.label}
                        </Label>
                      </div>
                      <span className="text-xs text-gray-500">
                        {feature.adjustment}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Résultats estimation */}
            <div className="space-y-6">
              {/* Détails des calculs */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-green-700">
                    Détail des Calculs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Valeur par logement:</span>
                      <span className="font-semibold">
                        {calculateAverageUnitValue(
                          propertyData.municipalValue,
                          propertyData.totalUnits
                        ).toLocaleString()}{" "}
                        $
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Loyer bancaire (min-max):</span>
                      <span className="font-semibold">
                        {rentalEstimation.bankRentMin.toFixed(0)} $ -{" "}
                        {rentalEstimation.bankRentMax.toFixed(0)} $
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Loyer gouvernemental:</span>
                      <span className="font-semibold">
                        {rentalEstimation.governmentRent.toFixed(0)} $
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Assurance:</span>
                      <span className="font-semibold">
                        {rentalEstimation.insurance.toFixed(0)} $
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Ajustements caractéristiques:</span>
                      <span
                        className={`font-semibold ${
                          rentalEstimation.featureAdjustments >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {rentalEstimation.featureAdjustments >= 0 ? "+" : ""}
                        {rentalEstimation.featureAdjustments.toFixed(0)} $
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estimation finale */}
              <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Estimation Finale</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold">
                      {rentalEstimation.estimatedRentMin.toFixed(0)} $ -{" "}
                      {rentalEstimation.estimatedRentMax.toFixed(0)} $
                    </div>
                    <p className="text-green-100">Loyer estimé par mois</p>

                    <div className="bg-white/20 rounded-lg p-4 text-sm">
                      <p className="mb-2 font-medium">
                        Cette estimation est basée sur:
                      </p>
                      <ul className="text-green-100 space-y-1 text-xs">
                        <li>• La valeur municipale officielle</li>
                        <li>• Le nombre de logements dans l'immeuble</li>
                        <li>• Les taxes municipales actuelles</li>
                        <li>• Les taux d'intérêt hypothécaires</li>
                        <li>• Les services et caractéristiques inclus</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparaison avec budget */}
              {sumObjectValues(personalFinances.monthlyIncomes) > 0 && (
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="w-5 h-5 text-blue-500" />
                      <span>Comparaison avec Votre Budget</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Votre loyer maximal:</div>
                      <div className="font-semibold text-blue-600">
                        {ratioAnalysis.maxAffordableRent.toFixed(0)} $
                      </div>

                      <div>Estimation basse:</div>
                      <div
                        className={`font-semibold ${
                          rentalEstimation.estimatedRentMin <=
                          ratioAnalysis.maxAffordableRent
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {rentalEstimation.estimatedRentMin.toFixed(0)} $
                      </div>

                      <div>Estimation haute:</div>
                      <div
                        className={`font-semibold ${
                          rentalEstimation.estimatedRentMax <=
                          ratioAnalysis.maxAffordableRent
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {rentalEstimation.estimatedRentMax.toFixed(0)} $
                      </div>
                    </div>

                    {rentalEstimation.estimatedRentMin >
                      ratioAnalysis.maxAffordableRent && (
                      <Alert className="border-l-4 border-l-orange-500">
                        <AlertTriangle className="w-4 h-4" />
                        <AlertDescription className="text-orange-700">
                          Ce logement pourrait dépasser votre capacité de
                          paiement recommandée. Considérez les risques
                          financiers avant de procéder.
                        </AlertDescription>
                      </Alert>
                    )}

                    {rentalEstimation.estimatedRentMax <=
                      ratioAnalysis.maxAffordableRent && (
                      <Alert className="border-l-4 border-l-green-500">
                        <CheckCircle className="w-4 h-4" />
                        <AlertDescription className="text-green-700">
                          Ce logement semble compatible avec votre budget. Vous
                          maintiendrez une bonne santé financière.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const Foooter = () => {
  return (
    <>
      {/* Section aide */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800">
            <Info className="w-5 h-5" />
            <span>Comment utiliser cet outil</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">📊 Analyse Budget</h4>
              <ul className="space-y-1 text-xs">
                <li>• Entrez vos revenus et dettes actuelles</li>
                <li>• L'outil calcule votre capacité de paiement</li>
                <li>
                  • Respectez un ratio ≤ 40% pour une bonne santé financière
                </li>
                <li>• Testez différents loyers pour voir leur impact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">🏠 Estimation Locative</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  • Recherchez l'adresse sur
                  montreal.ca/role-evaluation-fonciere
                </li>
                <li>• Notez la valeur municipale et le nombre de logements</li>
                <li>• Trouvez les taxes annuelles dans le compte de taxes</li>
                <li>• Ajustez selon les caractéristiques du logement</li>
              </ul>
            </div>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <Info className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Confidentialité:</strong> Toutes les données sont traitées
              localement dans votre navigateur. Aucune information n'est
              sauvegardée ou transmise à nos serveurs.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-4">
        <p>© 2025 LocLoc's - Outil d'évaluation financière de logement</p>
        <p className="mt-1">
          Les estimations sont basées sur des données municipales officielles et
          des calculs standardisés.
        </p>
      </div>
    </>
  );
};
