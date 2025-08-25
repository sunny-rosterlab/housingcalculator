export interface LoanCalculationInput {
  loanAmount: number;
  interestRate: number; // Annual interest rate as a percentage
  loanTermYears: number;
  repaymentFrequency: 'weekly' | 'fortnightly' | 'monthly';
}

export interface LoanCalculationResult {
  repaymentAmount: number;
  totalInterest: number;
  totalRepayment: number;
  numberOfPayments: number;
}

export function calculateLoanRepayments(input: LoanCalculationInput): LoanCalculationResult {
  const { loanAmount, interestRate, loanTermYears, repaymentFrequency } = input;
  
  // Convert annual interest rate to decimal
  const annualRate = interestRate / 100;
  
  // Calculate payment frequency and rate
  let paymentsPerYear: number;
  let periodRate: number;
  
  switch (repaymentFrequency) {
    case 'weekly':
      paymentsPerYear = 52;
      periodRate = annualRate / 52;
      break;
    case 'fortnightly':
      paymentsPerYear = 26;
      periodRate = annualRate / 26;
      break;
    case 'monthly':
      paymentsPerYear = 12;
      periodRate = annualRate / 12;
      break;
  }
  
  const numberOfPayments = loanTermYears * paymentsPerYear;
  
  // Calculate repayment using loan amortization formula
  // PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  let repaymentAmount: number;
  
  if (periodRate === 0) {
    // If no interest, simple division
    repaymentAmount = loanAmount / numberOfPayments;
  } else {
    const factor = Math.pow(1 + periodRate, numberOfPayments);
    repaymentAmount = loanAmount * (periodRate * factor) / (factor - 1);
  }
  
  // Calculate totals
  const totalRepayment = repaymentAmount * numberOfPayments;
  const totalInterest = totalRepayment - loanAmount;
  
  return {
    repaymentAmount: Math.round(repaymentAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    numberOfPayments
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-NZ').format(Math.round(amount));
}