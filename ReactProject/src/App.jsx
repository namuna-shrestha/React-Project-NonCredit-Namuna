import Header from './components/Header.jsx';
import Balance from './components/Balance.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import CategoryChart from './components/CategoryChart.jsx';
import MonthlySummary from './components/MonthlySummary.jsx';
import useLocalStorage from './hooks/useLocalStorage.jsx';

function App() {
  const [transactions, setTransactions] = useLocalStorage('expense-tracker-transactions', []);

  function handleAddTransaction(transaction) {
    setTransactions((prev) => [transaction, ...prev]);
  }

  function handleDeleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <div className="left-column">
          <Balance transactions={transactions} />
          <TransactionForm onAddTransaction={handleAddTransaction} />
          <MonthlySummary transactions={transactions} />
        </div>

        <div className="right-column">
          <CategoryChart transactions={transactions} />
          <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
        </div>
      </main>

      <footer className="app-footer">
        <p>Data is stored locally in your browser — nothing is sent to a server.</p>
      </footer>
    </div>
  );
}

export default App;
