// ==================== TYPES FOR FINANCIAL EVALUATION ====================

export interface PersonalFinances {
  monthlyIncome: number;
  carPayment: number;
  creditCardBalance: number;
  creditLineBalance: number;
}

export interface DebtCalculation {
  carPayment: number;
  creditCardPayment: number;
  creditLinePayment: number;
  totalMonthlyDebts: number;
}

export interface RatioAnalysis {
  ratio: number;
  category: 'excellent' | 'good' | 'elevated' | 'critical';
  maxAffordableRent: number;
}

export interface PropertyData {
  municipalValue: number;
  totalUnits: number;
  annualTaxes: number;
  interestRateMin: number;
  interestRateMax: number;
}

export interface PropertyFeatures {
  furnished: boolean;
  appliances: boolean;
  heatingIncluded: boolean;
  gymAccess: boolean;
  indoorParking: boolean;
  viewBalcony: boolean;
  recentRenovations: boolean;
  poorCondition: boolean;
}

export interface RentalEstimation {
  unitValue: number;
  bankRentMin: number;
  bankRentMax: number;
  governmentRent: number;
  insurance: number;
  featureAdjustments: number;
  estimatedRentMin: number;
  estimatedRentMax: number;
}

export interface BudgetCompatibility {
  isAffordable: boolean;
  overBudgetAmount: number;
  recommendedMaxRent: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

// ==================== MAIN FUNCTIONS ====================

/**
 * Calculate monthly debt payments based on financial profile
 * @param finances - Personal financial data
 * @returns Detailed calculation of monthly debts
 */
export const calculateMonthlyDebts = (finances: PersonalFinances): DebtCalculation => {
  const creditCardPayment = Math.round((finances.creditCardBalance * 0.03) * 100) / 100;
  const creditLinePayment = Math.round((finances.creditLineBalance * 0.03) * 100) / 100;
  const totalMonthlyDebts = finances.carPayment + creditCardPayment + creditLinePayment;

  return {
    carPayment: finances.carPayment,
    creditCardPayment,
    creditLinePayment,
    totalMonthlyDebts: Math.round(totalMonthlyDebts * 100) / 100
  };
};

/**
 * Analyze debt ratio and determine payment capacity
 * @param monthlyIncome - Monthly net income
 * @param totalDebts - Total monthly debts
 * @param proposedRent - Proposed rent (optional)
 * @returns Complete ratio analysis with recommendations
 */
export const analyzeDebtRatio = (monthlyIncome: number, totalDebts: number, proposedRent?: number): RatioAnalysis => {
  if (monthlyIncome <= 0) {
    return {
      ratio: 0,
      category: 'critical',
      maxAffordableRent: 0
    };
  }

  const maxAffordableRent = Math.max(0, Math.round(((monthlyIncome * 0.40) - totalDebts) * 100) / 100);
  
  let ratio: number;
  if (proposedRent !== undefined) {
    ratio = Math.round(((proposedRent + totalDebts) / monthlyIncome) * 10000) / 100;
  } else {
    ratio = Math.round((totalDebts / monthlyIncome) * 10000) / 100;
  }

  let category: 'excellent' | 'good' | 'elevated' | 'critical';
  if (ratio < 30) category = 'excellent';
  else if (ratio < 40) category = 'good';
  else if (ratio < 50) category = 'elevated';
  else category = 'critical';

  return {
    ratio,
    category,
    maxAffordableRent
  };
};

/**
 * Calculate average value per unit based on municipal assessment
 * @param municipalValue - Total municipal value of the building
 * @param totalUnits - Total number of units
 * @returns Average value per unit
 */
export const calculateAverageUnitValue = (municipalValue: number, totalUnits: number): number => {
  if (totalUnits <= 0 || municipalValue <= 0) return 0;
  return Math.round((municipalValue / totalUnits) * 100) / 100;
};

/**
 * Calculate monthly interest payments (bank rent)
 * @param propertyValue - Property value
 * @param interestRate - Annual interest rate (as percentage)
 * @param amortizationYears - Amortization period in years
 * @returns Monthly interest payment
 */
export const calculateMonthlyInterest = (propertyValue: number, interestRate: number, amortizationYears: number = 25): number => {
  if (propertyValue <= 0 || interestRate <= 0 || amortizationYears <= 0) return 0;
  
  const monthlyRate = (interestRate / 100) / 12;
  const totalPayments = amortizationYears * 12;
  
  if (monthlyRate === 0) return propertyValue / totalPayments;
  
  const monthlyPayment = (propertyValue * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return Math.round(monthlyPayment * 100) / 100;
};

/**
 * Calculate government rent (monthly taxes per unit)
 * @param annualTaxes - Total annual taxes for the building
 * @param totalUnits - Total number of units
 * @returns Monthly taxes per unit
 */
export const calculateGovernmentRent = (annualTaxes: number, totalUnits: number): number => {
  if (totalUnits <= 0 || annualTaxes < 0) return 0;
  const monthlyTaxesPerUnit = (annualTaxes / totalUnits) / 12;
  return Math.round(monthlyTaxesPerUnit * 100) / 100;
};

/**
 * Calculate price adjustments based on property features
 * @param features - Selected property features
 * @returns Total monthly adjustment
 */
export const calculateFeatureAdjustments = (features: PropertyFeatures): number => {
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
 * @param insuranceAmount - Insurance amount (default: 250)
 * @returns Complete estimation with price range
 */
export const calculateRentalEstimation = (
  propertyData: PropertyData, 
  features: PropertyFeatures,
  insuranceAmount: number = 250
): RentalEstimation => {
  const unitValue = calculateAverageUnitValue(propertyData.municipalValue, propertyData.totalUnits);
  const bankRentMin = calculateMonthlyInterest(unitValue, propertyData.interestRateMin);
  const bankRentMax = calculateMonthlyInterest(unitValue, propertyData.interestRateMax);
  const governmentRent = calculateGovernmentRent(propertyData.annualTaxes, propertyData.totalUnits);
  const featureAdjustments = calculateFeatureAdjustments(features);
  
  const estimatedRentMin = Math.round((bankRentMin + governmentRent + insuranceAmount + featureAdjustments) * 100) / 100;
  const estimatedRentMax = Math.round((bankRentMax + governmentRent + insuranceAmount + featureAdjustments) * 100) / 100;

  return {
    unitValue,
    bankRentMin,
    bankRentMax,
    governmentRent,
    insurance: insuranceAmount,
    featureAdjustments,
    estimatedRentMin,
    estimatedRentMax
  };
};

/**
 * Evaluate compatibility between budget and rental estimation
 * @param maxAffordableRent - Maximum affordable rent amount
 * @param estimatedRentMin - Minimum estimated rent
 * @param estimatedRentMax - Maximum estimated rent
 * @returns Budget compatibility analysis with risk assessment
 */
export const evaluateBudgetCompatibility = (
  maxAffordableRent: number, 
  estimatedRentMin: number, 
  estimatedRentMax: number
): BudgetCompatibility => {
  const isAffordable = estimatedRentMin <= maxAffordableRent;
  const overBudgetAmount = Math.max(0, estimatedRentMin - maxAffordableRent);
  
  let riskLevel: 'low' | 'medium' | 'high' | 'critical';
  if (isAffordable) {
    if (estimatedRentMax <= maxAffordableRent * 0.9) riskLevel = 'low';
    else riskLevel = 'medium';
  } else {
    if (overBudgetAmount <= maxAffordableRent * 0.1) riskLevel = 'high';
    else riskLevel = 'critical';
  }

  return {
    isAffordable,
    overBudgetAmount: Math.round(overBudgetAmount * 100) / 100,
    recommendedMaxRent: maxAffordableRent,
    riskLevel
  };
};

/**
 * Generate complete financial evaluation report
 * @param finances - Personal financial information
 * @param propertyData - Property details and data
 * @param features - Property features and amenities
 * @param proposedRent - Proposed rent amount (optional)
 * @returns Comprehensive financial analysis report
 */
export const generateFinancialReport = (
  finances: PersonalFinances,
  propertyData: PropertyData,
  features: PropertyFeatures,
  proposedRent?: number
) => {
  const debts = calculateMonthlyDebts(finances);
  const ratioAnalysis = analyzeDebtRatio(finances.monthlyIncome, debts.totalMonthlyDebts, proposedRent);
  const rentalEstimation = calculateRentalEstimation(propertyData, features);
  const budgetCompatibility = evaluateBudgetCompatibility(
    ratioAnalysis.maxAffordableRent,
    rentalEstimation.estimatedRentMin,
    rentalEstimation.estimatedRentMax
  );

  return {
    personalFinances: finances,
    debtCalculation: debts,
    ratioAnalysis,
    rentalEstimation,
    budgetCompatibility,
    proposedRent
  };
};