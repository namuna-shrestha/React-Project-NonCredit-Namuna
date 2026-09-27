import { useState, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.jsx';

function formatCurrency(value) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

function MonthlySummary({ transactions }) {
  const [budget, setBudget] = useLocalStorage('expense-tracker-budget', 0);
  const [budgetInput, setBudgetInput] = useState(budget || '');
  const [isOverBudget, setIsOverBudget] = useState(false);

  const now = new Date();

  const monthTotals = useMemo(() => {
    const currentMonthTx = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const income = currentMonthTx
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = currentMonthTx
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense };
  }, [transactions, now]);

  // Re-check the budget warning whenever this month's spending or the
  // saved budget limit changes.
  useEffect(() => {
    setIsOverBudget(budget > 0 && monthTotals.expense > budget);
  }, [budget, monthTotals.expense]);

  function handleBudgetSubmit(event) {
    event.preventDefault();
    const value = parseFloat(budgetInput);
    setBudget(Number.isNaN(value) || value < 0 ? 0 : value);
  }

  return (
    <section className="summary-card">
      <h2>This Month</h2>
      <div className="summary-grid">
        <div>
          <span>Income</span>
          <strong>{formatCurrency(monthTotals.income)}</strong>
        </div>
        <div>
          <span>Expenses</span>
          <strong>{formatCurrency(monthTotals.expense)}</strong>
        </div>
      </div>

      <form className="budget-form" onSubmit={handleBudgetSubmit}>
        <label htmlFor="budget">Monthly budget limit</label>
        <div className="budget-input-row">
          <input
            id="budget"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 500"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
          />
          <button type="submit">Save</button>
        </div>
      </form>

      {isOverBudget && (
        <p className="budget-warning">
          ⚠ You've spent {formatCurrency(monthTotals.expense)}, over your{' '}
          {formatCurrency(budget)} budget for this month.
        </p>
      )}
    </section>
  );
}

export default MonthlySummary;
