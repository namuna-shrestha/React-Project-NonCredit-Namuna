import { useState, useMemo } from 'react';
import TransactionItem from './TransactionItem.jsx';
import FilterBar from './FilterBar.jsx';

function TransactionList({ transactions, onDelete }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');

  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))].sort(),
    [transactions]
  );

  const visibleTransactions = useMemo(() => {
    let result = [...transactions];

    if (filterCategory !== 'all') {
      result = result.filter((t) => t.category === filterCategory);
    }

    switch (sortOrder) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount-desc':
        result.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-asc':
        result.sort((a, b) => a.amount - b.amount);
        break;
      case 'date-desc':
      default:
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return result;
  }, [transactions, filterCategory, sortOrder]);

  return (
    <section className="transaction-list-section">
      <div className="list-header">
        <h2>Transactions</h2>
        <FilterBar
          categories={categories}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {transactions.length === 0 ? (
        <p className="empty-state">No transactions yet. Add your first one above.</p>
      ) : visibleTransactions.length === 0 ? (
        <p className="empty-state">No transactions match this filter.</p>
      ) : (
        <ul className="transaction-list">
          {visibleTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TransactionList;
