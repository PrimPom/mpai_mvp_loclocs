import { analyzeDebtRatio, calculateAverageUnitValue, calculateFeatureAdjustments, calculateGovernmentRent, calculateMonthlyDebts, calculateMonthlyInterest, calculateRentalEstimation, PersonalFinances, PropertyData, PropertyFeatures } from "@/lib/functions";
import { describe, expect, it } from "@jest/globals";


describe('Financial Calculations Test Suite', () => {
  
  /**
   * Test suite for calculateMonthlyDebts function
   * Validates calculation of monthly debt payments based on financial profile
   */
  describe('calculateMonthlyDebts', () => {
    const mockFinances: PersonalFinances = {
      monthlyIncome: 5000,
      carPayment: 400,
      creditCardBalance: 10000,
      creditLineBalance: 5000
    };

    /**
     * Test standard debt calculation with typical values
     */
    it('should calculate monthly debts correctly with standard values', () => {
      const result = calculateMonthlyDebts(mockFinances);
      
      expect(result.carPayment).toBe(400);
      expect(result.creditCardPayment).toBe(300); // 10000 * 0.03
      expect(result.creditLinePayment).toBe(150); // 5000 * 0.03
      expect(result.totalMonthlyDebts).toBe(850); // 400 + 300 + 150
    });

    /**
     * Test calculation with zero balances
     */
    it('should handle zero credit card and line balances', () => {
      const financesWithZeroBalances: PersonalFinances = {
        ...mockFinances,
        creditCardBalance: 0,
        creditLineBalance: 0
      };
      
      const result = calculateMonthlyDebts(financesWithZeroBalances);
      
      expect(result.creditCardPayment).toBe(0);
      expect(result.creditLinePayment).toBe(0);
      expect(result.totalMonthlyDebts).toBe(400); // Only car payment
    });

    /**
     * Test rounding precision for debt calculations
     */
    it('should round payments to 2 decimal places', () => {
      const financesWithOddBalances: PersonalFinances = {
        ...mockFinances,
        creditCardBalance: 3333.33,
        creditLineBalance: 6666.67
      };
      
      const result = calculateMonthlyDebts(financesWithOddBalances);
      
      expect(result.creditCardPayment).toBe(100); // 3333.33 * 0.03 = 100
      expect(result.creditLinePayment).toBe(200); // 6666.67 * 0.03 = 200.0001 → 200
      expect(result.totalMonthlyDebts).toBe(700);
    });
  });

  /**
   * Test suite for analyzeDebtRatio function
   * Validates debt ratio analysis and payment capacity determination
   */
  describe('analyzeDebtRatio', () => {
    /**
     * Test excellent debt ratio category (< 30%)
     */
    it('should categorize excellent debt ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 1000); // 20% ratio
      
      expect(result.ratio).toBe(20);
      expect(result.category).toBe('excellent');
      expect(result.maxAffordableRent).toBe(1000); // (5000 * 0.40) - 1000
    });

    /**
     * Test good debt ratio category (30-39%)
     */
    it('should categorize good debt ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 1500); // 30% ratio
      
      expect(result.ratio).toBe(30);
      expect(result.category).toBe('good');
      expect(result.maxAffordableRent).toBe(500); // (5000 * 0.40) - 1500
    });

    /**
     * Test elevated debt ratio category (40-49%)
     */
    it('should categorize elevated debt ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 2000); // 40% ratio
      
      expect(result.ratio).toBe(40);
      expect(result.category).toBe('elevated');
      expect(result.maxAffordableRent).toBe(0); // (5000 * 0.40) - 2000 = 0
    });

    /**
     * Test critical debt ratio category (≥ 50%)
     */
    it('should categorize critical debt ratio correctly', () => {
      const result = analyzeDebtRatio(5000, 2500); // 50% ratio
      
      expect(result.ratio).toBe(50);
      expect(result.category).toBe('critical');
      expect(result.maxAffordableRent).toBe(0); // Negative value should be 0
    });

    /**
     * Test debt ratio calculation with proposed rent
     */
    it('should calculate ratio including proposed rent', () => {
      const result = analyzeDebtRatio(5000, 1000, 1500); // (1000 + 1500) / 5000 = 50%
      
      expect(result.ratio).toBe(50);
      expect(result.category).toBe('critical');
    });

    /**
     * Test maximum affordable rent calculation edge cases
     */
    it('should not return negative affordable rent', () => {
      const result = analyzeDebtRatio(3000, 2000); // Would result in negative affordable rent
      
      expect(result.maxAffordableRent).toBe(0);
    });
  });

  /**
   * Test suite for calculateAverageUnitValue function
   * Validates average value per unit calculation based on municipal assessment
   */
  describe('calculateAverageUnitValue', () => {
    /**
     * Test standard unit value calculation
     */
    it('should calculate average unit value correctly', () => {
      const result = calculateAverageUnitValue(1000000, 10);
      
      expect(result).toBe(100000);
    });

    /**
     * Test calculation with decimal result
     */
    it('should round unit value to 2 decimal places', () => {
      const result = calculateAverageUnitValue(1000000, 3);
      
      expect(result).toBe(333333.33); // 1000000 / 3 rounded to 2 decimals
    });

    /**
     * Test edge case with zero or negative units
     */
    it('should return 0 for zero or negative units', () => {
      expect(calculateAverageUnitValue(1000000, 0)).toBe(0);
      expect(calculateAverageUnitValue(1000000, -5)).toBe(0);
    });
  });

  /**
   * Test suite for calculateMonthlyInterest function
   * Validates monthly interest payment calculation (bank rent)
   */
  describe('calculateMonthlyInterest', () => {
    /**
     * Test standard mortgage payment calculation
     */
    it('should calculate monthly interest payment correctly', () => {
      const result = calculateMonthlyInterest(300000, 5, 25);
      
      // Expected monthly payment for $300,000 at 5% over 25 years
      expect(result).toBeCloseTo(1744.59, 2);
    });

    /**
     * Test calculation with different amortization period
     */
    it('should calculate correctly with 30-year amortization', () => {
      const result = calculateMonthlyInterest(300000, 5, 30);
      
      // 30-year amortization should result in lower monthly payment
      expect(result).toBeCloseTo(1610.46, 2);
      expect(result).toBeLessThan(calculateMonthlyInterest(300000, 5, 25));
    });

    /**
     * Test edge cases with zero values
     */
    it('should return 0 for zero property value or interest rate', () => {
      expect(calculateMonthlyInterest(0, 5)).toBe(0);
      expect(calculateMonthlyInterest(300000, 0)).toBe(0);
    });

    /**
     * Test high interest rate calculation
     */
    it('should handle high interest rates correctly', () => {
      const result = calculateMonthlyInterest(300000, 10, 25);
      
      expect(result).toBeGreaterThan(calculateMonthlyInterest(300000, 5, 25));
      expect(result).toBeCloseTo(2726.49, 2);
    });
  });

  /**
   * Test suite for calculateGovernmentRent function
   * Validates monthly taxes per unit calculation
   */
  describe('calculateGovernmentRent', () => {
    /**
     * Test standard government rent calculation
     */
    it('should calculate monthly taxes per unit correctly', () => {
      const result = calculateGovernmentRent(12000, 4); // $12,000 annual taxes, 4 units
      
      expect(result).toBe(250); // (12000 / 4) / 12 = 250
    });

    /**
     * Test calculation with decimal result
     */
    it('should round government rent to 2 decimal places', () => {
      const result = calculateGovernmentRent(10000, 3); // Should result in decimal
      
      expect(result).toBe(277.78); // (10000 / 3) / 12 rounded
    });

    /**
     * Test edge case with zero units
     */
    it('should return 0 for zero units', () => {
      const result = calculateGovernmentRent(12000, 0);
      
      expect(result).toBe(0);
    });
  });

  /**
   * Test suite for calculateFeatureAdjustments function
   * Validates price adjustments based on property features
   */
  describe('calculateFeatureAdjustments', () => {
    /**
     * Test no features selected
     */
    it('should return 0 when no features are selected', () => {
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

    /**
     * Test all positive features selected
     */
    it('should calculate correct adjustment for all positive features', () => {
      const features: PropertyFeatures = {
        furnished: true,
        appliances: true,
        heatingIncluded: true,
        gymAccess: true,
        indoorParking: true,
        viewBalcony: true,
        recentRenovations: true,
        poorCondition: false
      };
      
      const result = calculateFeatureAdjustments(features);
      
      // 225 + 75 + 75 + 100 + 125 + 75 + 100 = 775
      expect(result).toBe(775);
    });

    /**
     * Test poor condition feature (negative adjustment)
     */
    it('should apply negative adjustment for poor condition', () => {
      const features: PropertyFeatures = {
        furnished: false,
        appliances: false,
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: false,
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: true
      };
      
      const result = calculateFeatureAdjustments(features);
      
      expect(result).toBe(-125);
    });

    /**
     * Test mixed positive and negative features
     */
    it('should calculate net adjustment with mixed features', () => {
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

  /**
   * Test suite for calculateRentalEstimation function
   * Validates complete rental estimation with price range
   */
  describe('calculateRentalEstimation', () => {
    const mockPropertyData: PropertyData = {
      municipalValue: 2000000,
      totalUnits: 10,
      annualTaxes: 24000,
      interestRateMin: 4,
      interestRateMax: 6
    };

    const mockFeatures: PropertyFeatures = {
      furnished: true,
      appliances: false,
      heatingIncluded: true,
      gymAccess: false,
      indoorParking: false,
      viewBalcony: false,
      recentRenovations: false,
      poorCondition: false
    };

    /**
     * Test complete rental estimation calculation
     */
    it('should calculate complete rental estimation correctly', () => {
      const result = calculateRentalEstimation(mockPropertyData, mockFeatures);
      
      // Unit value: 2000000 / 10 = 200000
      // Bank rent min: ~1162.24 (200000 at 4% over 25 years)
      // Bank rent max: ~1279.68 (200000 at 6% over 25 years)
      // Government rent: (24000 / 10) / 12 = 200
      // Insurance: 250 (fixed)
      // Feature adjustments: 225 + 75 = 300 (furnished + heating)
      
      expect(result.bankRentMin).toBeCloseTo(1162.24, 2);
      expect(result.bankRentMax).toBeCloseTo(1279.68, 2);
      expect(result.governmentRent).toBe(200);
      expect(result.insurance).toBe(250);
      expect(result.featureAdjustments).toBe(300);
      expect(result.estimatedRentMin).toBeCloseTo(1912.24, 2);
      expect(result.estimatedRentMax).toBeCloseTo(2029.68, 2);
    });

    /**
     * Test estimation with no features
     */
    it('should calculate estimation with no additional features', () => {
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
      
      const result = calculateRentalEstimation(mockPropertyData, noFeatures);
      
      expect(result.featureAdjustments).toBe(0);
      // Base rent should be bank rent + government rent + insurance
      expect(result.estimatedRentMin).toBeCloseTo(1612.24, 2);
      expect(result.estimatedRentMax).toBeCloseTo(1729.68, 2);
    });

    /**
     * Test estimation with poor condition
     */
    it('should reduce estimation for poor condition property', () => {
      const poorConditionFeatures: PropertyFeatures = {
        furnished: false,
        appliances: false,
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: false,
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: true
      };
      
      const result = calculateRentalEstimation(mockPropertyData, poorConditionFeatures);
      
      expect(result.featureAdjustments).toBe(-125);
      expect(result.estimatedRentMin).toBeCloseTo(1487.24, 2);
      expect(result.estimatedRentMax).toBeCloseTo(1604.68, 2);
    });
  });
});
