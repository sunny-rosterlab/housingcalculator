import React, { useState, useEffect } from 'react';
import { calculateLoanRepayments, formatCurrency, formatNumber, LoanCalculationInput, LoanCalculationResult } from '../utils/loanCalculations';
import './LoanCalculator.css';

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('500000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTermYears, setLoanTermYears] = useState<string>('30');
  const [repaymentFrequency, setRepaymentFrequency] = useState<'weekly' | 'fortnightly' | 'monthly'>('fortnightly');
  const [result, setResult] = useState<LoanCalculationResult | null>(null);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTermYears, repaymentFrequency]);

  const calculateLoan = () => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTermYears) || 0;

    if (amount > 0 && rate >= 0 && years > 0) {
      const input: LoanCalculationInput = {
        loanAmount: amount,
        interestRate: rate,
        loanTermYears: years,
        repaymentFrequency
      };
      
      const calculationResult = calculateLoanRepayments(input);
      setResult(calculationResult);
    }
  };

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setLoanAmount(numericValue);
  };

  return (
    <div className="loan-calculator">
      <h1>Home Loan Calculator</h1>
      <p className="description">Calculate your home loan repayments and see how much interest you'll pay over the life of your loan.</p>
      
      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount</label>
          <div className="input-wrapper">
            <span className="currency-prefix">$</span>
            <input
              type="text"
              id="loanAmount"
              value={formatNumber(parseFloat(loanAmount) || 0)}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="500,000"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="interestRate">Interest Rate</label>
          <div className="input-wrapper">
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="6.5"
              step="0.1"
              min="0"
              max="20"
            />
            <span className="percentage-suffix">%</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">Loan Term</label>
          <div className="input-wrapper">
            <input
              type="number"
              id="loanTerm"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(e.target.value)}
              placeholder="30"
              min="1"
              max="30"
            />
            <span className="years-suffix">years</span>
          </div>
        </div>

        <div className="form-group">
          <label>Repayment Frequency</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="frequency"
                value="weekly"
                checked={repaymentFrequency === 'weekly'}
                onChange={() => setRepaymentFrequency('weekly')}
              />
              Weekly
            </label>
            <label>
              <input
                type="radio"
                name="frequency"
                value="fortnightly"
                checked={repaymentFrequency === 'fortnightly'}
                onChange={() => setRepaymentFrequency('fortnightly')}
              />
              Fortnightly
            </label>
            <label>
              <input
                type="radio"
                name="frequency"
                value="monthly"
                checked={repaymentFrequency === 'monthly'}
                onChange={() => setRepaymentFrequency('monthly')}
              />
              Monthly
            </label>
          </div>
        </div>
      </div>

      {result && (
        <div className="results">
          <h2>Your Results</h2>
          <div className="result-card">
            <div className="result-item main-result">
              <span className="label">Your {repaymentFrequency} repayments</span>
              <span className="value">{formatCurrency(result.repaymentAmount)}</span>
            </div>
            <div className="result-item">
              <span className="label">Total interest paid</span>
              <span className="value">{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className="result-item">
              <span className="label">Total amount to repay</span>
              <span className="value">{formatCurrency(result.totalRepayment)}</span>
            </div>
            <div className="result-item">
              <span className="label">Number of payments</span>
              <span className="value">{result.numberOfPayments}</span>
            </div>
          </div>
          
          <div className="disclaimer">
            <p><strong>Important:</strong> This calculator provides estimates only. Actual repayments may vary based on fees, charges, and interest rate changes. Contact your lender for a formal quote.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;