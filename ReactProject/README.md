Personal Expense Tracker

A single-page React app for logging income and expenses, tracking a running balance, and visualizing spending by category. Built with functional components and hooks only, with all data persisted locally in the browser via localStorage — no backend required.

Features
Add transactions with a description, amount, category, date, and type (income/expense)
Running balance card showing total income, total expenses, and net balance
Full transaction list with the ability to delete individual entries
Filter transactions by category and sort by date or amount
Spending-by-category bar chart (built with plain CSS, no chart library)
Monthly summary of income/expenses for the current month
Optional monthly budget limit with a warning banner when expenses exceed it
Data persists across page reloads via localStorage
Responsive layout that adapts from desktop to mobile widths
Technologies Used
React 19 (functional components + hooks only)
Vite for the dev server and build tooling
Plain CSS (Flexbox/Grid, no UI framework)
Browser localStorage for persistence
Project Structure
src/
  main.jsx                     # React entry point
  App.jsx                      # Top-level layout and app state
  constants.jsx                # Shared category lists
  index.css                    # Global/responsive styles
  hooks/
    useLocalStorage.jsx        # Custom hook: sync state <-> localStorage
  components/
    Header.jsx
    Balance.jsx                # Running balance card
    TransactionForm.jsx        # Controlled form to add a transaction
    FilterBar.jsx               # Category filter + sort controls
    TransactionList.jsx        # Filters/sorts and renders the list
    TransactionItem.jsx        # Single transaction row
    CategoryChart.jsx          # Spending-by-category bar chart
    MonthlySummary.jsx         # Current-month totals + budget warning
Setup Instructions
Make sure you have Node.js (v18+) installed.
Install dependencies:
bash
   npm install
Start the dev server:
bash
   npm run dev

Then open the printed local URL (usually http://localhost:5173) in your browser. 4. To build for production:

bash
   npm run build
Screenshots

Run npm run dev, open the app in your browser, add a few sample transactions, and paste your own screenshots below before submitting. Save the image files in a screenshots/ folder in the project root so these links resolve.

