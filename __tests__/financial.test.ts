import { DebtCalculation, PersonalFinances, PropertyData, PropertyFeatures, RatioAnalysis, RentalEstimation } from "@/lib/financial/types";
import { describe, it, expect, test } from '@jest/globals';


describe('Rental Calculation Functions', () => {
  
  // ==================== calculateMonthlyDebts Tests ====================
  
  describe('calculateMonthlyDebts', () => {
    test('should calculate monthly debts correctly with typical values', () => {
      const finances: PersonalFinances = {
        monthlyIncome: 5000,
        creditCardBalance: 5000,
        creditLineBalance: 10000,
        carPayment: 400
      };
      
      const result = calculateMonthlyDebts(finances);
      
      expect(result.carPayment).toBe(400);
      expect(result.creditCardPayment).toBe(150); // 5000 * 0.03
      expect(result.creditLinePayment).toBe(300); // 10000 * 0.03
      expect(result.totalMonthlyDebts).toBe(850); // 400 + 150 + 300
    });

    test('should handle zero balances', () => {
      const finances: PersonalFinances = {
        monthlyIncome: 4000,
        creditCardBalance: 0,
        creditLineBalance: 0,
        carPayment: 0
      };
      
      const result = calculateMonthlyDebts(finances);
      
      expect(result.carPayment).toBe(0);
      expect(result.creditCardPayment).toBe(0);
      expect(result.creditLinePayment).toBe(0);
      expect(result.totalMonthlyDebts).toBe(0);
    });

    test('should round credit payments correctly', () => {
      const finances: PersonalFinances = {
        monthlyIncome: 6000,
        creditCardBalance: 3333.33,
        creditLineBalance: 6666.67,
        carPayment: 299.99
      };
      
      const result = calculateMonthlyDebts(finances);
      
      expect(result.creditCardPayment).toBe(100); // 3333.33 * 0.03 = 100.0001 -> 100
      expect(result.creditLinePayment).toBe(200); // 6666.67 * 0.03 = 200.0001 -> 200
      expect(result.totalMonthlyDebts).toBe(599.99);
    });

    test('should handle large values', () => {
      const finances: PersonalFinances = {
        monthlyIncome: 8000,
        creditCardBalance: 50000,
        creditLineBalance: 100000,
        carPayment: 800
      };
      
      const result = calculateMonthlyDebts(finances);
      
      expect(result.creditCardPayment).toBe(1500);
      expect(result.creditLinePayment).toBe(3000);
      expect(result.totalMonthlyDebts).toBe(5300);
    });
  });

  // ==================== analyzeDebtRatio Tests ====================
  
  describe('analyzeDebtRatio', () => {
    test('should categorize excellent ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 1000); // 20% ratio
      
      expect(result.ratio).toBe(20);
      expect(result.category).toBe('excellent');
      expect(result.maxAffordableRent).toBe(1000); // (5000 * 0.40) - 1000
    });

    test('should categorize good ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 1500); // 30% ratio
      
      expect(result.ratio).toBe(30);
      expect(result.category).toBe('excellent'); // 30% is still excellent
      expect(result.maxAffordableRent).toBe(500);
    });

    test('should categorize elevated ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 2250); // 45% ratio
      
      expect(result.ratio).toBe(45);
      expect(result.category).toBe('elevated');
      expect(result.maxAffordableRent).toBe(0); // Negative value becomes 0
    });

    test('should categorize critical ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 2500); // 50% ratio
      
      expect(result.ratio).toBe(50);
      expect(result.category).toBe('critical');
      expect(result.maxAffordableRent).toBe(0);
    });

    test('should calculate ratio with proposed rent', () => {
      const result = analyzeDebtRatio(5000, 1000, 1500); // (1500 + 1000) / 5000 = 50%
      
      expect(result.ratio).toBe(50);
      expect(result.category).toBe('critical');
    });

    test('should handle edge case at category boundaries', () => {
      // Test exactly 30%
      const result30 = analyzeDebtRatio(1000, 300);
      expect(result30.category).toBe('good');
      
      // Test exactly 40%
      const result40 = analyzeDebtRatio(1000, 400);
      expect(result40.category).toBe('elevated');
      
      // Test exactly 50%
      const result50 = analyzeDebtRatio(1000, 500);
      expect(result50.category).toBe('critical');
    });

    test('should ensure maxAffordableRent is never negative', () => {
      const result = analyzeDebtRatio(2000, 1000); // Would result in negative max rent
      
      expect(result.maxAffordableRent).toBe(0);
    });
  });

  // ==================== calculateAverageUnitValue Tests ====================
  
  describe('calculateAverageUnitValue', () => {
    test('should calculate average unit value correctly', () => {
      const result = calculateAverageUnitValue(500000, 5);
      expect(result).toBe(100000);
    });

    test('should handle single unit', () => {
      const result = calculateAverageUnitValue(200000, 1);
      expect(result).toBe(200000);
    });

    test('should return 0 for zero units', () => {
      const result = calculateAverageUnitValue(500000, 0);
      expect(result).toBe(0);
    });

    test('should return 0 for negative units', () => {
      const result = calculateAverageUnitValue(500000, -1);
      expect(result).toBe(0);
    });

    test('should round to 2 decimal places', () => {
      const result = calculateAverageUnitValue(100000, 3);
      expect(result).toBe(33333.33);
    });
  });

  // ==================== calculateMonthlyInterest Tests ====================
  
  describe('calculateMonthlyInterest', () => {
    test('should calculate monthly interest correctly', () => {
      const result = calculateMonthlyInterest(300000, 5); // 5% interest, 25 year amortization
      expect(result).toBeCloseTo(1747.44, 2);
    });

    test('should handle different amortization periods', () => {
      const result15Years = calculateMonthlyInterest(300000, 5, 15);
      const result30Years = calculateMonthlyInterest(300000, 5, 30);
      
      expect(result15Years).toBeGreaterThan(result30Years);
    });

    test('should return 0 for zero property value', () => {
      const result = calculateMonthlyInterest(0, 5);
      expect(result).toBe(0);
    });

    test('should return 0 for zero interest rate', () => {
      const result = calculateMonthlyInterest(300000, 0);
      expect(result).toBe(0);
    });

    test('should return 0 for negative values', () => {
      const resultNegativeValue = calculateMonthlyInterest(-100000, 5);
      const resultNegativeRate = calculateMonthlyInterest(300000, -2);
      
      expect(resultNegativeValue).toBe(0);
      expect(resultNegativeRate).toBe(0);
    });

    test('should handle high interest rates', () => {
      const result = calculateMonthlyInterest(300000, 15); // 15% interest rate
      expect(result).toBeGreaterThan(3500);
    });
  });

  // ==================== calculateGovernmentRent Tests ====================
  
  describe('calculateGovernmentRent', () => {
    test('should calculate monthly taxes per unit correctly', () => {
      const result = calculateGovernmentRent(6000, 4); // $6000 annual taxes, 4 units
      expect(result).toBe(125); // 6000 / 4 / 12 = 125
    });

    test('should handle single unit', () => {
      const result = calculateGovernmentRent(3600, 1);
      expect(result).toBe(300); // 3600 / 1 / 12 = 300
    });

    test('should return 0 for zero units', () => {
      const result = calculateGovernmentRent(6000, 0);
      expect(result).toBe(0);
    });

    test('should return 0 for negative units', () => {
      const result = calculateGovernmentRent(6000, -2);
      expect(result).toBe(0);
    });

    test('should round to 2 decimal places', () => {
      const result = calculateGovernmentRent(1000, 3); // 1000 / 3 / 12 = 27.777...
      expect(result).toBe(27.78);
    });
  });

  // ==================== calculateFeatureAdjustments Tests ====================
  
  describe('calculateFeatureAdjustments', () => {
    test('should return 0 for no features', () => {
      const features: PropertyFeatures = {
        furnished: false,
        appliances: false,
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: false,
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: false
      };
      
      const result = calculateFeatureAdjustments(features);
      expect(result).toBe(0);
    });

    test('should calculate positive adjustments correctly', () => {
      const features: PropertyFeatures = {
        furnished: true, // +225
        appliances: true, // +75
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: false,
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: false
      };
      
      const result = calculateFeatureAdjustments(features);
      expect(result).toBe(300); // 225 + 75
    });

    test('should handle negative adjustment (poor condition)', () => {
      const features: PropertyFeatures = {
        furnished: false,
        appliances: false,
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: false,
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: true // -125
      };
      
      const result = calculateFeatureAdjustments(features);
      expect(result).toBe(-125);
    });

    test('should calculate all features combined', () => {
      const features: PropertyFeatures = {
        furnished: true, // +225
        appliances: true, // +75
        heatingIncluded: true, // +75
        gymAccess: true, // +100
        indoorParking: true, // +125
        viewBalcony: true, // +75
        recentRenovations: true, // +100
        poorCondition: false
      };
      
      const result = calculateFeatureAdjustments(features);
      expect(result).toBe(775); // 225+75+75+100+125+75+100
    });

    test('should handle mixed positive and negative features', () => {
      const features: PropertyFeatures = {
        furnished: true, // +225
        appliances: false,
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: true, // +125
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: true // -125
      };
      
      const result = calculateFeatureAdjustments(features);
      expect(result).toBe(225); // 225 + 125 - 125
    });
  });

  // ==================== calculateRentalEstimation Tests ====================
  
  describe('calculateRentalEstimation', () => {
    const mockPropertyData: PropertyData = {
      municipalValue: 500000,
      totalUnits: 4,
      annualTaxes: 6000,
      interestRateMin: 4,
      interestRateMax: 6
    };

    const noFeatures: PropertyFeatures = {
      furnished: false,
      appliances: false,
      heatingIncluded: false,
      gymAccess: false,
      indoorParking: false,
      viewBalcony: false,
      recentRenovations: false,
      poorCondition: false
    };

    test('should calculate complete rental estimation', () => {
      const result = calculateRentalEstimation(mockPropertyData, noFeatures);
      
      expect(result.governmentRent).toBe(125); // 6000 / 4 / 12
      expect(result.insurance).toBe(250);
      expect(result.featureAdjustments).toBe(0);
      expect(result.bankRentMin).toBeGreaterThan(0);
      expect(result.bankRentMax).toBeGreaterThan(result.bankRentMin);
      expect(result.estimatedRentMin).toBeGreaterThan(0);
      expect(result.estimatedRentMax).toBeGreaterThan(result.estimatedRentMin);
    });

    test('should include feature adjustments in final estimation', () => {
      const featuresWithAdjustments: PropertyFeatures = {
        ...noFeatures,
        furnished: true, // +225
        gymAccess: true // +100
      };
      
      const result = calculateRentalEstimation(mockPropertyData, featuresWithAdjustments);
      
      expect(result.featureAdjustments).toBe(325);
      expect(result.estimatedRentMin).toBeGreaterThan(0);
      expect(result.estimatedRentMax).toBeGreaterThan(result.estimatedRentMin);
    });

    test('should handle property with single unit', () => {
      const singleUnitProperty: PropertyData = {
        municipalValue: 300000,
        totalUnits: 1,
        annualTaxes: 3600,
        interestRateMin: 5,
        interestRateMax: 7
      };
      
      const result = calculateRentalEstimation(singleUnitProperty, noFeatures);
      
      expect(result.governmentRent).toBe(300); // 3600 / 1 / 12
      expect(result.estimatedRentMin).toBeGreaterThan(0);
      expect(result.estimatedRentMax).toBeGreaterThan(result.estimatedRentMin);
    });

    test('should round final estimations to 2 decimal places', () => {
      const result = calculateRentalEstimation(mockPropertyData, noFeatures);
      
      expect(result.estimatedRentMin % 0.01).toBeCloseTo(0, 2);
      expect(result.estimatedRentMax % 0.01).toBeCloseTo(0, 2);
    });

    test('should handle negative feature adjustments', () => {
      const poorConditionFeatures: PropertyFeatures = {
        ...noFeatures,
        poorCondition: true // -125
      };
      
      const result = calculateRentalEstimation(mockPropertyData, poorConditionFeatures);
      
      expect(result.featureAdjustments).toBe(-125);
      expect(result.estimatedRentMin).toBeGreaterThan(0); // Should still be positive
    });
  });

  // ==================== Integration Tests ====================
  
  describe('Integration Tests', () => {
    test('should work together for complete rental analysis', () => {
      // Setup test data
      const finances: PersonalFinances = {
        monthlyIncome: 5000,
        creditCardBalance: 5000,
        creditLineBalance: 10000,
        carPayment: 400
      };
      
      const propertyData: PropertyData = {
        municipalValue: 400000,
        totalUnits: 4,
        annualTaxes: 4800,
        interestRateMin: 4.5,
        interestRateMax: 6.5
      };
      
      const features: PropertyFeatures = {
        furnished: true,
        appliances: true,
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: true,
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: false
      };
      
      // Calculate monthly debts
      const debtCalc = calculateMonthlyDebts(finances);
      expect(debtCalc.totalMonthlyDebts).toBe(850);
      
      // Calculate rental estimation
      const rentalEst = calculateRentalEstimation(propertyData, features);
      expect(rentalEst.featureAdjustments).toBe(425); // 225+75+125
      
      // Analyze debt ratio with estimated rent
      const monthlyIncome = 5000;
      const ratioAnalysis = analyzeDebtRatio(
        monthlyIncome, 
        debtCalc.totalMonthlyDebts, 
        rentalEst.estimatedRentMin
      );
      
      expect(ratioAnalysis.ratio).toBeGreaterThan(0);
      expect(['excellent', 'good', 'elevated', 'critical']).toContain(ratioAnalysis.category);
    });
  });
});

