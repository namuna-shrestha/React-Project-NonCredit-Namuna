import { useState } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants.jsx';

const emptyForm = {
  description: '',
  amount: '',
  category: EXPENSE_CATEGORIES[0],
  type: 'expense',
  date: new Date().toISOString().slice(0, 10),
};

function TransactionForm({ onAddTransaction }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const categories = form.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Reset category to a valid one whenever the type changes
      if (name === 'type') {
        next.category = value === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0];
      }
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amountValue = parseFloat(form.amount);
    if (!form.description.trim()) {
      setError('Please enter a description.');
      return;
    }
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter an amount greater than 0.');
      return;
    }

    onAddTransaction({
      id: crypto.randomUUID(),
      description: form.description.trim(),
      amount: amountValue,
      category: form.category,
      type: form.type,
      date: form.date,
    });

    setForm({ ...emptyForm, date: form.date });
    setError('');
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <div className="type-toggle">
        <button
          type="button"
          className={form.type === 'expense' ? 'active expense' : ''}
          onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
        >
          Expense
        </button>
        <button
          type="button"
          className={form.type === 'income' ? 'active income' : ''}
          onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
        >
          Income
        </button>
      </div>

      <div className="form-row">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="e.g. Groceries"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-row form-row-split">
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0"
            placeholder="0"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="submit-btn">
        Add {form.type === 'expense' ? 'Expense' : 'Income'}
      </button>
    </form>
  );
}

export default TransactionForm;
