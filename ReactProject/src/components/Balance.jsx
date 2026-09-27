function formatCurrency(value) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

function Balance({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <section className="balance-card">
      <div className="balance-main">
        <span className="balance-label">Current Balance</span>
        <span className={`balance-value ${balance < 0 ? 'negative' : 'positive'}`}>
          {formatCurrency(balance)}
        </span>
      </div>
      <div className="balance-breakdown">
        <div className="breakdown-item income">
          <span>Income</span>
          <strong>{formatCurrency(totalIncome)}</strong>
        </div>
        <div className="breakdown-item expense">
          <span>Expenses</span>
          <strong>{formatCurrency(totalExpense)}</strong>
        </div>
      </div>
    </section>
  );
}

export default Balance;
