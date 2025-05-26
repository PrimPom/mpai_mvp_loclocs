import { describe, expect, test } from '@jest/globals';
import { analyzeDebtRatio, calculateAverageUnitValue, calculateFeatureAdjustments, calculateGovernmentRent, calculateMonthlyDebts, calculateMonthlyInterest, calculateRentalEstimation, evaluateBudgetCompatibility, generateFinancialReport, PersonalFinances, PropertyData, PropertyFeatures } from './functions';

describe('Financial Evaluation Functions', () => {

  // Test data setup
  const mockPersonalFinances: PersonalFinances = {
    monthlyIncome: 5000,
    carPayment: 400,
    creditCardBalance: 2000,
    creditLineBalance: 1500
  };

  const mockPropertyData: PropertyData = {
    municipalValue: 500000,
    totalUnits: 10,
    annualTaxes: 12000,
    interestRateMin: 4.5,
    interestRateMax: 6.0
  };

  const mockPropertyFeatures: PropertyFeatures = {
    furnished: false,
    appliances: true,
    heatingIncluded: true,
    gymAccess: false,
    indoorParking: true,
    viewBalcony: false,
    recentRenovations: false,
    poorCondition: false
  };

  /**
   * Test suite for monthly debt calculation functionality
   * Validates debt payment calculations with different financial scenarios
   */
  describe('calculateMonthlyDebts', () => {
    
    /**
     * Test standard debt calculation with typical values
     * Should calculate 3% monthly payments for credit balances
     */
    test('should calculate monthly debts correctly with standard values', () => {
      const result = calculateMonthlyDebts(mockPersonalFinances);
      
      expect(result.carPayment).toBe(400);
      expect(result.creditCardPayment).toBe(60); // 2000 * 0.03
      expect(result.creditLinePayment).toBe(45); // 1500 * 0.03
      expect(result.totalMonthlyDebts).toBe(505);
    });

    /**
     * Test debt calculation with zero credit balances
     * Should handle zero values without errors
     */
    test('should handle zero credit balances', () => {
      const finances: PersonalFinances = {
        ...mockPersonalFinances,
        creditCardBalance: 0,
        creditLineBalance: 0
      };
      
      const result = calculateMonthlyDebts(finances);
      
      expect(result.creditCardPayment).toBe(0);
      expect(result.creditLinePayment).toBe(0);
      expect(result.totalMonthlyDebts).toBe(400);
    });

    /**
     * Test debt calculation with decimal values
     * Should properly round to 2 decimal places
     */
    test('should round calculations to 2 decimal places', () => {
      const finances: PersonalFinances = {
        ...mockPersonalFinances,
        creditCardBalance: 1234.56,
        creditLineBalance: 987.65
      };
      
      const result = calculateMonthlyDebts(finances);
      
      expect(result.creditCardPayment).toBe(37.04); // 1234.56 * 0.03 = 37.0368
      expect(result.creditLinePayment).toBe(29.63); // 987.65 * 0.03 = 29.6295
      expect(result.totalMonthlyDebts).toBe(466.67);
    });
  });

  /**
   * Test suite for debt ratio analysis functionality
   * Validates ratio calculations and category assignments
   */
  describe('analyzeDebtRatio', () => {
    
    /**
     * Test debt ratio analysis with standard income and debts
     * Should calculate correct ratio and assign appropriate category
     */
    test('should analyze debt ratio correctly with standard values', () => {
      const result = analyzeDebtRatio(5000, 500);
      
      expect(result.ratio).toBe(10); // (500/5000) * 100
      expect(result.category).toBe('excellent');
      expect(result.maxAffordableRent).toBe(1500); // (5000 * 0.40) - 500
    });

    /**
     * Test debt ratio analysis with proposed rent included
     * Should calculate total debt ratio including rent
     */
    test('should include proposed rent in ratio calculation', () => {
      const result = analyzeDebtRatio(5000, 500, 1200);
      
      expect(result.ratio).toBe(34); // ((1200 + 500)/5000) * 100
      expect(result.category).toBe('good');
      expect(result.maxAffordableRent).toBe(1500);
    });

    /**
     * Test debt ratio categorization boundaries
     * Should assign correct categories based on ratio thresholds
     */
    test('should categorize ratios correctly', () => {
      expect(analyzeDebtRatio(1000, 250).category).toBe('excellent'); // 25%
      expect(analyzeDebtRatio(1000, 350).category).toBe('good'); // 35%
      expect(analyzeDebtRatio(1000, 450).category).toBe('elevated'); // 45%
      expect(analyzeDebtRatio(1000, 550).category).toBe('critical'); // 55%
    });

    /**
     * Test debt ratio analysis with zero or negative income
     * Should handle edge cases gracefully
     */
    test('should handle zero or negative income', () => {
      const zeroIncomeResult = analyzeDebtRatio(0, 500);
      expect(zeroIncomeResult.ratio).toBe(0);
      expect(zeroIncomeResult.category).toBe('critical');
      expect(zeroIncomeResult.maxAffordableRent).toBe(0);

      const negativeIncomeResult = analyzeDebtRatio(-1000, 500);
      expect(negativeIncomeResult.category).toBe('critical');
      expect(negativeIncomeResult.maxAffordableRent).toBe(0);
    });
  });

  /**
   * Test suite for average unit value calculation
   * Validates property value distribution across units
   */
  describe('calculateAverageUnitValue', () => {
    
    /**
     * Test average unit value calculation with standard values
     * Should divide municipal value by total units correctly
     */
    test('should calculate average unit value correctly', () => {
      const result = calculateAverageUnitValue(500000, 10);
      expect(result).toBe(50000);
    });

    /**
     * Test average unit value with decimal results
     * Should round to 2 decimal places
     */
    test('should handle decimal results correctly', () => {
      const result = calculateAverageUnitValue(333333, 3);
      expect(result).toBe(111111);
    });

    /**
     * Test average unit value with invalid inputs
     * Should return 0 for zero or negative values
     */
    test('should handle invalid inputs', () => {
      expect(calculateAverageUnitValue(0, 10)).toBe(0);
      expect(calculateAverageUnitValue(100000, 0)).toBe(0);
      expect(calculateAverageUnitValue(-100000, 5)).toBe(0);
    });
  });

  /**
   * Test suite for monthly interest payment calculation
   * Validates mortgage payment calculations with different scenarios
   */
  describe('calculateMonthlyInterest', () => {
    
    /**
     * Test monthly interest calculation with standard mortgage parameters
     * Should calculate correct monthly payment using amortization formula
     */
    test('should calculate monthly interest correctly', () => {
      const result = calculateMonthlyInterest(50000, 5.0, 25);
      expect(result).toBeCloseTo(292.14, 2);
    });

    /**
     * Test monthly interest calculation with zero interest rate
     * Should handle zero interest rate as simple division
     */
    test('should handle zero interest rate', () => {
      const result = calculateMonthlyInterest(60000, 0, 25);
      expect(result).toBe(200); // 60000 / (25 * 12)
    });

    /**
     * Test monthly interest calculation with different amortization periods
     * Should adjust payment based on loan term
     */
    test('should handle different amortization periods', () => {
      const result15Years = calculateMonthlyInterest(50000, 5.0, 15);
      const result30Years = calculateMonthlyInterest(50000, 5.0, 30);
      
      expect(result15Years).toBeGreaterThan(result30Years);
    });

    /**
     * Test monthly interest calculation with invalid inputs
     * Should return 0 for invalid parameters
     */
    test('should handle invalid inputs', () => {
      expect(calculateMonthlyInterest(0, 5.0, 25)).toBe(0);
      expect(calculateMonthlyInterest(50000, -1, 25)).toBe(0);
      expect(calculateMonthlyInterest(50000, 5.0, 0)).toBe(0);
    });
  });

  /**
   * Test suite for government rent (tax) calculation
   * Validates monthly tax calculation per unit
   */
  describe('calculateGovernmentRent', () => {
    
    /**
     * Test government rent calculation with standard values
     * Should divide annual taxes by units and months correctly
     */
    test('should calculate government rent correctly', () => {
      const result = calculateGovernmentRent(12000, 10);
      expect(result).toBe(100); // (12000 / 10) / 12
    });

    /**
     * Test government rent calculation with decimal results
     * Should round to 2 decimal places
     */
    test('should handle decimal results', () => {
      const result = calculateGovernmentRent(13579, 7);
      expect(result).toBeCloseTo(161.65, 2);
    });

    /**
     * Test government rent calculation with zero taxes
     * Should handle zero annual taxes
     */
    test('should handle zero annual taxes', () => {
      const result = calculateGovernmentRent(0, 5);
      expect(result).toBe(0);
    });

    /**
     * Test government rent calculation with invalid inputs
     * Should return 0 for invalid parameters
     */
    test('should handle invalid inputs', () => {
      expect(calculateGovernmentRent(12000, 0)).toBe(0);
      expect(calculateGovernmentRent(-5000, 10)).toBe(0);
    });
  });

  /**
   * Test suite for property feature adjustments calculation
   * Validates rent adjustments based on amenities and conditions
   */
  describe('calculateFeatureAdjustments', () => {
    
    /**
     * Test feature adjustments with no features selected
     * Should return zero adjustment
     */
    test('should return zero for no features', () => {
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
      
      const result = calculateFeatureAdjustments(noFeatures);
      expect(result).toBe(0);
    });

    /**
     * Test feature adjustments with positive features
     * Should calculate correct positive adjustments
     */
    test('should calculate positive adjustments correctly', () => {
      const result = calculateFeatureAdjustments(mockPropertyFeatures);
      // appliances(75) + heatingIncluded(75) + indoorParking(125) = 275
      expect(result).toBe(275);
    });

    /**
     * Test feature adjustments with all premium features
     * Should calculate maximum positive adjustment
     */
    test('should calculate all premium features', () => {
      const premiumFeatures: PropertyFeatures = {
        furnished: true,
        appliances: true,
        heatingIncluded: true,
        gymAccess: true,
        indoorParking: true,
        viewBalcony: true,
        recentRenovations: true,
        poorCondition: false
      };
      
      const result = calculateFeatureAdjustments(premiumFeatures);
      // 225 + 75 + 75 + 100 + 125 + 75 + 100 = 775
      expect(result).toBe(775);
    });

    /**
     * Test feature adjustments with poor condition
     * Should apply negative adjustment for poor condition
     */
    test('should apply negative adjustment for poor condition', () => {
      const poorConditionFeatures: PropertyFeatures = {
        ...mockPropertyFeatures,
        poorCondition: true
      };
      
      const result = calculateFeatureAdjustments(poorConditionFeatures);
      // 275 - 125 = 150
      expect(result).toBe(150);
    });
  });

  /**
   * Test suite for complete rental estimation calculation
   * Validates comprehensive rent calculation including all factors
   */
  describe('calculateRentalEstimation', () => {
    
    /**
     * Test rental estimation with standard property data and features
     * Should calculate all components and provide min/max range
     */
    test('should calculate rental estimation correctly', () => {
      const result = calculateRentalEstimation(mockPropertyData, mockPropertyFeatures);
      
      expect(result.unitValue).toBe(50000);
      expect(result.governmentRent).toBe(100);
      expect(result.insurance).toBe(250);
      expect(result.featureAdjustments).toBe(275);
      expect(result.estimatedRentMin).toBeGreaterThan(0);
      expect(result.estimatedRentMax).toBeGreaterThan(result.estimatedRentMin);
    });

    /**
     * Test rental estimation with custom insurance amount
     * Should use provided insurance value instead of default
     */
    test('should use custom insurance amount', () => {
      const customInsurance = 300;
      const result = calculateRentalEstimation(mockPropertyData, mockPropertyFeatures, customInsurance);
      
      expect(result.insurance).toBe(customInsurance);
    });

    /**
     * Test rental estimation with minimal property features
     * Should calculate base rent without feature adjustments
     */
    test('should handle minimal features', () => {
      const minimalFeatures: PropertyFeatures = {
        furnished: false,
        appliances: false,
        heatingIncluded: false,
        gymAccess: false,
        indoorParking: false,
        viewBalcony: false,
        recentRenovations: false,
        poorCondition: false
      };
      
      const result = calculateRentalEstimation(mockPropertyData, minimalFeatures);
      expect(result.featureAdjustments).toBe(0);
    });
  });

  /**
   * Test suite for budget compatibility evaluation
   * Validates affordability analysis and risk assessment
   */
  describe('evaluateBudgetCompatibility', () => {
    
    /**
     * Test budget compatibility with affordable rent
     * Should indicate affordability and appropriate risk level
     */
    test('should evaluate affordable rent correctly', () => {
      const result = evaluateBudgetCompatibility(1500, 1200, 1400);
      
      expect(result.isAffordable).toBe(true);
      expect(result.overBudgetAmount).toBe(0);
      expect(result.recommendedMaxRent).toBe(1500);
      expect(result.riskLevel).toBe('medium'); // max rent > 90% of budget
    });

    /**
     * Test budget compatibility with low-risk scenario
     * Should indicate low risk when well within budget
     */
    test('should identify low risk scenarios', () => {
      const result = evaluateBudgetCompatibility(2000, 1500, 1600);
      
      expect(result.isAffordable).toBe(true);
      expect(result.riskLevel).toBe('low'); // max rent <= 90% of budget
    });

    /**
     * Test budget compatibility with unaffordable rent
     * Should calculate over-budget amount and high risk
     */
    test('should evaluate unaffordable rent correctly', () => {
      const result = evaluateBudgetCompatibility(1000, 1050, 1100);
      
      expect(result.isAffordable).toBe(false);
      expect(result.overBudgetAmount).toBe(50);
      expect(result.riskLevel).toBe('high'); // within 10% over budget
    });

    /**
     * Test budget compatibility with critical over-budget scenario
     * Should identify critical risk level for significant overages
     */
    test('should identify critical risk scenarios', () => {
      const result = evaluateBudgetCompatibility(1000, 1200, 1300);
      
      expect(result.isAffordable).toBe(false);
      expect(result.overBudgetAmount).toBe(200);
      expect(result.riskLevel).toBe('critical'); // >10% over budget
    });
  });

  /**
   * Test suite for comprehensive financial report generation
   * Validates integration of all calculation functions
   */
  describe('generateFinancialReport', () => {
    
    /**
     * Test complete financial report generation with standard inputs
     * Should integrate all calculations and provide comprehensive analysis
     */
    test('should generate complete financial report', () => {
      const result = generateFinancialReport(
        mockPersonalFinances,
        mockPropertyData,
        mockPropertyFeatures
      );
      
      expect(result.personalFinances).toEqual(mockPersonalFinances);
      expect(result.debtCalculation).toBeDefined();
      expect(result.ratioAnalysis).toBeDefined();
      expect(result.rentalEstimation).toBeDefined();
      expect(result.budgetCompatibility).toBeDefined();
      expect(result.proposedRent).toBeUndefined();
    });

    /**
     * Test financial report generation with proposed rent
     * Should include proposed rent in analysis calculations
     */
    test('should include proposed rent in analysis', () => {
      const proposedRent = 1200;
      const result = generateFinancialReport(
        mockPersonalFinances,
        mockPropertyData,
        mockPropertyFeatures,
        proposedRent
      );
      
      expect(result.proposedRent).toBe(proposedRent);
      expect(result.ratioAnalysis.ratio).toBeGreaterThan(0);
    });

    /**
     * Test financial report data consistency
     * Should ensure all calculated values are consistent across components
     */
    test('should maintain data consistency across calculations', () => {
      const result = generateFinancialReport(
        mockPersonalFinances,
        mockPropertyData,
        mockPropertyFeatures
      );
      
      // Verify debt calculation consistency
      expect(result.debtCalculation.totalMonthlyDebts).toBe(
        result.debtCalculation.carPayment +
        result.debtCalculation.creditCardPayment +
        result.debtCalculation.creditLinePayment
      );
      
      // Verify rental estimation consistency
      expect(result.rentalEstimation.estimatedRentMax).toBeGreaterThanOrEqual(
        result.rentalEstimation.estimatedRentMin
      );
      
      // Verify budget compatibility uses correct max affordable rent
      expect(result.budgetCompatibility.recommendedMaxRent).toBe(
        result.ratioAnalysis.maxAffordableRent
      );
    });
  });
});