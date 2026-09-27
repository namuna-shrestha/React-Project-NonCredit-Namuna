function formatCurrency(value) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

function TransactionItem({ transaction, onDelete }) {
  const { id, description, amount, category, type, date } = transaction;

  return (
    <li className={`transaction-item ${type}`}>
      <div className="transaction-info">
        <span className="transaction-description">{description}</span>
        <span className="transaction-meta">
          {category} · {new Date(date).toLocaleDateString()}
        </span>
      </div>
      <div className="transaction-actions">
        <span className="transaction-amount">
          {type === 'expense' ? '-' : '+'}
          {formatCurrency(amount)}
        </span>
        <button
          className="delete-btn"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${description}`}
        >
          ✕
        </button>
      </div>
    </li>
  );
}

export default TransactionItem;
