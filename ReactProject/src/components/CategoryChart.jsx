import { useMemo } from 'react';

function formatCurrency(value) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2,
  });
}

function CategoryChart({ transactions }) {
  const data = useMemo(() => {
    const totals = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });

    return Object.entries(totals)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);
  }, [transactions]);

  const maxTotal = Math.max(...data.map((d) => d.total), 0);

  return (
    <section className="chart-card">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-state">Add an expense to see the breakdown.</p>
      ) : (
        <div className="bar-chart">
          {data.map(({ category, total }) => (
            <div className="bar-row" key={category}>
              <span className="bar-label">{category}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${maxTotal ? (total / maxTotal) * 100 : 0}%` }}
                />
              </div>
              <span className="bar-value">{formatCurrency(total)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryChart;
