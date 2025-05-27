import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DebtCalculation,
  PersonalFinances,
  PropertyData,
  PropertyFeatures,
  RatioAnalysis,
  RentalEstimation,
} from "./types";
import { AlertTriangle, CheckCircle, ThumbsUp, X } from "lucide-react";

export function sumObjectValues(obj: Object): number {
  return Object.values(obj).reduce((acc, val) => acc + val, 0);
}

/**
 * Calculate monthly debt payments based on financial profile
 * @param finances - Personal financial data
 * @returns Detailed calculation of monthly debts
 */
export const calculateMonthlyDebts = (
  finances: PersonalFinances
): DebtCalculation => {
  const creditCardPayment =
    Math.round(finances.credits.card * 0.03 * 100) / 100;
  const creditLinePayment =
    Math.round(finances.credits.card * 0.03 * 100) / 100;
  const totalMonthlyDebts =
    sumObjectValues(finances.autoExpenses) +
    creditCardPayment +
    creditLinePayment;

  return {
    autoPayment: sumObjectValues(finances.autoExpenses),
    creditCardPayment,
    creditLinePayment,
    totalMonthlyDebts: Math.round(totalMonthlyDebts * 100) / 100,
  };
};

/**
 * Analyze debt ratio and determine payment capacity
 * @param monthlyIncome - Monthly incomes
 * @param totalDebts - Total monthly debts
 * @param proposedRent - Proposed rent (optional)
 * @returns Complete ratio analysis with recommendations
 */
export const analyzeDebtRatio = (
  monthlyIncomes: number,
  totalDebts: number,
  proposedRent?: number
): RatioAnalysis => {
  const maxAffordableRent =
    Math.round((monthlyIncomes * 0.44 - totalDebts) * 100) / 100;

  let ratio: number;
  if (proposedRent !== undefined) {
    ratio =
      Math.round(((proposedRent + totalDebts) / monthlyIncomes) * 10000) / 100;
  } else {
    ratio = Math.round((totalDebts / monthlyIncomes) * 10000) / 100;
  }

  let category: "excellent" | "good" | "elevated" | "critical";
  if (ratio < 33) category = "excellent";
  else if (ratio < 44) category = "good";
  else if (ratio < 50) category = "elevated";
  else category = "critical";

  return {
    ratio,
    category,
    maxAffordableRent: Math.max(0, maxAffordableRent),
  };
};

/**
 * Calculate average value per unit based on municipal assessment
 * @param municipalValue - Total municipal value of the building
 * @param totalUnits - Total number of units
 * @returns Average value per unit
 */
export const calculateAverageUnitValue = (
  municipalValue: number,
  totalUnits: number
): number => {
  if (totalUnits <= 0) return 0;
  return Math.round((municipalValue / totalUnits) * 100) / 100;
};

/**
 * Calculate monthly interest payments (bank rent)
 * @param propertyValue - Property value
 * @param interestRate - Annual interest rate (as percentage)
 * @param amortizationYears - Amortization period in years
 * @returns Monthly interest payment
 */