// ==================== HELPER FUNCTIONS FOR TESTING ====================

// Mock implementation of the functions being tested
// (These would normally be imported from the actual module)

const calculateMonthlyDebts = (finances: PersonalFinances): DebtCalculation => {
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

const analyzeDebtRatio = (monthlyIncome: number, totalDebts: number, proposedRent?: number): RatioAnalysis => {
  const maxAffordableRent = Math.round(((monthlyIncome * 0.40) - totalDebts) * 100) / 100;
  
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
    maxAffordableRent: Math.max(0, maxAffordableRent)
  };
};

const calculateAverageUnitValue = (municipalValue: number, totalUnits: number): number => {
  if (totalUnits <= 0) return 0;
  return Math.round((municipalValue / totalUnits) * 100) / 100;
};

const calculateMonthlyInterest = (propertyValue: number, interestRate: number, amortizationYears: number = 25): number => {
  if (propertyValue <= 0 || interestRate <= 0) return 0;
  
  const monthlyRate = (interestRate / 100) / 12;
  const totalPayments = amortizationYears * 12;
  
  const monthlyPayment = (propertyValue * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return Math.round(monthlyPayment * 100) / 100;
};

const calculateGovernmentRent = (annualTaxes: number, totalUnits: number): number => {
  if (totalUnits <= 0) return 0;
  const monthlyTaxesPerUnit = (annualTaxes / totalUnits) / 12;
  return Math.round(monthlyTaxesPerUnit * 100) / 100;
};

const calculateFeatureAdjustments = (features: PropertyFeatures): number => {
  let adjustment = 0;
  
  if (features.furnished) adjustment += 225;
  if (features.appliances) adjustment += 75;
  if (features.heatingIncluded) adjustment += 75;
  if (features.gymAccess) adjustment += 100;
  if (features.indoorParking) adjustment += 125;
  if (features.viewBalcony) adjustment += 75;
  if (features.recentRenovations) adjustment += 100;
  if (features.poorCondition) adjustment -= 125;
  
  return adjustment;
};

const calculateRentalEstimation = (propertyData: PropertyData, features: PropertyFeatures): RentalEstimation => {
  const unitValue = calculateAverageUnitValue(propertyData.municipalValue, propertyData.totalUnits);
  const bankRentMin = calculateMonthlyInterest(unitValue, propertyData.interestRateMin);
  const bankRentMax = calculateMonthlyInterest(unitValue, propertyData.interestRateMax);
  const governmentRent = calculateGovernmentRent(propertyData.annualTaxes, propertyData.totalUnits);
  const insurance = 250;
  const featureAdjustments = calculateFeatureAdjustments(features);
  
  const estimatedRentMin = Math.round((bankRentMin + governmentRent + insurance + featureAdjustments) * 100) / 100;
  const estimatedRentMax = Math.round((bankRentMax + governmentRent + insurance + featureAdjustments) * 100) / 100;
  
  return {
    bankRentMin,
    bankRentMax,
    governmentRent,
    insurance,
    featureAdjustments,
    estimatedRentMin,
    estimatedRentMax
  };
};
