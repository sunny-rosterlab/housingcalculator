export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateLoanAmount(amount: number): ValidationResult {
  if (amount <= 0) {
    return { isValid: false, error: 'Loan amount must be greater than 0' };
  }
  if (amount > 10000000) {
    return { isValid: false, error: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(rate: number): ValidationResult {
  if (rate < 0) {
    return { isValid: false, error: 'Interest rate cannot be negative' };
  }
  if (rate > 20) {
    return { isValid: false, error: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(years: number): ValidationResult {
  if (years <= 0) {
    return { isValid: false, error: 'Loan term must be at least 1 year' };
  }
  if (years > 30) {
    return { isValid: false, error: 'Loan term cannot exceed 30 years' };
  }
  if (!Number.isInteger(years)) {
    return { isValid: false, error: 'Loan term must be a whole number of years' };
  }
  return { isValid: true };
}