import React from 'react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';

const App = () => {
  const userId = 'exampleUserId'; // Replace with actual user authentication

  const handleTransactionAdded = (newTransaction) => {
    // Update state or refetch transactions
  };

  return (
    <div>
      <h1>Freelancer Budget Tracker</h1>
      <TransactionForm userId={userId} onTransactionAdded={handleTransactionAdded} />
      <Dashboard userId={userId} />
    </div>
  );
};

export default App;