export const calculateMonthlyInterest = (
  propertyValue: number,
  interestRate: number,
  amortizationYears: number = 25
): number => {
  if (propertyValue <= 0 || interestRate <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = amortizationYears * 12;

  // Mortgage calculation formula
  const monthlyPayment =
    (propertyValue * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  return Math.round(monthlyPayment * 100) / 100;
};

/**
 * Calculate government rent (monthly taxes per unit)
 * @param annualTaxes - Total annual taxes for the building
 * @param totalUnits - Total number of units
 * @returns Monthly taxes per unit
 */
export const calculateGovernmentRent = (
  annualTaxes: number,
  totalUnits: number
): number => {
  if (totalUnits <= 0) return 0;
  const monthlyTaxesPerUnit = annualTaxes / totalUnits / 12;
  return Math.round(monthlyTaxesPerUnit * 100) / 100;
};

/**
 * Calculate price adjustments based on property features
 * @param features - Selected property features
 * @returns Total monthly adjustment
 */
export const calculateFeatureAdjustments = (
  features: PropertyFeatures
): number => {
  let adjustment = 0;

  if (features.furnished) adjustment += 225; // Average of +150 to +300
  if (features.appliances) adjustment += 75; // Average of +50 to +100
  if (features.heatingIncluded) adjustment += 75; // Average of +50 to +100
  if (features.gymAccess) adjustment += 100;
  if (features.indoorParking) adjustment += 125; // Average of +100 to +150
  if (features.viewBalcony) adjustment += 75; // Average of +50 to +100
  if (features.recentRenovations) adjustment += 100; // Variable estimate
  if (features.poorCondition) adjustment -= 125; // Average of -100 to -150

  return adjustment;
};

/**
 * Calculate complete rental estimation
 * @param propertyData - Property data
 * @param features - Property features
 * @param insurance - insurance amount
 * @returns Complete estimation with price range
 */
export const calculateRentalEstimation = (
  propertyData: PropertyData,
  features: PropertyFeatures,
  insurance: number = 250
): RentalEstimation => {
  const unitValue = calculateAverageUnitValue(
    propertyData.municipalValue,
    propertyData.totalUnits
  );
  const bankRentMin = calculateMonthlyInterest(
    unitValue,
    propertyData.interestRateMin
  );
  const bankRentMax = calculateMonthlyInterest(
    unitValue,
    propertyData.interestRateMax
  );
  const governmentRent = calculateGovernmentRent(
    propertyData.annualTaxes,
    propertyData.totalUnits
  );

  const featureAdjustments = calculateFeatureAdjustments(features);

  const estimatedRentMin =
    Math.round(
      (bankRentMin + governmentRent + insurance + featureAdjustments) * 100
    ) / 100;
  const estimatedRentMax =
    Math.round(
      (bankRentMax + governmentRent + insurance + featureAdjustments) * 100
    ) / 100;

  return {
    bankRentMin,
    bankRentMax,
    governmentRent,
    insurance,
    featureAdjustments,
    estimatedRentMin,
    estimatedRentMax,
  };
};

/**
 * React component to display debt ratio indicator with visual feedback
 */
export const RatioIndicator: React.FC<{ analysis: RatioAnalysis }> = ({
  analysis,
}) => {
  const getBgColorClass = () => {
    switch (analysis.category) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "elevated":
        return "bg-orange-500";
      case "critical":
        return "bg-red-500";
    }
  };

  const getBorderColorClass = () => {
    switch (analysis.category) {
      case "excellent":
        return "border-green-500";
      case "good":
        return "border-blue-500";
      case "elevated":
        return "border-orange-500";
      case "critical":
        return "border-red-500";
    }
  };

  const getTextColor = () => {
    switch (analysis.category) {
      case "excellent":
        return "text-green-700";
      case "good":
        return "text-blue-700";
      case "elevated":
        return "text-orange-700";
      case "critical":
        return "text-red-700";
    }
  };

  const getIcon = () => {
    switch (analysis.category) {
      case "excellent":
        return <CheckCircle className="w-5 h-5" />;
      case "good":
        return <ThumbsUp className="w-5 h-5" />;
      case "elevated":
        return <AlertTriangle className="w-5 h-5" />;
      case "critical":
        return <X className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    switch (analysis.category) {
      case "excellent":
        return "Excellent";
      case "good":
        return "Bon";
      case "elevated":
        return "Élevé";
      case "critical":
        return "Critique";
    }
  };

  // Calculate position on gradient scale based on ratio ranges
  const getIndicatorPosition = () => {
    const ratio = analysis.ratio;

    if (ratio < 33) {
      // Excellent range: 0-33% maps to 75-100% position on gradient (green section)
      return 75 + ((33 - ratio) / 33) * 25;
    } else if (ratio < 44) {
      // Good range: 33-44% maps to 50-75% position on gradient (blue section)
      return 50 + ((44 - ratio) / 11) * 25;
    } else if (ratio < 50) {
      // Elevated range: 44-50% maps to 25-50% position on gradient (orange section)
      return 25 + ((50 - ratio) / 6) * 25;
    } else {
      // Critical range: 50%+ maps to 0-25% position on gradient (red section)
      return Math.max(0, 25 - ((ratio - 50) / 20) * 25);
    }
  };

  // Get scale labels with proper positioning
  const getScaleLabels = () => [
    {
      label: "50%+",
      sublabel: "Critique",
      position: 12,
      color: "text-red-700",
    },
    {
      label: "44-50%",
      sublabel: "Élevé",
      position: 37,
      color: "text-orange-700",
    },
    { label: "33-44%", sublabel: "Bon", position: 62, color: "text-blue-700" },
    {
      label: "<33%",
      sublabel: "Excellent",
      position: 87,
      color: "text-green-700",
    },
  ];

  const getMessage = () => {
    switch (analysis.category) {
      case "excellent":
        return "Excellente marge de manœuvre financière. Capacité d'épargne pour une mise de fonds.";
      case "good":
        return "Loyer acceptable, mais espace d'épargne plus restreint.";
      case "elevated":
        return "Risqué - trop grande part du revenu allouée au logement.";
      case "critical":
        return "Problématique - risque de non-paiement, aucune capacité d'épargne.";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className={`w-4 h-4 rounded-full ${getBgColorClass()}`}></div>
        <div className={`flex items-center space-x-2 ${getTextColor()}`}>
          {getIcon()}
          <span className="font-semibold text-lg">
            {getLabel()} - {analysis.ratio}%
          </span>
        </div>
      </div>

      <Alert className={`border-l-4 ${getBorderColorClass()} `}>
        <AlertDescription className={`font-semibold ${getTextColor()}`}>
          {getMessage()}
        </AlertDescription>
      </Alert>

      {/* Gradient Scale Indicator */}
      <div className="relative pb-12">
        {/* Main gradient bar */}
        <div
          className="w-full h-10 rounded-0 shadow-inner relative overflow-hidden"
          style={{
            background:
              "linear-gradient(to right, #ef4444 0%, #ef4444 25%, #f97316 25%, #f97316 50%, #3b82f6 50%, #3b82f6 75%, #10b981 75%, #10b981 100%)",
          }}
        >
          {/* Current position indicator */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white border-2 border-gray-800 shadow-lg transition-all duration-500 ease-out"
            style={{
              left: `${getIndicatorPosition()}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Top triangle pointer */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-3 border-r-3 border-b-3 border-transparent border-b-gray-800"></div>
            </div>

            {/* Bottom triangle pointer */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>

        {/* Scale labels */}
        <div className="relative mt-4">
          {getScaleLabels().map((scale, index) => (
            <div
              key={index}
              className={`absolute text-center text-xs font-medium ${scale.color}`}
              style={{
                left: `${scale.position}%`,
                transform: "translateX(-50%)",
                minWidth: "60px",
              }}
            >
              <div className="font-semibold">{scale.label}</div>
              <div className="text-xs opacity-75">{scale.sublabel}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className={`h-2.5 rounded-full ${getBgColorClass()}`}
          style={{ width: `${Math.min(analysis.ratio, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};
