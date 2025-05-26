export interface MonthlyIncomes {
  preTaxSalary: number;
  alimonyReceived: number;
  familyBenefits: number;
  others: number;
}

export interface MonthlyLoans {
  personal: number;
  student: number;
  other: number;
}

export interface AutoExpenses {
  car: number;
  other: number;
}

export interface Credits {
  card: number;
  line: number;
}

export interface PersonalFinances {
  monthlyIncomes: MonthlyIncomes;
  autoExpenses: AutoExpenses;
  credits: Credits;
  monthlyLoans: MonthlyLoans;
}

export interface DebtCalculation {
  autoPayment: number;
  creditCardPayment: number;
  creditLinePayment: number;
  totalMonthlyDebts: number;
}

export interface RatioAnalysis {
  ratio: number;
  category: "excellent" | "good" | "elevated" | "critical";
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
  bankRentMin: number;
  bankRentMax: number;
  governmentRent: number;
  insurance: number;
  featureAdjustments: number;
  estimatedRentMin: number;
  estimatedRentMax: number;
}
